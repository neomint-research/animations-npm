/**
 * @neomint/animations - Modern DataNetwork Component
 * 
 * A modern, TypeScript-based implementation of the DataNetwork component
 * with improved performance, type safety, and developer experience.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { NetworkProvider } from '../context/NetworkContext';
import { NetworkCanvas } from '../NetworkCanvas';
import { NetworkContainer } from '../layout/NetworkContainer';
import { useNetworkAnimation } from '../hooks/useNetworkAnimation';
import { useNetworkPerformance } from '../hooks/useNetworkPerformance';
import { useNetworkAccessibility } from '../hooks/useNetworkAccessibility';
import { useNetworkTheme } from '../hooks/useNetworkTheme';
import { 
  NetworkProps, 
  NetworkNodeData, 
  NetworkEdgeData,
  NetworkTheme,
  ThemePreset 
} from '../types';
import { THEME_PRESETS, NETWORK_DEFAULTS } from '../constants';

// ============================================================================
// Component Implementation
// ============================================================================

export interface DataNetworkRef {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  reset: () => void;
  getStats: () => any;
  getPerformanceInfo: () => any;
  updateTheme: (theme: NetworkTheme | ThemePreset) => void;
  getCanvas: () => HTMLCanvasElement | null;
}

const DataNetworkInner = forwardRef<DataNetworkRef, NetworkProps>(({
  // Data props
  nodes = [],
  edges = [],
  
  // Dimension props
  width = NETWORK_DEFAULTS.width,
  height = NETWORK_DEFAULTS.height,
  
  // Styling props
  className,
  style,
  
  // Theme props
  theme = 'default',
  themeMode = 'auto',
  preset, // Legacy compatibility
  
  // Performance props
  performance = {},
  
  // Accessibility props
  accessibility = {},
  
  // Animation props
  animation = {},
  
  // Interaction props
  interaction = {},
  
  // Event handlers
  onNodeClick,
  onNodeHover,
  onEdgeClick,
  onEdgeHover,
  onCanvasClick,
  onPerformanceChange,
  onThemeChange,
  onAnimationComplete,
  onError,
  
  // Legacy compatibility props
  nodeCount,
  animationSpeed,
  connectionDistance,
  nodeRadius,
  lineWidth,
  nodeColor,
  lineColor,
  backgroundColor,
  opacity,
  
  // Advanced props
  children,
  debug = false,
  
  ...restProps
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // ============================================================================
  // Resolve Theme
  // ============================================================================
  
  const resolvedTheme = React.useMemo(() => {
    // Priority: theme prop > preset prop > default
    const themeToUse = theme || preset || 'default';
    
    if (typeof themeToUse === 'string') {
      return THEME_PRESETS[themeToUse as ThemePreset] || THEME_PRESETS.default;
    }
    
    return themeToUse;
  }, [theme, preset]);
  
  // ============================================================================
  // Generate Nodes if nodeCount is provided (legacy compatibility)
  // ============================================================================
  
  const generatedNodes = React.useMemo(() => {
    if (nodes.length > 0) return nodes;
    
    if (nodeCount && nodeCount > 0) {
      const canvasWidth = typeof width === 'number' ? width : NETWORK_DEFAULTS.width;
      const canvasHeight = typeof height === 'number' ? height : NETWORK_DEFAULTS.height;
      
      return Array.from({ length: nodeCount }, (_, i) => ({
        id: `node-${i}`,
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        vx: (Math.random() - 0.5) * (animationSpeed || NETWORK_DEFAULTS.animationSpeed),
        vy: (Math.random() - 0.5) * (animationSpeed || NETWORK_DEFAULTS.animationSpeed),
        radius: typeof nodeRadius === 'object' 
          ? Math.random() * (nodeRadius.max - nodeRadius.min) + nodeRadius.min
          : nodeRadius || 4
      }));
    }
    
    return [];
  }, [nodes, nodeCount, width, height, animationSpeed, nodeRadius]);
  
  // ============================================================================
  // Merge Legacy Props with Modern Config
  // ============================================================================
  
  const mergedPerformance = React.useMemo(() => ({
    maxFPS: 60,
    enableGPUAcceleration: true,
    adaptiveQuality: true,
    performanceTier: 'auto' as const,
    ...performance
  }), [performance]);
  
  const mergedAccessibility = React.useMemo(() => ({
    respectMotion: true,
    enableKeyboardNavigation: true,
    enableScreenReader: true,
    ...accessibility
  }), [accessibility]);
  
  const mergedAnimation = React.useMemo(() => ({
    enabled: true,
    autoPlay: true,
    speed: animationSpeed || NETWORK_DEFAULTS.animationSpeed,
    ...animation
  }), [animation, animationSpeed]);
  
  const mergedInteraction = React.useMemo(() => ({
    enabled: true,
    hover: true,
    click: true,
    ...interaction
  }), [interaction]);
  
  // ============================================================================
  // Custom Hooks
  // ============================================================================
  
  const animationControls = useNetworkAnimation({
    enabled: mergedAnimation.enabled,
    autoPlay: mergedAnimation.autoPlay,
    onAnimationComplete
  });
  
  const performanceMonitor = useNetworkPerformance({
    config: mergedPerformance,
    onPerformanceChange
  });
  
  const accessibilityManager = useNetworkAccessibility({
    config: mergedAccessibility
  });
  
  const themeManager = useNetworkTheme({
    theme: resolvedTheme,
    mode: themeMode,
    onThemeChange
  });
  
  // ============================================================================
  // Imperative Handle
  // ============================================================================
  
  useImperativeHandle(ref, () => ({
    play: () => animationControls.play(),
    pause: () => animationControls.pause(),
    toggle: () => animationControls.toggle(),
    reset: () => animationControls.reset(),
    getStats: () => performanceMonitor.getStats(),
    getPerformanceInfo: () => performanceMonitor.getPerformanceInfo(),
    updateTheme: (newTheme: NetworkTheme | ThemePreset) => {
      themeManager.updateTheme(newTheme);
    },
    getCanvas: () => canvasRef.current
  }), [animationControls, performanceMonitor, themeManager]);
  
  // ============================================================================
  // Error Handling
  // ============================================================================
  
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const error = new Error(event.message);
      error.name = event.error?.name || 'NetworkError';
      if (debug) {
        console.error('[DataNetwork] Error:', error);
      }
      onError?.(error);
    };

    // Set up global error handling for the component
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, [debug, onError]);
  
  // ============================================================================
  // Render
  // ============================================================================
  
  return (
    <NetworkContainer
      width={width}
      height={height}
      className={className}
      style={style}
      theme={resolvedTheme}
      {...restProps}
    >
      <NetworkCanvas
        ref={canvasRef}
        nodes={generatedNodes}
        edges={edges}
        theme={resolvedTheme}
        performance={mergedPerformance}
        accessibility={mergedAccessibility}
        animation={mergedAnimation}
        interaction={mergedInteraction}
        onNodeClick={onNodeClick}
        onNodeHover={onNodeHover}
        onEdgeClick={onEdgeClick}
        onEdgeHover={onEdgeHover}
        onCanvasClick={onCanvasClick}
        debug={debug}
        // Legacy prop overrides
        nodeColor={nodeColor}
        lineColor={lineColor}
        backgroundColor={backgroundColor}
        opacity={opacity}
        lineWidth={lineWidth}
        connectionDistance={connectionDistance}
      />
      {children}
    </NetworkContainer>
  );
});

DataNetworkInner.displayName = 'DataNetwork';

// ============================================================================
// Main Component with Provider
// ============================================================================

export const DataNetwork = forwardRef<DataNetworkRef, NetworkProps>((props, ref) => {
  const {
    nodes = [],
    edges = [],
    theme = 'default',
    performance = {},
    accessibility = {},
    animation = {},
    interaction = {},
    preset,
    ...restProps
  } = props;
  
  // Resolve theme for provider
  const resolvedTheme = React.useMemo(() => {
    const themeToUse = theme || preset || 'default';
    return typeof themeToUse === 'string' ? themeToUse : themeToUse;
  }, [theme, preset]);
  
  return (
    <NetworkProvider
      initialNodes={nodes}
      initialEdges={edges}
      initialTheme={resolvedTheme}
      initialPerformance={performance}
      initialAccessibility={accessibility}
      initialAnimation={animation}
      initialInteraction={interaction}
    >
      <DataNetworkInner ref={ref} {...props} />
    </NetworkProvider>
  );
});

DataNetwork.displayName = 'DataNetwork';

export default DataNetwork;
