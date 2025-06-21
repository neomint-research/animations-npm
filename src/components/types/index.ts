/**
 * @neomint/animations - TypeScript Type Definitions
 * 
 * Comprehensive type definitions for all modern components and utilities.
 * These types provide full type safety and excellent developer experience.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import { ReactNode, CSSProperties, RefObject } from 'react';

// ============================================================================
// Core Network Types
// ============================================================================

export interface NetworkNodeData {
  id: string;
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  radius?: number;
  color?: string;
  label?: string;
  data?: Record<string, any>;
}

export interface NetworkEdgeData {
  id: string;
  source: string;
  target: string;
  weight?: number;
  color?: string;
  width?: number;
  data?: Record<string, any>;
}

export interface NetworkDimensions {
  width: number;
  height: number;
  devicePixelRatio?: number;
}

// ============================================================================
// Theme System Types
// ============================================================================

export interface NetworkTheme {
  name: string;
  nodeColor: string;
  edgeColor: string;
  backgroundColor: string;
  highlightColor?: string;
  textColor?: string;
  opacity?: number;
  gradients?: {
    primary?: string;
    secondary?: string;
  };
  shadows?: {
    node?: string;
    edge?: string;
  };
}

export type ThemePreset = 
  | 'default'
  | 'dark'
  | 'light'
  | 'neomintResearch'
  | 'neomintDark'
  | 'neomintMinimal'
  | 'cyberpunk'
  | 'organic'
  | 'corporate';

export type ThemeMode = 'light' | 'dark' | 'auto';

// ============================================================================
// Performance Types
// ============================================================================

export interface NetworkPerformanceConfig {
  maxFPS?: number;
  enableGPUAcceleration?: boolean;
  adaptiveQuality?: boolean;
  performanceTier?: 'low' | 'medium' | 'high' | 'auto';
  maxNodes?: number;
  maxEdges?: number;
  enableProfiling?: boolean;
}

export interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  nodeCount: number;
  edgeCount: number;
  memoryUsage?: number;
  gpuMemoryUsage?: number;
}

export interface DeviceCapabilities {
  isHighPerformance: boolean;
  isMobile: boolean;
  supportsGPU: boolean;
  maxTextureSize: number;
  cores: number;
  memory: number;
}

// ============================================================================
// Accessibility Types
// ============================================================================

export interface NetworkAccessibilityConfig {
  respectMotion?: boolean;
  enableKeyboardNavigation?: boolean;
  enableScreenReader?: boolean;
  highContrast?: boolean;
  reducedMotion?: boolean;
  focusIndicators?: boolean;
  ariaLabels?: {
    network?: string;
    node?: string;
    edge?: string;
  };
}

export interface MotionPreferences {
  prefersReducedMotion: boolean;
  respectMotion: boolean;
  animationDuration: number;
}

// ============================================================================
// Animation Types
// ============================================================================

export interface NetworkAnimationConfig {
  enabled?: boolean;
  duration?: number;
  easing?: string;
  autoPlay?: boolean;
  pauseOnHover?: boolean;
  speed?: number;
  nodeAnimation?: {
    enabled?: boolean;
    type?: 'float' | 'pulse' | 'rotate' | 'none';
    speed?: number;
  };
  edgeAnimation?: {
    enabled?: boolean;
    type?: 'flow' | 'pulse' | 'none';
    speed?: number;
  };
}

// ============================================================================
// Interaction Types
// ============================================================================

export interface NetworkInteractionConfig {
  enabled?: boolean;
  hover?: boolean;
  click?: boolean;
  drag?: boolean;
  zoom?: boolean;
  pan?: boolean;
  select?: boolean;
}

export interface NetworkInteractionState {
  hoveredNode?: string;
  selectedNodes: string[];
  hoveredEdge?: string;
  selectedEdges: string[];
  isDragging: boolean;
  isZooming: boolean;
  isPanning: boolean;
}

// ============================================================================
// Event Types
// ============================================================================

export interface NetworkEventHandlers {
  onNodeClick?: (node: NetworkNodeData, event: MouseEvent) => void;
  onNodeHover?: (node: NetworkNodeData | null, event: MouseEvent) => void;
  onEdgeClick?: (edge: NetworkEdgeData, event: MouseEvent) => void;
  onEdgeHover?: (edge: NetworkEdgeData | null, event: MouseEvent) => void;
  onCanvasClick?: (event: MouseEvent) => void;
  onPerformanceChange?: (metrics: PerformanceMetrics) => void;
  onThemeChange?: (theme: NetworkTheme) => void;
  onAnimationComplete?: (cycle: number) => void;
  onError?: (error: Error) => void;
}

// ============================================================================
// Main Component Props
// ============================================================================

export interface NetworkProps extends NetworkEventHandlers {
  // Data
  nodes?: NetworkNodeData[];
  edges?: NetworkEdgeData[];
  
  // Dimensions
  width?: number | string;
  height?: number | string;
  
  // Styling
  className?: string;
  style?: CSSProperties;
  
  // Theme
  theme?: ThemePreset | NetworkTheme;
  themeMode?: ThemeMode;
  
  // Performance
  performance?: NetworkPerformanceConfig;
  
  // Accessibility
  accessibility?: NetworkAccessibilityConfig;
  
  // Animation
  animation?: NetworkAnimationConfig;
  
  // Interaction
  interaction?: NetworkInteractionConfig;
  
  // Advanced
  children?: ReactNode;
  ref?: RefObject<HTMLCanvasElement>;
  debug?: boolean;
  
  // Legacy compatibility
  preset?: ThemePreset;
  nodeCount?: number;
  animationSpeed?: number;
  connectionDistance?: number;
  nodeRadius?: number | { min: number; max: number };
  lineWidth?: number;
  nodeColor?: string;
  lineColor?: string;
  backgroundColor?: string;
  opacity?: number;
}

// ============================================================================
// Context Types
// ============================================================================

export interface NetworkContextValue {
  nodes: NetworkNodeData[];
  edges: NetworkEdgeData[];
  dimensions: NetworkDimensions;
  theme: NetworkTheme;
  performance: NetworkPerformanceConfig;
  accessibility: NetworkAccessibilityConfig;
  animation: NetworkAnimationConfig;
  interaction: NetworkInteractionConfig;
  interactionState: NetworkInteractionState;
  metrics: PerformanceMetrics;
  
  // Actions
  updateNodes: (nodes: NetworkNodeData[]) => void;
  updateEdges: (edges: NetworkEdgeData[]) => void;
  updateDimensions: (dimensions: NetworkDimensions) => void;
  updateTheme: (theme: NetworkTheme | ThemePreset) => void;
  updatePerformance: (config: Partial<NetworkPerformanceConfig>) => void;
  updateAccessibility: (config: Partial<NetworkAccessibilityConfig>) => void;
  updateAnimation: (config: Partial<NetworkAnimationConfig>) => void;
  updateInteraction: (config: Partial<NetworkInteractionConfig>) => void;
  updateMetrics: (metrics: PerformanceMetrics) => void;
}

// ============================================================================
// Utility Types
// ============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
