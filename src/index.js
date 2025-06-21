/**
 * @neomint/animations - Main Entry Point
 * Dual-export system: Legacy (JS) + Modern (TS) components
 * @version 2.0.0-beta
 */

// Legacy exports (backward compatibility)
export * from './legacy/index.js';
import { DataNetwork as LegacyDataNetwork } from './legacy/index.js';
import * as legacyUtils from './legacy/utils';
export const utils = legacyUtils;

// Modern components (TypeScript)
let ModernComponents = {};
try {
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
  console.warn('[neomint/animations] Modern components unavailable. Run `npm run build:ts`.');
}

export const {
  ModernDataNetwork,
  NetworkCanvas,
  NetworkNode,
  NetworkEdge,
  NetworkErrorBoundary,
  withErrorBoundary,
  useErrorHandler
} = ModernComponents;

// Modern constants
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
  ModernConstants = { NETWORK_DEFAULTS: {}, THEME_PRESETS: {}, PERFORMANCE_TIERS: {}, PERFORMANCE_CONSTANTS: {} };
}

export const { NETWORK_DEFAULTS, THEME_PRESETS, PERFORMANCE_TIERS, PERFORMANCE_CONSTANTS } = ModernConstants;

// Enhanced themes (legacy + modern)
export const themes = {
  default: { nodeColor: '#3498db', edgeColor: '#95a5a6', backgroundColor: '#ffffff' },
  dark: { nodeColor: '#e74c3c', edgeColor: '#bdc3c7', backgroundColor: '#2c3e50' },
  ...(THEME_PRESETS || {})
};

// Default export (legacy for backward compatibility)
export default LegacyDataNetwork;
