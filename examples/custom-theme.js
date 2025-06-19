import React, { useState } from 'react';
import { DataNetwork } from '@neomint/animations';

/**
 * Custom Theme Example
 * 
 * This example demonstrates how to create custom themes, understand the theme
 * object structure, and combine custom themes with existing presets.
 */

// Example 1: Basic Custom Theme
export const BasicCustomTheme = () => {
  // Define a custom theme object
  const customTheme = {
    nodeColor: '#e74c3c',                     // Bright red nodes
    lineColor: 'rgba(231, 76, 60, 0.25)',    // Semi-transparent red lines
    backgroundColor: '#2c3e50'                 // Dark blue background
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Basic Custom Theme</h2>
      <p>A simple custom theme with red nodes on a dark blue background.</p>
      
      <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
        <DataNetwork
          width="100%"
          height="400px"
          theme={customTheme}
          nodeCount={60}
          animationSpeed={0.5}
        />
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h4>Theme Object:</h4>
        <pre>{JSON.stringify(customTheme, null, 2)}</pre>
      </div>
    </div>
  );
};

// Example 2: Advanced Custom Theme with Gradients
export const AdvancedCustomTheme = () => {
  const gradientTheme = {
    nodeColor: '#ffffff',
    lineColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };

  const neonTheme = {
    nodeColor: '#39ff14',  // Neon green
    lineColor: 'rgba(57, 255, 20, 0.4)',
    backgroundColor: '#000000'
  };

  const [currentTheme, setCurrentTheme] = useState('gradient');

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Advanced Custom Themes</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => setCurrentTheme('gradient')}
          style={{
            padding: '0.5rem 1rem',
            marginRight: '1rem',
            backgroundColor: currentTheme === 'gradient' ? '#667eea' : '#e1e5e9',
            color: currentTheme === 'gradient' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Gradient Theme
        </button>
        <button
          onClick={() => setCurrentTheme('neon')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: currentTheme === 'neon' ? '#39ff14' : '#e1e5e9',
            color: currentTheme === 'neon' ? '#000' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Neon Theme
        </button>
      </div>

      <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
        <DataNetwork
          width="100%"
          height="400px"
          theme={currentTheme === 'gradient' ? gradientTheme : neonTheme}
          nodeCount={70}
          animationSpeed={0.6}
        />
      </div>
    </div>
  );
};

// Example 3: Theme Builder Interface
export const ThemeBuilder = () => {
  const [customTheme, setCustomTheme] = useState({
    nodeColor: '#00958F',
    lineColor: 'rgba(0, 149, 143, 0.2)',
    backgroundColor: 'transparent'
  });

  const [showRgbaHelper, setShowRgbaHelper] = useState(false);

  const updateTheme = (property, value) => {
    setCustomTheme(prev => ({
      ...prev,
      [property]: value
    }));
  };

  // Helper to convert hex to rgba
  const hexToRgba = (hex, alpha) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return hex;
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Interactive Theme Builder</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Controls */}
        <div>
          <h3>Theme Properties</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Node Color
            </label>
            <input
              type="color"
              value={customTheme.nodeColor}
              onChange={(e) => updateTheme('nodeColor', e.target.value)}
              style={{ width: '100%', height: '40px', cursor: 'pointer' }}
            />
            <input
              type="text"
              value={customTheme.nodeColor}
              onChange={(e) => updateTheme('nodeColor', e.target.value)}
              style={{ 
                width: '100%', 
                marginTop: '0.5rem',
                padding: '0.5rem',
                border: '1px solid #e1e5e9',
                borderRadius: '4px'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Line Color
            </label>
            <input
              type="text"
              value={customTheme.lineColor}
              onChange={(e) => updateTheme('lineColor', e.target.value)}
              placeholder="rgba(0, 149, 143, 0.2)"
              style={{ 
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #e1e5e9',
                borderRadius: '4px'
              }}
            />
            <button
              onClick={() => setShowRgbaHelper(!showRgbaHelper)}
              style={{
                marginTop: '0.5rem',
                padding: '0.25rem 0.5rem',
                fontSize: '0.875rem',
                background: 'none',
                border: '1px solid #00958F',
                color: '#00958F',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              RGBA Helper
            </button>
            
            {showRgbaHelper && (
              <div style={{ 
                marginTop: '0.5rem', 
                padding: '0.5rem', 
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                fontSize: '0.875rem'
              }}>
                <input
                  type="color"
                  onChange={(e) => {
                    const rgba = hexToRgba(e.target.value, 0.2);
                    updateTheme('lineColor', rgba);
                  }}
                  style={{ marginRight: '0.5rem' }}
                />
                <span>Pick color → converts to RGBA</span>
              </div>
            )}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Background
            </label>
            <select
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'transparent') {
                  updateTheme('backgroundColor', 'transparent');
                } else if (value === 'gradient') {
                  updateTheme('backgroundColor', 'linear-gradient(135deg, #00958F 0%, #002B2B 100%)');
                }
              }}
              style={{ 
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #e1e5e9',
                borderRadius: '4px',
                marginBottom: '0.5rem'
              }}
            >
              <option value="transparent">Transparent</option>
              <option value="gradient">Gradient</option>
              <option value="custom">Custom</option>
            </select>
            <input
              type="text"
              value={customTheme.backgroundColor}
              onChange={(e) => updateTheme('backgroundColor', e.target.value)}
              placeholder="#000000 or gradient"
              style={{ 
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #e1e5e9',
                borderRadius: '4px'
              }}
            />
          </div>

          <div style={{ 
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px'
          }}>
            <h4 style={{ marginTop: 0 }}>Export Theme</h4>
            <pre style={{ fontSize: '0.875rem', overflow: 'auto' }}>
{`const myTheme = ${JSON.stringify(customTheme, null, 2)};`}
            </pre>
          </div>
        </div>

        {/* Preview */}
        <div>
          <h3>Live Preview</h3>
          <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
            <DataNetwork
              width="100%"
              height="500px"
              theme={customTheme}
              nodeCount={50}
              animationSpeed={0.5}
              showStats={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Example 4: Combining Custom Theme with Presets
export const CombiningThemes = () => {
  // Start with a preset and override specific properties
  const customizedPreset = {
    // Base it on the healthcare preset but customize colors
    nodeColor: '#00CED1',        // Dark turquoise instead of blue
    lineColor: 'rgba(0, 206, 209, 0.2)',
    backgroundColor: '#f0ffff'   // Azure background
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Combining Custom Themes with Presets</h2>
      <p>
        You can start with a preset theme and override specific properties,
        or mix and match different theme elements.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h3>Original Healthcare Preset</h3>
          <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
            <DataNetwork
              width="100%"
              height="300px"
              preset="healthcare"
              nodeCount={40}
            />
          </div>
        </div>

        <div>
          <h3>Customized Healthcare Theme</h3>
          <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
            <DataNetwork
              width="100%"
              height="300px"
              theme={customizedPreset}
              nodeCount={40}
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Using Preset with Overrides</h3>
        <p>You can also use a preset and override individual properties:</p>
        <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
          <DataNetwork
            width="100%"
            height="300px"
            preset="fintech"
            nodeColor="#FFD700"  // Override just the node color to gold
            nodeCount={50}
          />
        </div>
      </div>
    </div>
  );
};

// Example 5: Theme Context Provider Pattern
export const ThemeContextExample = () => {
  // In a real app, you might use React Context for theme management
  const [appTheme, setAppTheme] = useState('light');
  
  const lightTheme = {
    nodeColor: '#333333',
    lineColor: 'rgba(51, 51, 51, 0.1)',
    backgroundColor: '#ffffff'
  };
  
  const darkTheme = {
    nodeColor: '#ffffff',
    lineColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#1a1a1a'
  };

  return (
    <div style={{ 
      padding: '2rem',
      backgroundColor: appTheme === 'dark' ? '#1a1a1a' : '#ffffff',
      color: appTheme === 'dark' ? '#ffffff' : '#333333',
      minHeight: '600px',
      transition: 'all 0.3s ease'
    }}>
      <h2>Theme Context Pattern</h2>
      
      <button
        onClick={() => setAppTheme(appTheme === 'light' ? 'dark' : 'light')}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: appTheme === 'dark' ? '#ffffff' : '#333333',
          color: appTheme === 'dark' ? '#333333' : '#ffffff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '2rem'
        }}
      >
        Switch to {appTheme === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      <div style={{ 
        border: `1px solid ${appTheme === 'dark' ? '#404040' : '#e1e5e9'}`,
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <DataNetwork
          width="100%"
          height="400px"
          theme={appTheme === 'dark' ? darkTheme : lightTheme}
          nodeCount={60}
          animationSpeed={0.5}
        />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <p>
          In a real application, you would typically manage themes through a context provider
          to ensure consistency across all components.
        </p>
      </div>
    </div>
  );
};

// Export all examples
export default {
  BasicCustomTheme,
  AdvancedCustomTheme,
  ThemeBuilder,
  CombiningThemes,
  ThemeContextExample
};