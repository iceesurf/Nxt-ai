import { useAuth } from "@/components/auth/auth-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Users, Megaphone, Workflow, DollarSign, TrendingUp, Plus, Mail, Settings, Brain, Lightbulb, BarChart3, Database, Shield, Link as LinkIcon, Bot } from "lucide-react";

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
    enabled: !!user,
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Dashboard" 
          description="Visão geral da plataforma"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Leads</p>
                      <p className="text-2xl font-bold text-foreground">
                        {statsLoading ? "..." : stats?.totalLeads || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+12% vs mês anterior</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Campanhas Ativas</p>
                      <p className="text-2xl font-bold text-foreground">
                        {statsLoading ? "..." : stats?.activeCampaigns || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Megaphone className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+8% vs mês anterior</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Workflows Ativos</p>
                      <p className="text-2xl font-bold text-foreground">
                        {statsLoading ? "..." : stats?.activeWorkflows || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Workflow className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+25% vs mês anterior</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Receita Mensal</p>
                      <p className="text-2xl font-bold text-foreground">
                        R$ {statsLoading ? "..." : (stats?.monthlyRevenue || 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-yellow-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+18% vs mês anterior</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button 
                    variant="outline"
                    className="bg-accent/10 hover:bg-accent/20 border-accent/30 p-4 h-auto justify-start"
                  >
                    <div className="flex flex-col items-start space-y-2">
                      <Plus className="h-5 w-5 text-accent" />
                      <div>
                        <h4 className="font-medium">Novo Lead</h4>
                        <p className="text-sm text-muted-foreground">Adicionar novo lead ao CRM</p>
                      </div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30 p-4 h-auto justify-start"
                  >
                    <div className="flex flex-col items-start space-y-2">
                      <Mail className="h-5 w-5 text-blue-400" />
                      <div>
                        <h4 className="font-medium">Nova Campanha</h4>
                        <p className="text-sm text-muted-foreground">Criar campanha de marketing</p>
                      </div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="bg-green-500/10 hover:bg-green-500/20 border-green-500/30 p-4 h-auto justify-start"
                  >
                    <div className="flex flex-col items-start space-y-2">
                      <Settings className="h-5 w-5 text-green-400" />
                      <div>
                        <h4 className="font-medium">Novo Workflow</h4>
                        <p className="text-sm text-muted-foreground">Automatizar processo</p>
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity and AI Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Atividade Recente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-muted/10 rounded-lg">
                      <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                        <Plus className="h-4 w-4 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Novo lead adicionado</p>
                        <p className="text-xs text-muted-foreground">João Silva - há 2 minutos</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-muted/10 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <Mail className="h-4 w-4 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Campanha enviada</p>
                        <p className="text-xs text-muted-foreground">Newsletter Dezembro - há 15 minutos</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-muted/10 rounded-lg">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                        <Workflow className="h-4 w-4 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Workflow completado</p>
                        <p className="text-xs text-muted-foreground">Processo de boas-vindas - há 1 hora</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 text-accent mr-2" />
                    Insights com IA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-accent/10 to-purple-600/10 rounded-lg border border-accent/20">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Lightbulb className="h-3 w-3 text-accent-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Otimização de Campanhas</h4>
                          <p className="text-sm text-muted-foreground">
                            Suas campanhas de email têm 23% mais engajamento às terças-feiras. 
                            Considere agendar mais envios neste dia.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-blue-500/10 to-indigo-600/10 rounded-lg border border-blue-500/20">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <BarChart3 className="h-3 w-3 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Tendência de Leads</h4>
                          <p className="text-sm text-muted-foreground">
                            Aumento de 34% em leads qualificados este mês. 
                            Principais fontes: LinkedIn (45%) e Google Ads (32%).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Platform Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status da Plataforma</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Database className="h-6 w-6 text-green-400" />
                    </div>
                    <p className="text-sm font-medium">Banco de Dados</p>
                    <p className="text-xs text-green-400">Operacional</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Mail className="h-6 w-6 text-green-400" />
                    </div>
                    <p className="text-sm font-medium">Email Service</p>
                    <p className="text-xs text-green-400">Operacional</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <LinkIcon className="h-6 w-6 text-green-400" />
                    </div>
                    <p className="text-sm font-medium">APIs</p>
                    <p className="text-xs text-green-400">Operacional</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Bot className="h-6 w-6 text-yellow-400" />
                    </div>
                    <p className="text-sm font-medium">IA Services</p>
                    <p className="text-xs text-yellow-400">Limitado</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Shield className="h-6 w-6 text-green-400" />
                    </div>
                    <p className="text-sm font-medium">Segurança</p>
                    <p className="text-xs text-green-400">Protegido</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
