# Configuração DNS Squarespace → Render (Passo a Passo Visual)

## 🎯 Objetivo
Conectar dnxtai.com (Squarespace) → Render.com (onde está hospedada a aplicação NXT.ai)

## 📋 Pré-requisitos
- ✅ Projeto deployado no Render
- ✅ URL do Render anotada (ex: `nxt-ai-abc123.onrender.com`)
- ✅ Acesso ao painel Squarespace

## 🔧 Configurações DNS no Squarespace

### Passo 1: Acessar DNS Settings
```
Squarespace Dashboard
└── Settings
    └── Domains
        └── dnxtai.com
            └── DNS Settings
```

### Passo 2: Remover Registros Antigos
**DELETAR todos os registros existentes:**
- ❌ Registro A para @ 
- ❌ Registro A para www
- ❌ Qualquer CNAME conflitante
- ✅ MANTER registros MX (email)

### Passo 3: Adicionar Novos Registros CNAME

#### Registro 1 - Domínio Principal
```
┌─────────────────────────────────────┐
│ Tipo: CNAME                         │
│ Host: @                             │
│ Aponta para: nxt-ai-abc123.onrender.com │
│ TTL: 3600                           │
└─────────────────────────────────────┘
```

#### Registro 2 - Subdomínio WWW
```
┌─────────────────────────────────────┐
│ Tipo: CNAME                         │
│ Host: www                           │
│ Aponta para: nxt-ai-abc123.onrender.com │
│ TTL: 3600                           │
└─────────────────────────────────────┘
```

### Passo 4: Verificar Configuração
Após salvar, seus registros devem aparecer assim:

```
📋 DNS Records for dnxtai.com
┌──────┬──────┬─────────────────────────────┬──────┐
│ Type │ Host │ Points to                   │ TTL  │
├──────┼──────┼─────────────────────────────┼──────┤
│ CNAME│ @    │ nxt-ai-abc123.onrender.com  │ 3600 │
│ CNAME│ www  │ nxt-ai-abc123.onrender.com  │ 3600 │
└──────┴──────┴─────────────────────────────┴──────┘
```

## 🌐 Configuração no Render

### Adicionar Domínio Personalizado
1. **Render Dashboard** → Seu Web Service
2. **Settings** → **Custom Domains**
3. **Add Custom Domain**

#### Domínio 1
```
┌─────────────────────┐
│ Domain: dnxtai.com  │
│ Status: Verifying   │
└─────────────────────┘
```

#### Domínio 2  
```
┌─────────────────────────┐
│ Domain: www.dnxtai.com  │
│ Status: Verifying       │
└─────────────────────────┘
```

## ⏱️ Timeline de Propagação

```
Tempo    │ Status
─────────┼─────────────────────────────
0 min    │ 🔄 DNS configurado no Squarespace
15 min   │ 🔄 Render detectando domínio
30 min   │ ✅ DNS verificado
45 min   │ 🔒 SSL sendo gerado
60 min   │ ✅ https://dnxtai.com funcionando
```

## 🧪 Comandos de Teste

### Verificar DNS (Terminal)
```bash
# Verificar se DNS está propagado
nslookup dnxtai.com

# Resposta esperada:
# dnxtai.com
# Address: [IP do Render]
```

### Verificar CNAME
```bash
dig dnxtai.com CNAME

# Resposta esperada:
# dnxtai.com. 3600 IN CNAME nxt-ai-abc123.onrender.com.
```

## 🌍 URLs Finais

Após propagação completa, estas URLs devem funcionar:

- ✅ https://dnxtai.com
- ✅ https://www.dnxtai.com  
- ✅ http://dnxtai.com (redireciona para HTTPS)
- ✅ http://www.dnxtai.com (redireciona para HTTPS)

## 🚨 Troubleshooting Comum

### DNS não resolve
```bash
# Verificar com DNS público
nslookup dnxtai.com 8.8.8.8
```
**Solução**: Aguardar mais tempo ou verificar configuração

### SSL não funciona
**Sintomas**: "Not Secure" no navegador
**Solução**: Aguardar 10-15 min após verificação DNS

### Render não verifica domínio
**Sintomas**: "Domain verification failed"
**Soluções**:
1. Verificar CNAME no Squarespace
2. Aguardar propagação DNS
3. Remover e adicionar domínio novamente

## 📱 Interface Squarespace

### Exemplo Visual da Tela DNS:
```
┌─────────────────────────────────────────────┐
│ DNS Settings - dnxtai.com                   │
├─────────────────────────────────────────────┤
│                                             │
│ [Add Record] [Import] [Reset]               │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Type: CNAME ▼                           │ │
│ │ Host: @                                 │ │
│ │ Points to: nxt-ai-abc123.onrender.com   │ │
│ │ TTL: 3600 ▼                            │ │
│ │ [Save]                                  │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Type: CNAME ▼                           │ │
│ │ Host: www                               │ │
│ │ Points to: nxt-ai-abc123.onrender.com   │ │
│ │ TTL: 3600 ▼                            │ │
│ │ [Save]                                  │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

## ✅ Checklist Final

- [ ] Projeto deployado no Render
- [ ] URL do Render anotada  
- [ ] DNS CNAME configurado no Squarespace
- [ ] Domínio adicionado no Render
- [ ] Aguardado propagação (1-24h)
- [ ] SSL funcionando
- [ ] Login testado em https://dnxtai.com
- [ ] Todos os módulos funcionando