// --- CONFIGURAÇÃO DO WHATSAPP ---
const NUMERO_WHATSAPP = "5500000000000"; // INSIRA SEU NÚMERO AQUI COM DDD (Ex: 5581999999999)

document.addEventListener('DOMContentLoaded', () => {

    // 1. Atualiza links fixos do WhatsApp
    const whatsappFloat = document.getElementById('whatsapp-float');
    const whatsappLink = document.getElementById('whatsapp-link');
    
    if (whatsappFloat) whatsappFloat.href = `https://wa.me/${NUMERO_WHATSAPP}`;
    if (whatsappLink) whatsappLink.href = `https://wa.me/${NUMERO_WHATSAPP}`;

    // 2. Menu Mobile e Scroll Ativo
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

    // Marca o item do menu correspondente à seção visível
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Formulário de Solicitação de Proposta em Tempo Real
    const btnSendProposal = document.getElementById('btn-send-proposal');
    const proposalForm = document.getElementById('proposal-form');

    if (btnSendProposal && proposalForm) {
        btnSendProposal.addEventListener('click', () => {
            const selectedServices = [];
            const checkboxes = proposalForm.querySelectorAll('input[type="checkbox"]:checked');
            const detalhes = document.getElementById('proposal-detalhes').value.trim();

            checkboxes.forEach(cb => {
                selectedServices.push(cb.value);
            });

            if (selectedServices.length === 0) {
                alert('Por favor, selecione ao menos um serviço para solicitar a proposta.');
                return;
            }

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

    // 4. Formulário de Contato Direto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            let msg = `Olá, Alexsandro! Meu nome é *${nome}* (${email}).\n\n*Mensagem:*\n${mensagem}`;
            const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank');
        });
    }

    // 5. CHATBOT ATENDIMENTO ONLINE
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
            return "Temos 3 níveis de Landing Pages: <strong>Essencial</strong> (rápida/direta), <strong>Profissional</strong> (com formulários/SEO) e <strong>Personalizada</strong> (com Dashboards e Apps)!";
        } else if (p.includes('sst') || p.includes('pgr') || p.includes('ltcat') || p.includes('segurança')) {
            return "Desenvolvemos documentações completas de <strong>SST (PGR, LTCAT, PCMSO)</strong>, além de dashboards operacionais e checklists no AppSheet.";
        } else if (p.includes('valor') || p.includes('preço') || p.includes('quanto') || p.includes('orçamento')) {
            return `Os projetos são sob medida. <a href="https://wa.me/${NUMERO_WHATSAPP}" target="_blank" style="color:#60a5fa;">Clique aqui para negociar pelo WhatsApp!</a>`;
        } else {
            return `Obrigado pela mensagem! Fale direto com o Alexsandro no WhatsApp para analisar o seu projeto. <br><br><a href="https://wa.me/${NUMERO_WHATSAPP}" target="_blank" class="btn btn-primary" style="padding: 6px 12px; font-size: 0.8rem; margin-top:5px;"><i class="fa-brands fa-whatsapp"></i> Abrir WhatsApp</a>`;
        }
    }

    function enviarChat() {
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