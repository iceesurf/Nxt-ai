import { useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, PaintBucket, Eye, Settings, Copy, Share2, 
  Smartphone, Monitor, Tablet, Palette, Type, 
  Image, MousePointer, BarChart3
} from "lucide-react";

interface LandingPage {
  id: string;
  name: string;
  url: string;
  status: "draft" | "published" | "archived";
  template: string;
  visits: number;
  conversions: number;
  conversionRate: number;
  createdAt: string;
}

export default function Landing() {
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [currentPage, setCurrentPage] = useState<LandingPage | null>(null);

  // Mock landing pages data
  const landingPages: LandingPage[] = [
    {
      id: "1",
      name: "Página de Captura - Curso Digital",
      url: "curso-digital-marketing",
      status: "published",
      template: "Lead Magnet",
      visits: 1247,
      conversions: 89,
      conversionRate: 7.1,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Webinar Gratuito - Automação",
      url: "webinar-automacao",
      status: "published",
      template: "Webinar",
      visits: 2341,
      conversions: 234,
      conversionRate: 10.0,
      createdAt: "2024-01-10",
    },
    {
      id: "3",
      name: "E-book - Estratégias de CRM",
      url: "ebook-crm-estrategias",
      status: "draft",
      template: "E-book",
      visits: 0,
      conversions: 0,
      conversionRate: 0,
      createdAt: "2024-01-20",
    },
  ];

  const templates = [
    {
      id: "lead-magnet",
      name: "Lead Magnet",
      description: "Página para captura de leads com oferta de material gratuito",
      preview: "🎯",
    },
    {
      id: "webinar",
      name: "Webinar",
      description: "Landing page para inscrições em webinars e eventos online",
      preview: "📹",
    },
    {
      id: "ebook",
      name: "E-book",
      description: "Página de download de e-books e materiais educativos",
      preview: "📚",
    },
    {
      id: "produto",
      name: "Produto",
      description: "Página de vendas para produtos e serviços",
      preview: "🛍️",
    },
    {
      id: "evento",
      name: "Evento",
      description: "Página de inscrição para eventos e workshops",
      preview: "🎪",
    },
    {
      id: "consultoria",
      name: "Consultoria",
      description: "Página para agendamento de consultorias",
      preview: "💼",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/20 text-green-400";
      case "draft":
        return "bg-yellow-500/20 text-yellow-400";
      case "archived":
        return "bg-gray-500/20 text-gray-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "published":
        return "Publicado";
      case "draft":
        return "Rascunho";
      case "archived":
        return "Arquivado";
      default:
        return status;
    }
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Construtor de Landing Pages" 
          description="Crie páginas de alta conversão sem código"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {!showEditor ? (
              <>
                {/* Landing Pages List */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <PaintBucket className="mr-2 h-5 w-5 text-accent" />
                        Suas Landing Pages
                      </CardTitle>
                      <Button 
                        className="gradient-bg hover:opacity-90"
                        onClick={() => setShowEditor(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Nova Landing Page
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {landingPages.map((page) => (
                        <Card key={page.id} className="border-l-4 border-l-accent">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                                  <PaintBucket className="h-5 w-5 text-accent" />
                                </div>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <h4 className="font-medium">{page.name}</h4>
                                    <Badge className={getStatusColor(page.status)}>
                                      {getStatusLabel(page.status)}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    dnxtai.com/{page.url}
                                  </p>
                                  <div className="flex items-center space-x-4 mt-1">
                                    <span className="text-xs text-muted-foreground">
                                      Visitantes: {page.visits}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      Conversões: {page.conversions}
                                    </span>
                                    <span className="text-xs text-accent">
                                      Taxa: {page.conversionRate}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  <BarChart3 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    setCurrentPage(page);
                                    setShowEditor(true);
                                  }}
                                >
                                  <Settings className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Share2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Templates */}
                <Card>
                  <CardHeader>
                    <CardTitle>Templates Disponíveis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {templates.map((template) => (
                        <Card 
                          key={template.id} 
                          className={`cursor-pointer transition-all hover:ring-2 hover:ring-accent/50 ${
                            selectedTemplate === template.id ? 'ring-2 ring-accent' : ''
                          }`}
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="text-4xl mb-3">{template.preview}</div>
                            <h4 className="font-medium mb-2">{template.name}</h4>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                            <Button 
                              className="mt-3 w-full"
                              variant={selectedTemplate === template.id ? "default" : "outline"}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTemplate(template.id);
                                setShowEditor(true);
                              }}
                            >
                              Usar Template
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              /* Editor Interface */
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {currentPage ? `Editando: ${currentPage.name}` : "Nova Landing Page"}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button size="sm">
                        Salvar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setShowEditor(false);
                          setCurrentPage(null);
                        }}
                      >
                        Voltar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Panel - Controls */}
                    <div className="lg:col-span-1">
                      <Tabs defaultValue="content" className="w-full">
                        <TabsList className="grid w-full grid-cols-1">
                          <TabsTrigger value="content">Conteúdo</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="content" className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label>Nome da Página</Label>
                            <Input 
                              placeholder="Nome da sua landing page"
                              defaultValue={currentPage?.name || ""}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>URL da Página</Label>
                            <div className="flex">
                              <span className="bg-muted px-3 py-2 text-sm border rounded-l-md">
                                dnxtai.com/
                              </span>
                              <Input 
                                className="rounded-l-none"
                                placeholder="url-da-pagina"
                                defaultValue={currentPage?.url || ""}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Título Principal</Label>
                            <Input placeholder="Seu título chamativo aqui" />
                          </div>

                          <div className="space-y-2">
                            <Label>Subtítulo</Label>
                            <Textarea 
                              placeholder="Descrição que complementa o título"
                              className="h-20"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Call-to-Action</Label>
                            <Input placeholder="Ex: Baixar E-book Grátis" />
                          </div>

                          <div className="space-y-2">
                            <Label>Cor do Botão</Label>
                            <div className="flex space-x-2">
                              <Input type="color" className="w-16 h-10" defaultValue="#8B5CF6" />
                              <Input placeholder="#8B5CF6" className="flex-1" />
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    {/* Center Panel - Preview */}
                    <div className="lg:col-span-2">
                      <div className="border rounded-lg p-4 min-h-96">
                        <div className="flex items-center justify-center mb-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Monitor className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Tablet className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Smartphone className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Mock Preview */}
                        <div className="bg-gradient-to-br from-accent/10 to-purple-600/10 rounded-lg p-8 text-center">
                          <h1 className="text-3xl font-bold mb-4">
                            Seu Título Chamativo Aqui
                          </h1>
                          <p className="text-lg text-muted-foreground mb-6">
                            Descrição que complementa o título e explica o valor da oferta
                          </p>
                          
                          <div className="max-w-md mx-auto mb-6">
                            <div className="grid grid-cols-2 gap-4">
                              <Input placeholder="Nome" />
                              <Input placeholder="Email" />
                            </div>
                          </div>
                          
                          <Button className="gradient-bg text-lg px-8 py-3">
                            Baixar E-book Grátis
                          </Button>
                          
                          <div className="mt-8 text-sm text-muted-foreground">
                            <p>✓ 100% Gratuito</p>
                            <p>✓ Sem Spam</p>
                            <p>✓ Conteúdo Exclusivo</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Panel - Elements */}
                    <div className="lg:col-span-1">
                      <div className="space-y-4">
                        <h4 className="font-medium">Elementos</h4>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm" className="h-16 flex-col">
                            <Type className="h-4 w-4 mb-1" />
                            <span className="text-xs">Texto</span>
                          </Button>
                          <Button variant="outline" size="sm" className="h-16 flex-col">
                            <Image className="h-4 w-4 mb-1" />
                            <span className="text-xs">Imagem</span>
                          </Button>
                          <Button variant="outline" size="sm" className="h-16 flex-col">
                            <MousePointer className="h-4 w-4 mb-1" />
                            <span className="text-xs">Botão</span>
                          </Button>
                          <Button variant="outline" size="sm" className="h-16 flex-col">
                            <Palette className="h-4 w-4 mb-1" />
                            <span className="text-xs">Seção</span>
                          </Button>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <h5 className="font-medium mb-2">Configurações</h5>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm">SEO Otimizado</Label>
                              <input type="checkbox" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label className="text-sm">Responsivo</Label>
                              <input type="checkbox" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label className="text-sm">Analytics</Label>
                              <input type="checkbox" defaultChecked />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
