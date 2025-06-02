/**
 * Stats Counter Animation
 * Animates numbers from 0 to target value
 */

document.addEventListener('DOMContentLoaded', function() {
    let statsAnimated = false;

    // Function to animate counter
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / target));
        let current = start;

        const counter = setInterval(() => {
            current += increment;
            element.textContent = current;
            
            if (current === target) {
                clearInterval(counter);
            }
        }, stepTime);
    }

    // Enhanced counter animation with easing
    function animateCounterSmooth(element, target, duration = 2000) {
        const startTime = performance.now();
        const startValue = 0;

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOut);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target; // Ensure we end at exact target
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Check if stats section is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Alternative viewport check (more lenient)
    function isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top <= windowHeight * 0.75 && // Trigger when 75% visible
            rect.bottom >= 0
        );
    }

    // Initialize stats animation
    function initStatsAnimation() {
        const statsSection = document.querySelector('#stats');
        const statNumbers = document.querySelectorAll('.stat-number');

        if (!statsSection || statNumbers.length === 0) return;

        // Check if stats are in viewport on scroll
        function checkStatsVisibility() {
            if (!statsAnimated && isElementVisible(statsSection)) {
                statsAnimated = true;
                
                // Animate each counter
                statNumbers.forEach((element, index) => {
                    const target = parseInt(element.dataset.target);
                    
                    // Add slight delay for each counter
                    setTimeout(() => {
                        animateCounterSmooth(element, target, 2000);
                    }, index * 200);
                });

                // Remove scroll listener after animation starts
                window.removeEventListener('scroll', checkStatsVisibility);
            }
        }

        // Add scroll listener
        window.addEventListener('scroll', checkStatsVisibility);
        
        // Check initially in case stats are already visible
        checkStatsVisibility();
    }

    // Initialize when DOM is ready
    initStatsAnimation();

    // Optional: Add hover effects for stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
        });
    });
});