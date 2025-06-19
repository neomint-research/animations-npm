import React, { useState, useRef } from 'react';
import { DataNetwork } from '@neomint/animations';

/**
 * Theme Showcase Example
 * 
 * This example demonstrates all 8 available themes and provides
 * interactive theme switching functionality.
 */

// All available theme presets
const THEMES = [
  { 
    name: 'neomintResearch', 
    label: 'NEOMINT Research',
    description: 'Professional theme with mint accent on light background'
  },
  { 
    name: 'neomintDark', 
    label: 'NEOMINT Dark',
    description: 'Sophisticated dark theme with mint nodes'
  },
  { 
    name: 'neomintMinimal', 
    label: 'NEOMINT Minimal',
    description: 'Clean, minimalist design with dark nodes'
  },
  { 
    name: 'neomintHero', 
    label: 'NEOMINT Hero',
    description: 'Bold gradient background with white nodes'
  },
  { 
    name: 'cybersecurity', 
    label: 'Cybersecurity',
    description: 'High-tech blue theme on black background'
  },
  { 
    name: 'aiResearch', 
    label: 'AI Research',
    description: 'Innovative coral nodes on teal gradient'
  },
  { 
    name: 'fintech', 
    label: 'Fintech',
    description: 'Trustworthy green theme for financial applications'
  },
  { 
    name: 'healthcare', 
    label: 'Healthcare',
    description: 'Clean blue theme with high contrast for accessibility'
  }
];

// Example 1: Interactive Theme Switcher
export const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState('neomintResearch');
  const networkRef = useRef(null);

  const handleThemeChange = (themeName) => {
    setCurrentTheme(themeName);
    // You can also programmatically update the theme
    if (networkRef.current) {
      networkRef.current.updateTheme(themeName);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Interactive Theme Switcher</h2>
      
      {/* Theme buttons */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '0.5rem', 
        marginBottom: '2rem' 
      }}>
        {THEMES.map(theme => (
          <button
            key={theme.name}
            onClick={() => handleThemeChange(theme.name)}
            style={{
              padding: '0.5rem 1rem',
              border: '2px solid',
              borderColor: currentTheme === theme.name ? '#00958F' : '#e1e5e9',
              backgroundColor: currentTheme === theme.name ? '#00958F' : 'white',
              color: currentTheme === theme.name ? 'white' : '#333',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {theme.label}
          </button>
        ))}
      </div>

      {/* Animation display */}
      <div style={{ 
        border: '1px solid #e1e5e9', 
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#f8f9fa'
      }}>
        <DataNetwork
          ref={networkRef}
          width="100%"
          height="400px"
          preset={currentTheme}
          nodeCount={60}
          animationSpeed={0.5}
          showStats={true}
        />
      </div>

      {/* Theme description */}
      <div style={{ marginTop: '1rem' }}>
        <h3>{THEMES.find(t => t.name === currentTheme)?.label}</h3>
        <p>{THEMES.find(t => t.name === currentTheme)?.description}</p>
      </div>
    </div>
  );
};

// Example 2: Side-by-Side Theme Comparison
export const ThemeComparison = () => {
  const [compareThemes, setCompareThemes] = useState(['neomintResearch', 'neomintDark']);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Theme Comparison</h2>
      
      {/* Theme selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Left Theme:
          </label>
          <select 
            value={compareThemes[0]}
            onChange={(e) => setCompareThemes([e.target.value, compareThemes[1]])}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #e1e5e9' }}
          >
            {THEMES.map(theme => (
              <option key={theme.name} value={theme.name}>{theme.label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Right Theme:
          </label>
          <select 
            value={compareThemes[1]}
            onChange={(e) => setCompareThemes([compareThemes[0], e.target.value])}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #e1e5e9' }}
          >
            {THEMES.map(theme => (
              <option key={theme.name} value={theme.name}>{theme.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-side animations */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
          <DataNetwork
            width="100%"
            height="300px"
            preset={compareThemes[0]}
            nodeCount={40}
          />
          <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', textAlign: 'center' }}>
            {THEMES.find(t => t.name === compareThemes[0])?.label}
          </div>
        </div>
        
        <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
          <DataNetwork
            width="100%"
            height="300px"
            preset={compareThemes[1]}
            nodeCount={40}
          />
          <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', textAlign: 'center' }}>
            {THEMES.find(t => t.name === compareThemes[1])?.label}
          </div>
        </div>
      </div>
    </div>
  );
};

// Example 3: Theme Grid Display
export const ThemeGrid = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>All Themes Gallery</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {THEMES.map(theme => (
          <div 
            key={theme.name}
            style={{ 
              border: '1px solid #e1e5e9', 
              borderRadius: '8px', 
              overflow: 'hidden',
              backgroundColor: 'white'
            }}
          >
            <div style={{ height: '200px' }}>
              <DataNetwork
                width="100%"
                height="100%"
                preset={theme.name}
                nodeCount={30}
                animationSpeed={0.3}
              />
            </div>
            <div style={{ padding: '1rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{theme.label}</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                {theme.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Example 4: Theme with Custom Colors
export const ThemeWithOverrides = () => {
  const [useOverrides, setUseOverrides] = useState(false);
  const [nodeColor, setNodeColor] = useState('#ff6b6b');
  const [lineColor, setLineColor] = useState('rgba(255, 107, 107, 0.3)');

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Theme with Custom Color Overrides</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <input
            type="checkbox"
            checked={useOverrides}
            onChange={(e) => setUseOverrides(e.target.checked)}
          />
          <span>Enable custom color overrides</span>
        </label>

        {useOverrides && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Node Color:
              </label>
              <input
                type="color"
                value={nodeColor}
                onChange={(e) => setNodeColor(e.target.value)}
                style={{ width: '100%', height: '40px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Line Color (use rgba for transparency):
              </label>
              <input
                type="text"
                value={lineColor}
                onChange={(e) => setLineColor(e.target.value)}
                placeholder="rgba(255, 107, 107, 0.3)"
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #e1e5e9', borderRadius: '4px' }}
              />
            </div>
          </div>
        )}
      </div>

      <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
        <DataNetwork
          width="100%"
          height="400px"
          preset="neomintMinimal"
          nodeColor={useOverrides ? nodeColor : undefined}
          lineColor={useOverrides ? lineColor : undefined}
          nodeCount={50}
          showStats={true}
        />
      </div>
    </div>
  );
};

// Example 5: Dynamic Theme Based on Time
export const DynamicTheme = () => {
  const [isDaytime, setIsDaytime] = useState(true);
  
  // In a real app, you might calculate this based on actual time
  const currentTheme = isDaytime ? 'neomintResearch' : 'neomintDark';

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dynamic Theme (Day/Night)</h2>
      
      <button
        onClick={() => setIsDaytime(!isDaytime)}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#00958F',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '2rem',
          fontSize: '1rem'
        }}
      >
        Switch to {isDaytime ? 'Night' : 'Day'} Mode
      </button>

      <div style={{ 
        border: '1px solid #e1e5e9', 
        borderRadius: '8px', 
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}>
        <DataNetwork
          width="100%"
          height="400px"
          preset={currentTheme}
          nodeCount={60}
          animationSpeed={0.5}
        />
      </div>

      <p style={{ marginTop: '1rem' }}>
        Currently showing: <strong>{isDaytime ? 'Daytime' : 'Nighttime'}</strong> theme
      </p>
    </div>
  );
};

// Export all examples
export default {
  ThemeSwitcher,
  ThemeComparison,
  ThemeGrid,
  ThemeWithOverrides,
  DynamicTheme
};