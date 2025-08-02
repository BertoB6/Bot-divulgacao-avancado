const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs-extra');
const cron = require('node-cron');
const moment = require('moment');

// Configurações do bot
const CONFIG = {
    // Código secreto para ativar o bot
    SECRET_CODE: 'BBSTH',
    
    // Configurações de arquivos
    SESSION_PATH: './session',
    DATA_FILE: './bot_data.json',
    
    // Configurações do bot
    BOT_NAME: '🤖 Bot Divulgação Avançado',
    
    // Configurações do Puppeteer para Termux
    PUPPETEER_CONFIG: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor'
        ]
    }
};

// Inicializar cliente WhatsApp
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "bot-divulgacao-avancado",
        dataPath: CONFIG.SESSION_PATH
    }),
    puppeteer: CONFIG.PUPPETEER_CONFIG
});

// Variáveis globais
let botData = {
    isActive: false,
    authorizedUsers: [],
    messages: [],
    groups: [],
    scheduledJobs: {}
};

let grupos = [];

// Funções auxiliares
function carregarDados() {
    try {
        if (fs.existsSync(CONFIG.DATA_FILE)) {
            botData = JSON.parse(fs.readFileSync(CONFIG.DATA_FILE, 'utf8'));
        }
    } catch (error) {
        console.log('Erro ao carregar dados:', error.message);
    }
}

function salvarDados() {
    try {
        fs.writeFileSync(CONFIG.DATA_FILE, JSON.stringify(botData, null, 2));
    } catch (error) {
        console.log('Erro ao salvar dados:', error.message);
    }
}

function isAuthorized(userId) {
    return botData.authorizedUsers.includes(userId);
}

function formatarTempo() {
    return moment().format('DD/MM/YYYY HH:mm:ss');
}

function formatarDuracao(ms) {
    const duration = moment.duration(ms);
    const horas = Math.floor(duration.asHours());
    const minutos = duration.minutes();
    const segundos = duration.seconds();
    
    if (horas > 0) {
        return `${horas}h ${minutos}m ${segundos}s`;
    } else if (minutos > 0) {
        return `${minutos}m ${segundos}s`;
    } else {
        return `${segundos}s`;
    }
}

async function obterMembrosGrupo(groupId) {
    try {
        const chat = await client.getChatById(groupId);
        if (chat.isGroup) {
            return chat.participants.map(p => p.id._serialized);
        }
        return [];
    } catch (error) {
        console.log('Erro ao obter membros do grupo:', error.message);
        return [];
    }
}

async function enviarMensagemComMencoes(groupId, texto) {
    try {
        const membros = await obterMembrosGrupo(groupId);
        
        if (membros.length === 0) {
            await client.sendMessage(groupId, texto);
            return;
        }
        
        // Criar menções para todos os membros
        const mentions = membros;
        
        // Adicionar menções ao texto
        let textoComMencoes = texto + '\n\n';
        textoComMencoes += '👥 ' + membros.map(id => `@${id.split('@')[0]}`).join(' ');
        
        await client.sendMessage(groupId, textoComMencoes, { mentions });
        
    } catch (error) {
        console.log('Erro ao enviar mensagem com menções:', error.message);
        // Fallback: enviar sem menções
        await client.sendMessage(groupId, texto);
    }
}

function criarAgendamento(messageId) {
    const message = botData.messages.find(m => m.id === messageId);
    if (!message || !message.active) return;
    
    // Verificar se já passou da data de fim
    if (message.endDate && moment().isAfter(moment(message.endDate))) {
        message.active = false;
        salvarDados();
        return;
    }
    
    // Verificar se ainda não chegou na data de início
    if (message.startDate && moment().isBefore(moment(message.startDate))) {
        // Agendar para começar na data de início
        const startTime = moment(message.startDate);
        const delay = startTime.diff(moment());
        
        setTimeout(() => {
            criarAgendamento(messageId);
        }, delay);
        return;
    }
    
    // Criar job de agendamento
    const cronExpression = `*/${message.intervalMinutes} * * * *`;
    
    if (botData.scheduledJobs[messageId]) {
        botData.scheduledJobs[messageId].destroy();
    }
    
    botData.scheduledJobs[messageId] = cron.schedule(cronExpression, async () => {
        const msg = botData.messages.find(m => m.id === messageId);
        
        if (!msg || !msg.active) {
            botData.scheduledJobs[messageId].destroy();
            delete botData.scheduledJobs[messageId];
            return;
        }
        
        // Verificar se passou da data de fim
        if (msg.endDate && moment().isAfter(moment(msg.endDate))) {
            msg.active = false;
            botData.scheduledJobs[messageId].destroy();
            delete botData.scheduledJobs[messageId];
            salvarDados();
            return;
        }
        
        // Enviar mensagem para todos os grupos
        for (const grupo of grupos) {
            try {
                if (msg.withMentions) {
                    await enviarMensagemComMencoes(grupo.id, msg.text);
                } else {
                    await client.sendMessage(grupo.id, msg.text);
                }
                
                // Delay entre grupos
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (error) {
                console.log(`Erro ao enviar para grupo ${grupo.name}:`, error.message);
            }
        }
        
        console.log(`[${formatarTempo()}] Mensagem "${msg.name}" enviada para ${grupos.length} grupos`);
    }, {
        scheduled: false
    });
    
    botData.scheduledJobs[messageId].start();
}

function pararTodosAgendamentos() {
    Object.keys(botData.scheduledJobs).forEach(messageId => {
        if (botData.scheduledJobs[messageId]) {
            botData.scheduledJobs[messageId].destroy();
            delete botData.scheduledJobs[messageId];
        }
    });
}

function iniciarAgendamentos() {
    botData.messages.forEach(message => {
        if (message.active) {
            criarAgendamento(message.id);
        }
    });
}

// Event listeners
client.on('qr', (qr) => {
    console.log('\n🔗 Escaneie o QR Code abaixo com seu WhatsApp:');
    qrcode.generate(qr, { small: true });
    console.log('\n📱 Abra o WhatsApp > Menu > Dispositivos conectados > Conectar dispositivo');
});

client.on('ready', async () => {
    console.log('\n✅ Bot conectado com sucesso!');
    console.log(`📱 Número: ${client.info.wid.user}`);
    console.log(`👤 Nome: ${client.info.pushname}`);
    console.log(`⏰ Conectado em: ${formatarTempo()}`);
    
    carregarDados();
    
    // Atualizar lista de grupos
    const chats = await client.getChats();
    grupos = chats.filter(chat => chat.isGroup).map(grupo => ({
        id: grupo.id._serialized,
        name: grupo.name,
        participants: grupo.participants ? grupo.participants.length : 0
    }));
    
    botData.groups = grupos;
    salvarDados();
    
    console.log(`📊 ${grupos.length} grupos detectados`);
    
    // Iniciar agendamentos se o bot estiver ativo
    if (botData.isActive) {
        iniciarAgendamentos();
        console.log('🚀 Agendamentos iniciados automaticamente');
    }
});

client.on('message', async (message) => {
    const from = message.from;
    const body = message.body.trim();
    const userId = message.author || from;
    
    try {
        // Verificar código secreto
        if (body === CONFIG.SECRET_CODE) {
            if (!isAuthorized(userId)) {
                botData.authorizedUsers.push(userId);
                salvarDados();
            }
            
            await client.sendMessage(from, `✅ Código aceito! Você agora tem acesso ao ${CONFIG.BOT_NAME}\n\nDigite "menu" para ver os comandos disponíveis.`);
            return;
        }
        
        // Verificar se usuário está autorizado
        if (!isAuthorized(userId)) {
            return; // Ignorar mensagens de usuários não autorizados
        }
        
        // Processar comandos
        const args = body.toLowerCase().split(' ');
        const command = args[0];
        
        switch (command) {
            case 'menu':
                await enviarMenu(from);
                break;
                
            case 'ativar':
                await ativarBot(from);
                break;
                
            case 'desativar':
                await desativarBot(from);
                break;
                
            case 'status':
                await mostrarStatus(from);
                break;
                
            case 'grupos':
                await listarGrupos(from);
                break;
                
            case 'mensagens':
                await listarMensagens(from);
                break;
                
            case 'adicionar':
                await iniciarAdicionarMensagem(from, message);
                break;
                
            case 'remover':
                const idRemover = parseInt(args[1]);
                await removerMensagem(from, idRemover);
                break;
                
            case 'pausar':
                const idPausar = parseInt(args[1]);
                await pausarMensagem(from, idPausar);
                break;
                
            case 'retomar':
                const idRetomar = parseInt(args[1]);
                await retomarMensagem(from, idRetomar);
                break;
                
            case 'tempo':
                await mostrarTempos(from);
                break;
                
            case 'ajuda':
                await enviarAjuda(from);
                break;
                
            default:
                await client.sendMessage(from, '❌ Comando não reconhecido. Digite "menu" para ver os comandos disponíveis.');
        }
    } catch (error) {
        console.log('Erro ao processar comando:', error);
        await client.sendMessage(from, '❌ Erro ao processar comando. Tente novamente.');
    }
});

// Funções dos comandos
async function enviarMenu(chatId) {
    const menu = `
🤖 *${CONFIG.BOT_NAME}*
📋 *MENU DE COMANDOS*

*🔧 CONTROLE DO BOT:*
• ativar - Ativar o bot
• desativar - Desativar o bot
• status - Ver status do bot

*📢 GERENCIAR MENSAGENS:*
• adicionar - Adicionar nova mensagem
• mensagens - Listar mensagens
• remover <id> - Remover mensagem
• pausar <id> - Pausar mensagem
• retomar <id> - Retomar mensagem

*ℹ️ INFORMAÇÕES:*
• grupos - Listar grupos
• tempo - Ver próximos envios
• ajuda - Ajuda detalhada
• menu - Este menu

⚡ *Status:* ${botData.isActive ? '🟢 Ativo' : '🔴 Inativo'}
`;
    
    await client.sendMessage(chatId, menu);
}

async function ativarBot(chatId) {
    if (botData.isActive) {
        await client.sendMessage(chatId, '⚠️ Bot já está ativo!');
        return;
    }
    
    botData.isActive = true;
    salvarDados();
    
    iniciarAgendamentos();
    
    await client.sendMessage(chatId, `✅ Bot ativado com sucesso!\n\n📊 ${botData.messages.filter(m => m.active).length} mensagens ativas\n📱 ${grupos.length} grupos conectados`);
}

async function desativarBot(chatId) {
    if (!botData.isActive) {
        await client.sendMessage(chatId, '⚠️ Bot já está inativo!');
        return;
    }
    
    botData.isActive = false;
    salvarDados();
    
    pararTodosAgendamentos();
    
    await client.sendMessage(chatId, '🛑 Bot desativado! Todos os agendamentos foram pausados.');
}

async function mostrarStatus(chatId) {
    const uptime = process.uptime();
    const horas = Math.floor(uptime / 3600);
    const minutos = Math.floor((uptime % 3600) / 60);
    
    const mensagensAtivas = botData.messages.filter(m => m.active).length;
    
    const status = `
📊 *STATUS DO BOT*

🤖 *Bot:* ${CONFIG.BOT_NAME}
🔄 *Status:* ${botData.isActive ? '🟢 Ativo' : '🔴 Inativo'}

📈 *Estatísticas:*
📱 Grupos conectados: ${grupos.length}
📝 Mensagens cadastradas: ${botData.messages.length}
✅ Mensagens ativas: ${mensagensAtivas}
👥 Usuários autorizados: ${botData.authorizedUsers.length}

🔧 *Sistema:*
⏰ Tempo ativo: ${horas}h ${minutos}m
📅 Data/Hora: ${formatarTempo()}
💻 Node.js: ${process.version}
`;
    
    await client.sendMessage(chatId, status);
}

async function listarGrupos(chatId) {
    if (grupos.length === 0) {
        await client.sendMessage(chatId, '❌ Nenhum grupo encontrado.');
        return;
    }
    
    let lista = `📊 *GRUPOS CONECTADOS (${grupos.length})*\n\n`;
    
    grupos.forEach((grupo, index) => {
        lista += `${index + 1}. *${grupo.name}*\n`;
        lista += `   👥 ${grupo.participants} participantes\n\n`;
    });
    
    await client.sendMessage(chatId, lista);
}

async function listarMensagens(chatId) {
    if (botData.messages.length === 0) {
        await client.sendMessage(chatId, '❌ Nenhuma mensagem cadastrada.\n\nUse "adicionar" para criar uma nova mensagem.');
        return;
    }
    
    let lista = `📝 *MENSAGENS CADASTRADAS (${botData.messages.length})*\n\n`;
    
    botData.messages.forEach((msg, index) => {
        const status = msg.active ? '🟢 Ativa' : '🔴 Pausada';
        const preview = msg.text.length > 30 ? msg.text.substring(0, 30) + '...' : msg.text;
        
        lista += `*${msg.id}.* ${msg.name}\n`;
        lista += `📄 ${preview}\n`;
        lista += `⏰ Intervalo: ${msg.intervalMinutes} min\n`;
        lista += `🔄 Status: ${status}\n`;
        
        if (msg.startDate) {
            lista += `🟢 Início: ${moment(msg.startDate).format('DD/MM/YY HH:mm')}\n`;
        }
        if (msg.endDate) {
            lista += `🔴 Fim: ${moment(msg.endDate).format('DD/MM/YY HH:mm')}\n`;
        }
        
        lista += `👥 Menções: ${msg.withMentions ? 'Sim' : 'Não'}\n\n`;
    });
    
    lista += `\n💡 Use "pausar <id>" ou "retomar <id>" para controlar`;
    
    await client.sendMessage(chatId, lista);
}

async function iniciarAdicionarMensagem(chatId, originalMessage) {
    if (botData.messages.length >= 5) {
        await client.sendMessage(chatId, '❌ Limite máximo de 5 mensagens atingido!\n\nRemova uma mensagem antes de adicionar outra.');
        return;
    }
    
    await client.sendMessage(chatId, `📝 *ADICIONAR NOVA MENSAGEM*\n\nResponda as próximas perguntas para configurar sua mensagem:\n\n1️⃣ *Nome da mensagem:*\nDigite um nome para identificar esta mensagem:`);
    
    // Aguardar resposta do nome
    const nomeFilter = (msg) => msg.from === chatId && msg.author === originalMessage.author;
    
    client.once('message', async (nomeMsg) => {
        if (!nomeFilter(nomeMsg)) return;
        
        const nome = nomeMsg.body.trim();
        
        await client.sendMessage(chatId, `2️⃣ *Texto da mensagem:*\nDigite o texto que será enviado:`);
        
        client.once('message', async (textoMsg) => {
            if (!nomeFilter(textoMsg)) return;
            
            const texto = textoMsg.body.trim();
            
            await client.sendMessage(chatId, `3️⃣ *Intervalo de envio:*\nDigite o intervalo em minutos (ex: 60 para 1 hora):`);
            
            client.once('message', async (intervaloMsg) => {
                if (!nomeFilter(intervaloMsg)) return;
                
                const intervalo = parseInt(intervaloMsg.body.trim());
                
                if (isNaN(intervalo) || intervalo < 1) {
                    await client.sendMessage(chatId, '❌ Intervalo inválido! Processo cancelado.');
                    return;
                }
                
                await client.sendMessage(chatId, `4️⃣ *Incluir menções:*\nDeseja mencionar todos os membros dos grupos?\nResponda: sim ou não`);
                
                client.once('message', async (mencaoMsg) => {
                    if (!nomeFilter(mencaoMsg)) return;
                    
                    const mencoes = mencaoMsg.body.trim().toLowerCase() === 'sim';
                    
                    await client.sendMessage(chatId, `5️⃣ *Data de início (opcional):*\nDigite a data/hora de início no formato: DD/MM/AAAA HH:MM\nOu digite "agora" para começar imediatamente:`);
                    
                    client.once('message', async (inicioMsg) => {
                        if (!nomeFilter(inicioMsg)) return;
                        
                        let dataInicio = null;
                        const inicioTexto = inicioMsg.body.trim().toLowerCase();
                        
                        if (inicioTexto !== 'agora') {
                            dataInicio = moment(inicioTexto, 'DD/MM/YYYY HH:mm');
                            if (!dataInicio.isValid()) {
                                await client.sendMessage(chatId, '❌ Data de início inválida! Usando "agora".');
                                dataInicio = null;
                            }
                        }
                        
                        await client.sendMessage(chatId, `6️⃣ *Data de fim (opcional):*\nDigite a data/hora de fim no formato: DD/MM/AAAA HH:MM\nOu digite "nunca" para não ter fim:`);
                        
                        client.once('message', async (fimMsg) => {
                            if (!nomeFilter(fimMsg)) return;
                            
                            let dataFim = null;
                            const fimTexto = fimMsg.body.trim().toLowerCase();
                            
                            if (fimTexto !== 'nunca') {
                                dataFim = moment(fimTexto, 'DD/MM/YYYY HH:mm');
                                if (!dataFim.isValid()) {
                                    await client.sendMessage(chatId, '❌ Data de fim inválida! Usando "nunca".');
                                    dataFim = null;
                                }
                            }
                            
                            // Criar nova mensagem
                            const novaMensagem = {
                                id: botData.messages.length + 1,
                                name: nome,
                                text: texto,
                                intervalMinutes: intervalo,
                                withMentions: mencoes,
                                startDate: dataInicio ? dataInicio.toISOString() : null,
                                endDate: dataFim ? dataFim.toISOString() : null,
                                active: true,
                                createdAt: new Date().toISOString()
                            };
                            
                            botData.messages.push(novaMensagem);
                            salvarDados();
                            
                            // Iniciar agendamento se bot estiver ativo
                            if (botData.isActive) {
                                criarAgendamento(novaMensagem.id);
                            }
                            
                            const resumo = `
✅ *MENSAGEM CRIADA COM SUCESSO!*

📝 *Nome:* ${nome}
📄 *Texto:* ${texto.substring(0, 50)}${texto.length > 50 ? '...' : ''}
⏰ *Intervalo:* ${intervalo} minutos
👥 *Menções:* ${mencoes ? 'Sim' : 'Não'}
🟢 *Início:* ${dataInicio ? dataInicio.format('DD/MM/YY HH:mm') : 'Agora'}
🔴 *Fim:* ${dataFim ? dataFim.format('DD/MM/YY HH:mm') : 'Nunca'}

🚀 *Status:* ${botData.isActive ? 'Agendamento iniciado!' : 'Aguardando ativação do bot'}
`;
                            
                            await client.sendMessage(chatId, resumo);
                        });
                    });
                });
            });
        });
    });
}

async function removerMensagem(chatId, id) {
    const index = botData.messages.findIndex(m => m.id === id);
    
    if (index === -1) {
        await client.sendMessage(chatId, '❌ Mensagem não encontrada!');
        return;
    }
    
    const mensagem = botData.messages[index];
    
    // Parar agendamento
    if (botData.scheduledJobs[id]) {
        botData.scheduledJobs[id].destroy();
        delete botData.scheduledJobs[id];
    }
    
    // Remover mensagem
    botData.messages.splice(index, 1);
    salvarDados();
    
    await client.sendMessage(chatId, `✅ Mensagem "${mensagem.name}" removida com sucesso!`);
}

async function pausarMensagem(chatId, id) {
    const mensagem = botData.messages.find(m => m.id === id);
    
    if (!mensagem) {
        await client.sendMessage(chatId, '❌ Mensagem não encontrada!');
        return;
    }
    
    if (!mensagem.active) {
        await client.sendMessage(chatId, '⚠️ Mensagem já está pausada!');
        return;
    }
    
    mensagem.active = false;
    salvarDados();
    
    // Parar agendamento
    if (botData.scheduledJobs[id]) {
        botData.scheduledJobs[id].destroy();
        delete botData.scheduledJobs[id];
    }
    
    await client.sendMessage(chatId, `⏸️ Mensagem "${mensagem.name}" pausada!`);
}

async function retomarMensagem(chatId, id) {
    const mensagem = botData.messages.find(m => m.id === id);
    
    if (!mensagem) {
        await client.sendMessage(chatId, '❌ Mensagem não encontrada!');
        return;
    }
    
    if (mensagem.active) {
        await client.sendMessage(chatId, '⚠️ Mensagem já está ativa!');
        return;
    }
    
    mensagem.active = true;
    salvarDados();
    
    // Iniciar agendamento se bot estiver ativo
    if (botData.isActive) {
        criarAgendamento(id);
    }
    
    await client.sendMessage(chatId, `▶️ Mensagem "${mensagem.name}" retomada!`);
}

async function mostrarTempos(chatId) {
    const mensagensAtivas = botData.messages.filter(m => m.active);
    
    if (mensagensAtivas.length === 0) {
        await client.sendMessage(chatId, '❌ Nenhuma mensagem ativa no momento.');
        return;
    }
    
    let lista = `⏰ *PRÓXIMOS ENVIOS*\n\n`;
    
    mensagensAtivas.forEach(msg => {
        const agora = moment();
        const proximoEnvio = agora.clone().add(msg.intervalMinutes, 'minutes');
        
        lista += `📝 *${msg.name}*\n`;
        lista += `⏰ Próximo envio: ${proximoEnvio.format('DD/MM HH:mm')}\n`;
        lista += `🔄 Intervalo: ${msg.intervalMinutes} min\n`;
        
        if (msg.endDate) {
            const fimEm = moment(msg.endDate);
            const tempoRestante = fimEm.diff(agora);
            
            if (tempoRestante > 0) {
                lista += `⏳ Termina em: ${formatarDuracao(tempoRestante)}\n`;
            } else {
                lista += `🔴 Expirada\n`;
            }
        }
        
        lista += '\n';
    });
    
    await client.sendMessage(chatId, lista);
}

async function enviarAjuda(chatId) {
    const ajuda = `
❓ *AJUDA - BOT DIVULGAÇÃO AVANÇADO*

*🔐 ACESSO:*
• Digite "${CONFIG.SECRET_CODE}" para obter acesso

*🎯 COMO USAR:*

1️⃣ *Ativar o bot:*
   Digite "ativar"

2️⃣ *Adicionar mensagem:*
   Digite "adicionar" e siga as instruções

3️⃣ *Gerenciar mensagens:*
   • "mensagens" - Ver todas
   • "pausar <id>" - Pausar mensagem
   • "retomar <id>" - Retomar mensagem
   • "remover <id>" - Remover mensagem

4️⃣ *Monitorar:*
   • "status" - Status do bot
   • "tempo" - Próximos envios
   • "grupos" - Grupos conectados

*⚠️ IMPORTANTE:*
• Máximo 5 mensagens simultâneas
• Menções funcionam em grupos
• Bot precisa estar nos grupos
• Mantenha Termux ativo

*🔧 CONFIGURAÇÃO:*
• Intervalos em minutos
• Datas no formato DD/MM/AAAA HH:MM
• Agendamentos automáticos

*📞 SUPORTE:*
• Verifique logs no terminal
• Reinicie se necessário
`;
    
    await client.sendMessage(chatId, ajuda);
}

// Inicializar bot
console.log('🚀 Iniciando Bot de Divulgação Avançado...');
console.log('📋 Configurações:');
console.log(`   🔐 Código secreto: ${CONFIG.SECRET_CODE}`);
console.log(`   📁 Dados: ${CONFIG.DATA_FILE}`);
console.log('');

client.initialize();

