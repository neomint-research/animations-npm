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
// Note: These will be available after TypeScript compilation
let ModernComponents = {};
try {
  // Try to import compiled TypeScript components
  const components = require('../dist/ts/components/index.js');
  ModernComponents = {
    ModernDataNetwork: components.DataNetwork,
    NetworkCanvas: components.NetworkCanvas,
    NetworkNode: components.NetworkNode,
    NetworkEdge: components.NetworkEdge,
    NetworkErrorBoundary: components.NetworkErrorBoundary,
    withErrorBoundary: components.withErrorBoundary,
    useErrorHandler: components.useErrorHandler
  };
} catch (error) {
  // TypeScript components not available (development mode)
  console.warn('[neomint/animations] Modern TypeScript components not available. Run `npm run build:ts` first.');
}

// Export modern components if available
export const {
  ModernDataNetwork,
  NetworkCanvas,
  NetworkNode,
  NetworkEdge,
  NetworkErrorBoundary,
  withErrorBoundary,
  useErrorHandler
} = ModernComponents;

// TypeScript types are available through separate .d.ts files
// Import them in TypeScript projects with:
// import type { NetworkProps, NetworkNodeData, ... } from '@neomint/animations';

// Constants and presets (try to import from compiled TypeScript)
let ModernConstants = {};
try {
  const constants = require('../dist/ts/components/constants/index.js');
  ModernConstants = {
    NETWORK_DEFAULTS: constants.NETWORK_DEFAULTS,
    THEME_PRESETS: constants.THEME_PRESETS,
    PERFORMANCE_TIERS: constants.PERFORMANCE_TIERS,
    PERFORMANCE_CONSTANTS: constants.PERFORMANCE_CONSTANTS
  };
} catch (error) {
  // Use fallback constants
  ModernConstants = {
    NETWORK_DEFAULTS: {},
    THEME_PRESETS: {},
    PERFORMANCE_TIERS: {},
    PERFORMANCE_CONSTANTS: {}
  };
}

export const {
  NETWORK_DEFAULTS,
  THEME_PRESETS,
  PERFORMANCE_TIERS,
  PERFORMANCE_CONSTANTS
} = ModernConstants;

// ============================================================================
// Theme System (Enhanced)
// ============================================================================

// Use modern theme presets if available

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
  // Modern theme presets (if available)
  ...(THEME_PRESETS || {})
};

// ============================================================================
// Default Export Strategy
// ============================================================================

// Default export remains the legacy component for backward compatibility
// Users can opt into the modern component by importing { ModernDataNetwork }
export default LegacyDataNetwork;
