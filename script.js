/**
 * ---------------------------------------------------------------------------------
 * Main Script for Nexa, Inc. Website
 * ---------------------------------------------------------------------------------
 * This file contains all the JavaScript logic for the site's interactivity,
 * including animations, navigation, form handling, and dynamic components.
 * ---------------------------------------------------------------------------------
 */

// Initialize AOS (Animate On Scroll) library with default settings
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.getElementById('mainNav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler) {
    navbarToggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });
});

// Form validation and submission
// --- Contact Form Logic ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show success message (in production, this would send to a backend)
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Log form data (for demo purposes)
        console.log('Form submitted:', formData);
    });
}

// Notification system
// --- Dynamic Notification System ---
/**
 * Displays a toast notification at the top-right of the screen.
 * @param {string} message - The message to display.
 * @param {string} type - The type of notification ('success' or 'error').
 */
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 15px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add CSS for notifications
// Inject CSS for notification animations dynamically
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification i {
        font-size: 1.25rem;
    }
`;
document.head.appendChild(notificationStyles);

// Counter animation for stats
// --- Animated Stats Counter ---
/**
 * Animates a number from 0 to a target value.
 * @param {HTMLElement} element - The element containing the number.
 * @param {number} target - The final number to animate to.
 * @param {number} duration - The animation duration in milliseconds.
 */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for stat counters
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

// Use Intersection Observer to trigger the counter animation only when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target') || stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe stats section if it exists
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// --- Hero Section Parallax Effect ---
// Applies a simple parallax effect to the hero section background on scroll.
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Loading screen
// --- Loading Screen Logic ---
// Hide the pre-loader once the page and all its resources are fully loaded.
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
});

// Dynamic year in footer
// --- Dynamic Footer Year ---
const yearElement = document.getElementById('currentYear');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Pillar card hover effects
// --- Pillar Card Hover Effect ---
const pillarCards = document.querySelectorAll('.pillar-card');
pillarCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// --- Advanced Ecosystem Animation ---
// This script sets up and animates the canvas-based ecosystem diagram.
document.addEventListener('DOMContentLoaded', () => {
    const ecosystemVisual = document.getElementById('ecosystem-visual');
    if (!ecosystemVisual) return;

    const canvas = document.getElementById('ecosystem-canvas');
    const ctx = canvas.getContext('2d');
    const centerNode = document.getElementById('eco-center');
    const outerNodes = document.querySelectorAll('.eco-node:not(.eco-center)');

    let animationFrameId;

        /**
     * Sets up the initial positions of the ecosystem nodes and draws static lines.
     * This function is called on load and on window resize.
     */
    function setupEcosystem() {
        const containerSize = ecosystemVisual.offsetWidth;
        canvas.width = containerSize;
        canvas.height = containerSize;

        const centerX = containerSize / 2;
        const centerY = containerSize / 2;
        const radius = containerSize * 0.35;
        const angleStep = (2 * Math.PI) / outerNodes.length;

        outerNodes.forEach((node, index) => {
            const angle = (index / (outerNodes.length - 1)) * Math.PI + Math.PI / 2; // Arrange in a semi-circle
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle) - (radius * 0.4); // Raise the arc
            node.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;

            // Draw line from foundation to node
            const foundationY = containerSize * 0.85; // Corresponds to CSS bottom: 10% + foundation height approx.
            const foundationX = x;

            ctx.beginPath();
            ctx.moveTo(foundationX, foundationY);
            ctx.lineTo(x, y);
            ctx.stroke();
        });

        // Draw lines from foundation to center
        ctx.beginPath();
        ctx.moveTo(containerSize * 0.25, containerSize * 0.85);
        ctx.lineTo(centerX, centerY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(containerSize * 0.75, containerSize * 0.85);
        ctx.lineTo(centerX, centerY);
        ctx.stroke();
    }

        /**
     * Animates the connecting lines in the ecosystem diagram.
     * This creates a dynamic, pulsating effect.
     */
    function animateEcosystem() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const center_x = centerNode.offsetLeft + centerNode.offsetWidth / 2;
        const center_y = centerNode.offsetTop + centerNode.offsetHeight / 2;

        outerNodes.forEach(node => {
            const node_x = node.offsetLeft + node.offsetWidth / 2;
            const node_y = node.offsetTop + node.offsetHeight / 2;

            ctx.beginPath();
            ctx.moveTo(center_x, center_y);
            ctx.lineTo(node_x, node_y);

            ctx.strokeStyle = 'rgba(0, 224, 255, 0.6)';
            ctx.lineWidth = 1.5;
            ctx.shadowColor = 'rgba(0, 224, 255, 1)';
            ctx.shadowBlur = 10;
            ctx.stroke();
        });

        animationFrameId = requestAnimationFrame(animateEcosystem);
    }

    // Initial setup
    setupEcosystem();

    // Re-run setup on window resize
    window.addEventListener('resize', () => {
        // Debounce resize event for performance
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(setupEcosystem, 250);
    });
});

// Service selection dropdown enhancement
// --- UI Enhancements ---

// Adds a visual feedback glow to the service selection dropdown
const serviceSelect = document.getElementById('service');
if (serviceSelect) {
    serviceSelect.addEventListener('change', function() {
        const selectedService = this.value;
        if (selectedService) {
            // Add visual feedback
            this.style.borderColor = '#4361ee';
            setTimeout(() => {
                this.style.borderColor = '#e0e0e0';
            }, 2000);
        }
    });
}

// Add typing effect to hero title
// Adds a typing effect to the hero section title for a dynamic entry.
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect to hero title on load
window.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 30);
    }
});

// Scroll to top button
// --- Scroll to Top Button ---
// Dynamically creates and manages the scroll-to-top button.
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll button
scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
});

// Console welcome message
// --- Console Welcome Message ---
// A styled message for developers inspecting the console.
console.log('%c Welcome to Nexa, Inc.! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('🚀 Transforming Utility Contractor Operations with AI');
console.log('📧 Contact us: founder@nexa-us.io');
console.log('🌐 Visit: https://nexa-us.io');

// --- Product in Action Demo Logic ---
// Manages the state and flow of the interactive product demonstration section.
document.addEventListener('DOMContentLoaded', () => {
    const demoSection = document.getElementById('product-demo');
    if (!demoSection) return;

    const startDemoBtn = document.getElementById('start-demo-btn');
    const nextStep2Btn = document.getElementById('next-step-2-btn');
    const submitPhotosBtn = document.getElementById('submit-photos-btn');
    const restartDemoBtn = document.getElementById('restart-demo-btn');

    const stepItems = document.querySelectorAll('.step-item');
    const demoContents = document.querySelectorAll('.demo-content');

    const pdfSpinner = document.getElementById('pdf-upload-spinner');
    const photoSpinner = document.getElementById('photo-upload-spinner');

        /**
     * Navigates the demo to a specific step.
     * @param {number} step - The step number to display.
     */
    const goToStep = (step) => {
        stepItems.forEach(item => {
            item.classList.remove('active');
            if (parseInt(item.dataset.step) <= step) {
                item.classList.add('active');
            }
        });

        demoContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`demo-step-${step}`).classList.add('active');
    };

        /**
     * Resets the demo to its initial state (Step 1).
     */
    const resetDemo = () => {
        startDemoBtn.style.display = 'inline-block';
        submitPhotosBtn.style.display = 'inline-block';
        pdfSpinner.style.display = 'none';
        photoSpinner.style.display = 'none';
        
        stepItems.forEach((item, index) => {
            if(index === 0) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        demoContents.forEach((content, index) => {
            if(index === 0) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        // Go back to the first step's content
        goToStep(1);
    };

        // --- Event Listeners for Demo Buttons ---

    // Handles the 'Start Demo' button click
    startDemoBtn.addEventListener('click', () => {
        startDemoBtn.style.display = 'none';
        pdfSpinner.style.display = 'block';

        setTimeout(() => {
            pdfSpinner.style.display = 'none';
            goToStep(2);
        }, 1500);
    });

        // Handles the 'Next' button click on the Foreman's View
    nextStep2Btn.addEventListener('click', () => {
        goToStep(3);
    });

        // Handles the 'Submit Photos' button click
    submitPhotosBtn.addEventListener('click', () => {
        submitPhotosBtn.style.display = 'none';
        photoSpinner.style.display = 'block';

        setTimeout(() => {
            photoSpinner.style.display = 'none';
            goToStep(4);
        }, 2000);
    });

        // Handles the 'Restart Demo' button click
    restartDemoBtn.addEventListener('click', resetDemo);

    // Initialize
        // Initialize the demo to its default state on page load
    resetDemo();
});
