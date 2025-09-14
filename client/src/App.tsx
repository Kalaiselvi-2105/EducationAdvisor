import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Assessment from "@/pages/assessment";
import Recommendations from "@/pages/recommendations";
import Colleges from "@/pages/colleges";
import CareerMapping from "@/pages/career-mapping";
import Scholarships from "@/pages/scholarships";
import StudyMaterials from "@/pages/study-materials";
import Navigation from "@/components/navigation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/assessment" component={Assessment} />
      <Route path="/recommendations" component={Recommendations} />
      <Route path="/colleges" component={Colleges} />
      <Route path="/career-mapping" component={CareerMapping} />
      <Route path="/scholarships" component={Scholarships} />
      <Route path="/study-materials" component={StudyMaterials} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main>
            <Router />
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
