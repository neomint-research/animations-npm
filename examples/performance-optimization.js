import React, { useState, useEffect } from 'react';
import { DataNetwork } from '@neomint/animations';
import { usePerformanceMonitor } from '@neomint/animations/hooks';

/**
 * Performance Optimization Example
 * 
 * This example demonstrates using the usePerformanceMonitor hook,
 * FPS limiting, quality adjustment strategies, and large dataset handling.
 */

// Example 1: Using usePerformanceMonitor Hook
export const PerformanceMonitorExample = () => {
  const {
    recordFrame,
    optimalSettings,
    performanceLevel,
    deviceCapabilities,
    resetMetrics,
    getMetrics
  } = usePerformanceMonitor(true);

  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(getMetrics());
    }, 1000);
    return () => clearInterval(interval);
  }, [getMetrics]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Performance Monitor Hook</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={resetMetrics}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#00958F',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset Metrics
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h3>Device Capabilities</h3>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '4px',
            fontSize: '0.9rem'
          }}>
            <p><strong>Type:</strong> {deviceCapabilities?.isHighPerformance ? 'High Performance' : 'Standard'}</p>
            <p><strong>Mobile:</strong> {deviceCapabilities?.isMobile ? 'Yes' : 'No'}</p>
            <p><strong>Touch:</strong> {deviceCapabilities?.hasTouch ? 'Yes' : 'No'}</p>
            <p><strong>Performance Level:</strong> {performanceLevel || 'Detecting...'}</p>
          </div>

          <h3 style={{ marginTop: '1rem' }}>Optimal Settings</h3>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '4px',
            fontSize: '0.9rem'
          }}>
            <pre>{JSON.stringify(optimalSettings, null, 2)}</pre>
          </div>
        </div>

        <div>
          <h3>Live Metrics</h3>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '4px',
            fontSize: '0.9rem'
          }}>
            {metrics ? (
              <>
                <p><strong>Avg FPS:</strong> {metrics.avgFps.toFixed(1)}</p>
                <p><strong>Min FPS:</strong> {metrics.minFps}</p>
                <p><strong>Max FPS:</strong> {metrics.maxFps}</p>
                <p><strong>Frame Count:</strong> {metrics.frameCount}</p>
                <p><strong>Dropped Frames:</strong> {metrics.droppedFrames}</p>
              </>
            ) : (
              <p>Collecting metrics...</p>
            )}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
        <DataNetwork
          width="100%"
          height="400px"
          performance="auto"
          analytics={true}
          showStats={true}
        />
      </div>
    </div>
  );
};

// Example 2: FPS Limiting Examples
export const FPSLimitingExample = () => {
  const [targetFPS, setTargetFPS] = useState(60);
  const [showComparison, setShowComparison] = useState(false);

  const fpsOptions = [
    { value: 15, label: '15 FPS (Battery Saver)', description: 'Minimal battery usage' },
    { value: 24, label: '24 FPS (Cinematic)', description: 'Smooth, film-like motion' },
    { value: 30, label: '30 FPS (Standard)', description: 'Good balance' },
    { value: 60, label: '60 FPS (Smooth)', description: 'Very smooth animation' },
    { value: 120, label: '120 FPS (Ultra)', description: 'For high-refresh displays' }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>FPS Limiting Strategies</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Select Target FPS</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
          {fpsOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setTargetFPS(option.value)}
              style={{
                padding: '0.75rem',
                border: '2px solid',
                borderColor: targetFPS === option.value ? '#00958F' : '#e1e5e9',
                backgroundColor: targetFPS === option.value ? '#00958F' : 'white',
                color: targetFPS === option.value ? 'white' : '#333',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{option.label}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={showComparison}
            onChange={(e) => setShowComparison(e.target.checked)}
          />
          <span>Show comparison (60 FPS vs {targetFPS} FPS)</span>
        </label>
      </div>

      {!showComparison ? (
        <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
          <DataNetwork
            width="100%"
            height="400px"
            maxFPS={targetFPS}
            preset="neomintDark"
            nodeCount={80}
            showStats={true}
          />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <h4>60 FPS (Default)</h4>
            <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
              <DataNetwork
                width="100%"
                height="300px"
                maxFPS={60}
                preset="neomintDark"
                nodeCount={80}
                showStats={true}
              />
            </div>
          </div>
          <div>
            <h4>{targetFPS} FPS</h4>
            <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
              <DataNetwork
                width="100%"
                height="300px"
                maxFPS={targetFPS}
                preset="neomintDark"
                nodeCount={80}
                showStats={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Example 3: Quality Adjustment Strategies
export const QualityAdjustmentExample = () => {
  const [performanceTier, setPerformanceTier] = useState('medium');
  const [autoAdjust, setAutoAdjust] = useState(true);

  const tiers = {
    high: {
      nodeCount: 100,
      animationSpeed: 0.8,
      connectionDistance: 160,
      enableGPUAcceleration: true,
      description: 'Maximum visual quality for powerful devices'
    },
    medium: {
      nodeCount: 50,
      animationSpeed: 0.5,
      connectionDistance: 120,
      enableGPUAcceleration: true,
      description: 'Balanced performance for most devices'
    },
    low: {
      nodeCount: 30,
      animationSpeed: 0.3,
      connectionDistance: 80,
      enableGPUAcceleration: false,
      description: 'Optimized for lower-end devices'
    },
    minimal: {
      nodeCount: 15,
      animationSpeed: 0.1,
      connectionDistance: 60,
      enableGPUAcceleration: false,
      description: 'Minimal resource usage'
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Quality Adjustment Strategies</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <input
            type="checkbox"
            checked={autoAdjust}
            onChange={(e) => setAutoAdjust(e.target.checked)}
          />
          <span>Auto-adjust quality based on performance</span>
        </label>

        {!autoAdjust && (
          <>
            <h3>Manual Performance Tier</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {Object.entries(tiers).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setPerformanceTier(key)}
                  style={{
                    padding: '1rem',
                    border: '2px solid',
                    borderColor: performanceTier === key ? '#00958F' : '#e1e5e9',
                    backgroundColor: performanceTier === key ? '#00958F' : 'white',
                    color: performanceTier === key ? 'white' : '#333',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <h4 style={{ margin: '0 0 0.5rem 0', textTransform: 'capitalize' }}>{key}</h4>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>{config.description}</p>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                    <div>Nodes: {config.nodeCount}</div>
                    <div>Speed: {config.animationSpeed}x</div>
                    <div>GPU: {config.enableGPUAcceleration ? 'On' : 'Off'}</div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
        <DataNetwork
          width="100%"
          height="400px"
          performance={autoAdjust ? 'auto' : 'manual'}
          performanceTier={!autoAdjust ? performanceTier : undefined}
          {...(!autoAdjust ? tiers[performanceTier] : {})}
          preset="fintech"
          showStats={true}
          debug={true}
        />
      </div>
    </div>
  );
};

// Example 4: Large Dataset Handling
export const LargeDatasetExample = () => {
  const [dataSize, setDataSize] = useState('medium');
  const [optimizationLevel, setOptimizationLevel] = useState('balanced');

  const dataSizes = {
    small: { nodeCount: 25, label: 'Small (25 nodes)' },
    medium: { nodeCount: 50, label: 'Medium (50 nodes)' },
    large: { nodeCount: 100, label: 'Large (100 nodes)' },
    xlarge: { nodeCount: 200, label: 'X-Large (200 nodes)' },
    huge: { nodeCount: 500, label: 'Huge (500 nodes)' }
  };

  const optimizations = {
    none: {
      maxFPS: 60,
      connectionDistance: 200,
      enableGPUAcceleration: true,
      label: 'No Optimization'
    },
    balanced: {
      maxFPS: 30,
      connectionDistance: 120,
      enableGPUAcceleration: true,
      label: 'Balanced'
    },
    aggressive: {
      maxFPS: 24,
      connectionDistance: 80,
      enableGPUAcceleration: false,
      label: 'Aggressive'
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Large Dataset Handling</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div>
          <h3>Dataset Size</h3>
          {Object.entries(dataSizes).map(([key, config]) => (
            <label 
              key={key}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                marginBottom: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <input
                type="radio"
                name="dataSize"
                value={key}
                checked={dataSize === key}
                onChange={(e) => setDataSize(e.target.value)}
              />
              <span>{config.label}</span>
            </label>
          ))}
        </div>

        <div>
          <h3>Optimization Level</h3>
          {Object.entries(optimizations).map(([key, config]) => (
            <label 
              key={key}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                marginBottom: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <input
                type="radio"
                name="optimization"
                value={key}
                checked={optimizationLevel === key}
                onChange={(e) => setOptimizationLevel(e.target.value)}
              />
              <span>{config.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#fff3cd', 
        borderRadius: '4px',
        marginBottom: '1rem'
      }}>
        <strong>Performance Tips for Large Datasets:</strong>
        <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
          <li>Reduce connection distance to limit calculations</li>
          <li>Lower FPS for smoother overall experience</li>
          <li>Consider static rendering for very large datasets</li>
          <li>Use performance='auto' to let the component optimize</li>
        </ul>
      </div>

      <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
        <DataNetwork
          width="100%"
          height="400px"
          nodeCount={dataSizes[dataSize].nodeCount}
          {...optimizations[optimizationLevel]}
          preset="cybersecurity"
          performance="auto"
          showStats={true}
          analytics={true}
        />
      </div>
    </div>
  );
};

// Example 5: Accessibility & Performance Balance
export const AccessibilityPerformanceExample = () => {
  const [respectMotion, setRespectMotion] = useState(true);
  const [forceStatic, setForceStatic] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Accessibility & Performance Balance</h2>
      <p>
        Optimizing for both performance and accessibility ensures your animations
        work well for all users, including those with motion sensitivities.
      </p>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Accessibility Settings</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={respectMotion}
              onChange={(e) => setRespectMotion(e.target.checked)}
            />
            <span>Respect user's motion preferences</span>
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={forceStatic}
              onChange={(e) => setForceStatic(e.target.checked)}
            />
            <span>Force static rendering (no animation)</span>
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
            />
            <span>Simulate reduced motion preference</span>
          </label>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h3>Standard Animation</h3>
          <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
            <DataNetwork
              width="100%"
              height="300px"
              preset="healthcare"
              nodeCount={30}
              accessibility="disable"
              showStats={true}
            />
          </div>
        </div>

        <div>
          <h3>Accessibility Optimized</h3>
          <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
            <DataNetwork
              width="100%"
              height="300px"
              preset="healthcare"
              nodeCount={30}
              accessibility={respectMotion ? 'respect-motion' : 'disable'}
              staticMode={forceStatic}
              reducedMotion={reducedMotion}
              showStats={true}
            />
          </div>
        </div>
      </div>

      <div style={{ 
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#e7f3ff',
        borderRadius: '4px'
      }}>
        <h4>Best Practices:</h4>
        <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
          <li>Always provide <code>ariaLabel</code> for screen readers</li>
          <li>Use <code>staticMode</code> for critical content areas</li>
          <li>Set <code>accessibility="respect-motion"</code> by default</li>
          <li>Consider lower node counts for accessibility presets</li>
          <li>Test with both motion preferences enabled and disabled</li>
        </ul>
      </div>
    </div>
  );
};

// Export all examples
export default {
  PerformanceMonitorExample,
  FPSLimitingExample,
  QualityAdjustmentExample,
  LargeDatasetExample,
  AccessibilityPerformanceExample
};