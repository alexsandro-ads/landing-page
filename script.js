/* RESET & VARIÁVEIS */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

:root {
    --primary-color: #00c6ff;
    --secondary-color: #0072ff;
    --dark-bg: #0f172a;
    --card-bg: #1e293b;
    --text-color: #f8fafc;
    --accent-green: #25d366;
}

body {
    background-color: var(--dark-bg);
    color: var(--text-color);
    line-height: 1.6;
}

/* NAVBAR & LOGO */
header {
    background-color: rgba(15, 23, 42, 0.95);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.logo {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.1rem;
    color: #fff;
}

.logo-img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 10px rgba(0, 198, 255, 0.5);
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 1.5rem;
}

.nav-link {
    color: var(--text-color);
    text-decoration: none;
    transition: color 0.3s;
}

.nav-link:hover {
    color: var(--primary-color);
}

/* HERO */
.hero {
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 1rem;
    margin-top: 60px;
    background: linear-gradient(135deg, rgba(15,23,42,0.9), rgba(0,114,255,0.2));
}

.hero-content h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.hero-content p {
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto 2rem auto;
    color: #cbd5e1;
}

/* SEÇÕES & CARDS */
.section {
    padding: 4rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.card {
    background-color: var(--card-bg);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: transform 0.3s;
}

.card:hover {
    transform: translateY(-5px);
}

.card-icon {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

/* BOTÕES & FORMULÁRIO */
.btn {
    display: inline-block;
    padding: 10px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: opacity 0.3s;
}

.btn-primary {
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    color: #fff;
}

.btn-whatsapp-calc {
    background-color: var(--accent-green);
    color: #fff;
    font-size: 1.1rem;
    width: 100%;
    margin-top: 1rem;
}

.proposal-container {
    max-width: 600px;
    margin: 2rem auto 0 auto;
    background-color: var(--card-bg);
    padding: 2rem;
    border-radius: 12px;
    text-align: left;
}

.options-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.checkbox-card {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255, 255, 255, 0.05);
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

textarea {
    width: 100%;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: var(--dark-bg);
    color: #fff;
    resize: vertical;
}

/* WHATSAPP FLOAT & CHATBOT */
.whatsapp-float {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--accent-green);
    color: #fff;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    z-index: 999;
}

.ai-chat-toggle {
    position: fixed;
    bottom: 85px;
    right: 20px;
    background-color: var(--secondary-color);
    color: #fff;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    cursor: pointer;
    z-index: 999;
}

.ai-chat-box {
    display: none;
    position: fixed;
    bottom: 145px;
    right: 20px;
    width: 320px;
    height: 400px;
    background-color: var(--card-bg);
    border-radius: 12px;
    flex-direction: column;
    box-shadow: 0 5px 20px rgba(0,0,0,0.5);
    z-index: 1000;
    overflow: hidden;
}

.ai-chat-box.active {
    display: flex;
}

.chat-header {
    background-color: var(--dark-bg);
    padding: 12px;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
}

.chat-header button {
    background: none;
    border: none;
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
}

.chat-messages {
    flex: 1;
    padding: 12px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.chat-msg {
    padding: 8px 12px;
    border-radius: 8px;
    max-width: 80%;
    font-size: 0.9rem;
}

.msg-ai {
    background-color: rgba(255, 255, 255, 0.1);
    align-self: flex-start;
}

.msg-user {
    background-color: var(--secondary-color);
    align-self: flex-end;
}

.chat-input-area {
    display: flex;
    padding: 10px;
    background-color: var(--dark-bg);
}

.chat-input-area input {
    flex: 1;
    padding: 8px;
    border: none;
    border-radius: 4px;
}

.chat-input-area button {
    background-color: var(--primary-color);
    border: none;
    color: #fff;
    padding: 0 12px;
    margin-left: 5px;
    border-radius: 4px;
    cursor: pointer;
}