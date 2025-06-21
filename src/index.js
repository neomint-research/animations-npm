/**
 * @neomint/animations - Main Entry Point
 *
 * This is the main entry point for the @neomint/animations library.
 * Provides both legacy and modern component exports for seamless migration.
 *
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

// ============================================================================
// Legacy Exports (Backward Compatibility)
// ============================================================================

// Re-export everything from the legacy implementation
export * from './legacy/index.js';

// Import the legacy component for default export
import { DataNetwork as LegacyDataNetwork } from './legacy/index.js';

// Import and re-export utilities as a namespace
import * as legacyUtils from './legacy/utils';

// Export utils as a named object for backward compatibility
export const utils = legacyUtils;

// ============================================================================
// Modern Component Exports (TypeScript)
// ============================================================================

// Modern TypeScript components (available alongside legacy)
export {
  DataNetwork as ModernDataNetwork,
  NetworkCanvas,
  NetworkNode,
  NetworkEdge,
  NetworkContainer,
  ResponsiveWrapper,
  PerformanceIndicator,
  ThemeSelector,
  AccessibilityControls
} from './components';

// Context providers and hooks
export {
  NetworkProvider,
  useNetworkContext,
  ThemeProvider,
  useThemeContext,
  PerformanceProvider,
  usePerformanceContext,
  useNetworkAnimation,
  useNetworkInteraction,
  useNetworkPerformance,
  useNetworkTheme,
  useNetworkAccessibility
} from './components';

// TypeScript types are available through separate .d.ts files
// Import them in TypeScript projects with:
// import type { NetworkProps, NetworkNodeData, ... } from '@neomint/animations';

// Constants and presets
export {
  NETWORK_DEFAULTS,
  THEME_PRESETS,
  PERFORMANCE_TIERS
} from './components/constants';

// ============================================================================
// Theme System (Enhanced)
// ============================================================================

// Import modern theme presets
import { THEME_PRESETS } from './components/constants';

// Export enhanced themes object with legacy themes and modern theme presets
export const themes = {
  // Legacy themes for backward compatibility
  default: {
    nodeColor: '#3498db',
    edgeColor: '#95a5a6',
    backgroundColor: '#ffffff'
  },
  dark: {
    nodeColor: '#e74c3c',
    edgeColor: '#bdc3c7',
    backgroundColor: '#2c3e50'
  },
  // Modern theme presets
  ...THEME_PRESETS
};

// ============================================================================
// Default Export Strategy
// ============================================================================

// Default export remains the legacy component for backward compatibility
// Users can opt into the modern component by importing { ModernDataNetwork }
export default LegacyDataNetwork;
