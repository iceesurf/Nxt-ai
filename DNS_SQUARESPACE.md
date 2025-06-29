# Configuração DNS no Squarespace para dnxtai.com

## Passo a Passo Detalhado

### 1. Acesse o Painel Squarespace
1. Faça login no [Squarespace](https://squarespace.com)
2. Vá em **Settings** (Configurações)
3. Clique em **Domains** (Domínios)
4. Selecione **dnxtai.com**
5. Clique em **DNS Settings** (Configurações DNS)

### 2. Configurações DNS para Render

#### Opção A: Registros CNAME (Recomendado)
Adicione os seguintes registros:

```
Tipo: CNAME
Host: @
Aponta para: nxt-ai-xyz.onrender.com
TTL: 3600 (1 hora)

Tipo: CNAME
Host: www
Aponta para: nxt-ai-xyz.onrender.com
TTL: 3600 (1 hora)
```

*Substitua `nxt-ai-xyz` pela URL real gerada pelo Render*

#### Opção B: Registros A (se CNAME não funcionar)
```
Tipo: A
Host: @
Endereço IP: [IP do Render]
TTL: 3600

Tipo: A
Host: www
Endereço IP: [IP do Render]
TTL: 3600
```

### 3. Remover Configurações Antigas
Antes de adicionar os novos registros:
1. **Delete** todos os registros A existentes para @ e www
2. **Delete** qualquer CNAME conflitante
3. **Mantenha** apenas os registros MX (email) se existirem

### 4. Configurações Específicas do Squarespace

#### Interface Squarespace DNS:
```
Record Type: CNAME
Name: @ (ou deixe em branco)
Value: sua-app.onrender.com

Record Type: CNAME
Name: www
Value: sua-app.onrender.com
```

#### Configurações Avançadas:
- **Proxy Status**: Off/DNS Only
- **TTL**: Automatic ou 3600 segundos
- **Priority**: Não aplicável para CNAME

### 5. Verificação e Propagação

#### Tempos de Propagação:
- **Squarespace**: 15-30 minutos
- **Global**: 1-24 horas (máximo 48h)

#### Ferramentas de Verificação:
```bash
# Terminal/CMD
nslookup dnxtai.com
dig dnxtai.com

# Sites de verificação
- whatsmydns.net
- dnschecker.org
- mxtoolbox.com/SuperTool.aspx
```

### 6. Configuração no Render

Após configurar o DNS:

1. **No painel do Render:**
   - Vá em seu Web Service
   - Clique em **Settings**
   - Scroll até **Custom Domains**
   - Clique **Add Custom Domain**
   - Adicione: `dnxtai.com`
   - Adicione: `www.dnxtai.com`

2. **SSL/TLS:**
   - O Render gera certificados SSL automaticamente
   - Aguarde alguns minutos após adicionar o domínio

### 7. Troubleshooting

#### DNS não resolve:
```bash
# Verificar se o DNS está propagado
nslookup dnxtai.com 8.8.8.8
```

#### Erro "Domain not verified":
1. Verifique se os registros DNS estão corretos
2. Aguarde mais tempo para propagação
3. Tente remover e adicionar o domínio novamente no Render

#### Erro de SSL:
1. Aguarde 10-15 minutos após adicionar domínio
2. Verifique se o domínio resolve corretamente
3. Force renovação do SSL no painel do Render

### 8. Configuração Final

#### Redirecionamentos:
No Render, configure:
- `www.dnxtai.com` → `dnxtai.com` (ou vice-versa)
- `http://` → `https://` (automático)

#### Headers de Segurança:
O projeto já inclui headers de segurança configurados para dnxtai.com

### 9. Verificação Final

Teste estas URLs:
- ✅ https://dnxtai.com
- ✅ https://www.dnxtai.com
- ✅ http://dnxtai.com (deve redirecionar para HTTPS)
- ✅ http://www.dnxtai.com (deve redirecionar para HTTPS)

### 10. URLs do Render

Após o deploy no Render, você receberá URLs como:
- `https://nxt-ai-abc123.onrender.com`

Use essa URL exata nos registros CNAME do Squarespace.

## Resumo dos Passos

1. ✅ Deploy no Render → Obter URL (.onrender.com)
2. ✅ Configurar CNAME no Squarespace → Apontar para URL do Render  
3. ✅ Adicionar domínio personalizado no Render
4. ✅ Aguardar propagação DNS (1-24h)
5. ✅ Verificar HTTPS funcionando
6. ✅ Testar login e funcionalidades

**Importante:** Sempre use a URL exata fornecida pelo Render nos registros DNS.