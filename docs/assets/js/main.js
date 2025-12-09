// HITL-IoT Dataset Website JavaScript

// ===== Smooth Scrolling =====
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

// ===== Active Navigation Highlighting =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Counter Animation =====
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    });
};

// Trigger counter animation when stats section comes into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== Copy to Clipboard =====
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        // Fallback: copy the citation text from the nearest citation-box
        const button = event.target.closest('.copy-btn');
        const citationBox = button.closest('.citation-box');
        const code = citationBox.querySelector('code');
        if (code) {
            const text = code.textContent;
            navigator.clipboard.writeText(text).then(() => {
                showCopyFeedback(button);
            });
        }
        return;
    }
    
    const text = element.textContent;
    navigator.clipboard.writeText(text).then(() => {
        showCopyFeedback(event.target);
    });
}

function showCopyFeedback(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    button.style.background = '#10b981';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
    }, 2000);
}

// ===== Scroll to Top Button =====
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Mobile Menu Toggle (if needed) =====
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        // Add hamburger button if not exists
        if (!document.querySelector('.hamburger')) {
            const hamburger = document.createElement('button');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
            navbar.querySelector('.container').appendChild(hamburger);
        }
    }
};

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Table Responsive Wrapper =====
const makeTablesResponsive = () => {
    document.querySelectorAll('table').forEach(table => {
        if (!table.parentElement.classList.contains('table-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-wrapper';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });
};

makeTablesResponsive();

// ===== Add Click Handlers to Copy Buttons =====
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const citationBox = this.closest('.citation-box');
        const code = citationBox.querySelector('code');
        if (code) {
            const text = code.textContent;
            navigator.clipboard.writeText(text).then(() => {
                showCopyFeedback(this);
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        }
    });
});

// ===== Analytics (Optional - Add your tracking ID) =====
// Google Analytics or similar can be added here

// ===== Initialize on Load =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('HITL-IoT Dataset Website Loaded');
    
    // Add any initialization code here
    
    // Smooth reveal animations for sections
    const revealSections = () => {
        const sections = document.querySelectorAll('section');
        const windowHeight = window.innerHeight;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealSections);
    revealSections(); // Initial check
});

// ===== External Link Handler =====
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        // Track external link clicks if analytics is setup
        console.log('External link clicked:', this.href);
    });
});

// ===== Print Friendly =====
window.addEventListener('beforeprint', () => {
    // Expand all collapsed sections for printing
    document.querySelectorAll('.collapsed').forEach(el => {
        el.classList.remove('collapsed');
    });
});
