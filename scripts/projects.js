/**
 * Projects JavaScript
 * Handles project interactions, modal display, and "View More" functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Project data
    const projectData = {
        'pitch-innovation': {
            title: 'Pitch Innovation',
            description: 'Production-grade voice cloning technology for movies and songs, plus AI tools for music production.',
            fullDescription: 'Pitch Innovation represents a breakthrough in voice synthesis technology, offering Hollywood-quality voice cloning capabilities for the entertainment industry. Our advanced AI models can replicate any voice with unprecedented accuracy, enabling new possibilities in film dubbing, music production, and content creation.',
            image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=400&fit=crop',
            technologies: ['Deep Learning', 'TensorFlow', 'Voice Synthesis', 'Neural Networks', 'Python', 'Audio Processing'],
            challenges: 'Creating realistic voice synthesis that maintains emotional nuance while ensuring ethical use and preventing misuse of the technology.',
            solution: 'Developed a multi-layered neural architecture with emotion recognition capabilities and built-in authentication systems to ensure responsible deployment.',
            tags: ['Voice Synthesis', 'AI', 'Music Production'],
            color: 'purple'
        },
        'nunnari-labs': {
            title: 'Nunnari Labs',
            description: 'Unmanned Ground Vehicle (UGV) for weed removal in farms using deep learning.',
            fullDescription: 'Our team designed and developed an autonomous agricultural robot for Nunnari Labs that transforms weed management in farming. The UGV combines computer vision, GPS navigation, and mechanical precision to identify and remove weeds without damaging crops. The system operates 24/7, significantly reducing herbicide usage and increasing crop yield.',
            image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=400&fit=crop',
            technologies: ['Computer Vision', 'Robotics', 'Machine Learning', 'ROS', 'OpenCV', 'GPS Navigation'],
            challenges: 'Distinguishing between weeds and crops in varying lighting conditions, terrain navigation, and ensuring precise mechanical removal without crop damage.',
            solution: 'Developed a multi-spectral imaging system with custom ML models trained on diverse agricultural datasets, achieving 98% accuracy in weed detection.',
            tags: ['Robotics', 'Computer Vision', 'Machine Learning'],
            color: 'green'
        },
        'pulse-telesystems': {
            title: 'Pulse Telesystems',
            description: 'Voice caller assistants, automatic call answerers, and systems for call analysis and scoring.',
            fullDescription: 'Pulse Telesystems leverages advanced NLP and speech recognition to create intelligent call management systems. Our solution includes AI-powered voice assistants that can handle customer inquiries, automatic call routing, and comprehensive call analysis with performance scoring for quality assurance.',
            image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop',
            technologies: ['NLP', 'Speech Recognition', 'Python', 'TensorFlow', 'Voice AI', 'Real-time Processing'],
            challenges: 'Handling multiple languages, accents, and background noise while maintaining conversation context and providing accurate responses.',
            solution: 'Implemented a hybrid approach combining transformer models with traditional signal processing techniques for robust speech understanding.',
            tags: ['NLP', 'Speech Recognition', 'Data Analysis'],
            color: 'blue'
        },
        'envise': {
            title: 'Envise',
            description: 'Mobile app for tennis analysis and coaching with performance tracking.',
            fullDescription: 'Envise revolutionizes tennis coaching through AI-powered video analysis. The mobile application uses computer vision to analyze player movements, technique, and performance metrics, providing personalized coaching recommendations and progress tracking for players of all levels.',
            image: 'assets/tennis.jpg',
            technologies: ['React Native', 'Computer Vision', 'Mobile Development', 'Video Analysis', 'Firebase', 'TensorFlow Lite'],
            challenges: 'Real-time video processing on mobile devices, accurate motion tracking in various lighting conditions, and creating intuitive coaching feedback.',
            solution: 'Optimized lightweight AI models for mobile deployment and developed an innovative pose estimation algorithm specifically tuned for tennis movements.',
            tags: ['Mobile Development', 'Sports Analytics', 'UX Design'],
            color: 'yellow'
        },
        'creatorsmeet': {
            title: 'CreatorsMeet',
            description: 'Recommendation and matching algorithms to connect influencers with businesses.',
            fullDescription: 'CreatorsMeet is an intelligent platform that uses advanced matching algorithms to connect content creators with relevant business opportunities. The system analyzes creator profiles, audience demographics, and brand requirements to suggest optimal partnerships.',
            image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
            technologies: ['Machine Learning', 'Recommendation Systems', 'Python', 'Django', 'PostgreSQL', 'Data Analytics'],
            challenges: 'Creating accurate matching algorithms that consider multiple factors including audience overlap, brand alignment, and engagement rates.',
            solution: 'Developed a multi-criteria recommendation engine using collaborative filtering and content-based algorithms with real-time performance optimization.',
            tags: ['Algorithms', 'Platform Development', 'Influencer Marketing'],
            color: 'pink'
        },
        'jl-associates': {
            title: 'J&L Associates',
            description: 'Market analysis and development of AI automation tools.',
            fullDescription: 'For J&L Associates, we developed comprehensive AI automation tools that streamline business processes and provide deep market insights. The solution includes predictive analytics, automated reporting, and intelligent decision-support systems.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
            technologies: ['Python', 'Data Science', 'Automation', 'Business Intelligence', 'Machine Learning', 'API Integration'],
            challenges: 'Integrating diverse data sources, creating actionable insights from complex market data, and automating traditionally manual processes.',
            solution: 'Built a modular automation framework with custom APIs and implemented advanced analytics pipelines for real-time market intelligence.',
            tags: ['Market Analysis', 'AI Automation', 'Business Intelligence'],
            color: 'red'
        },
        'rag-qna-bot': {
            title: 'RAG QnA Bot',
            description: 'Intelligent document analysis system that allows users to upload multiple files and get instant answers through advanced RAG technology.',
            fullDescription: 'Our RAG-powered Question-Answering system revolutionizes document analysis and information retrieval. Users can upload multiple documents in various formats, and our AI system creates a comprehensive knowledge base that can answer complex questions by retrieving relevant information and generating accurate, contextual responses. The system supports PDF, Word, Excel, and text files, making it perfect for research, legal document analysis, and business intelligence.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            technologies: ['RAG', 'LangChain', 'Vector Databases', 'OpenAI', 'Pinecone', 'Python', 'Streamlit'],
            challenges: 'Processing multiple document formats, creating accurate embeddings, maintaining context across large document sets, and ensuring precise information retrieval while handling complex queries.',
            solution: 'Implemented a sophisticated RAG pipeline with document chunking, semantic search, and context-aware response generation, achieving 95% accuracy in document-based question answering.',
            tags: ['RAG', 'Document Analysis', 'AI', 'NLP'],
            color: 'blue'
        },
        'healthcare-bot': {
            title: 'Healthcare Assistant',
            description: 'Multimodal healthcare diagnostic chatbot.',
            fullDescription: 'Healthcare AI represents the future of medical diagnostics. Our multimodal system combines text analysis, image recognition, and medical knowledge to assist healthcare professionals. The platform includes HIPAA-compliant data handling, integration with electronic health records, and continuous learning capabilities.',
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            technologies: ['NLP', 'Computer Vision', 'Healthcare AI', 'Python', 'PyTorch', 'FHIR'],
            challenges: 'Ensuring medical accuracy, maintaining patient privacy, and integrating with complex healthcare systems.',
            solution: 'Developed a comprehensive AI system with multiple validation layers and strict compliance protocols for healthcare data.',
            tags: ['NLP', 'Computer Vision', 'Deep Learning', 'Healthcare'],
            color: 'purple'
        }
    };

    // Initialize projects functionality
    initializeProjects();

    function initializeProjects() {
        // Handle "View More" button
        const viewMoreBtn = document.getElementById('viewMoreBtn');
        const additionalProjects = document.querySelectorAll('.additional-project');
        let projectsExpanded = false;

        if (viewMoreBtn && additionalProjects.length > 0) {
            viewMoreBtn.addEventListener('click', function() {
                if (!projectsExpanded) {
                    // Show additional projects
                    additionalProjects.forEach((project, index) => {
                        setTimeout(() => {
                            project.style.display = 'block';
                            setTimeout(() => {
                                project.style.opacity = '1';
                                project.style.transform = 'translateY(0)';
                            }, 50);
                        }, index * 100);
                    });
                    
                    viewMoreBtn.innerHTML = '<span>Show Less</span><i class="fas fa-arrow-up"></i>';
                    projectsExpanded = true;
                } else {
                    // Hide additional projects
                    additionalProjects.forEach((project, index) => {
                        setTimeout(() => {
                            project.style.opacity = '0';
                            project.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                project.style.display = 'none';
                            }, 300);
                        }, index * 50);
                    });
                    
                    viewMoreBtn.innerHTML = '<span>View More Projects</span><i class="fas fa-arrow-right"></i>';
                    projectsExpanded = false;
                }
            });
        }

        // Add click handlers to all project cards
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach((card) => {
            card.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project');
                const project = projectData[projectId];
                
                if (project) {
                    openProjectModal(project);
                }
            });

            // Hover effects
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Modal functionality
        const modal = document.getElementById('projectModal');
        const modalClose = document.getElementById('modalClose');

        // Close modal functionality
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal || e.target.classList.contains('modal-overlay')) {
                    closeModal();
                }
            });
        }

        // Close with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Open project modal
    function openProjectModal(project) {
        const modal = document.getElementById('projectModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalImage = document.getElementById('modalImage');
        const modalTechnologies = document.getElementById('modalTechnologies');
        const modalChallenge = document.getElementById('modalChallenge');
        const modalSolution = document.getElementById('modalSolution');
        const modalTags = document.getElementById('modalTags');

        if (!modal) return;

        // Set content
        if (modalTitle) modalTitle.textContent = project.title;
        if (modalDescription) modalDescription.textContent = project.fullDescription;
        if (modalImage) {
            modalImage.src = project.image;
            modalImage.alt = project.title;
        }
        if (modalChallenge) modalChallenge.textContent = project.challenges;
        if (modalSolution) modalSolution.textContent = project.solution;

        // Set technologies
        if (modalTechnologies) {
            modalTechnologies.innerHTML = '';
            project.technologies.forEach(tech => {
                const techSpan = document.createElement('span');
                techSpan.textContent = tech;
                techSpan.className = 'tech-tag';
                modalTechnologies.appendChild(techSpan);
            });
        }

        // Set tags
        if (modalTags) {
            modalTags.innerHTML = '';
            project.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.textContent = tag;
                modalTags.appendChild(tagSpan);
            });
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Export project data for use elsewhere
    window.projectData = projectData;
});