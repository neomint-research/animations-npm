# API Reference

Complete API documentation for animations-npm React animation library.

## Table of Contents

- [Components](#components)
  - [DataNetwork](#datanetwork)
- [Hooks](#hooks)
  - [usePerformanceMonitor](#useperformancemonitor)
  - [useSmartDefaults](#usesmartdefaults)
- [Utilities](#utilities)
  - [Performance](#performance)
  - [Accessibility](#accessibility)
  - [Themes](#themes)
- [Types](#types)
  - [Enums](#enums)
  - [Interfaces](#interfaces)
- [Constants](#constants)

## Components

### DataNetwork

The main animated network visualization component with intelligent performance optimization and accessibility features.

```tsx
import { DataNetwork } from 'animations-npm';
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string \| number` | `'100%'` | Width of the animation container |
| `height` | `string \| number` | `'35vh'` | Height of the animation container |
| `className` | `string` | `''` | Additional CSS class names |
| `style` | `object` | `{}` | Inline styles for the container |
| `nodeCount` | `number` | Smart default | Number of nodes in the network |
| `animationSpeed` | `number` | Smart default (0.1-1.0) | Animation speed multiplier |
| `connectionDistance` | `number` | Smart default | Maximum distance for node connections |
| `nodeRadius` | `{ min: number, max: number }` | `{ min: 1, max: 3 }` | Node radius range |
| `lineWidth` | `number` | `1` | Line width for connections |
| `nodeColor` | `string` | Theme-based or `'#ffffff'` | Color of the nodes |
| `lineColor` | `string` | Theme-based or `'rgba(255, 255, 255, 0.1)'` | Color of the connection lines |
| `backgroundColor` | `string` | `'transparent'` | Background color or gradient |
| `opacity` | `number` | `1` | Global opacity for the animation (0-1) |
| `preset` | `string` | `'default'` | Preset theme name |
| `theme` | `'auto' \| 'light' \| 'dark' \| object` | `'auto'` | Theme configuration |
| `performanceTier` | `'auto' \| 'high' \| 'medium' \| 'low' \| 'minimal'` | `'auto'` | Performance tier override |
| `performance` | `'auto' \| 'manual'` | `'auto'` | Performance mode |
| `analytics` | `boolean` | `false` | Enable performance analytics |
| `maxFPS` | `number` | `60` | Maximum frames per second |
| `enableGPUAcceleration` | `boolean` | `true` | Enable GPU acceleration |
| `accessibility` | `'respect-motion' \| 'disable' \| 'force-static' \| 'custom'` | `'respect-motion'` | Accessibility mode |
| `ariaLabel` | `string` | `'Animated network visualization'` | Aria label for screen readers |
| `staticMode` | `boolean` | `false` | Force static rendering |
| `reducedMotion` | `boolean` | Auto-detected | Reduced motion override |
| `context` | `'general' \| 'presentation' \| 'background' \| 'hero' \| 'decorative' \| 'dashboard' \| 'loading'` | `'general'` | Usage context for smart defaults |
| `interactive` | `boolean` | `false` | Enable interactive features |
| `pauseOnHover` | `boolean` | `false` | Pause animation on hover |
| `autoPlay` | `boolean` | `true` | Auto-play animation on mount |
| `onPerformanceChange` | `function` | - | Callback when performance level changes |
| `onThemeChange` | `function` | - | Callback when theme changes |
| `onAnimationComplete` | `function` | - | Callback when animation completes a cycle |
| `onError` | `function` | - | Error handler callback |
| `debug` | `boolean` | `false` | Enable debug mode |
| `showStats` | `boolean` | `false` | Show performance statistics |
| `validateProps` | `boolean` | `process.env.NODE_ENV === 'development'` | Validate props in development |

#### Methods (via ref)

```tsx
const networkRef = useRef<DataNetworkRef>(null);

// Available methods:
networkRef.current?.play();
networkRef.current?.pause();
networkRef.current?.toggle();
networkRef.current?.reset();
networkRef.current?.getStats();
networkRef.current?.getPerformanceInfo();
networkRef.current?.updateTheme(newTheme);
```

##### play()
Starts the animation.

```tsx
networkRef.current?.play();
```

##### pause()
Pauses the animation.

```tsx
networkRef.current?.pause();
```

##### toggle()
Toggles between play and pause states.

```tsx
networkRef.current?.toggle();
```

##### reset()
Resets the animation to initial state.

```tsx
networkRef.current?.reset();
```

##### getStats()
Returns current performance statistics.

```tsx
const stats = networkRef.current?.getStats();
// Returns: { fps: number, frameTime: number, nodeUpdates: number }
```

##### getPerformanceInfo()
Returns detailed performance information.

```tsx
const perfInfo = networkRef.current?.getPerformanceInfo();
// Returns: {
//   tier: string,
//   level: string,
//   impact: object,
//   deviceCapabilities: object
// }
```

##### updateTheme(theme)
Updates the theme dynamically.

```tsx
networkRef.current?.updateTheme('dark');
// or
networkRef.current?.updateTheme({
  nodeColor: '#00958F',
  lineColor: 'rgba(0, 149, 143, 0.3)',
  backgroundColor: '#1a1a1a'
});
```

#### Basic Usage

```tsx
import { DataNetwork } from 'animations-npm';

function App() {
  return (
    <DataNetwork
      width="100%"
      height="400px"
      theme="auto"
      context="hero"
    />
  );
}
```

#### Advanced Usage with Ref

```tsx
import { useRef } from 'react';
import { DataNetwork } from 'animations-npm';

function App() {
  const networkRef = useRef(null);

  const handleToggle = () => {
    networkRef.current?.toggle();
  };

  return (
    <>
      <DataNetwork
        ref={networkRef}
        width="100%"
        height="400px"
        theme={{
          nodeColor: '#00958F',
          lineColor: 'rgba(0, 149, 143, 0.2)',
          backgroundColor: 'transparent'
        }}
        onPerformanceChange={(data) => {
          console.log('Performance:', data);
        }}
        showStats
      />
      <button onClick={handleToggle}>Toggle Animation</button>
    </>
  );
}
```

## Hooks

### usePerformanceMonitor

Hook for monitoring animation performance metrics.

```tsx
import { usePerformanceMonitor } from 'animations-npm';
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Enable performance monitoring |

#### Returns

```tsx
{
  fps: number;                    // Current FPS
  averageFPS: number;            // Average FPS over time
  performanceLevel: 'high' | 'medium' | 'low';
  deviceCapabilities: {
    devicePixelRatio: number;
    hardwareConcurrency: number;
    memory: number;
    isMobile: boolean;
    isHighPerformance: boolean;
  };
  optimalSettings: {
    nodeCount: number;
    animationSpeed: number;
    connectionDistance: number;
    qualityLevel: string;
  };
  recordFrame: () => void;       // Record a frame for monitoring
  monitor: PerformanceMonitor;   // Direct access to monitor instance
}
```

#### Example

```tsx
import { usePerformanceMonitor } from 'animations-npm';

function AnimationContainer() {
  const { fps, performanceLevel, recordFrame } = usePerformanceMonitor();

  useEffect(() => {
    const animate = () => {
      recordFrame();
      // Your animation logic
      requestAnimationFrame(animate);
    };
    animate();
  }, [recordFrame]);

  return (
    <div>
      <div>FPS: {fps}</div>
      <div>Performance: {performanceLevel}</div>
    </div>
  );
}
```

### useSmartDefaults

Hook that intelligently resolves component props based on device capabilities, context, and user preferences.

```tsx
import { useSmartDefaults } from 'animations-npm';
```

#### Parameters

Accepts all [`DataNetwork`](#datanetwork) props and returns resolved values with smart defaults.

#### Returns

All input props plus:

```tsx
{
  // Resolved values
  nodeCount: number;
  animationSpeed: number;
  connectionDistance: number;
  // ... all other resolved props

  // Computed properties
  performanceTier: string;
  deviceCapabilities: object;
  motionPreferences: object;
  effectiveReducedMotion: boolean;
  isAnimationDisabled: boolean;
  performanceImpact: {
    score: number;
    level: 'light' | 'moderate' | 'heavy';
    recommendation: string | null;
  };
  validationWarnings: string[];

  // Helper methods
  getRecommendedSettings: () => object;
  shouldUseStaticRendering: () => boolean;
  canUseGPUAcceleration: () => boolean;
}
```

#### Example

```tsx
import { useSmartDefaults } from 'animations-npm';

function SmartAnimation(props) {
  const {
    nodeCount,
    animationSpeed,
    performanceImpact,
    getRecommendedSettings
  } = useSmartDefaults(props);

  const recommended = getRecommendedSettings();

  return (
    <div>
      <p>Optimized node count: {nodeCount}</p>
      <p>Performance impact: {performanceImpact.level}</p>
      {performanceImpact.recommendation && (
        <p>Recommendation: {performanceImpact.recommendation}</p>
      )}
    </div>
  );
}
```

## Utilities

### Performance

#### PerformanceMonitor

Class for monitoring animation performance.

```tsx
import { PerformanceMonitor } from 'animations-npm';
```

##### Constructor

```tsx
const monitor = new PerformanceMonitor();
```

##### Methods

###### startMonitoring()
Starts performance monitoring.

```tsx
monitor.startMonitoring();
```

###### recordFrame()
Records a frame for FPS calculation.

```tsx
monitor.recordFrame();
```

###### getAverageFPS()
Returns the average FPS.

```tsx
const avgFPS = monitor.getAverageFPS();
// Returns: number
```

###### getPerformanceLevel()
Returns the current performance level.

```tsx
const level = monitor.getPerformanceLevel();
// Returns: 'high' | 'medium' | 'low'
```

#### detectDeviceCapabilities

Detects device capabilities for optimization.

```tsx
import { detectDeviceCapabilities } from 'animations-npm';

const capabilities = detectDeviceCapabilities();
```

##### Returns

```tsx
{
  devicePixelRatio: number;      // Device pixel ratio
  hardwareConcurrency: number;   // Number of CPU cores
  memory: number;                // Device memory in GB
  isMobile: boolean;            // Is mobile device
  isHighPerformance: boolean;   // High-performance device detection
}
```

#### getOptimalSettings

Gets optimal animation settings based on device capabilities.

```tsx
import { getOptimalSettings, detectDeviceCapabilities } from 'animations-npm';

const capabilities = detectDeviceCapabilities();
const settings = getOptimalSettings(capabilities);
```

##### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `deviceCaps` | `object` | Device capabilities object |

##### Returns

```tsx
{
  nodeCount: number;           // Optimal node count
  animationSpeed: number;      // Optimal animation speed
  connectionDistance: number;  // Optimal connection distance
  qualityLevel: string;       // Quality level recommendation
}
```

### Accessibility

#### detectMotionPreferences

Detects user motion preferences.

```tsx
import { detectMotionPreferences } from 'animations-npm';

const preferences = detectMotionPreferences();
```

##### Returns

```tsx
{
  prefersReducedMotion: boolean;  // User prefers reduced motion
  prefersHighContrast: boolean;   // User prefers high contrast
  respectMotion: boolean;         // Should respect motion preferences
}
```

#### getAccessibilitySettings

Gets accessibility-optimized animation settings.

```tsx
import { getAccessibilitySettings } from 'animations-npm';

const settings = getAccessibilitySettings({ prefersReducedMotion: true });
```

##### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `motionPreferences` | `object` | Motion preferences object |

##### Returns

```tsx
{
  nodeCount: number;           // Reduced node count
  animationSpeed: number;      // Slower animation speed
  connectionDistance: number;  // Shorter connections
  opacity: number;            // Reduced opacity
  disabled: boolean;          // Whether animation should be disabled
}
```

#### createMotionListener

Creates a listener for motion preference changes.

```tsx
import { createMotionListener } from 'animations-npm';

const removeListener = createMotionListener((prefersReduced) => {
  console.log('Motion preference changed:', prefersReduced);
});

// Later: removeListener();
```

##### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `callback` | `(prefersReduced: boolean) => void` | Callback for preference changes |

##### Returns

Function to remove the listener.

#### announceToScreenReader

Announces messages to screen readers.

```tsx
import { announceToScreenReader } from 'animations-npm';

announceToScreenReader('Animation started');
announceToScreenReader('Critical update', 'assertive');
```

##### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `message` | `string` | - | Message to announce |
| `priority` | `'polite' \| 'assertive'` | `'polite'` | Announcement priority |

### Themes

#### detectCSSVariables

Detects CSS custom properties for theming.

```tsx
import { detectCSSVariables } from 'animations-npm';

const cssVars = detectCSSVariables();
```

##### Returns

Object containing detected CSS variables.

#### generateAutoTheme

Generates theme from CSS variables.

```tsx
import { generateAutoTheme, detectCSSVariables } from 'animations-npm';

const cssVars = detectCSSVariables();
const theme = generateAutoTheme(cssVars);
```

##### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `cssVars` | `object` | `{}` | CSS variables object |

##### Returns

Theme object or `null` if no variables detected.

#### resolveThemeConfig

Resolves theme configuration with validation.

```tsx
import { resolveThemeConfig } from 'animations-npm';

const theme = resolveThemeConfig('neomintDark', 'auto');
```

##### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `preset` | `string` | `'default'` | Preset name |
| `theme` | `string \| object` | `'auto'` | Theme mode or custom theme |
| `deviceCapabilities` | `object` | `null` | Device capabilities for optimization |

##### Returns

Resolved theme configuration object.

#### createThemeListener

Creates a listener for theme changes.

```tsx
import { createThemeListener } from 'animations-npm';

const removeListener = createThemeListener(({ cssVars, autoTheme, themeMode }) => {
  console.log('Theme changed:', themeMode);
});

// Later: removeListener();
```

#### getOptimalPerformanceTier

Determines optimal performance tier.

```tsx
import { getOptimalPerformanceTier } from 'animations-npm';

const tier = getOptimalPerformanceTier({
  deviceType: 'mobile',
  gpu: 'integrated',
  memory: 4
}, 'hero');
```

##### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `deviceCapabilities` | `object` | `{}` | Device capabilities |
| `context` | `string` | `'general'` | Usage context |

##### Returns

Optimal performance tier name.

#### calculatePerformanceImpact

Calculates performance impact of theme.

```tsx
import { calculatePerformanceImpact } from 'animations-npm';

const impact = calculatePerformanceImpact('desktopHeavy');
// or
const impact = calculatePerformanceImpact({
  nodeCount: 100,
  animationSpeed: 0.8,
  connectionDistance: 160
});
```

##### Returns

```tsx
{
  overall: number;      // Overall impact score (0-100)
  cpu: number;         // CPU impact
  gpu: number;         // GPU impact
  memory: number;      // Memory impact
  battery: number;     // Battery impact
  level: 'minimal' | 'light' | 'moderate' | 'heavy' | 'intensive';
  characteristics: {
    nodeCount: number;
    animationSpeed: number;
    connectionDistance: number;
    hasGradientBackground: boolean;
    lineOpacity: number;
    tier: string;
    performanceLevel: string;
    resourceUsage: string;
  };
}
```

## Types

### Enums

#### DataNetworkContextTypes

```tsx
export enum DataNetworkContextTypes {
  GENERAL = 'general',
  PRESENTATION = 'presentation',
  BACKGROUND = 'background',
  HERO = 'hero',
  DECORATIVE = 'decorative',
  DASHBOARD = 'dashboard',
  LOADING = 'loading'
}
```

#### DataNetworkPerformanceTiers

```tsx
export enum DataNetworkPerformanceTiers {
  AUTO = 'auto',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  MINIMAL = 'minimal'
}
```

#### DataNetworkAccessibilityModes

```tsx
export enum DataNetworkAccessibilityModes {
  RESPECT_MOTION = 'respect-motion',
  DISABLE = 'disable',
  FORCE_STATIC = 'force-static',
  CUSTOM = 'custom'
}
```

### Interfaces

#### ThemeConfig

```tsx
interface ThemeConfig {
  nodeColor: string;
  lineColor: string;
  backgroundColor: string;
  nodeCount?: number;
  animationSpeed?: number;
  connectionDistance?: number;
  metadata?: {
    industry?: string;
    mood?: string;
    primaryColor?: string;
    contrastRatio?: string;
  };
}
```

#### DeviceCapabilities

```tsx
interface DeviceCapabilities {
  devicePixelRatio: number;
  hardwareConcurrency: number;
  memory: number;
  isMobile: boolean;
  isHighPerformance: boolean;
}
```

#### PerformanceData

```tsx
interface PerformanceData {
  level: string;
  tier: string;
  fps: number;
  impact: object;
  deviceCapabilities: DeviceCapabilities;
}
```

## Constants

### Available Theme Presets

```tsx
// Core themes
'default'              // Default white nodes
'neomintResearch'     // Research-focused mint theme
'neomintDark'         // Dark mode with mint accents
'neomintMinimal'      // Minimal dark mint theme
'neomintHero'         // Hero section gradient theme
'accessibility'       // Accessibility-optimized theme
'dark'               // Standard dark theme

// Industry themes
'cybersecurity'      // Cyan on black
'aiResearch'         // Red nodes on gradient
'dataScience'        // Purple analytical theme
'fintech'           // Green trustworthy theme
'healthcare'        // Blue clean theme
'gaming'            // Red energetic theme

// Performance tiers
'desktopHeavy'      // High-performance desktop
'desktopStandard'   // Standard desktop
'mobileLight'       // Optimized mobile
'mobileMinimal'     // Minimal mobile
'accessibilitySafe' // Reduced motion safe
'backgroundSubtle'  // Subtle background
'presentationMode'  // Presentation optimized
```

### Helper Functions

#### getOptimalSettingsForContext

Get optimal settings for a specific context.

```tsx
import { getOptimalSettingsForContext } from 'animations-npm';

const settings = getOptimalSettingsForContext('presentation', deviceCapabilities);
```

#### selectPerformanceTier

Select performance tier based on requirements.

```tsx
import { selectPerformanceTier } from 'animations-npm';

const tier = selectPerformanceTier({
  targetFPS: 60,
  maxNodes: 100,
  preferQuality: true
});
```

## Complete Example

```tsx
import { useRef, useState } from 'react';
import { 
  DataNetwork, 
  usePerformanceMonitor,
  detectDeviceCapabilities,
  createThemeListener 
} from 'animations-npm';

function App() {
  const networkRef = useRef(null);
  const [theme, setTheme] = useState('auto');
  const { fps, performanceLevel } = usePerformanceMonitor();

  useEffect(() => {
    // Listen for theme changes
    const removeListener = createThemeListener(({ themeMode }) => {
      console.log('System theme changed to:', themeMode);
    });

    return removeListener;
  }, []);

  const handlePerformanceChange = (data) => {
    console.log('Performance update:', data);
    
    // Adjust quality based on performance
    if (data.level === 'low' && data.tier !== 'minimal') {
      networkRef.current?.updateTheme('mobileMinimal');
    }
  };

  return (
    <div>
      <DataNetwork
        ref={networkRef}
        width="100%"
        height="500px"
        theme={theme}
        context="hero"
        showStats={process.env.NODE_ENV === 'development'}
        onPerformanceChange={handlePerformanceChange}
        onError={(error) => console.error('Animation error:', error)}
      />
      
      <div>
        <button onClick={() => setTheme('neomintDark')}>Dark Theme</button>
        <button onClick={() => setTheme('neomintHero')}>Hero Theme</button>
        <button onClick={() => networkRef.current?.toggle()}>Toggle</button>
      </div>
      
      <div>
        Current FPS: {fps} | Performance: {performanceLevel}
      </div>
    </div>
  );
}