#!/bin/bash

echo "🚀 Iniciando Bot de Divulgação Avançado..."
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Execute install-termux.sh primeiro."
    exit 1
fi

# Verificar se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Criar arquivo de log
LOG_FILE="logs/bot-$(date +%Y%m%d-%H%M%S).log"
mkdir -p logs

echo "📱 Bot iniciando..."
echo "📋 Log será salvo em: $LOG_FILE"
echo ""
echo "🔐 Código de acesso: BBSTH"
echo ""
echo "⚠️  Para parar o bot, pressione Ctrl+C ou execute ./stop.sh"
echo ""

# Iniciar bot com log
node bot.js 2>&1 | tee "$LOG_FILE"

