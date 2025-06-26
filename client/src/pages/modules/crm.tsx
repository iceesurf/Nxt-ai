import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/components/auth/auth-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Edit, Trash2, Filter } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Lead } from "@shared/schema";

export default function CRM() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSource, setFilterSource] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: leads, isLoading } = useQuery({
    queryKey: ["/api/leads"],
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/leads/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Lead excluído",
        description: "Lead foi excluído com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao excluir lead",
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500/20 text-blue-400";
      case "qualified":
        return "bg-green-500/20 text-green-400";
      case "proposal":
        return "bg-yellow-500/20 text-yellow-400";
      case "closed":
        return "bg-purple-500/20 text-purple-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "new":
        return "Novo";
      case "qualified":
        return "Qualificado";
      case "proposal":
        return "Proposta";
      case "closed":
        return "Fechado";
      default:
        return status;
    }
  };

  const filteredLeads = leads?.filter((lead: Lead) => {
    const matchesStatus = filterStatus === "all" || lead.status === filterStatus;
    const matchesSource = filterSource === "all" || lead.source === filterSource;
    const matchesSearch = !searchTerm || 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSource && matchesSearch;
  }) || [];

  if (!user) return null;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="CRM e Leads" 
          description="Gerencie seus leads e contatos"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Gestão de Leads</CardTitle>
                  <Button className="gradient-bg hover:opacity-90">
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Lead
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Status</SelectItem>
                      <SelectItem value="new">Novo</SelectItem>
                      <SelectItem value="qualified">Qualificado</SelectItem>
                      <SelectItem value="proposal">Proposta</SelectItem>
                      <SelectItem value="closed">Fechado</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterSource} onValueChange={setFilterSource}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as Fontes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as Fontes</SelectItem>
                      <SelectItem value="Website">Website</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="Google Ads">Google Ads</SelectItem>
                      <SelectItem value="Indicação">Indicação</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Input
                    type="text"
                    placeholder="Buscar leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  
                  <Button variant="secondary">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrar
                  </Button>
                </div>

                {/* Leads Table */}
                <div className="overflow-x-auto">
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-pulse">Carregando leads...</div>
                    </div>
                  ) : filteredLeads.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Nenhum lead encontrado</p>
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 text-muted-foreground">Nome</th>
                          <th className="text-left py-3 px-4 text-muted-foreground">Email</th>
                          <th className="text-left py-3 px-4 text-muted-foreground">Telefone</th>
                          <th className="text-left py-3 px-4 text-muted-foreground">Fonte</th>
                          <th className="text-left py-3 px-4 text-muted-foreground">Status</th>
                          <th className="text-left py-3 px-4 text-muted-foreground">Data</th>
                          <th className="text-left py-3 px-4 text-muted-foreground">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeads.map((lead: Lead) => (
                          <tr key={lead.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium">{lead.name}</td>
                            <td className="py-3 px-4 text-muted-foreground">{lead.email}</td>
                            <td className="py-3 px-4 text-muted-foreground">{lead.phone || "-"}</td>
                            <td className="py-3 px-4 text-muted-foreground">{lead.source}</td>
                            <td className="py-3 px-4">
                              <Badge className={getStatusColor(lead.status)}>
                                {getStatusLabel(lead.status)}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => deleteMutation.mutate(lead.id)}
                                  disabled={deleteMutation.isPending}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
