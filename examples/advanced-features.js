import React, { useRef, useState, useEffect } from 'react';
import { DataNetwork } from '@neomint/animations';

/**
 * Advanced Features Example
 * 
 * This example demonstrates advanced features including performance monitoring,
 * custom node/edge configuration, event handlers, and animation controls.
 */

// Example 1: Performance Monitoring Integration
export const PerformanceMonitoring = () => {
  const [performanceData, setPerformanceData] = useState(null);
  const [animationStats, setAnimationStats] = useState(null);
  const networkRef = useRef(null);

  const handlePerformanceChange = (data) => {
    setPerformanceData(data);
    console.log('Performance update:', data);
  };

  const handleAnimationComplete = (data) => {
    setAnimationStats(data);
    console.log('Animation cycle complete:', data);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Performance Monitoring</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => {
            const stats = networkRef.current?.getStats();
            const perfInfo = networkRef.current?.getPerformanceInfo();
            console.log('Current Stats:', stats);
            console.log('Performance Info:', perfInfo);
            alert(`FPS: ${stats?.fps || 0}, Performance Tier: ${perfInfo?.tier || 'unknown'}`);
          }}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#00958F',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Get Current Stats
        </button>
      </div>

      <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
        <DataNetwork
          ref={networkRef}
          width="100%"
          height="400px"
          preset="neomintResearch"
          performance="auto"
          analytics={true}
          showStats={true}
          onPerformanceChange={handlePerformanceChange}
          onAnimationComplete={handleAnimationComplete}
        />
      </div>

      {performanceData && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <h3>Performance Data</h3>
          <pre>{JSON.stringify(performanceData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

// Example 2: Custom Node and Edge Configuration
export const CustomConfiguration = () => {
  const [config, setConfig] = useState({
    nodeCount: 40,
    animationSpeed: 0.5,
    connectionDistance: 120,
    nodeRadius: { min: 2, max: 5 },
    lineWidth: 2
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Custom Node & Edge Configuration</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginBottom: '2rem' 
      }}>
        <div>
          <label>Node Count: {config.nodeCount}</label>
          <input
            type="range"
            min="10"
            max="100"
            value={config.nodeCount}
            onChange={(e) => setConfig({ ...config, nodeCount: parseInt(e.target.value) })}
            style={{ width: '100%' }}
          />
        </div>
        
        <div>
          <label>Animation Speed: {config.animationSpeed}</label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={config.animationSpeed}
            onChange={(e) => setConfig({ ...config, animationSpeed: parseFloat(e.target.value) })}
            style={{ width: '100%' }}
          />
        </div>
        
        <div>
          <label>Connection Distance: {config.connectionDistance}</label>
          <input
            type="range"
            min="50"
            max="200"
            value={config.connectionDistance}
            onChange={(e) => setConfig({ ...config, connectionDistance: parseInt(e.target.value) })}
            style={{ width: '100%' }}
          />
        </div>
        
        <div>
          <label>Line Width: {config.lineWidth}</label>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={config.lineWidth}
            onChange={(e) => setConfig({ ...config, lineWidth: parseFloat(e.target.value) })}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
        <DataNetwork
          width="100%"
          height="400px"
          preset="neomintDark"
          {...config}
        />
      </div>
    </div>
  );
};

// Example 3: Event Handlers (Note: onNodeClick and onNodeHover are not implemented in current version)
export const EventHandlers = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const networkRef = useRef(null);

  const handleError = (error) => {
    console.error('DataNetwork Error:', error);
    alert(`Animation Error: ${error.message}`);
  };

  const handleThemeChange = (data) => {
    console.log('Theme changed:', data);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Event Handlers & Interactions</h2>
      
      <div style={{ marginBottom: '1rem' }}>
        <p>Status: {isPaused ? 'Paused' : 'Playing'} | Hover: {isHovered ? 'Yes' : 'No'}</p>
      </div>

      <div 
        style={{ 
          border: '1px solid #e1e5e9', 
          borderRadius: '8px', 
          overflow: 'hidden',
          position: 'relative'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <DataNetwork
          ref={networkRef}
          width="100%"
          height="400px"
          preset="cybersecurity"
          pauseOnHover={true}
          interactive={true}
          onError={handleError}
          onThemeChange={handleThemeChange}
        />
        
        {isHovered && (
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px'
          }}>
            Animation paused on hover
          </div>
        )}
      </div>
    </div>
  );
};

// Example 4: Animation Controls
export const AnimationControls = () => {
  const networkRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(0.5);

  const handlePlayPause = () => {
    if (networkRef.current) {
      networkRef.current.toggle();
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    if (networkRef.current) {
      networkRef.current.reset();
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Animation Controls</h2>
      
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        alignItems: 'center',
        marginBottom: '2rem' 
      }}>
        <button
          onClick={handlePlayPause}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#00958F',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            minWidth: '80px'
          }}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <button
          onClick={handleReset}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
        
        <div style={{ flex: 1 }}>
          <label>Speed: {animationSpeed}x</label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
        <DataNetwork
          ref={networkRef}
          width="100%"
          height="400px"
          preset="aiResearch"
          animationSpeed={animationSpeed}
          autoPlay={true}
        />
      </div>
    </div>
  );
};

// Example 5: Advanced Performance Configuration
export const AdvancedPerformance = () => {
  const [performanceMode, setPerformanceMode] = useState('auto');
  const [maxFPS, setMaxFPS] = useState(60);
  const [enableGPU, setEnableGPU] = useState(true);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Advanced Performance Configuration</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Performance Mode:
          </label>
          <select
            value={performanceMode}
            onChange={(e) => setPerformanceMode(e.target.value)}
            style={{ 
              width: '200px', 
              padding: '0.5rem', 
              borderRadius: '4px', 
              border: '1px solid #e1e5e9' 
            }}
          >
            <option value="auto">Auto</option>
            <option value="manual">Manual</option>
          </select>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label>Max FPS: {maxFPS}</label>
          <input
            type="range"
            min="15"
            max="120"
            step="15"
            value={maxFPS}
            onChange={(e) => setMaxFPS(parseInt(e.target.value))}
            style={{ width: '200px', marginLeft: '1rem' }}
          />
        </div>
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={enableGPU}
            onChange={(e) => setEnableGPU(e.target.checked)}
          />
          <span>Enable GPU Acceleration</span>
        </label>
      </div>

      <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
        <DataNetwork
          width="100%"
          height="400px"
          preset="fintech"
          performance={performanceMode}
          maxFPS={maxFPS}
          enableGPUAcceleration={enableGPU}
          showStats={true}
          analytics={true}
        />
      </div>
    </div>
  );
};

// Example 6: Context-Based Optimization
export const ContextBasedOptimization = () => {
  const [context, setContext] = useState('general');
  
  const contexts = [
    { value: 'general', label: 'General Purpose' },
    { value: 'presentation', label: 'Presentation Mode' },
    { value: 'background', label: 'Background Decoration' },
    { value: 'hero', label: 'Hero Section' },
    { value: 'dashboard', label: 'Dashboard Widget' },
    { value: 'loading', label: 'Loading Animation' }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Context-Based Optimization</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Usage Context:
        </label>
        <select
          value={context}
          onChange={(e) => setContext(e.target.value)}
          style={{ 
            width: '300px', 
            padding: '0.5rem', 
            borderRadius: '4px', 
            border: '1px solid #e1e5e9' 
          }}
        >
          {contexts.map(ctx => (
            <option key={ctx.value} value={ctx.value}>{ctx.label}</option>
          ))}
        </select>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
          The component automatically optimizes settings based on the usage context.
        </p>
      </div>

      <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
        <DataNetwork
          width="100%"
          height="400px"
          context={context}
          showStats={true}
          debug={true}
        />
      </div>
    </div>
  );
};

// Export all examples
export default {
  PerformanceMonitoring,
  CustomConfiguration,
  EventHandlers,
  AnimationControls,
  AdvancedPerformance,
  ContextBasedOptimization
};