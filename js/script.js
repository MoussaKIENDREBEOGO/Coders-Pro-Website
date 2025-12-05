// ============================================
// CODEURS PRO - SCRIPT JAVASCRIPT PROFESSIONNEL
// ============================================

// === INITIALISATION ===
document.addEventListener('DOMContentLoaded', function() {
    initAOS();
    initTyped();
    initNavigation();
    initScrollEffects();
    initCounters();
    initParticles();
    initContactForm();
});

// === ANIMATIONS AOS ===
function initAOS() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
}

// === EFFET TEXTE DACTYLOGRAPHIÉ ===
function initTyped() {
    const typed = new Typed('#typed-text', {
        strings: [
            'Codeurs Our Professional',
            'Développement Web Moderne',
            'Applications Mobiles Performantes',
            'Solutions Digitales Innovantes',
            'Votre Partenaire Digital au Burkina Faso'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// === NAVIGATION ===
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');

    // Effet de scroll sur la navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Menu hamburger
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animation du hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = navLinks.classList.contains('active') 
            ? 'rotate(45deg) translateY(8px)' 
            : 'rotate(0) translateY(0)';
        spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navLinks.classList.contains('active') 
            ? 'rotate(-45deg) translateY(-8px)' 
            : 'rotate(0) translateY(0)';
    });

    // Navigation smooth scroll
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Fermer le menu mobile
            navLinks.classList.remove('active');
            
            // Réinitialiser le hamburger
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0) translateY(0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translateY(0)';
            
            // Scroll vers la section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Mettre à jour le lien actif
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Mettre à jour le lien actif au scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// === EFFETS DE SCROLL ===
function initScrollEffects() {
    // Bouton retour en haut
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// === COMPTEURS ANIMÉS ===
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let countStarted = false;

    function startCounting() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // Observer pour démarrer le compteur quand visible
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countStarted) {
                    startCounting();
                    countStarted = true;
                }
            });
        },
        { threshold: 0.5 }
    );

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }
}

// === PARTICULES D'ARRIÈRE-PLAN ===
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// === FORMULAIRE DE CONTACT ===
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les valeurs
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validation simple
        if (!name || !email || !subject || !message) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }
        
        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Veuillez entrer une adresse email valide', 'error');
            return;
        }
        
        // Simuler l'envoi (à remplacer par EmailJS ou autre service)
        showNotification('Message envoyé avec succès! Nous vous contacterons bientôt.', 'success');
        
        // Réinitialiser le formulaire
        form.reset();
        
        
    });
}

// === SYSTÈME DE NOTIFICATION ===
function showNotification(message, type) {
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Ajouter les styles inline
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-size: 1rem;
    `;
    
    document.body.appendChild(notification);
    
    // Retirer après 5 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// === ANIMATIONS CSS POUR LES NOTIFICATIONS ===
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// === EFFET PARALLAX SUR LE HERO ===
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    const particles = document.getElementById('particles');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 700;
    }
    
    if (particles) {
        particles.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// === ANIMATION DES CARTES AU SURVOL ===
document.querySelectorAll('.service-card, .team-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// === LAZY LOADING DES IMAGES (pour optimisation future) ===
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Appeler le lazy loading
lazyLoadImages();

// === PERFORMANCE: Débounce pour les événements de scroll ===
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Appliquer le debounce aux événements de scroll intensifs
window.addEventListener('scroll', debounce(function() {
    // Code optimisé pour le scroll
}, 10));

console.log('%c🚀 Codeurs Pro - Site chargé avec succès!', 'color: #4CAF50; font-size: 16px; font-weight: bold;');
console.log('%c💻 Développé avec passion par l\'équipe Codeurs Pro', 'color: #1a4d7a; font-size: 12px;');