/**
 * @neomint/animations - Network Node Component
 * 
 * Individual node component for the network visualization.
 * Handles rendering, interactions, and animations for single nodes.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import React, { memo } from 'react';
import { NetworkNodeData } from '../types';

interface NetworkNodeProps {
  node: NetworkNodeData;
  isSelected?: boolean;
  isHovered?: boolean;
  onClick?: (node: NetworkNodeData) => void;
  onHover?: (node: NetworkNodeData | null) => void;
}

const NetworkNodeComponent: React.FC<NetworkNodeProps> = ({
  node,
  isSelected = false,
  isHovered = false,
  onClick,
  onHover
}) => {
  return (
    <circle
      cx={node.x}
      cy={node.y}
      r={node.radius || 4}
      fill={node.color || '#3498db'}
      className={`network-node ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
      onClick={() => onClick?.(node)}
      onMouseEnter={() => onHover?.(node)}
      onMouseLeave={() => onHover?.(null)}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease'
      }}
    />
  );
};

// Memoize for performance optimization
export const NetworkNode = memo(NetworkNodeComponent, (prevProps, nextProps) => {
  return (
    prevProps.node.x === nextProps.node.x &&
    prevProps.node.y === nextProps.node.y &&
    prevProps.node.radius === nextProps.node.radius &&
    prevProps.node.color === nextProps.node.color &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.isHovered === nextProps.isHovered
  );
});
