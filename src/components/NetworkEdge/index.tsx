/**
 * @neomint/animations - Network Edge Component
 * 
 * Individual edge component for the network visualization.
 * Handles rendering and interactions for connections between nodes.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import React from 'react';
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

export const NetworkEdge: React.FC<NetworkEdgeProps> = ({
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
