// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Mobile dropdown functionality removed

// Close mobile menu when clicking on main navigation links (not dropdown links)
document.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Close mobile menu when clicking on dropdown links
document.querySelectorAll('.dropdown-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Dropdown functionality removed

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// Intersection Observer for fade-in animations
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

// Add fade-in class to elements and observe them
window.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.portfolio-section, .workflow-column, .contact-content');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Video placeholder click handlers
document.querySelectorAll('.video-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', () => {
        // Add a subtle animation when clicked
        placeholder.style.transform = 'scale(0.95)';
        setTimeout(() => {
            placeholder.style.transform = 'scale(1)';
        }, 150);
        
        // Here you could add actual video playback functionality
        console.log('Video clicked - implement video player here');
    });
});

// Video click handlers for showing/hiding controls
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.video-item video');
    
    videos.forEach(video => {
        video.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Toggle controls visibility
            if (video.classList.contains('show-controls')) {
                video.classList.remove('show-controls');
                video.removeAttribute('controls');
            } else {
                video.classList.add('show-controls');
                video.setAttribute('controls', 'controls');
            }
        });
    });
});

// Contact form functionality (if needed)
const contactButtons = document.querySelectorAll('.btn-secondary');
contactButtons.forEach(button => {
    if (button.textContent.includes('FREE BRAND CALL')) {
        button.addEventListener('click', () => {
            // Here you could integrate with a calendar booking system
            alert('Contact functionality - integrate with your preferred booking system!');
        });
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to portfolio items
document.querySelectorAll('.video-item, .photo-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)';
        item.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Uncomment the line below to enable typing effect
        // typeWriter(heroTitle, originalText, 150);
    }
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

// Observe all images for lazy loading
document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// Work with me video scroll handling
let isScrolling = false;
let scrollTimer = null;

window.addEventListener('scroll', () => {
    const workWithMeVideo = document.getElementById('workWithMeVideo');
    
    if (workWithMeVideo) {
        // Mute video when scrolling starts
        if (!isScrolling) {
            workWithMeVideo.muted = true;
            isScrolling = true;
        }
        
        // Clear existing timer
        clearTimeout(scrollTimer);
        
        // Set timer to unmute video after scrolling stops
        scrollTimer = setTimeout(() => {
            workWithMeVideo.muted = false;
            isScrolling = false;
        }, 1000); // Unmute 1 second after scrolling stops
    }
});

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Portfolio filter functionality (if categories are added)
function filterPortfolio(category) {
    const items = document.querySelectorAll('.portfolio-section');
    
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
            item.classList.add('fade-in');
        } else {
            item.style.display = 'none';
        }
    });
}

// Email validation for contact forms
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Form submission handler (if contact form is added)
function handleFormSubmission(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Add your form submission logic here
    console.log('Form submitted:', Object.fromEntries(formData));
    
    // Show success message
    alert('Thank you for your message! I\'ll get back to you within 24 hours.');
}

// Add event listeners for any forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', handleFormSubmission);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-dependent functions can be called here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Console welcome message
console.log('%c👋 Welcome to Linda\'s Portfolio!', 'color: #8b7d7b; font-size: 16px; font-weight: bold;');
console.log('%cInterested in the code? Let\'s connect!', 'color: #666; font-size: 12px;');