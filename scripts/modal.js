/**
 * Modal JavaScript
 * Handles project modal functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');
    const modalTechnologies = document.getElementById('modalTechnologies');
    const modalChallenge = document.getElementById('modalChallenge');
    const modalSolution = document.getElementById('modalSolution');
    const modalImage = document.getElementById('modalImage');
    const modalContainer = document.querySelector('.modal-container');
    const body = document.body;

    // Initialize modal functionality
    initializeModal();

    function initializeModal() {
        // Listen for custom modal open event
        document.addEventListener('openProjectModal', function(e) {
            const project = e.detail.project;
            openModal(project);
        });

        // Close modal when clicking the close button
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        // Close modal when clicking outside of it
        if (projectModal) {
            projectModal.addEventListener('click', function(e) {
                if (e.target === projectModal || e.target.classList.contains('modal-overlay')) {
                    closeModal();
                }
            });
        }

        // Close modal with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
                closeModal();
            }
        });

        // Prevent modal content from closing modal when clicked
        if (modalContainer) {
            modalContainer.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }

    // Open modal with project data
    function openModal(project) {
        if (!project || !projectModal) return;

        // Set project image
        if (modalImage && project.image) {
            modalImage.src = project.image;
            modalImage.alt = project.title;
        }

        // Set modal content
        if (modalTitle) {
            modalTitle.textContent = project.title;
        }

        if (modalDescription) {
            modalDescription.textContent = project.fullDescription || project.description;
        }

        // Set technologies
        if (modalTechnologies && project.technologies) {
            modalTechnologies.innerHTML = '';
            project.technologies.forEach(tech => {
                const techSpan = document.createElement('span');
                techSpan.textContent = tech;
                techSpan.className = 'tech-tag';
                modalTechnologies.appendChild(techSpan);
            });
        }

        // Set challenge
        if (modalChallenge && project.challenges) {
            modalChallenge.textContent = project.challenges;
        }

        // Set solution
        if (modalSolution && project.solution) {
            modalSolution.textContent = project.solution;
        }

        // Set modal tags
        if (modalTags) {
            modalTags.innerHTML = '';
            project.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.textContent = tag;
                modalTags.appendChild(tagSpan);
            });
        }

        // Add color styling to modal container
        if (modalContainer && project.color) {
            const colorValue = getComputedStyle(document.documentElement)
                .getPropertyValue(`--project-${project.color}`) || 
                getComputedStyle(document.documentElement)
                .getPropertyValue(`--${project.color}-color`) ||
                'rgba(111, 66, 193, 0.3)';
            
            modalContainer.style.borderColor = colorValue;
        }

        // Show modal
        projectModal.classList.add('active');
        body.style.overflow = 'hidden'; // Prevent background scrolling

        // Add animation delay for content
        setTimeout(() => {
            if (modalContainer) {
                modalContainer.style.opacity = '1';
                modalContainer.style.transform = 'translateY(0)';
            }
        }, 50);
    }

    // Close modal
    function closeModal() {
        if (!projectModal) return;

        // Start closing animation
        if (modalContainer) {
            modalContainer.style.opacity = '0';
            modalContainer.style.transform = 'translateY(20px)';
        }

        // Remove active class after animation
        setTimeout(() => {
            projectModal.classList.remove('active');
            body.style.overflow = ''; // Re-enable scrolling
            
            // Reset modal container styles
            if (modalContainer) {
                modalContainer.style.opacity = '';
                modalContainer.style.transform = '';
                modalContainer.style.borderColor = '';
            }
        }, 300);
    }

    // Add modal animation enhancements
    function enhanceModalAnimations() {
        if (!projectModal || !modalContainer) return;

        // Add entrance animation
        projectModal.addEventListener('transitionend', function(e) {
            if (e.target === projectModal && projectModal.classList.contains('active')) {
                // Modal is now fully visible
                if (modalContainer) {
                    modalContainer.style.animation = 'modalSlideIn 0.3s ease-out';
                }
            }
        });

        // Add CSS animation keyframes dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(30px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            @keyframes modalSlideOut {
                from {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                to {
                    opacity: 0;
                    transform: translateY(30px) scale(0.9);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize modal enhancements
    enhanceModalAnimations();

    // Add accessibility features
    function addAccessibilityFeatures() {
        if (!projectModal) return;

        // Trap focus within modal when open
        projectModal.addEventListener('keydown', function(e) {
            if (!projectModal.classList.contains('active')) return;

            const focusableElements = projectModal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });

        // Set focus to close button when modal opens
        document.addEventListener('openProjectModal', function() {
            setTimeout(() => {
                if (modalClose && projectModal.classList.contains('active')) {
                    modalClose.focus();
                }
            }, 100);
        });
    }

    // Initialize accessibility features
    addAccessibilityFeatures();
});