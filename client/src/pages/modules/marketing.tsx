import { useAuth } from "@/components/auth/auth-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Megaphone, TrendingUp, Users, MousePointer } from "lucide-react";

export default function Marketing() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Campanhas de Marketing" 
          description="Gerencie suas campanhas e estratégias de marketing"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Campanhas de Marketing</CardTitle>
                  <Button className="gradient-bg hover:opacity-90">
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Campanha
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium mb-2">Campanhas Ativas</h4>
                          <p className="text-2xl font-bold text-accent">23</p>
                          <p className="text-sm text-muted-foreground">+3 esta semana</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <Megaphone className="h-6 w-6 text-purple-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium mb-2">Taxa de Abertura</h4>
                          <p className="text-2xl font-bold text-green-400">24.5%</p>
                          <p className="text-sm text-muted-foreground">+2.1% vs média</p>
                        </div>
                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-green-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium mb-2">Cliques</h4>
                          <p className="text-2xl font-bold text-blue-400">1,847</p>
                          <p className="text-sm text-muted-foreground">+12% esta semana</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <MousePointer className="h-6 w-6 text-blue-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-center py-12">
                  <Megaphone className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h4 className="text-lg font-medium mb-2">Módulo em Construção</h4>
                  <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                    Interface completa para gestão de campanhas de marketing será implementada em breve. 
                    Funcionalidades incluirão:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
                    <div className="text-left">
                      <h5 className="font-medium mb-2">📧 Email Marketing</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Editor de emails drag-and-drop</li>
                        <li>• Templates responsivos</li>
                        <li>• Segmentação avançada</li>
                        <li>• A/B Testing</li>
                      </ul>
                    </div>
                    <div className="text-left">
                      <h5 className="font-medium mb-2">📱 Redes Sociais</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Agendamento de posts</li>
                        <li>• Integração com Facebook/Instagram</li>
                        <li>• Análise de engajamento</li>
                        <li>• Gestão de múltiplas contas</li>
                      </ul>
                    </div>
                  </div>
                  <Button variant="secondary">
                    Ver Roadmap Completo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
