# NEOMINT ANIMATIONS API Reference

Comprehensive API documentation for the NEOMINT ANIMATIONS DataNetwork component and its ecosystem.

## Table of Contents

1. [DataNetwork Component API](#datanetwork-component-api)
2. [TypeScript Type Definitions](#typescript-type-definitions)
3. [Event Handler Reference](#event-handler-reference)
4. [Theme System API](#theme-system-api)
5. [Performance API Reference](#performance-api-reference)
6. [Utility Functions & Hooks](#utility-functions--hooks)
7. [Error Handling & Validation](#error-handling--validation)

---

## DataNetwork Component API

### Component Props

| Prop Name | Type | Default | Required | Description |
|-----------|------|---------|----------|-------------|
| **width** | `string \| number` | `'100%'` | No | Width of the animation container |
| **height** | `string \| number` | `'35vh'` | No | Height of the animation container |
| **className** | `string` | `''` | No | Additional CSS class names |
| **style** | `object` | `{}` | No | Inline styles for the container |
| **nodeCount** | `number` | Smart default | No | Number of nodes in the network |
| **animationSpeed** | `number` | Smart default | No | Animation speed multiplier (0.1-1.0) |
| **connectionDistance** | `number` | Smart default | No | Maximum distance for node connections |
| **nodeRadius** | `object` | `{ min: 1, max: 3 }` | No | Node radius range configuration |
| **lineWidth** | `number` | `1` | No | Line width for connections |
| **nodeColor** | `string` | Theme-based | No | Color of the nodes |
| **lineColor** | `string` | Theme-based | No | Color of the connection lines |
| **backgroundColor** | `string` | `'transparent'` | No | Background color or gradient |
| **opacity** | `number` | `1` | No | Global opacity for the animation |
| **preset** | `string` | `'default'` | No | Preset theme name |
| **theme** | `string \| object` | `'auto'` | No | Theme configuration |
| **performanceTier** | `string` | Auto-detected | No | Performance tier override |
| **performance** | `string` | `'auto'` | No | Performance mode ('auto' or 'manual') |
| **analytics** | `boolean` | `false` | No | Enable performance analytics |
| **maxFPS** | `number` | `60` | No | Maximum frames per second |
| **enableGPUAcceleration** | `boolean` | `true` | No | Enable GPU acceleration |
| **accessibility** | `string` | `'respect-motion'` | No | Accessibility mode |
| **ariaLabel** | `string` | `'Animated network visualization'` | No | Aria label for screen readers |
| **staticMode** | `boolean` | `false` | No | Force static rendering |
| **reducedMotion** | `boolean` | Auto-detected | No | Reduced motion override |
| **context** | `string` | `'general'` | No | Usage context for smart defaults |
| **interactive** | `boolean` | `false` | No | Enable interactive features |
| **pauseOnHover** | `boolean` | `false` | No | Pause animation on hover |
| **autoPlay** | `boolean` | `true` | No | Auto-play animation on mount |
| **debug** | `boolean` | `false` | No | Enable debug mode |
| **showStats** | `boolean` | `false` | No | Show performance statistics |
| **validateProps** | `boolean` | `process.env.NODE_ENV === 'development'` | No | Validate props in development |

### Component Methods (via ref)

```typescript
interface DataNetworkRef {
  play(): void;           // Start animation
  pause(): void;          // Pause animation
  toggle(): void;         // Toggle play/pause
  reset(): void;          // Reset nodes to initial positions
  getStats(): object;     // Get performance statistics
  getPerformanceInfo(): object;  // Get performance information
  updateTheme(theme: string | object): void;  // Update theme dynamically
}
```

---

## TypeScript Type Definitions

### Context Types

```typescript
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

### Performance Tier Types

```typescript
export enum DataNetworkPerformanceTiers {
  AUTO = 'auto',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  MINIMAL = 'minimal'
}
```

### Accessibility Modes

```typescript
export enum DataNetworkAccessibilityModes {
  RESPECT_MOTION = 'respect-motion',
  DISABLE = 'disable',
  FORCE_STATIC = 'force-static',
  CUSTOM = 'custom'
}
```

### NodeRadius Interface

```typescript
interface NodeRadius {
  min: number;
  max: number;
}
```

### Theme Interface

```typescript
interface ThemeConfig {
  nodeColor: string;
  lineColor: string;
  backgroundColor: string;
}
```

### DataNetworkProps Interface

```typescript
interface DataNetworkProps {
  // Dimensions & Layout
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  
  // Animation Properties
  nodeCount?: number;
  animationSpeed?: number;
  connectionDistance?: number;
  nodeRadius?: NodeRadius;
  lineWidth?: number;
  
  // Visual Properties
  nodeColor?: string;
  lineColor?: string;
  backgroundColor?: string;
  opacity?: number;
  
  // Theme System
  preset?: string;
  theme?: 'auto' | 'light' | 'dark' | ThemeConfig;
  performanceTier?: DataNetworkPerformanceTiers;
  
  // Performance & Optimization
  performance?: 'auto' | 'manual';
  analytics?: boolean;
  maxFPS?: number;
  enableGPUAcceleration?: boolean;
  
  // Accessibility
  accessibility?: DataNetworkAccessibilityModes;
  ariaLabel?: string;
  staticMode?: boolean;
  reducedMotion?: boolean;
  
  // Context & Behavior
  context?: DataNetworkContextTypes;
  interactive?: boolean;
  pauseOnHover?: boolean;
  autoPlay?: boolean;
  
  // Event Handlers
  onPerformanceChange?: (data: PerformanceChangeData) => void;
  onThemeChange?: (data: ThemeChangeData) => void;
  onAnimationComplete?: (data: AnimationCompleteData) => void;
  onError?: (error: Error) => void;
  
  // Development & Debug
  debug?: boolean;
  showStats?: boolean;
  validateProps?: boolean;
}
```

---

## Event Handler Reference

### onPerformanceChange

Triggered when performance level changes.

```typescript
interface PerformanceChangeData {
  level: string;           // Current performance level
  tier: string;            // Performance tier
  fps: number;             // Current FPS
  impact: {
    score: number;         // Performance impact score (0-100)
    level: string;         // Impact level ('light', 'moderate', 'heavy')
    recommendation?: string;
  };
  deviceCapabilities: {
    isHighPerformance: boolean;
    isMobile: boolean;
    // ... other device capabilities
  };
}

// Usage
<DataNetwork
  onPerformanceChange={(data) => {
    console.log(`Performance: ${data.level}, FPS: ${data.fps}`);
  }}
/>
```

### onThemeChange

Triggered when theme changes.

```typescript
interface ThemeChangeData {
  theme: ThemeConfig;      // Current theme configuration
  preset: string;          // Theme preset name
  mode: string;            // Theme mode ('auto', 'light', 'dark')
}

// Usage
<DataNetwork
  onThemeChange={(data) => {
    console.log(`Theme changed to: ${data.preset}`);
  }}
/>
```

### onAnimationComplete

Triggered when animation completes a cycle (every 5 seconds).

```typescript
interface AnimationCompleteData {
  cycles: number;          // Number of completed cycles
  performance: {
    fps: number;           // Current FPS
    frameTime: number;     // Frame render time in ms
    nodeUpdates: number;   // Nodes updated per frame
  };
}

// Usage
<DataNetwork
  onAnimationComplete={(data) => {
    console.log(`Cycle ${data.cycles} completed`);
  }}
/>
```

### onError

Triggered when an error occurs.

```typescript
// Usage
<DataNetwork
  onError={(error) => {
    console.error('Animation error:', error);
  }}
/>
```

---

## Theme System API

### Available Theme Presets

| Theme Name | Industry | Mood | Description |
|------------|----------|------|-------------|
| **default** | general | neutral | Standard white nodes on transparent background |
| **neomintResearch** | research | professional | NEOMINT brand colors with gradient background |
| **neomintDark** | general | sophisticated | NEOMINT mint on dark background |
| **neomintMinimal** | general | minimalist | Dark mint nodes with subtle connections |
| **neomintHero** | general | bold | White nodes on mint-to-dark gradient |
| **accessibility** | general | accessible | Optimized for reduced motion and high contrast |
| **dark** | general | dark | Mint nodes on dark background |
| **cybersecurity** | cybersecurity | high-tech | Cyan nodes on black background |
| **aiResearch** | ai-research | innovative | Red nodes on teal gradient |
| **dataScience** | data-science | analytical | Purple nodes on light background |
| **fintech** | fintech | trustworthy | Green nodes on light blue background |
| **healthcare** | healthcare | clean | Blue nodes on white background |
| **gaming** | gaming | energetic | Red nodes on dark gradient |
| **desktopHeavy** | general | dynamic | High performance configuration |
| **desktopStandard** | general | professional | Balanced desktop configuration |
| **mobileLight** | general | subtle | Optimized for mobile devices |
| **mobileMinimal** | general | minimal | Ultra-light mobile configuration |
| **accessibilitySafe** | general | accessible | Minimal motion for accessibility |
| **backgroundSubtle** | general | subtle | Decorative background animation |
| **presentationMode** | general | impactful | High-impact presentation theme |

### Theme Configuration Structure

```typescript
interface ThemeMetadata {
  industry: string;
  mood: string;
  primaryColor: string;
  contrastRatio: 'standard' | 'high' | 'wcag-aaa';
  tier?: string;
  performanceLevel?: string;
  targetDevice?: string;
  resourceUsage?: string;
}

interface ThemePreset {
  nodeColor: string;
  lineColor: string;
  backgroundColor: string;
  // Optional performance overrides
  nodeCount?: number;
  animationSpeed?: number;
  connectionDistance?: number;
  metadata: ThemeMetadata;
}
```

### Creating Custom Themes

```typescript
// Custom theme object
const customTheme = {
  nodeColor: '#ff6b6b',
  lineColor: 'rgba(255, 107, 107, 0.3)',
  backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
};

// Usage
<DataNetwork theme={customTheme} />
```

---

## Performance API Reference

### usePerformanceMonitor Hook

Monitor and optimize animation performance in real-time.

```typescript
interface PerformanceData {
  fps: number;                    // Current FPS
  averageFPS: number;            // Average FPS over time
  performanceLevel: string;      // 'low' | 'medium' | 'high'
  deviceCapabilities: DeviceCapabilities;
  optimalSettings: OptimalSettings;
}

interface DeviceCapabilities {
  isHighPerformance: boolean;
  isMobile: boolean;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  gpu: 'integrated' | 'dedicated' | 'unknown';
  memory: number;                // GB of RAM
  cores: number;                 // CPU cores
  networkSpeed: 'slow' | 'fast';
  batteryLevel?: number;         // 0-100
  powerMode?: 'balanced' | 'performance' | 'battery-saver';
}

interface OptimalSettings {
  nodeCount: number;
  animationSpeed: number;
  connectionDistance: number;
  maxFPS: number;
  enableGPUAcceleration: boolean;
}

// Usage
import { usePerformanceMonitor } from '@neomint/animations';

function MyComponent() {
  const {
    fps,
    averageFPS,
    performanceLevel,
    deviceCapabilities,
    optimalSettings,
    recordFrame,
    monitor
  } = usePerformanceMonitor(true);

  return (
    <div>
      <DataNetwork {...optimalSettings} />
      <p>FPS: {fps}</p>
      <p>Performance: {performanceLevel}</p>
    </div>
  );
}
```

---

## Utility Functions & Hooks

### useSmartDefaults Hook

Intelligently resolve prop values based on device capabilities and context.

```typescript
interface SmartDefaultsResult extends DataNetworkProps {
  performanceImpact: {
    score: number;           // 0-100
    level: string;          // 'light' | 'moderate' | 'heavy'
    recommendation?: string;
  };
  validationWarnings: string[];
  deviceCapabilities: DeviceCapabilities;
  motionPreferences: MotionPreferences;
  effectiveReducedMotion: boolean;
  isAnimationDisabled: boolean;
  
  // Helper methods
  getRecommendedSettings(): OptimalSettings;
  shouldUseStaticRendering(): boolean;
  canUseGPUAcceleration(): boolean;
}

// Usage
import { useSmartDefaults } from '@neomint/animations';

function MyComponent(props) {
  const smartProps = useSmartDefaults({
    context: 'presentation',
    nodeCount: 100,
    ...props
  });

  return <DataNetwork {...smartProps} />;
}
```

### Accessibility Utilities

```typescript
// Detect motion preferences
detectMotionPreferences(): MotionPreferences;

// Get accessibility settings
getAccessibilitySettings(preferences: MotionPreferences): AccessibilityConfig;

// Create motion preference listener
createMotionListener(callback: (prefersReduced: boolean) => void): () => void;

// Announce to screen reader
announceToScreenReader(message: string): void;
```

### Theme Utilities

```typescript
// Detect CSS variables
detectCSSVariables(): Record<string, string>;

// Generate auto theme from CSS variables
generateAutoTheme(cssVars: Record<string, string>): ThemeConfig | null;

// Resolve theme configuration
resolveThemeConfig(preset: string, theme: string | object): ThemeConfig;

// Create theme change listener
createThemeListener(callback: (data: ThemeListenerData) => void): () => void;

// Get optimal performance tier
getOptimalPerformanceTier(
  deviceCapabilities: DeviceCapabilities,
  context: string
): string;

// Calculate performance impact
calculatePerformanceImpact(theme: string | ThemeConfig): PerformanceImpact;
```

---

## Error Handling & Validation

### Validation Rules

| Property | Valid Range | Validation Type |
|----------|-------------|-----------------|
| **nodeCount** | 1-500 | Warning if outside range |
| **animationSpeed** | 0-2 | Warning if outside range |
| **maxFPS** | 1-120 | Warning if outside range |
| **opacity** | 0-1 | Error if outside range |
| **nodeColor** | Valid CSS color | Warning if invalid format |
| **lineColor** | Valid CSS color | Warning if invalid format |
| **backgroundColor** | Valid CSS color/gradient | Warning if invalid format |
| **Event handlers** | Function type | Error if not function |

### Error Codes

| Code | Description | Resolution |
|------|-------------|------------|
| `INVALID_OPACITY` | Opacity value outside 0-1 range | Provide value between 0 and 1 |
| `INVALID_COLOR_FORMAT` | Invalid CSS color format | Use valid hex, rgb, rgba, or gradient |
| `INVALID_EVENT_HANDLER` | Event handler is not a function | Pass a function to event handlers |
| `PERFORMANCE_WARNING` | High resource usage detected | Reduce nodeCount or animationSpeed |
| `DEVICE_CAPABILITY_MISMATCH` | Settings too high for device | Use auto performance mode |

### Troubleshooting Guide

```typescript
// Enable debug mode for detailed information
<DataNetwork debug={true} showStats={true} />

// Validate props before rendering
import { validateDataNetworkProps } from '@neomint/animations';

const { errors, warnings } = validateDataNetworkProps(props);
if (errors.length > 0) {
  console.error('Prop validation errors:', errors);
}

// Handle errors gracefully
<DataNetwork
  onError={(error) => {
    // Log to error tracking service
    errorTracker.log(error);
    // Show user-friendly message
    showNotification('Animation error occurred');
  }}
/>
```

### Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Low FPS | Too many nodes or high animation speed | Reduce nodeCount or use performance='auto' |
| Animation not visible | Background color matches node color | Adjust theme or provide contrasting colors |
| Animation frozen | Reduced motion preference active | Check accessibility settings |
| High CPU usage | GPU acceleration disabled | Enable GPU acceleration on supported devices |
| Props not applying | Theme override conflict | Check theme precedence order |