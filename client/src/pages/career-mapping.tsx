import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Atom, 
  Calculator, 
  Palette, 
  Wrench,
  ArrowRight,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Building,
  Lightbulb
} from "lucide-react";

const CareerMapping = () => {
  const [selectedStream, setSelectedStream] = useState("science");

  const streams = [
    { id: "science", name: "Science", icon: Atom, color: "primary" },
    { id: "commerce", name: "Commerce", icon: Calculator, color: "secondary" },
    { id: "arts", name: "Arts", icon: Palette, color: "accent" },
    { id: "vocational", name: "Vocational", icon: Wrench, color: "destructive" }
  ];

  const careerPaths = {
    science: [
      {
        course: "B.Tech Computer Science",
        duration: "4 Years",
        icon: "💻",
        careers: [
          { title: "Software Engineer", salary: "₹5-15 LPA", sector: "Private" },
          { title: "Data Scientist", salary: "₹8-25 LPA", sector: "Analytics" }
        ],
        nextStep: "Higher Studies (MS, PhD, MBA)"
      },
      {
        course: "B.Tech Civil Engineering", 
        duration: "4 Years",
        icon: "🏗️",
        careers: [
          { title: "Civil Engineer", salary: "₹4-12 LPA", sector: "Construction" },
          { title: "Govt Engineer", salary: "₹6-18 LPA", sector: "Government" }
        ],
        nextStep: "Senior Positions (Project Manager, Consultant)"
      },
      {
        course: "MBBS",
        duration: "5.5 Years", 
        icon: "⚕️",
        careers: [
          { title: "Medical Doctor", salary: "₹6-20 LPA", sector: "Healthcare" },
          { title: "Medical Officer", salary: "₹8-15 LPA", sector: "Government" }
        ],
        nextStep: "Specialization (MD, MS, DM)"
      }
    ],
    commerce: [
      {
        course: "B.Com",
        duration: "3 Years",
        icon: "💼",
        careers: [
          { title: "Financial Analyst", salary: "₹5-15 LPA", sector: "Finance" },
          { title: "Audit Manager", salary: "₹6-18 LPA", sector: "Accounting" }
        ],
        nextStep: "Professional Certifications (CA, CS, CMA)"
      },
      {
        course: "BBA",
        duration: "3 Years",
        icon: "📊", 
        careers: [
          { title: "Business Analyst", salary: "₹4-12 LPA", sector: "Corporate" },
          { title: "Marketing Manager", salary: "₹5-16 LPA", sector: "Marketing" }
        ],
        nextStep: "MBA or Entrepreneurship"
      }
    ],
    arts: [
      {
        course: "BA English Literature",
        duration: "3 Years",
        icon: "📚",
        careers: [
          { title: "Content Writer", salary: "₹3-8 LPA", sector: "Media" },
          { title: "Journalist", salary: "₹4-10 LPA", sector: "Media" }
        ],
        nextStep: "MA or Journalism Degree"
      },
      {
        course: "BA Political Science",
        duration: "3 Years", 
        icon: "⚖️",
        careers: [
          { title: "Civil Services", salary: "₹8-25 LPA", sector: "Government" },
          { title: "Policy Analyst", salary: "₅-15 LPA", sector: "Think Tanks" }
        ],
        nextStep: "MA or Law (LLB)"
      }
    ],
    vocational: [
      {
        course: "Diploma in IT",
        duration: "2 Years",
        icon: "💻",
        careers: [
          { title: "Web Developer", salary: "₹3-8 LPA", sector: "Tech" },
          { title: "IT Support", salary: "₹2-6 LPA", sector: "Corporate" }
        ],
        nextStep: "Certifications & Specializations"
      }
    ]
  };

  const currentPaths = careerPaths[selectedStream as keyof typeof careerPaths] || [];

  return (
    <div className="min-h-screen bg-background py-8" data-testid="career-mapping-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12" data-testid="career-mapping-header">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Course-to-Career Mapping
          </h1>
          <p className="text-lg text-muted-foreground">
            Visualize your journey from courses to career opportunities
          </p>
        </div>

        {/* Stream Selector */}
        <Card className="mb-8" data-testid="stream-selector">
          <CardHeader>
            <CardTitle>Select Your Stream</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {streams.map((stream) => (
                <Button
                  key={stream.id}
                  variant={selectedStream === stream.id ? "default" : "outline"}
                  className={`p-6 h-auto flex-col space-y-2 ${
                    selectedStream === stream.id 
                      ? `bg-${stream.color} text-${stream.color}-foreground` 
                      : ""
                  }`}
                  onClick={() => setSelectedStream(stream.id)}
                  data-testid={`button-stream-${stream.id}`}
                >
                  <stream.icon className="h-8 w-8" />
                  <span className="font-medium">{stream.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Path Flowchart */}
        <Card data-testid="career-flowchart">
          <CardHeader>
            <CardTitle className="text-center">
              {streams.find(s => s.id === selectedStream)?.name} Stream Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-12">
              {currentPaths.map((path, index) => (
                <div key={index} className="relative" data-testid={`career-path-${index}`}>
                  <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
                    
                    {/* Course */}
                    <div className="bg-primary text-primary-foreground p-6 rounded-xl text-center min-w-[200px]">
                      <div className="text-2xl mb-3">{path.icon}</div>
                      <h3 className="font-semibold text-lg" data-testid="course-name">
                        {path.course}
                      </h3>
                      <p className="text-sm opacity-90" data-testid="course-duration">
                        {path.duration}
                      </p>
                    </div>
                    
                    {/* Arrow */}
                    <div className="hidden lg:block">
                      <ArrowRight className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="lg:hidden">
                      <ArrowRight className="h-8 w-8 text-muted-foreground rotate-90" />
                    </div>
                    
                    {/* Career Options */}
                    <div className="grid md:grid-cols-2 gap-4 flex-1">
                      {path.careers.map((career, careerIndex) => (
                        <div 
                          key={careerIndex} 
                          className="bg-muted p-4 rounded-lg"
                          data-testid={`career-option-${careerIndex}`}
                        >
                          <h4 className="font-semibold text-card-foreground mb-2">
                            {career.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {career.salary}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {career.sector}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    
                    {/* Arrow */}
                    <div className="hidden lg:block">
                      <ArrowRight className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="lg:hidden">
                      <ArrowRight className="h-8 w-8 text-muted-foreground rotate-90" />
                    </div>
                    
                    {/* Future Opportunities */}
                    <div className="bg-accent text-accent-foreground p-6 rounded-xl text-center min-w-[200px]">
                      <GraduationCap className="h-8 w-8 mx-auto mb-3" />
                      <h3 className="font-semibold text-lg" data-testid="next-step">
                        Future Growth
                      </h3>
                      <p className="text-sm opacity-90">
                        {path.nextStep}
                      </p>
                    </div>
                  </div>
                  
                  {/* Separator for multiple paths */}
                  {index < currentPaths.length - 1 && (
                    <div className="border-t border-border mt-12 pt-0" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Planning Tips */}
        <Card className="mt-8 bg-muted/30" data-testid="career-tips">
          <CardContent className="p-8">
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-accent" />
              Career Planning Tips
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div data-testid="tip-research">
                <h4 className="font-medium text-card-foreground mb-2">Research Thoroughly</h4>
                <p className="text-sm text-muted-foreground">
                  Understand course curriculum, career prospects, and market demand before making decisions.
                </p>
              </div>
              <div data-testid="tip-skills">
                <h4 className="font-medium text-card-foreground mb-2">Skills Development</h4>
                <p className="text-sm text-muted-foreground">
                  Focus on building both technical and soft skills relevant to your chosen career path.
                </p>
              </div>
              <div data-testid="tip-trends">
                <h4 className="font-medium text-card-foreground mb-2">Stay Updated</h4>
                <p className="text-sm text-muted-foreground">
                  Keep track of industry trends and emerging opportunities in your field of interest.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerMapping;
