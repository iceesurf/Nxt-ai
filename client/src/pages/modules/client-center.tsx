import { useAuth } from "@/components/auth/auth-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { 
  UserCog, CheckCircle, Clock, AlertTriangle, Users, 
  BarChart3, Settings, Bell, Calendar, FileText, 
  CreditCard, Zap, Shield, Globe, Headphones
} from "lucide-react";

export default function ClientCenter() {
  const { user, company } = useAuth();

  const { data: stats } = useQuery({
    queryKey: ["/api/dashboard/stats"],
    enabled: !!user,
  });

  // Mock client data - TODO: Replace with real data
  const clientOverview = {
    activeModules: 8,
    totalModules: 10,
    setupProgress: 80,
    lastLogin: "2024-01-25T10:30:00Z",
    accountStatus: "active",
    subscription: {
      plan: "Pro",
      status: "active",
      renewDate: "2024-02-25",
      usage: {
        leads: { current: 1247, limit: 5000 },
        emails: { current: 23450, limit: 50000 },
        storage: { current: 2.1, limit: 10 }, // GB
      }
    }
  };

  const moduleStatus = [
    { name: "CRM e Leads", status: "active", usage: 85, icon: Users },
    { name: "Campanhas Marketing", status: "active", usage: 60, icon: BarChart3 },
    { name: "Workflows", status: "active", usage: 45, icon: Zap },
    { name: "Chatbot com IA", status: "setup", usage: 20, icon: UserCog },
    { name: "Integrações", status: "active", usage: 70, icon: Globe },
    { name: "Financeiro / ASAAS", status: "inactive", usage: 0, icon: CreditCard },
    { name: "Webhooks", status: "active", usage: 30, icon: Settings },
    { name: "Relatórios com IA", status: "active", usage: 55, icon: BarChart3 },
    { name: "Landing Pages", status: "setup", usage: 10, icon: Globe },
    { name: "Central do Cliente", status: "active", usage: 95, icon: UserCog },
  ];

  const recentActivities = [
    {
      type: "login",
      message: "Login realizado com sucesso",
      timestamp: "2024-01-25T10:30:00Z",
      icon: Shield,
    },
    {
      type: "module",
      message: "Módulo CRM configurado",
      timestamp: "2024-01-25T09:15:00Z",
      icon: Users,
    },
    {
      type: "campaign",
      message: "Campanha 'Newsletter Janeiro' enviada",
      timestamp: "2024-01-24T16:45:00Z",
      icon: BarChart3,
    },
    {
      type: "integration",
      message: "Integração com Zapier ativada",
      timestamp: "2024-01-24T14:20:00Z",
      icon: Zap,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400";
      case "setup":
        return "bg-yellow-500/20 text-yellow-400";
      case "inactive":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "setup":
        return "Configurando";
      case "inactive":
        return "Inativo";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-3 w-3" />;
      case "setup":
        return <Clock className="h-3 w-3" />;
      case "inactive":
        return <AlertTriangle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Central do Cliente" 
          description="Visão geral da sua conta e configurações"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Account Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Módulos Ativos</p>
                      <p className="text-2xl font-bold text-foreground">
                        {clientOverview.activeModules}/{clientOverview.totalModules}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <UserCog className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={(clientOverview.activeModules / clientOverview.totalModules) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Progresso Setup</p>
                      <p className="text-2xl font-bold text-foreground">
                        {clientOverview.setupProgress}%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Settings className="h-6 w-6 text-yellow-400" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={clientOverview.setupProgress} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Plano Atual</p>
                      <p className="text-2xl font-bold text-foreground">
                        {clientOverview.subscription.plan}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Badge className="bg-green-500/20 text-green-400">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Ativo
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Suporte</p>
                      <p className="text-2xl font-bold text-foreground">24/7</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Headphones className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      Contatar Suporte
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="modules">Módulos</TabsTrigger>
                <TabsTrigger value="usage">Uso</TabsTrigger>
                <TabsTrigger value="support">Suporte</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Account Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Informações da Conta</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div>
                          <p className="font-medium">Empresa</p>
                          <p className="text-sm text-muted-foreground">{company?.name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div>
                          <p className="font-medium">Administrador</p>
                          <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div>
                          <p className="font-medium">Último Login</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(clientOverview.lastLogin).toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div>
                          <p className="font-medium">Renovação</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(clientOverview.subscription.renewDate).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activities */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Atividades Recentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentActivities.map((activity, index) => {
                          const Icon = activity.icon;
                          return (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/10 rounded-lg">
                              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                                <Icon className="h-4 w-4 text-accent" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{activity.message}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(activity.timestamp).toLocaleString('pt-BR')}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="modules" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Status dos Módulos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {moduleStatus.map((module, index) => {
                        const Icon = module.icon;
                        return (
                          <Card key={index} className="border-l-4 border-l-accent">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                                    <Icon className="h-4 w-4 text-accent" />
                                  </div>
                                  <h4 className="font-medium">{module.name}</h4>
                                </div>
                                <Badge className={getStatusColor(module.status)}>
                                  {getStatusIcon(module.status)}
                                  {getStatusLabel(module.status)}
                                </Badge>
                              </div>
                              
                              {module.status === "active" && (
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Uso</span>
                                    <span>{module.usage}%</span>
                                  </div>
                                  <Progress value={module.usage} className="h-2" />
                                </div>
                              )}
                              
                              {module.status === "setup" && (
                                <Button variant="outline" size="sm" className="w-full mt-2">
                                  Continuar Configuração
                                </Button>
                              )}
                              
                              {module.status === "inactive" && (
                                <Button variant="outline" size="sm" className="w-full mt-2">
                                  Ativar Módulo
                                </Button>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="usage" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Usado</span>
                          <span>{clientOverview.subscription.usage.leads.current.toLocaleString()}</span>
                        </div>
                        <Progress 
                          value={(clientOverview.subscription.usage.leads.current / clientOverview.subscription.usage.leads.limit) * 100} 
                          className="h-2" 
                        />
                        <div className="text-xs text-muted-foreground">
                          Limite: {clientOverview.subscription.usage.leads.limit.toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Emails</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Enviados</span>
                          <span>{clientOverview.subscription.usage.emails.current.toLocaleString()}</span>
                        </div>
                        <Progress 
                          value={(clientOverview.subscription.usage.emails.current / clientOverview.subscription.usage.emails.limit) * 100} 
                          className="h-2" 
                        />
                        <div className="text-xs text-muted-foreground">
                          Limite: {clientOverview.subscription.usage.emails.limit.toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Armazenamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Usado</span>
                          <span>{clientOverview.subscription.usage.storage.current} GB</span>
                        </div>
                        <Progress 
                          value={(clientOverview.subscription.usage.storage.current / clientOverview.subscription.usage.storage.limit) * 100} 
                          className="h-2" 
                        />
                        <div className="text-xs text-muted-foreground">
                          Limite: {clientOverview.subscription.usage.storage.limit} GB
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="support" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recursos de Suporte</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="mr-2 h-4 w-4" />
                        Base de Conhecimento
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        Agendar Consultoria
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Headphones className="mr-2 h-4 w-4" />
                        Chat com Suporte
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Globe className="mr-2 h-4 w-4" />
                        Comunidade
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Informações de Contato</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 bg-muted/20 rounded-lg">
                        <p className="font-medium">Email de Suporte</p>
                        <p className="text-sm text-muted-foreground">suporte@dnxtai.com</p>
                      </div>
                      <div className="p-3 bg-muted/20 rounded-lg">
                        <p className="font-medium">WhatsApp</p>
                        <p className="text-sm text-muted-foreground">+55 (11) 99999-9999</p>
                      </div>
                      <div className="p-3 bg-muted/20 rounded-lg">
                        <p className="font-medium">Horário de Atendimento</p>
                        <p className="text-sm text-muted-foreground">24/7 via chat</p>
                        <p className="text-sm text-muted-foreground">Segunda a Sexta: 9h às 18h</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
