# 🤖 Bot de Divulgação Avançado para WhatsApp

Bot automatizado para divulgação de mensagens em grupos do WhatsApp com agendamento avançado, controle de acesso por código secreto e menções de membros.

## ✨ Características Principais

- 🔐 **Acesso Seguro:** Controle por código secreto (BBSTH)
- ⏰ **Agendamento Avançado:** Até 5 mensagens com intervalos personalizados
- 📅 **Controle de Período:** Data/hora de início e fim para cada mensagem
- 👥 **Menções Automáticas:** Menciona todos os membros dos grupos
- 📱 **Compatível com Termux:** Funciona perfeitamente no Android
- 🚀 **Automático:** Funciona sem intervenção após configuração
- 💾 **Persistente:** Salva configurações e retoma após reinicialização

## 🎯 Funcionalidades

### 🔧 Controle do Bot
- Ativar/desativar bot
- Status detalhado do sistema
- Monitoramento em tempo real

### 📝 Gerenciamento de Mensagens
- Adicionar até 5 mensagens simultâneas
- Configurar intervalos personalizados (em minutos)
- Definir período de atividade (início/fim)
- Pausar/retomar mensagens individualmente
- Remover mensagens

### 👥 Recursos Avançados
- Menção automática de todos os membros
- Envio para todos os grupos conectados
- Delay inteligente entre envios
- Logs detalhados de atividade

## 🚀 Instalação Rápida

### No Termux (Android)

1. **Extraia os arquivos do bot**
2. **Execute a instalação:**
   ```bash
   ./install-termux.sh
   ```
3. **Inicie o bot:**
   ```bash
   ./start.sh
   ```
4. **Escaneie o QR Code com seu WhatsApp**
5. **Digite o código de acesso: `BBSTH`**
6. **Digite `menu` para ver os comandos**

## 📋 Comandos Disponíveis

### 🔐 Acesso
- `BBSTH` - Código para obter acesso ao bot

### 🔧 Controle
- `ativar` - Ativar o bot e iniciar agendamentos
- `desativar` - Desativar o bot e pausar agendamentos
- `status` - Ver status detalhado do bot

### 📝 Mensagens
- `adicionar` - Adicionar nova mensagem (processo guiado)
- `mensagens` - Listar todas as mensagens cadastradas
- `pausar <id>` - Pausar mensagem específica
- `retomar <id>` - Retomar mensagem pausada
- `remover <id>` - Remover mensagem permanentemente

### ℹ️ Informações
- `grupos` - Listar grupos conectados
- `tempo` - Ver próximos envios programados
- `menu` - Mostrar menu de comandos
- `ajuda` - Ajuda detalhada

## 📊 Como Usar

### 1. Configuração Inicial
1. Instale e inicie o bot
2. Conecte via QR Code
3. Digite `BBSTH` para obter acesso
4. Adicione o bot aos grupos desejados

### 2. Adicionar Mensagem
```
Você: adicionar

Bot: 1️⃣ Nome da mensagem:
Você: Promoção Diária

Bot: 2️⃣ Texto da mensagem:
Você: 🔥 OFERTA ESPECIAL! Produtos com 50% OFF!

Bot: 3️⃣ Intervalo de envio:
Você: 60

Bot: 4️⃣ Incluir menções:
Você: sim

Bot: 5️⃣ Data de início:
Você: 02/08/2025 17:00

Bot: 6️⃣ Data de fim:
Você: 03/08/2025 17:00
```

### 3. Ativar Bot
```
Você: ativar
Bot: ✅ Bot ativado! Agendamentos iniciados.
```

## ⚙️ Configurações Avançadas

### Intervalos de Envio
- Mínimo: 1 minuto
- Máximo: Ilimitado
- Exemplos:
  - `60` = 1 hora
  - `180` = 3 horas
  - `1440` = 24 horas

### Formato de Datas
- Formato: `DD/MM/AAAA HH:MM`
- Exemplos:
  - `02/08/2025 17:30`
  - `15/12/2024 09:00`
- Use "agora" para início imediato
- Use "nunca" para sem data de fim

### Limites do Sistema
- Máximo 5 mensagens simultâneas
- Delay de 2 segundos entre grupos
- Salvamento automático de configurações

## 🛠️ Scripts Disponíveis

- `./start.sh` - Iniciar o bot
- `./stop.sh` - Parar o bot
- `./restart.sh` - Reiniciar o bot
- `./install-termux.sh` - Instalar dependências

## ⚠️ Importante

### Requisitos
- Android 7.0 ou superior
- Termux instalado
- WhatsApp funcionando
- Conexão estável com internet

### Boas Práticas
- Mantenha Termux ativo durante uso
- Use intervalos razoáveis (mínimo 30 min recomendado)
- Respeite regras dos grupos
- Monitore logs regularmente

### Segurança
- Apenas usuários com código têm acesso
- Dados salvos localmente
- Nenhuma informação enviada para servidores externos

## 📞 Suporte

### Solução de Problemas
1. Verifique logs na pasta `logs/`
2. Reinicie com `./restart.sh`
3. Reinstale dependências se necessário

### Logs
- Localização: `logs/bot-YYYYMMDD-HHMMSS.log`
- Contém: Erros, envios, status do sistema

---

**Desenvolvido para uso responsável e educacional.**

