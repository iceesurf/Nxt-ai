import { useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { 
  BarChart3, Brain, TrendingUp, Users, Mail, DollarSign, 
  Download, RefreshCw, Calendar, Filter, Lightbulb, 
  Target, Zap, Award, ArrowUp, ArrowDown
} from "lucide-react";

export default function Reports() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [selectedReport, setSelectedReport] = useState("overview");

  const { data: stats } = useQuery({
    queryKey: ["/api/dashboard/stats"],
    enabled: !!user,
  });

  // Mock data for demonstration - TODO: Replace with real analytics
  const reportData = {
    leadConversion: {
      rate: 24.5,
      change: +2.3,
      trend: "up"
    },
    emailPerformance: {
      openRate: 32.1,
      clickRate: 4.8,
      change: +1.2,
      trend: "up"
    },
    revenueGrowth: {
      value: 45890,
      change: +18.5,
      trend: "up"
    },
    customerSatisfaction: {
      score: 4.6,
      change: +0.2,
      trend: "up"
    }
  };

  const aiInsights = [
    {
      type: "optimization",
      title: "Otimização de Campanhas de Email",
      description: "Suas campanhas têm 23% mais engajamento às terças-feiras entre 14h-16h",
      impact: "high",
      action: "Reagendar campanhas para este horário"
    },
    {
      type: "trend",
      title: "Crescimento de Leads Qualificados",
      description: "LinkedIn está gerando 34% mais leads qualificados que outras fontes",
      impact: "medium",
      action: "Aumentar investimento em LinkedIn Ads"
    },
    {
      type: "alert",
      title: "Taxa de Abandono em Formulários",
      description: "12% dos visitantes abandonam formulários no campo telefone",
      impact: "medium",
      action: "Tornar campo telefone opcional"
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500/20 text-red-400";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400";
      case "low":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === "up") {
      return <ArrowUp className="h-4 w-4 text-green-400" />;
    } else if (trend === "down") {
      return <ArrowDown className="h-4 w-4 text-red-400" />;
    }
    return null;
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Relatórios com IA" 
          description="Análises inteligentes e insights automatizados"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Controls */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">Últimos 7 dias</SelectItem>
                        <SelectItem value="30d">Últimos 30 dias</SelectItem>
                        <SelectItem value="90d">Últimos 90 dias</SelectItem>
                        <SelectItem value="1y">Último ano</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedReport} onValueChange={setSelectedReport}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="overview">Visão Geral</SelectItem>
                        <SelectItem value="leads">Análise de Leads</SelectItem>
                        <SelectItem value="campaigns">Performance de Campanhas</SelectItem>
                        <SelectItem value="revenue">Análise de Receita</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Atualizar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Exportar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-accent" />
                  Insights Inteligentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {aiInsights.map((insight, index) => (
                    <Card key={index} className="border-l-4 border-l-accent">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Lightbulb className="h-4 w-4 text-accent" />
                            <Badge className={getImpactColor(insight.impact)}>
                              {insight.impact === "high" && "Alto Impacto"}
                              {insight.impact === "medium" && "Médio Impacto"}
                              {insight.impact === "low" && "Baixo Impacto"}
                            </Badge>
                          </div>
                        </div>
                        <h4 className="font-medium mb-2">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Ação sugerida:</span>
                          <Button variant="ghost" size="sm">
                            <Zap className="h-3 w-3 mr-1" />
                            Aplicar
                          </Button>
                        </div>
                        <p className="text-xs text-accent mt-1">{insight.action}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Taxa de Conversão</p>
                      <p className="text-2xl font-bold text-foreground">
                        {reportData.leadConversion.rate}%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Target className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    {getTrendIcon(reportData.leadConversion.trend, reportData.leadConversion.change)}
                    <span className="text-green-400 text-sm ml-1">
                      +{reportData.leadConversion.change}% vs período anterior
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Taxa de Abertura Email</p>
                      <p className="text-2xl font-bold text-foreground">
                        {reportData.emailPerformance.openRate}%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    {getTrendIcon(reportData.emailPerformance.trend, reportData.emailPerformance.change)}
                    <span className="text-green-400 text-sm ml-1">
                      +{reportData.emailPerformance.change}% vs período anterior
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Crescimento de Receita</p>
                      <p className="text-2xl font-bold text-foreground">
                        +{reportData.revenueGrowth.change}%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    {getTrendIcon(reportData.revenueGrowth.trend, reportData.revenueGrowth.change)}
                    <span className="text-green-400 text-sm ml-1">
                      R$ {reportData.revenueGrowth.value.toLocaleString()} este mês
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Satisfação do Cliente</p>
                      <p className="text-2xl font-bold text-foreground">
                        {reportData.customerSatisfaction.score}/5
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-yellow-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    {getTrendIcon(reportData.customerSatisfaction.trend, reportData.customerSatisfaction.change)}
                    <span className="text-green-400 text-sm ml-1">
                      +{reportData.customerSatisfaction.change} vs período anterior
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-accent" />
                  Relatórios Detalhados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="charts" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="charts">Gráficos</TabsTrigger>
                    <TabsTrigger value="tables">Tabelas</TabsTrigger>
                    <TabsTrigger value="predictions">Predições IA</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="charts" className="mt-6">
                    <div className="text-center py-12">
                      <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <h4 className="text-lg font-medium mb-2">Gráficos Interativos</h4>
                      <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                        Visualizações avançadas com Recharts serão implementadas aqui.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        <div className="text-left p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">📊 Tipos de Gráfico</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Barras e colunas</li>
                            <li>• Linhas temporais</li>
                            <li>• Pizza e rosca</li>
                            <li>• Heatmaps</li>
                          </ul>
                        </div>
                        <div className="text-left p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">🎯 Métricas</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Funil de conversão</li>
                            <li>• Retenção de clientes</li>
                            <li>• Performance por canal</li>
                            <li>• ROI por campanha</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tables" className="mt-6">
                    <div className="text-center py-12">
                      <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <h4 className="text-lg font-medium mb-2">Tabelas de Dados</h4>
                      <p className="text-muted-foreground mb-4">
                        Relatórios tabulares com filtros e exportação serão implementados.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="predictions" className="mt-6">
                    <div className="text-center py-12">
                      <Brain className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <h4 className="text-lg font-medium mb-2">Predições com IA</h4>
                      <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                        Modelos de machine learning para prever tendências e oportunidades.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        <div className="text-left p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">🔮 Previsões</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Receita próximos 3 meses</li>
                            <li>• Leads esperados por canal</li>
                            <li>• Churn rate de clientes</li>
                            <li>• Melhor momento para campanha</li>
                          </ul>
                        </div>
                        <div className="text-left p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">🎯 Recomendações</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Segmentação otimizada</li>
                            <li>• Preços dinâmicos</li>
                            <li>• Conteúdo personalizado</li>
                            <li>• Timing de follow-up</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
