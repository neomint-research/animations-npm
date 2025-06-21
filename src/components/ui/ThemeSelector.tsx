/**
 * @neomint/animations - Theme Selector Component
 * 
 * Provides a UI for selecting different themes for the network visualization.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import React, { memo, useMemo, useCallback } from 'react';
import { useNetworkContext } from '../context/NetworkContext';
import { useNetworkTheme } from '../hooks/useNetworkTheme';
import { ThemePreset } from '../types';

interface ThemeSelectorProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showPreview?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const ThemeSelectorComponent: React.FC<ThemeSelectorProps> = ({
  position = 'top-left',
  showPreview = true,
  className = '',
  style = {}
}) => {
  const { theme } = useNetworkContext();
  const { currentTheme, availablePresets, setPreset } = useNetworkTheme({
    theme: theme
  });

  const positionStyles = useMemo(() => ({
    'top-left': { top: 10, left: 10 },
    'top-right': { top: 10, right: 10 },
    'bottom-left': { bottom: 10, left: 10 },
    'bottom-right': { bottom: 10, right: 10 }
  }), []);

  const containerStyle = useMemo((): React.CSSProperties => ({
    position: 'absolute',
    ...positionStyles[position],
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '8px',
    borderRadius: '4px',
    fontSize: '14px',
    zIndex: 1000,
    ...style
  }), [position, positionStyles, style]);

  const handleThemeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setPreset(e.target.value as ThemePreset);
  }, [setPreset]);
  
  return (
    <div className={`theme-selector ${className}`} style={containerStyle}>
      <label htmlFor="theme-select" style={{ marginRight: '8px' }}>
        Theme:
      </label>
      <select
        id="theme-select"
        value={currentTheme.name || 'default'}
        onChange={handleThemeChange}
        style={{ padding: '4px', borderRadius: '2px' }}
      >
        {availablePresets.map((preset) => (
          <option key={preset} value={preset}>
            {preset.charAt(0).toUpperCase() + preset.slice(1)}
          </option>
        ))}
      </select>
      
      {showPreview && (
        <div style={{ marginTop: '8px', display: 'flex', gap: '4px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: currentTheme.nodeColor
            }}
            title="Node color"
          />
          <div
            style={{
              width: '12px',
              height: '2px',
              marginTop: '5px',
              backgroundColor: currentTheme.edgeColor
            }}
            title="Edge color"
          />
          <div
            style={{
              width: '12px',
              height: '12px',
              backgroundColor: currentTheme.backgroundColor,
              border: '1px solid #ccc'
            }}
            title="Background color"
          />
        </div>
      )}
    </div>
  );
};

// Memoize for performance optimization
export const ThemeSelector = memo(ThemeSelectorComponent);
