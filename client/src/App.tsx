import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/components/auth/auth-provider";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import CRM from "@/pages/modules/crm";
import Marketing from "@/pages/modules/marketing";
import Workflows from "@/pages/modules/workflows";
import Chatbot from "@/pages/modules/chatbot";
import Integrations from "@/pages/modules/integrations";
import Financial from "@/pages/modules/financial";
import Webhooks from "@/pages/modules/webhooks";
import Reports from "@/pages/modules/reports";
import Landing from "@/pages/modules/landing";
import ClientCenter from "@/pages/modules/client-center";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Dashboard} />
      <Route path="/crm" component={CRM} />
      <Route path="/marketing" component={Marketing} />
      <Route path="/workflows" component={Workflows} />
      <Route path="/chatbot" component={Chatbot} />
      <Route path="/integrations" component={Integrations} />
      <Route path="/financial" component={Financial} />
      <Route path="/webhooks" component={Webhooks} />
      <Route path="/reports" component={Reports} />
      <Route path="/landing" component={Landing} />
      <Route path="/client-center" component={ClientCenter} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
