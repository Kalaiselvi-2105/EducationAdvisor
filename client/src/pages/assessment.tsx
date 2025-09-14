import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import QuestionCard from "@/components/assessment/question-card";
import ProgressBar from "@/components/assessment/progress-bar";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";
import type { Question } from "@shared/schema";

const Assessment = () => {
  const [, setLocation] = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const { data: questions = [], isLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions"],
  });

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

  const handleAnswer = (questionId: string, answer: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const goToNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Assessment complete
      setIsComplete(true);
      setTimeout(() => {
        setLocation("/recommendations");
      }, 2000);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const canProceed = currentQuestion && responses[currentQuestion.id];

  const getCategoryProgress = () => {
    const categories = {
      logical: { completed: 0, total: 0 },
      math: { completed: 0, total: 0 },
      verbal: { completed: 0, total: 0 },
      interest: { completed: 0, total: 0 }
    };

    questions.forEach((q, index) => {
      const category = q.category as keyof typeof categories;
      if (categories[category]) {
        categories[category].total++;
        if (index <= currentQuestionIndex && responses[q.id]) {
          categories[category].completed++;
        }
      }
    });

    return categories;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="loading-assessment">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="assessment-complete">
        <Card className="max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 text-secondary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-4">Assessment Complete!</h2>
            <p className="text-muted-foreground mb-6">
              Analyzing your responses to generate personalized recommendations...
            </p>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: "100%" }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="no-questions">
        <Card className="max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No questions available. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const categoryProgress = getCategoryProgress();

  return (
    <div className="min-h-screen bg-background py-8" data-testid="assessment-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8" data-testid="assessment-header">
          <h1 className="text-3xl font-bold text-foreground mb-4">Aptitude Assessment</h1>
          <p className="text-muted-foreground">
            Answer these questions honestly to get personalized career recommendations
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar 
          current={currentQuestionIndex + 1}
          total={totalQuestions}
          progress={progress}
        />

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          selectedAnswer={responses[currentQuestion?.id] || ""}
          onAnswerChange={(answer) => handleAnswer(currentQuestion!.id, answer)}
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8" data-testid="navigation-controls">
          <Button
            variant="outline"
            onClick={goToPrevious}
            disabled={currentQuestionIndex === 0}
            data-testid="button-previous"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={goToNext}
            disabled={!canProceed}
            data-testid="button-next"
          >
            {currentQuestionIndex === totalQuestions - 1 ? "Submit Assessment" : "Next"}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Category Progress */}
        <div className="grid md:grid-cols-4 gap-4 mt-12" data-testid="category-progress">
          {Object.entries(categoryProgress).map(([category, data]) => (
            <Card key={category} className="text-center">
              <CardContent className="p-4">
                <div className={`mb-2 ${
                  data.completed > 0 ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {category === 'logical' && '🧠'}
                  {category === 'math' && '🧮'}
                  {category === 'verbal' && '💬'}
                  {category === 'interest' && '❤️'}
                </div>
                <h4 className="font-medium text-sm text-card-foreground capitalize">
                  {category === 'logical' ? 'Logical Reasoning' : 
                   category === 'math' ? 'Mathematics' :
                   category === 'verbal' ? 'Verbal Skills' : 'Interests'}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {data.completed}/{data.total} completed
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
