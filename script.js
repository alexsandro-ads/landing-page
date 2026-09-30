document.addEventListener('DOMContentLoaded', () => {
    const PHONE_NUMBER = "5581999999999"; // Substitua pelo seu número do WhatsApp (DDI + DDD + Número)

    // Configuração do Link do Botão Flutuante
    const whatsappFloat = document.getElementById('whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.href = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent('Olá Alexsandro, gostaria de mais informações sobre seus serviços!')}`;
    }

    // Toggle Menu Mobile
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

    // Gerador de Proposta via WhatsApp
    const btnSendProposal = document.getElementById('btn-send-proposal');
    if (btnSendProposal) {
        btnSendProposal.addEventListener('click', () => {
            const checkboxes = document.querySelectorAll('#proposal-form input[type="checkbox"]:checked');
            const detalhes = document.getElementById('proposal-detalhes').value;

            if (checkboxes.length === 0 && !detalhes.trim()) {
                alert('Por favor, selecione ao menos um serviço ou preencha os detalhes.');
                return;
            }

            let servicos = Array.from(checkboxes).map(cb => `• ${cb.value}`).join('\n');
            let mensagem = `*Solicitação de Proposta - Alexsandro Damasceno*\n\n`;
            
            if (servicos) {
                mensagem += `*Serviços Selecionados:*\n${servicos}\n\n`;
            }
            if (detalhes.trim()) {
                mensagem += `*Detalhes do Projeto:*\n${detalhes.trim()}`;
            }

            window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(mensagem)}`, '_blank');
        });
    }

    // Lógica do Chatbot
    const chatToggle = document.getElementById('ai-chat-toggle');
    const chatBox = document.getElementById('ai-chat-box');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatUserInput = document.getElementById('chat-user-input');
    const chatMessages = document.getElementById('chat-messages');

    if (chatToggle && chatBox && chatCloseBtn) {
        chatToggle.addEventListener('click', () => {
            chatBox.classList.toggle('active');
        });

        chatCloseBtn.addEventListener('click', () => {
            chatBox.classList.remove('active');
        });
    }

    function appendMessage(text, sender, isLink = false) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-msg', sender === 'user' ? 'msg-user' : 'msg-ai');

        if (isLink) {
            msgDiv.innerHTML = text;
        } else {
            msgDiv.textContent = text;
        }

        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function processChatQuery(query) {
        const lower = query.toLowerCase();
        let reply = "Entendi! Posso te dar mais informações sobre desenvolvimento web, dashboards ou consultoria técnica de SST. Quer falar direto no WhatsApp?";

        if (lower.includes('site') || lower.includes('landing')) {
            reply = "Desenvolvo Landing Pages de alta performance, 100% otimizadas para conversão e celulares. Escolha entre nossos planos Básico ou Avançado!";
        } else if (lower.includes('sst') || lower.includes('pgr') || lower.includes('ltcat')) {
            reply = "Elaboro documentações técnicas completas em SST (PGR, LTCAT, PCMSO) totalmente alinhadas às Normas Regulamentadoras (NRs).";
        } else if (lower.includes('power bi') || lower.includes('appsheet') || lower.includes('dashboard')) {
            reply = "Crio dashboards interativos em Power BI e aplicativos de gestão sob medida no AppSheet para automatizar os processos da sua empresa.";
        }

        appendMessage(reply, 'ai');

        const whatsAppLink = `<a href="https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent('Olá Alexsandro, vim pelo chat do site e gostaria de conversar sobre: ' + query)}" target="_blank" class="chat-btn-link"><i class="fa-brands fa-whatsapp"></i> Falar no WhatsApp</a>`;
        appendMessage(whatsAppLink, 'ai', true);
    }

    if (chatSendBtn && chatUserInput) {
        chatSendBtn.addEventListener('click', () => {
            const text = chatUserInput.value.trim();
            if (text) {
                appendMessage(text, 'user');
                chatUserInput.value = '';
                setTimeout(() => processChatQuery(text), 600);
            }
        });

        chatUserInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                chatSendBtn.click();
            }
        });
    }

    // Botões de Opção Rápida do Chatbot
    document.querySelectorAll('.quick-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            appendMessage(query, 'user');
            
            // Oculta as opções rápidas após a escolha
            const quickOpts = document.getElementById('quick-options');
            if (quickOpts) quickOpts.style.display = 'none';

            setTimeout(() => processChatQuery(query), 600);
        });
    });
});