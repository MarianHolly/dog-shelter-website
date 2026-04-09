// Page loading and scroll animations

// Theme persistence during View Transitions
function ensureThemePersists() {
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      // Ensure theme class is applied
      if (stored === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  } catch (e) {
    // localStorage unavailable, use system preference
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

// Initialize on page load
function initPageAnimations() {
  // 1. Scroll-triggered animations using Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Once visible, stop observing to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));

  // 2. Add animate-on-load to main sections
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    // Add stagger delay based on index
    if (index < 4) { // Only first 4 sections for performance
      section.style.animationDelay = `${index * 0.1}s`;
    }
  });
}

// Skip all scroll animations when user prefers reduced motion
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reducedMotion) {
  // Make all animate-on-scroll elements immediately visible
  document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('is-visible'));
}

// Run on initial page load
document.addEventListener('DOMContentLoaded', () => {
  if (!reducedMotion) initPageAnimations();
});

// Re-run on page transitions (Astro View Transitions)
document.addEventListener('astro:page-load', () => {
  if (!reducedMotion) initPageAnimations();
});

// Show loading indicator during page transitions
document.addEventListener('astro:before-swap', () => {
  // Ensure theme persists before swap
  ensureThemePersists();

  // Create and show loading bar
  const loadingBar = document.createElement('div');
  loadingBar.className = 'page-loading-indicator';
  loadingBar.id = 'page-loading-bar';
  document.body.appendChild(loadingBar);
});

document.addEventListener('astro:after-swap', () => {
  // Ensure theme persists after swap
  ensureThemePersists();

  // Remove loading bar
  const loadingBar = document.getElementById('page-loading-bar');
  if (loadingBar) {
    setTimeout(() => loadingBar.remove(), 300);
  }

  // Scroll to top smoothly on page change
  window.scrollTo({ top: 0, behavior: 'instant' });
});

// Prefetch links on hover for faster navigation
document.addEventListener('astro:page-load', () => {
  const links = document.querySelectorAll('a[href^="/"]');

  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      // Prefetch the page on hover for instant navigation
      const href = link.getAttribute('href');
      if (href && !link.hasAttribute('data-prefetched')) {
        link.setAttribute('data-prefetched', 'true');
        // Browser will prefetch automatically with View Transitions
      }
    }, { once: true });
  });
});

// Add smooth reveal for images (skipped when reduced motion is preferred)
document.addEventListener('astro:page-load', () => {
  if (reducedMotion) return;

  const images = document.querySelectorAll('img');

  images.forEach(img => {
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease-in';

      img.addEventListener('load', () => {
        img.style.opacity = '1';
      }, { once: true });
    }
  });
});
