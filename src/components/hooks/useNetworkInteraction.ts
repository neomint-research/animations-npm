/**
 * @neomint/animations - Network Interaction Hook
 * 
 * Manages user interactions with the network visualization including
 * hover, click, drag, zoom, and pan operations.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useNetworkContext } from '../context/NetworkContext';
import { NetworkNodeData, NetworkEdgeData, NetworkInteractionConfig } from '../types';

interface UseNetworkInteractionConfig {
  config: NetworkInteractionConfig;
  onNodeClick?: (node: NetworkNodeData, event: MouseEvent) => void;
  onNodeHover?: (node: NetworkNodeData | null, event: MouseEvent) => void;
  onEdgeClick?: (edge: NetworkEdgeData, event: MouseEvent) => void;
  onEdgeHover?: (edge: NetworkEdgeData | null, event: MouseEvent) => void;
  onCanvasClick?: (event: MouseEvent) => void;
}

interface InteractionControls {
  hoveredNode: NetworkNodeData | null;
  selectedNodes: NetworkNodeData[];
  hoveredEdge: NetworkEdgeData | null;
  selectedEdges: NetworkEdgeData[];
  isDragging: boolean;
  isZooming: boolean;
  isPanning: boolean;
  selectNode: (node: NetworkNodeData) => void;
  deselectNode: (node: NetworkNodeData) => void;
  clearSelection: () => void;
  enableInteraction: () => void;
  disableInteraction: () => void;
}

export function useNetworkInteraction({
  config,
  onNodeClick,
  onNodeHover,
  onEdgeClick,
  onEdgeHover,
  onCanvasClick
}: UseNetworkInteractionConfig): InteractionControls {
  const { nodes, edges, interactionState, updateInteraction } = useNetworkContext();
  const [hoveredNode, setHoveredNode] = useState<NetworkNodeData | null>(null);
  const [selectedNodes, setSelectedNodes] = useState<NetworkNodeData[]>([]);
  const [hoveredEdge, setHoveredEdge] = useState<NetworkEdgeData | null>(null);
  const [selectedEdges, setSelectedEdges] = useState<NetworkEdgeData[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastPanRef = useRef<{ x: number; y: number } | null>(null);
  
  // ============================================================================
  // Node Selection Management
  // ============================================================================
  
  const selectNode = useCallback((node: NetworkNodeData) => {
    if (!config.select) return;
    
    setSelectedNodes(prev => {
      if (prev.find(n => n.id === node.id)) return prev;
      return [...prev, node];
    });
  }, [config.select]);
  
  const deselectNode = useCallback((node: NetworkNodeData) => {
    setSelectedNodes(prev => prev.filter(n => n.id !== node.id));
  }, []);
  
  const clearSelection = useCallback(() => {
    setSelectedNodes([]);
    setSelectedEdges([]);
  }, []);
  
  // ============================================================================
  // Interaction State Management
  // ============================================================================
  
  const enableInteraction = useCallback(() => {
    updateInteraction({ enabled: true });
  }, [updateInteraction]);
  
  const disableInteraction = useCallback(() => {
    updateInteraction({ enabled: false });
    clearSelection();
    setHoveredNode(null);
    setHoveredEdge(null);
  }, [updateInteraction, clearSelection]);
  
  // ============================================================================
  // Mouse Event Handlers
  // ============================================================================
  
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!config.enabled || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Handle dragging
    if (isDragging && dragStartRef.current && config.drag) {
      const deltaX = x - dragStartRef.current.x;
      const deltaY = y - dragStartRef.current.y;
      
      // Update selected nodes positions
      selectedNodes.forEach(node => {
        node.x += deltaX;
        node.y += deltaY;
      });
      
      dragStartRef.current = { x, y };
      return;
    }
    
    // Handle panning
    if (isPanning && lastPanRef.current && config.pan) {
      const deltaX = x - lastPanRef.current.x;
      const deltaY = y - lastPanRef.current.y;
      
      // Update all nodes positions for panning effect
      nodes.forEach(node => {
        node.x += deltaX;
        node.y += deltaY;
      });
      
      lastPanRef.current = { x, y };
      return;
    }
    
    // Handle hover detection
    if (config.hover) {
      // Find hovered node
      const hoveredNode = nodes.find(node => {
        const distance = Math.sqrt(
          Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2)
        );
        return distance <= (node.radius || 4);
      });
      
      if (hoveredNode !== hoveredNode) {
        setHoveredNode(hoveredNode || null);
        onNodeHover?.(hoveredNode || null, event);
      }
      
      // Find hovered edge (simplified detection)
      if (!hoveredNode) {
        const hoveredEdge = edges.find(edge => {
          const sourceNode = nodes.find(n => n.id === edge.source);
          const targetNode = nodes.find(n => n.id === edge.target);
          
          if (!sourceNode || !targetNode) return false;
          
          // Simple line distance calculation
          const lineLength = Math.sqrt(
            Math.pow(targetNode.x - sourceNode.x, 2) + 
            Math.pow(targetNode.y - sourceNode.y, 2)
          );
          
          const distanceToLine = Math.abs(
            (targetNode.y - sourceNode.y) * x - 
            (targetNode.x - sourceNode.x) * y + 
            targetNode.x * sourceNode.y - 
            targetNode.y * sourceNode.x
          ) / lineLength;
          
          return distanceToLine <= 5; // 5px tolerance
        });
        
        if (hoveredEdge !== hoveredEdge) {
          setHoveredEdge(hoveredEdge || null);
          onEdgeHover?.(hoveredEdge || null, event);
        }
      }
    }
  }, [
    config,
    isDragging,
    isPanning,
    selectedNodes,
    nodes,
    edges,
    onNodeHover,
    onEdgeHover
  ]);
  
  const handleMouseDown = useCallback((event: MouseEvent) => {
    if (!config.enabled || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Check if clicking on a node
    const clickedNode = nodes.find(node => {
      const distance = Math.sqrt(
        Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2)
      );
      return distance <= (node.radius || 4);
    });
    
    if (clickedNode && config.click) {
      onNodeClick?.(clickedNode, event);
      
      if (config.select) {
        if (event.ctrlKey || event.metaKey) {
          // Multi-select
          if (selectedNodes.find(n => n.id === clickedNode.id)) {
            deselectNode(clickedNode);
          } else {
            selectNode(clickedNode);
          }
        } else {
          // Single select
          setSelectedNodes([clickedNode]);
        }
      }
      
      if (config.drag) {
        setIsDragging(true);
        dragStartRef.current = { x, y };
      }
    } else {
      // Clicked on canvas
      onCanvasClick?.(event);
      
      if (!event.ctrlKey && !event.metaKey) {
        clearSelection();
      }
      
      if (config.pan) {
        setIsPanning(true);
        lastPanRef.current = { x, y };
      }
    }
  }, [
    config,
    nodes,
    onNodeClick,
    onCanvasClick,
    selectedNodes,
    selectNode,
    deselectNode,
    clearSelection
  ]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsPanning(false);
    dragStartRef.current = null;
    lastPanRef.current = null;
  }, []);
  
  const handleWheel = useCallback((event: WheelEvent) => {
    if (!config.enabled || !config.zoom) return;
    
    event.preventDefault();
    setIsZooming(true);
    
    const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
    
    // Simple zoom implementation - scale all node positions
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      nodes.forEach(node => {
        node.x = centerX + (node.x - centerX) * zoomFactor;
        node.y = centerY + (node.y - centerY) * zoomFactor;
        if (node.radius) {
          node.radius *= zoomFactor;
        }
      });
    }
    
    // Reset zoom state after a delay
    setTimeout(() => setIsZooming(false), 100);
  }, [config, nodes]);
  
  // ============================================================================
  // Event Listener Setup
  // ============================================================================
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !config.enabled) return;
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel);
    
    // Global mouse up to handle dragging outside canvas
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    config.enabled,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleWheel
  ]);
  
  // ============================================================================
  // Canvas Reference Setup
  // ============================================================================
  
  useEffect(() => {
    // This would be set by the NetworkCanvas component
    // For now, we'll assume it's available through a ref or context
  }, []);
  
  // ============================================================================
  // Return Controls
  // ============================================================================
  
  return {
    hoveredNode,
    selectedNodes,
    hoveredEdge,
    selectedEdges,
    isDragging,
    isZooming,
    isPanning,
    selectNode,
    deselectNode,
    clearSelection,
    enableInteraction,
    disableInteraction
  };
}
