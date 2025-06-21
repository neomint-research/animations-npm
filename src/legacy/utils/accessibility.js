// Accessibility utilities for NEOMINT animations
export const detectMotionPreferences = () => {
  // Check for prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check for prefers-contrast
  const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
  
  return {
    prefersReducedMotion,
    prefersHighContrast,
    respectMotion: prefersReducedMotion
  };
};

export const getAccessibilitySettings = (motionPreferences) => {
  if (motionPreferences.prefersReducedMotion) {
    return {
      nodeCount: 15,           // Fewer elements
      animationSpeed: 0.1,     // Much slower animation
      connectionDistance: 60,  // Shorter connections
      opacity: 0.3,           // Reduced visual prominence
      disabled: false         // Still show animation but subdued
    };
  }
  
  return null; // Use normal settings
};

export const createMotionListener = (callback) => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  const handleChange = (e) => {
    callback(e.matches);
  };
  
  mediaQuery.addEventListener('change', handleChange);
  
  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
};

export const announceToScreenReader = (message, priority = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';
  
  document.body.appendChild(announcement);
  announcement.textContent = message;
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};