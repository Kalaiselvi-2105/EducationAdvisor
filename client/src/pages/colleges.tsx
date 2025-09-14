import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CollegeCard from "@/components/colleges/college-card";
import { Search, Filter, MapPin } from "lucide-react";
import type { College } from "@shared/schema";

const Colleges = () => {
  const [filters, setFilters] = useState({
    state: "",
    district: "",
    course: ""
  });

  const { data: colleges = [], isLoading } = useQuery<College[]>({
    queryKey: ["/api/colleges", filters],
  });

  // Mock colleges data since we don't have seeded data
  const mockColleges: College[] = [
    {
      id: "1",
      name: "Indian Institute of Technology, Mumbai",
      location: "Powai, Mumbai, Maharashtra",
      state: "Maharashtra",
      district: "Mumbai",
      type: "Autonomous",
      courses: [
        { name: "B.Tech Computer Science", duration: "4 years" },
        { name: "B.Tech Civil Engineering", duration: "4 years" }
      ],
      cutoffs: { general: "JEE Rank: 500", obc: "JEE Rank: 800" },
      fees: { annual: 250000, hostel: 50000 },
      seats: 120,
      scholarships: true,
      ranking: 3,
      accreditation: "NAAC A++"
    },
    {
      id: "2", 
      name: "Government College of Engineering, Pune",
      location: "Shivajinagar, Pune, Maharashtra",
      state: "Maharashtra",
      district: "Pune",
      type: "Government",
      courses: [
        { name: "B.Tech Computer Science", duration: "4 years" },
        { name: "B.Tech Mechanical Engineering", duration: "4 years" }
      ],
      cutoffs: { general: "JEE Rank: 2500", obc: "JEE Rank: 3500" },
      fees: { annual: 85000, hostel: 25000 },
      seats: 240,
      scholarships: true,
      ranking: 15,
      accreditation: "NAAC A+"
    }
  ];

  const displayColleges = colleges.length > 0 ? colleges : mockColleges;

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      state: "",
      district: "",
      course: ""
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="loading-colleges">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading colleges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8" data-testid="colleges-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8" data-testid="colleges-header">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Government College Finder
          </h1>
          <p className="text-lg text-muted-foreground">
            Find the best government colleges that match your preferences
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8" data-testid="college-filters">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter Colleges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="state">State</Label>
                <Select 
                  value={filters.state} 
                  onValueChange={(value) => handleFilterChange("state", value)}
                >
                  <SelectTrigger data-testid="select-state">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All States</SelectItem>
                    <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="Karnataka">Karnataka</SelectItem>
                    <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="Gujarat">Gujarat</SelectItem>
                    <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="district">District</Label>
                <Select 
                  value={filters.district} 
                  onValueChange={(value) => handleFilterChange("district", value)}
                >
                  <SelectTrigger data-testid="select-district">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Districts</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Pune">Pune</SelectItem>
                    <SelectItem value="Nagpur">Nagpur</SelectItem>
                    <SelectItem value="Nashik">Nashik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="course">Course Stream</Label>
                <Select 
                  value={filters.course} 
                  onValueChange={(value) => handleFilterChange("course", value)}
                >
                  <SelectTrigger data-testid="select-course">
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Courses</SelectItem>
                    <SelectItem value="computer-science">B.Tech Computer Science</SelectItem>
                    <SelectItem value="commerce">B.Com</SelectItem>
                    <SelectItem value="physics">B.Sc Physics</SelectItem>
                    <SelectItem value="medicine">MBBS</SelectItem>
                    <SelectItem value="architecture">B.Arch</SelectItem>
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

        {/* College Results */}
        <div className="space-y-6" data-testid="college-results">
          {displayColleges.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No colleges found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to find more colleges.
                </p>
              </CardContent>
            </Card>
          ) : (
            displayColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))
          )}
        </div>

        {/* Pagination */}
        {displayColleges.length > 0 && (
          <div className="flex justify-center mt-8" data-testid="pagination">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="default" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Colleges;
