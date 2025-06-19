import React from 'react';
import { DataNetwork } from '@neomint/animations';

/**
 * Basic Usage Example
 * 
 * This example demonstrates the simplest way to use the DataNetwork component
 * with minimal configuration. The component will automatically adapt to your
 * device capabilities and respect user preferences.
 */

// Example 1: Most basic usage with all defaults
export const BasicExample = () => {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <DataNetwork />
    </div>
  );
};

// Example 2: Basic usage with default theme
export const BasicWithTheme = () => {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <DataNetwork 
        preset="neomintMinimal"
        ariaLabel="Network visualization showing data connections"
      />
    </div>
  );
};

// Example 3: Basic usage with size configuration
export const BasicWithSize = () => {
  return (
    <DataNetwork 
      width="800px"
      height="300px"
      nodeCount={40}
      animationSpeed={0.4}
      connectionDistance={100}
    />
  );
};

// Example 4: Basic usage for background decoration
export const BasicBackground = () => {
  return (
    <div style={{ position: 'relative', padding: '2rem' }}>
      {/* DataNetwork as background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <DataNetwork 
          context="background"
          opacity={0.3}
          preset="backgroundSubtle"
        />
      </div>
      
      {/* Your content on top */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1>Welcome to Our Platform</h1>
        <p>The DataNetwork animation creates an engaging background effect.</p>
      </div>
    </div>
  );
};

// Example 5: Basic responsive usage
export const BasicResponsive = () => {
  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <DataNetwork 
        width="100%"
        height="50vh"
        preset="neomintResearch"
        // Component automatically adjusts performance based on viewport
      />
    </div>
  );
};

// Example 6: Basic static mode for reduced motion
export const BasicStatic = () => {
  return (
    <DataNetwork 
      width="100%"
      height="300px"
      staticMode={true}
      preset="neomintDark"
      ariaLabel="Static network visualization"
    />
  );
};

// Full page example showing common usage pattern
export const FullPageExample = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Hero section with animation */}
      <section style={{ height: '60vh', position: 'relative' }}>
        <DataNetwork 
          width="100%"
          height="100%"
          preset="neomintHero"
          context="hero"
        />
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white'
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>NEOMINT Animations</h1>
          <p style={{ fontSize: '1.2rem' }}>Beautiful, performant network visualizations</p>
        </div>
      </section>
      
      {/* Content section */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2>Getting Started</h2>
          <p>
            The DataNetwork component provides stunning animated visualizations
            that automatically adapt to any device and respect user preferences.
          </p>
        </div>
      </section>
    </div>
  );
};

// Export all examples
export default {
  BasicExample,
  BasicWithTheme,
  BasicWithSize,
  BasicBackground,
  BasicResponsive,
  BasicStatic,
  FullPageExample
};