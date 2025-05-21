/**
 * Neurakraft - Your AI Team. On Demand.
 * Main JavaScript File
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.querySelector('.preloader').classList.add('loaded');
        }, 500);
    });

    // Create preloader element
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(preloader);

    // Initialize variables
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-links');
    const sections = document.querySelectorAll('section');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const contactForm = document.getElementById('contactForm');

    // Particles animation in hero section
    createParticles();

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        updateNavbar();
        handleScrollAnimations();
        updateActiveNavLink();
        toggleBackToTopButton();
    });

    // Initial call to set everything correctly on page load
    updateNavbar();
    handleScrollAnimations();
    updateActiveNavLink();
    toggleBackToTopButton();

    // Form submission handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission();
        });
    }

    // Add focus effects to form inputs
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('.input-focus-effect').style.width = '100%';
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.querySelector('.input-focus-effect').style.width = '0';
            }
        });
    });

    // Function to create particles in the hero section
    function createParticles() {
        const particlesContainer = document.querySelector('.particles-container');
        const colors = [
            'var(--primary-color)',
            'var(--secondary-color)',
            'var(--tertiary-color)',
            'var(--accent-color-1)',
            'var(--accent-color-2)',
            'var(--accent-color-3)'
        ];

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 15 + 5;
            
            // Random color
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Random animation duration
            const duration = Math.random() * 30 + 10;
            const delay = Math.random() * 5;
            
            // Set styles
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = color;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Function to update navbar on scroll
    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Function to handle scroll animations
    function handleScrollAnimations() {
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }

    // Function to update active navigation link based on scroll position
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Function to toggle back to top button
    function toggleBackToTopButton() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    }

    // Function to handle form submission
    function handleFormSubmission() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Normally, you would send this data to a server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', { name, email, subject, message });
        
        // Reset form
        contactForm.reset();
        
        // Show success message (in a real site, you'd handle this better)
        alert('Message sent successfully! We will get back to you soon.');
    }

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===============================
    // PROJECT MODAL FUNCTIONALITY
    // ===============================
    
    // Get modal elements
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');
    // const modalCta = document.getElementById('modalCta');
    const body = document.body;
    const modalContainer = document.querySelector('.modal-container');

    // Project data
    const projectData = [
        {
            id: 'pitch-innovation',
            title: 'Pitch Innovation',
            description: 'Production-grade voice cloning technology for movies and songs, plus AI tools for music production. Our voice synthesis technology delivers ultra-realistic voice cloning that can be used for dubbing, voiceovers, and music production. The system uses advanced deep learning models to capture the nuances of human voice.',
            tags: ['Voice Synthesis', 'AI', 'Music Production', 'Deep Learning'],
            color: 'purple',
            // ctaLink: '#'
        },
        {
            id: 'nunnari-labs',
            title: 'Nunnari Labs',
            description: 'Unmanned Ground Vehicle (UGV) for weed removal in farms using deep learning. This agricultural robotics solution uses computer vision to identify weeds and autonomously remove them, reducing the need for herbicides. The UGV is equipped with high-precision cameras and a custom-built mechanical removal system.',
            tags: ['Robotics', 'Computer Vision', 'Machine Learning', 'Agriculture'],
            color: 'green',
            // ctaLink: '#'
        },
        {
            id: 'pulse-telesystems',
            title: 'Pulse Telesystems',
            description: 'Voice caller assistants, automatic call answerers, and systems for call analysis and scoring. Our NLP-powered call assistants can handle customer inquiries, route calls, and provide real-time assistance to human operators. The system also includes powerful analytics tools for call quality assessment and agent performance tracking.',
            tags: ['NLP', 'Speech Recognition', 'Data Analysis', 'Customer Service'],
            color: 'blue',
            // ctaLink: '#'
        },
        {
            id: 'envise',
            title: 'Envise',
            description: 'Mobile app for tennis analysis and coaching with performance tracking. Using computer vision to analyze player movements and techniques, this app provides real-time feedback to improve gameplay. It includes features like stroke analysis, movement patterns, and personalized training recommendations.',
            tags: ['Mobile Development', 'Sports Analytics', 'UX Design', 'Performance Tracking'],
            color: 'yellow',
            // ctaLink: '#'
        },
        {
            id: 'creators-meet',
            title: 'CreatorsMeet',
            description: 'Recommendation and matching algorithms to connect influencers with businesses. Our platform uses AI to analyze content, audience demographics, and engagement patterns to suggest optimal influencer-brand partnerships. The system includes predictive analytics for campaign performance estimation.',
            tags: ['Algorithms', 'Platform Development', 'Influencer Marketing', 'Predictive Analytics'],
            color: 'pink',
            // ctaLink: '#'
        },
        {
            id: 'jl-associates',
            title: 'J&L Associates',
            description: 'Market analysis and development of AI automation tools. We created custom data analysis tools to identify market trends and opportunities, along with workflow automation systems to improve operational efficiency. The solution includes visualization dashboards and real-time reporting features.',
            tags: ['Market Analysis', 'AI Automation', 'Business Intelligence', 'Data Visualization'],
            color: 'red',
            // ctaLink: '#'
        }
    ];

    // Function to open modal with project data
    function openProjectModal(projectId) {
        const project = projectData.find(item => item.id === projectId) || projectData[projectId];
        
        if (project) {
            // Set modal content
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            
            // Set modal tags
            modalTags.innerHTML = '';
            project.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.textContent = tag;
                modalTags.appendChild(tagSpan);
            });
            
            // // Set CTA link
            // modalCta.href = project.ctaLink;
            
            // Add color class to modal
            modalContainer.className = 'modal-container';
            modalContainer.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue(`--project-${project.color}`);
            
            // Display modal
            projectModal.classList.add('active');
            body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    // Close modal function
    function closeProjectModal() {
        projectModal.classList.remove('active');
        setTimeout(() => {
            body.style.overflow = ''; // Re-enable scrolling
        }, 300);
    }

    // Add click event listeners to project cards
    projectCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            openProjectModal(index);
        });
    });

    // Close modal when clicking the close button
    if (modalClose) {
        modalClose.addEventListener('click', closeProjectModal);
    }

    // Close modal when clicking outside of it
    if (projectModal) {
        projectModal.addEventListener('click', function(e) {
            if (e.target === projectModal || e.target.classList.contains('modal-overlay')) {
                closeProjectModal();
            }
        });
    }

    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });

    // Service card interactions
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        // Optional: Add click event for service cards
        card.addEventListener('click', function() {
            // You can add functionality here like:
            // - Show a modal with more details
            // - Navigate to a detailed service page
            // - Trigger a contact form focused on that service
        
            // For now, we'll just log the service title
            const serviceTitle = this.querySelector('h3').textContent;
            console.log(`Service selected: ${serviceTitle}`);
        
            // Uncomment this to scroll to contact section when a service is clicked
            // document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    
        // Additional hover effects can be handled in CSS
    });

        // Add the services link to navigation menu if needed
    function addServicesNavLink() {
        const navLinks = document.querySelector('.nav-links ul');
        const aboutLink = document.querySelector('.nav-links ul li a[href="#about"]');
        const projectsLink = document.querySelector('.nav-links ul li a[href="#projects"]');
    
        if (navLinks && aboutLink && projectsLink) {
            const aboutListItem = aboutLink.parentElement;
            const servicesListItem = document.createElement('li');
            servicesListItem.innerHTML = '<a href="#services">Services</a>';
        
            // Insert services link after the about link
            navLinks.insertBefore(servicesListItem, aboutListItem.nextSibling);
        }
    }

    // Call this function if your navigation doesn't already have a Services link
    addServicesNavLink();
});