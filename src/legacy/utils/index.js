// Version export
export const version = '1.0.0';

// Performance utilities
export { PerformanceMonitor, detectDeviceCapabilities, getOptimalSettings } from './performance';
export { usePerformanceMonitor } from './hooks/usePerformanceMonitor';
export { useSmartDefaults, getOptimalSettingsForContext, selectPerformanceTier } from './hooks/useSmartDefaults';

// Theme utilities
export {
  icons, themeTokens, applyCSSCustomProperties, getPresetConfig, getIconColor,
  detectCSSVariables, generateAutoTheme, detectThemeMode, createThemeListener,
  resolveThemeConfig, validateTheme, getThemeMetadata, getAllThemes, getThemesByIndustry,
  getPerformanceTiers, getOptimalPerformanceTier, getPerformanceRecommendations, calculatePerformanceImpact
} from './themes';

// Accessibility utilities
export { detectMotionPreferences, getAccessibilitySettings, createMotionListener, announceToScreenReader } from './accessibility';