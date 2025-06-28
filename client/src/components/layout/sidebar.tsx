import { Link, useLocation } from "wouter";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Home, Users, Megaphone, Workflow, Bot, Plug, 
  CreditCard, Link as LinkIcon, BarChart, PaintBucket,
  UserCog, Settings, Rocket, LogOut
} from "lucide-react";

const navigationItems = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/crm", label: "CRM e Leads", icon: Users },
  { path: "/marketing", label: "Campanhas Marketing", icon: Megaphone },
  { path: "/workflows", label: "Workflows", icon: Workflow },
  { path: "/chatbot", label: "Chatbot com IA", icon: Bot },
  { path: "/integrations", label: "Integrações", icon: Plug },
  { path: "/financial", label: "Financeiro / ASAAS", icon: CreditCard },
  { path: "/webhooks", label: "Webhooks", icon: LinkIcon },
  { path: "/reports", label: "Relatórios com IA", icon: BarChart },
  { path: "/landing", label: "Landing Pages", icon: PaintBucket },
  { path: "/client-center", label: "Central do Cliente", icon: UserCog },
];

export function Sidebar() {
  const [location] = useLocation();
  const { user, company, logout } = useAuth();

  return (
    <div className="w-64 bg-card border-r flex flex-col h-full">
      {/* Logo and Brand */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
            <Rocket className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">NXT.ai</h1>
            <p className="text-xs text-muted-foreground">Plataforma SaaS</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-accent-foreground">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.email}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {user?.role === 'admin' ? 'Administrador' : user?.role}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link key={item.path} href={item.path}>
              <div className={`sidebar-item p-3 rounded-lg cursor-pointer ${isActive ? 'active' : ''}`}>
                <div className="flex items-center space-x-3">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-accent' : 'text-muted-foreground'}`} />
                  <span className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {item.label}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t space-y-2">
        <Button 
          variant="secondary" 
          className="w-full justify-start"
          size="sm"
        >
          <Settings className="mr-2 h-4 w-4" />
          Configurações
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start"
          size="sm"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  );
}
