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
    // Removed ecosystem visualization - now using static card layout
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
// A styled message for developers inspecting the console (only shown once per session)
if (!sessionStorage.getItem('nexaWelcomeShown')) {
    console.log('%c Welcome to Nexa, Inc.! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('🚀 Transforming Utility Contractor Operations with AI');
    console.log('📧 Contact us: founder@nexa-us.io');
    console.log('🌐 Visit: https://nexa-us.io');
    sessionStorage.setItem('nexaWelcomeShown', 'true');
}

// --- Product in Action Demo Logic ---
// Manages the state and flow of the interactive product demonstration section.
document.addEventListener('DOMContentLoaded', () => {
    const demoSection = document.getElementById('product-demo');
    if (!demoSection) return;

    // Demo selector functionality
    const demoButtons = document.querySelectorAll('[data-demo]');
    const demoContainers = document.querySelectorAll('.demo-container');
    
    demoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetDemo = button.getAttribute('data-demo');
            
            // Update active button
            demoButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show corresponding demo
            demoContainers.forEach(container => {
                if (container.id === `demo-${targetDemo}`) {
                    container.style.display = 'block';
                } else {
                    container.style.display = 'none';
                }
            });
        });
    });

    // NEXA Design Demo Functionality
    const submitDesignBtn = document.getElementById('submit-design-btn');
    const designLoading = document.getElementById('design-loading');
    const designResult = document.getElementById('design-result');
    
    if (submitDesignBtn) {
        submitDesignBtn.addEventListener('click', () => {
            // Show loading state
            designLoading.style.display = 'block';
            designResult.style.display = 'none';
            submitDesignBtn.disabled = true;
            submitDesignBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
            
            // Simulate AI processing
            setTimeout(() => {
                designLoading.style.display = 'none';
                designResult.style.display = 'block';
                submitDesignBtn.disabled = false;
                submitDesignBtn.innerHTML = '<i class="bi bi-magic me-2"></i>Generate Underground Design';
                
                // Add fade-in animation
                designResult.style.opacity = '0';
                designResult.style.transition = 'opacity 0.5s';
                setTimeout(() => {
                    designResult.style.opacity = '1';
                }, 50);
            }, 3200); // 3.2 seconds as mentioned in the design
        });
    }

    // Job Package Demo Elements
    const startJpBtn = document.getElementById('start-jp-demo');
    const nextJp2Btn = document.getElementById('next-jp-2');
    const nextJp3Btn = document.getElementById('next-jp-3');
    const restartJpBtn = document.getElementById('restart-jp-demo');
    const jpSpinner = document.getElementById('jp-spinner');
    const jpStepItems = document.querySelectorAll('#demo-job-package .step-item');
    const jpDemoContents = document.querySelectorAll('#demo-job-package .demo-content');

    // Job Package Demo Logic
    const goToJpStep = (step) => {
        console.log(`[Job Package Demo] Transitioning to step ${step}`);
        
        // Update step indicators
        jpStepItems.forEach((item, index) => {
            if(index < step) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update content visibility
        jpDemoContents.forEach((content, index) => {
            if(index === step - 1) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
        
        // Manage button visibility based on step
        if(startJpBtn) startJpBtn.style.display = step === 1 ? 'inline-block' : 'none';
        if(nextJp2Btn) nextJp2Btn.style.display = step === 2 ? 'inline-block' : 'none';
        if(nextJp3Btn) nextJp3Btn.style.display = step === 3 ? 'inline-block' : 'none';
        if(restartJpBtn) restartJpBtn.style.display = step === 4 ? 'inline-block' : 'none';
        if(jpSpinner) jpSpinner.style.display = 'none';
    };

    // Job Package Demo Event Listeners
    if(startJpBtn) {
        startJpBtn.addEventListener('click', () => {
            console.log('[Job Package Demo] Start button clicked');
            startJpBtn.style.display = 'none';
            if(jpSpinner) jpSpinner.style.display = 'block';
            setTimeout(() => {
                if(jpSpinner) jpSpinner.style.display = 'none';
                goToJpStep(2);
            }, 1500);
        });
    }

    if(nextJp2Btn) {
        nextJp2Btn.addEventListener('click', () => {
            console.log('[Job Package Demo] Next Step 2 clicked');
            goToJpStep(3);
        });
    }

    if(nextJp3Btn) {
        nextJp3Btn.addEventListener('click', () => {
            console.log('[Job Package Demo] Next Step 3 clicked');
            goToJpStep(4);
        });
    }

    if(restartJpBtn) {
        restartJpBtn.addEventListener('click', () => {
            console.log('[Job Package Demo] Restart clicked');
            goToJpStep(1);
        });
    }
    
    // Initialize Job Package demo to step 1
    if(jpStepItems.length > 0) {
        goToJpStep(1);
    }

    // Crew Scheduling Demo
    const autoScheduleBtn = document.getElementById('auto-schedule-btn');
    const scheduleResult = document.getElementById('schedule-result');
    
    if(autoScheduleBtn) {
        autoScheduleBtn.addEventListener('click', () => {
            autoScheduleBtn.disabled = true;
            autoScheduleBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Optimizing...';
            
            setTimeout(() => {
                scheduleResult.style.display = 'block';
                autoScheduleBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Scheduled!';
                autoScheduleBtn.classList.remove('btn-success');
                autoScheduleBtn.classList.add('btn-outline-success');
                
                // Highlight crew recommendations
                document.querySelectorAll('.crew-recommendation').forEach(crew => {
                    crew.style.backgroundColor = '#f0fff4';
                    crew.style.transition = 'background-color 0.5s';
                });
            }, 2000);
        });
    }

    // Compliance Demo
    const simulatePhotoBtn = document.getElementById('simulate-photo-upload');
    const photoPreview = document.getElementById('photo-preview');
    const complianceResults = document.getElementById('compliance-results');
    
    if(simulatePhotoBtn) {
        simulatePhotoBtn.addEventListener('click', () => {
            simulatePhotoBtn.disabled = true;
            simulatePhotoBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Uploading...';
            
            setTimeout(() => {
                photoPreview.style.display = 'block';
                simulatePhotoBtn.innerHTML = '<i class="bi bi-check me-2"></i>Photo Uploaded';
                
                setTimeout(() => {
                    complianceResults.style.display = 'block';
                    // Animate compliance alerts appearing
                    const alerts = complianceResults.querySelectorAll('.alert');
                    alerts.forEach((alert, index) => {
                        alert.style.opacity = '0';
                        alert.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            alert.style.transition = 'all 0.3s';
                            alert.style.opacity = '1';
                            alert.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }, 1000);
            }, 1500);
        });
    }
});
