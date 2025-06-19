# NEOMINT Animations - Developer Guide

A comprehensive technical guide for implementing and customizing the @neomint/animations package in your applications.

## Table of Contents

1. [Quick Start & Installation](#quick-start--installation)
2. [Component API Reference](#component-api-reference)
3. [Theme System & Customization](#theme-system--customization)
4. [Performance Optimization](#performance-optimization)
5. [Code Examples & Use Cases](#code-examples--use-cases)
6. [Testing & Debugging](#testing--debugging)
7. [Best Practices & Patterns](#best-practices--patterns)
8. [Troubleshooting Guide](#troubleshooting-guide)

## Quick Start & Installation

### Installation

```bash
# Using npm
npm install @neomint/animations

# Using yarn
yarn add @neomint/animations

# Using pnpm
pnpm add @neomint/animations
```

### Basic Setup

```jsx
import React from 'react';
import { DataNetwork } from '@neomint/animations';

function App() {
  return (
    <div>
      <h1>My Application</h1>
      <DataNetwork />
    </div>
  );
}

export default App;
```

### Minimal Working Example

```jsx
import React from 'react';
import { DataNetwork } from '@neomint/animations';

function MinimalExample() {
  return (
    <DataNetwork
      width="100%"
      height="400px"
      preset="neomintMinimal"
      context="background"
    />
  );
}
```

## Component API Reference

### DataNetwork Component

The main animation component with extensive customization options.

#### Props

##### Dimensions & Layout

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string \| number` | `'100%'` | Width of the animation container |
| `height` | `string \| number` | `'35vh'` | Height of the animation container |
| `className` | `string` | `''` | Additional CSS class names |
| `style` | `object` | `{}` | Inline styles for the container |

##### Animation Properties

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `nodeCount` | `number` | Smart default | Number of nodes in the network |
| `animationSpeed` | `number` | Smart default (0.1-1.0) | Animation speed multiplier |
| `connectionDistance` | `number` | Smart default | Maximum distance for node connections |
| `nodeRadius` | `object` | `{ min: 1, max: 3 }` | Node radius range |
| `lineWidth` | `number` | `1` | Line width for connections |

##### Visual Properties

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `nodeColor` | `string` | Theme-based or `'#ffffff'` | Color of the nodes |
| `lineColor` | `string` | Theme-based or `'rgba(255, 255, 255, 0.1)'` | Color of the connection lines |
| `backgroundColor` | `string` | `'transparent'` | Background color or gradient |
| `opacity` | `number` | `1` | Global opacity for the animation |

##### Theme System

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `preset` | `string` | `'default'` | Preset theme name |
| `theme` | `string \| object` | `'auto'` | Theme configuration |
| `performanceTier` | `string` | `'auto'` | Performance tier override |

##### Performance & Optimization

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `performance` | `string` | `'auto'` | Performance mode ('auto' or 'manual') |
| `analytics` | `boolean` | `false` | Enable performance analytics |
| `maxFPS` | `number` | `60` | Maximum frames per second |
| `enableGPUAcceleration` | `boolean` | `true` | Enable GPU acceleration |

##### Accessibility

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accessibility` | `string` | `'respect-motion'` | Accessibility mode |
| `ariaLabel` | `string` | `'Animated network visualization'` | Aria label for screen readers |
| `staticMode` | `boolean` | `false` | Force static rendering |
| `reducedMotion` | `boolean` | Auto-detected | Reduced motion override |

##### Context & Behavior

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `context` | `string` | `'general'` | Usage context for smart defaults |
| `interactive` | `boolean` | `false` | Enable interactive features |
| `pauseOnHover` | `boolean` | `false` | Pause animation on hover |
| `autoPlay` | `boolean` | `true` | Auto-play animation on mount |

##### Event Handlers

| Prop | Type | Description |
|------|------|-------------|
| `onPerformanceChange` | `function` | Called when performance level changes |
| `onThemeChange` | `function` | Called when theme changes |
| `onAnimationComplete` | `function` | Called when animation completes a cycle |
| `onError` | `function` | Called on errors |

##### Development & Debug

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `debug` | `boolean` | `false` | Enable debug mode |
| `showStats` | `boolean` | `false` | Show performance statistics |
| `validateProps` | `boolean` | `NODE_ENV === 'development'` | Validate props in development |

### Context Types

```javascript
const DataNetworkContextTypes = {
  GENERAL: 'general',
  PRESENTATION: 'presentation',
  BACKGROUND: 'background',
  HERO: 'hero',
  DECORATIVE: 'decorative',
  DASHBOARD: 'dashboard',
  LOADING: 'loading'
};
```

### Performance Tiers

```javascript
const DataNetworkPerformanceTiers = {
  AUTO: 'auto',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  MINIMAL: 'minimal'
};
```

### Accessibility Modes

```javascript
const DataNetworkAccessibilityModes = {
  RESPECT_MOTION: 'respect-motion',
  DISABLE: 'disable',
  FORCE_STATIC: 'force-static',
  CUSTOM: 'custom'
};
```

## Theme System & Customization

### All 18 Preset Themes

#### NEOMINT Brand Themes

1. **default** - Clean, minimal white nodes
```jsx
<DataNetwork preset="default" />
```

2. **neomintResearch** - Professional research theme
```jsx
<DataNetwork preset="neomintResearch" />
// Features: Mint green nodes, light gradient background
```

3. **neomintDark** - Sophisticated dark theme
```jsx
<DataNetwork preset="neomintDark" />
// Features: Mint nodes on dark background
```

4. **neomintMinimal** - Ultra-minimal design
```jsx
<DataNetwork preset="neomintMinimal" />
// Features: Dark mint nodes, subtle connections
```

5. **neomintHero** - Bold hero section theme
```jsx
<DataNetwork preset="neomintHero" />
// Features: White nodes on mint-to-dark gradient
```

#### Industry-Specific Themes

6. **cybersecurity** - High-tech security theme
```jsx
<DataNetwork preset="cybersecurity" />
// Features: Cyan nodes on black background
```

7. **aiResearch** - AI and ML research theme
```jsx
<DataNetwork preset="aiResearch" />
// Features: Red nodes on teal gradient
```

8. **dataScience** - Analytics and data theme
```jsx
<DataNetwork preset="dataScience" />
// Features: Purple nodes on light background
```

9. **fintech** - Financial technology theme
```jsx
<DataNetwork preset="fintech" />
// Features: Green nodes on light blue background
```

10. **healthcare** - Clean medical theme
```jsx
<DataNetwork preset="healthcare" />
// Features: Blue nodes, WCAG AAA compliant
```

11. **gaming** - Energetic gaming theme
```jsx
<DataNetwork preset="gaming" />
// Features: Red nodes on dark gradient
```

#### Performance-Based Themes

12. **desktopHeavy** - High-performance desktop
```jsx
<DataNetwork preset="desktopHeavy" />
// 100 nodes, 0.8 speed, 160px connections
```

13. **desktopStandard** - Balanced desktop
```jsx
<DataNetwork preset="desktopStandard" />
// 60 nodes, 0.5 speed, 120px connections
```

14. **mobileLight** - Optimized for mobile
```jsx
<DataNetwork preset="mobileLight" />
// 25 nodes, 0.3 speed, 80px connections
```

15. **mobileMinimal** - Low-end mobile
```jsx
<DataNetwork preset="mobileMinimal" />
// 15 nodes, 0.2 speed, 60px connections
```

#### Special Purpose Themes

16. **accessibility** - WCAG AAA compliant
```jsx
<DataNetwork preset="accessibility" />
// 15 nodes, 0.2 speed, high contrast
```

17. **backgroundSubtle** - Decorative background
```jsx
<DataNetwork preset="backgroundSubtle" />
// 30 nodes, 0.2 speed, 60% opacity
```

18. **presentationMode** - Impactful presentations
```jsx
<DataNetwork preset="presentationMode" />
// 80 nodes, white on gradient background
```

### CSS Variable Integration

The component automatically detects and uses CSS variables from your application:

```css
:root {
  --color-primary: #00958F;
  --color-primary-rgb: 0, 149, 143;
  --animation-node-color: #00958F;
  --animation-line-color: rgba(0, 149, 143, 0.2);
  --animation-background: transparent;
  --theme: light; /* or 'dark' */
}
```

### Custom Theme Creation

```jsx
// Method 1: Inline custom theme
<DataNetwork
  theme={{
    nodeColor: '#ff6b6b',
    lineColor: 'rgba(255, 107, 107, 0.25)',
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }}
/>

// Method 2: With performance settings
<DataNetwork
  preset="custom"
  nodeColor="#3498db"
  lineColor="rgba(52, 152, 219, 0.3)"
  backgroundColor="#1a1a1a"
  nodeCount={75}
  animationSpeed={0.6}
  connectionDistance={140}
/>
```

### Auto Theme Detection

```jsx
// Automatically adapts to your app's theme
<DataNetwork theme="auto" />

// Respond to theme changes
<DataNetwork
  theme="auto"
  onThemeChange={(newTheme) => {
    console.log('Theme changed:', newTheme);
  }}
/>
```

## Performance Optimization

### usePerformanceMonitor Hook

Monitor and optimize animation performance in real-time:

```jsx
import React from 'react';
import { DataNetwork, usePerformanceMonitor } from '@neomint/animations';

function PerformanceAwareAnimation() {
  const {
    fps,
    averageFPS,
    performanceLevel,
    deviceCapabilities,
    recordFrame
  } = usePerformanceMonitor(true);

  return (
    <div>
      <DataNetwork
        performanceTier={performanceLevel}
        onAnimationComplete={recordFrame}
      />
      <div>
        Current FPS: {fps} | Average: {averageFPS}
        <br />
        Performance Level: {performanceLevel}
        <br />
        Device Type: {deviceCapabilities.deviceType}
      </div>
    </div>
  );
}
```

### Performance Tier Selection

```jsx
import { selectPerformanceTier } from '@neomint/animations/utils';

// Automatic tier selection based on requirements
const tier = selectPerformanceTier({
  targetFPS: 60,
  maxNodes: 100,
  preferQuality: true
});

<DataNetwork performanceTier={tier} />
```

### Device-Aware Optimization

```jsx
import { DataNetwork, detectDeviceCapabilities } from '@neomint/animations';

function DeviceOptimizedAnimation() {
  const deviceCaps = detectDeviceCapabilities();
  
  // Adjust settings based on device
  const settings = {
    nodeCount: deviceCaps.isMobile ? 30 : 80,
    animationSpeed: deviceCaps.isHighPerformance ? 0.8 : 0.3,
    enableGPUAcceleration: deviceCaps.gpu !== 'integrated'
  };

  return <DataNetwork {...settings} />;
}
```

### FPS Control

```jsx
// Limit FPS for battery saving
<DataNetwork
  maxFPS={30}
  context="background"
/>

// High FPS for smooth animations
<DataNetwork
  maxFPS={60}
  context="presentation"
  enableGPUAcceleration={true}
/>
```

### GPU Acceleration

```jsx
// Automatic GPU detection
<DataNetwork performance="auto" />

// Manual GPU control
<DataNetwork
  enableGPUAcceleration={true}
  performanceTier="high"
/>
```

## Code Examples & Use Cases

### Basic Implementations

#### Hero Section Animation

```jsx
function HeroSection() {
  return (
    <div className="hero">
      <DataNetwork
        context="hero"
        preset="neomintHero"
        height="60vh"
        interactive={true}
        pauseOnHover={true}
      />
      <div className="hero-content">
        <h1>Welcome to NEOMINT</h1>
      </div>
    </div>
  );
}
```

#### Background Decoration

```jsx
function PageBackground() {
  return (
    <div className="page-wrapper">
      <DataNetwork
        context="background"
        preset="backgroundSubtle"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1
        }}
      />
      <main>{/* Your content */}</main>
    </div>
  );
}
```

#### Loading Animation

```jsx
function LoadingScreen({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <DataNetwork
        context="loading"
        width={200}
        height={200}
        nodeCount={20}
        animationSpeed={0.8}
      />
      <p>Loading...</p>
    </div>
  );
}
```

### Advanced Configurations

#### Dashboard Integration

```jsx
function DashboardWidget() {
  const [performanceData, setPerformanceData] = useState(null);

  return (
    <div className="dashboard-widget">
      <DataNetwork
        context="dashboard"
        preset="neomintMinimal"
        width="100%"
        height={300}
        analytics={true}
        onPerformanceChange={setPerformanceData}
        showStats={true}
      />
      {performanceData && (
        <div className="metrics">
          FPS: {performanceData.fps}
        </div>
      )}
    </div>
  );
}
```

#### Presentation Mode

```jsx
function PresentationSlide({ isActive }) {
  return (
    <div className="slide">
      <DataNetwork
        context="presentation"
        preset="presentationMode"
        autoPlay={isActive}
        onAnimationComplete={() => console.log('Cycle complete')}
      />
    </div>
  );
}
```

#### Interactive Features

```jsx
function InteractiveDemo() {
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(0.5);

  return (
    <div>
      <DataNetwork
        interactive={true}
        pauseOnHover={true}
        animationSpeed={speed}
        autoPlay={!isPaused}
      />
      <div className="controls">
        <button onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? 'Play' : 'Pause'}
        </button>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}
```

### Context-Specific Usage

#### Research Platform

```jsx
function ResearchVisualization({ data }) {
  return (
    <DataNetwork
      preset="neomintResearch"
      context="general"
      nodeCount={data.points}
      connectionDistance={data.complexity * 20}
      onError={(error) => {
        console.error('Animation error:', error);
      }}
    />
  );
}
```

#### Cybersecurity Dashboard

```jsx
function SecurityMonitor() {
  return (
    <DataNetwork
      preset="cybersecurity"
      context="dashboard"
      debug={process.env.NODE_ENV === 'development'}
      validateProps={true}
    />
  );
}
```

### useSmartDefaults Hook

Intelligently resolve optimal settings:

```jsx
import { useSmartDefaults } from '@neomint/animations/hooks';

function SmartAnimation(props) {
  const smartProps = useSmartDefaults({
    context: 'hero',
    ...props
  });

  return (
    <div>
      <DataNetwork {...smartProps} />
      {smartProps.validationWarnings.map((warning, i) => (
        <div key={i} className="warning">{warning}</div>
      ))}
    </div>
  );
}
```

## Testing & Debugging

### Jest Testing Examples

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataNetwork } from '@neomint/animations';

describe('DataNetwork Component', () => {
  test('renders with default props', () => {
    render(<DataNetwork />);
    const canvas = screen.getByRole('img', { 
      name: /animated network visualization/i 
    });
    expect(canvas).toBeInTheDocument();
  });

  test('applies custom dimensions', () => {
    const { container } = render(
      <DataNetwork width={800} height={600} />
    );
    const wrapper = container.firstChild;
    expect(wrapper).toHaveStyle({
      width: '800px',
      height: '600px'
    });
  });

  test('respects accessibility settings', () => {
    render(
      <DataNetwork 
        accessibility="force-static"
        ariaLabel="Test animation"
      />
    );
    const canvas = screen.getByRole('img', { name: /test animation/i });
    expect(canvas).toHaveAttribute('aria-live', 'polite');
  });

  test('handles performance changes', () => {
    const handlePerformanceChange = jest.fn();
    render(
      <DataNetwork 
        onPerformanceChange={handlePerformanceChange}
        performanceTier="high"
      />
    );
    expect(handlePerformanceChange).toHaveBeenCalledWith(
      expect.objectContaining({
        tier: 'high'
      })
    );
  });
});
```

### Debug Mode Usage

```jsx
// Enable debug mode in development
<DataNetwork
  debug={true}
  showStats={true}
  validateProps={true}
/>

// Debug with custom logging
<DataNetwork
  debug={true}
  onError={(error) => {
    console.error('Animation Error:', error);
    // Send to error tracking service
  }}
  onPerformanceChange={(data) => {
    console.log('Performance:', data);
  }}
/>
```

### Performance Monitoring

```jsx
function PerformanceDebugger() {
  const [metrics, setMetrics] = useState({});

  return (
    <div>
      <DataNetwork
        analytics={true}
        showStats={true}
        onPerformanceChange={(data) => {
          setMetrics({
            fps: data.fps,
            nodeCount: data.nodeCount,
            renderTime: data.renderTime
          });
        }}
      />
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  );
}
```

### Error Boundary Implementation

```jsx
import React from 'react';

class AnimationErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Animation Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h3>Animation Error</h3>
          <p>{this.state.error?.message}</p>
          <DataNetwork
            preset="neomintMinimal"
            staticMode={true}
            nodeCount={10}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
<AnimationErrorBoundary>
  <DataNetwork context="hero" />
</AnimationErrorBoundary>
```

## Best Practices & Patterns

### Component Integration Patterns

#### Lazy Loading

```jsx
import React, { lazy, Suspense } from 'react';

const DataNetwork = lazy(() => 
  import('@neomint/animations').then(module => ({
    default: module.DataNetwork
  }))
);

function LazyAnimation() {
  return (
    <Suspense fallback={<div>Loading animation...</div>}>
      <DataNetwork preset="neomintMinimal" />
    </Suspense>
  );
}
```

#### Responsive Design

```jsx
function ResponsiveAnimation() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight * 0.4
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight * 0.4
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <DataNetwork
      width={dimensions.width}
      height={dimensions.height}
      nodeCount={dimensions.width < 768 ? 30 : 60}
      context={dimensions.width < 768 ? 'mobile' : 'desktop'}
    />
  );
}
```

### Performance Best Practices

1. **Use appropriate contexts**
```jsx
// Good: Context-aware configuration
<DataNetwork context="background" />

// Avoid: High performance for decorative use
<DataNetwork context="decorative" performanceTier="high" />
```

2. **Optimize for mobile**
```jsx
// Good: Device-aware settings
const isMobile = window.innerWidth < 768;
<DataNetwork
  preset={isMobile ? 'mobileLight' : 'desktopStandard'}
  nodeCount={isMobile ? 25 : 60}
/>
```

3. **Respect user preferences**
```jsx
// Good: Accessibility-first approach
<DataNetwork
  accessibility="respect-motion"
  reducedMotion={undefined} // Auto-detect
/>
```

4. **Lazy load for performance**
```jsx
// Good: Load animation when visible
import { useInView } from 'react-intersection-observer';

function LazyAnimationSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div ref={ref}>
      {inView && <DataNetwork context="hero" />}
    </div>
  );
}
```

### Accessibility Considerations

1. **Always provide ARIA labels**
```jsx
<DataNetwork
  ariaLabel="Network visualization showing data connections"
  role="img"
/>
```

2. **Offer static alternatives**
```jsx
function AccessibleAnimation() {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    return <img src="/static-network.png" alt="Network diagram" />;
  }

  return <DataNetwork accessibility="respect-motion" />;
}
```

3. **Keyboard navigation support**
```jsx
<DataNetwork
  interactive={true}
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === ' ') {
      // Toggle pause on spacebar
    }
  }}
/>
```

### Error Handling

```jsx
function SafeAnimation() {
  const [error, setError] = useState(null);
  const [fallbackToStatic, setFallbackToStatic] = useState(false);

  if (fallbackToStatic) {
    return (
      <div className="static-fallback">
        <DataNetwork
          staticMode={true}
          nodeCount={10}
          animationSpeed={0}
        />
      </div>
    );
  }

  return (
    <DataNetwork
      onError={(err) => {
        setError(err);
        setFallbackToStatic(true);
        // Log to error tracking
        console.error('Animation failed:', err);
      }}
    />
  );
}
```

## Troubleshooting Guide

### Common Issues and Solutions

#### Performance Problems

**Issue**: Animation is laggy or stuttering
```jsx
// Solution 1: Reduce complexity
<DataNetwork
  performanceTier="low"
  nodeCount={30}
  animationSpeed={0.3}
/>

// Solution 2: Disable GPU acceleration if causing issues
<DataNetwork
  enableGPUAcceleration={false}
  maxFPS={30}
/>

// Solution 3: Use performance monitoring
const { performanceLevel } = usePerformanceMonitor();
<DataNetwork performanceTier={performanceLevel} />
```

**Issue**: High CPU usage
```jsx
// Solution: Use context-appropriate settings
<DataNetwork
  context="background"
  preset="backgroundSubtle"
  maxFPS={24}
/>
```

#### Browser Compatibility

**Issue**: Animation not working in older browsers
```jsx
// Solution: Feature detection and fallback
const supportsCanvas = !!document.createElement('canvas').getContext;
const supportsRAF = 'requestAnimationFrame' in window;

if (!supportsCanvas || !supportsRAF) {
  return <div>Your browser doesn't support animations</div>;
}

return <DataNetwork />;
```

**Issue**: CSS variables not detected
```jsx
// Solution: Provide explicit theme
<DataNetwork
  theme={{
    nodeColor: '#00958F',
    lineColor: 'rgba(0, 149, 143, 0.2)',
    backgroundColor: 'transparent'
  }}
/>
```

#### Build and Deployment Issues

**Issue**: Large bundle size
```javascript
// Solution 1: Use dynamic imports
const DataNetwork = dynamic(
  () => import('@neomint/animations').then(mod => mod.DataNetwork),
  { ssr: false }
);

// Solution 2: Tree-shake utilities
import { DataNetwork } from '@neomint/animations';
// Not: import * as Animations from '@neomint/animations';
```

**Issue**: SSR compatibility
```jsx
// Solution: Disable SSR for animation component
const DataNetwork = dynamic(
  () => import('@neomint/animations').then(mod => mod.DataNetwork),
  { 
    ssr: false,
    loading: () => <div>Loading animation...</div>
  }
);
```

#### Memory Leaks

**Issue**: Memory usage increases over time
```jsx
// Solution: Proper cleanup
function AnimationWithCleanup() {
  useEffect(() => {
    // Component will handle its own cleanup
    return () => {
      // DataNetwork automatically cleans up on unmount
    };
  }, []);

  return <DataNetwork />;
}
```

#### Theme Detection Issues

**Issue**: Auto theme not working correctly
```jsx
// Solution: Manual theme detection
const getTheme = () => {
  const isDark = document.documentElement.classList.contains('dark');
  return isDark ? 'dark' : 'light';
};

<DataNetwork theme={getTheme()} />
```

### Debug Checklist

1. **Check console for errors**
   - Look for prop validation warnings
   - Check for WebGL context errors
   - Monitor performance warnings

2. **Verify environment**
   ```javascript
   console.log('Canvas support:', !!document.createElement('canvas').getContext);
   console.log('RAF support:', 'requestAnimationFrame' in window);
   console.log('Device pixel ratio:', window.devicePixelRatio);
   ```

3. **Test with minimal config**
   ```jsx
   // Start with basic setup
   <DataNetwork />
   
   // Then add props one by one to isolate issues
   ```

4. **Use debug mode**
   ```jsx
   <DataNetwork
     debug={true}
     showStats={true}
     validateProps={true}
   />
   ```

5. **Check browser DevTools**
   - Performance tab for FPS and CPU usage
   - Memory tab for leak detection
   - Network tab for asset loading

---

## Additional Resources

- [GitHub Repository](https://github.com/neomint/animations)
- [NPM Package](https://www.npmjs.com/package/@neomint/animations)
- [Live Examples](https://neomint.dev/animations/examples)
- [API Documentation](https://neomint.dev/animations/api)
- [Performance Guide](https://neomint.dev/animations/performance)

For additional support, please file an issue on GitHub or contact the NEOMINT development team.