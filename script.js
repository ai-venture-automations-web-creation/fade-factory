// Navigation scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Intersection Observer for fade up animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Function to animate elements with staggered delays
function animateElements(selector, baseDelay = 0) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element, index) => {
    element.style.animationDelay = `${baseDelay + index * 0.1}s`;
    observer.observe(element);
  });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Add fade-up class to elements that should animate
  const animateSelectors = [
    '.service__card',
    '.gallery__item',
    '.testimonial__card',
    '.contact__card',
    '.barbers__text',
    '.barbers__image',
    '.cta__title',
    '.cta__subtitle', 
    '.cta__buttons',
    '.contact__map'
  ];

  animateSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.classList.add('fade-up');
      observer.observe(element);
    });
  });

  // Counter animation for stats
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.stats__number');
        counters.forEach((counter, index) => {
          setTimeout(() => {
            animateCounter(counter);
            entry.target.classList.add('animate');
          }, index * 100);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const statsItems = statsSection.querySelectorAll('.stats__item');
    statsItems.forEach(item => item.classList.add('fade-up'));
    statsObserver.observe(statsSection);
  }
});

// Counter animation function
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'));
  const increment = target / 50;
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    // Format number based on value
    if (target === 46) {
      element.textContent = current.toFixed(1);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 40);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed nav
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Add hover effects to cards
const cards = document.querySelectorAll('.service__card, .testimonial__card, .contact__card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// Gallery image hover effects
const galleryItems = document.querySelectorAll('.gallery__item');
galleryItems.forEach(item => {
  const image = item.querySelector('.gallery__image');
  
  item.addEventListener('mouseenter', () => {
    image.style.transform = 'scale(1.05)';
  });
  
  item.addEventListener('mouseleave', () => {
    image.style.transform = 'scale(1)';
  });
});

// Button hover effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'translateY(-2px)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0)';
  });
  
  button.addEventListener('mousedown', () => {
    button.style.transform = 'scale(0.98)';
  });
  
  button.addEventListener('mouseup', () => {
    button.style.transform = 'translateY(-2px)';
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero__img');
  if (heroImage && scrolled < window.innerHeight) {
    heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
  }
});

// Mobile menu functionality (if needed for smaller screens)
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('nav__menu--active');
    navToggle.classList.toggle('nav__toggle--active');
  });
}