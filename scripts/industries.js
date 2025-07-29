/**
 * Industries JavaScript
 * Handles industry modal functionality and detailed information display
 */

document.addEventListener('DOMContentLoaded', function() {
    // Industry data
    const industryData = {
        healthcare: {
            title: 'Healthcare',
            icon: 'fas fa-heartbeat',
            description: 'Transform healthcare delivery with AI-powered solutions that enhance patient care, improve diagnostic accuracy, and streamline medical processes.',
            services: [
                'Diagnosis assistance (radiology, pathology, dermatology)',
                'Patient chatbots for triage or appointment setting',
                'Medical imaging analysis',
                'Drug discovery & genomics',
                'Personalized treatment plans'
            ],
            example: 'AI analyzing X-rays faster than radiologists with 90%+ accuracy.',
            color: '#e74c3c'
        },
        finance: {
            title: 'Finance & Banking',
            icon: 'fas fa-university',
            description: 'Revolutionize financial services with intelligent automation, risk management, and personalized customer experiences.',
            services: [
                'Fraud detection via pattern recognition',
                'Algorithmic trading',
                'Risk assessment & credit scoring',
                'Personalized financial planning',
                'Customer support bots'
            ],
            example: 'AI-powered chatbots that handle 70%+ of customer queries.',
            color: '#3498db'
        },
        manufacturing: {
            title: 'Manufacturing',
            icon: 'fas fa-industry',
            description: 'Optimize production processes, reduce downtime, and improve quality control with advanced AI manufacturing solutions.',
            services: [
                'Predictive maintenance using sensor data',
                'Defect detection via computer vision',
                'Supply chain optimization',
                'Process automation (RPA)'
            ],
            example: 'AI predicts machinery failure 3 days in advance, reducing downtime.',
            color: '#95a5a6'
        },
        retail: {
            title: 'Retail & E-Commerce',
            icon: 'fas fa-shopping-cart',
            description: 'Enhance customer experiences and boost sales with personalized AI solutions for modern retail.',
            services: [
                'Recommendation engines',
                'Customer sentiment analysis',
                'Inventory forecasting',
                'Virtual try-ons / AI stylists',
                'Chatbots for customer service'
            ],
            example: 'AI recommendations drive 35% of Amazon\'s revenue.',
            color: '#f39c12'
        },
        education: {
            title: 'Education',
            icon: 'fas fa-graduation-cap',
            description: 'Personalize learning experiences and improve educational outcomes with adaptive AI technology.',
            services: [
                'Personalized learning paths',
                'AI tutors and assistants',
                'Automated grading',
                'Student performance analytics'
            ],
            example: 'AI platforms that adjust lesson difficulty based on student progress.',
            color: '#9b59b6'
        },
        entertainment: {
            title: 'Entertainment',
            icon: 'fas fa-film',
            description: 'Create immersive content and streamline production with cutting-edge AI entertainment solutions.',
            services: [
                'Content recommendations',
                'Script generation / idea refinement',
                'Deepfake detection',
                'Ad targeting optimization'
            ],
            example: 'Spotify uses AI to build custom playlists based on listening patterns.',
            color: '#e84393'
        },
        agriculture: {
            title: 'Agriculture',
            icon: 'fas fa-seedling',
            description: 'Modernize farming practices with intelligent automation and precision agriculture solutions.',
            services: [
                'Smart farming with IoT sensors',
                'Crop monitoring via drones',
                'Automated weed removal robotics',
                'Yield prediction analytics'
            ],
            example: 'AI-powered robots reducing herbicide usage by 90% while increasing crop yield.',
            color: '#2ecc71'
        },
        telecommunications: {
            title: 'Telecommunications',
            icon: 'fas fa-phone',
            description: 'Enhance communication networks and customer service with intelligent telecom solutions.',
            services: [
                'Call analysis and scoring',
                'Voice assistants for customer support',
                'Network optimization',
                'Predictive maintenance for infrastructure'
            ],
            example: 'AI reducing call handling time by 40% while improving customer satisfaction.',
            color: '#6f42c1'
        },
        travel: {
            title: 'Travel & Hospitality',
            icon: 'fas fa-plane',
            description: 'Optimize travel experiences and operations with intelligent hospitality solutions.',
            services: [
                'Dynamic pricing models',
                'Virtual concierges / AI agents',
                'Itinerary recommendation',
                'Predictive maintenance for planes'
            ],
            example: 'Chatbots reducing support workload by 50% at hotel chains.',
            color: '#17a2b8'
        },
        sports: {
            title: 'Sports & Fitness',
            icon: 'fas fa-running',
            description: 'Enhance athletic performance and fan engagement with AI-powered sports technology.',
            services: [
                'Performance tracking and analytics',
                'Injury prediction and prevention',
                'Fan engagement platforms',
                'Real-time game analysis'
            ],
            example: 'AI analyzing tennis gameplay in real-time to improve player technique by 25%.',
            color: '#fd7e14'
        }
    };

    // Initialize industry functionality
    initializeIndustries();

    function initializeIndustries() {
        const industryItems = document.querySelectorAll('.dropdown-item[data-industry]');
        const industryModal = document.getElementById('industryModal');
        const industryModalClose = document.getElementById('industryModalClose');

        // Add click handlers to industry items
        industryItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const industryKey = this.dataset.industry;
                openIndustryModal(industryKey);
            });
        });

        // Close modal handlers
        if (industryModalClose) {
            industryModalClose.addEventListener('click', closeIndustryModal);
        }

        if (industryModal) {
            industryModal.addEventListener('click', function(e) {
                if (e.target === industryModal || e.target.classList.contains('modal-overlay')) {
                    closeIndustryModal();
                }
            });
        }

        // ESC key to close modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && industryModal && industryModal.classList.contains('active')) {
                closeIndustryModal();
            }
        });
    }

    function openIndustryModal(industryKey) {
        const industry = industryData[industryKey];
        if (!industry) return;

        const modal = document.getElementById('industryModal');
        const icon = document.getElementById('industryIcon');
        const title = document.getElementById('industryTitle');
        const description = document.getElementById('industryDescription');
        const services = document.getElementById('industryServices');
        const example = document.getElementById('industryExampleText');
        const modalContainer = modal.querySelector('.modal-container');

        // Set content
        if (icon) {
            icon.className = industry.icon;
            icon.style.color = industry.color;
        }
        
        if (title) {
            title.textContent = industry.title;
        }
        
        if (description) {
            description.textContent = industry.description;
        }
        
        if (services) {
            services.innerHTML = '';
            industry.services.forEach(service => {
                const li = document.createElement('li');
                li.textContent = service;
                services.appendChild(li);
            });
        }
        
        if (example) {
            example.textContent = industry.example;
        }

        // Set modal border color
        if (modalContainer) {
            modalContainer.style.borderColor = industry.color;
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Animation delay
        setTimeout(() => {
            if (modalContainer) {
                modalContainer.style.opacity = '1';
                modalContainer.style.transform = 'translateY(0)';
            }
        }, 50);
    }

    function closeIndustryModal() {
        const modal = document.getElementById('industryModal');
        const modalContainer = modal.querySelector('.modal-container');

        // Start closing animation
        if (modalContainer) {
            modalContainer.style.opacity = '0';
            modalContainer.style.transform = 'translateY(20px)';
        }

        // Remove active class after animation
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset styles
            if (modalContainer) {
                modalContainer.style.opacity = '';
                modalContainer.style.transform = '';
                modalContainer.style.borderColor = '';
            }
        }, 300);
    }
});
