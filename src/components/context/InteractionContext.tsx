/**
 * @neomint/animations - Interaction Context
 * 
 * Manages user interaction state and event handling.
 * Part of the split context architecture for better performance.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import React, { createContext, useContext, useCallback, useMemo, useReducer, ReactNode } from 'react';
import { NetworkInteractionConfig, NetworkInteractionState } from '../types';
import { DEFAULT_INTERACTION_CONFIG } from '../constants';

// ============================================================================
// Interaction State and Actions
// ============================================================================

interface InteractionContextState {
  config: NetworkInteractionConfig;
  state: NetworkInteractionState;
}

interface InteractionActions {
  updateConfig: (config: Partial<NetworkInteractionConfig>) => void;
  setSelectedNodes: (nodeIds: string[]) => void;
  setSelectedEdges: (edgeIds: string[]) => void;
  setDragging: (isDragging: boolean) => void;
  setZooming: (isZooming: boolean) => void;
  setPanning: (isPanning: boolean) => void;
  clearSelection: () => void;
  toggleNodeSelection: (nodeId: string) => void;
  toggleEdgeSelection: (edgeId: string) => void;
}

type InteractionContextValue = InteractionContextState & InteractionActions;

// ============================================================================
// Context Creation
// ============================================================================

const InteractionContext = createContext<InteractionContextValue | null>(null);

// ============================================================================
// Reducer
// ============================================================================

type InteractionAction =
  | { type: 'UPDATE_CONFIG'; payload: Partial<NetworkInteractionConfig> }
  | { type: 'SET_SELECTED_NODES'; payload: string[] }
  | { type: 'SET_SELECTED_EDGES'; payload: string[] }
  | { type: 'SET_DRAGGING'; payload: boolean }
  | { type: 'SET_ZOOMING'; payload: boolean }
  | { type: 'SET_PANNING'; payload: boolean }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'TOGGLE_NODE_SELECTION'; payload: string }
  | { type: 'TOGGLE_EDGE_SELECTION'; payload: string };

function interactionReducer(state: InteractionContextState, action: InteractionAction): InteractionContextState {
  switch (action.type) {
    case 'UPDATE_CONFIG':
      return { ...state, config: { ...state.config, ...action.payload } };
    case 'SET_SELECTED_NODES':
      return { ...state, state: { ...state.state, selectedNodes: action.payload } };
    case 'SET_SELECTED_EDGES':
      return { ...state, state: { ...state.state, selectedEdges: action.payload } };
    case 'SET_DRAGGING':
      return { ...state, state: { ...state.state, isDragging: action.payload } };
    case 'SET_ZOOMING':
      return { ...state, state: { ...state.state, isZooming: action.payload } };
    case 'SET_PANNING':
      return { ...state, state: { ...state.state, isPanning: action.payload } };
    case 'CLEAR_SELECTION':
      return { ...state, state: { ...state.state, selectedNodes: [], selectedEdges: [] } };
    case 'TOGGLE_NODE_SELECTION':
      const currentNodes = state.state.selectedNodes;
      const nodeExists = currentNodes.includes(action.payload);
      return {
        ...state,
        state: {
          ...state.state,
          selectedNodes: nodeExists
            ? currentNodes.filter(id => id !== action.payload)
            : [...currentNodes, action.payload]
        }
      };
    case 'TOGGLE_EDGE_SELECTION':
      const currentEdges = state.state.selectedEdges;
      const edgeExists = currentEdges.includes(action.payload);
      return {
        ...state,
        state: {
          ...state.state,
          selectedEdges: edgeExists
            ? currentEdges.filter(id => id !== action.payload)
            : [...currentEdges, action.payload]
        }
      };
    default:
      return state;
  }
}

// ============================================================================
// Provider Component
// ============================================================================

interface InteractionProviderProps {
  children: ReactNode;
  initialConfig?: Partial<NetworkInteractionConfig>;
}

const initialState: InteractionContextState = {
  config: DEFAULT_INTERACTION_CONFIG,
  state: {
    selectedNodes: [],
    selectedEdges: [],
    isDragging: false,
    isZooming: false,
    isPanning: false
  }
};

export function InteractionProvider({
  children,
  initialConfig = {}
}: InteractionProviderProps) {
  const [state, dispatch] = useReducer(interactionReducer, {
    ...initialState,
    config: { ...DEFAULT_INTERACTION_CONFIG, ...initialConfig }
  });

  // ============================================================================
  // Actions
  // ============================================================================

  const updateConfig = useCallback((config: Partial<NetworkInteractionConfig>) => {
    dispatch({ type: 'UPDATE_CONFIG', payload: config });
  }, []);

  const setSelectedNodes = useCallback((nodeIds: string[]) => {
    dispatch({ type: 'SET_SELECTED_NODES', payload: nodeIds });
  }, []);

  const setSelectedEdges = useCallback((edgeIds: string[]) => {
    dispatch({ type: 'SET_SELECTED_EDGES', payload: edgeIds });
  }, []);

  const setDragging = useCallback((isDragging: boolean) => {
    dispatch({ type: 'SET_DRAGGING', payload: isDragging });
  }, []);

  const setZooming = useCallback((isZooming: boolean) => {
    dispatch({ type: 'SET_ZOOMING', payload: isZooming });
  }, []);

  const setPanning = useCallback((isPanning: boolean) => {
    dispatch({ type: 'SET_PANNING', payload: isPanning });
  }, []);

  const clearSelection = useCallback(() => {
    dispatch({ type: 'CLEAR_SELECTION' });
  }, []);

  const toggleNodeSelection = useCallback((nodeId: string) => {
    dispatch({ type: 'TOGGLE_NODE_SELECTION', payload: nodeId });
  }, []);

  const toggleEdgeSelection = useCallback((edgeId: string) => {
    dispatch({ type: 'TOGGLE_EDGE_SELECTION', payload: edgeId });
  }, []);

  // ============================================================================
  // Context Value
  // ============================================================================

  const contextValue: InteractionContextValue = useMemo(() => ({
    ...state,
    updateConfig,
    setSelectedNodes,
    setSelectedEdges,
    setDragging,
    setZooming,
    setPanning,
    clearSelection,
    toggleNodeSelection,
    toggleEdgeSelection
  }), [
    state,
    updateConfig,
    setSelectedNodes,
    setSelectedEdges,
    setDragging,
    setZooming,
    setPanning,
    clearSelection,
    toggleNodeSelection,
    toggleEdgeSelection
  ]);

  return (
    <InteractionContext.Provider value={contextValue}>
      {children}
    </InteractionContext.Provider>
  );
}

// ============================================================================
// Hook
// ============================================================================

export function useInteractionContext(): InteractionContextValue {
  const context = useContext(InteractionContext);
  if (!context) {
    throw new Error('useInteractionContext must be used within an InteractionProvider');
  }
  return context;
}
