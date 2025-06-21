// NEOMINT Design System - Enhanced CSS Variable Detection
import {
  Activity, Flash, Computer, Phone, Cpu, HardDrive,
  ArrowUp, GraphUp, WarningTriangle, CheckCircle,
  Settings, Code, Package, Rocket, GitBranch, Page
} from 'iconoir-react';

export const icons = {
  // Performance & Analytics
  performance: Activity,
  optimization: Flash,
  desktop: Computer,
  mobile: Phone,
  cpu: Cpu,
  memory: HardDrive,
  
  // Data & Analytics
  analytics: GraphUp,
  trending: ArrowUp,
  warning: WarningTriangle,
  success: CheckCircle,
  
  // Development
  settings: Settings,
  code: Code,
  package: Package,
  rocket: Rocket,
  branch: GitBranch,
  documentation: Page
};

export const themeTokens = {
  // NEOMINT Brand Colors
  colors: {
    primary: '#00958F',      // NEOMINT Mint
    primaryDark: '#002B2B',  // NEOMINT Dark Green  
    background: '#FFFFFF',
    backgroundDark: '#1a1a1a',
    surface: '#f8f9fa',
    surfaceDark: '#2d2d2d',
    text: '#333333',
    textDark: '#ffffff',
    textMuted: '#666666',
    textMutedDark: '#a0a0a0',
    border: '#e1e5e9',
    borderDark: '#404040',
    // Icon Colors - context-aware
    iconLight: '#002B2B',    // Dark mint on light backgrounds
    iconDark: '#ffffff'      // White on dark backgrounds
  },
  
  // Animation Presets
  animations: {
    default: {
      nodeColor: '#ffffff',
      lineColor: 'rgba(255, 255, 255, 0.1)',
      backgroundColor: 'transparent',
      metadata: {
        industry: 'general',
        mood: 'neutral',
        primaryColor: '#ffffff',
        contrastRatio: 'high'
      }
    },
    neomintResearch: {
      nodeColor: '#00958F',
      lineColor: 'rgba(0, 149, 143, 0.2)',
      backgroundColor: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      metadata: {
        industry: 'research',
        mood: 'professional',
        primaryColor: '#00958F',
        contrastRatio: 'high'
      }
    },
    neomintDark: {
      nodeColor: '#00958F',
      lineColor: 'rgba(0, 149, 143, 0.3)',
      backgroundColor: '#1a1a1a',
      metadata: {
        industry: 'general',
        mood: 'sophisticated',
        primaryColor: '#00958F',
        contrastRatio: 'high'
      }
    },
    neomintMinimal: {
      nodeColor: '#002B2B',
      lineColor: 'rgba(0, 43, 43, 0.15)',
      backgroundColor: 'transparent',
      metadata: {
        industry: 'general',
        mood: 'minimalist',
        primaryColor: '#002B2B',
        contrastRatio: 'high'
      }
    },
    neomintHero: {
      nodeColor: '#ffffff',
      lineColor: 'rgba(255, 255, 255, 0.25)',
      backgroundColor: 'linear-gradient(135deg, #00958F 0%, #002B2B 100%)',
      metadata: {
        industry: 'general',
        mood: 'bold',
        primaryColor: '#ffffff',
        contrastRatio: 'high'
      }
    },
    accessibility: {
      nodeColor: '#00958F',
      lineColor: 'rgba(0, 149, 143, 0.4)',
      backgroundColor: 'transparent',
      // Special accessibility properties
      nodeCount: 15,
      animationSpeed: 0.2,
      connectionDistance: 80,
      metadata: {
        industry: 'general',
        mood: 'accessible',
        primaryColor: '#00958F',
        contrastRatio: 'wcag-aaa'
      }
    },
    dark: {
      nodeColor: '#00958F',
      lineColor: 'rgba(0, 149, 143, 0.3)',
      backgroundColor: '#1a1a1a',
      metadata: {
        industry: 'general',
        mood: 'dark',
        primaryColor: '#00958F',
        contrastRatio: 'high'
      }
    },
    // Industry-specific themes
    cybersecurity: {
      nodeColor: '#00d4ff',
      lineColor: 'rgba(0, 212, 255, 0.3)',
      backgroundColor: '#000000',
      metadata: {
        industry: 'cybersecurity',
        mood: 'high-tech',
        primaryColor: '#00d4ff',
        contrastRatio: 'high'
      }
    },
    aiResearch: {
      nodeColor: '#ff6b6b',
      lineColor: 'rgba(255, 107, 107, 0.25)',
      backgroundColor: 'linear-gradient(135deg, #4ecdc4 0%, #44a8b3 100%)',
      metadata: {
        industry: 'ai-research',
        mood: 'innovative',
        primaryColor: '#ff6b6b',
        contrastRatio: 'high'
      }
    },
    dataScience: {
      nodeColor: '#9c88ff',
      lineColor: 'rgba(156, 136, 255, 0.2)',
      backgroundColor: '#f0f0f0',
      metadata: {
        industry: 'data-science',
        mood: 'analytical',
        primaryColor: '#9c88ff',
        contrastRatio: 'high'
      }
    },
    fintech: {
      nodeColor: '#2ecc71',
      lineColor: 'rgba(46, 204, 113, 0.2)',
      backgroundColor: '#e8f4fd',
      metadata: {
        industry: 'fintech',
        mood: 'trustworthy',
        primaryColor: '#2ecc71',
        contrastRatio: 'high'
      }
    },
    healthcare: {
      nodeColor: '#3498db',
      lineColor: 'rgba(52, 152, 219, 0.15)',
      backgroundColor: '#ffffff',
      metadata: {
        industry: 'healthcare',
        mood: 'clean',
        primaryColor: '#3498db',
        contrastRatio: 'wcag-aaa'
      }
    },
    gaming: {
      nodeColor: '#e74c3c',
      lineColor: 'rgba(231, 76, 60, 0.35)',
      backgroundColor: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      metadata: {
        industry: 'gaming',
        mood: 'energetic',
        primaryColor: '#e74c3c',
        contrastRatio: 'high'
      }
    },
    // Performance tier presets
    desktopHeavy: {
      nodeColor: '#00958F',
      lineColor: 'rgba(0, 149, 143, 0.25)',
      backgroundColor: 'transparent',
      nodeCount: 100,
      animationSpeed: 0.8,
      connectionDistance: 160,
      metadata: {
        tier: 'high-performance',
        performanceLevel: 'heavy',
        targetDevice: 'desktop',
        resourceUsage: 'high',
        industry: 'general',
        mood: 'dynamic',
        primaryColor: '#00958F',
        contrastRatio: 'high'
      }
    },
    desktopStandard: {
      nodeColor: '#00958F',
      lineColor: 'rgba(0, 149, 143, 0.2)',
      backgroundColor: 'transparent',
      nodeCount: 60,
      animationSpeed: 0.5,
      connectionDistance: 120,
      metadata: {
        tier: 'standard',
        performanceLevel: 'balanced',
        targetDevice: 'desktop',
        resourceUsage: 'medium',
        industry: 'general',
        mood: 'professional',
        primaryColor: '#00958F',
        contrastRatio: 'high'
      }
    },
    mobileLight: {
      nodeColor: '#00958F',
      lineColor: 'rgba(0, 149, 143, 0.15)',
      backgroundColor: 'transparent',
      nodeCount: 25,
      animationSpeed: 0.3,
      connectionDistance: 80,
      metadata: {
        tier: 'optimized',
        performanceLevel: 'light',
        targetDevice: 'mobile',
        resourceUsage: 'low',
        industry: 'general',
        mood: 'subtle',
        primaryColor: '#00958F',
        contrastRatio: 'high'
      }
    },
    mobileMinimal: {
      nodeColor: '#00958F',
      lineColor: 'rgba(0, 149, 143, 0.1)',
      backgroundColor: 'transparent',
      nodeCount: 15,
      animationSpeed: 0.2,
      connectionDistance: 60,
      metadata: {
        tier: 'minimal',
        performanceLevel: 'ultra-light',
        targetDevice: 'mobile-low-end',
        resourceUsage: 'minimal',
        industry: 'general',
        mood: 'minimal',
        primaryColor: '#00958F',
        contrastRatio: 'high'
      }
    },
    accessibilitySafe: {
      nodeColor: '#00958F',
      lineColor: 'rgba(0, 149, 143, 0.4)',
      backgroundColor: 'transparent',
      nodeCount: 12,
      animationSpeed: 0.1,
      connectionDistance: 60,
      metadata: {
        tier: 'accessibility',
        performanceLevel: 'minimal-motion',
        targetDevice: 'all',
        resourceUsage: 'minimal',
        industry: 'general',
        mood: 'accessible',
        primaryColor: '#00958F',
        contrastRatio: 'wcag-aaa',
        canRenderStatic: true
      }
    },
    backgroundSubtle: {
      nodeColor: 'rgba(0, 149, 143, 0.6)',
      lineColor: 'rgba(0, 149, 143, 0.1)',
      backgroundColor: 'transparent',
      nodeCount: 30,
      animationSpeed: 0.2,
      connectionDistance: 100,
      metadata: {
        tier: 'decorative',
        performanceLevel: 'light',
        targetDevice: 'all',
        resourceUsage: 'low',
        industry: 'general',
        mood: 'subtle',
        primaryColor: '#00958F',
        contrastRatio: 'standard',
        opacity: 0.6
      }
    },
    presentationMode: {
      nodeColor: '#ffffff',
      lineColor: 'rgba(255, 255, 255, 0.3)',
      backgroundColor: 'linear-gradient(135deg, #00958F 0%, #002B2B 100%)',
      nodeCount: 80,
      animationSpeed: 0.4,
      connectionDistance: 140,
      metadata: {
        tier: 'presentation',
        performanceLevel: 'balanced',
        targetDevice: 'desktop',
        resourceUsage: 'medium-high',
        industry: 'general',
        mood: 'impactful',
        primaryColor: '#ffffff',
        contrastRatio: 'high',
        visualImpact: 'high'
      }
    }
  }
};

// CSS Variable Detection and Auto-Theme Generation
export const detectCSSVariables = () => {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  
  const cssVars = {
    // Primary colors
    primary: computedStyle.getPropertyValue('--color-primary').trim(),
    primaryRgb: computedStyle.getPropertyValue('--color-primary-rgb').trim(),
    secondary: computedStyle.getPropertyValue('--color-secondary').trim(),
    
    // Background colors
    background: computedStyle.getPropertyValue('--color-background').trim(),
    surface: computedStyle.getPropertyValue('--color-surface').trim(),
    
    // Text colors
    text: computedStyle.getPropertyValue('--color-text').trim(),
    textMuted: computedStyle.getPropertyValue('--color-text-muted').trim(),
    
    // Animation-specific variables
    nodeColor: computedStyle.getPropertyValue('--animation-node-color').trim(),
    lineColor: computedStyle.getPropertyValue('--animation-line-color').trim(),
    animationBg: computedStyle.getPropertyValue('--animation-background').trim(),
    
    // Theme indicators
    theme: computedStyle.getPropertyValue('--theme').trim(),
    colorScheme: computedStyle.getPropertyValue('color-scheme').trim()
  };
  
  // Filter out empty values
  const availableVars = Object.entries(cssVars)
    .filter(([key, value]) => value && value !== '')
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    
  return availableVars;
};

export const generateAutoTheme = (cssVars = {}) => {
  // If no CSS variables detected, return null (use preset)
  if (Object.keys(cssVars).length === 0) {
    return null;
  }
  
  // Build theme from available CSS variables
  const autoTheme = {};
  
  // Primary node color
  if (cssVars.nodeColor) {
    autoTheme.nodeColor = cssVars.nodeColor;
  } else if (cssVars.primary) {
    autoTheme.nodeColor = cssVars.primary;
  }
  
  // Line color with opacity
  if (cssVars.lineColor) {
    autoTheme.lineColor = cssVars.lineColor;
  } else if (cssVars.primaryRgb) {
    // Use RGB values for opacity
    autoTheme.lineColor = `rgba(${cssVars.primaryRgb}, 0.2)`;
  } else if (cssVars.primary) {
    // Convert hex to rgba if possible, fallback to preset
    autoTheme.lineColor = convertHexToRgba(cssVars.primary, 0.2) || 'rgba(0, 149, 143, 0.2)';
  }
  
  // Background
  if (cssVars.animationBg) {
    autoTheme.backgroundColor = cssVars.animationBg;
  } else if (cssVars.background) {
    autoTheme.backgroundColor = cssVars.background;
  }
  
  // Detect dark theme
  const isDarkTheme = cssVars.theme === 'dark' || 
                     cssVars.colorScheme === 'dark' ||
                     cssVars.background === '#1a1a1a' ||
                     cssVars.background === '#000000';
  
  // Auto-adjust for dark themes
  if (isDarkTheme && !cssVars.nodeColor) {
    autoTheme.nodeColor = themeTokens.colors.primary; // Mint green for dark backgrounds
  }
  
  return autoTheme;
};

// Utility function to convert hex to rgba
const convertHexToRgba = (hex, alpha) => {
  if (!hex || !hex.startsWith('#')) return null;
  
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Enhanced theme detection with CSS variable integration
export const detectThemeMode = () => {
  const cssVars = detectCSSVariables();
  
  // Check CSS variables first
  if (cssVars.theme) return cssVars.theme;
  if (cssVars.colorScheme === 'dark') return 'dark';
  
  // Check for dark background colors
  if (cssVars.background) {
    const bg = cssVars.background.toLowerCase();
    if (bg === '#1a1a1a' || bg === '#000000' || bg === 'black') return 'dark';
  }
  
  // Check system preference as fallback
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
};

// Create CSS variable listener for theme changes
export const createThemeListener = (callback) => {
  let currentVars = detectCSSVariables();
  
  const observer = new MutationObserver(() => {
    const newVars = detectCSSVariables();
    
    // Check if variables changed
    const hasChanged = JSON.stringify(currentVars) !== JSON.stringify(newVars);
    
    if (hasChanged) {
      currentVars = newVars;
      const autoTheme = generateAutoTheme(newVars);
      const themeMode = detectThemeMode();
      callback({ cssVars: newVars, autoTheme, themeMode });
    }
  });
  
  // Watch for attribute changes (class, style, data attributes)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'style', 'data-theme']
  });
  
  // Also listen to CSS custom property changes via style updates
  const styleObserver = new MutationObserver(() => {
    const newVars = detectCSSVariables();
    const hasChanged = JSON.stringify(currentVars) !== JSON.stringify(newVars);
    
    if (hasChanged) {
      currentVars = newVars;
      const autoTheme = generateAutoTheme(newVars);
      const themeMode = detectThemeMode();
      callback({ cssVars: newVars, autoTheme, themeMode });
    }
  });
  
  // Watch for style tag changes
  const head = document.head;
  if (head) {
    styleObserver.observe(head, {
      childList: true,
      subtree: true
    });
  }
  
  return () => {
    observer.disconnect();
    styleObserver.disconnect();
  };
};

export const applyCSSCustomProperties = (theme = 'light') => {
  const root = document.documentElement;
  const colors = themeTokens.colors;
  
  if (theme === 'dark') {
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-background', colors.backgroundDark);
    root.style.setProperty('--color-surface', colors.surfaceDark);
    root.style.setProperty('--color-text', colors.textDark);
    root.style.setProperty('--color-text-muted', colors.textMutedDark);
    root.style.setProperty('--color-border', colors.borderDark);
    root.style.setProperty('--color-icon', colors.iconDark); // White icons on dark
  } else {
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-surface', colors.surface);
    root.style.setProperty('--color-text', colors.text);
    root.style.setProperty('--color-text-muted', colors.textMuted);
    root.style.setProperty('--color-border', colors.border);
    root.style.setProperty('--color-icon', colors.iconLight); // Dark mint on light
  }
};

// Get icon color based on background context
export const getIconColor = (backgroundType = 'light') => {
  return backgroundType === 'dark' ? themeTokens.colors.iconDark : themeTokens.colors.iconLight;
};

export const getPresetConfig = (presetName) => {
  return themeTokens.animations[presetName] || themeTokens.animations.default;
};

// Enhanced preset resolver with auto-theme integration and validation
export const resolveThemeConfig = (preset = 'default', theme = 'auto', deviceCapabilities = null) => {
  // If deviceCapabilities provided and no preset specified, use optimal performance tier
  if (deviceCapabilities && (preset === 'default' || !preset)) {
    const optimalTier = getOptimalPerformanceTier(deviceCapabilities);
    preset = optimalTier;
  }

  // Handle auto theme
  if (theme === 'auto') {
    const cssVars = detectCSSVariables();
    const autoTheme = generateAutoTheme(cssVars);
    
    if (autoTheme && Object.keys(autoTheme).length > 0) {
      // Validate auto-generated theme
      if (validateTheme(autoTheme)) {
        return autoTheme;
      }
    }
    
    // Fallback to preset if no CSS variables
    return getPresetConfig(preset);
  }
  
  // Handle preset names
  if (typeof preset === 'string') {
    return getPresetConfig(preset);
  }
  
  // Handle custom theme objects
  if (typeof preset === 'object' && preset !== null) {
    // Validate custom theme
    if (validateTheme(preset)) {
      return preset;
    }
    console.warn('Invalid custom theme provided, falling back to default');
  }
  
  return getPresetConfig('default');
};

// Theme validation function
export const validateTheme = (theme) => {
  if (!theme || typeof theme !== 'object') {
    return false;
  }
  
  // Check required properties
  const requiredProps = ['nodeColor', 'lineColor', 'backgroundColor'];
  const hasRequiredProps = requiredProps.every(prop => prop in theme);
  
  if (!hasRequiredProps) {
    return false;
  }
  
  // Validate colors
  const isValidColor = (color) => {
    if (!color || typeof color !== 'string') return false;
    
    // Check for valid color formats
    const validFormats = [
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, // Hex
      /^rgb\(/, // RGB
      /^rgba\(/, // RGBA
      /^hsl\(/, // HSL
      /^hsla\(/, // HSLA
      /^transparent$/, // Transparent
      /^linear-gradient\(/, // Gradient
      /^radial-gradient\(/ // Radial gradient
    ];
    
    return validFormats.some(format => format.test(color));
  };
  
  // Validate each color property
  if (!isValidColor(theme.nodeColor)) {
    console.warn(`Invalid nodeColor: ${theme.nodeColor}`);
    return false;
  }
  
  if (!isValidColor(theme.lineColor)) {
    console.warn(`Invalid lineColor: ${theme.lineColor}`);
    return false;
  }
  
  if (!isValidColor(theme.backgroundColor)) {
    console.warn(`Invalid backgroundColor: ${theme.backgroundColor}`);
    return false;
  }
  
  return true;
};

// Get theme metadata
export const getThemeMetadata = (themeName) => {
  const theme = themeTokens.animations[themeName];
  if (!theme) {
    return null;
  }
  
  return theme.metadata || {
    industry: 'general',
    mood: 'neutral',
    primaryColor: theme.nodeColor,
    contrastRatio: 'standard'
  };
};

// Get all available themes
export const getAllThemes = () => {
  return Object.keys(themeTokens.animations).map(name => ({
    name,
    config: themeTokens.animations[name],
    metadata: getThemeMetadata(name)
  }));
};

// Get themes by industry
export const getThemesByIndustry = (industry) => {
  return getAllThemes().filter(theme =>
    theme.metadata && theme.metadata.industry === industry
  );
};

// Performance Tier Utilities

// Get performance tier categories mapping
export const getPerformanceTiers = () => {
  return {
    desktop: {
      heavy: 'desktopHeavy',
      standard: 'desktopStandard'
    },
    mobile: {
      light: 'mobileLight',
      minimal: 'mobileMinimal'
    },
    special: {
      accessibility: 'accessibilitySafe',
      background: 'backgroundSubtle',
      presentation: 'presentationMode'
    }
  };
};

// Determine optimal performance tier based on device capabilities and context
export const getOptimalPerformanceTier = (deviceCapabilities = {}, context = 'general') => {
  const {
    deviceType = 'desktop',
    gpu = 'standard',
    memory = 8,
    cores = 4,
    networkSpeed = 'fast',
    batteryLevel = 100,
    powerMode = 'balanced'
  } = deviceCapabilities;

  // Special contexts take priority
  if (context === 'presentation') {
    return 'presentationMode';
  }
  
  if (context === 'background' || context === 'decorative') {
    return 'backgroundSubtle';
  }
  
  if (context === 'accessibility' || deviceCapabilities.prefersReducedMotion) {
    return 'accessibilitySafe';
  }

  // Mobile device tiers
  if (deviceType === 'mobile' || deviceType === 'tablet') {
    // Low-end mobile conditions
    if (memory < 4 || cores < 4 || networkSpeed === 'slow' ||
        batteryLevel < 20 || powerMode === 'battery-saver') {
      return 'mobileMinimal';
    }
    return 'mobileLight';
  }

  // Desktop tiers
  if (deviceType === 'desktop') {
    // High-performance conditions
    if (gpu === 'dedicated' && memory >= 16 && cores >= 8 &&
        networkSpeed === 'fast' && powerMode !== 'battery-saver') {
      return 'desktopHeavy';
    }
    return 'desktopStandard';
  }

  // Default fallback
  return 'desktopStandard';
};

// Get performance recommendations based on device capabilities
export const getPerformanceRecommendations = (deviceCapabilities = {}) => {
  const optimalTier = getOptimalPerformanceTier(deviceCapabilities);
  const tierConfig = themeTokens.animations[optimalTier];
  
  const recommendations = {
    recommendedTheme: optimalTier,
    themeConfig: tierConfig,
    alternatives: [],
    warnings: [],
    optimizations: []
  };

  // Add alternatives based on device type
  if (deviceCapabilities.deviceType === 'mobile') {
    recommendations.alternatives = ['mobileLight', 'mobileMinimal', 'accessibilitySafe'];
    
    if (deviceCapabilities.batteryLevel < 20) {
      recommendations.warnings.push('Low battery detected. Consider using minimal performance tier.');
    }
    
    if (deviceCapabilities.memory < 4) {
      recommendations.warnings.push('Limited memory available. Performance may be affected.');
      recommendations.optimizations.push('Reduce node count or use static rendering.');
    }
  } else {
    recommendations.alternatives = ['desktopStandard', 'desktopHeavy', 'presentationMode'];
    
    if (deviceCapabilities.gpu === 'integrated') {
      recommendations.optimizations.push('Consider reducing animation speed for smoother performance.');
    }
  }

  // Network-based recommendations
  if (deviceCapabilities.networkSpeed === 'slow') {
    recommendations.optimizations.push('Use reduced animation complexity for better performance.');
  }

  // Accessibility recommendations
  if (deviceCapabilities.prefersReducedMotion) {
    recommendations.warnings.push('User prefers reduced motion. Using accessibility-safe animations.');
    recommendations.alternatives = ['accessibilitySafe', 'backgroundSubtle'];
  }

  return recommendations;
};

// Calculate performance impact of a theme configuration
export const calculatePerformanceImpact = (theme) => {
  if (!theme) return null;

  // Base impact scores
  let cpuImpact = 0;
  let gpuImpact = 0;
  let memoryImpact = 0;
  let batteryImpact = 0;

  // Get theme config (handle both string names and objects)
  const themeConfig = typeof theme === 'string'
    ? themeTokens.animations[theme]
    : theme;

  if (!themeConfig) return null;

  // Calculate impact based on node count
  const nodeCount = themeConfig.nodeCount || 50;
  cpuImpact += nodeCount * 0.5;
  memoryImpact += nodeCount * 0.3;
  batteryImpact += nodeCount * 0.2;

  // Calculate impact based on animation speed
  const animationSpeed = themeConfig.animationSpeed || 0.5;
  cpuImpact += animationSpeed * 20;
  gpuImpact += animationSpeed * 30;
  batteryImpact += animationSpeed * 15;

  // Calculate impact based on connection distance
  const connectionDistance = themeConfig.connectionDistance || 100;
  cpuImpact += (connectionDistance / 100) * 10;
  gpuImpact += (connectionDistance / 100) * 5;

  // Background complexity impact
  if (themeConfig.backgroundColor && themeConfig.backgroundColor.includes('gradient')) {
    gpuImpact += 15;
    batteryImpact += 10;
  }

  // Line opacity impact
  const lineOpacity = themeConfig.lineColor ?
    parseFloat(themeConfig.lineColor.match(/[\d.]+(?=\))/)?.[0] || 0.2) : 0.2;
  gpuImpact += (1 - lineOpacity) * 5;

  // Normalize scores to 0-100 scale
  const normalize = (value) => Math.min(100, Math.max(0, value));

  const impact = {
    overall: normalize((cpuImpact + gpuImpact + memoryImpact + batteryImpact) / 4),
    cpu: normalize(cpuImpact),
    gpu: normalize(gpuImpact),
    memory: normalize(memoryImpact),
    battery: normalize(batteryImpact),
    
    // Performance characteristics
    characteristics: {
      nodeCount,
      animationSpeed,
      connectionDistance,
      hasGradientBackground: themeConfig.backgroundColor?.includes('gradient') || false,
      lineOpacity,
      
      // Performance tier info
      tier: themeConfig.metadata?.tier || 'standard',
      performanceLevel: themeConfig.metadata?.performanceLevel || 'balanced',
      resourceUsage: themeConfig.metadata?.resourceUsage || 'medium'
    }
  };

  // Add performance level classification
  if (impact.overall < 20) {
    impact.level = 'minimal';
  } else if (impact.overall < 40) {
    impact.level = 'light';
  } else if (impact.overall < 60) {
    impact.level = 'moderate';
  } else if (impact.overall < 80) {
    impact.level = 'heavy';
  } else {
    impact.level = 'intensive';
  }

  return impact;
};