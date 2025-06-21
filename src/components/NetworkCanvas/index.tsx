/**
 * @neomint/animations - Network Canvas Component
 * 
 * The core canvas component that handles the actual rendering of the network.
 * Optimized for performance with modern React patterns.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import React, { forwardRef, useRef, useEffect, useCallback } from 'react';
import { useNetworkContext } from '../context/NetworkContext';
import {
  NetworkNodeData,
  NetworkEdgeData,
  NetworkTheme,
  NetworkPerformanceConfig,
  NetworkAccessibilityConfig,
  NetworkAnimationConfig,
  NetworkInteractionConfig
} from '../types';

// ============================================================================
// Component Props
// ============================================================================

interface NetworkCanvasProps {
  nodes: NetworkNodeData[];
  edges: NetworkEdgeData[];
  theme: NetworkTheme;
  performance: NetworkPerformanceConfig;
  accessibility: NetworkAccessibilityConfig;
  animation: NetworkAnimationConfig;
  interaction: NetworkInteractionConfig;
  
  // Event handlers
  onNodeClick?: (node: NetworkNodeData, event: MouseEvent) => void;
  onNodeHover?: (node: NetworkNodeData | null, event: MouseEvent) => void;
  onEdgeClick?: (edge: NetworkEdgeData, event: MouseEvent) => void;
  onEdgeHover?: (edge: NetworkEdgeData | null, event: MouseEvent) => void;
  onCanvasClick?: (event: MouseEvent) => void;
  
  // Legacy overrides
  nodeColor?: string;
  lineColor?: string;
  backgroundColor?: string;
  opacity?: number;
  lineWidth?: number;
  connectionDistance?: number;
  
  // Debug
  debug?: boolean;
}

// ============================================================================
// Component Implementation
// ============================================================================

export const NetworkCanvas = forwardRef<HTMLCanvasElement, NetworkCanvasProps>(({
  nodes,
  edges,
  theme,
  performance,
  accessibility,
  animation,
  interaction,
  onNodeClick,
  onNodeHover,
  onEdgeClick,
  onEdgeHover,
  onCanvasClick,
  nodeColor,
  lineColor,
  backgroundColor,
  opacity = 1,
  lineWidth = 1,
  connectionDistance = 120,
  debug = false
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const nodesRef = useRef<NetworkNodeData[]>(nodes);
  const isPlayingRef = useRef<boolean>(animation.autoPlay || false);
  
  const { dimensions, updateMetrics } = useNetworkContext();
  
  // ============================================================================
  // Update nodes reference when props change
  // ============================================================================
  
  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);
  
  // ============================================================================
  // Canvas Setup and Resize Handling
  // ============================================================================
  
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { width, height, devicePixelRatio = 1 } = dimensions;
    
    // Set canvas size
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    // Scale context for high DPI displays
    ctx.scale(devicePixelRatio, devicePixelRatio);
    
    // Apply performance optimizations
    if (performance.enableGPUAcceleration) {
      canvas.style.willChange = 'transform';
      ctx.imageSmoothingEnabled = false;
    }
    
    return ctx;
  }, [dimensions, performance.enableGPUAcceleration]);
  
  // ============================================================================
  // Animation Loop
  // ============================================================================
  
  const animate = useCallback((currentTime: number) => {
    if (!isPlayingRef.current || !animation.enabled) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    // FPS limiting
    if (lastFrameTimeRef.current) {
      const deltaTime = currentTime - lastFrameTimeRef.current;
      const targetFrameTime = 1000 / (performance.maxFPS || 60);
      
      if (deltaTime < targetFrameTime) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      // Update performance metrics
      const fps = Math.round(1000 / deltaTime);
      updateMetrics({
        fps,
        frameTime: deltaTime,
        nodeCount: nodesRef.current.length,
        edgeCount: edges.length
      });
    }
    
    lastFrameTimeRef.current = currentTime;
    frameCountRef.current++;
    
    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    
    // Apply background color
    const bgColor = backgroundColor || theme.backgroundColor;
    if (bgColor && bgColor !== 'transparent') {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
    }
    
    // Update node positions if animation is enabled
    if (animation.enabled && animation.nodeAnimation?.enabled) {
      nodesRef.current.forEach(node => {
        if (node.vx !== undefined && node.vy !== undefined) {
          node.x += node.vx * (animation.speed || 1);
          node.y += node.vy * (animation.speed || 1);
          
          // Bounce off edges
          if (node.x <= 0 || node.x >= dimensions.width) node.vx *= -1;
          if (node.y <= 0 || node.y >= dimensions.height) node.vy *= -1;
          
          // Keep nodes in bounds
          node.x = Math.max(node.radius || 4, Math.min(dimensions.width - (node.radius || 4), node.x));
          node.y = Math.max(node.radius || 4, Math.min(dimensions.height - (node.radius || 4), node.y));
        }
      });
    }
    
    // Draw edges
    if (edges.length > 0) {
      drawEdges(ctx);
    } else {
      // Generate connections based on distance (legacy behavior)
      drawGeneratedConnections(ctx);
    }
    
    // Draw nodes
    drawNodes(ctx);
    
    // Continue animation
    if (isPlayingRef.current && animation.enabled) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [
    animation,
    performance,
    dimensions,
    edges,
    theme,
    backgroundColor,
    updateMetrics
  ]);
  
  // ============================================================================
  // Drawing Functions
  // ============================================================================
  
  const drawNodes = useCallback((ctx: CanvasRenderingContext2D) => {
    const effectiveNodeColor = nodeColor || theme.nodeColor;
    const globalOpacity = opacity;
    
    nodesRef.current.forEach(node => {
      ctx.globalAlpha = globalOpacity;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius || 4, 0, Math.PI * 2);
      ctx.fillStyle = node.color || effectiveNodeColor;
      ctx.fill();
      
      // Add shadow if theme supports it
      if (theme.shadows?.node) {
        ctx.shadowColor = theme.shadows.node;
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;
      }
    });
    
    ctx.globalAlpha = 1;
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }, [nodeColor, theme, opacity]);
  
  const drawEdges = useCallback((ctx: CanvasRenderingContext2D) => {
    const effectiveLineColor = lineColor || theme.edgeColor;
    
    ctx.strokeStyle = effectiveLineColor;
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = opacity * 0.6;
    
    edges.forEach(edge => {
      const sourceNode = nodesRef.current.find(n => n.id === edge.source);
      const targetNode = nodesRef.current.find(n => n.id === edge.target);
      
      if (sourceNode && targetNode) {
        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        ctx.stroke();
      }
    });
    
    ctx.globalAlpha = 1;
  }, [edges, lineColor, theme, lineWidth, opacity]);
  
  const drawGeneratedConnections = useCallback((ctx: CanvasRenderingContext2D) => {
    const effectiveLineColor = lineColor || theme.edgeColor;
    
    ctx.strokeStyle = effectiveLineColor;
    ctx.lineWidth = lineWidth;
    
    for (let i = 0; i < nodesRef.current.length; i++) {
      for (let j = i + 1; j < nodesRef.current.length; j++) {
        const nodeA = nodesRef.current[i];
        const nodeB = nodesRef.current[j];
        const distance = Math.sqrt(
          Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2)
        );
        
        if (distance < connectionDistance) {
          const alpha = (1 - distance / connectionDistance) * opacity * 0.3;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.stroke();
        }
      }
    }
    
    ctx.globalAlpha = 1;
  }, [lineColor, theme, lineWidth, connectionDistance, opacity]);
  
  // ============================================================================
  // Lifecycle Effects
  // ============================================================================
  
  useEffect(() => {
    const ctx = setupCanvas();
    if (!ctx) return;
    
    // Start animation if enabled
    if (animation.enabled && animation.autoPlay) {
      isPlayingRef.current = true;
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Render static frame
      animate(window.performance?.now?.() || Date.now());
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [setupCanvas, animate, animation.enabled, animation.autoPlay]);
  
  // ============================================================================
  // Expose canvas ref
  // ============================================================================
  
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(canvasRef.current);
      } else {
        ref.current = canvasRef.current;
      }
    }
  }, [ref]);
  
  // ============================================================================
  // Render
  // ============================================================================
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100%',
        height: '100%'
      }}
      role="img"
      aria-label={accessibility.ariaLabels?.network || 'Interactive network visualization'}
    />
  );
});

NetworkCanvas.displayName = 'NetworkCanvas';
