/**
 * @neomint/animations - TypeScript Declarations
 * 
 * TypeScript type definitions for the @neomint/animations library.
 * Provides full type safety for both legacy and modern components.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

// ============================================================================
// Re-export all types from components
// ============================================================================

export * from './components/types';
export * from './components/constants';

// ============================================================================
// Legacy Component Types
// ============================================================================

import { ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react';
import { 
  NetworkProps, 
  NetworkNodeData, 
  NetworkEdgeData,
  NetworkTheme,
  ThemePreset 
} from './components/types';

// Legacy DataNetwork component type
export interface LegacyDataNetworkProps {
  nodes?: NetworkNodeData[];
  edges?: NetworkEdgeData[];
  width?: number | string;
  height?: number | string;
  nodeCount?: number;
  animationSpeed?: number;
  connectionDistance?: number;
  nodeRadius?: number | { min: number; max: number };
  lineWidth?: number;
  nodeColor?: string;
  lineColor?: string;
  backgroundColor?: string;
  opacity?: number;
  preset?: ThemePreset;
  className?: string;
  style?: React.CSSProperties;
  onNodeClick?: (node: NetworkNodeData, event: MouseEvent) => void;
  onNodeHover?: (node: NetworkNodeData | null, event: MouseEvent) => void;
  onCanvasClick?: (event: MouseEvent) => void;
  debug?: boolean;
}

export interface LegacyDataNetworkRef {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  reset: () => void;
  getStats: () => any;
  getPerformanceInfo: () => any;
  updateTheme: (theme: NetworkTheme | ThemePreset) => void;
  getCanvas: () => HTMLCanvasElement | null;
}

// ============================================================================
// Component Exports
// ============================================================================

// Legacy component (default export)
declare const DataNetwork: ForwardRefExoticComponent<
  LegacyDataNetworkProps & RefAttributes<LegacyDataNetworkRef>
>;

// Modern component
export declare const ModernDataNetwork: ForwardRefExoticComponent<
  NetworkProps & RefAttributes<LegacyDataNetworkRef>
>;

// Other modern components
export declare const NetworkCanvas: ComponentType<any>;
export declare const NetworkNode: ComponentType<any>;
export declare const NetworkEdge: ComponentType<any>;
export declare const NetworkContainer: ComponentType<any>;
export declare const ResponsiveWrapper: ComponentType<any>;
export declare const PerformanceIndicator: ComponentType<any>;
export declare const ThemeSelector: ComponentType<any>;
export declare const AccessibilityControls: ComponentType<any>;

// ============================================================================
// Context and Hooks
// ============================================================================

export declare const NetworkProvider: ComponentType<any>;
export declare const ThemeProvider: ComponentType<any>;
export declare const PerformanceProvider: ComponentType<any>;

export declare function useNetworkContext(): any;
export declare function useThemeContext(): any;
export declare function usePerformanceContext(): any;
export declare function useNetworkAnimation(config?: any): any;
export declare function useNetworkInteraction(config?: any): any;
export declare function useNetworkPerformance(config?: any): any;
export declare function useNetworkTheme(config?: any): any;
export declare function useNetworkAccessibility(config?: any): any;

// ============================================================================
// Utility Exports
// ============================================================================

export interface UtilsExport {
  version: string;
  PerformanceMonitor: any;
  detectDeviceCapabilities: () => any;
  getOptimalSettings: (deviceCaps: any) => any;
  usePerformanceMonitor: any;
  detectMotionPreferences: () => any;
  getAccessibilitySettings: () => any;
  createMotionListener: (callback: Function) => any;
  announceToScreenReader: (message: string) => void;
}

export declare const utils: UtilsExport;

// ============================================================================
// Theme Exports
// ============================================================================

export interface ThemesExport {
  default: {
    nodeColor: string;
    edgeColor: string;
    backgroundColor: string;
  };
  dark: {
    nodeColor: string;
    edgeColor: string;
    backgroundColor: string;
  };
  [key: string]: NetworkTheme | any;
}

export declare const themes: ThemesExport;

// ============================================================================
// Version Export
// ============================================================================

export declare const version: string;

// ============================================================================
// Default Export
// ============================================================================

export default DataNetwork;
