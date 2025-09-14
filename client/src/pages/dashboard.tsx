import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Brain, 
  University, 
  GraduationCap, 
  Route, 
  BookOpen, 
  Award,
  ArrowRight
} from "lucide-react";

const Dashboard = () => {
  const mainActions = [
    {
      title: "Start Aptitude Test",
      description: "Discover your strengths and interests through our comprehensive assessment",
      icon: Brain,
      href: "/assessment",
      buttonText: "Take Assessment",
      color: "primary"
    },
    {
      title: "Explore Colleges",
      description: "Find the best government colleges that match your career goals",
      icon: University,
      href: "/colleges",
      buttonText: "Find Colleges",
      color: "accent"
    },
    {
      title: "View Scholarships",
      description: "Explore government scholarships available for your studies",
      icon: GraduationCap,
      href: "/scholarships",
      buttonText: "View Scholarships",
      color: "secondary"
    },
    {
      title: "Course-to-Career Path",
      description: "Visualize your journey from courses to career opportunities",
      icon: Route,
      href: "/career-mapping",
      buttonText: "Explore Paths",
      color: "primary"
    },
    {
      title: "Study Materials",
      description: "Access curated study resources for your chosen stream",
      icon: BookOpen,
      href: "/study-materials",
      buttonText: "Browse Materials",
      color: "accent"
    },
    {
      title: "Get Recommendations",
      description: "Receive personalized career recommendations based on your profile",
      icon: Award,
      href: "/recommendations",
      buttonText: "View Recommendations",
      color: "secondary"
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg py-16 lg:py-24" data-testid="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-blue-900" data-testid="text-hero-title">
            Find your best career path
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-blue-800 max-w-3xl mx-auto" data-testid="text-hero-description">
            Discover your potential with our comprehensive career guidance platform designed specifically for Indian students
          </p>
          <Link href="/assessment">
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-blue-900 px-8 py-4 text-lg font-semibold shadow-lg"
              data-testid="button-start-journey"
            >
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Main Action Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-testid="main-actions">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainActions.map((action, index) => (
            <Card 
              key={action.title} 
              className="card-hover border border-border" 
              data-testid={`card-${action.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <CardContent className="p-8">
                <div className={`text-${action.color} mb-4`}>
                  <action.icon className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground" data-testid={`text-${action.title.toLowerCase().replace(/\s+/g, '-')}-title`}>
                  {action.title}
                </h3>
                <p className="text-muted-foreground mb-6" data-testid={`text-${action.title.toLowerCase().replace(/\s+/g, '-')}-description`}>
                  {action.description}
                </p>
                <Link href={action.href}>
                  <Button 
                    className={`w-full bg-${action.color} hover:bg-${action.color}/90 text-${action.color}-foreground`}
                    data-testid={`button-${action.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {action.buttonText}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-16" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-features-title">
              Why Choose CareerGuide?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-features-description">
              Our platform is designed specifically for Indian students with comprehensive guidance and authentic data
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center" data-testid="feature-comprehensive">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Comprehensive Assessment</h3>
              <p className="text-muted-foreground">
                Scientific aptitude tests covering logical reasoning, mathematics, verbal skills, and interests
              </p>
            </div>
            
            <div className="text-center" data-testid="feature-authentic">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <University className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Authentic Data</h3>
              <p className="text-muted-foreground">
                Real college information, government scholarships, and verified career pathways
              </p>
            </div>
            
            <div className="text-center" data-testid="feature-personalized">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Personalized Guidance</h3>
              <p className="text-muted-foreground">
                Tailored recommendations based on your skills, interests, and academic performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" data-testid="cta-section">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-cta-title">
            Ready to Shape Your Future?
          </h2>
          <p className="text-lg text-muted-foreground mb-8" data-testid="text-cta-description">
            Join thousands of students who have found their career path with CareerGuide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment">
              <Button size="lg" className="px-8" data-testid="button-cta-assessment">
                Take Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/colleges">
              <Button variant="outline" size="lg" className="px-8" data-testid="button-cta-colleges">
                Explore Colleges
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
