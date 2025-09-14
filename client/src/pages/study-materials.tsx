import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Download,
  Play,
  Eye,
  Bookmark,
  FileText,
  Video,
  ClipboardList,
  Calculator,
  Book,
  Atom,
  TrendingUp,
  Users,
  HelpCircle,
  Microscope,
  Brain
} from "lucide-react";
import type { StudyMaterial } from "@shared/schema";

const StudyMaterials = () => {
  const [activeStream, setActiveStream] = useState("science");
  const [filters, setFilters] = useState({
    subject: "",
    type: "",
    search: ""
  });

  const { data: materials = [], isLoading } = useQuery<StudyMaterial[]>({
    queryKey: ["/api/study-materials", { stream: activeStream, ...filters }],
  });

  const streams = [
    { id: "science", name: "Science", icon: Atom, color: "primary" },
    { id: "commerce", name: "Commerce", icon: TrendingUp, color: "secondary" },
    { id: "arts", name: "Arts", icon: Book, color: "accent" },
    { id: "vocational", name: "Vocational", icon: Users, color: "destructive" }
  ];

  // Mock materials data organized by stream
  const mockMaterials = {
    science: {
      physics: [
        { id: "1", title: "Mechanics Notes", type: "pdf", description: "NCERT + JEE Level", duration: null },
        { id: "2", title: "Thermodynamics Video", type: "video", description: "45 mins • IIT Faculty", duration: "45 mins" },
        { id: "3", title: "Wave Motion Test", type: "test", description: "50 Questions • 1 hour", duration: "1 hour" },
        { id: "4", title: "Formula Handbook", type: "notes", description: "Quick Reference Guide", duration: null }
      ],
      chemistry: [
        { id: "5", title: "Organic Chemistry", type: "pdf", description: "Complete Reactions Guide", duration: null },
        { id: "6", title: "Periodic Table Interactive", type: "video", description: "Properties and trends explained", duration: "30 mins" },
        { id: "7", title: "Mole Concept Quiz", type: "test", description: "30 Questions • 45 mins", duration: "45 mins" },
        { id: "8", title: "Lab Manual", type: "notes", description: "Practical Experiments", duration: null }
      ],
      mathematics: [
        { id: "9", title: "Calculus Concepts", type: "pdf", description: "Limits to Integration", duration: null },
        { id: "10", title: "Trigonometry", type: "video", description: "Visual Explanation", duration: "60 mins" },
        { id: "11", title: "JEE Mock Test", type: "test", description: "100 Questions • 3 hours", duration: "3 hours" },
        { id: "12", title: "Graph Plotter Tool", type: "notes", description: "Interactive Graphs", duration: null }
      ]
    },
    commerce: {
      accountancy: [
        { id: "13", title: "Financial Accounting Basics", type: "pdf", description: "Journal entries to final accounts", duration: null },
        { id: "14", title: "CA Foundation Materials", type: "pdf", description: "Complete syllabus coverage", duration: null }
      ],
      business: [
        { id: "15", title: "Management Principles", type: "pdf", description: "Case studies and examples", duration: null },
        { id: "16", title: "Marketing Fundamentals", type: "video", description: "Modern marketing strategies", duration: "90 mins" }
      ],
      economics: [
        { id: "17", title: "Microeconomics Guide", type: "pdf", description: "Demand, supply & market structures", duration: null },
        { id: "18", title: "Indian Economy Analysis", type: "pdf", description: "Current affairs & policy impacts", duration: null }
      ]
    },
    arts: {
      english: [
        { id: "19", title: "Shakespeare's Complete Works", type: "pdf", description: "Analysis and summaries", duration: null },
        { id: "20", title: "Modern Poetry Collection", type: "pdf", description: "Contemporary Indian & world poetry", duration: null }
      ],
      history: [
        { id: "21", title: "Indian Independence Movement", type: "pdf", description: "Timeline and key figures", duration: null },
        { id: "22", title: "World History Essentials", type: "video", description: "Major civilizations & events", duration: "120 mins" }
      ],
      political: [
        { id: "23", title: "Indian Constitution", type: "pdf", description: "Fundamental rights & duties", duration: null },
        { id: "24", title: "International Relations", type: "pdf", description: "Global politics & diplomacy", duration: null }
      ]
    },
    vocational: {
      it: [
        { id: "25", title: "Web Development Basics", type: "video", description: "HTML, CSS, JavaScript", duration: "180 mins" },
        { id: "26", title: "Programming Fundamentals", type: "pdf", description: "Logic building exercises", duration: null }
      ]
    }
  };

  const currentStreamMaterials = mockMaterials[activeStream as keyof typeof mockMaterials] || {};

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf": return <FileText className="h-4 w-4 text-red-500" />;
      case "video": return <Play className="h-4 w-4 text-blue-500" />;
      case "test": return <ClipboardList className="h-4 w-4 text-green-500" />;
      default: return <Book className="h-4 w-4 text-purple-500" />;
    }
  };

  const getSubjectIcon = (subject: string) => {
    switch (subject.toLowerCase()) {
      case "physics": return <Atom className="h-6 w-6 text-primary" />;
      case "chemistry": return <Calculator className="h-6 w-6 text-secondary" />;
      case "mathematics": return <Calculator className="h-6 w-6 text-accent" />;
      default: return <Book className="h-6 w-6 text-muted-foreground" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="loading-materials">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading study materials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8" data-testid="study-materials-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8" data-testid="materials-header">
          <h1 className="text-3xl font-bold text-foreground mb-4">Study Materials</h1>
          <p className="text-lg text-muted-foreground">
            Access curated study resources organized by stream
          </p>
        </div>

        {/* Stream Tabs & Filters */}
        <Card className="mb-8" data-testid="materials-controls">
          <CardContent className="p-6">
            {/* Stream Tabs */}
            <div className="flex flex-wrap gap-2 mb-6" data-testid="stream-tabs">
              {streams.map((stream) => (
                <Button
                  key={stream.id}
                  variant={activeStream === stream.id ? "default" : "outline"}
                  className={`px-6 py-3 ${
                    activeStream === stream.id 
                      ? `bg-${stream.color} text-${stream.color}-foreground`
                      : ""
                  }`}
                  onClick={() => setActiveStream(stream.id)}
                  data-testid={`button-stream-${stream.id}`}
                >
                  <stream.icon className="h-4 w-4 mr-2" />
                  {stream.name}
                </Button>
              ))}
            </div>

            {/* Search and Filters */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="search">Search Materials</Label>
                <div className="relative">
                  <Input
                    id="search"
                    placeholder="Search study materials..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pr-10"
                    data-testid="input-search"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select 
                  value={filters.subject} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, subject: value }))}
                >
                  <SelectTrigger data-testid="select-subject">
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Subjects</SelectItem>
                    {activeStream === "science" && (
                      <>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                      </>
                    )}
                    {activeStream === "commerce" && (
                      <>
                        <SelectItem value="accountancy">Accountancy</SelectItem>
                        <SelectItem value="business">Business Studies</SelectItem>
                        <SelectItem value="economics">Economics</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="type">Type</Label>
                <Select 
                  value={filters.type} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger data-testid="select-type">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="pdf">PDFs</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="test">Practice Tests</SelectItem>
                    <SelectItem value="notes">Notes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Materials by Subject */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12" data-testid="materials-grid">
          {Object.entries(currentStreamMaterials).map(([subject, materials]) => (
            <Card key={subject} className="border border-border overflow-hidden" data-testid={`subject-${subject}`}>
              <CardHeader className={`bg-${streams.find(s => s.id === activeStream)?.color || 'primary'} text-white`}>
                <CardTitle className="flex items-center">
                  {getSubjectIcon(subject)}
                  <span className="ml-3 capitalize">{subject}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {materials.map((material: any) => (
                    <div 
                      key={material.id}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-primary/5 transition-colors"
                      data-testid={`material-${material.id}`}
                    >
                      <div className="flex items-center flex-1">
                        {getTypeIcon(material.type)}
                        <div className="ml-3">
                          <h4 className="font-medium text-card-foreground">{material.title}</h4>
                          <p className="text-sm text-muted-foreground">{material.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {material.type === "video" ? (
                          <Button variant="ghost" size="sm" data-testid={`button-play-${material.id}`}>
                            <Play className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" data-testid={`button-download-${material.id}`}>
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" data-testid={`button-view-${material.id}`}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" data-testid={`button-bookmark-${material.id}`}>
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  className={`w-full mt-4 bg-${streams.find(s => s.id === activeStream)?.color || 'primary'} hover:bg-${streams.find(s => s.id === activeStream)?.color || 'primary'}/90`}
                  data-testid={`button-view-all-${subject}`}
                >
                  View All {subject.charAt(0).toUpperCase() + subject.slice(1)} Materials
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Resources */}
        <Card className="bg-muted/30" data-testid="featured-resources">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
              Featured Study Resources
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card p-6 rounded-lg border border-border text-center card-hover">
                <Microscope className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-card-foreground mb-2">Virtual Labs</h3>
                <p className="text-sm text-muted-foreground mb-4">Practice experiments online</p>
                <Button variant="outline" size="sm" data-testid="button-virtual-labs">
                  Access Now
                </Button>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border text-center card-hover">
                <Brain className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="font-semibold text-card-foreground mb-2">Mind Maps</h3>
                <p className="text-sm text-muted-foreground mb-4">Visual concept mapping</p>
                <Button variant="outline" size="sm" data-testid="button-mind-maps">
                  Explore
                </Button>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border text-center card-hover">
                <HelpCircle className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-card-foreground mb-2">Q&A Forum</h3>
                <p className="text-sm text-muted-foreground mb-4">Get doubts cleared</p>
                <Button variant="outline" size="sm" data-testid="button-qa-forum">
                  Ask Question
                </Button>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border text-center card-hover">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-card-foreground mb-2">Study Groups</h3>
                <p className="text-sm text-muted-foreground mb-4">Join peer groups</p>
                <Button variant="outline" size="sm" data-testid="button-study-groups">
                  Join Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudyMaterials;
