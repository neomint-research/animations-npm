/**
 * @neomint/animations - Accessibility Controls Component
 * 
 * Provides UI controls for accessibility features like reduced motion,
 * high contrast, and screen reader support.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import React from 'react';
import { useNetworkAccessibility } from '../hooks/useNetworkAccessibility';

interface AccessibilityControlsProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showReducedMotion?: boolean;
  showHighContrast?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const AccessibilityControls: React.FC<AccessibilityControlsProps> = ({
  position = 'bottom-left',
  showReducedMotion = true,
  showHighContrast = true,
  className = '',
  style = {}
}) => {
  const {
    toggleReducedMotion,
    enableHighContrast,
    disableHighContrast,
    getAccessibilityStatus
  } = useNetworkAccessibility({ config: {} });
  
  const status = getAccessibilityStatus();
  
  const positionStyles: Record<string, React.CSSProperties> = {
    'top-left': { top: 10, left: 10 },
    'top-right': { top: 10, right: 10 },
    'bottom-left': { bottom: 10, left: 10 },
    'bottom-right': { bottom: 10, right: 10 }
  };
  
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    ...positionStyles[position],
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '8px',
    borderRadius: '4px',
    fontSize: '14px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    ...style
  };
  
  const buttonStyle: React.CSSProperties = {
    padding: '4px 8px',
    border: '1px solid #ccc',
    borderRadius: '2px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '12px'
  };
  
  const activeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#007acc',
    color: 'white'
  };
  
  return (
    <div className={`accessibility-controls ${className}`} style={containerStyle}>
      <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>
        Accessibility
      </div>
      
      {showReducedMotion && (
        <button
          onClick={toggleReducedMotion}
          style={status.motionReduced ? activeButtonStyle : buttonStyle}
          title="Toggle reduced motion (Ctrl+M)"
          aria-pressed={status.motionReduced}
        >
          {status.motionReduced ? '✓' : '○'} Reduced Motion
        </button>
      )}
      
      {showHighContrast && (
        <button
          onClick={status.highContrast ? disableHighContrast : enableHighContrast}
          style={status.highContrast ? activeButtonStyle : buttonStyle}
          title="Toggle high contrast (Ctrl+H)"
          aria-pressed={status.highContrast}
        >
          {status.highContrast ? '✓' : '○'} High Contrast
        </button>
      )}
      
      <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>
        Keyboard: Ctrl+M, Ctrl+H
      </div>
    </div>
  );
};
