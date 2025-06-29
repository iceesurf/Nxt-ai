# Deploy Completo: GitHub + Render + DNS Squarespace

## 1. Preparação do Código para GitHub

### Inicializar repositório Git
```bash
git init
git add .
git commit -m "feat: NXT.ai SaaS Platform - Complete multi-tenant solution"
```

### Conectar ao GitHub
```bash
# Substitua SEU_USUARIO pelo seu username do GitHub
git remote add origin https://github.com/iceesurf/nxt-ai.git
git branch -M main
git push -u origin main
```

## 2. Deploy no Render

### Passo 1: Criar conta e conectar GitHub
1. Acesse [render.com](https://render.com)
2. Faça login com GitHub
3. Autorize o acesso aos repositórios

### Passo 2: Criar PostgreSQL Database
1. No dashboard do Render, clique **"New +"**
2. Selecione **"PostgreSQL"**
3. Configure:
   - **Name**: `nxt-ai-database`
   - **Database**: `nxtai`
   - **User**: `nxtai_user`
   - **Region**: Oregon (US West)
   - **Plan**: Free

4. Clique **"Create Database"**
5. **IMPORTANTE**: Copie a `External Database URL` - você vai precisar dela

### Passo 3: Criar Web Service
1. Clique **"New +"** → **"Web Service"**
2. Selecione **"Build and deploy from a Git repository"**
3. Conecte o repositório `nxt-ai`
4. Configure:
   - **Name**: `nxt-ai`
   - **Region**: Oregon (US West)
   - **Branch**: main
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`

### Passo 4: Configurar Variáveis de Ambiente
Na seção **Environment**, adicione:

```
NODE_ENV=production
DATABASE_URL=postgresql://nxtai_user:K70uulH8BGFu21ZrAKRhC5DyZuxYzWJR@dpg-d1fphjjipnbc739sfc8g-a.oregon-postgres.render.com/nxtai
JWT_SECRET=nxt_ai_super_secret_key_2025_production
PORT=5000
```

5. Clique **"Create Web Service"**

### Passo 5: Aguardar Deploy
- O primeiro deploy demora 5-10 minutos
- Acompanhe os logs na aba **"Logs"**
- Quando aparecer "Build successful", anote a URL: `https://nxt-ai-xxxx.onrender.com`

## 3. Configuração DNS no Squarespace

### Acessar Configurações DNS
1. Login no [Squarespace](https://squarespace.com)
2. **Settings** → **Domains** → **dnxtai.com**
3. **DNS Settings**

### Remover Registros Existentes
**IMPORTANTE**: Remova todos os registros A e CNAME existentes para @ e www

### Adicionar Novos Registros
```
Tipo: CNAME
Nome: @
Valor: nxt-ai-xxxx.onrender.com
TTL: 3600

Tipo: CNAME
Nome: www
Valor: nxt-ai-xxxx.onrender.com
TTL: 3600
```

**Substitua `nxt-ai-xxxx` pela URL real do seu Render**

## 4. Configurar Domínio Personalizado no Render

### Adicionar Domínio
1. No Render, vá no seu Web Service
2. **Settings** → scroll até **Custom Domains**
3. **Add Custom Domain**
4. Adicione: `dnxtai.com`
5. **Add Custom Domain** novamente
6. Adicione: `www.dnxtai.com`

### Aguardar Verificação
- DNS Verification: 5-30 minutos
- SSL Certificate: Automático após verificação

## 5. Inicializar Banco de Dados

### Executar Script de Inicialização
No terminal do Render ou localmente:
```bash
# Se localmente com DATABASE_URL do Render
DATABASE_URL="postgresql://..." node scripts/init-db.js

# Ou aguardar que rode automaticamente no deploy
```

## 6. Verificação Completa

### URLs para Testar
- ✅ https://nxt-ai-xxxx.onrender.com
- ✅ https://dnxtai.com  
- ✅ https://www.dnxtai.com

### Credenciais de Teste
- **Email**: admin@dnxtai.com
- **Senha**: senha123

### Funcionalidades para Verificar
- [ ] Login funciona
- [ ] Dashboard carrega dados do PostgreSQL
- [ ] Módulos CRM, Marketing, etc. acessíveis
- [ ] Leads aparecem na lista
- [ ] Tema roxo (#120028) aplicado
- [ ] SSL/HTTPS funcionando

## 7. Propagação DNS

### Tempos Esperados
- **Squarespace**: 15-30 minutos
- **Propagação Global**: 1-24 horas

### Ferramentas de Verificação
```bash
# Verificar DNS
nslookup dnxtai.com
dig dnxtai.com

# Sites úteis
- whatsmydns.net
- dnschecker.org
```

## 8. Troubleshooting

### Erro de Build no Render
- Verifique se todas as dependências estão corretas
- Confira os logs de build na aba "Logs"

### DNS não resolve
```bash
# Verificar se está propagado
nslookup dnxtai.com 8.8.8.8
```

### Erro de Database
- Verifique se DATABASE_URL está correta
- Confirme se PostgreSQL está rodando no Render

### SSL não funciona
- Aguarde 10-15 minutos após adicionar domínio
- Verifique se DNS está resolvendo corretamente

## 9. Comandos Git para Atualizações

### Para futuras atualizações:
```bash
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
```

O Render fará redeploy automático.

## 10. Configurações de Produção

### Headers de Segurança
Já configurados no código para dnxtai.com:
- CORS para domínio personalizado
- X-Frame-Options, CSP, etc.

### Backup do Banco
- Render faz backup automático do PostgreSQL
- Considere backup adicional para dados críticos

## URLs Finais

Após completar todos os passos:
- **Produção**: https://dnxtai.com
- **Admin**: https://dnxtai.com (admin@dnxtai.com / senha123)
- **Render Dashboard**: https://dashboard.render.com

## Resumo dos Custos

- **Render Web Service**: Grátis (750h/mês)
- **Render PostgreSQL**: Grátis (1GB, 1 mês retenção)
- **Domínio**: Já pago no Squarespace
- **SSL**: Grátis (Let's Encrypt via Render)

**Total mensal**: $0 no plano gratuito