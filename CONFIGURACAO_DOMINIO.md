# Configuração do Domínio dnxtai.com no Squarespace

## Passo a Passo Completo

### 1. Deploy no Replit
1. Clique no botão **"Deploy"** no painel do Replit
2. Aguarde o processo de build e deploy ser concluído
3. Anote a URL do deployment (ex: `nxtai-production.replit.app`)

### 2. Configuração no Painel do Replit
1. Vá para a aba **"Deployments"**
2. Clique no deployment ativo
3. Procure por **"Custom Domain"** ou **"Domínio Personalizado"**
4. Adicione: `dnxtai.com`
5. Adicione também: `www.dnxtai.com`

### 3. Configuração DNS no Squarespace

#### Opção A - Registros CNAME (Recomendado)
1. Acesse o painel do Squarespace
2. Vá em **Settings > Domains > DNS**
3. Adicione os seguintes registros:

```
Tipo: CNAME
Host: @
Aponta para: [sua-url-deployment].replit.app
TTL: 3600

Tipo: CNAME  
Host: www
Aponta para: [sua-url-deployment].replit.app
TTL: 3600
```

#### Opção B - Registros A (Se CNAME não funcionar)
```
Tipo: A
Host: @
IP: [IP fornecido pelo Replit]
TTL: 3600

Tipo: A
Host: www  
IP: [IP fornecido pelo Replit]
TTL: 3600
```

### 4. Verificação
- A propagação DNS pode levar de 15 minutos a 48 horas
- Teste em: https://dnstester.net/
- URLs que devem funcionar:
  - https://dnxtai.com
  - https://www.dnxtai.com

### 5. Configurações Adicionais no Squarespace

#### SSL/TLS
- O Replit fornece certificado SSL automaticamente
- Certifique-se de que o Squarespace está configurado para redirecionar HTTP para HTTPS

#### Redirecionamento
- Configure www.dnxtai.com para redirecionar para dnxtai.com (ou vice-versa)

## Troubleshooting

### Erro "Domain not found"
- Verifique se os registros DNS estão corretos
- Aguarde a propagação (até 48h)

### Erro de SSL
- O Replit demora alguns minutos para gerar o certificado
- Aguarde e teste novamente

### Erro 404
- Verifique se o deployment está ativo
- Confirme a URL do deployment no Replit

## Contatos de Suporte
- Replit: help@replit.com
- Squarespace: Suporte via chat no painel

## Status Atual
✅ Projeto configurado para dnxtai.com
✅ Headers de segurança adicionados
✅ CORS configurado para o domínio
⏳ Aguardando configuração DNS no Squarespace