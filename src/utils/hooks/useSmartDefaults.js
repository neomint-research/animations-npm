import { useMemo } from 'react';
import { detectDeviceCapabilities, getOptimalSettings } from '../performance';
import { getOptimalPerformanceTier, resolveThemeConfig } from '../themes';
import { detectMotionPreferences, getAccessibilitySettings } from '../accessibility';
import { 
  contextDefaults, 
  performanceDefaults,
  DataNetworkPerformanceTiers,
  DataNetworkContextTypes 
} from '../../components/DataNetwork/DataNetwork.types';

/**
 * Smart defaults hook for DataNetwork component
 * Intelligently resolves prop values based on device capabilities, context, and user preferences
 */
export const useSmartDefaults = (props = {}) => {
  const {
    // Extract user-provided props
    nodeCount: userNodeCount,
    animationSpeed: userAnimationSpeed,
    connectionDistance: userConnectionDistance,
    nodeRadius: userNodeRadius,
    lineWidth: userLineWidth,
    opacity: userOpacity,
    maxFPS: userMaxFPS,
    
    // Context and configuration
    context = DataNetworkContextTypes.GENERAL,
    performanceTier: userPerformanceTier,
    performance = 'auto',
    accessibility = 'respect-motion',
    reducedMotion: userReducedMotion,
    preset,
    theme,
    
    // Feature flags
    enableGPUAcceleration: userEnableGPU,
    ...restProps
  } = props;

  // Memoize device capabilities detection
  const deviceCapabilities = useMemo(() => detectDeviceCapabilities(), []);
  
  // Memoize motion preferences
  const motionPreferences = useMemo(() => detectMotionPreferences(), []);
  
  // Determine effective reduced motion preference
  const effectiveReducedMotion = userReducedMotion !== undefined 
    ? userReducedMotion 
    : motionPreferences.prefersReducedMotion;

  // Calculate optimal performance tier
  const optimalPerformanceTier = useMemo(() => {
    // User override takes precedence
    if (userPerformanceTier && userPerformanceTier !== DataNetworkPerformanceTiers.AUTO) {
      return userPerformanceTier;
    }
    
    // Check accessibility requirements first
    if (accessibility === 'respect-motion' && effectiveReducedMotion) {
      return DataNetworkPerformanceTiers.MINIMAL;
    }
    
    // Auto-detect based on device and context
    if (performance === 'auto') {
      const tierPreset = getOptimalPerformanceTier(deviceCapabilities, context);
      
      // Map theme preset to performance tier
      if (tierPreset === 'desktopHeavy') return DataNetworkPerformanceTiers.HIGH;
      if (tierPreset === 'desktopStandard') return DataNetworkPerformanceTiers.MEDIUM;
      if (tierPreset === 'mobileLight') return DataNetworkPerformanceTiers.LOW;
      if (tierPreset === 'mobileMinimal') return DataNetworkPerformanceTiers.MINIMAL;
      if (tierPreset === 'accessibilitySafe') return DataNetworkPerformanceTiers.MINIMAL;
      
      return DataNetworkPerformanceTiers.MEDIUM;
    }
    
    return DataNetworkPerformanceTiers.MEDIUM;
  }, [userPerformanceTier, performance, deviceCapabilities, context, accessibility, effectiveReducedMotion]);

  // Get context-based defaults
  const contextConfig = contextDefaults[context] || contextDefaults[DataNetworkContextTypes.GENERAL];
  
  // Get performance tier defaults
  const performanceConfig = performanceDefaults[optimalPerformanceTier] || performanceDefaults[DataNetworkPerformanceTiers.MEDIUM];
  
  // Get accessibility settings if needed
  const accessibilityConfig = useMemo(() => {
    if (accessibility === 'respect-motion' && effectiveReducedMotion) {
      return getAccessibilitySettings({ prefersReducedMotion: true });
    }
    return null;
  }, [accessibility, effectiveReducedMotion]);

  // Get device-optimized settings
  const deviceOptimalSettings = useMemo(() => {
    if (performance === 'auto') {
      return getOptimalSettings(deviceCapabilities);
    }
    return null;
  }, [performance, deviceCapabilities]);

  // Smart resolution logic - prioritize in this order:
  // 1. User-provided values
  // 2. Accessibility requirements
  // 3. Performance tier settings
  // 4. Context-specific defaults
  // 5. Device-optimized settings
  // 6. Fallback defaults
  const resolvedDefaults = useMemo(() => {
    const resolve = (userValue, prop, fallback) => {
      if (userValue !== undefined && userValue !== null) return userValue;
      if (accessibilityConfig && accessibilityConfig[prop] !== undefined) return accessibilityConfig[prop];
      if (performanceConfig[prop] !== undefined) return performanceConfig[prop];
      if (contextConfig[prop] !== undefined) return contextConfig[prop];
      if (deviceOptimalSettings && deviceOptimalSettings[prop] !== undefined) return deviceOptimalSettings[prop];
      return fallback;
    };

    // Node radius resolution
    const resolvedNodeRadius = userNodeRadius || {
      min: optimalPerformanceTier === DataNetworkPerformanceTiers.HIGH ? 1 : 0.5,
      max: optimalPerformanceTier === DataNetworkPerformanceTiers.HIGH ? 3 : 2
    };

    // GPU acceleration based on device and tier
    const resolvedEnableGPU = userEnableGPU !== undefined 
      ? userEnableGPU 
      : deviceCapabilities.isHighPerformance && optimalPerformanceTier !== DataNetworkPerformanceTiers.MINIMAL;

    // Opacity resolution with accessibility considerations
    const baseOpacity = resolve(userOpacity, 'opacity', 1);
    const resolvedOpacity = accessibilityConfig?.opacity !== undefined 
      ? Math.min(baseOpacity, accessibilityConfig.opacity)
      : baseOpacity;

    return {
      nodeCount: resolve(userNodeCount, 'nodeCount', 50),
      animationSpeed: resolve(userAnimationSpeed, 'animationSpeed', 0.5),
      connectionDistance: resolve(userConnectionDistance, 'connectionDistance', 120),
      nodeRadius: resolvedNodeRadius,
      lineWidth: userLineWidth || 1,
      opacity: resolvedOpacity,
      maxFPS: resolve(userMaxFPS, 'maxFPS', 60),
      enableGPUAcceleration: resolvedEnableGPU,
      
      // Additional computed properties
      performanceTier: optimalPerformanceTier,
      deviceCapabilities,
      motionPreferences,
      effectiveReducedMotion,
      isAnimationDisabled: accessibility === 'disable' || 
        (accessibility === 'respect-motion' && effectiveReducedMotion && accessibilityConfig?.disabled),
      
      // Context and performance info
      context,
      performance,
      accessibility,
      
      // Theme resolution
      effectivePreset: preset || contextConfig.preset || 'default',
      theme: theme || 'auto'
    };
  }, [
    userNodeCount, userAnimationSpeed, userConnectionDistance, userNodeRadius,
    userLineWidth, userOpacity, userMaxFPS, userEnableGPU,
    optimalPerformanceTier, accessibilityConfig, performanceConfig,
    contextConfig, deviceOptimalSettings, deviceCapabilities,
    motionPreferences, effectiveReducedMotion, accessibility,
    context, performance, preset, theme
  ]);

  // Performance impact calculation
  const performanceImpact = useMemo(() => {
    const { nodeCount, animationSpeed, connectionDistance } = resolvedDefaults;
    
    // Simple performance score calculation
    const nodeScore = (nodeCount / 100) * 30;
    const speedScore = animationSpeed * 40;
    const connectionScore = (connectionDistance / 200) * 30;
    
    const totalScore = nodeScore + speedScore + connectionScore;
    
    return {
      score: Math.min(100, Math.max(0, totalScore)),
      level: totalScore < 30 ? 'light' : totalScore < 60 ? 'moderate' : 'heavy',
      recommendation: totalScore > 80 ? 'Consider reducing animation complexity for better performance' : null
    };
  }, [resolvedDefaults]);

  // Validation in development
  const validationWarnings = useMemo(() => {
    if (process.env.NODE_ENV !== 'development') return [];
    
    const warnings = [];
    
    // Check for performance conflicts
    if (userPerformanceTier === DataNetworkPerformanceTiers.HIGH && deviceCapabilities.isMobile) {
      warnings.push('High performance tier on mobile device may cause performance issues');
    }
    
    // Check for accessibility conflicts
    if (accessibility === 'disable' && effectiveReducedMotion) {
      warnings.push('Animation disabled but user prefers reduced motion - consider using respect-motion mode');
    }
    
    // Check for unrealistic values
    if (userNodeCount > 200 && !deviceCapabilities.isHighPerformance) {
      warnings.push('High node count on non-high-performance device may cause lag');
    }
    
    return warnings;
  }, [userPerformanceTier, deviceCapabilities, accessibility, effectiveReducedMotion, userNodeCount]);

  return {
    ...restProps,
    ...resolvedDefaults,
    performanceImpact,
    validationWarnings,
    
    // Helper methods
    getRecommendedSettings: () => ({
      nodeCount: performanceConfig.nodeCount,
      animationSpeed: performanceConfig.animationSpeed,
      connectionDistance: performanceConfig.connectionDistance
    }),
    
    shouldUseStaticRendering: () => {
      return resolvedDefaults.isAnimationDisabled || 
             resolvedDefaults.performanceTier === DataNetworkPerformanceTiers.MINIMAL;
    },
    
    canUseGPUAcceleration: () => {
      return resolvedDefaults.enableGPUAcceleration && 
             deviceCapabilities.isHighPerformance;
    }
  };
};

// Export helper to get optimal settings for a specific context
export const getOptimalSettingsForContext = (context, deviceCapabilities = null) => {
  const caps = deviceCapabilities || detectDeviceCapabilities();
  const motionPrefs = detectMotionPreferences();
  
  // Get base context config
  const contextConfig = contextDefaults[context] || contextDefaults[DataNetworkContextTypes.GENERAL];
  
  // Adjust for device capabilities
  if (caps.isMobile || !caps.isHighPerformance) {
    return {
      ...contextConfig,
      nodeCount: Math.floor(contextConfig.nodeCount * 0.6),
      animationSpeed: contextConfig.animationSpeed * 0.7,
      connectionDistance: contextConfig.connectionDistance * 0.8
    };
  }
  
  // Adjust for motion preferences
  if (motionPrefs.prefersReducedMotion) {
    return {
      ...contextConfig,
      nodeCount: Math.floor(contextConfig.nodeCount * 0.3),
      animationSpeed: contextConfig.animationSpeed * 0.2,
      connectionDistance: contextConfig.connectionDistance * 0.5
    };
  }
  
  return contextConfig;
};

// Export performance tier selector helper
export const selectPerformanceTier = (requirements = {}) => {
  const {
    targetFPS = 30,
    maxNodes = 50,
    deviceCapabilities = detectDeviceCapabilities(),
    preferQuality = false
  } = requirements;
  
  // High performance conditions
  if (deviceCapabilities.isHighPerformance && targetFPS >= 60 && preferQuality) {
    return DataNetworkPerformanceTiers.HIGH;
  }
  
  // Low/Minimal performance conditions
  if (deviceCapabilities.isMobile || targetFPS < 24 || maxNodes < 20) {
    return targetFPS < 15 ? DataNetworkPerformanceTiers.MINIMAL : DataNetworkPerformanceTiers.LOW;
  }
  
  // Default to medium
  return DataNetworkPerformanceTiers.MEDIUM;
};