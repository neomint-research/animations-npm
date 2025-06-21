/**
 * @neomint/animations - Constants and Default Values
 * 
 * Centralized constants for the modern component system.
 * These provide sensible defaults and configuration options.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import { 
  NetworkTheme, 
  NetworkPerformanceConfig, 
  NetworkAccessibilityConfig,
  NetworkAnimationConfig,
  NetworkInteractionConfig,
  ThemePreset 
} from '../types';

// ============================================================================
// Default Network Configuration
// ============================================================================

export const NETWORK_DEFAULTS = {
  width: 800,
  height: 600,
  nodeCount: 50,
  animationSpeed: 0.5,
  connectionDistance: 120,
  nodeRadius: { min: 2, max: 8 },
  lineWidth: 1,
  opacity: 1,
  maxFPS: 60,
  autoPlay: true,
  pauseOnHover: false,
  enableGPUAcceleration: true,
  debug: false
} as const;

// ============================================================================
// Performance Tier Configurations
// ============================================================================

export const PERFORMANCE_TIERS = {
  low: {
    maxFPS: 30,
    enableGPUAcceleration: false,
    adaptiveQuality: true,
    maxNodes: 30,
    maxEdges: 50,
    enableProfiling: false
  },
  medium: {
    maxFPS: 45,
    enableGPUAcceleration: true,
    adaptiveQuality: true,
    maxNodes: 60,
    maxEdges: 100,
    enableProfiling: false
  },
  high: {
    maxFPS: 60,
    enableGPUAcceleration: true,
    adaptiveQuality: false,
    maxNodes: 100,
    maxEdges: 200,
    enableProfiling: true
  },
  auto: {
    maxFPS: 60,
    enableGPUAcceleration: true,
    adaptiveQuality: true,
    maxNodes: 0, // Will be determined by device capabilities
    maxEdges: 0, // Will be determined by device capabilities
    enableProfiling: false
  }
} as const satisfies Record<string, NetworkPerformanceConfig>;

// ============================================================================
// Theme Presets
// ============================================================================

export const THEME_PRESETS: Record<ThemePreset, NetworkTheme> = {
  default: {
    name: 'Default',
    nodeColor: '#3498db',
    edgeColor: 'rgba(149, 165, 166, 0.3)',
    backgroundColor: '#ffffff',
    highlightColor: '#e74c3c',
    textColor: '#2c3e50',
    opacity: 1,
    gradients: {
      primary: 'linear-gradient(135deg, #3498db, #2980b9)',
      secondary: 'linear-gradient(135deg, #95a5a6, #7f8c8d)'
    },
    shadows: {
      node: '0 2px 4px rgba(0,0,0,0.1)',
      edge: 'none'
    }
  },
  
  dark: {
    name: 'Dark',
    nodeColor: '#e74c3c',
    edgeColor: 'rgba(189, 195, 199, 0.3)',
    backgroundColor: '#2c3e50',
    highlightColor: '#f39c12',
    textColor: '#ecf0f1',
    opacity: 1,
    gradients: {
      primary: 'linear-gradient(135deg, #e74c3c, #c0392b)',
      secondary: 'linear-gradient(135deg, #bdc3c7, #95a5a6)'
    },
    shadows: {
      node: '0 2px 8px rgba(0,0,0,0.3)',
      edge: 'none'
    }
  },
  
  light: {
    name: 'Light',
    nodeColor: '#2980b9',
    edgeColor: 'rgba(52, 152, 219, 0.2)',
    backgroundColor: '#f8f9fa',
    highlightColor: '#e67e22',
    textColor: '#2c3e50',
    opacity: 1,
    gradients: {
      primary: 'linear-gradient(135deg, #2980b9, #3498db)',
      secondary: 'linear-gradient(135deg, #ecf0f1, #bdc3c7)'
    },
    shadows: {
      node: '0 1px 3px rgba(0,0,0,0.1)',
      edge: 'none'
    }
  },
  
  neomintResearch: {
    name: 'NEOMINT Research',
    nodeColor: '#00d4ff',
    edgeColor: 'rgba(0, 212, 255, 0.2)',
    backgroundColor: '#0a0e1a',
    highlightColor: '#ff6b6b',
    textColor: '#ffffff',
    opacity: 1,
    gradients: {
      primary: 'linear-gradient(135deg, #00d4ff, #0099cc)',
      secondary: 'linear-gradient(135deg, #1a1a2e, #16213e)'
    },
    shadows: {
      node: '0 0 10px rgba(0, 212, 255, 0.3)',
      edge: 'none'
    }
  },
  
  neomintDark: {
    name: 'NEOMINT Dark',
    nodeColor: '#4ecdc4',
    edgeColor: 'rgba(78, 205, 196, 0.25)',
    backgroundColor: '#1a1a2e',
    highlightColor: '#ff6b6b',
    textColor: '#eee',
    opacity: 1,
    gradients: {
      primary: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
      secondary: 'linear-gradient(135deg, #16213e, #0f3460)'
    },
    shadows: {
      node: '0 0 8px rgba(78, 205, 196, 0.2)',
      edge: 'none'
    }
  },
  
  neomintMinimal: {
    name: 'NEOMINT Minimal',
    nodeColor: '#6c5ce7',
    edgeColor: 'rgba(108, 92, 231, 0.15)',
    backgroundColor: '#ffffff',
    highlightColor: '#fd79a8',
    textColor: '#2d3436',
    opacity: 1,
    gradients: {
      primary: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
      secondary: 'linear-gradient(135deg, #ddd, #b2bec3)'
    },
    shadows: {
      node: '0 2px 4px rgba(108, 92, 231, 0.1)',
      edge: 'none'
    }
  },
  
  cyberpunk: {
    name: 'Cyberpunk',
    nodeColor: '#ff0080',
    edgeColor: 'rgba(0, 255, 255, 0.3)',
    backgroundColor: '#000011',
    highlightColor: '#00ff41',
    textColor: '#00ffff',
    opacity: 1,
    gradients: {
      primary: 'linear-gradient(135deg, #ff0080, #ff4081)',
      secondary: 'linear-gradient(135deg, #00ffff, #0080ff)'
    },
    shadows: {
      node: '0 0 15px rgba(255, 0, 128, 0.5)',
      edge: '0 0 5px rgba(0, 255, 255, 0.3)'
    }
  },
  
  organic: {
    name: 'Organic',
    nodeColor: '#27ae60',
    edgeColor: 'rgba(39, 174, 96, 0.2)',
    backgroundColor: '#f1f2f6',
    highlightColor: '#e67e22',
    textColor: '#2f3542',
    opacity: 1,
    gradients: {
      primary: 'linear-gradient(135deg, #27ae60, #2ecc71)',
      secondary: 'linear-gradient(135deg, #a4b0be, #747d8c)'
    },
    shadows: {
      node: '0 2px 6px rgba(39, 174, 96, 0.2)',
      edge: 'none'
    }
  },
  
  corporate: {
    name: 'Corporate',
    nodeColor: '#34495e',
    edgeColor: 'rgba(52, 73, 94, 0.25)',
    backgroundColor: '#ffffff',
    highlightColor: '#3498db',
    textColor: '#2c3e50',
    opacity: 1,
    gradients: {
      primary: 'linear-gradient(135deg, #34495e, #2c3e50)',
      secondary: 'linear-gradient(135deg, #bdc3c7, #95a5a6)'
    },
    shadows: {
      node: '0 1px 3px rgba(0,0,0,0.12)',
      edge: 'none'
    }
  }
};

// ============================================================================
// Default Configurations
// ============================================================================

export const DEFAULT_PERFORMANCE_CONFIG: NetworkPerformanceConfig = {
  maxFPS: 60,
  enableGPUAcceleration: true,
  adaptiveQuality: true,
  performanceTier: 'auto',
  maxNodes: 100,
  maxEdges: 200,
  enableProfiling: false
};

export const DEFAULT_ACCESSIBILITY_CONFIG: NetworkAccessibilityConfig = {
  respectMotion: true,
  enableKeyboardNavigation: true,
  enableScreenReader: true,
  highContrast: false,
  reducedMotion: false,
  focusIndicators: true,
  ariaLabels: {
    network: 'Interactive network visualization',
    node: 'Network node',
    edge: 'Network connection'
  }
};

export const DEFAULT_ANIMATION_CONFIG: NetworkAnimationConfig = {
  enabled: true,
  duration: 1000,
  easing: 'ease-out',
  autoPlay: true,
  pauseOnHover: false,
  speed: 1,
  nodeAnimation: {
    enabled: true,
    type: 'float',
    speed: 0.5
  },
  edgeAnimation: {
    enabled: true,
    type: 'flow',
    speed: 0.3
  }
};

export const DEFAULT_INTERACTION_CONFIG: NetworkInteractionConfig = {
  enabled: true,
  hover: true,
  click: true,
  drag: false,
  zoom: true,
  pan: true,
  select: true
};

// ============================================================================
// Animation Easing Functions
// ============================================================================

export const EASING_FUNCTIONS = {
  linear: 'linear',
  ease: 'ease',
  'ease-in': 'ease-in',
  'ease-out': 'ease-out',
  'ease-in-out': 'ease-in-out',
  'cubic-bezier': 'cubic-bezier(0.4, 0, 0.2, 1)'
} as const;

// ============================================================================
// Device Detection Thresholds
// ============================================================================

export const DEVICE_THRESHOLDS = {
  mobile: {
    maxWidth: 768,
    maxTouchPoints: 1
  },
  tablet: {
    maxWidth: 1024,
    minWidth: 769
  },
  desktop: {
    minWidth: 1025
  },
  highPerformance: {
    minCores: 4,
    minMemory: 8, // GB
    minGPUMemory: 2 // GB
  }
} as const;

// ============================================================================
// Performance Constants
// ============================================================================

export const PERFORMANCE_CONSTANTS = {
  // FPS and Animation
  DEFAULT_MAX_FPS: 60,
  FPS_THRESHOLD_RATIO: 0.7,
  OPTIMIZATION_COOLDOWN_MS: 5000,
  TARGET_FRAME_TIME_60FPS: 1000 / 60,

  // Memory Monitoring
  MEMORY_CHECK_INTERVAL_MS: 10000,
  MEMORY_WARNING_THRESHOLD: 0.8, // 80% of heap limit

  // Performance History
  MAX_PERFORMANCE_HISTORY: 60, // Keep 60 frames of history

  // Animation Cycles
  ANIMATION_CYCLE_FRAMES: 60 * 5, // 5 seconds at 60fps

  // Connection and Rendering
  DEFAULT_CONNECTION_DISTANCE: 120,
  DEFAULT_OPACITY: 1.0,
  CONNECTION_OPACITY_FACTOR: 0.3,
  DEFAULT_LINE_WIDTH: 1,
  DEFAULT_NODE_RADIUS: 4,

  // Rate Limiting
  THEME_DETECTION_RATE_LIMIT_MS: 100,
  MUTATION_OBSERVER_DEBOUNCE_MS: 50
} as const;
