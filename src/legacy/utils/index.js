export const version = '1.0.0';
export { PerformanceMonitor, detectDeviceCapabilities, getOptimalSettings } from './performance';
export { usePerformanceMonitor } from './hooks/usePerformanceMonitor';
export {
  icons,
  themeTokens,
  applyCSSCustomProperties,
  getPresetConfig,
  getIconColor,
  detectCSSVariables,
  generateAutoTheme,
  detectThemeMode,
  createThemeListener,
  resolveThemeConfig,
  validateTheme,
  getThemeMetadata,
  getAllThemes,
  getThemesByIndustry,
  // Performance tier utilities
  getPerformanceTiers,
  getOptimalPerformanceTier,
  getPerformanceRecommendations,
  calculatePerformanceImpact
} from './themes';
export { detectMotionPreferences, getAccessibilitySettings, createMotionListener, announceToScreenReader } from './accessibility';