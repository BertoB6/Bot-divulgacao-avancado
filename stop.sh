#!/bin/bash

echo "🛑 Parando Bot de Divulgação Avançado..."

# Encontrar processo do bot
PID=$(pgrep -f "node bot.js")

if [ -z "$PID" ]; then
    echo "❌ Bot não está rodando."
    exit 1
fi

# Parar processo
kill $PID

# Aguardar processo terminar
sleep 3

# Verificar se parou
if pgrep -f "node bot.js" > /dev/null; then
    echo "⚠️  Forçando parada do bot..."
    pkill -9 -f "node bot.js"
fi

echo "✅ Bot parado com sucesso!"
echo "📋 Para reiniciar, execute: ./start.sh"

