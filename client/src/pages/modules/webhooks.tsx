import { useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { Plus, Link as LinkIcon, Settings, Trash2, TestTube, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import type { Webhook } from "@shared/schema";

export default function Webhooks() {
  const { user } = useAuth();
  const [showAddWebhook, setShowAddWebhook] = useState(false);
  const [newWebhook, setNewWebhook] = useState({
    name: "",
    url: "",
    events: [] as string[],
  });

  const { data: webhooks, isLoading } = useQuery({
    queryKey: ["/api/webhooks"],
    enabled: !!user,
  });

  const availableEvents = [
    { id: "lead.created", name: "Novo Lead Criado", description: "Disparado quando um novo lead é adicionado" },
    { id: "lead.updated", name: "Lead Atualizado", description: "Disparado quando um lead é modificado" },
    { id: "campaign.sent", name: "Campanha Enviada", description: "Disparado quando uma campanha é enviada" },
    { id: "workflow.completed", name: "Workflow Completado", description: "Disparado quando um workflow termina" },
    { id: "payment.confirmed", name: "Pagamento Confirmado", description: "Disparado quando um pagamento é confirmado" },
    { id: "payment.failed", name: "Pagamento Falhou", description: "Disparado quando um pagamento falha" },
  ];

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400";
  };

  const handleEventToggle = (eventId: string) => {
    setNewWebhook(prev => ({
      ...prev,
      events: prev.events.includes(eventId)
        ? prev.events.filter(e => e !== eventId)
        : [...prev.events, eventId]
    }));
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Webhooks" 
          description="Configure webhooks para receber notificações em tempo real"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <LinkIcon className="mr-2 h-5 w-5 text-accent" />
                    Gerenciamento de Webhooks
                  </CardTitle>
                  <Button 
                    className="gradient-bg hover:opacity-90"
                    onClick={() => setShowAddWebhook(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Webhook
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Webhooks List */}
                <div className="space-y-4 mb-8">
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-pulse">Carregando webhooks...</div>
                    </div>
                  ) : webhooks && webhooks.length > 0 ? (
                    webhooks.map((webhook: Webhook) => (
                      <Card key={webhook.id} className="border-l-4 border-l-accent">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                                <LinkIcon className="h-5 w-5 text-accent" />
                              </div>
                              <div>
                                <h4 className="font-medium flex items-center space-x-2">
                                  <span>{webhook.name}</span>
                                  <Badge className={getStatusColor(webhook.isActive)}>
                                    {webhook.isActive ? (
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                    ) : (
                                      <XCircle className="h-3 w-3 mr-1" />
                                    )}
                                    {webhook.isActive ? "Ativo" : "Inativo"}
                                  </Badge>
                                </h4>
                                <p className="text-sm text-muted-foreground">{webhook.url}</p>
                                <p className="text-xs text-muted-foreground">
                                  Eventos: {JSON.parse(webhook.events).length} configurados
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <TestTube className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <LinkIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <h4 className="text-lg font-medium mb-2">Nenhum webhook configurado</h4>
                      <p className="text-muted-foreground mb-4">
                        Configure webhooks para receber notificações automáticas sobre eventos da plataforma.
                      </p>
                      <Button onClick={() => setShowAddWebhook(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Criar Primeiro Webhook
                      </Button>
                    </div>
                  )}
                </div>

                {/* Add Webhook Form */}
                {showAddWebhook && (
                  <Card className="border-2 border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-base">Novo Webhook</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="webhook-name">Nome do Webhook</Label>
                          <Input
                            id="webhook-name"
                            placeholder="Ex: Notificações Lead"
                            value={newWebhook.name}
                            onChange={(e) => setNewWebhook(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="webhook-url">URL de Destino</Label>
                          <Input
                            id="webhook-url"
                            type="url"
                            placeholder="https://sua-app.com/webhook"
                            value={newWebhook.url}
                            onChange={(e) => setNewWebhook(prev => ({ ...prev, url: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label>Eventos para Monitorar</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {availableEvents.map((event) => (
                            <div key={event.id} className="flex items-start space-x-2 p-3 border rounded-lg">
                              <Switch
                                checked={newWebhook.events.includes(event.id)}
                                onCheckedChange={() => handleEventToggle(event.id)}
                              />
                              <div>
                                <Label className="text-sm font-medium">{event.name}</Label>
                                <p className="text-xs text-muted-foreground">{event.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          onClick={() => {
                            // TODO: Implement webhook creation
                            console.log("Creating webhook:", newWebhook);
                            setShowAddWebhook(false);
                            setNewWebhook({ name: "", url: "", events: [] });
                          }}
                          disabled={!newWebhook.name || !newWebhook.url || newWebhook.events.length === 0}
                        >
                          Criar Webhook
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => setShowAddWebhook(false)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Webhook Documentation */}
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="text-base">Documentação dos Webhooks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">📋 Formato da Requisição</h4>
                        <div className="bg-muted/20 p-3 rounded-lg">
                          <pre className="text-sm text-muted-foreground">
{`POST /seu-webhook-url
Content-Type: application/json

{
  "event": "lead.created",
  "timestamp": "2024-01-01T10:00:00Z",
  "data": {
    "id": 123,
    "name": "João Silva",
    "email": "joao@email.com"
  }
}`}
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">🔒 Segurança</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>• Todas as requisições incluem header X-Webhook-Signature</li>
                          <li>• Use HTTPS para URLs de webhook</li>
                          <li>• Responda com status 200 para confirmar recebimento</li>
                          <li>• Timeout de 30 segundos por requisição</li>
                          <li>• Retry automático em caso de falha (3x)</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-blue-400">Dica de Implementação</h5>
                          <p className="text-sm text-muted-foreground mt-1">
                            Recomendamos implementar uma fila de processamento assíncrono para lidar com 
                            grandes volumes de webhooks. Armazene os eventos em banco de dados para 
                            garantir que não sejam perdidos.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
