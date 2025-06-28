# NXT.ai - Plataforma SaaS Multi-Tenant

Uma plataforma SaaS completa para automação de marketing, CRM, workflows e recursos de IA, construída com React, Node.js e PostgreSQL.

## 🚀 Recursos

- **Multi-tenant**: Arquitetura isolada por empresa
- **CRM Completo**: Gestão de leads e clientes
- **Marketing Automation**: Campanhas e automações
- **Workflows**: Processos automatizados
- **Chatbot IA**: Atendimento inteligente
- **Integrações**: Facebook, Google, ASAAS e mais
- **Landing Pages**: Construtor de páginas
- **Relatórios**: Analytics e insights
- **Webhooks**: Integrações personalizadas

## 🛠️ Tecnologias

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + Radix UI
- TanStack Query
- React Hook Form + Zod
- Wouter (routing)

### Backend
- Node.js + Express
- TypeScript
- JWT Authentication
- Drizzle ORM
- PostgreSQL

## 🔧 Configuração

### Pré-requisitos
- Node.js 20+
- PostgreSQL
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nxt-ai.git
cd nxt-ai

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Execute as migrações do banco
npm run db:push

# Inicie o servidor de desenvolvimento
npm run dev
```

### Variáveis de Ambiente
```
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=seu_jwt_secret_aqui
NODE_ENV=development
```

## 🚀 Deploy

### Render
1. Conecte seu repositório GitHub ao Render
2. Configure as variáveis de ambiente
3. Use os comandos:
   - Build: `npm run build`
   - Start: `npm run start`

### Replit
O projeto está otimizado para rodar no Replit com PostgreSQL integrado.

## 👤 Acesso Padrão

- **Email**: admin@dnxtai.com
- **Senha**: senha123

## 📁 Estrutura do Projeto

```
├── client/          # Frontend React
├── server/          # Backend Express
├── shared/          # Código compartilhado
├── drizzle.config.ts # Configuração do banco
└── package.json
```

## 🌐 Domínio Personalizado

O projeto está configurado para funcionar com o domínio `dnxtai.com`. Para configurar:

1. Configure o DNS do seu domínio
2. Adicione o domínio personalizado no seu provedor de hosting
3. Configure HTTPS (automático no Render/Replit)

## 📝 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para suporte, entre em contato através do [GitHub Issues](https://github.com/seu-usuario/nxt-ai/issues).