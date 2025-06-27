/*
 * Portfolio Website JavaScript
 * Author: Ade Kolawole
 * Dark Mode Toggle, Animations, and Smooth Scrolling
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    const backToTop = document.querySelector('.back-to-top');
    const glitchText = document.querySelector('.glitch-text');
    
    // Initialize animations, scrollspy, theme, project filtering and hero slider
    initTheme();
    initScrollSpy();
    initAnimations();
    initProjectFilter();
    initHeroSlider();
    
    // Theme Toggle Functionality
    function initTheme() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        
        if (savedTheme === 'light') {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    function toggleTheme() {
        // Add transition-blocking class
        body.classList.add('theme-transition');
        
        // Toggle theme
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        
        // Update icon and save preference
        if (body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
        
        // Remove transition-blocking class after theme change completes
        setTimeout(() => {
            body.classList.remove('theme-transition');
        }, 100);
    }
    
    // Mobile Menu Toggle
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });
    
    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });
    
    // Scroll Spy & Header Effects
    function initScrollSpy() {
        window.addEventListener('scroll', function() {
            // Header scroll effect
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Update active nav link based on scroll position
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
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
                    const headerOffset = header.offsetHeight + 20;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Animations
    function initAnimations() {
        // Activate glitch text effect after a short delay
        setTimeout(() => {
            if (glitchText) {
                glitchText.classList.add('active');
            }
        }, 1000);
        
        // Add reveal class to sections
        document.querySelectorAll('.section-header, .project, .about-content, .contact-content')
            .forEach(el => el.classList.add('reveal'));
        
        // Check for elements to reveal on scroll
        checkReveal();
        window.addEventListener('scroll', checkReveal);
        
        // Initial trigger for elements in view on page load
        setTimeout(checkReveal, 100);
    }
    
    function checkReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const formInputs = contactForm.querySelectorAll('input, textarea');
            
            formInputs.forEach(input => {
                if (input.required && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else if (input.type === 'email' && input.value.trim()) {
                    // Basic email validation
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value.trim())) {
                        isValid = false;
                        input.classList.add('error');
                    } else {
                        input.classList.remove('error');
                    }
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Simulate form submission success for demo purposes
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Simulate API call with timeout
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                    
                    // Show success notification
                    showNotification('Your message has been sent successfully!', 'success');
                }, 1500);
            } else {
                showNotification('Please fill out all required fields correctly.', 'error');
            }
        });
        
        // Remove error class on input focus
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('focus', function() {
                this.classList.remove('error');
            });
        });
    }
    
    // Project category filtering
    function initProjectFilter() {
        const categoryButtons = document.querySelectorAll('.category-btn');
        const projects = document.querySelectorAll('.project');
        
        if (categoryButtons.length && projects.length) {
            categoryButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Get selected category
                    const selectedCategory = this.getAttribute('data-category');
                    
                    // Filter projects
                    projects.forEach(project => {
                        if (selectedCategory === 'all' || project.getAttribute('data-category') === selectedCategory) {
                            project.style.display = 'grid';
                            setTimeout(() => {
                                project.style.opacity = '1';
                                project.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            project.style.opacity = '0';
                            project.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                project.style.display = 'none';
                            }, 300);
                        }
                    });
                    
                    // Trigger reveal check to update animations
                    setTimeout(checkReveal, 350);
                });
            });
        }
    }
    
    // Hero Slider Functionality
    function initHeroSlider() {
        const sliderItems = document.querySelectorAll('.slider-item');
        const sliderDots = document.querySelectorAll('.slider-dot');
        const prevBtn = document.querySelector('.slider-nav-prev');
        const nextBtn = document.querySelector('.slider-nav-next');
        const techIcons = document.querySelectorAll('.tech-icons i');
        const mobileAppIcon = document.querySelector('.tech-icons .fa-mobile-alt');
        const graphicDesignIcon = document.querySelector('.tech-icons .fa-palette');
        const videoEditingIcon = document.querySelector('.tech-icons .fa-video');
        const digitalMarketingIcon = document.querySelector('.tech-icons .fa-bullhorn');
        let currentIndex = 0;
        let slideInterval;

        // Function to change slide
        function goToSlide(index) {
            // Reset active classes
            sliderItems.forEach(item => item.classList.remove('active'));
            sliderDots.forEach(dot => dot.classList.remove('active'));
            
            // Reset expertise icons
            techIcons.forEach(icon => icon.classList.remove('active-expertise'));
            
            // Handle index wrapping
            if (index < 0) index = sliderItems.length - 1;
            if (index >= sliderItems.length) index = 0;
            
            // Set new active slide and dot
            currentIndex = index;
            sliderItems[currentIndex].classList.add('active');
            sliderDots[currentIndex].classList.add('active');
            
            // Get the web development icon for the new slide
            const webDevIcon = document.querySelector('.tech-icons .fa-laptop-code');
            
            // Highlight the appropriate expertise icon based on current slide
            if (currentIndex === 0) {
                // First slide (image) - highlight mobile app icon
                mobileAppIcon.classList.add('active-expertise');
            } else if (currentIndex === 1) {
                // Second slide (video) - highlight graphic design icon
                graphicDesignIcon.classList.add('active-expertise');
            } else if (currentIndex === 2) {
                // Third slide (video) - highlight video editing icon
                videoEditingIcon.classList.add('active-expertise');
            } else if (currentIndex === 3) {
                // Fourth slide (image) - highlight digital marketing icon
                digitalMarketingIcon.classList.add('active-expertise');
            } else if (currentIndex === 4) {
                // Fifth slide (ghayweb.svg) - highlight web development icon
                if (webDevIcon) {
                    webDevIcon.classList.add('active-expertise');
                }
            }
        }

        // Initialize auto slide timer
        function startSlideTimer() {
            // Clear any existing interval
            if (slideInterval) clearInterval(slideInterval);
            
            // Set interval for automatic sliding
            slideInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 5000); // Change slide every 5 seconds
        }

        // Event listeners for navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
                startSlideTimer(); // Reset timer when manually navigating
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
                startSlideTimer(); // Reset timer when manually navigating
            });
        }

        // Add click events to dots
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                startSlideTimer(); // Reset timer when manually navigating
            });
        });

        // Pause slider on hover
        const sliderContainer = document.querySelector('.hero-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                startSlideTimer();
            });
        }

        // Set initial slide and highlight correct expertise icon
        goToSlide(0);
        
        // Start the automatic slider
        startSlideTimer();
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <p>${message}</p>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
    
    // Function to highlight Web Development icon when slide is clicked
    window.highlightWebDev = function(event) {
        // Prevent default anchor behavior to allow custom processing
        event.preventDefault();
        
        // Get the web development icon
        const webDevIcon = document.querySelector('.tech-icons .fa-laptop-code');
        
        if (webDevIcon) {
            // Remove active class from all icons
            document.querySelectorAll('.tech-icons i').forEach(icon => {
                icon.classList.remove('active-expertise');
            });
            
            // Add active class to web dev icon (same as other slides)
            webDevIcon.classList.add('active-expertise');
        }
        
        // Scroll to the services section
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            const headerOffset = document.querySelector('header').offsetHeight + 20;
            const targetPosition = servicesSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };
});