# 📖 Manual Completo - Bot de Divulgação Avançado

## 🎯 Índice

1. [Instalação e Configuração](#instalação-e-configuração)
2. [Primeiro Uso](#primeiro-uso)
3. [Comandos Detalhados](#comandos-detalhados)
4. [Configuração de Mensagens](#configuração-de-mensagens)
5. [Gerenciamento Avançado](#gerenciamento-avançado)
6. [Monitoramento e Logs](#monitoramento-e-logs)
7. [Solução de Problemas](#solução-de-problemas)
8. [Perguntas Frequentes](#perguntas-frequentes)

---

## 📱 Instalação e Configuração

### Pré-requisitos
- **Android:** 7.0 ou superior
- **Termux:** Instalado e atualizado
- **WhatsApp:** Funcionando normalmente
- **Internet:** Conexão estável

### Instalação Passo a Passo

1. **Abra o Termux**
2. **Navegue até a pasta dos arquivos:**
   ```bash
   cd /caminho/para/whatsapp-bot-avancado
   ```
3. **Execute a instalação:**
   ```bash
   ./install-termux.sh
   ```
4. **Aguarde a instalação** (pode demorar alguns minutos)

### Primeira Execução

1. **Inicie o bot:**
   ```bash
   ./start.sh
   ```
2. **Aparecerá um QR Code no terminal**
3. **No WhatsApp do seu celular:**
   - Vá em **Menu > Dispositivos conectados**
   - Toque em **Conectar dispositivo**
   - Escaneie o QR Code
4. **Aguarde a mensagem:** "Bot conectado com sucesso!"

---

## 🚀 Primeiro Uso

### 1. Obter Acesso ao Bot

Após a conexão, envie uma mensagem para o bot:
```
BBSTH
```

**Resposta esperada:**
```
✅ Código aceito! Você agora tem acesso ao Bot Divulgação Avançado

Digite "menu" para ver os comandos disponíveis.
```

### 2. Verificar Status Inicial

```
status
```

**Você verá:**
- Status do bot (inativo inicialmente)
- Grupos conectados
- Mensagens cadastradas (0 inicialmente)

### 3. Adicionar Bot aos Grupos

1. **Adicione o número do bot aos grupos desejados**
2. **Verifique se foi adicionado:**
   ```
   grupos
   ```

### 4. Criar Primeira Mensagem

```
adicionar
```

**Siga o processo guiado:**
1. **Nome:** `Teste Inicial`
2. **Texto:** `🤖 Bot funcionando! Esta é uma mensagem de teste.`
3. **Intervalo:** `60` (1 hora)
4. **Menções:** `não`
5. **Início:** `agora`
6. **Fim:** `nunca`

### 5. Ativar o Bot

```
ativar
```

**Resultado:** O bot começará a enviar a mensagem a cada hora para todos os grupos.

---

## 📋 Comandos Detalhados

### 🔐 Comando de Acesso

#### `BBSTH`
- **Função:** Libera acesso aos comandos do bot
- **Uso:** Digite apenas uma vez por usuário
- **Resultado:** Usuário fica autorizado permanentemente

### 🔧 Comandos de Controle

#### `ativar`
- **Função:** Ativa o bot e inicia agendamentos
- **Quando usar:** Após configurar mensagens
- **Resultado:** Todas as mensagens ativas começam a ser enviadas
- **Exemplo de resposta:**
  ```
  ✅ Bot ativado com sucesso!
  
  📊 Resultados:
  ✅ 2 mensagens ativas
  📱 5 grupos conectados
  ```

#### `desativar`
- **Função:** Desativa o bot e pausa agendamentos
- **Quando usar:** Para parar temporariamente
- **Resultado:** Todos os envios são pausados
- **Nota:** Mensagens permanecem configuradas

#### `status`
- **Função:** Mostra informações completas do sistema
- **Informações mostradas:**
  - Status atual (ativo/inativo)
  - Número de grupos conectados
  - Mensagens cadastradas e ativas
  - Usuários autorizados
  - Tempo de funcionamento
  - Versão do Node.js

### 📝 Comandos de Mensagens

#### `adicionar`
- **Função:** Cria nova mensagem com processo guiado
- **Limite:** Máximo 5 mensagens simultâneas
- **Processo detalhado:**

  **1. Nome da mensagem:**
  - Use nomes descritivos
  - Exemplos: "Promoção Matinal", "Lembrete Semanal"
  
  **2. Texto da mensagem:**
  - Pode usar emojis e quebras de linha
  - Máximo recomendado: 500 caracteres
  - Exemplos:
    ```
    🔥 OFERTA ESPECIAL!
    Produtos com 50% de desconto!
    Válido até meia-noite!
    ```
  
  **3. Intervalo em minutos:**
  - Mínimo: 1 minuto
  - Recomendado: 30+ minutos
  - Exemplos:
    - `30` = 30 minutos
    - `60` = 1 hora
    - `180` = 3 horas
    - `1440` = 24 horas
  
  **4. Incluir menções:**
  - `sim` = Menciona todos os membros
  - `não` = Envia sem menções
  - **Nota:** Menções são visíveis nos grupos
  
  **5. Data de início:**
  - Formato: `DD/MM/AAAA HH:MM`
  - `agora` = Inicia imediatamente
  - Exemplos:
    - `02/08/2025 17:30`
    - `15/12/2024 09:00`
  
  **6. Data de fim:**
  - Formato: `DD/MM/AAAA HH:MM`
  - `nunca` = Sem data de fim
  - **Importante:** Bot para automaticamente na data de fim

#### `mensagens`
- **Função:** Lista todas as mensagens cadastradas
- **Informações por mensagem:**
  - ID (número para referência)
  - Nome
  - Preview do texto (primeiros 30 caracteres)
  - Intervalo configurado
  - Status (ativa/pausada)
  - Datas de início e fim
  - Se inclui menções

#### `pausar <id>`
- **Função:** Pausa mensagem específica
- **Exemplo:** `pausar 1`
- **Resultado:** Mensagem para de ser enviada mas permanece cadastrada
- **Uso:** Para pausar temporariamente sem perder configuração

#### `retomar <id>`
- **Função:** Retoma mensagem pausada
- **Exemplo:** `retomar 1`
- **Resultado:** Mensagem volta a ser enviada automaticamente
- **Nota:** Só funciona se o bot estiver ativo

#### `remover <id>`
- **Função:** Remove permanentemente uma mensagem
- **Exemplo:** `remover 1`
- **Resultado:** Mensagem é deletada completamente
- **Atenção:** Ação irreversível

### ℹ️ Comandos de Informação

#### `grupos`
- **Função:** Lista grupos onde o bot está presente
- **Informações mostradas:**
  - Nome do grupo
  - Número de participantes
- **Uso:** Para verificar se bot foi adicionado corretamente

#### `tempo`
- **Função:** Mostra próximos envios programados
- **Informações por mensagem ativa:**
  - Nome da mensagem
  - Próximo envio (data/hora)
  - Intervalo configurado
  - Tempo restante até fim (se configurado)

#### `menu`
- **Função:** Mostra menu principal com todos os comandos

#### `ajuda`
- **Função:** Mostra ajuda detalhada com explicações

---

## ⚙️ Configuração de Mensagens

### Tipos de Mensagens Recomendadas

#### 1. Promoções Urgentes
```
Nome: Flash Sale
Texto: ⚡ ÚLTIMAS HORAS! 70% OFF em tudo!
Intervalo: 30 minutos
Menções: sim
Início: agora
Fim: 02/08/2025 23:59
```

#### 2. Ofertas Diárias
```
Nome: Oferta do Dia
Texto: 🌟 OFERTA DO DIA! Produto especial com desconto!
Intervalo: 240 minutos (4 horas)
Menções: não
Início: 02/08/2025 09:00
Fim: 02/08/2025 22:00
```

#### 3. Lembretes Semanais
```
Nome: Novidades Semanais
Texto: 📅 Confira as novidades desta semana!
Intervalo: 10080 minutos (7 dias)
Menções: não
Início: 05/08/2025 09:00
Fim: nunca
```

#### 4. Horário Comercial
```
Nome: Estamos Abertos
Texto: 🕐 Estamos abertos! Atendimento até 18h.
Intervalo: 120 minutos (2 horas)
Menções: não
Início: 02/08/2025 09:00
Fim: 02/08/2025 18:00
```

#### 5. Eventos Especiais
```
Nome: Black Friday
Texto: 🖤 BLACK FRIDAY! Descontos de até 80%!
Intervalo: 60 minutos
Menções: sim
Início: 29/11/2024 00:00
Fim: 29/11/2024 23:59
```

### Estratégias de Intervalos

#### Por Tipo de Conteúdo
- **Urgente/Flash:** 15-30 minutos
- **Promoções:** 1-2 horas
- **Ofertas diárias:** 3-4 horas
- **Conteúdo regular:** 6-8 horas
- **Lembretes:** 24 horas ou mais

#### Por Horário
- **Manhã (6h-12h):** Intervalos menores (1-2h)
- **Tarde (12h-18h):** Intervalos médios (2-3h)
- **Noite (18h-22h):** Intervalos maiores (3-4h)
- **Madrugada:** Evitar ou intervalos muito grandes

### Uso de Menções

#### Quando Usar Menções
- Promoções muito importantes
- Eventos especiais
- Anúncios urgentes
- Sorteios e concursos

#### Quando NÃO Usar Menções
- Conteúdo regular/diário
- Mensagens informativas
- Lembretes frequentes
- Grupos muito grandes (500+ membros)

---

## 🔧 Gerenciamento Avançado

### Estratégias de Uso

#### 1. Configuração Escalonada
```
Mensagem 1: A cada 1 hora (conteúdo urgente)
Mensagem 2: A cada 3 horas (ofertas)
Mensagem 3: A cada 6 horas (informativo)
Mensagem 4: A cada 12 horas (lembrete)
Mensagem 5: A cada 24 horas (novidades)
```

#### 2. Horários Comerciais
```
Abertura: 09:00 - "Estamos abertos!"
Almoço: 12:00 - "Ofertas especiais do almoço"
Tarde: 15:00 - "Promoções da tarde"
Fechamento: 18:00 - "Últimas horas!"
```

#### 3. Campanhas Temporárias
```
Pré-lançamento: 7 dias antes
Lançamento: Dia do evento
Pós-lançamento: 3 dias depois
```

### Monitoramento Eficiente

#### Verificações Diárias
```
1. status (verificar se está ativo)
2. tempo (próximos envios)
3. grupos (verificar se ainda está nos grupos)
```

#### Verificações Semanais
```
1. mensagens (revisar todas as configurações)
2. Logs (verificar erros)
3. Atualizar conteúdo se necessário
```

### Otimização de Performance

#### Boas Práticas
- Use intervalos mínimos de 30 minutos
- Evite mais de 3 mensagens ativas simultaneamente
- Configure datas de fim para campanhas
- Monitore logs regularmente

#### Evitar Problemas
- Não use intervalos muito pequenos (< 15 min)
- Não sobrecarregue grupos com muitas menções
- Pause mensagens desnecessárias
- Mantenha Termux sempre ativo

---

## 📊 Monitoramento e Logs

### Tipos de Logs

#### 1. Logs do Sistema
- **Localização:** `logs/bot-YYYYMMDD-HHMMSS.log`
- **Conteúdo:** Inicialização, erros, status

#### 2. Logs de Envio
- **Formato:** `[DD/MM/YYYY HH:MM:SS] Mensagem "Nome" enviada para X grupos`
- **Uso:** Verificar se mensagens estão sendo enviadas

#### 3. Logs de Erro
- **Formato:** `Erro ao enviar para grupo Nome: descrição do erro`
- **Uso:** Identificar problemas com grupos específicos

### Comandos de Monitoramento

#### Verificação Rápida
```bash
# Ver últimas linhas do log atual
tail -20 logs/bot-*.log

# Procurar erros
grep "Erro" logs/bot-*.log

# Ver envios de hoje
grep "$(date +%d/%m/%Y)" logs/bot-*.log
```

#### Status em Tempo Real
```
status    # Status geral
tempo     # Próximos envios
grupos    # Grupos conectados
```

### Interpretando Logs

#### Mensagens Normais
```
✅ Bot conectado com sucesso!
📊 5 grupos detectados
[02/08/2025 17:30:15] Mensagem "Oferta" enviada para 5 grupos
```

#### Mensagens de Erro
```
❌ Erro ao enviar para grupo "Nome do Grupo": Chat not found
⚠️ Grupo "Outro Grupo" não encontrado
```

#### Mensagens de Sistema
```
🚀 Agendamentos iniciados automaticamente
🛑 Bot desativado! Todos os agendamentos foram pausados
✅ Mensagem "Nova Oferta" criada com sucesso
```

---

## 🔧 Solução de Problemas

### Problemas Comuns

#### 1. Bot não conecta
**Sintomas:**
- QR Code não aparece
- Erro ao inicializar

**Soluções:**
```bash
# Verificar Node.js
node --version

# Reinstalar dependências
rm -rf node_modules
npm install

# Reiniciar Termux
exit
# Abrir Termux novamente
```

#### 2. Comandos não funcionam
**Sintomas:**
- Bot não responde a comandos
- Mensagem "não autorizado"

**Soluções:**
1. Verificar se digitou `BBSTH` corretamente
2. Enviar comando no privado (não em grupo)
3. Verificar se bot está conectado

#### 3. Mensagens não são enviadas
**Sintomas:**
- Bot ativo mas não envia mensagens
- Logs mostram erros

**Soluções:**
```bash
# Verificar status
status

# Ver logs de erro
grep "Erro" logs/bot-*.log

# Verificar grupos
grupos

# Reiniciar bot
./restart.sh
```

#### 4. Bot para sozinho
**Sintomas:**
- Bot desconecta frequentemente
- Termux fecha

**Soluções:**
1. **Configurar Termux para não hibernar:**
   - Configurações do Android > Bateria
   - Encontrar Termux
   - Desativar otimização de bateria

2. **Manter Termux ativo:**
   - Não fechar o aplicativo
   - Usar em primeiro plano quando possível

3. **Verificar memória:**
   ```bash
   free -h
   ps aux | grep node
   ```

#### 5. Grupos não aparecem
**Sintomas:**
- Comando `grupos` mostra lista vazia
- Bot foi adicionado mas não detecta

**Soluções:**
1. **Reiniciar bot:**
   ```bash
   ./restart.sh
   ```

2. **Verificar se bot foi realmente adicionado:**
   - Verificar lista de membros do grupo
   - Bot deve aparecer como membro

3. **Aguardar sincronização:**
   - Pode demorar alguns minutos para detectar novos grupos

### Comandos de Diagnóstico

#### Verificar Sistema
```bash
# Versão do Node.js
node --version

# Processos ativos
ps aux | grep node

# Uso de memória
free -h

# Espaço em disco
df -h
```

#### Verificar Bot
```bash
# Status do processo
pgrep -f "node bot.js"

# Últimos logs
tail -50 logs/bot-*.log

# Verificar arquivos
ls -la bot_data.json session/
```

#### Limpeza e Reset
```bash
# Parar bot
./stop.sh

# Limpar sessão (força nova conexão)
rm -rf session/

# Limpar dados (perde configurações)
rm bot_data.json

# Reiniciar
./start.sh
```

---

## ❓ Perguntas Frequentes

### Sobre Funcionalidade

**P: Quantas mensagens posso configurar?**
R: Máximo de 5 mensagens simultâneas.

**P: Qual o intervalo mínimo entre envios?**
R: 1 minuto, mas recomendamos mínimo 30 minutos.

**P: As menções funcionam sem ser admin?**
R: Sim, mas as menções serão visíveis (@usuario).

**P: Posso usar em quantos grupos?**
R: Ilimitado, mas recomendamos até 50 grupos para melhor performance.

**P: O bot funciona 24/7?**
R: Sim, desde que Termux permaneça ativo e com internet.

### Sobre Configuração

**P: Como alterar o código de acesso?**
R: Edite a linha `SECRET_CODE: 'BBSTH'` no arquivo `bot.js`.

**P: Posso ter múltiplos usuários autorizados?**
R: Sim, cada pessoa que digitar o código fica autorizada.

**P: Como fazer backup das configurações?**
R: Copie o arquivo `bot_data.json` regularmente.

**P: Posso editar uma mensagem já criada?**
R: Não diretamente. Remova e crie novamente.

### Sobre Segurança

**P: É seguro usar o bot?**
R: Sim, tudo roda localmente. Nenhum dado é enviado para servidores externos.

**P: O WhatsApp pode banir minha conta?**
R: Use com moderação e respeite os termos do WhatsApp. Evite spam excessivo.

**P: Outras pessoas podem controlar meu bot?**
R: Não, apenas quem souber o código secreto.

### Sobre Problemas

**P: Bot desconecta frequentemente?**
R: Configure Termux para não hibernar nas configurações de bateria do Android.

**P: Mensagens não chegam em alguns grupos?**
R: Verifique se bot ainda está no grupo e se grupo não tem restrições.

**P: Como ver se mensagens estão sendo enviadas?**
R: Use comando `tempo` e verifique logs na pasta `logs/`.

**P: Bot não responde aos comandos?**
R: Verifique se digitou `BBSTH` primeiro e se está enviando no privado.

### Sobre Performance

**P: Bot está lento?**
R: Reduza número de mensagens ativas e aumente intervalos.

**P: Termux trava com o bot?**
R: Verifique memória disponível e reinicie Termux se necessário.

**P: Posso usar outros apps com Termux ativo?**
R: Sim, mas mantenha Termux em segundo plano.

---

## 📞 Suporte Técnico

### Antes de Reportar Problemas

1. **Verifique logs:**
   ```bash
   tail -50 logs/bot-*.log
   ```

2. **Teste comandos básicos:**
   ```
   status
   grupos
   mensagens
   ```

3. **Reinicie o bot:**
   ```bash
   ./restart.sh
   ```

### Informações para Suporte

Se precisar de ajuda, forneça:
- Versão do Android
- Logs de erro (últimas 50 linhas)
- Comandos que não funcionam
- Quando o problema começou

### Manutenção Preventiva

#### Diária
- Verificar `status`
- Monitorar `tempo`

#### Semanal
- Revisar `mensagens`
- Verificar logs de erro
- Limpar logs antigos

#### Mensal
- Backup de `bot_data.json`
- Atualizar dependências se necessário
- Revisar estratégia de mensagens

---

**📝 Este manual cobre todos os aspectos do bot. Para dúvidas específicas, consulte os logs e teste os comandos básicos primeiro.**

