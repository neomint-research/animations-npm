/**
 * @neomint/animations - Network Performance Hook
 * 
 * Monitors and optimizes network visualization performance.
 * Provides adaptive quality settings and performance metrics.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useNetworkContext } from '../context/NetworkContext';
import { 
  NetworkPerformanceConfig, 
  PerformanceMetrics, 
  DeviceCapabilities 
} from '../types';

// ============================================================================
// Hook Configuration
// ============================================================================

interface UseNetworkPerformanceConfig {
  config: NetworkPerformanceConfig;
  onPerformanceChange?: (metrics: PerformanceMetrics) => void;
}

interface PerformanceControls {
  getStats: () => PerformanceMetrics;
  getPerformanceInfo: () => {
    deviceCapabilities: DeviceCapabilities;
    currentConfig: NetworkPerformanceConfig;
    recommendations: string[];
  };
  optimizeForDevice: () => void;
  setQuality: (quality: 'low' | 'medium' | 'high') => void;
}

// ============================================================================
// Device Capability Detection
// ============================================================================

function detectDeviceCapabilities(): DeviceCapabilities {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  // Estimate device performance
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as any).deviceMemory || 4; // GB
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  let maxTextureSize = 2048;
  let supportsGPU = false;
  
  if (gl && 'getParameter' in gl) {
    supportsGPU = true;
    const webglContext = gl as WebGLRenderingContext;
    maxTextureSize = webglContext.getParameter(webglContext.MAX_TEXTURE_SIZE);
  }
  
  const isHighPerformance = cores >= 4 && memory >= 8 && !isMobile && supportsGPU;
  
  return {
    isHighPerformance,
    isMobile,
    supportsGPU,
    maxTextureSize,
    cores,
    memory
  };
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useNetworkPerformance({
  config,
  onPerformanceChange
}: UseNetworkPerformanceConfig): PerformanceControls {
  const { performance, metrics, updatePerformance } = useNetworkContext();
  const [deviceCapabilities] = useState<DeviceCapabilities>(detectDeviceCapabilities);
  const performanceHistoryRef = useRef<PerformanceMetrics[]>([]);
  const lastOptimizationRef = useRef<number>(0);
  
  // ============================================================================
  // Performance Monitoring
  // ============================================================================
  
  useEffect(() => {
    // Store performance history (last 60 frames)
    performanceHistoryRef.current.push(metrics);
    if (performanceHistoryRef.current.length > 60) {
      performanceHistoryRef.current.shift();
    }
    
    // Notify about performance changes
    onPerformanceChange?.(metrics);
    
    // Auto-optimize if performance is poor and adaptive quality is enabled
    if (config.adaptiveQuality && Date.now() - lastOptimizationRef.current > 5000) {
      const avgFPS = performanceHistoryRef.current.reduce((sum, m) => sum + m.fps, 0) / 
                    performanceHistoryRef.current.length;
      
      const targetFPS = config.maxFPS || 60;
      
      if (avgFPS < targetFPS * 0.7) {
        optimizeForLowPerformance();
        lastOptimizationRef.current = Date.now();
      }
    }
  }, [metrics, config, onPerformanceChange]);
  
  // ============================================================================
  // Performance Optimization Functions
  // ============================================================================
  
  const optimizeForLowPerformance = useCallback(() => {
    const currentTier = performance.performanceTier;
    
    if (currentTier === 'high') {
      updatePerformance({ performanceTier: 'medium', maxFPS: 45 });
    } else if (currentTier === 'medium') {
      updatePerformance({ 
        performanceTier: 'low', 
        maxFPS: 30,
        enableGPUAcceleration: false 
      });
    }
  }, [performance.performanceTier, updatePerformance]);
  
  const optimizeForDevice = useCallback(() => {
    const { isHighPerformance, isMobile, supportsGPU } = deviceCapabilities;
    
    let recommendedConfig: Partial<NetworkPerformanceConfig>;
    
    if (isHighPerformance) {
      recommendedConfig = {
        performanceTier: 'high',
        maxFPS: 60,
        enableGPUAcceleration: true,
        adaptiveQuality: false,
        maxNodes: 150,
        maxEdges: 300
      };
    } else if (isMobile) {
      recommendedConfig = {
        performanceTier: 'low',
        maxFPS: 30,
        enableGPUAcceleration: supportsGPU,
        adaptiveQuality: true,
        maxNodes: 30,
        maxEdges: 50
      };
    } else {
      recommendedConfig = {
        performanceTier: 'medium',
        maxFPS: 45,
        enableGPUAcceleration: supportsGPU,
        adaptiveQuality: true,
        maxNodes: 75,
        maxEdges: 150
      };
    }
    
    updatePerformance(recommendedConfig);
  }, [deviceCapabilities, updatePerformance]);
  
  const setQuality = useCallback((quality: 'low' | 'medium' | 'high') => {
    const qualityConfigs = {
      low: {
        performanceTier: 'low' as const,
        maxFPS: 30,
        enableGPUAcceleration: false,
        maxNodes: 30,
        maxEdges: 50
      },
      medium: {
        performanceTier: 'medium' as const,
        maxFPS: 45,
        enableGPUAcceleration: deviceCapabilities.supportsGPU,
        maxNodes: 75,
        maxEdges: 150
      },
      high: {
        performanceTier: 'high' as const,
        maxFPS: 60,
        enableGPUAcceleration: true,
        maxNodes: 150,
        maxEdges: 300
      }
    };
    
    updatePerformance(qualityConfigs[quality]);
  }, [deviceCapabilities.supportsGPU, updatePerformance]);
  
  // ============================================================================
  // Statistics and Information
  // ============================================================================
  
  const getStats = useCallback((): PerformanceMetrics => {
    const history = performanceHistoryRef.current;
    
    if (history.length === 0) return metrics;
    
    const avgFPS = history.reduce((sum, m) => sum + m.fps, 0) / history.length;
    const avgFrameTime = history.reduce((sum, m) => sum + m.frameTime, 0) / history.length;
    const minFPS = Math.min(...history.map(m => m.fps));
    const maxFPS = Math.max(...history.map(m => m.fps));
    
    return {
      ...metrics,
      fps: Math.round(avgFPS),
      frameTime: Math.round(avgFrameTime * 100) / 100,
      minFPS,
      maxFPS
    } as PerformanceMetrics & { minFPS: number; maxFPS: number };
  }, [metrics]);
  
  const getPerformanceInfo = useCallback(() => {
    const stats = getStats();
    const targetFPS = config.maxFPS || 60;
    const recommendations: string[] = [];
    
    // Generate recommendations
    if (stats.fps < targetFPS * 0.8) {
      recommendations.push('Consider reducing the number of nodes or edges');
      recommendations.push('Try lowering the quality setting');
      if (config.enableGPUAcceleration) {
        recommendations.push('GPU acceleration is enabled but performance is still low');
      } else {
        recommendations.push('Enable GPU acceleration if supported');
      }
    }
    
    if (deviceCapabilities.isMobile) {
      recommendations.push('Mobile device detected - consider using lower quality settings');
    }
    
    if (!deviceCapabilities.supportsGPU) {
      recommendations.push('GPU acceleration not available on this device');
    }
    
    if (stats.nodeCount > (config.maxNodes || 100)) {
      recommendations.push(`Node count (${stats.nodeCount}) exceeds recommended maximum (${config.maxNodes})`);
    }
    
    if (stats.edgeCount > (config.maxEdges || 200)) {
      recommendations.push(`Edge count (${stats.edgeCount}) exceeds recommended maximum (${config.maxEdges})`);
    }
    
    return {
      deviceCapabilities,
      currentConfig: performance,
      recommendations
    };
  }, [getStats, config, deviceCapabilities, performance]);
  
  // ============================================================================
  // Auto-optimization on mount
  // ============================================================================
  
  useEffect(() => {
    if (config.performanceTier === 'auto') {
      optimizeForDevice();
    }
  }, [config.performanceTier, optimizeForDevice]);
  
  // ============================================================================
  // Memory Usage Monitoring (if available)
  // ============================================================================
  
  useEffect(() => {
    if (typeof window === 'undefined' || !('performance' in window)) return;
    
    const checkMemoryUsage = () => {
      const perf = window.performance as any;
      if (perf.memory) {
        const memoryInfo = {
          used: perf.memory.usedJSHeapSize,
          total: perf.memory.totalJSHeapSize,
          limit: perf.memory.jsHeapSizeLimit
        };
        
        // If memory usage is high, suggest optimization
        const usagePercent = (memoryInfo.used / memoryInfo.limit) * 100;
        if (usagePercent > 80) {
          console.warn('[NetworkPerformance] High memory usage detected:', usagePercent.toFixed(1) + '%');
        }
      }
    };
    
    const interval = setInterval(checkMemoryUsage, 10000); // Check every 10 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // ============================================================================
  // Return Controls
  // ============================================================================
  
  return {
    getStats,
    getPerformanceInfo,
    optimizeForDevice,
    setQuality
  };
}

// ============================================================================
// Utility Hook for Performance Metrics
// ============================================================================

export function usePerformanceMetrics() {
  const { metrics } = useNetworkContext();
  const [averageMetrics, setAverageMetrics] = useState<PerformanceMetrics>(metrics);
  const historyRef = useRef<PerformanceMetrics[]>([]);
  
  useEffect(() => {
    historyRef.current.push(metrics);
    if (historyRef.current.length > 30) { // Keep last 30 frames
      historyRef.current.shift();
    }
    
    // Calculate averages
    const history = historyRef.current;
    const avgFPS = history.reduce((sum, m) => sum + m.fps, 0) / history.length;
    const avgFrameTime = history.reduce((sum, m) => sum + m.frameTime, 0) / history.length;
    
    setAverageMetrics({
      ...metrics,
      fps: Math.round(avgFPS),
      frameTime: Math.round(avgFrameTime * 100) / 100
    });
  }, [metrics]);
  
  return { current: metrics, average: averageMetrics };
}
