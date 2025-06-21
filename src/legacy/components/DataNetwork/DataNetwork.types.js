import PropTypes from 'prop-types';

/**
 * DataNetwork Component Prop Types
 * Comprehensive prop definitions for the NEOMINT DataNetwork animation component
 */

// Context types for different use cases
export const DataNetworkContextTypes = {
  GENERAL: 'general',
  PRESENTATION: 'presentation',
  BACKGROUND: 'background',
  HERO: 'hero',
  DECORATIVE: 'decorative',
  DASHBOARD: 'dashboard',
  LOADING: 'loading'
};

// Performance tier types
export const DataNetworkPerformanceTiers = {
  AUTO: 'auto',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  MINIMAL: 'minimal'
};

// Accessibility modes
export const DataNetworkAccessibilityModes = {
  RESPECT_MOTION: 'respect-motion',
  DISABLE: 'disable',
  FORCE_STATIC: 'force-static',
  CUSTOM: 'custom'
};

export const DataNetworkPropTypes = {
  // ============ Dimensions & Layout ============
  /**
   * Width of the animation container
   * @type {string|number}
   * @default '100%'
   */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  
  /**
   * Height of the animation container
   * @type {string|number}
   * @default '35vh'
   */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  
  /**
   * Additional CSS class names
   * @type {string}
   */
  className: PropTypes.string,
  
  /**
   * Inline styles for the container
   * @type {object}
   */
  style: PropTypes.object,

  // ============ Animation Properties ============
  /**
   * Number of nodes in the network
   * @type {number}
   * @default Smart default based on device/context
   */
  nodeCount: PropTypes.number,
  
  /**
   * Animation speed multiplier
   * @type {number}
   * @default Smart default based on device/context (0.1-1.0)
   */
  animationSpeed: PropTypes.number,
  
  /**
   * Maximum distance for node connections
   * @type {number}
   * @default Smart default based on device/context
   */
  connectionDistance: PropTypes.number,
  
  /**
   * Node radius range
   * @type {object}
   * @default { min: 1, max: 3 }
   */
  nodeRadius: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  }),
  
  /**
   * Line width for connections
   * @type {number}
   * @default 1
   */
  lineWidth: PropTypes.number,

  // ============ Visual Properties ============
  /**
   * Color of the nodes
   * @type {string}
   * @default Theme-based or '#ffffff'
   */
  nodeColor: PropTypes.string,
  
  /**
   * Color of the connection lines
   * @type {string}
   * @default Theme-based or 'rgba(255, 255, 255, 0.1)'
   */
  lineColor: PropTypes.string,
  
  /**
   * Background color or gradient
   * @type {string}
   * @default 'transparent'
   */
  backgroundColor: PropTypes.string,
  
  /**
   * Global opacity for the animation
   * @type {number}
   * @default 1
   */
  opacity: PropTypes.number,

  // ============ Theme System ============
  /**
   * Preset theme name
   * @type {string}
   * @default 'default'
   */
  preset: PropTypes.string,
  
  /**
   * Theme configuration
   * @type {string|object}
   * @default 'auto'
   */
  theme: PropTypes.oneOfType([
    PropTypes.oneOf(['auto', 'light', 'dark']),
    PropTypes.shape({
      nodeColor: PropTypes.string,
      lineColor: PropTypes.string,
      backgroundColor: PropTypes.string
    })
  ]),
  
  /**
   * Performance tier override
   * @type {string}
   */
  performanceTier: PropTypes.oneOf(Object.values(DataNetworkPerformanceTiers)),

  // ============ Performance & Optimization ============
  /**
   * Performance mode
   * @type {string}
   * @default 'auto'
   */
  performance: PropTypes.oneOf(['auto', 'manual']),
  
  /**
   * Enable performance analytics
   * @type {boolean}
   * @default false
   */
  analytics: PropTypes.bool,
  
  /**
   * Maximum frames per second
   * @type {number}
   * @default 60
   */
  maxFPS: PropTypes.number,
  
  /**
   * Enable GPU acceleration
   * @type {boolean}
   * @default true
   */
  enableGPUAcceleration: PropTypes.bool,

  // ============ Accessibility ============
  /**
   * Accessibility mode
   * @type {string}
   * @default 'respect-motion'
   */
  accessibility: PropTypes.oneOf(Object.values(DataNetworkAccessibilityModes)),
  
  /**
   * Aria label for screen readers
   * @type {string}
   * @default 'Animated network visualization'
   */
  ariaLabel: PropTypes.string,
  
  /**
   * Force static rendering
   * @type {boolean}
   * @default false
   */
  staticMode: PropTypes.bool,
  
  /**
   * Reduced motion override
   * @type {boolean}
   */
  reducedMotion: PropTypes.bool,

  // ============ Context & Behavior ============
  /**
   * Usage context for smart defaults
   * @type {string}
   * @default 'general'
   */
  context: PropTypes.oneOf(Object.values(DataNetworkContextTypes)),
  
  /**
   * Enable interactive features
   * @type {boolean}
   * @default false
   */
  interactive: PropTypes.bool,
  
  /**
   * Pause animation on hover
   * @type {boolean}
   * @default false
   */
  pauseOnHover: PropTypes.bool,
  
  /**
   * Auto-play animation on mount
   * @type {boolean}
   * @default true
   */
  autoPlay: PropTypes.bool,

  // ============ Event Handlers ============
  /**
   * Called when performance level changes
   * @type {function}
   */
  onPerformanceChange: PropTypes.func,
  
  /**
   * Called when theme changes
   * @type {function}
   */
  onThemeChange: PropTypes.func,
  
  /**
   * Called when animation completes a cycle
   * @type {function}
   */
  onAnimationComplete: PropTypes.func,
  
  /**
   * Called on errors
   * @type {function}
   */
  onError: PropTypes.func,

  // ============ Development & Debug ============
  /**
   * Enable debug mode
   * @type {boolean}
   * @default false
   */
  debug: PropTypes.bool,
  
  /**
   * Show performance statistics
   * @type {boolean}
   * @default false
   */
  showStats: PropTypes.bool,
  
  /**
   * Validate props in development
   * @type {boolean}
   * @default process.env.NODE_ENV === 'development'
   */
  validateProps: PropTypes.bool
};

// Default prop values
export const DataNetworkDefaultProps = {
  width: '100%',
  height: '35vh',
  className: '',
  style: {},
  nodeRadius: { min: 1, max: 3 },
  lineWidth: 1,
  backgroundColor: 'transparent',
  opacity: 1,
  preset: 'default',
  theme: 'auto',
  performance: 'auto',
  analytics: false,
  maxFPS: 60,
  enableGPUAcceleration: true,
  accessibility: 'respect-motion',
  ariaLabel: 'Animated network visualization',
  staticMode: false,
  context: 'general',
  interactive: false,
  pauseOnHover: false,
  autoPlay: true,
  debug: false,
  showStats: false,
  validateProps: process.env.NODE_ENV === 'development'
};

// Smart defaults configuration based on context
export const contextDefaults = {
  [DataNetworkContextTypes.GENERAL]: {
    nodeCount: 50,
    animationSpeed: 0.5,
    connectionDistance: 120
  },
  [DataNetworkContextTypes.PRESENTATION]: {
    nodeCount: 80,
    animationSpeed: 0.4,
    connectionDistance: 140,
    preset: 'presentationMode'
  },
  [DataNetworkContextTypes.BACKGROUND]: {
    nodeCount: 30,
    animationSpeed: 0.2,
    connectionDistance: 100,
    preset: 'backgroundSubtle'
  },
  [DataNetworkContextTypes.HERO]: {
    nodeCount: 100,
    animationSpeed: 0.6,
    connectionDistance: 160,
    preset: 'neomintHero'
  },
  [DataNetworkContextTypes.DECORATIVE]: {
    nodeCount: 25,
    animationSpeed: 0.15,
    connectionDistance: 80,
    opacity: 0.6
  },
  [DataNetworkContextTypes.DASHBOARD]: {
    nodeCount: 40,
    animationSpeed: 0.3,
    connectionDistance: 100,
    preset: 'neomintMinimal'
  },
  [DataNetworkContextTypes.LOADING]: {
    nodeCount: 20,
    animationSpeed: 0.8,
    connectionDistance: 60
  }
};

// Performance tier defaults
export const performanceDefaults = {
  [DataNetworkPerformanceTiers.HIGH]: {
    nodeCount: 100,
    animationSpeed: 0.8,
    connectionDistance: 160,
    maxFPS: 60,
    enableGPUAcceleration: true
  },
  [DataNetworkPerformanceTiers.MEDIUM]: {
    nodeCount: 50,
    animationSpeed: 0.5,
    connectionDistance: 120,
    maxFPS: 30,
    enableGPUAcceleration: true
  },
  [DataNetworkPerformanceTiers.LOW]: {
    nodeCount: 30,
    animationSpeed: 0.3,
    connectionDistance: 80,
    maxFPS: 24,
    enableGPUAcceleration: false
  },
  [DataNetworkPerformanceTiers.MINIMAL]: {
    nodeCount: 15,
    animationSpeed: 0.1,
    connectionDistance: 60,
    maxFPS: 15,
    enableGPUAcceleration: false
  }
};

// Export prop validation helper
export const validateDataNetworkProps = (props) => {
  const errors = [];
  const warnings = [];

  // Validate numeric ranges
  if (props.nodeCount !== undefined && (props.nodeCount < 1 || props.nodeCount > 500)) {
    warnings.push(`nodeCount should be between 1 and 500, got ${props.nodeCount}`);
  }

  if (props.animationSpeed !== undefined && (props.animationSpeed < 0 || props.animationSpeed > 2)) {
    warnings.push(`animationSpeed should be between 0 and 2, got ${props.animationSpeed}`);
  }

  if (props.maxFPS !== undefined && (props.maxFPS < 1 || props.maxFPS > 120)) {
    warnings.push(`maxFPS should be between 1 and 120, got ${props.maxFPS}`);
  }

  if (props.opacity !== undefined && (props.opacity < 0 || props.opacity > 1)) {
    errors.push(`opacity must be between 0 and 1, got ${props.opacity}`);
  }

  // Validate color formats
  const colorProps = ['nodeColor', 'lineColor', 'backgroundColor'];
  colorProps.forEach(prop => {
    if (props[prop] && typeof props[prop] === 'string') {
      const isValidColor = /^(#|rgb|rgba|hsl|hsla|transparent|linear-gradient|radial-gradient)/.test(props[prop]);
      if (!isValidColor) {
        warnings.push(`${prop} appears to be an invalid color format: ${props[prop]}`);
      }
    }
  });

  // Validate event handlers
  const eventHandlers = ['onPerformanceChange', 'onThemeChange', 'onAnimationComplete', 'onError'];
  eventHandlers.forEach(handler => {
    if (props[handler] && typeof props[handler] !== 'function') {
      errors.push(`${handler} must be a function, got ${typeof props[handler]}`);
    }
  });

  return { errors, warnings };
};