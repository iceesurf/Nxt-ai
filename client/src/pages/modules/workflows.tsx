import { useAuth } from "@/components/auth/auth-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Plus, Workflow, Play, Pause, Settings } from "lucide-react";
import type { Workflow as WorkflowType } from "@shared/schema";

export default function Workflows() {
  const { user } = useAuth();

  const { data: workflows, isLoading } = useQuery({
    queryKey: ["/api/workflows"],
    enabled: !!user,
  });

  if (!user) return null;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Workflows" 
          description="Gerencie seus workflows automatizados"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Workflows Automatizados</CardTitle>
                  <Button className="gradient-bg hover:opacity-90">
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Workflow
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Workflows List */}
                <div className="space-y-4 mb-8">
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-pulse">Carregando workflows...</div>
                    </div>
                  ) : workflows && workflows.length > 0 ? (
                    workflows.map((workflow: WorkflowType) => (
                      <Card key={workflow.id} className="border-l-4 border-l-accent">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                                <Workflow className="h-5 w-5 text-accent" />
                              </div>
                              <div>
                                <h4 className="font-medium">{workflow.name}</h4>
                                <p className="text-sm text-muted-foreground">{workflow.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge variant={workflow.isActive ? "default" : "secondary"}>
                                {workflow.isActive ? "Ativo" : "Inativo"}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                {workflow.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Nenhum workflow encontrado</p>
                    </div>
                  )}
                </div>

                <div className="text-center py-12 border-t">
                  <Workflow className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h4 className="text-lg font-medium mb-2">Constructor Visual de Workflows</h4>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Interface drag-and-drop para criar automações complexas será implementada aqui. 
                    Similar ao N8N, permitindo conexões entre diferentes serviços.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <h5 className="font-medium mb-2">🎯 Triggers Disponíveis</h5>
                        <ul className="text-sm text-muted-foreground space-y-1 text-left">
                          <li>• Novo lead adicionado</li>
                          <li>• Email aberto/clicado</li>
                          <li>• Formulário preenchido</li>
                          <li>• Data/hora específica</li>
                          <li>• Webhook recebido</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h5 className="font-medium mb-2">⚡ Ações Possíveis</h5>
                        <ul className="text-sm text-muted-foreground space-y-1 text-left">
                          <li>• Enviar email personalizado</li>
                          <li>• Criar tarefa no CRM</li>
                          <li>• Notificar via Slack/Teams</li>
                          <li>• Atualizar dados do lead</li>
                          <li>• Chamar API externa</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Button variant="secondary">
                    Ver Documentação Completa
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
