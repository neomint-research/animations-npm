/**
 * @neomint/animations - Network Context Provider
 * 
 * Provides centralized state management for the network visualization.
 * Uses React Context to share state between components efficiently.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import {
  NetworkContextValue,
  NetworkNodeData,
  NetworkEdgeData,
  NetworkDimensions,
  NetworkTheme,
  NetworkPerformanceConfig,
  NetworkAccessibilityConfig,
  NetworkAnimationConfig,
  NetworkInteractionConfig,
  NetworkInteractionState,
  PerformanceMetrics,
  ThemePreset
} from '../types';
import {
  THEME_PRESETS,
  DEFAULT_PERFORMANCE_CONFIG,
  DEFAULT_ACCESSIBILITY_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_INTERACTION_CONFIG
} from '../constants';

// ============================================================================
// Context State and Actions
// ============================================================================

interface NetworkState {
  nodes: NetworkNodeData[];
  edges: NetworkEdgeData[];
  dimensions: NetworkDimensions;
  theme: NetworkTheme;
  performance: NetworkPerformanceConfig;
  accessibility: NetworkAccessibilityConfig;
  animation: NetworkAnimationConfig;
  interaction: NetworkInteractionConfig;
  interactionState: NetworkInteractionState;
  metrics: PerformanceMetrics;
}

type NetworkAction =
  | { type: 'UPDATE_NODES'; payload: NetworkNodeData[] }
  | { type: 'UPDATE_EDGES'; payload: NetworkEdgeData[] }
  | { type: 'UPDATE_DIMENSIONS'; payload: NetworkDimensions }
  | { type: 'UPDATE_THEME'; payload: NetworkTheme }
  | { type: 'UPDATE_PERFORMANCE'; payload: Partial<NetworkPerformanceConfig> }
  | { type: 'UPDATE_ACCESSIBILITY'; payload: Partial<NetworkAccessibilityConfig> }
  | { type: 'UPDATE_ANIMATION'; payload: Partial<NetworkAnimationConfig> }
  | { type: 'UPDATE_INTERACTION'; payload: Partial<NetworkInteractionConfig> }
  | { type: 'UPDATE_INTERACTION_STATE'; payload: Partial<NetworkInteractionState> }
  | { type: 'UPDATE_METRICS'; payload: PerformanceMetrics };

// ============================================================================
// Initial State
// ============================================================================

const initialState: NetworkState = {
  nodes: [],
  edges: [],
  dimensions: { width: 800, height: 600, devicePixelRatio: 1 },
  theme: THEME_PRESETS.default,
  performance: DEFAULT_PERFORMANCE_CONFIG,
  accessibility: DEFAULT_ACCESSIBILITY_CONFIG,
  animation: DEFAULT_ANIMATION_CONFIG,
  interaction: DEFAULT_INTERACTION_CONFIG,
  interactionState: {
    selectedNodes: [],
    selectedEdges: [],
    isDragging: false,
    isZooming: false,
    isPanning: false
  },
  metrics: {
    fps: 0,
    frameTime: 0,
    nodeCount: 0,
    edgeCount: 0
  }
};

// ============================================================================
// Reducer
// ============================================================================

function networkReducer(state: NetworkState, action: NetworkAction): NetworkState {
  switch (action.type) {
    case 'UPDATE_NODES':
      return {
        ...state,
        nodes: action.payload,
        metrics: { ...state.metrics, nodeCount: action.payload.length }
      };
      
    case 'UPDATE_EDGES':
      return {
        ...state,
        edges: action.payload,
        metrics: { ...state.metrics, edgeCount: action.payload.length }
      };
      
    case 'UPDATE_DIMENSIONS':
      return { ...state, dimensions: action.payload };
      
    case 'UPDATE_THEME':
      return { ...state, theme: action.payload };
      
    case 'UPDATE_PERFORMANCE':
      return {
        ...state,
        performance: { ...state.performance, ...action.payload }
      };
      
    case 'UPDATE_ACCESSIBILITY':
      return {
        ...state,
        accessibility: { ...state.accessibility, ...action.payload }
      };
      
    case 'UPDATE_ANIMATION':
      return {
        ...state,
        animation: { ...state.animation, ...action.payload }
      };
      
    case 'UPDATE_INTERACTION':
      return {
        ...state,
        interaction: { ...state.interaction, ...action.payload }
      };
      
    case 'UPDATE_INTERACTION_STATE':
      return {
        ...state,
        interactionState: { ...state.interactionState, ...action.payload }
      };
      
    case 'UPDATE_METRICS':
      return { ...state, metrics: action.payload };
      
    default:
      return state;
  }
}

// ============================================================================
// Context Creation
// ============================================================================

const NetworkContext = createContext<NetworkContextValue | null>(null);

// ============================================================================
// Provider Component
// ============================================================================

interface NetworkProviderProps {
  children: ReactNode;
  initialNodes?: NetworkNodeData[];
  initialEdges?: NetworkEdgeData[];
  initialTheme?: NetworkTheme | ThemePreset;
  initialPerformance?: Partial<NetworkPerformanceConfig>;
  initialAccessibility?: Partial<NetworkAccessibilityConfig>;
  initialAnimation?: Partial<NetworkAnimationConfig>;
  initialInteraction?: Partial<NetworkInteractionConfig>;
}

export function NetworkProvider({
  children,
  initialNodes = [],
  initialEdges = [],
  initialTheme = THEME_PRESETS.default,
  initialPerformance = {},
  initialAccessibility = {},
  initialAnimation = {},
  initialInteraction = {}
}: NetworkProviderProps) {
  const [state, dispatch] = useReducer(networkReducer, {
    ...initialState,
    nodes: initialNodes,
    edges: initialEdges,
    theme: typeof initialTheme === 'string' ? THEME_PRESETS[initialTheme] : initialTheme,
    performance: { ...DEFAULT_PERFORMANCE_CONFIG, ...initialPerformance },
    accessibility: { ...DEFAULT_ACCESSIBILITY_CONFIG, ...initialAccessibility },
    animation: { ...DEFAULT_ANIMATION_CONFIG, ...initialAnimation },
    interaction: { ...DEFAULT_INTERACTION_CONFIG, ...initialInteraction }
  });

  // ============================================================================
  // Action Creators
  // ============================================================================

  const updateNodes = useCallback((nodes: NetworkNodeData[]) => {
    dispatch({ type: 'UPDATE_NODES', payload: nodes });
  }, []);

  const updateEdges = useCallback((edges: NetworkEdgeData[]) => {
    dispatch({ type: 'UPDATE_EDGES', payload: edges });
  }, []);

  const updateTheme = useCallback((theme: NetworkTheme | ThemePreset) => {
    const resolvedTheme = typeof theme === 'string' ? THEME_PRESETS[theme] : theme;
    dispatch({ type: 'UPDATE_THEME', payload: resolvedTheme });
  }, []);

  const updatePerformance = useCallback((config: Partial<NetworkPerformanceConfig>) => {
    dispatch({ type: 'UPDATE_PERFORMANCE', payload: config });
  }, []);

  const updateAccessibility = useCallback((config: Partial<NetworkAccessibilityConfig>) => {
    dispatch({ type: 'UPDATE_ACCESSIBILITY', payload: config });
  }, []);

  const updateAnimation = useCallback((config: Partial<NetworkAnimationConfig>) => {
    dispatch({ type: 'UPDATE_ANIMATION', payload: config });
  }, []);

  const updateInteraction = useCallback((config: Partial<NetworkInteractionConfig>) => {
    dispatch({ type: 'UPDATE_INTERACTION', payload: config });
  }, []);

  const updateDimensions = useCallback((dimensions: NetworkDimensions) => {
    dispatch({ type: 'UPDATE_DIMENSIONS', payload: dimensions });
  }, []);

  const updateMetrics = useCallback((metrics: PerformanceMetrics) => {
    dispatch({ type: 'UPDATE_METRICS', payload: metrics });
  }, []);

  // ============================================================================
  // Context Value
  // ============================================================================

  const contextValue: NetworkContextValue = {
    ...state,
    updateNodes,
    updateEdges,
    updateDimensions,
    updateTheme,
    updatePerformance,
    updateAccessibility,
    updateAnimation,
    updateInteraction,
    updateMetrics
  };

  return (
    <NetworkContext.Provider value={contextValue}>
      {children}
    </NetworkContext.Provider>
  );
}

// ============================================================================
// Hook for Using Context
// ============================================================================

export function useNetworkContext(): NetworkContextValue {
  const context = useContext(NetworkContext);
  
  if (!context) {
    throw new Error('useNetworkContext must be used within a NetworkProvider');
  }
  
  return context;
}

// ============================================================================
// Utility Hooks
// ============================================================================

export function useNetworkNodes() {
  const { nodes, updateNodes } = useNetworkContext();
  return { nodes, updateNodes };
}

export function useNetworkEdges() {
  const { edges, updateEdges } = useNetworkContext();
  return { edges, updateEdges };
}

export function useNetworkTheme() {
  const { theme, updateTheme } = useNetworkContext();
  return { theme, updateTheme };
}

export function useNetworkPerformance() {
  const { performance, metrics, updatePerformance } = useNetworkContext();
  return { performance, metrics, updatePerformance };
}
