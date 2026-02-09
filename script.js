// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        
        // Update active nav link
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip for # links and external links
        if (href === '#' || href.startsWith('http')) return;
        
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to navigation links on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Order Form Submission
const orderForm = document.getElementById('orderForm');
const orderModal = document.getElementById('orderModal');
const closeModal = document.querySelector('.close-modal');
const closeBtn = document.querySelector('.close-btn');
const orderNowBtn = document.getElementById('orderNowBtn');

if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const game = document.getElementById('game').value;
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !email || !phone || !service || !game) {
            alert('Harap lengkapi semua field yang wajib diisi!');
            return;
        }
        
        // Phone number validation (simple)
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        if (!phoneRegex.test(phone)) {
            alert('Nomor telepon tidak valid!');
            return;
        }
        
        // Email validation (simple)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Format email tidak valid!');
            return;
        }
        
        // Simulate form submission
        console.log('Form submitted:', { name, email, phone, service, game, message });
        
        // Show success modal
        if (orderModal) {
            orderModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
        
        // Reset form
        orderForm.reset();
    });
}

// Quick order button
if (orderNowBtn) {
    orderNowBtn.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
}

// Close modal when clicking X or close button
if (closeModal) {
    closeModal.addEventListener('click', () => {
        if (orderModal) {
            orderModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        if (orderModal) {
            orderModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
}

// Close modal when clicking outside modal content
window.addEventListener('click', (e) => {
    if (e.target === orderModal) {
        orderModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
});

// Form validation for phone number
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9+\-\s()]/g, '');
    });
}

// Initialize with navbar styling
document.addEventListener('DOMContentLoaded', () => {
    if (navbar && window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
    
    // Set first nav link as active initially
    if (navLinks.length > 0 && window.scrollY === 0) {
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks[0].classList.add('active');
    }
    
    // Add loading animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Add image fallback
const heroImage = document.getElementById('heroImage');
if (heroImage) {
    heroImage.onerror = function() {
        this.src = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    };
}

// Price card hover effect enhancement
const priceCards = document.querySelectorAll('.price-card');
priceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--gradient);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 100;
    box-shadow: 0 5px 20px rgba(108, 92, 231, 0.4);
    transition: all 0.3s ease;
`;

scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Add CSS for scroll-to-top button
const scrollToTopStyle = document.createElement('style');
scrollToTopStyle.textContent = `
    .scroll-to-top:hover {
        background: var(--gradient-dark) !important;
        box-shadow: 0 8px 25px rgba(108, 92, 231, 0.5) !important;
    }
`;
document.head.appendChild(scrollToTopStyle);