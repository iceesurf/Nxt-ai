import { useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Send, Settings, Brain, MessageCircle } from "lucide-react";

export default function Chatbot() {
  const { user } = useAuth();
  const [botName, setBotName] = useState("Assistente NXT");
  const [welcomeMessage, setWelcomeMessage] = useState("Olá! Como posso ajudar você hoje?");
  const [aiProvider, setAiProvider] = useState("openai");

  if (!user) return null;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Chatbot com IA" 
          description="Configure e gerencie seu chatbot inteligente"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Bot className="mr-2 h-5 w-5 text-accent" />
                    Chatbot com IA
                  </CardTitle>
                  <Button className="gradient-bg hover:opacity-90">
                    <Settings className="mr-2 h-4 w-4" />
                    Configurar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Configuration Panel */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Configuração do Bot</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bot-name">Nome do Bot</Label>
                        <Input
                          id="bot-name"
                          value={botName}
                          onChange={(e) => setBotName(e.target.value)}
                          placeholder="Nome do seu bot"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="welcome-message">Mensagem de Boas-vindas</Label>
                        <Textarea
                          id="welcome-message"
                          value={welcomeMessage}
                          onChange={(e) => setWelcomeMessage(e.target.value)}
                          placeholder="Primeira mensagem que o bot enviará"
                          className="h-20"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="ai-provider">Integração com IA</Label>
                        <Select value={aiProvider} onValueChange={setAiProvider}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="openai">OpenAI GPT-4</SelectItem>
                            <SelectItem value="claude">Claude</SelectItem>
                            <SelectItem value="gemini">Gemini</SelectItem>
                            <SelectItem value="custom">API Personalizada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Configurações Avançadas</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm text-muted-foreground">Temperatura</Label>
                            <Input type="number" defaultValue="0.7" min="0" max="1" step="0.1" />
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Máx. Tokens</Label>
                            <Input type="number" defaultValue="150" min="50" max="500" />
                          </div>
                        </div>
                      </div>

                      <Button className="w-full">
                        Salvar Configurações
                      </Button>
                    </CardContent>
                  </Card>
                  
                  {/* Chat Preview */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Preview do Chat</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-muted/20 rounded-lg p-4 overflow-y-auto mb-4">
                        <div className="space-y-3">
                          <div className="flex items-start space-x-2">
                            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                              <Bot className="h-3 w-3 text-accent-foreground" />
                            </div>
                            <div className="bg-card rounded-lg p-2 text-sm max-w-xs">
                              {welcomeMessage}
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-2 justify-end">
                            <div className="bg-accent rounded-lg p-2 text-sm text-accent-foreground max-w-xs">
                              Quais são seus serviços?
                            </div>
                            <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                              <MessageCircle className="h-3 w-3" />
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-2">
                            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                              <Bot className="h-3 w-3 text-accent-foreground" />
                            </div>
                            <div className="bg-card rounded-lg p-2 text-sm max-w-xs">
                              Oferecemos soluções completas de automação de marketing, CRM integrado, workflows inteligentes e muito mais. Como posso ajudar você especificamente?
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Digite sua mensagem..."
                          className="flex-1"
                        />
                        <Button size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Knowledge Base */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="mr-2 h-4 w-4 text-accent" />
                      Base de Conhecimento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h4 className="font-medium mb-2">Treinamento em Desenvolvimento</h4>
                      <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                        Funcionalidade para treinar o bot com documentos, FAQs e dados específicos da empresa será implementada aqui.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                        <div className="text-center p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">📄 Documentos</h5>
                          <p className="text-sm text-muted-foreground">Upload de PDFs, DOCs para treinamento</p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">❓ FAQs</h5>
                          <p className="text-sm text-muted-foreground">Perguntas e respostas frequentes</p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">🌐 Website</h5>
                          <p className="text-sm text-muted-foreground">Scraping de conteúdo do site</p>
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
