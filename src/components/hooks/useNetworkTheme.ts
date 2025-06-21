/**
 * @neomint/animations - Network Theme Hook
 * 
 * Manages theme state and provides theme-related utilities.
 * Supports both preset themes and custom theme objects.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import { useCallback, useEffect, useState } from 'react';
import { useNetworkContext } from '../context/NetworkContext';
import { NetworkTheme, ThemePreset, ThemeMode } from '../types';
import { THEME_PRESETS } from '../constants';

// ============================================================================
// Hook Configuration
// ============================================================================

interface UseNetworkThemeConfig {
  theme: NetworkTheme;
  mode?: ThemeMode;
  onThemeChange?: (theme: NetworkTheme) => void;
}

interface ThemeControls {
  currentTheme: NetworkTheme;
  availablePresets: ThemePreset[];
  setPreset: (preset: ThemePreset) => void;
  setCustomTheme: (theme: NetworkTheme) => void;
  updateTheme: (theme: NetworkTheme | ThemePreset) => void;
  getThemeCSS: () => string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// ============================================================================
// Theme Utilities
// ============================================================================

function detectSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function isThemeDark(theme: NetworkTheme): boolean {
  // Simple heuristic: check if background is dark
  const bg = theme.backgroundColor.toLowerCase();
  
  if (bg.startsWith('#')) {
    const hex = bg.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  }
  
  if (bg.startsWith('rgb')) {
    const matches = bg.match(/\d+/g);
    if (matches && matches.length >= 3) {
      const [r, g, b] = matches.map(Number);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness < 128;
    }
  }
  
  // Fallback: check for common dark color names
  const darkColors = ['black', 'dark', 'navy', 'midnight'];
  return darkColors.some(color => bg.includes(color));
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useNetworkTheme({
  theme: initialTheme,
  mode = 'auto',
  onThemeChange
}: UseNetworkThemeConfig): ThemeControls {
  const { theme, updateTheme: updateContextTheme } = useNetworkContext();
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(detectSystemTheme);
  const [isDarkMode, setIsDarkMode] = useState(isThemeDark(theme));
  
  // ============================================================================
  // Theme Management
  // ============================================================================
  
  const setPreset = useCallback((preset: ThemePreset) => {
    const newTheme = THEME_PRESETS[preset];
    updateContextTheme(newTheme);
    setIsDarkMode(isThemeDark(newTheme));
    onThemeChange?.(newTheme);
  }, [updateContextTheme, onThemeChange]);
  
  const setCustomTheme = useCallback((customTheme: NetworkTheme) => {
    updateContextTheme(customTheme);
    setIsDarkMode(isThemeDark(customTheme));
    onThemeChange?.(customTheme);
  }, [updateContextTheme, onThemeChange]);
  
  const updateTheme = useCallback((newTheme: NetworkTheme | ThemePreset) => {
    if (typeof newTheme === 'string') {
      setPreset(newTheme);
    } else {
      setCustomTheme(newTheme);
    }
  }, [setPreset, setCustomTheme]);
  
  const toggleDarkMode = useCallback(() => {
    const currentIsDark = isThemeDark(theme);
    
    if (currentIsDark) {
      // Switch to light theme
      setPreset('light');
    } else {
      // Switch to dark theme
      setPreset('dark');
    }
  }, [theme, setPreset]);
  
  // ============================================================================
  // CSS Generation
  // ============================================================================
  
  const getThemeCSS = useCallback((): string => {
    return `
      :root {
        --network-node-color: ${theme.nodeColor};
        --network-edge-color: ${theme.edgeColor};
        --network-background-color: ${theme.backgroundColor};
        --network-highlight-color: ${theme.highlightColor || theme.nodeColor};
        --network-text-color: ${theme.textColor || '#000000'};
        --network-opacity: ${theme.opacity || 1};
        --network-node-shadow: ${theme.shadows?.node || 'none'};
        --network-edge-shadow: ${theme.shadows?.edge || 'none'};
        --network-gradient-primary: ${theme.gradients?.primary || 'none'};
        --network-gradient-secondary: ${theme.gradients?.secondary || 'none'};
      }
      
      .network-container {
        background-color: var(--network-background-color);
        color: var(--network-text-color);
      }
      
      .network-node {
        fill: var(--network-node-color);
        filter: drop-shadow(var(--network-node-shadow));
      }
      
      .network-edge {
        stroke: var(--network-edge-color);
        filter: drop-shadow(var(--network-edge-shadow));
      }
      
      .network-highlight {
        fill: var(--network-highlight-color);
        stroke: var(--network-highlight-color);
      }
    `;
  }, [theme]);
  
  // ============================================================================
  // System Theme Detection
  // ============================================================================
  
  useEffect(() => {
    if (typeof window === 'undefined' || mode !== 'auto') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);
      
      // Auto-switch theme based on system preference
      if (mode === 'auto') {
        setPreset(newSystemTheme);
      }
    };
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    // Set initial theme based on system preference
    if (mode === 'auto') {
      setPreset(systemTheme);
    }
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [mode, systemTheme, setPreset]);
  
  // ============================================================================
  // Theme CSS Injection
  // ============================================================================
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Inject theme CSS into document
    const styleId = 'network-theme-styles';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = getThemeCSS();
    
    return () => {
      // Don't remove on unmount as other instances might be using it
    };
  }, [getThemeCSS]);
  
  // ============================================================================
  // Theme Persistence (localStorage)
  // ============================================================================
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const savedTheme = localStorage.getItem('network-theme');
      if (savedTheme && mode !== 'auto') {
        const parsedTheme = JSON.parse(savedTheme);
        if (parsedTheme.name && THEME_PRESETS[parsedTheme.name as ThemePreset]) {
          setPreset(parsedTheme.name as ThemePreset);
        } else {
          setCustomTheme(parsedTheme);
        }
      }
    } catch (error) {
      console.warn('[NetworkTheme] Failed to load saved theme:', error);
    }
  }, [mode, setPreset, setCustomTheme]);
  
  useEffect(() => {
    if (typeof window === 'undefined' || mode === 'auto') return;
    
    try {
      localStorage.setItem('network-theme', JSON.stringify(theme));
    } catch (error) {
      console.warn('[NetworkTheme] Failed to save theme:', error);
    }
  }, [theme, mode]);
  
  // ============================================================================
  // Accessibility: Announce theme changes
  // ============================================================================
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Announce theme changes to screen readers
    const announcement = `Theme changed to ${theme.name || 'custom theme'}`;
    
    // Create temporary announcement element
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.overflow = 'hidden';
    announcer.textContent = announcement;
    
    document.body.appendChild(announcer);
    
    // Clean up after announcement
    setTimeout(() => {
      if (document.body.contains(announcer)) {
        document.body.removeChild(announcer);
      }
    }, 1000);
  }, [theme.name]);
  
  // ============================================================================
  // Return Controls
  // ============================================================================
  
  return {
    currentTheme: theme,
    availablePresets: Object.keys(THEME_PRESETS) as ThemePreset[],
    setPreset,
    setCustomTheme,
    updateTheme,
    getThemeCSS,
    isDarkMode,
    toggleDarkMode
  };
}

// ============================================================================
// Utility Hook for Theme Colors
// ============================================================================

export function useThemeColors() {
  const { theme } = useNetworkContext();
  
  return {
    nodeColor: theme.nodeColor,
    edgeColor: theme.edgeColor,
    backgroundColor: theme.backgroundColor,
    highlightColor: theme.highlightColor || theme.nodeColor,
    textColor: theme.textColor || '#000000',
    isDark: isThemeDark(theme)
  };
}

// ============================================================================
// Hook for Theme-Aware Styling
// ============================================================================

export function useThemeAwareStyles() {
  const { theme } = useNetworkContext();
  const isDark = isThemeDark(theme);
  
  return {
    containerStyle: {
      backgroundColor: theme.backgroundColor,
      color: theme.textColor || (isDark ? '#ffffff' : '#000000')
    },
    nodeStyle: {
      fill: theme.nodeColor,
      filter: theme.shadows?.node ? `drop-shadow(${theme.shadows.node})` : undefined
    },
    edgeStyle: {
      stroke: theme.edgeColor,
      filter: theme.shadows?.edge ? `drop-shadow(${theme.shadows.edge})` : undefined
    },
    isDark
  };
}
