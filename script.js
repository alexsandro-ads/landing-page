// NÚMERO DO WHATSAPP CONFIGURADO
const NUMERO_WHATSAPP = "5581995758108";

document.addEventListener('DOMContentLoaded', () => {

    // 1. Atualizar botão flutuante do WhatsApp
    const whatsappFloat = document.getElementById('whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.href = `https://wa.me/${NUMERO_WHATSAPP}`;
    }

    // 2. Menu Mobile (Hamburguer)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 3. Formit de Proposta via WhatsApp
    const btnSendProposal = document.getElementById('btn-send-proposal');

    if (btnSendProposal) {
        btnSendProposal.addEventListener('click', (event) => {
            event.preventDefault();

            const checkboxes = document.querySelectorAll('#proposal-form input[type="checkbox"]:checked');
            const detalhesInput = document.getElementById('proposal-detalhes');
            const detalhes = detalhesInput ? detalhesInput.value.trim() : '';

            if (checkboxes.length === 0) {
                alert('Por favor, selecione pelo menos um serviço antes de solicitar a proposta.');
                return;
            }

            const selectedServices = [];
            checkboxes.forEach(cb => selectedServices.push(cb.value));

            let msg = `Olá, Alexsandro! Gostaria de solicitar um orçamento pelo site.\n\n`;
            msg += `*Serviços Selecionados:*\n`;
            selectedServices.forEach(s => msg += `- ${s}\n`);

            if (detalhes) {
                msg += `\n*Detalhes do Projeto:*\n${detalhes}\n`;
            }

            msg += `\nPodemos conversar sobre valores e prazos?`;

            const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank');
        });
    }

    // 4. Chatbot Atendimento
    const aiChatToggle = document.getElementById('ai-chat-toggle');
    const aiChatBox = document.getElementById('ai-chat-box');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatMessages = document.getElementById('chat-messages');
    const chatUserInput = document.getElementById('chat-user-input');
    const chatSendBtn = document.getElementById('chat-send-btn');

    if (aiChatToggle && aiChatBox && chatCloseBtn) {
        aiChatToggle.addEventListener('click', () => aiChatBox.classList.toggle('active'));
        chatCloseBtn.addEventListener('click', () => aiChatBox.classList.remove('active'));
    }

    function processarIA(pergunta) {
        const p = pergunta.toLowerCase();
        if (p.includes('plano') || p.includes('landing') || p.includes('site')) {
            return "Trabalhamos com criação de Landing Pages otimizadas e personalizadas para o seu negócio!";
        } else if (p.includes('sst') || p.includes('pgr') || p.includes('ltcat') || p.includes('segurança')) {
            return "Oferecemos elaboração de PGR, LTCAT, PCMSO e automações em Power BI / AppSheet.";
        } else {
            return `Pode falar diretamente com o Alexsandro no WhatsApp! <br><br><a href="https://wa.me/${NUMERO_WHATSAPP}" target="_blank" style="color:#00c6ff; font-weight:bold;">Clique aqui para abrir a conversa</a>`;
        }
    }

    function enviarChat() {
        if (!chatUserInput) return;
        const txt = chatUserInput.value.trim();
        if (!txt) return;

        const uDiv = document.createElement('div');
        uDiv.className = 'chat-msg msg-user';
        uDiv.textContent = txt;
        chatMessages.appendChild(uDiv);

        chatUserInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            const aiDiv = document.createElement('div');
            aiDiv.className = 'chat-msg msg-ai';
            aiDiv.innerHTML = processarIA(txt);
            chatMessages.appendChild(aiDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 400);
    }

    if (chatSendBtn && chatUserInput) {
        chatSendBtn.addEventListener('click', enviarChat);
        chatUserInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') enviarChat();
        });
    }
});