import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { Question } from "@shared/schema";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedAnswer: string;
  onAnswerChange: (answer: string) => void;
}

const QuestionCard = ({ 
  question, 
  questionNumber, 
  selectedAnswer, 
  onAnswerChange 
}: QuestionCardProps) => {
  if (!question) return null;

  const options = Array.isArray(question.options) 
    ? question.options 
    : [];

  return (
    <Card className="shadow-lg border border-border" data-testid="question-card">
      <CardContent className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-medium text-card-foreground mb-6" data-testid="question-text">
            {questionNumber}. {question.question}
          </h3>
          
          <RadioGroup 
            value={selectedAnswer} 
            onValueChange={onAnswerChange}
            className="space-y-4"
            data-testid="answer-options"
          >
            {options.map((option: any) => (
              <div 
                key={option.id} 
                className="flex items-center space-x-2 p-4 bg-muted rounded-lg hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/20"
              >
                <RadioGroupItem 
                  value={option.id} 
                  id={option.id}
                  data-testid={`option-${option.id}`}
                />
                <Label 
                  htmlFor={option.id} 
                  className="flex-1 cursor-pointer text-card-foreground"
                  data-testid={`label-${option.id}`}
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
