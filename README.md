# @neomint/animations

[![npm version](https://img.shields.io/npm/v/@neomint/animations.svg?style=flat-square)](https://www.npmjs.com/package/@neomint/animations)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/github/workflow/status/neomint/animations-npm/CI?style=flat-square)](https://github.com/neomint/animations-npm/actions)

**Professional React animation library for advanced data network visualizations**

High-performance WebGL-based network animations with smart defaults, accessibility features, and extensive customization options for modern React applications.

## Quick Start

```bash
npm install @neomint/animations
```

```jsx
import { DataNetwork } from '@neomint/animations';

function App() {
  return (
    <DataNetwork 
      theme="neomintResearch"
      performance="auto"
    />
  );
}
```

## Features

- **High-performance WebGL-based animations** - Smooth 60 FPS rendering with GPU acceleration
- **8 professional themes** - From corporate dashboards to creative showcases
- **Accessibility features (WCAG compliant)** - Screen reader support, reduced motion preferences, keyboard navigation
- **Smart defaults with extensive customization** - Zero-config setup with full control when needed
- **TypeScript support** - Complete type definitions for enhanced developer experience
- **Performance monitoring hooks** - Real-time FPS tracking and optimization

## Installation & Setup

### NPM/Yarn Installation

```bash
# npm
npm install @neomint/animations

# yarn
yarn add @neomint/animations

# pnpm
pnpm add @neomint/animations
```

### Peer Dependencies

```json
{
  "react": ">=16.8.0",
  "react-dom": ">=16.8.0"
}
```

### Basic Import

```jsx
import { DataNetwork } from '@neomint/animations';
import { usePerformanceMonitor, useSmartDefaults } from '@neomint/animations/hooks';
```

## Usage Examples

### Basic DataNetwork

```jsx
import { DataNetwork } from '@neomint/animations';

function BasicExample() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <DataNetwork />
    </div>
  );
}
```

### Theme Customization

```jsx
import { DataNetwork } from '@neomint/animations';

function ThemedExample() {
  return (
    <DataNetwork 
      theme="cybersecurity"
      nodeCount={80}
      animationSpeed={0.7}
      connectionDistance={150}
      style={{ backgroundColor: '#000' }}
    />
  );
}
```

### Performance Monitoring

```jsx
import { DataNetwork, usePerformanceMonitor } from '@neomint/animations';

function MonitoredExample() {
  const { fps, deviceTier, performanceLevel } = usePerformanceMonitor();
  
  return (
    <div>
      <DataNetwork 
        performance="auto"
        onPerformanceChange={(metrics) => {
          console.log('Performance:', metrics);
        }}
      />
      <div>FPS: {fps} | Tier: {deviceTier}</div>
    </div>
  );
}
```

### Accessibility-First Usage

```jsx
import { DataNetwork } from '@neomint/animations';

function AccessibleExample() {
  return (
    <DataNetwork 
      accessibility="respect-motion"
      ariaLabel="Network visualization showing data connections"
      reducedMotion="auto"
      staticMode={false}
    />
  );
}
```

## API Reference

### DataNetwork Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `string \| object` | `'default'` | Theme preset or custom theme object |
| `preset` | `string` | `'default'` | Animation preset configuration |
| `performance` | `'auto' \| 'low' \| 'medium' \| 'high' \| 'ultra'` | `'auto'` | Performance mode |
| `nodeCount` | `number` | `50` | Number of animated nodes |
| `animationSpeed` | `number` | `0.5` | Animation speed multiplier |
| `connectionDistance` | `number` | `120` | Maximum connection distance between nodes |
| `nodeRadius` | `{ min: number, max: number }` | `{ min: 2, max: 4 }` | Node size range |
| `lineWidth` | `number` | `1` | Connection line width |
| `nodeColor` | `string` | Theme default | Node color override |
| `lineColor` | `string` | Theme default | Connection line color override |
| `backgroundColor` | `string` | `'transparent'` | Canvas background color |
| `accessibility` | `'none' \| 'respect-motion'` | `'respect-motion'` | Accessibility mode |
| `interactive` | `boolean` | `false` | Enable mouse interactions |
| `pauseOnHover` | `boolean` | `false` | Pause animation on hover |
| `autoPlay` | `boolean` | `true` | Auto-start animation |
| `staticMode` | `boolean` | `false` | Render static image only |
| `enableGPUAcceleration` | `boolean` | `true` | Enable GPU acceleration |
| `showStats` | `boolean` | `false` | Show performance stats overlay |
| `onPerformanceChange` | `function` | - | Performance change callback |
| `onThemeChange` | `function` | - | Theme change callback |
| `onAnimationComplete` | `function` | - | Animation cycle complete callback |

### Available Themes

- **`neomintResearch`** - Professional mint-themed visualization for research and analytics
- **`neomintDark`** - Sophisticated dark mode with mint accents
- **`neomintMinimal`** - Clean, minimal design for subtle backgrounds
- **`neomintHero`** - Bold gradient background for hero sections
- **`cybersecurity`** - High-tech blue theme for security dashboards
- **`aiResearch`** - Vibrant theme for AI and ML applications
- **`fintech`** - Trust-inspiring green theme for financial applications
- **`healthcare`** - Clean, professional theme for medical applications

### Utility Hooks

#### usePerformanceMonitor

```jsx
const {
  fps,                    // Current frames per second
  memory,                 // Memory usage in MB
  deviceTier,            // 'low' | 'medium' | 'high' | 'ultra'
  performanceLevel,      // Current performance level
  deviceCapabilities,    // Device capability details
  recordFrame           // Manual frame recording function
} = usePerformanceMonitor(enabled);
```

#### useSmartDefaults

```jsx
const smartProps = useSmartDefaults({
  // Your props
  theme: 'auto',
  performance: 'auto'
});
// Returns optimized props based on device capabilities
```

## Themes Gallery

### Professional Themes

**NEOMINT Research** (`neomintResearch`)
- Professional mint-colored nodes on light gradient background
- Ideal for: Research dashboards, analytics platforms, data presentations

**NEOMINT Dark** (`neomintDark`)
- Mint nodes on sophisticated dark background
- Ideal for: Modern dashboards, developer tools, night mode interfaces

**NEOMINT Minimal** (`neomintMinimal`)
- Subtle dark mint nodes with minimal connections
- Ideal for: Background animations, content overlays, minimal designs

**NEOMINT Hero** (`neomintHero`)
- White nodes on vibrant mint-to-dark gradient
- Ideal for: Landing pages, hero sections, marketing sites

### Industry Themes

**Cybersecurity** (`cybersecurity`)
- Bright cyan nodes on black background
- Ideal for: Security dashboards, threat monitoring, network analysis

**AI Research** (`aiResearch`)
- Coral nodes on teal gradient
- Ideal for: Machine learning platforms, AI showcases, research tools

**Fintech** (`fintech`)
- Green nodes on light blue background
- Ideal for: Financial dashboards, trading platforms, banking apps

**Healthcare** (`healthcare`)
- Blue nodes on clean white background
- Ideal for: Medical applications, health dashboards, patient portals

### Theme Usage Example

```jsx
// Using preset theme
<DataNetwork theme="cybersecurity" />

// Custom theme object
<DataNetwork 
  theme={{
    nodeColor: '#ff6b6b',
    lineColor: 'rgba(255, 107, 107, 0.2)',
    backgroundColor: '#1a1a1a'
  }}
/>
```

## Performance

### Built-in Optimization Features

- **Automatic Quality Scaling** - Adjusts node count and effects based on device capabilities
- **GPU Acceleration** - WebGL-powered rendering for smooth animations
- **Smart FPS Limiting** - Maintains consistent performance across devices
- **Memory Management** - Efficient resource pooling and cleanup

### Performance Monitoring Capabilities

```jsx
<DataNetwork 
  performance="auto"
  maxFPS={60}
  enableGPUAcceleration={true}
  onPerformanceChange={(metrics) => {
    // metrics.fps - Current FPS
    // metrics.tier - Device performance tier
    // metrics.impact - Performance impact score
  }}
/>
```

### Best Practices

1. Use `performance="auto"` for optimal device-specific settings
2. Enable `staticMode` for decorative backgrounds to save resources
3. Reduce `nodeCount` on mobile devices or low-end hardware
4. Use `pauseOnHover` for interactive elements to improve UX
5. Monitor performance with `onPerformanceChange` callback

## Contributing & Support

### Report Issues
Found a bug or have a feature request? [Open an issue](https://github.com/neomint/animations-npm/issues)

### Contributing Guidelines
We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### License
MIT © NEOMINT

See the [LICENSE](./LICENSE) file for details.

---

Built with ❤️ by the NEOMINT team