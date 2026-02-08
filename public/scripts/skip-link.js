// Skip to main content - smooth scroll and focus management
document.addEventListener('DOMContentLoaded', () => {
  const skipLink = document.querySelector('.skip-to-main');
  const mainContent = document.getElementById('main-content');

  if (skipLink && mainContent) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();

      // Scroll to main content with offset for fixed header
      const headerHeight = 64; // h-16 = 64px
      const targetPosition = mainContent.offsetTop - headerHeight - 16; // extra 16px padding

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth'
      });

      // Focus the main content after scroll
      setTimeout(() => {
        mainContent.focus();
      }, 100);
    });
  }

  // Ensure focused elements are visible when using Tab navigation
  document.addEventListener('focusin', (e) => {
    const focusedElement = e.target;

    // Skip if it's the skip link itself
    if (focusedElement.classList.contains('skip-to-main')) {
      return;
    }

    // Get element position
    const rect = focusedElement.getBoundingClientRect();
    const headerHeight = 64;
    const buffer = 16;

    // If element is hidden behind header, scroll it into view
    if (rect.top < headerHeight + buffer) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop;
      const targetScroll = elementTop - headerHeight - buffer;

      window.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }
  });
});
