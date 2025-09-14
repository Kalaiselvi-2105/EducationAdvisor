import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import ScholarshipCard from "@/components/scholarships/scholarship-card";
import { Search, Filter, Award, Users, Calendar, IndianRupee } from "lucide-react";
import type { Scholarship } from "@shared/schema";

const Scholarships = () => {
  const [filters, setFilters] = useState({
    category: "",
    educationLevel: "",
    state: ""
  });

  const { data: scholarships = [], isLoading } = useQuery<Scholarship[]>({
    queryKey: ["/api/scholarships", filters],
  });

  // Mock scholarships data
  const mockScholarships: Scholarship[] = [
    {
      id: "1",
      name: "National Scholarship Portal - Merit Cum Means Scholarship",
      provider: "Ministry of Education, Government of India",
      category: "merit",
      educationLevel: "undergraduate",
      amount: 100000,
      eligibility: {
        marks: "80% in 12th",
        income: "Family income < ₹8 LPA"
      },
      documents: [
        "Income Certificate",
        "Academic Marksheets", 
        "Aadhaar Card",
        "Bank Details"
      ],
      applicationDeadline: new Date("2024-12-31"),
      state: null,
      isActive: true
    },
    {
      id: "2",
      name: "Inspire Scholarship for Higher Education",
      provider: "Department of Science & Technology",
      category: "merit",
      educationLevel: "undergraduate",
      amount: 80000,
      eligibility: {
        exam: "JEE/NEET qualified",
        rank: "Top 1% in boards"
      },
      documents: [
        "JEE/NEET Scorecard",
        "Board Marksheets",
        "Income Certificate"
      ],
      applicationDeadline: new Date("2024-11-30"),
      state: null,
      isActive: true
    }
  ];

  const displayScholarships = scholarships.length > 0 ? scholarships : mockScholarships;

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      educationLevel: "",
      state: ""
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="loading-scholarships">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading scholarships...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8" data-testid="scholarships-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8" data-testid="scholarships-header">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Government Scholarships
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore available scholarships to support your education journey
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8" data-testid="scholarship-stats">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-primary mb-2">
                <Award className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground">150+</h3>
              <p className="text-muted-foreground">Active Scholarships</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-secondary mb-2">
                <IndianRupee className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground">₹50K</h3>
              <p className="text-muted-foreground">Average Amount</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-accent mb-2">
                <Users className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground">10L+</h3>
              <p className="text-muted-foreground">Students Benefited</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-primary mb-2">
                <Calendar className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground">25</h3>
              <p className="text-muted-foreground">Days Left to Apply</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8" data-testid="scholarship-filters">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter Scholarships
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={filters.category} 
                  onValueChange={(value) => handleFilterChange("category", value)}
                >
                  <SelectTrigger data-testid="select-category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="merit">Merit-based</SelectItem>
                    <SelectItem value="caste">Caste-based</SelectItem>
                    <SelectItem value="income">Income-based</SelectItem>
                    <SelectItem value="minority">Minority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="educationLevel">Education Level</Label>
                <Select 
                  value={filters.educationLevel} 
                  onValueChange={(value) => handleFilterChange("educationLevel", value)}
                >
                  <SelectTrigger data-testid="select-education-level">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Levels</SelectItem>
                    <SelectItem value="12th">Class 11-12</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="postgraduate">Postgraduate</SelectItem>
                    <SelectItem value="professional">Professional Courses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="state">State</Label>
                <Select 
                  value={filters.state} 
                  onValueChange={(value) => handleFilterChange("state", value)}
                >
                  <SelectTrigger data-testid="select-state">
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All States</SelectItem>
                    <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="Karnataka">Karnataka</SelectItem>
                    <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="Gujarat">Gujarat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end gap-2">
                <Button className="flex-1" data-testid="button-search">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" onClick={resetFilters} data-testid="button-reset">
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scholarship Listings */}
        <div className="space-y-6" data-testid="scholarship-results">
          {displayScholarships.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No scholarships found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to find more scholarships.
                </p>
              </CardContent>
            </Card>
          ) : (
            displayScholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))
          )}
        </div>

        {/* Quick Links */}
        <Card className="mt-12 bg-muted/30" data-testid="quick-links">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-foreground mb-6 text-center">
              Scholarship Application Resources
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">National Scholarship Portal</h4>
                <p className="text-sm text-muted-foreground mb-3">scholarships.gov.in</p>
                <Button variant="outline" size="sm" data-testid="button-portal">
                  Visit Portal
                </Button>
              </div>
              
              <div className="text-center">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Application Help</h4>
                <p className="text-sm text-muted-foreground mb-3">Step-by-step guides</p>
                <Button variant="outline" size="sm" data-testid="button-help">
                  Get Help
                </Button>
              </div>
              
              <div className="text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Important Dates</h4>
                <p className="text-sm text-muted-foreground mb-3">Deadlines & timelines</p>
                <Button variant="outline" size="sm" data-testid="button-calendar">
                  View Calendar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Scholarships;
