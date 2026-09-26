const NUMERO_WHATSAPP = "5581995758108";

document.addEventListener('DOMContentLoaded', () => {

    // 1. Atualizar link do WhatsApp flutuante
    const whatsappFloat = document.getElementById('whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.href = `https://wa.me/${NUMERO_WHATSAPP}`;
    }

    // 2. Menu Mobile
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 3. Proposta via WhatsApp
    const btnSendProposal = document.getElementById('btn-send-proposal');
    if (btnSendProposal) {
        btnSendProposal.addEventListener('click', (e) => {
            e.preventDefault();

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

    // 4. Lógica do Chatbot
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

        if (p.includes('site') || p.includes('landing') || p.includes('desenvolvimento') || p.includes('criar')) {
            return `🚀 <strong>Desenvolvimento Web & Landing Pages</strong><br><br>
                    Criamos sites modernos e otimizados para alta conversão!<br><br>
                    <a href="https://wa.me/${NUMERO_WHATSAPP}?text=Olá,%20tenho%20interesse%20em%20um%20site" target="_blank" class="chat-btn-link">Solicitar Orçamento de Site</a>`;
        } 
        
        if (p.includes('sst') || p.includes('pgr') || p.includes('ltcat') || p.includes('segurança')) {
            return `🛡️ <strong>Gestão & Documentação de SST</strong><br><br>
                    Elaboração de laudos e programas (PGR, LTCAT, PCMSO).<br><br>
                    <a href="https://wa.me/${NUMERO_WHATSAPP}?text=Olá,%20preciso%20de%20ajuda%20com%20SST" target="_blank" class="chat-btn-link">Falar sobre Documentos SST</a>`;
        } 
        
        if (p.includes('bi') || p.includes('power bi') || p.includes('appsheet') || p.includes('automação')) {
            return `📊 <strong>Automação & Power BI / AppSheet</strong><br><br>
                    Sistemas e dashboards para acompanhamento em tempo real.<br><br>
                    <a href="https://wa.me/${NUMERO_WHATSAPP}?text=Olá,%20quero%20automatizar%20meus%20dados" target="_blank" class="chat-btn-link">Ver Soluções em Dados</a>`;
        }

        return `👋 Como posso ajudar melhor?<br><br>
                Fale diretamente comigo no WhatsApp:<br><br>
                <a href="https://wa.me/${NUMERO_WHATSAPP}" target="_blank" class="chat-btn-link">💬 Conversar no WhatsApp</a>`;
    }

    function mostrarDigitando() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-msg msg-ai typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `<span></span><span></span><span></span>`;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removerDigitando() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    function enviarMensagem(texto) {
        const txt = texto || (chatUserInput ? chatUserInput.value.trim() : '');
        if (!txt) return;

        const uDiv = document.createElement('div');
        uDiv.className = 'chat-msg msg-user';
        uDiv.textContent = txt;
        chatMessages.appendChild(uDiv);

        if (chatUserInput) chatUserInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        mostrarDigitando();

        setTimeout(() => {
            removerDigitando();
            const aiDiv = document.createElement('div');
            aiDiv.className = 'chat-msg msg-ai';
            aiDiv.innerHTML = processarIA(txt);
            chatMessages.appendChild(aiDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 600);
    }

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-opt-btn')) {
            const query = e.target.getAttribute('data-query');
            enviarMensagem(query);
        }
    });

    if (chatSendBtn && chatUserInput) {
        chatSendBtn.addEventListener('click', () => enviarMensagem());
        chatUserInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') enviarMensagem();
        });
    }
});