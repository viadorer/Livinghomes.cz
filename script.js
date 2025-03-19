// Javascript pro Living Homes web

// Pomocná funkce pro animace při scrollování
function addScrollAnimations() {
    // Přidání třídy animate--in při scrollování
    const animateElements = document.querySelectorAll('.benefit-item, .timeline-item, .card, .testimonial, .faq-item, .section-header');
    
    // Nastavení animace s odstupňovaným zpožděním
    animateElements.forEach((element, index) => {
        // Přidat výchozí styl pro animaci
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Nastavit zpoždění v závislosti na pozici prvku
        if (element.closest('.benefits-container') || 
            element.closest('.house-cards') || 
            element.closest('.testimonials-container')) {
            element.style.transitionDelay = `${index % 3 * 0.1}s`;
        }
    });
    
    // Funkce pro kontrolu viditelnosti a spuštění animace
    function checkVisibility() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Spustit kontrolu při scrollování a při načtení stránky
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Spustit při načtení
}

// Plovoucí navigační lišta - změna barvy při scrollování
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobilní menu
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navCta = document.querySelector('.nav-cta');
    
    if (menuToggle && navMenu && navCta) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navCta.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Plynulé scrollování pro anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset pro navigační lištu
                    behavior: 'smooth'
                });
                
                // Zavřít mobilní menu pokud je otevřené
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navCta.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Přidat třídu pro aktivní sekci při scrollování
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
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
});

// Animace pro karty a další prvky při scrollování
document.addEventListener('DOMContentLoaded', function() {
    function revealOnScroll() {
        const elements = document.querySelectorAll('.card, .section-header');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                element.classList.add('reveal');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Při načtení stránky
    
    // Přidat třídu pro efekt reveal
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Aktivace/deaktivace tlačítek filtrů
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-button');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Odstranit aktivní třídu ze všech tlačítek
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Přidat aktivní třídu na kliknuté tlačítko
                this.classList.add('active');
            });
        });
    }
    
    // FAQ sekce - otevírání a zavírání položek
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Zavřít ostatní otevřené FAQ položky
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Přepnout stav aktivní položky
                item.classList.toggle('active');
                
                // Změnit ikonu plus/minus
                const icon = item.querySelector('.faq-icon i');
                if (item.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });
        });
    }
    
    // Inicializace animací při scrollování
    addScrollAnimations();
});

// Spuštění animací pro prvky, které jsou viditelné při načtení stránky
window.addEventListener('load', function() {
    setTimeout(function() {
        document.body.classList.add('loaded');
        
        // Zajistí, že navigace bude mít správnou barvu při načtení stránky
        if (window.scrollY > 50) {
            document.querySelector('.navbar').classList.add('scrolled');
        }
    }, 100);
});
