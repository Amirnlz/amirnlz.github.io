// Portfolio Main JavaScript
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoader();
        this.setupNavbar();
        this.setupScrollAnimations();
        this.setupParticles();
        this.setupTypewriter();
        this.setupSkillBars();
        this.setupCounters();
        this.setupContactForm();
        this.setupBackToTop();
        this.setupHamburger();
        this.setupProjectCards();
    }

    // Loading Animation
    setupLoader() {
        window.addEventListener('load', () => {
            const loader = document.querySelector('.loader-wrapper');
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 1500);
        });
    }

    // Navbar Scroll Effect
    setupNavbar() {
        const navbar = document.getElementById('navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add scrolled class
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                        
                        // Update active state
                        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                }
            });
        });

        // Update active nav item on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for slide-in animations
        document.querySelectorAll('.slide-in-left, .slide-in-right, .scale-in').forEach(el => {
            observer.observe(el);
        });

        // Observe skill bars
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillBars();
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const skillsSection = document.querySelector('#skills');
        if (skillsSection) {
            skillObserver.observe(skillsSection);
        }

        // Observe counters
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            counterObserver.observe(aboutSection);
        }
    }

    // Particle System
    setupParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const createParticle = () => {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = `rgba(100, 255, 218, ${Math.random() * 0.5})`;
            particle.style.borderRadius = '50%';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = '100%';
            particle.style.animation = `particleFloat ${10 + Math.random() * 20}s linear infinite`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            particlesContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 30000);
        };

        // Create particles periodically
        setInterval(createParticle, 200);
        
        // Create initial particles
        for (let i = 0; i < 20; i++) {
            setTimeout(createParticle, i * 100);
        }
    }

    // Typewriter Effect
    setupTypewriter() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        // Add typing animation to hero title
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.innerHTML = originalText.substring(0, i + 1);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        // Start typing after loader disappears
        setTimeout(typeWriter, 2000);
    }

    // Skill Bars Animation
    setupSkillBars() {
        // Will be triggered by scroll observer
    }

    animateSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                const percentage = item.getAttribute('data-skill');
                const progressBar = item.querySelector('.skill-progress');
                if (progressBar) {
                    progressBar.style.width = `${percentage}%`;
                }
            }, index * 100);
        });
    }

    // Counter Animation
    setupCounters() {
        // Will be triggered by scroll observer
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
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

    // Contact Form
    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Here you would integrate with your email service
                // For GitHub Pages, you can use Formspree, EmailJS, or similar services
                // Example with Formspree:
                // const response = await fetch('https://formspree.io/f/your-form-id', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(data)
                // });
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Success
                this.showNotification('Message sent successfully!', 'success');
                form.reset();
                
            } catch (error) {
                // Error
                this.showNotification('Something went wrong. Please try again.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            background: type === 'success' ? 'rgba(100, 255, 218, 0.1)' : 'rgba(255, 107, 107, 0.1)',
            color: type === 'success' ? 'var(--color-accent)' : 'var(--color-accent-3)',
            border: `1px solid ${type === 'success' ? 'rgba(100, 255, 218, 0.3)' : 'rgba(255, 107, 107, 0.3)'}`,
            borderRadius: '5px',
            zIndex: '9999',
            fontWeight: '500',
            backdropFilter: 'blur(10px)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Back to Top Button
    setupBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Hamburger Menu
    setupHamburger() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!hamburger || !navMenu) return;
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Project Cards (Dynamic Loading)
    setupProjectCards() {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        // Sample projects data - replace with your actual projects
        const projects = [
            {
                title: "E-Commerce Platform",
                description: "A full-stack e-commerce solution with React, Node.js, and Stripe integration.",
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop",
                tech: ["React", "Node.js", "MongoDB", "Stripe"],
                github: "https://github.com/yourusername/ecommerce",
                demo: "https://your-ecommerce-demo.com"
            },
            {
                title: "Task Management App",
                description: "A collaborative task management tool with real-time updates using WebSockets.",
                image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&h=200&fit=crop",
                tech: ["TypeScript", "Next.js", "PostgreSQL", "Socket.io"],
                github: "https://github.com/yourusername/taskmanager",
                demo: "https://your-taskmanager-demo.com"
            },
            {
                title: "Weather Dashboard",
                description: "A beautiful weather dashboard with charts and location-based forecasts.",
                image: "https://images.unsplash.com/photo-1504608524841-42dd6f7dee52?w=400&h=200&fit=crop",
                tech: ["Vue.js", "Chart.js", "OpenWeather API"],
                github: "https://github.com/yourusername/weather-dashboard",
                demo: "https://your-weather-demo.com"
            },
            {
                title: "Portfolio Generator",
                description: "A tool that generates beautiful portfolio websites from GitHub profiles.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
                tech: ["React", "GitHub API", "Tailwind CSS"],
                github: "https://github.com/yourusername/portfolio-generator",
                demo: "https://your-portfolio-generator-demo.com"
            },
            {
                title: "Real-time Chat App",
                description: "A real-time chat application with group rooms and private messaging.",
                image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=400&h=200&fit=crop",
                tech: ["React", "Firebase", "WebRTC"],
                github: "https://github.com/yourusername/chat-app",
                demo: "https://your-chat-demo.com"
            },
            {
                title: "Crypto Tracker",
                description: "A cryptocurrency price tracker with portfolio management and alerts.",
                image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop",
                tech: ["Angular", "RxJS", "CoinGecko API"],
                github: "https://github.com/yourusername/crypto-tracker",
                demo: "https://your-crypto-demo.com"
            }
        ];

        // Generate project cards
        projects.forEach((project, index) => {
            const card = this.createProjectCard(project);
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('stagger-item');
            projectsGrid.appendChild(card);
        });
    }

    createProjectCard(project) {
        const card = document.createElement('article');
        card.className = 'project-card';
        
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" target="_blank" aria-label="GitHub Repository">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="${project.demo}" target="_blank" aria-label="Live Demo">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        `;
        
        return card;
    }
}

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});