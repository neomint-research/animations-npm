/**
 * @neomint/animations - Performance Context Provider
 * 
 * Standalone performance context for applications that only need performance
 * monitoring without the full network context.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { NetworkPerformanceConfig, PerformanceMetrics } from '../types';
import { DEFAULT_PERFORMANCE_CONFIG } from '../constants';

interface PerformanceContextValue {
  config: NetworkPerformanceConfig;
  metrics: PerformanceMetrics;
  updateConfig: (config: Partial<NetworkPerformanceConfig>) => void;
  updateMetrics: (metrics: PerformanceMetrics) => void;
}

const PerformanceContext = createContext<PerformanceContextValue | null>(null);

interface PerformanceProviderProps {
  children: ReactNode;
  initialConfig?: Partial<NetworkPerformanceConfig>;
}

export function PerformanceProvider({
  children,
  initialConfig = {}
}: PerformanceProviderProps) {
  const [config, setConfig] = useState<NetworkPerformanceConfig>({
    ...DEFAULT_PERFORMANCE_CONFIG,
    ...initialConfig
  });
  
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    frameTime: 0,
    nodeCount: 0,
    edgeCount: 0
  });
  
  const updateConfig = useCallback((newConfig: Partial<NetworkPerformanceConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);
  
  const updateMetrics = useCallback((newMetrics: PerformanceMetrics) => {
    setMetrics(newMetrics);
  }, []);
  
  const contextValue: PerformanceContextValue = {
    config,
    metrics,
    updateConfig,
    updateMetrics
  };
  
  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformanceContext(): PerformanceContextValue {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformanceContext must be used within a PerformanceProvider');
  }
  return context;
}
