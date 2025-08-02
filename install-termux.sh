#!/bin/bash

echo "🚀 Instalando Bot de Divulgação Avançado no Termux..."
echo ""

# Atualizar pacotes
echo "📦 Atualizando pacotes do Termux..."
pkg update -y && pkg upgrade -y

# Instalar Node.js
echo "📱 Instalando Node.js..."
pkg install nodejs -y

# Verificar instalação
echo "✅ Verificando instalação..."
node --version
npm --version

# Instalar dependências
echo "📋 Instalando dependências do bot..."
npm install

# Criar diretórios necessários
mkdir -p session
mkdir -p logs

# Configurar permissões
chmod +x start.sh
chmod +x stop.sh
chmod +x restart.sh

echo ""
echo "✅ Instalação concluída!"
echo ""
echo "📋 Próximos passos:"
echo "1. Execute: ./start.sh"
echo "2. Escaneie o QR Code com seu WhatsApp"
echo "3. Digite 'BBSTH' para obter acesso ao bot"
echo "4. Digite 'menu' para ver os comandos"
echo ""
echo "📞 Para suporte, consulte o arquivo MANUAL.md"

