// --- CONFIGURAÇÃO ---
const NUMERO_WHATSAPP = "5500000000000"; // Substitua pelo seu WhatsApp com DDD (ex: 5581999999999)

document.addEventListener('DOMContentLoaded', () => {

    // 1. Atualizar Links do WhatsApp
    const whatsappFloat = document.getElementById('whatsapp-float');
    const whatsappLink = document.getElementById('whatsapp-link');
    
    if (whatsappFloat) whatsappFloat.href = `https://wa.me/${NUMERO_WHATSAPP}`;
    if (whatsappLink) whatsappLink.href = `https://wa.me/${NUMERO_WHATSAPP}`;

    // 2. Menu Mobile
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 3. Calculadora / Seleção de Serviços -> WhatsApp
    const calcForm = document.getElementById('calc-form');
    const btnWhatsappCalc = document.getElementById('btn-whatsapp-calc');

    if (btnWhatsappCalc && calcForm) {
        btnWhatsappCalc.addEventListener('click', () => {
            const selecionados = [];
            const checkboxes = calcForm.querySelectorAll('input[type="checkbox"]:checked');

            checkboxes.forEach(cb => {
                selecionados.push(cb.getAttribute('data-nome'));
            });

            if (selecionados.length === 0) {
                alert('Por favor, selecione ao menos um serviço para solicitar a proposta.');
                return;
            }

            let mensagem = `Olá, Alexsandro! Vi seu site e gostaria de solicitar uma proposta.\n\n`;
            mensagem += `*Itens Selecionados:*\n`;
            selecionados.forEach(item => mensagem += `- ${item}\n`);
            mensagem += `\nPodemos conversar sobre os detalhes, prazos e orçamento?`;

            const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
            window.open(url, '_blank');
        });
    }

    // 4. LÓGICA DO ATENDIMENTO ONLINE VIA IA (CHATBOT)
    const aiChatToggle = document.getElementById('ai-chat-toggle');
    const aiChatBox = document.getElementById('ai-chat-box');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatMessages = document.getElementById('chat-messages');
    const chatUserInput = document.getElementById('chat-user-input');
    const chatSendBtn = document.getElementById('chat-send-btn');

    // Abrir/Fechar Chat
    if (aiChatToggle && aiChatBox && chatCloseBtn) {
        aiChatToggle.addEventListener('click', () => {
            aiChatBox.classList.toggle('active');
        });

        chatCloseBtn.addEventListener('click', () => {
            aiChatBox.classList.remove('active');
        });
    }

    // Função de Resposta Inteligente da IA
    function processarRespostaIA(pergunta) {
        const p = pergunta.toLowerCase();

        if (p.includes('basico') || p.includes('básic') || p.includes('plano 1')) {
            return "O <strong>Plano Básico</strong> inclui uma Landing Page de página única, 100% responsiva, ideal para apresentar sua empresa/serviço e receber mensagens diretas no WhatsApp!";
        } else if (p.includes('medio') || p.includes('médio') || p.includes('plano 2')) {
            return "O <strong>Plano Médio</strong> conta com formulário dinâmico de orçamento, galeria de projetos, mapa interativo e otimização SEO para você ser encontrado no Google.";
        } else if (p.includes('profissional') || p.includes('avançad') || p.includes('plano 3')) {
            return "O <strong>Plano Profissional</strong> é uma solução completa! Design exclusivo, simuladores interativos e integração com Dashboards em Power BI ou Apps.";
        } else if (p.includes('valor') || p.includes('preco') || p.includes('preço') || p.includes('quanto custa') || p.includes('orcamento') || p.includes('orçamento')) {
            return `Os projetos são personalizados sob medida. <a href="https://wa.me/${NUMERO_WHATSAPP}" target="_blank" style="color:#60a5fa; text-decoration:underline;">Clique aqui para conversar diretamente no WhatsApp</a> e negociar valores e prazos!`;
        } else if (p.includes('sst') || p.includes('segurança') || p.includes('pgr') || p.includes('ltcat')) {
            return "Na área de <strong>SST</strong>, o Alexsandro elabora documentações técnicas completas como PGR, LTCAT, PCMSO e realiza consultoria para adequação às Normas Regulamentadoras (NRs).";
        } else if (p.includes('power bi') || p.includes('dashboard') || p.includes('ads') || p.includes('appsheet')) {
            return "Com o conhecimento em <strong>ADS</strong> (Análise e Desenvolvimento de Sistemas), desenvolvemos painéis dinâmicos no Power BI e aplicativos via AppSheet para controle da sua empresa.";
        } else if (p.includes('prazo') || p.includes('demora') || p.includes('tempo')) {
            return "O prazo médio varia conforme a complexidade do plano (geralmente entre 3 a 10 dias). Podemos definir o cronograma juntos no WhatsApp!";
        } else {
            return `Obrigado pelo contato! Para analisar detalhes específicos do seu projeto, recomendo falar direto com o Alexsandro. <br><br><a href="https://wa.me/${NUMERO_WHATSAPP}" target="_blank" class="btn btn-primary" style="padding: 6px 12px; font-size: 0.8rem; margin-top:5px;"><i class="fa-brands fa-whatsapp"></i> Chamar no WhatsApp</a>`;
        }
    }

    // Enviar mensagem do usuário
    function enviarMensagemChat() {
        const texto = chatUserInput.value.trim();
        if (!texto) return;

        // Adiciona mensagem do usuário
        const userMsgDiv = document.createElement('div');
        userMsgDiv.className = 'chat-msg msg-user';
        userMsgDiv.textContent = texto;
        chatMessages.appendChild(userMsgDiv);

        chatUserInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Efeito de digitação da IA
        setTimeout(() => {
            const aiMsgDiv = document.createElement('div');
            aiMsgDiv.className = 'chat-msg msg-ai';
            aiMsgDiv.innerHTML = processarRespostaIA(texto);
            chatMessages.appendChild(aiMsgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 600);
    }

    if (chatSendBtn && chatUserInput) {
        chatSendBtn.addEventListener('click', enviarMensagemChat);
        chatUserInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') enviarMensagemChat();
        });
    }
});