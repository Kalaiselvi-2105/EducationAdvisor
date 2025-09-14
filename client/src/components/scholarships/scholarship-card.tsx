import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, IndianRupee, FileText, ExternalLink, Bookmark, AlertCircle } from "lucide-react";
import type { Scholarship } from "@shared/schema";

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

const ScholarshipCard = ({ scholarship }: ScholarshipCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDeadline = (date: Date | null) => {
    if (!date) return "No deadline specified";
    
    const now = new Date();
    const deadline = new Date(date);
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Deadline passed";
    if (diffDays === 0) return "Deadline today";
    if (diffDays <= 30) return `${diffDays} days left`;
    
    return deadline.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "merit": return "primary";
      case "caste": return "secondary";
      case "income": return "accent";
      case "minority": return "destructive";
      default: return "outline";
    }
  };

  const getDeadlineStatus = (date: Date | null) => {
    if (!date) return { color: "muted", text: "No deadline" };
    
    const now = new Date();
    const deadline = new Date(date);
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { color: "destructive", text: "Deadline passed" };
    if (diffDays <= 7) return { color: "destructive", text: `${diffDays} days left` };
    if (diffDays <= 30) return { color: "secondary", text: `${diffDays} days left` };
    return { color: "primary", text: "Applications open" };
  };

  const deadlineStatus = getDeadlineStatus(scholarship.applicationDeadline);

  return (
    <Card className="card-hover border border-border overflow-hidden" data-testid={`scholarship-card-${scholarship.id}`}>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2" data-testid="scholarship-name">
                  {scholarship.name}
                </h3>
                <p className="text-muted-foreground mb-3" data-testid="scholarship-provider">
                  {scholarship.provider}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge 
                    variant={getCategoryColor(scholarship.category) as any}
                    className="capitalize"
                    data-testid="scholarship-category"
                  >
                    {scholarship.category}-based
                  </Badge>
                  <Badge variant="outline" className="capitalize" data-testid="scholarship-level">
                    {scholarship.educationLevel}
                  </Badge>
                  {scholarship.state && (
                    <Badge variant="outline" data-testid="scholarship-state">
                      {scholarship.state}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className={`bg-${deadlineStatus.color}/10 text-${deadlineStatus.color} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                  {deadlineStatus.text}
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-muted p-4 rounded-lg" data-testid="scholarship-amount">
                <p className="text-sm text-muted-foreground mb-1">Scholarship Amount</p>
                <p className="font-semibold text-card-foreground text-lg flex items-center">
                  <IndianRupee className="h-4 w-4 mr-1" />
                  {formatCurrency(scholarship.amount)} per year
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg" data-testid="scholarship-eligibility">
                <p className="text-sm text-muted-foreground mb-1">Eligibility</p>
                {typeof scholarship.eligibility === 'object' ? (
                  <div>
                    {Object.entries(scholarship.eligibility).map(([key, value]) => (
                      <p key={key} className="font-semibold text-card-foreground text-sm">
                        {String(value)}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="font-semibold text-card-foreground">See details</p>
                )}
              </div>
              
              <div className="bg-muted p-4 rounded-lg" data-testid="scholarship-deadline">
                <p className="text-sm text-muted-foreground mb-1">Application Deadline</p>
                <p className="font-semibold text-card-foreground flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDeadline(scholarship.applicationDeadline)}
                </p>
              </div>
            </div>

            {Array.isArray(scholarship.documents) && scholarship.documents.length > 0 && (
              <div className="mb-6" data-testid="scholarship-documents">
                <h4 className="font-semibold text-card-foreground mb-2 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Required Documents:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {scholarship.documents.map((doc, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {String(doc)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button className="bg-primary hover:bg-primary/90" data-testid="button-apply-now">
            <ExternalLink className="h-4 w-4 mr-2" />
            Apply Now
          </Button>
          <Button variant="outline" data-testid="button-check-eligibility">
            <AlertCircle className="h-4 w-4 mr-2" />
            Check Eligibility
          </Button>
          <Button variant="outline" data-testid="button-download-form">
            <FileText className="h-4 w-4 mr-2" />
            Download Form
          </Button>
          <Button variant="outline" data-testid="button-save-scholarship">
            <Bookmark className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScholarshipCard;
