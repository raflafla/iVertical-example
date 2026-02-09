// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scroll for anchor links (polyfill support if needed, mostly covered by CSS)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Simple Animation on Scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-section'); // Add initial class via JS to not hide content if JS disabled
    observer.observe(section);
});

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Icons
const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

// Check local storage or system preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    body.classList.add('light-mode');
    themeToggleBtn.innerHTML = moonIcon; // Switch to moon icon for light mode (to toggle back to dark)
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');


    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.innerHTML = moonIcon;
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.innerHTML = sunIcon;
    }
});

// WhatsApp Widget Logic
document.addEventListener('DOMContentLoaded', () => {
    const whatsappToggle = document.getElementById('whatsapp-toggle');
    const whatsappChatBox = document.getElementById('whatsapp-chat-box');
    const closeChatBtn = document.getElementById('close-chat');
    const notificationBadge = document.getElementById('notification-badge');

    // Auto-open chat after 10 seconds (if not closed before)
    setTimeout(() => {
        if (!sessionStorage.getItem('whatsappChatClosed')) {
            whatsappChatBox.classList.add('active');
            if (notificationBadge) notificationBadge.style.display = 'none';
        }
    }, 10000); // 10 seconds

    // Toggle chat
    whatsappToggle.addEventListener('click', () => {
        whatsappChatBox.classList.toggle('active');
        if (whatsappChatBox.classList.contains('active')) {
            if (notificationBadge) notificationBadge.style.display = 'none';
        }
    });

    // Close chat
    closeChatBtn.addEventListener('click', () => {
        whatsappChatBox.classList.remove('active');
        sessionStorage.setItem('whatsappChatClosed', 'true'); // Remember user closed it
    });
});
