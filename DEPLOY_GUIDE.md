# Guia de Deploy - GitHub + Render

## 1. Preparação para GitHub

### Configurar Git (se necessário)
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### Inicializar repositório
```bash
git init
git add .
git commit -m "Initial commit - NXT.ai SaaS Platform"
```

### Conectar ao GitHub
1. Crie um repositório no GitHub chamado `nxt-ai`
2. Conecte o repositório local:
```bash
git remote add origin https://github.com/SEU_USUARIO/nxt-ai.git
git branch -M main
git push -u origin main
```

## 2. Deploy no Render

### Opção A: Deploy Automático (Recomendado)
1. Acesse [render.com](https://render.com)
2. Conecte sua conta GitHub
3. Clique em "New Web Service"
4. Selecione o repositório `nxt-ai`
5. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Environment**: Node.js

### Opção B: Deploy via render.yaml
O arquivo `render.yaml` está configurado para deploy automático com PostgreSQL.

### Variáveis de Ambiente no Render
Configure estas variáveis no painel do Render:

```
NODE_ENV=production
JWT_SECRET=gere_uma_chave_segura_de_32_caracteres
DATABASE_URL=será_gerado_automaticamente_pelo_postgresql
```

### Banco de Dados
1. No Render, crie um PostgreSQL Database
2. Copie a `DATABASE_URL` gerada
3. Cole nas variáveis de ambiente do Web Service

### Comandos de Migração
Após o deploy, execute uma vez:
```bash
npm run db:push
```

## 3. Configuração DNS para dnxtai.com

### No Render
1. Vá em "Settings" do seu Web Service
2. Clique em "Custom Domains"
3. Adicione `dnxtai.com` e `www.dnxtai.com`

### No Squarespace
Configure os registros DNS:
```
Tipo: CNAME
Host: @
Target: seu-app.onrender.com

Tipo: CNAME
Host: www
Target: seu-app.onrender.com
```

## 4. Verificação do Deploy

### URLs para testar:
- https://seu-app.onrender.com
- https://dnxtai.com (após configurar DNS)

### Login padrão:
- Email: admin@dnxtai.com
- Senha: senha123

## 5. Monitoramento

### Logs do Render
- Acesse "Logs" no painel do Render
- Monitore erros de deploy e runtime

### Banco de Dados
- Use o "Connect" no PostgreSQL do Render
- Execute queries via interface web

## 6. Troubleshooting

### Build falha
- Verifique se todas as dependências estão no package.json
- Confirme se o Node.js está na versão 20+

### Database connection error
- Verifique se DATABASE_URL está configurada
- Confirme se o PostgreSQL está ativo

### DNS não resolve
- Aguarde até 24h para propagação
- Use ferramentas como dig ou nslookup para verificar

## 7. Atualizações Futuras

Para atualizar o projeto:
```bash
git add .
git commit -m "Descrição da atualização"
git push origin main
```

O Render irá fazer redeploy automaticamente.