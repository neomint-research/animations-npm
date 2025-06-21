/**
 * @neomint/animations - Modern Components Entry Point
 * 
 * This module exports the modern TypeScript-based components that will
 * eventually replace the legacy JavaScript implementations. During the
 * migration period, both legacy and modern components are available.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

// Core Components
export { DataNetwork } from './DataNetwork';
export { NetworkCanvas } from './NetworkCanvas';
export { NetworkNode } from './NetworkNode';
export { NetworkEdge } from './NetworkEdge';
export { NetworkErrorBoundary, withErrorBoundary, useErrorHandler } from './ErrorBoundary';

// Layout Components
export { NetworkContainer, ResponsiveWrapper } from './layout/NetworkContainer';

// UI Components
export { PerformanceIndicator } from './ui/PerformanceIndicator';
export { ThemeSelector } from './ui/ThemeSelector';
export { AccessibilityControls } from './ui/AccessibilityControls';

// Context Providers
export { NetworkProvider, useNetworkContext } from './context/NetworkContext';
export { ThemeProvider, useThemeContext } from './context/ThemeContext';
export { PerformanceProvider, usePerformanceContext } from './context/PerformanceContext';

// Split Context Architecture (New)
export { DataProvider, useDataContext } from './context/DataContext';
export { InteractionProvider, useInteractionContext } from './context/InteractionContext';

// Combined Providers
export {
  NetworkProviders,
  HighPerformanceNetworkProviders,
  SimpleNetworkProviders,
  DebugNetworkProviders,
  useNetworkProviderConfig
} from './context/NetworkProviders';

// Hooks
export { useNetworkAnimation } from './hooks/useNetworkAnimation';
export { useNetworkInteraction } from './hooks/useNetworkInteraction';
export { useNetworkPerformance } from './hooks/useNetworkPerformance';
export { useNetworkTheme } from './hooks/useNetworkTheme';
export { useNetworkAccessibility } from './hooks/useNetworkAccessibility';

// Standardized Hook Utilities
export {
  useStandardizedHook,
  useHookPerformance,
  useHookErrorBoundary,
  useHookCleanup
} from './hooks/useStandardizedHook';

// Types
export type {
  NetworkProps,
  NetworkNodeData,
  NetworkEdgeData,
  NetworkTheme,
  NetworkPerformanceConfig,
  NetworkAccessibilityConfig,
  NetworkAnimationConfig,
  NetworkInteractionConfig
} from './types';

// Constants
export { NETWORK_DEFAULTS, THEME_PRESETS, PERFORMANCE_TIERS } from './constants';
