# API Reference

Complete API documentation for the NEOMINT DataNetwork component.

## DataNetwork Component

The main component for creating network animations.

```jsx
import { DataNetwork } from 'neomint';
```

## Props

### Dimensions & Layout

#### `width`
- **Type**: `string | number`
- **Default**: `'100%'`
- **Description**: Width of the animation container

```jsx
<DataNetwork width="800px" />
<DataNetwork width={800} />
```

#### `height`
- **Type**: `string | number`
- **Default**: `'35vh'`
- **Description**: Height of the animation container

```jsx
<DataNetwork height="400px" />
<DataNetwork height={400} />
```

#### `className`
- **Type**: `string`
- **Default**: `''`
- **Description**: Additional CSS class names for the container

#### `style`
- **Type**: `object`
- **Default**: `{}`
- **Description**: Inline styles for the container

### Animation Properties

#### `nodeCount`
- **Type**: `number`
- **Default**: Smart default based on device/context (typically 50)
- **Range**: 1-500 (recommended)
- **Description**: Number of nodes in the network

```jsx
<DataNetwork nodeCount={100} />
```

#### `animationSpeed`
- **Type**: `number`
- **Default**: Smart default based on device/context (0.1-1.0)
- **Range**: 0-2
- **Description**: Animation speed multiplier

```jsx
<DataNetwork animationSpeed={0.8} />
```

#### `connectionDistance`
- **Type**: `number`
- **Default**: Smart default based on device/context (typically 120)
- **Description**: Maximum distance for node connections

```jsx
<DataNetwork connectionDistance={150} />
```

#### `nodeRadius`
- **Type**: `object`
- **Default**: `{ min: 1, max: 3 }`
- **Description**: Node radius range

```jsx
<DataNetwork nodeRadius={{ min: 2, max: 5 }} />
```

#### `lineWidth`
- **Type**: `number`
- **Default**: `1`
- **Description**: Width of connection lines

### Visual Properties

#### `nodeColor`
- **Type**: `string`
- **Default**: Theme-based or `'#ffffff'`
- **Description**: Color of the nodes

```jsx
<DataNetwork nodeColor="#00ff00" />
```

#### `lineColor`
- **Type**: `string`
- **Default**: Theme-based or `'rgba(255, 255, 255, 0.1)'`
- **Description**: Color of the connection lines

```jsx
<DataNetwork lineColor="rgba(0, 255, 0, 0.2)" />
```

#### `backgroundColor`
- **Type**: `string`
- **Default**: `'transparent'`
- **Description**: Background color or gradient

```jsx
<DataNetwork backgroundColor="#000000" />
<DataNetwork backgroundColor="linear-gradient(135deg, #00958F 0%, #002B2B 100%)" />
```

#### `opacity`
- **Type**: `number`
- **Default**: `1`
- **Range**: 0-1
- **Description**: Global opacity for the animation

### Theme System

#### `preset`
- **Type**: `string`
- **Default**: `'default'`
- **Description**: Preset theme name

Available presets:
- `default` - Basic white nodes
- `neomintResearch` - Research-focused mint theme
- `neomintDark` - Dark mode with mint accents
- `neomintMinimal` - Minimal dark green theme
- `neomintHero` - Bold hero section theme
- `accessibility` - Accessibility-optimized theme
- `cybersecurity` - Cyan on black theme
- `aiResearch` - Innovative AI theme
- `dataScience` - Purple analytical theme
- `fintech` - Green trustworthy theme
- `healthcare` - Blue clean theme
- `gaming` - Red energetic theme

Performance-based presets:
- `desktopHeavy` - High-performance desktop
- `desktopStandard` - Standard desktop
- `mobileLight` - Optimized for mobile
- `mobileMinimal` - Minimal mobile
- `accessibilitySafe` - Minimal motion
- `backgroundSubtle` - Subtle background
- `presentationMode` - Presentation optimized

```jsx
<DataNetwork preset="neomintHero" />
```

#### `theme`
- **Type**: `string | object`
- **Default**: `'auto'`
- **Description**: Theme configuration

Options:
- `'auto'` - Auto-detect from CSS variables
- `'light'` - Force light theme
- `'dark'` - Force dark theme
- Custom theme object

```jsx
// Auto-detect
<DataNetwork theme="auto" />

// Custom theme
<DataNetwork
  theme={{
    nodeColor: '#00ff00',
    lineColor: 'rgba(0, 255, 0, 0.2)',
    backgroundColor: '#000000'
  }}
/>
```

### Performance & Optimization

#### `performance`
- **Type**: `'auto' | 'manual'`
- **Default**: `'auto'`
- **Description**: Performance mode

```jsx
<DataNetwork performance="auto" />
```

#### `performanceTier`
- **Type**: `'auto' | 'high' | 'medium' | 'low' | 'minimal'`
- **Default**: Auto-detected
- **Description**: Performance tier override

```jsx
<DataNetwork performanceTier="high" />
```

#### `analytics`
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enable performance analytics

#### `maxFPS`
- **Type**: `number`
- **Default**: `60`
- **Range**: 1-120
- **Description**: Maximum frames per second

```jsx
<DataNetwork maxFPS={30} />  // Limit to 30 FPS
```

#### `enableGPUAcceleration`
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Enable GPU acceleration when available

### Accessibility

#### `accessibility`
- **Type**: `'respect-motion' | 'disable' | 'force-static' | 'custom'`
- **Default**: `'respect-motion'`
- **Description**: Accessibility mode

```jsx
<DataNetwork accessibility="respect-motion" />
```

#### `ariaLabel`
- **Type**: `string`
- **Default**: `'Animated network visualization'`
- **Description**: Aria label for screen readers

```jsx
<DataNetwork ariaLabel="Data connections visualization" />
```

#### `staticMode`
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Force static rendering (no animation)

#### `reducedMotion`
- **Type**: `boolean`
- **Default**: Auto-detected from system
- **Description**: Reduced motion override

### Context & Behavior

#### `context`
- **Type**: `'general' | 'presentation' | 'background' | 'hero' | 'decorative' | 'dashboard' | 'loading'`
- **Default**: `'general'`
- **Description**: Usage context for smart defaults

```jsx
<DataNetwork context="hero" />
```

#### `interactive`
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enable interactive features

#### `pauseOnHover`
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Pause animation on hover

#### `autoPlay`
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Auto-play animation on mount

### Event Handlers

#### `onPerformanceChange`
- **Type**: `function`
- **Description**: Called when performance level changes

```jsx
<DataNetwork
  onPerformanceChange={({ level, tier, fps, impact, deviceCapabilities }) => {
    console.log('Performance:', { level, tier, fps });
  }}
/>
```

#### `onThemeChange`
- **Type**: `function`
- **Description**: Called when theme changes

```jsx
<DataNetwork
  onThemeChange={({ theme, preset, mode }) => {
    console.log('Theme changed:', theme);
  }}
/>
```

#### `onAnimationComplete`
- **Type**: `function`
- **Description**: Called when animation completes a cycle

```jsx
<DataNetwork
  onAnimationComplete={({ cycles, performance }) => {
    console.log('Animation cycle:', cycles);
  }}
/>
```

#### `onError`
- **Type**: `function`
- **Description**: Called on errors

```jsx
<DataNetwork
  onError={(error) => {
    console.error('Animation error:', error);
  }}
/>
```

### Development & Debug

#### `debug`
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enable debug mode with extended stats

#### `showStats`
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Show performance statistics overlay

#### `validateProps`
- **Type**: `boolean`
- **Default**: `process.env.NODE_ENV === 'development'`
- **Description**: Validate props in development

## Ref API

The DataNetwork component can be controlled via ref:

```jsx
const networkRef = useRef();

<DataNetwork ref={networkRef} />
```

### Methods

#### `play()`
Start the animation.

```jsx
networkRef.current.play();
```

#### `pause()`
Pause the animation.

```jsx
networkRef.current.pause();
```

#### `toggle()`
Toggle between play and pause.

```jsx
networkRef.current.toggle();
```

#### `reset()`
Reset the animation to initial state.

```jsx
networkRef.current.reset();
```

#### `getStats()`
Get current performance statistics.

```jsx
const stats = networkRef.current.getStats();
// Returns: { fps: number, frameTime: number, nodeUpdates: number }
```

#### `getPerformanceInfo()`
Get detailed performance information.

```jsx
const info = networkRef.current.getPerformanceInfo();
// Returns: {
//   tier: string,
//   level: string,
//   impact: object,
//   deviceCapabilities: object
// }
```

#### `updateTheme(newTheme)`
Update the theme dynamically.

```jsx
// Use preset
networkRef.current.updateTheme('neomintDark');

// Use custom theme
networkRef.current.updateTheme({
  nodeColor: '#ff0000',
  lineColor: 'rgba(255, 0, 0, 0.2)',
  backgroundColor: '#000000'
});
```

## TypeScript Types

```typescript
interface DataNetworkProps {
  // Dimensions
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;

  // Animation
  nodeCount?: number;
  animationSpeed?: number;
  connectionDistance?: number;
  nodeRadius?: {
    min: number;
    max: number;
  };
  lineWidth?: number;

  // Visual
  nodeColor?: string;
  lineColor?: string;
  backgroundColor?: string;
  opacity?: number;

  // Theme
  preset?: string;
  theme?: 'auto' | 'light' | 'dark' | ThemeConfig;
  performanceTier?: 'auto' | 'high' | 'medium' | 'low' | 'minimal';

  // Performance
  performance?: 'auto' | 'manual';
  analytics?: boolean;
  maxFPS?: number;
  enableGPUAcceleration?: boolean;

  // Accessibility
  accessibility?: 'respect-motion' | 'disable' | 'force-static' | 'custom';
  ariaLabel?: string;
  staticMode?: boolean;
  reducedMotion?: boolean;

  // Context
  context?: 'general' | 'presentation' | 'background' | 'hero' | 
            'decorative' | 'dashboard' | 'loading';
  interactive?: boolean;
  pauseOnHover?: boolean;
  autoPlay?: boolean;

  // Events
  onPerformanceChange?: (data: PerformanceData) => void;
  onThemeChange?: (data: ThemeChangeData) => void;
  onAnimationComplete?: (data: AnimationCompleteData) => void;
  onError?: (error: Error) => void;

  // Debug
  debug?: boolean;
  showStats?: boolean;
  validateProps?: boolean;
}

interface ThemeConfig {
  nodeColor: string;
  lineColor: string;
  backgroundColor: string;
}

interface PerformanceData {
  level: 'high' | 'medium' | 'low';
  tier: string;
  fps: number;
  impact: {
    score: number;
    level: string;
  };
  deviceCapabilities: DeviceCapabilities;
}

interface DeviceCapabilities {
  devicePixelRatio: number;
  hardwareConcurrency: number;
  memory: number;
  isMobile: boolean;
  isHighPerformance: boolean;
}
```

## Hooks

### `usePerformanceMonitor`

Monitor and optimize performance in real-time.

```jsx
import { usePerformanceMonitor } from 'neomint/hooks';

const {
  fps,
  averageFPS,
  performanceLevel,
  deviceCapabilities,
  optimalSettings,
  recordFrame
} = usePerformanceMonitor(true);
```

### `useSmartDefaults`

Get optimized defaults based on context and device.

```jsx
import { useSmartDefaults } from 'neomint/hooks';

const defaults = useSmartDefaults({
  context: 'hero',
  performance: 'auto'
});
```

## Utility Functions

### `getOptimalSettingsForContext`

Get optimal settings for a specific context.

```jsx
import { getOptimalSettingsForContext } from 'neomint/utils';

const settings = getOptimalSettingsForContext('presentation');
// Returns: { nodeCount, animationSpeed, connectionDistance }
```

### `selectPerformanceTier`

Select appropriate performance tier based on requirements.

```jsx
import { selectPerformanceTier } from 'neomint/utils';

const tier = selectPerformanceTier({
  targetFPS: 60,
  maxNodes: 100,
  preferQuality: true
});