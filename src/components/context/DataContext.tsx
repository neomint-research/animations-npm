/**
 * @neomint/animations - Data Context
 * 
 * Manages nodes and edges data state separately from other concerns.
 * Part of the split context architecture for better performance.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import React, { createContext, useContext, useCallback, useMemo, useReducer, ReactNode } from 'react';
import { NetworkNodeData, NetworkEdgeData, NetworkDimensions } from '../types';

// ============================================================================
// Data State and Actions
// ============================================================================

interface DataState {
  nodes: NetworkNodeData[];
  edges: NetworkEdgeData[];
  dimensions: NetworkDimensions;
}

interface DataActions {
  updateNodes: (nodes: NetworkNodeData[]) => void;
  updateEdges: (edges: NetworkEdgeData[]) => void;
  updateDimensions: (dimensions: Partial<NetworkDimensions>) => void;
  addNode: (node: NetworkNodeData) => void;
  removeNode: (nodeId: string) => void;
  addEdge: (edge: NetworkEdgeData) => void;
  removeEdge: (edgeId: string) => void;
}

type DataContextValue = DataState & DataActions;

// ============================================================================
// Context Creation
// ============================================================================

const DataContext = createContext<DataContextValue | null>(null);

// ============================================================================
// Reducer
// ============================================================================

type DataAction =
  | { type: 'UPDATE_NODES'; payload: NetworkNodeData[] }
  | { type: 'UPDATE_EDGES'; payload: NetworkEdgeData[] }
  | { type: 'UPDATE_DIMENSIONS'; payload: Partial<NetworkDimensions> }
  | { type: 'ADD_NODE'; payload: NetworkNodeData }
  | { type: 'REMOVE_NODE'; payload: string }
  | { type: 'ADD_EDGE'; payload: NetworkEdgeData }
  | { type: 'REMOVE_EDGE'; payload: string };

function dataReducer(state: DataState, action: DataAction): DataState {
  switch (action.type) {
    case 'UPDATE_NODES':
      return { ...state, nodes: action.payload };
    case 'UPDATE_EDGES':
      return { ...state, edges: action.payload };
    case 'UPDATE_DIMENSIONS':
      return { ...state, dimensions: { ...state.dimensions, ...action.payload } };
    case 'ADD_NODE':
      return { ...state, nodes: [...state.nodes, action.payload] };
    case 'REMOVE_NODE':
      return { 
        ...state, 
        nodes: state.nodes.filter(node => node.id !== action.payload),
        edges: state.edges.filter(edge => edge.source !== action.payload && edge.target !== action.payload)
      };
    case 'ADD_EDGE':
      return { ...state, edges: [...state.edges, action.payload] };
    case 'REMOVE_EDGE':
      return { ...state, edges: state.edges.filter(edge => edge.id !== action.payload) };
    default:
      return state;
  }
}

// ============================================================================
// Provider Component
// ============================================================================

interface DataProviderProps {
  children: ReactNode;
  initialNodes?: NetworkNodeData[];
  initialEdges?: NetworkEdgeData[];
  initialDimensions?: NetworkDimensions;
}

const initialState: DataState = {
  nodes: [],
  edges: [],
  dimensions: { width: 800, height: 600, devicePixelRatio: 1 }
};

export function DataProvider({
  children,
  initialNodes = [],
  initialEdges = [],
  initialDimensions = initialState.dimensions
}: DataProviderProps) {
  const [state, dispatch] = useReducer(dataReducer, {
    nodes: initialNodes,
    edges: initialEdges,
    dimensions: initialDimensions
  });

  // ============================================================================
  // Actions
  // ============================================================================

  const updateNodes = useCallback((nodes: NetworkNodeData[]) => {
    dispatch({ type: 'UPDATE_NODES', payload: nodes });
  }, []);

  const updateEdges = useCallback((edges: NetworkEdgeData[]) => {
    dispatch({ type: 'UPDATE_EDGES', payload: edges });
  }, []);

  const updateDimensions = useCallback((dimensions: Partial<NetworkDimensions>) => {
    dispatch({ type: 'UPDATE_DIMENSIONS', payload: dimensions });
  }, []);

  const addNode = useCallback((node: NetworkNodeData) => {
    dispatch({ type: 'ADD_NODE', payload: node });
  }, []);

  const removeNode = useCallback((nodeId: string) => {
    dispatch({ type: 'REMOVE_NODE', payload: nodeId });
  }, []);

  const addEdge = useCallback((edge: NetworkEdgeData) => {
    dispatch({ type: 'ADD_EDGE', payload: edge });
  }, []);

  const removeEdge = useCallback((edgeId: string) => {
    dispatch({ type: 'REMOVE_EDGE', payload: edgeId });
  }, []);

  // ============================================================================
  // Context Value
  // ============================================================================

  const contextValue: DataContextValue = useMemo(() => ({
    ...state,
    updateNodes,
    updateEdges,
    updateDimensions,
    addNode,
    removeNode,
    addEdge,
    removeEdge
  }), [state, updateNodes, updateEdges, updateDimensions, addNode, removeNode, addEdge, removeEdge]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}

// ============================================================================
// Hook
// ============================================================================

export function useDataContext(): DataContextValue {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
}
