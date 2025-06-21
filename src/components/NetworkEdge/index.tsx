/**
 * @neomint/animations - Network Edge Component
 * 
 * Individual edge component for the network visualization.
 * Handles rendering and interactions for connections between nodes.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import React, { memo } from 'react';
import { NetworkEdgeData, NetworkNodeData } from '../types';

interface NetworkEdgeProps {
  edge: NetworkEdgeData;
  sourceNode: NetworkNodeData;
  targetNode: NetworkNodeData;
  isSelected?: boolean;
  isHovered?: boolean;
  onClick?: (edge: NetworkEdgeData) => void;
  onHover?: (edge: NetworkEdgeData | null) => void;
}

const NetworkEdgeComponent: React.FC<NetworkEdgeProps> = ({
  edge,
  sourceNode,
  targetNode,
  isSelected = false,
  isHovered = false,
  onClick,
  onHover
}) => {
  return (
    <line
      x1={sourceNode.x}
      y1={sourceNode.y}
      x2={targetNode.x}
      y2={targetNode.y}
      stroke={edge.color || '#95a5a6'}
      strokeWidth={edge.width || 1}
      className={`network-edge ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
      onClick={() => onClick?.(edge)}
      onMouseEnter={() => onHover?.(edge)}
      onMouseLeave={() => onHover?.(null)}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease'
      }}
    />
  );
};

// Memoize for performance optimization
export const NetworkEdge = memo(NetworkEdgeComponent, (prevProps, nextProps) => {
  return (
    prevProps.sourceNode.x === nextProps.sourceNode.x &&
    prevProps.sourceNode.y === nextProps.sourceNode.y &&
    prevProps.targetNode.x === nextProps.targetNode.x &&
    prevProps.targetNode.y === nextProps.targetNode.y &&
    prevProps.edge.color === nextProps.edge.color &&
    prevProps.edge.width === nextProps.edge.width &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.isHovered === nextProps.isHovered
  );
});
