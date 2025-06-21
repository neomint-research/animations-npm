/**
 * @neomint/animations - Performance Indicator Component
 * 
 * Displays real-time performance metrics for the network visualization.
 * Useful for debugging and optimization.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import React from 'react';
import { useNetworkContext } from '../context/NetworkContext';

interface PerformanceIndicatorProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showFPS?: boolean;
  showNodeCount?: boolean;
  showEdgeCount?: boolean;
  showFrameTime?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const PerformanceIndicator: React.FC<PerformanceIndicatorProps> = ({
  position = 'top-right',
  showFPS = true,
  showNodeCount = true,
  showEdgeCount = true,
  showFrameTime = false,
  className = '',
  style = {}
}) => {
  const { metrics } = useNetworkContext();
  
  const positionStyles: Record<string, React.CSSProperties> = {
    'top-left': { top: 10, left: 10 },
    'top-right': { top: 10, right: 10 },
    'bottom-left': { bottom: 10, left: 10 },
    'bottom-right': { bottom: 10, right: 10 }
  };
  
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    ...positionStyles[position],
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'monospace',
    zIndex: 1000,
    ...style
  };
  
  return (
    <div className={`performance-indicator ${className}`} style={containerStyle}>
      {showFPS && <div>FPS: {metrics.fps}</div>}
      {showNodeCount && <div>Nodes: {metrics.nodeCount}</div>}
      {showEdgeCount && <div>Edges: {metrics.edgeCount}</div>}
      {showFrameTime && <div>Frame: {metrics.frameTime.toFixed(1)}ms</div>}
    </div>
  );
};
