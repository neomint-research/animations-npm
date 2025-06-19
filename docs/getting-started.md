# Getting Started with NEOMINT

NEOMINT is a powerful React animation component for creating interactive network visualizations with smart defaults, performance optimization, and accessibility features.

## Installation

Install NEOMINT using npm or yarn:

```bash
npm install neomint
# or
yarn add neomint
```

## Basic Setup

### 1. Import the Component

```javascript
import { DataNetwork } from 'neomint';
```

### 2. Basic Implementation

Here's the simplest way to add a NEOMINT animation to your React application:

```jsx
import React from 'react';
import { DataNetwork } from 'neomint';

function App() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <DataNetwork />
    </div>
  );
}

export default App;
```

This creates a network animation with smart defaults that automatically adapts to your device capabilities.

## First Component Implementation

### Basic Customization

```jsx
import React from 'react';
import { DataNetwork } from 'neomint';

function Hero() {
  return (
    <DataNetwork
      width="100%"
      height="50vh"
      preset="neomintHero"
      nodeCount={80}
      animationSpeed={0.6}
      connectionDistance={150}
    />
  );
}
```

### Using Context-Aware Defaults

NEOMINT provides context-specific presets that automatically configure optimal settings:

```jsx
// For hero sections
<DataNetwork context="hero" />

// For background decorations
<DataNetwork context="background" />

// For presentations
<DataNetwork context="presentation" />

// For dashboards
<DataNetwork context="dashboard" />

// For loading states
<DataNetwork context="loading" />
```

### Theme Integration

NEOMINT can automatically detect and use your application's CSS variables:

```jsx
// Auto-detect theme from CSS variables
<DataNetwork theme="auto" />

// Force light/dark theme
<DataNetwork theme="light" />
<DataNetwork theme="dark" />

// Use a preset theme
<DataNetwork preset="neomintDark" />
```

## Common Patterns

### 1. Performance-Optimized Mobile Animation

```jsx
<DataNetwork
  performance="auto"  // Automatically adjusts to device
  context="mobile"
  maxFPS={30}
/>
```

### 2. Accessible Animation

```jsx
<DataNetwork
  accessibility="respect-motion"  // Respects user preferences
  ariaLabel="Network visualization showing data connections"
/>
```

### 3. Interactive Animation with Controls

```jsx
import React, { useRef } from 'react';
import { DataNetwork } from 'neomint';

function InteractiveDemo() {
  const networkRef = useRef();

  return (
    <div>
      <DataNetwork
        ref={networkRef}
        interactive={true}
        pauseOnHover={true}
        onPerformanceChange={(data) => console.log('Performance:', data)}
      />
      
      <button onClick={() => networkRef.current.toggle()}>
        Toggle Animation
      </button>
      <button onClick={() => networkRef.current.reset()}>
        Reset
      </button>
    </div>
  );
}
```

### 4. Custom Theme Implementation

```jsx
<DataNetwork
  theme={{
    nodeColor: '#00ff00',
    lineColor: 'rgba(0, 255, 0, 0.2)',
    backgroundColor: '#000000'
  }}
/>
```

### 5. Performance Monitoring

```jsx
<DataNetwork
  showStats={true}
  analytics={true}
  onPerformanceChange={(metrics) => {
    console.log('FPS:', metrics.fps);
    console.log('Performance Level:', metrics.level);
  }}
/>
```

## Project Structure Best Practices

### 1. Dedicated Animation Components

Create reusable animation components for different contexts:

```jsx
// components/animations/HeroNetwork.jsx
import { DataNetwork } from 'neomint';

export const HeroNetwork = () => (
  <DataNetwork
    context="hero"
    preset="neomintHero"
    height="60vh"
  />
);

// components/animations/BackgroundNetwork.jsx
export const BackgroundNetwork = () => (
  <DataNetwork
    context="background"
    preset="backgroundSubtle"
    staticMode={window.innerWidth < 768}  // Static on mobile
  />
);
```

### 2. Theme-Aware Implementations

```jsx
// components/ThemedNetwork.jsx
import { DataNetwork } from 'neomint';
import { useTheme } from './theme-context';

export const ThemedNetwork = (props) => {
  const { isDarkMode } = useTheme();
  
  return (
    <DataNetwork
      preset={isDarkMode ? 'neomintDark' : 'neomintMinimal'}
      {...props}
    />
  );
};
```

## Troubleshooting Tips

### Animation Not Showing

1. **Check container dimensions**: The parent element must have defined width and height
2. **Verify imports**: Make sure you're importing from 'neomint'
3. **Console errors**: Check browser console for any error messages

### Performance Issues

1. **Use performance="auto"**: Let NEOMINT optimize for your device
2. **Reduce node count**: Lower values for better performance
3. **Enable FPS limiting**: Use `maxFPS={30}` for mobile devices

### Accessibility Concerns

1. **Always set ariaLabel**: Provide descriptive labels for screen readers
2. **Use accessibility="respect-motion"**: Respects user preferences
3. **Test with reduced motion**: Enable reduced motion in OS settings

## Next Steps

- Explore the [API Reference](./api-reference.md) for all available props
- Learn about [Theme Customization](./themes.md)
- Optimize with the [Performance Guide](./performance.md)
- Ensure [Accessibility Compliance](./accessibility.md)

## Quick Examples

### Minimal Setup
```jsx
<DataNetwork />
```

### Full-Featured Setup
```jsx
<DataNetwork
  // Dimensions
  width="100%"
  height="400px"
  
  // Animation
  nodeCount={60}
  animationSpeed={0.5}
  connectionDistance={120}
  
  // Theme
  preset="neomintResearch"
  theme="auto"
  
  // Performance
  performance="auto"
  maxFPS={60}
  
  // Accessibility
  accessibility="respect-motion"
  ariaLabel="Interactive network visualization"
  
  // Interactivity
  interactive={true}
  pauseOnHover={true}
  
  // Events
  onPerformanceChange={(data) => console.log(data)}
  onThemeChange={(theme) => console.log(theme)}
/>