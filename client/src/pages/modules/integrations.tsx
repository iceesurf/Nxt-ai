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
import { Plug, CheckCircle, XCircle, Settings, Key } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  isConnected: boolean;
  category: "social" | "email" | "analytics" | "automation" | "payment";
}

const integrations: Integration[] = [
  {
    id: "facebook",
    name: "Facebook Ads",
    description: "Integre com Facebook e Instagram para campanhas",
    icon: "📘",
    isConnected: false,
    category: "social",
  },
  {
    id: "google",
    name: "Google Ads",
    description: "Conecte com Google Ads e Analytics",
    icon: "🔍",
    isConnected: false,
    category: "analytics",
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Sincronize listas de email e campanhas",
    icon: "📧",
    isConnected: false,
    category: "email",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Conecte com milhares de aplicativos",
    icon: "⚡",
    isConnected: true,
    category: "automation",
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Processamento de pagamentos",
    icon: "💳",
    isConnected: false,
    category: "payment",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Notificações e alertas via Slack",
    icon: "💬",
    isConnected: false,
    category: "automation",
  },
];

export default function Integrations() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [apiKeys, setApiKeys] = useState({
    facebook: "",
    google: "",
    mailchimp: "",
    zapier: "",
    stripe: "",
    slack: "",
  });

  const filteredIntegrations = integrations.filter(
    (integration) => selectedCategory === "all" || integration.category === selectedCategory
  );

  const handleApiKeyChange = (integrationId: string, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [integrationId]: value,
    }));
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Integrações" 
          description="Conecte a NXT.ai com suas ferramentas favoritas"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plug className="mr-2 h-5 w-5 text-accent" />
                  Central de Integrações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="all">Todas</TabsTrigger>
                    <TabsTrigger value="social">Social</TabsTrigger>
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="automation">Automação</TabsTrigger>
                    <TabsTrigger value="payment">Pagamento</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredIntegrations.map((integration) => (
                        <IntegrationCard 
                          key={integration.id} 
                          integration={integration}
                          apiKey={apiKeys[integration.id as keyof typeof apiKeys]}
                          onApiKeyChange={handleApiKeyChange}
                        />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="social" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredIntegrations.map((integration) => (
                        <IntegrationCard 
                          key={integration.id} 
                          integration={integration}
                          apiKey={apiKeys[integration.id as keyof typeof apiKeys]}
                          onApiKeyChange={handleApiKeyChange}
                        />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="email" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredIntegrations.map((integration) => (
                        <IntegrationCard 
                          key={integration.id} 
                          integration={integration}
                          apiKey={apiKeys[integration.id as keyof typeof apiKeys]}
                          onApiKeyChange={handleApiKeyChange}
                        />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="analytics" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredIntegrations.map((integration) => (
                        <IntegrationCard 
                          key={integration.id} 
                          integration={integration}
                          apiKey={apiKeys[integration.id as keyof typeof apiKeys]}
                          onApiKeyChange={handleApiKeyChange}
                        />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="automation" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredIntegrations.map((integration) => (
                        <IntegrationCard 
                          key={integration.id} 
                          integration={integration}
                          apiKey={apiKeys[integration.id as keyof typeof apiKeys]}
                          onApiKeyChange={handleApiKeyChange}
                        />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="payment" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredIntegrations.map((integration) => (
                        <IntegrationCard 
                          key={integration.id} 
                          integration={integration}
                          apiKey={apiKeys[integration.id as keyof typeof apiKeys]}
                          onApiKeyChange={handleApiKeyChange}
                        />
                      ))}
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

function IntegrationCard({ 
  integration, 
  apiKey, 
  onApiKeyChange 
}: { 
  integration: Integration;
  apiKey: string;
  onApiKeyChange: (id: string, value: string) => void;
}) {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <Card className={`transition-all ${integration.isConnected ? 'ring-2 ring-green-500/20' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{integration.icon}</div>
            <div>
              <h3 className="font-medium">{integration.name}</h3>
              <p className="text-sm text-muted-foreground">{integration.description}</p>
            </div>
          </div>
          <Badge variant={integration.isConnected ? "default" : "secondary"}>
            {integration.isConnected ? (
              <CheckCircle className="h-3 w-3 mr-1" />
            ) : (
              <XCircle className="h-3 w-3 mr-1" />
            )}
            {integration.isConnected ? "Conectado" : "Desconectado"}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Ativo</Label>
            <Switch checked={integration.isConnected} />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm flex items-center">
              <Key className="h-3 w-3 mr-1" />
              API Key
            </Label>
            <Input
              type={showApiKey ? "text" : "password"}
              placeholder="Cole sua API key aqui..."
              value={apiKey}
              onChange={(e) => onApiKeyChange(integration.id, e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? "Ocultar" : "Mostrar"} Key
            </Button>
            <Button size="sm" className="flex-1">
              <Settings className="h-3 w-3 mr-1" />
              Configurar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
