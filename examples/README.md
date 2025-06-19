# NEOMINT Animations Examples

This directory contains comprehensive examples demonstrating various features and use cases of the NEOMINT DataNetwork component.

## 📁 Example Files

### 1. [basic-usage.js](./basic-usage.js)
**Basic Usage Examples**
- Simple DataNetwork implementation with minimal configuration
- Default theme usage and basic customization
- Responsive layouts and background decorations
- Static mode for reduced motion preferences

```jsx
import { DataNetwork } from '@neomint/animations';

// Simplest usage
<DataNetwork />
```

### 2. [theme-showcase.js](./theme-showcase.js)
**Theme System Demonstration**
- All 8 available themes (neomintResearch, neomintDark, neomintMinimal, neomintHero, cybersecurity, aiResearch, fintech, healthcare)
- Interactive theme switcher
- Side-by-side theme comparison
- Theme gallery grid display
- Dynamic theme switching based on context

```jsx
// Switch between themes
<DataNetwork preset="neomintDark" />
<DataNetwork preset="cybersecurity" />
```

### 3. [advanced-features.js](./advanced-features.js)
**Advanced Features & Controls**
- Performance monitoring integration
- Custom node and edge configuration
- Event handlers and interactions
- Animation control methods (play, pause, reset)
- Context-based optimization
- Debug and stats display

```jsx
// Advanced configuration
<DataNetwork
  ref={networkRef}
  performance="auto"
  analytics={true}
  showStats={true}
  onPerformanceChange={handlePerformance}
/>
```

### 4. [custom-theme.js](./custom-theme.js)
**Custom Theme Creation**
- Creating custom theme objects
- Understanding theme structure
- Interactive theme builder
- Combining custom themes with presets
- Theme context patterns

```jsx
// Custom theme object
const customTheme = {
  nodeColor: '#e74c3c',
  lineColor: 'rgba(231, 76, 60, 0.25)',
  backgroundColor: '#2c3e50'
};

<DataNetwork theme={customTheme} />
```

### 5. [performance-optimization.js](./performance-optimization.js)
**Performance Optimization Strategies**
- Using usePerformanceMonitor hook
- FPS limiting techniques (15-120 FPS)
- Quality adjustment strategies
- Large dataset handling (up to 500 nodes)
- Accessibility and performance balance

```jsx
// Performance monitoring
import { usePerformanceMonitor } from '@neomint/animations/hooks';

const { optimalSettings, performanceLevel } = usePerformanceMonitor(true);
```

### 6. [integration-nextjs.js](./integration-nextjs.js)
**Next.js Integration Guide**
- Dynamic imports with SSR disabled
- Custom loading components
- App directory (Next.js 13+) integration
- Environment detection
- API route integration for analytics
- Full page templates

```jsx
// Next.js dynamic import
const DataNetwork = dynamic(
  () => import('@neomint/animations').then(mod => mod.DataNetwork),
  { ssr: false }
);
```

## 🚀 Running the Examples

### Prerequisites
```bash
# Install the NEOMINT animations package
npm install @neomint/animations
# or
yarn add @neomint/animations
```

### Basic HTML Setup
```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@neomint/animations/dist/index.js"></script>
</head>
<body>
  <div id="root"></div>
  <script>
    const { DataNetwork } = window.NeomintAnimations;
    
    ReactDOM.render(
      React.createElement(DataNetwork, {
        width: "100%",
        height: "400px",
        preset: "neomintResearch"
      }),
      document.getElementById('root')
    );
  </script>
</body>
</html>
```

### React App Setup
```jsx
// App.js
import React from 'react';
import { DataNetwork } from '@neomint/animations';

function App() {
  return (
    <div className="App">
      <h1>My Data Visualization</h1>
      <DataNetwork 
        width="100%"
        height="400px"
        preset="neomintResearch"
        nodeCount={60}
      />
    </div>
  );
}

export default App;
```

### Next.js Setup
```jsx
// pages/index.js or app/page.js
import dynamic from 'next/dynamic';

const DataNetwork = dynamic(
  () => import('@neomint/animations').then(mod => mod.DataNetwork),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      <h1>Data Analytics Dashboard</h1>
      <DataNetwork 
        width="100%"
        height="400px"
        preset="neomintDark"
      />
    </main>
  );
}
```

## 📋 Quick Reference

### Available Presets
- `neomintResearch` - Professional mint theme on light background
- `neomintDark` - Sophisticated dark theme with mint accents
- `neomintMinimal` - Clean, minimalist design
- `neomintHero` - Bold gradient background with white nodes
- `cybersecurity` - High-tech blue on black
- `aiResearch` - Innovative coral on teal gradient
- `fintech` - Trustworthy green theme
- `healthcare` - Clean blue with high accessibility

### Performance Tiers
- `high` - 100 nodes, 0.8x speed, GPU acceleration
- `medium` - 50 nodes, 0.5x speed, balanced
- `low` - 30 nodes, 0.3x speed, optimized
- `minimal` - 15 nodes, 0.1x speed, minimal resources

### Context Options
- `general` - Default balanced settings
- `presentation` - Optimized for large displays
- `background` - Subtle decorative animation
- `hero` - High-impact hero sections
- `dashboard` - Dashboard widget optimization
- `loading` - Loading state animations

## 💡 Tips

1. **Performance**: Use `performance="auto"` to let the component optimize based on device capabilities
2. **Accessibility**: Always set `accessibility="respect-motion"` to respect user preferences
3. **Mobile**: Consider using `mobileLight` or `mobileMinimal` presets for mobile devices
4. **Large Datasets**: Reduce `connectionDistance` and lower FPS for better performance with many nodes
5. **SEO**: In Next.js, ensure proper SSR handling with dynamic imports

## 🔗 Resources

- [API Documentation](../src/docs/api-reference.md)
- [Developer Guide](../src/docs/developer-guide.md)
- [User Guide](../src/docs/user-guide.md)
- [NPM Package](https://www.npmjs.com/package/@neomint/animations)
- [GitHub Repository](https://github.com/neomint/animations)

## 📝 License

These examples are part of the NEOMINT Animations package and are subject to the same license terms.