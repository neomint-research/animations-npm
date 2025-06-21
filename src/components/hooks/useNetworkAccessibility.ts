/**
 * @neomint/animations - Network Accessibility Hook
 * 
 * Manages accessibility features for the network visualization.
 * Handles motion preferences, screen reader support, and keyboard navigation.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useNetworkContext } from '../context/NetworkContext';
import { NetworkAccessibilityConfig, MotionPreferences } from '../types';

// ============================================================================
// Hook Configuration
// ============================================================================

interface UseNetworkAccessibilityConfig {
  config: NetworkAccessibilityConfig;
}

interface AccessibilityControls {
  motionPreferences: MotionPreferences;
  announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void;
  enableHighContrast: () => void;
  disableHighContrast: () => void;
  toggleReducedMotion: () => void;
  getAccessibilityStatus: () => {
    motionReduced: boolean;
    highContrast: boolean;
    screenReaderActive: boolean;
    keyboardNavigationEnabled: boolean;
  };
}

// ============================================================================
// Motion Preference Detection
// ============================================================================

function detectMotionPreferences(): MotionPreferences {
  if (typeof window === 'undefined') {
    return {
      prefersReducedMotion: false,
      respectMotion: true,
      animationDuration: 1000
    };
  }
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReducedMotion = mediaQuery.matches;
  
  return {
    prefersReducedMotion,
    respectMotion: true,
    animationDuration: prefersReducedMotion ? 200 : 1000
  };
}

// ============================================================================
// Screen Reader Detection
// ============================================================================

function detectScreenReader(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for common screen reader indicators
  const indicators = [
    'speechSynthesis' in window,
    navigator.userAgent.includes('NVDA'),
    navigator.userAgent.includes('JAWS'),
    navigator.userAgent.includes('VoiceOver'),
    navigator.userAgent.includes('TalkBack')
  ];
  
  return indicators.some(Boolean);
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useNetworkAccessibility({
  config
}: UseNetworkAccessibilityConfig): AccessibilityControls {
  const { accessibility, updateAccessibility, updateAnimation } = useNetworkContext();
  const [motionPreferences, setMotionPreferences] = useState<MotionPreferences>(detectMotionPreferences);
  const [screenReaderActive, setScreenReaderActive] = useState(detectScreenReader);
  const [highContrastEnabled, setHighContrastEnabled] = useState(false);
  const announcementRef = useRef<HTMLDivElement | null>(null);
  
  // ============================================================================
  // Screen Reader Announcement Function
  // ============================================================================
  
  const announceToScreenReader = useCallback((
    message: string, 
    priority: 'polite' | 'assertive' = 'polite'
  ) => {
    if (!config.enableScreenReader) return;
    
    // Create or update announcement element
    if (!announcementRef.current) {
      const element = document.createElement('div');
      element.setAttribute('aria-live', priority);
      element.setAttribute('aria-atomic', 'true');
      element.style.position = 'absolute';
      element.style.left = '-10000px';
      element.style.width = '1px';
      element.style.height = '1px';
      element.style.overflow = 'hidden';
      document.body.appendChild(element);
      announcementRef.current = element;
    }
    
    // Update the announcement
    announcementRef.current.setAttribute('aria-live', priority);
    announcementRef.current.textContent = message;
    
    // Also use Speech Synthesis API if available
    if ('speechSynthesis' in window && screenReaderActive) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.volume = 0.3;
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  }, [config.enableScreenReader, screenReaderActive]);
  
  // ============================================================================
  // High Contrast Mode
  // ============================================================================
  
  const enableHighContrast = useCallback(() => {
    setHighContrastEnabled(true);
    updateAccessibility({ highContrast: true });
    
    // Apply high contrast styles to document
    document.documentElement.style.setProperty('--network-node-color', '#000000');
    document.documentElement.style.setProperty('--network-edge-color', '#666666');
    document.documentElement.style.setProperty('--network-bg-color', '#ffffff');
    
    announceToScreenReader('High contrast mode enabled');
  }, [updateAccessibility, announceToScreenReader]);
  
  const disableHighContrast = useCallback(() => {
    setHighContrastEnabled(false);
    updateAccessibility({ highContrast: false });
    
    // Remove high contrast styles
    document.documentElement.style.removeProperty('--network-node-color');
    document.documentElement.style.removeProperty('--network-edge-color');
    document.documentElement.style.removeProperty('--network-bg-color');
    
    announceToScreenReader('High contrast mode disabled');
  }, [updateAccessibility, announceToScreenReader]);
  
  // ============================================================================
  // Reduced Motion Toggle
  // ============================================================================
  
  const toggleReducedMotion = useCallback(() => {
    const newReducedMotion = !accessibility.reducedMotion;
    
    updateAccessibility({ reducedMotion: newReducedMotion });
    
    if (newReducedMotion) {
      updateAnimation({
        enabled: false,
        speed: 0.1,
        nodeAnimation: { enabled: false },
        edgeAnimation: { enabled: false }
      });
      announceToScreenReader('Reduced motion enabled - animations disabled');
    } else {
      updateAnimation({
        enabled: true,
        speed: 1,
        nodeAnimation: { enabled: true },
        edgeAnimation: { enabled: true }
      });
      announceToScreenReader('Reduced motion disabled - animations enabled');
    }
  }, [accessibility.reducedMotion, updateAccessibility, updateAnimation, announceToScreenReader]);
  
  // ============================================================================
  // Motion Preference Monitoring
  // ============================================================================
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      const newPreferences: MotionPreferences = {
        prefersReducedMotion: e.matches,
        respectMotion: config.respectMotion ?? true,
        animationDuration: e.matches ? 200 : 1000
      };
      
      setMotionPreferences(newPreferences);
      
      if (config.respectMotion && e.matches) {
        updateAccessibility({ reducedMotion: true });
        updateAnimation({
          enabled: false,
          speed: 0.1,
          nodeAnimation: { enabled: false },
          edgeAnimation: { enabled: false }
        });
        announceToScreenReader('Motion reduced due to system preference');
      }
    };
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    
    // Check initial state
    if (mediaQuery.matches && config.respectMotion) {
      handleMotionPreferenceChange({ matches: true } as MediaQueryListEvent);
    }
    
    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, [config.respectMotion, updateAccessibility, updateAnimation, announceToScreenReader]);
  
  // ============================================================================
  // High Contrast Media Query
  // ============================================================================
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    
    const handleContrastPreferenceChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        enableHighContrast();
      }
    };
    
    // Check initial state
    if (mediaQuery.matches) {
      enableHighContrast();
    }
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleContrastPreferenceChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleContrastPreferenceChange);
    };
  }, [enableHighContrast]);
  
  // ============================================================================
  // Keyboard Navigation Setup
  // ============================================================================
  
  useEffect(() => {
    if (!config.enableKeyboardNavigation || typeof window === 'undefined') return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip if user is typing in an input
      if (document.activeElement?.tagName === 'INPUT' || 
          document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }
      
      switch (event.key) {
        case 'h':
        case 'H':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            if (highContrastEnabled) {
              disableHighContrast();
            } else {
              enableHighContrast();
            }
          }
          break;
        case 'm':
        case 'M':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            toggleReducedMotion();
          }
          break;
        case '?':
          event.preventDefault();
          announceToScreenReader(
            'Keyboard shortcuts: Ctrl+H for high contrast, Ctrl+M for reduced motion, Space to pause/play animation',
            'assertive'
          );
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    config.enableKeyboardNavigation,
    highContrastEnabled,
    enableHighContrast,
    disableHighContrast,
    toggleReducedMotion,
    announceToScreenReader
  ]);
  
  // ============================================================================
  // Focus Management
  // ============================================================================
  
  useEffect(() => {
    if (!config.focusIndicators || typeof window === 'undefined') return;
    
    // Add focus styles for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
      .network-canvas:focus {
        outline: 2px solid #0066cc;
        outline-offset: 2px;
      }
      .network-container:focus-within {
        box-shadow: 0 0 0 2px #0066cc;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [config.focusIndicators]);
  
  // ============================================================================
  // Cleanup
  // ============================================================================
  
  useEffect(() => {
    return () => {
      if (announcementRef.current) {
        document.body.removeChild(announcementRef.current);
      }
    };
  }, []);
  
  // ============================================================================
  // Status Function
  // ============================================================================
  
  const getAccessibilityStatus = useCallback(() => ({
    motionReduced: accessibility.reducedMotion || motionPreferences.prefersReducedMotion,
    highContrast: highContrastEnabled,
    screenReaderActive,
    keyboardNavigationEnabled: config.enableKeyboardNavigation || false
  }), [accessibility.reducedMotion, motionPreferences.prefersReducedMotion, highContrastEnabled, screenReaderActive, config.enableKeyboardNavigation]);
  
  // ============================================================================
  // Return Controls
  // ============================================================================
  
  return {
    motionPreferences,
    announceToScreenReader,
    enableHighContrast,
    disableHighContrast,
    toggleReducedMotion,
    getAccessibilityStatus
  };
}
