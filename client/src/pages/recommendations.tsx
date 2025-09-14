import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Brain, 
  Calculator, 
  MessageCircle, 
  Heart,
  TrendingUp,
  University,
  Award,
  CheckCircle
} from "lucide-react";

const Recommendations = () => {
  // Mock assessment results - in real app this would come from API
  const assessmentResults = {
    logical: 85,
    math: 78,
    verbal: 72,
    interest: 90
  };

  const recommendedStreams = [
    {
      name: "Science Stream",
      compatibility: 92,
      description: "Perfect match based on your analytical skills and tech interests",
      careers: [
        "Software Engineer",
        "Data Scientist", 
        "Civil Engineer",
        "Medical Doctor"
      ],
      color: "primary",
      bgGradient: "from-primary to-accent"
    },
    {
      name: "Commerce Stream", 
      compatibility: 78,
      description: "Good match for your logical reasoning and mathematical abilities",
      careers: [
        "Chartered Accountant",
        "Investment Banker",
        "Business Analyst", 
        "Financial Advisor"
      ],
      color: "secondary",
      bgGradient: "from-secondary to-yellow-500"
    },
    {
      name: "Vocational",
      compatibility: 65,
      description: "Alternative path focusing on practical skills and immediate opportunities",
      careers: [
        "Web Developer",
        "Digital Marketer",
        "Graphic Designer",
        "Photographer"
      ],
      color: "accent",
      bgGradient: "from-accent to-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8" data-testid="recommendations-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12" data-testid="recommendations-header">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Your Personalized Career Recommendations
          </h1>
          <p className="text-lg text-muted-foreground">
            Based on your assessment results, here are the best career paths for you
          </p>
        </div>

        {/* Assessment Summary */}
        <Card className="mb-12" data-testid="assessment-summary">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-6 w-6 mr-2 text-primary" />
              Your Strengths Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center" data-testid="strength-logical">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary-foreground font-bold text-lg">
                    {assessmentResults.logical}%
                  </span>
                </div>
                <p className="font-medium text-card-foreground">Logical Reasoning</p>
              </div>
              
              <div className="text-center" data-testid="strength-math">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-secondary-foreground font-bold text-lg">
                    {assessmentResults.math}%
                  </span>
                </div>
                <p className="font-medium text-card-foreground">Mathematics</p>
              </div>
              
              <div className="text-center" data-testid="strength-verbal">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-accent-foreground font-bold text-lg">
                    {assessmentResults.verbal}%
                  </span>
                </div>
                <p className="font-medium text-card-foreground">Verbal Skills</p>
              </div>
              
              <div className="text-center" data-testid="strength-interest">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary-foreground font-bold text-lg">
                    {assessmentResults.interest}%
                  </span>
                </div>
                <p className="font-medium text-card-foreground">Tech Interest</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Streams */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12" data-testid="recommended-streams">
          {recommendedStreams.map((stream, index) => (
            <Card 
              key={stream.name} 
              className="card-hover border border-border overflow-hidden"
              data-testid={`stream-${stream.name.toLowerCase().replace(' ', '-')}`}
            >
              <div className={`bg-gradient-to-r ${stream.bgGradient} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{stream.name}</h3>
                  <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium">
                      {index === 0 ? "Best Match" : index === 1 ? "Good Match" : "Alternative"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm opacity-90">Compatibility Score</p>
                    <p className="text-2xl font-bold">{stream.compatibility}%</p>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">{stream.description}</p>
                
                <h4 className="font-semibold text-card-foreground mb-3">Top Career Options:</h4>
                <ul className="space-y-2 mb-6">
                  {stream.careers.map((career) => (
                    <li key={career} className="flex items-center text-muted-foreground">
                      <CheckCircle className={`h-4 w-4 mr-2 text-${stream.color}`} />
                      {career}
                    </li>
                  ))}
                </ul>
                
                <Link href="/colleges">
                  <Button 
                    className={`w-full bg-${stream.color} hover:bg-${stream.color}/90 text-${stream.color}-foreground`}
                    data-testid={`button-view-colleges-${stream.name.toLowerCase().replace(' ', '-')}`}
                  >
                    View Colleges for {stream.name}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Next Steps */}
        <Card className="bg-muted/30" data-testid="next-steps">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Ready to Take the Next Step?
            </h2>
            <p className="text-muted-foreground mb-6">
              Explore colleges and scholarships that align with your recommended career path
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/colleges">
                <Button size="lg" data-testid="button-find-colleges">
                  <University className="h-5 w-5 mr-2" />
                  Find Colleges
                </Button>
              </Link>
              <Link href="/scholarships">
                <Button variant="outline" size="lg" data-testid="button-view-scholarships">
                  <Award className="h-5 w-5 mr-2" />
                  View Scholarships
                </Button>
              </Link>
              <Link href="/career-mapping">
                <Button variant="outline" size="lg" data-testid="button-career-mapping">
                  View Career Roadmaps
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Recommendations;
