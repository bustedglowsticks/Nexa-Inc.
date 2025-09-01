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

// Pillar Modal System
document.addEventListener('DOMContentLoaded', () => {
    const pillarData = {
        core: {
            icon: 'bi-cpu-fill',
            title: 'NEXA Core',
            subtitle: 'Day-to-Day Operations Automation',
            description: 'The foundation of contractor-first utility operations.',
            painPoints: [
                { icon: 'bi-clock-history', title: 'Manual Spec Verification', desc: 'Foremen spend 2+ hours daily. We automate instantly.' },
                { icon: 'bi-exclamation-triangle', title: 'Compliance Violations', desc: 'One missed spec and your crew is going back on your dime. Real-time compliance engine catches violations.' },
                { icon: 'bi-arrow-repeat', title: 'Go-Backs & Rework', desc: '15% of jobs require return trips. Pre-flight checks ensure success.' }
            ],
            security: ['SOC 2 Compliant', 'End-to-End Encryption', 'NERC CIP Ready'],
            stacking: 'Pairs with Storm for emergency response and Field for crew communication.'
        },
        storm: {
            icon: 'bi-cloud-lightning-fill',
            title: 'NEXA Storm',
            subtitle: 'Rapid Outage Response Platform',
            description: 'Deploy crews in minutes, not hours. QR rostering and mass SMS dispatch.',
            painPoints: [
                { icon: 'bi-speedometer2', title: 'Slow Mobilization', desc: 'Manual assembly takes 4+ hours. QR cuts to 30 minutes.' },
                { icon: 'bi-geo-alt', title: 'Resource Tracking', desc: 'Know where your crew is at, upload storm tags efficiently, assign to CA crew in that area with one click.' },
                { icon: 'bi-clipboard-data', title: 'Paper Forms', desc: 'Digital forms with offline sync and auto-submission.' }
            ],
            security: ['Edge-ready Architecture', 'Offline-tolerant', 'PII Guardrails'],
            stacking: 'Combine with Grid for damage assessment and Supply for materials.'
        },
        grid: {
            icon: 'bi-grid-3x3-gap-fill',
            title: 'NEXA Grid',
            subtitle: 'Autonomous Inspection & Mapping',
            description: 'AI-powered drone inspections with real-time tagging and auto-generated reports.',
            painPoints: [
                { icon: 'bi-eye-slash', title: 'Blind Spots', desc: 'Manual inspections miss 30% of defects. AI catches everything.' },
                { icon: 'bi-calendar-x', title: 'Inspection Backlogs', desc: '6-month cycles. Autonomous drones complete in days.' },
                { icon: 'bi-file-earmark-x', title: 'Report Generation', desc: '2 weeks for reports. Auto-generated in real-time.' }
            ],
            security: ['Live Geotagging', 'Evidence Chain Integrity', 'Secure Asset Mapping'],
            stacking: 'Integrates with Core for automated work order generation.'
        },
        supply: {
            icon: 'bi-box-seam-fill',
            title: 'NEXA Supply Chain',
            subtitle: 'Real-time Material Management',
            description: 'End-to-end inventory tracking ensuring materials are always available.',
            painPoints: [
                { icon: 'bi-truck', title: 'Material Shortages', desc: 'Crews arrive without materials 20% of time. Real-time prevents this.' },
                { icon: 'bi-graph-down', title: 'Stock-outs', desc: 'Emergency purchases cost 3x. Predictive ordering maintains levels.' },
                { icon: 'bi-receipt', title: 'Manual Tracking', desc: 'Excel = $2M annual loss. Automated barcode scanning.' }
            ],
            security: ['Material Chain of Custody', 'Vendor Integration Security', 'Audit Logs'],
            stacking: 'Works with Core for material validation and Storm for emergency supply.'
        },
        field: {
            icon: 'bi-chat-dots-fill',
            title: 'NEXA Field',
            subtitle: 'AI Assistant for Foremen',
            description: 'LLM trained on your utility data lake. Instant spec lookups and guidance.',
            painPoints: [
                { icon: 'bi-question-circle', title: 'Spec Confusion', desc: 'Foremen call office 10+ times daily. AI answers instantly.' },
                { icon: 'bi-clock', title: 'Historical Context', desc: 'Foreman don\'t have time to look up archived jobs for the office, let NEXA Field take care of that.' },
                { icon: 'bi-shield-x', title: 'Safety Violations', desc: 'Missed steps = injuries. Real-time safety coaching.' }
            ],
            security: ['On-device AI Processing', 'Encrypted Communications', 'Role-based Access'],
            stacking: 'Enhances Core with field intelligence and Design with construction feedback.'
        },
        design: {
            icon: 'bi-rulers',
            title: 'NEXA Design',
            subtitle: 'AI-Powered Engineering Automation',
            description: 'Submit undesigned jobs and receive fully engineered designs in seconds.',
            painPoints: [
                { icon: 'bi-hourglass-split', title: 'Design Bottlenecks', desc: '2-week cycles. AI generates in 3.2 seconds.' },
                { icon: 'bi-calculator', title: 'Manual Calculations', desc: 'Error-prone hand calculations. Automated with accuracy.' },
                { icon: 'bi-file-earmark-pdf', title: 'Permit Delays', desc: 'Missing docs delay permits. Auto-generated packages.' }
            ],
            security: ['Design Validation Engine', 'Permit Compliance Checks', 'Version Control'],
            stacking: 'Feeds into Core for execution and Field for construction guidance.'
        },
        insights: {
            icon: 'bi-graph-up-arrow',
            title: 'NEXA Insights',
            subtitle: 'Utility-wide Transparency Dashboard',
            description: 'Complete visibility across all contractors, jobs, and assets.',
            painPoints: [
                { icon: 'bi-eye-slash', title: 'Contractor Blindness', desc: 'No visibility into performance. Real-time dashboards.' },
                { icon: 'bi-exclamation-octagon', title: 'Surprise Audits', desc: 'Waiting for asbuilt submission? See the status of that asbuilt in seconds without having to send emails and make countless phone calls.' },
                { icon: 'bi-graph-down-arrow', title: 'Reactive Management', desc: 'Problems found after completion. Predictive alerts.' }
            ],
            security: ['Row-level Security', 'Multi-tenant Isolation', 'Audit-ready Logs'],
            stacking: 'Central hub for all pillars. Best paired with Core and Field for complete visibility.'
        },
        vault: {
            icon: 'bi-safe-fill',
            title: 'NEXA Vault',
            subtitle: 'Critical Grid Data Storage',
            description: 'Military-grade secure storage for critical utility infrastructure data.',
            painPoints: [
                { icon: 'bi-database-x', title: 'Data Breaches', desc: 'Grid data exposure = national security risk. Zero-trust architecture.' },
                { icon: 'bi-file-lock', title: 'Compliance Storage', desc: '7-year retention requirements. Automated compliance archival.' },
                { icon: 'bi-shield-slash', title: 'Ransomware Risk', desc: 'Utilities targeted weekly. Immutable backups with instant recovery.' }
            ],
            security: ['Zero-trust Architecture', 'Immutable Backups', 'NERC CIP Compliant', 'Air-gapped Storage'],
            stacking: 'Foundation for all pillars. Essential for Insights analytics and Core operations.'
        }
    };

    // Handle pillar item clicks
    const integrationItems = document.querySelectorAll('.integration-item[data-pillar]');
    integrationItems.forEach(item => {
        item.addEventListener('click', function() {
            const pillar = this.dataset.pillar;
            const data = pillarData[pillar];
            if (data) {
                showPillarModal(data);
            }
        });
    });

    function showPillarModal(data) {
        const modal = document.getElementById('pillarModal');
        if (!modal) return;

        // Update modal content
        document.getElementById('modalIcon').className = data.icon;
        document.getElementById('modalTitle').textContent = data.title;
        
        // Build modal content HTML
        let contentHTML = `
            <h5 class="text-primary mb-3">${data.subtitle}</h5>
            <p class="lead text-white-50 mb-4">${data.description}</p>
            
            <div class="row">
                <div class="col-lg-6">
                    <h6 class="text-warning mb-3"><i class="bi bi-exclamation-diamond me-2"></i>Pain Points We Solve</h6>
                    <div class="pain-points">`;
        
        data.painPoints.forEach(point => {
            contentHTML += `
                <div class="d-flex mb-3">
                    <i class="${point.icon} text-danger me-3 mt-1"></i>
                    <div>
                        <strong>${point.title}</strong><br>
                        <small class="text-white-50">${point.desc}</small>
                    </div>
                </div>`;
        });
        
        contentHTML += `
                    </div>
                </div>
                <div class="col-lg-6">
                    <h6 class="text-success mb-3"><i class="bi bi-shield-check me-2"></i>Security Features</h6>
                    <div class="security-features mb-4">`;
        
        data.security.forEach(feature => {
            contentHTML += `
                <span class="badge bg-success bg-opacity-25 text-success me-2 mb-2">
                    <i class="bi bi-check-circle me-1"></i>${feature}
                </span>`;
        });
        
        contentHTML += `
                    </div>
                    <h6 class="text-info mb-3"><i class="bi bi-layers me-2"></i>Strategic Stacking</h6>
                    <p class="text-white-50">${data.stacking}</p>
                </div>
            </div>`;
        
        document.getElementById('modalContent').innerHTML = contentHTML;
        
        // Handle demo button visibility
        const demoBtn = document.getElementById('modalDemoBtn');
        if (data.title === 'NEXA Insights') {
            demoBtn.style.display = 'inline-block';
            demoBtn.onclick = () => {
                bootstrap.Modal.getInstance(modal).hide();
                document.getElementById('insights-dashboard').style.display = 'block';
                window.scrollTo(0, 0);
            };
        } else if (data.title === 'NEXA Field') {
            demoBtn.style.display = 'inline-block';
            demoBtn.textContent = 'Watch Demo';
            demoBtn.onclick = () => {
                showFieldVideo();
            };
        } else if (data.title === 'NEXA Supply Chain') {
            demoBtn.style.display = 'inline-block';
            demoBtn.textContent = 'View Demo';
            demoBtn.onclick = () => {
                showSupplyDemo();
            };
        } else {
            demoBtn.style.display = 'none';
            demoBtn.textContent = 'View Demo';
        }
        
        // Show modal
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
    }

    function showSupplyDemo() {
        const modal = document.getElementById('pillarModal');
        bootstrap.Modal.getInstance(modal).hide();
        
        const supplyModal = document.getElementById('supplyDemoModal');
        const bsSupplyModal = new bootstrap.Modal(supplyModal);
        bsSupplyModal.show();
        
        // Reset demo to step 1
        showSupplyStep(1);
    }

    function showSupplyStep(step) {
        const steps = document.querySelectorAll('.supply-step');
        const contents = document.querySelectorAll('.supply-content');
        
        steps.forEach((stepEl, index) => {
            if (index === step - 1) {
                stepEl.classList.add('active');
            } else {
                stepEl.classList.remove('active');
            }
        });
        
        contents.forEach((content, index) => {
            if (index === step - 1) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    // Make functions globally accessible for HTML onclick attributes
    window.showSupplyStep = showSupplyStep;
    window.showSupplyDemo = showSupplyDemo;
    window.nextSupplyStep = nextSupplyStep;
});

function nextSupplyStep(currentStep) {
    const nextStep = currentStep + 1;
    if (nextStep <= 3) {
        showSupplyStep(nextStep);
    }
}

// Service selection dropdown enhancement
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
