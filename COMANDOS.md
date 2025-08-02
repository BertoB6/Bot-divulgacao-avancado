# 📋 Guia de Comandos - Bot Divulgação Avançado

## 🔐 ACESSO INICIAL

### Obter Acesso
```
BBSTH
```
**Resultado:** Libera acesso aos comandos do bot

---

## 🔧 CONTROLE DO BOT

### Ativar Bot
```
ativar
```
**Função:** Ativa o bot e inicia todos os agendamentos
**Resultado:** Mensagens começam a ser enviadas automaticamente

### Desativar Bot
```
desativar
```
**Função:** Desativa o bot e pausa todos os agendamentos
**Resultado:** Para todos os envios automáticos

### Ver Status
```
status
```
**Função:** Mostra informações detalhadas do bot
**Informações:**
- Status (ativo/inativo)
- Número de grupos
- Mensagens cadastradas/ativas
- Tempo de funcionamento
- Usuários autorizados

---

## 📝 GERENCIAR MENSAGENS

### Adicionar Nova Mensagem
```
adicionar
```
**Função:** Inicia processo guiado para criar nova mensagem
**Processo:**
1. Nome da mensagem
2. Texto da mensagem
3. Intervalo em minutos
4. Incluir menções (sim/não)
5. Data de início (DD/MM/AAAA HH:MM ou "agora")
6. Data de fim (DD/MM/AAAA HH:MM ou "nunca")

**Exemplo de uso:**
```
Você: adicionar
Bot: 1️⃣ Nome da mensagem:
Você: Oferta Matinal
Bot: 2️⃣ Texto da mensagem:
Você: ☀️ BOM DIA! Ofertas especiais até 12h!
Bot: 3️⃣ Intervalo de envio:
Você: 120
Bot: 4️⃣ Incluir menções:
Você: sim
Bot: 5️⃣ Data de início:
Você: agora
Bot: 6️⃣ Data de fim:
Você: 02/08/2025 12:00
```

### Listar Mensagens
```
mensagens
```
**Função:** Mostra todas as mensagens cadastradas
**Informações por mensagem:**
- ID da mensagem
- Nome
- Preview do texto
- Intervalo de envio
- Status (ativa/pausada)
- Datas de início/fim
- Se inclui menções

### Pausar Mensagem
```
pausar <id>
```
**Exemplo:** `pausar 1`
**Função:** Pausa uma mensagem específica
**Resultado:** Mensagem para de ser enviada mas permanece cadastrada

### Retomar Mensagem
```
retomar <id>
```
**Exemplo:** `retomar 1`
**Função:** Retoma uma mensagem pausada
**Resultado:** Mensagem volta a ser enviada automaticamente

### Remover Mensagem
```
remover <id>
```
**Exemplo:** `remover 1`
**Função:** Remove permanentemente uma mensagem
**Resultado:** Mensagem é deletada e não pode ser recuperada

---

## ℹ️ INFORMAÇÕES

### Ver Grupos
```
grupos
```
**Função:** Lista todos os grupos onde o bot está presente
**Informações:**
- Nome do grupo
- Número de participantes

### Ver Próximos Envios
```
tempo
```
**Função:** Mostra quando será o próximo envio de cada mensagem ativa
**Informações:**
- Nome da mensagem
- Próximo envio (data/hora)
- Intervalo configurado
- Tempo restante até o fim (se configurado)

### Menu Principal
```
menu
```
**Função:** Mostra menu com todos os comandos disponíveis

### Ajuda Detalhada
```
ajuda
```
**Função:** Mostra ajuda completa com explicações

---

## 📊 EXEMPLOS PRÁTICOS

### Cenário 1: Promoção de 24 horas
```
adicionar
Nome: Flash Sale 24h
Texto: ⚡ FLASH SALE! 70% OFF por 24h apenas!
Intervalo: 180 (3 horas)
Menções: sim
Início: agora
Fim: 03/08/2025 17:00
```

### Cenário 2: Lembretes semanais
```
adicionar
Nome: Lembrete Semanal
Texto: 📅 Não esqueça! Novidades toda segunda-feira!
Intervalo: 10080 (7 dias = 10080 minutos)
Menções: não
Início: 05/08/2025 09:00
Fim: nunca
```

### Cenário 3: Horário comercial
```
adicionar
Nome: Atendimento
Texto: 🕐 Estamos abertos! Atendimento até 18h.
Intervalo: 60 (1 hora)
Menções: não
Início: 02/08/2025 09:00
Fim: 02/08/2025 18:00
```

---

## ⚡ COMANDOS RÁPIDOS

| Comando | Função |
|---------|--------|
| `BBSTH` | Obter acesso |
| `ativar` | Ligar bot |
| `desativar` | Desligar bot |
| `adicionar` | Nova mensagem |
| `mensagens` | Ver todas |
| `pausar 1` | Pausar msg 1 |
| `retomar 1` | Retomar msg 1 |
| `remover 1` | Deletar msg 1 |
| `status` | Ver status |
| `grupos` | Ver grupos |
| `tempo` | Próximos envios |
| `menu` | Ver comandos |

---

## 🎯 FLUXO DE USO TÍPICO

1. **Primeiro acesso:**
   ```
   BBSTH → menu → grupos → adicionar → ativar
   ```

2. **Uso diário:**
   ```
   status → tempo → mensagens
   ```

3. **Gerenciar mensagens:**
   ```
   mensagens → pausar 2 → retomar 1 → remover 3
   ```

4. **Monitoramento:**
   ```
   status → grupos → tempo
   ```

---

## ⚠️ DICAS IMPORTANTES

### Intervalos Recomendados
- **Promoções urgentes:** 30-60 minutos
- **Ofertas diárias:** 2-4 horas
- **Lembretes semanais:** 7 dias (10080 min)
- **Conteúdo regular:** 1-3 horas

### Boas Práticas
- Use nomes descritivos para mensagens
- Configure datas de fim para promoções
- Monitore com `status` e `tempo`
- Pause mensagens desnecessárias
- Respeite os grupos e seus membros

### Limites
- Máximo 5 mensagens simultâneas
- Intervalo mínimo: 1 minuto
- Delay automático: 2s entre grupos

---

**💡 Mantenha este guia como referência durante o uso do bot!**

