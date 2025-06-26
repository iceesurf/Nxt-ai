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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CreditCard, DollarSign, TrendingUp, AlertCircle, CheckCircle, Settings, Key, Eye, EyeOff } from "lucide-react";

export default function Financial() {
  const { user } = useAuth();
  const [asaasApiKey, setAsaasApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isAsaasConnected, setIsAsaasConnected] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");

  // Mock financial data - TODO: Replace with real API integration
  const financialStats = {
    monthlyRevenue: 45890,
    pendingPayments: 12340,
    processedTransactions: 156,
    conversionRate: 3.2,
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Financeiro / ASAAS" 
          description="Gerencie pagamentos e integrações financeiras"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Financial Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Receita Mensal</p>
                      <p className="text-2xl font-bold text-foreground">
                        R$ {financialStats.monthlyRevenue.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+18% vs mês anterior</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Pagamentos Pendentes</p>
                      <p className="text-2xl font-bold text-foreground">
                        R$ {financialStats.pendingPayments.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-yellow-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-muted-foreground text-sm">23 faturas em aberto</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Transações Processadas</p>
                      <p className="text-2xl font-bold text-foreground">
                        {financialStats.processedTransactions}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-muted-foreground text-sm">Este mês</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Taxa de Conversão</p>
                      <p className="text-2xl font-bold text-foreground">
                        {financialStats.conversionRate}%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+0.8% vs mês anterior</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ASAAS Integration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-accent" />
                  Integração ASAAS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="config" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="config">Configuração</TabsTrigger>
                    <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                    <TabsTrigger value="transactions">Transações</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="config" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Credenciais ASAAS</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                                <CreditCard className="h-4 w-4 text-accent" />
                              </div>
                              <div>
                                <p className="font-medium">Status da Conexão</p>
                                <p className="text-sm text-muted-foreground">
                                  {isAsaasConnected ? "Conectado com sucesso" : "Não conectado"}
                                </p>
                              </div>
                            </div>
                            <Badge variant={isAsaasConnected ? "default" : "secondary"}>
                              {isAsaasConnected ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : (
                                <AlertCircle className="h-3 w-3 mr-1" />
                              )}
                              {isAsaasConnected ? "Ativo" : "Inativo"}
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="asaas-api-key" className="flex items-center">
                              <Key className="h-3 w-3 mr-1" />
                              API Key ASAAS
                            </Label>
                            <div className="flex space-x-2">
                              <Input
                                id="asaas-api-key"
                                type={showApiKey ? "text" : "password"}
                                placeholder="$aact_YTU5YTE0M2Jl..."
                                value={asaasApiKey}
                                onChange={(e) => setAsaasApiKey(e.target.value)}
                                className="flex-1"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowApiKey(!showApiKey)}
                              >
                                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Obtenha sua API Key no painel ASAAS em Configurações → Integrações
                            </p>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch 
                              checked={isAsaasConnected} 
                              onCheckedChange={setIsAsaasConnected}
                            />
                            <Label>Habilitar integração ASAAS</Label>
                          </div>

                          <Button 
                            className="w-full"
                            disabled={!asaasApiKey}
                          >
                            Testar Conexão
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Configurações de Pagamento</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Métodos de Pagamento Aceitos</Label>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Switch defaultChecked />
                                <Label>Cartão de Crédito</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch defaultChecked />
                                <Label>PIX</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch />
                                <Label>Boleto Bancário</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch />
                                <Label>Débito Automático</Label>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <Label>Configurações de Cobrança</Label>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm text-muted-foreground">Vencimento Padrão</Label>
                                <Input type="number" defaultValue="30" />
                                <p className="text-xs text-muted-foreground">dias</p>
                              </div>
                              <div>
                                <Label className="text-sm text-muted-foreground">Multa (%)</Label>
                                <Input type="number" defaultValue="2" step="0.1" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="webhooks" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Configuração de Webhooks</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="webhook-url">URL do Webhook</Label>
                          <Input
                            id="webhook-url"
                            type="url"
                            placeholder="https://sua-app.com/webhooks/asaas"
                            value={webhookUrl}
                            onChange={(e) => setWebhookUrl(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            Esta URL receberá notificações sobre mudanças de status de pagamentos
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label>Eventos a Monitorar</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <Switch defaultChecked />
                              <Label className="text-sm">Pagamento Confirmado</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch defaultChecked />
                              <Label className="text-sm">Pagamento Vencido</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch />
                              <Label className="text-sm">Cobrança Criada</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch />
                              <Label className="text-sm">Cobrança Cancelada</Label>
                            </div>
                          </div>
                        </div>

                        <Button>Salvar Configurações</Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="transactions" className="space-y-4">
                    <div className="text-center py-12">
                      <CreditCard className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <h4 className="text-lg font-medium mb-2">Histórico de Transações</h4>
                      <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                        Visualização completa de transações e relatórios financeiros será implementada aqui.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        <div className="text-left p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">📊 Relatórios</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Faturamento por período</li>
                            <li>• Taxa de inadimplência</li>
                            <li>• Métodos de pagamento mais usados</li>
                            <li>• Análise de recorrência</li>
                          </ul>
                        </div>
                        <div className="text-left p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">💰 Gestão</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Criar cobrança manual</li>
                            <li>• Enviar lembrete de pagamento</li>
                            <li>• Cancelar cobrança</li>
                            <li>• Aplicar desconto/multa</li>
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
