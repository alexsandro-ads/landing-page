// --- CONFIGURAÇÃO DO WHATSAPP COM NÚMERO REAL ---
const NUMERO_WHATSAPP = "5581995758108";

document.addEventListener('DOMContentLoaded', () => {

    // 1. Atualiza links fixos do WhatsApp
    const whatsappFloat = document.getElementById('whatsapp-float');
    const whatsappLink = document.getElementById('whatsapp-link');
    
    if (whatsappFloat) whatsappFloat.href = `https://wa.me/${NUMERO_WHATSAPP}`;
    if (whatsappLink) whatsappLink.href = `https://wa.me/${NUMERO_WHATSAPP}`;

    // 2. Menu Mobile
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

    // 3. ENVIAR PROPOSTA VIA WHATSAPP (CORRIGIDO)
    const btnSendProposal = document.getElementById('btn-send-proposal');

    if (btnSendProposal) {
        btnSendProposal.addEventListener('click', (event) => {
            event.preventDefault(); // Impede recarregamento acidental da página

            // Seleciona as opções marcadas no formulário
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

    // 4. CHATBOT ATENDIMENTO ONLINE
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
            return "Temos 3 níveis de Landing Pages: <strong>Essencial</strong>, <strong>Profissional</strong> e <strong>Personalizada</strong>!";
        } else if (p.includes('sst') || p.includes('pgr') || p.includes('ltcat') || p.includes('segurança')) {
            return "Elaboramos documentações completas de <strong>SST (PGR, LTCAT, PCMSO)</strong> e dashboards no Power BI / AppSheet.";
        } else {
            return `Pode falar diretamente com o Alexsandro no WhatsApp! <br><br><a href="https://wa.me/${NUMERO_WHATSAPP}" target="_blank" class="btn btn-primary" style="padding: 6px 12px; font-size: 0.8rem; margin-top:5px;"><i class="fa-brands fa-whatsapp"></i> Abrir WhatsApp</a>`;
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
        }, 500);
    }

    if (chatSendBtn && chatUserInput) {
        chatSendBtn.addEventListener('click', enviarChat);
        chatUserInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') enviarChat();
        });
    }
});