import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, IndianRupee, Award, Bookmark } from "lucide-react";
import type { College } from "@shared/schema";

interface CollegeCardProps {
  college: College;
}

const CollegeCard = ({ college }: CollegeCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="card-hover border border-border" data-testid={`college-card-${college.id}`}>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2" data-testid="college-name">
                  {college.name}
                </h3>
                <div className="flex items-center text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span data-testid="college-location">{college.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" data-testid="college-type">
                    {college.type}
                  </Badge>
                  {college.accreditation && (
                    <Badge variant="outline" data-testid="college-accreditation">
                      {college.accreditation}
                    </Badge>
                  )}
                  {college.ranking && (
                    <Badge className="bg-primary/10 text-primary" data-testid="college-ranking">
                      NIRF Rank: {college.ranking}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="bg-muted p-3 rounded-lg" data-testid="college-cutoff">
                <p className="text-sm text-muted-foreground">Cutoff (General)</p>
                <p className="font-semibold text-card-foreground">
                  {typeof college.cutoffs === 'object' && college.cutoffs.general 
                    ? college.cutoffs.general 
                    : "Not Available"}
                </p>
              </div>
              
              <div className="bg-muted p-3 rounded-lg" data-testid="college-fees">
                <p className="text-sm text-muted-foreground">Annual Fees</p>
                <p className="font-semibold text-card-foreground">
                  {typeof college.fees === 'object' && college.fees.annual 
                    ? formatCurrency(college.fees.annual)
                    : "Not Available"}
                </p>
              </div>
              
              <div className="bg-muted p-3 rounded-lg" data-testid="college-seats">
                <p className="text-sm text-muted-foreground">Available Seats</p>
                <p className="font-semibold text-card-foreground">{college.seats} seats</p>
              </div>
              
              <div className="bg-muted p-3 rounded-lg" data-testid="college-scholarships">
                <p className="text-sm text-muted-foreground">Scholarships</p>
                <p className={`font-semibold ${college.scholarships ? 'text-accent' : 'text-muted-foreground'}`}>
                  {college.scholarships ? 'Available' : 'Not Available'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button data-testid="button-view-details">
            View Details
          </Button>
          <Button variant="outline" data-testid="button-check-eligibility">
            Check Eligibility
          </Button>
          <Button variant="outline" data-testid="button-save-college">
            <Bookmark className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollegeCard;
