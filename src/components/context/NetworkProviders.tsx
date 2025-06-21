/**
 * @neomint/animations - Network Providers Composition
 * 
 * Combines all split contexts into a single provider component.
 * Provides better performance through context splitting while maintaining ease of use.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import React, { ReactNode } from 'react';
import { NetworkProvider } from './NetworkContext';
import { DataProvider } from './DataContext';
import { InteractionProvider } from './InteractionContext';
import { PerformanceProvider } from './PerformanceContext';
import { ThemeProvider } from './ThemeContext';
import { NetworkErrorBoundary } from '../ErrorBoundary';
import { 
  NetworkNodeData, 
  NetworkEdgeData, 
  NetworkTheme, 
  NetworkPerformanceConfig,
  NetworkAccessibilityConfig,
  NetworkAnimationConfig,
  NetworkInteractionConfig,
  NetworkDimensions
} from '../types';

// ============================================================================
// Combined Provider Props
// ============================================================================

export interface NetworkProvidersProps {
  children: ReactNode;
  
  // Data props
  initialNodes?: NetworkNodeData[];
  initialEdges?: NetworkEdgeData[];
  initialDimensions?: NetworkDimensions;
  
  // Theme props
  initialTheme?: NetworkTheme;
  
  // Performance props
  initialPerformance?: Partial<NetworkPerformanceConfig>;
  
  // Accessibility props
  initialAccessibility?: Partial<NetworkAccessibilityConfig>;
  
  // Animation props
  initialAnimation?: Partial<NetworkAnimationConfig>;
  
  // Interaction props
  initialInteraction?: Partial<NetworkInteractionConfig>;
  
  // Error boundary props
  enableErrorBoundary?: boolean;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  errorFallback?: ReactNode;
  
  // Performance optimization
  enableContextSplitting?: boolean;
  debugMode?: boolean;
}

// ============================================================================
// Split Context Providers
// ============================================================================

function SplitContextProviders({
  children,
  initialNodes,
  initialEdges,
  initialDimensions,
  initialTheme,
  initialPerformance,
  initialInteraction
}: Omit<NetworkProvidersProps, 'enableErrorBoundary' | 'onError' | 'errorFallback' | 'enableContextSplitting' | 'debugMode'>) {
  return (
    <DataProvider
      initialNodes={initialNodes}
      initialEdges={initialEdges}
      initialDimensions={initialDimensions}
    >
      <ThemeProvider initialTheme={initialTheme}>
        <PerformanceProvider initialConfig={initialPerformance}>
          <InteractionProvider initialConfig={initialInteraction}>
            {children}
          </InteractionProvider>
        </PerformanceProvider>
      </ThemeProvider>
    </DataProvider>
  );
}

// ============================================================================
// Monolithic Context Provider (for backward compatibility)
// ============================================================================

function MonolithicContextProvider({
  children,
  initialNodes,
  initialEdges,
  initialTheme,
  initialPerformance,
  initialAccessibility,
  initialAnimation,
  initialInteraction
}: Omit<NetworkProvidersProps, 'enableErrorBoundary' | 'onError' | 'errorFallback' | 'enableContextSplitting' | 'debugMode' | 'initialDimensions'>) {
  return (
    <NetworkProvider
      initialNodes={initialNodes}
      initialEdges={initialEdges}
      initialTheme={initialTheme}
      initialPerformance={initialPerformance}
      initialAccessibility={initialAccessibility}
      initialAnimation={initialAnimation}
      initialInteraction={initialInteraction}
    >
      {children}
    </NetworkProvider>
  );
}

// ============================================================================
// Main Combined Provider
// ============================================================================

export function NetworkProviders({
  children,
  initialNodes = [],
  initialEdges = [],
  initialDimensions,
  initialTheme,
  initialPerformance = {},
  initialAccessibility = {},
  initialAnimation = {},
  initialInteraction = {},
  enableErrorBoundary = true,
  onError,
  errorFallback,
  enableContextSplitting = true,
  debugMode = process.env.NODE_ENV === 'development'
}: NetworkProvidersProps) {
  
  // Debug logging
  if (debugMode) {
    console.log('[NetworkProviders] Initializing with config:', {
      enableContextSplitting,
      enableErrorBoundary,
      nodeCount: initialNodes.length,
      edgeCount: initialEdges.length
    });
  }

  // Choose provider strategy
  const ContextProvider = enableContextSplitting ? SplitContextProviders : MonolithicContextProvider;
  
  const providerProps = enableContextSplitting ? {
    initialNodes,
    initialEdges,
    initialDimensions,
    initialTheme,
    initialPerformance,
    initialInteraction
  } : {
    initialNodes,
    initialEdges,
    initialTheme,
    initialPerformance,
    initialAccessibility,
    initialAnimation,
    initialInteraction
  };

  const content = (
    <ContextProvider {...providerProps}>
      {children}
    </ContextProvider>
  );

  // Wrap with error boundary if enabled
  if (enableErrorBoundary) {
    return (
      <NetworkErrorBoundary
        onError={onError}
        fallback={errorFallback}
      >
        {content}
      </NetworkErrorBoundary>
    );
  }

  return content;
}

// ============================================================================
// Convenience Exports
// ============================================================================

// For apps that want maximum performance
export function HighPerformanceNetworkProviders(props: NetworkProvidersProps) {
  return (
    <NetworkProviders
      {...props}
      enableContextSplitting={true}
      enableErrorBoundary={true}
    />
  );
}

// For apps that want simplicity
export function SimpleNetworkProviders(props: NetworkProvidersProps) {
  return (
    <NetworkProviders
      {...props}
      enableContextSplitting={false}
      enableErrorBoundary={true}
    />
  );
}

// For development/debugging
export function DebugNetworkProviders(props: NetworkProvidersProps) {
  return (
    <NetworkProviders
      {...props}
      enableContextSplitting={true}
      enableErrorBoundary={true}
      debugMode={true}
    />
  );
}

// ============================================================================
// Hook for Provider Configuration
// ============================================================================

export function useNetworkProviderConfig() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    recommended: {
      enableContextSplitting: true,
      enableErrorBoundary: true,
      debugMode: !isProduction
    },
    performance: {
      enableContextSplitting: true,
      enableErrorBoundary: false,
      debugMode: false
    },
    development: {
      enableContextSplitting: true,
      enableErrorBoundary: true,
      debugMode: true
    },
    simple: {
      enableContextSplitting: false,
      enableErrorBoundary: true,
      debugMode: !isProduction
    }
  };
}
