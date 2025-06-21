# Migration Guide: Legacy to Modern Components

## Overview

This guide helps you migrate from legacy JavaScript components to modern TypeScript components in @neomint/animations v1.0.0. The migration maintains full backward compatibility while providing enhanced performance, accessibility, and developer experience.

## Quick Start

### Before (Legacy)
```javascript
import DataNetwork from '@neomint/animations';

const MyComponent = () => {
  return (
    <DataNetwork 
      data={myData}
      theme="dark"
      width={800}
      height={600}
    />
  );
};
```

### After (Modern)
```typescript
import { ModernDataNetwork, NetworkProvider } from '@neomint/animations';

const MyComponent = () => {
  return (
    <NetworkProvider>
      <ModernDataNetwork 
        data={myData}
        theme="neomintDark"
        dimensions={{ width: 800, height: 600 }}
      />
    </NetworkProvider>
  );
};
```

## Migration Steps

### 1. Update Imports

**Legacy imports continue to work:**
```javascript
import DataNetwork from '@neomint/animations'; // Still works
import { themes, utils } from '@neomint/animations'; // Still works
```

**New modern imports:**
```typescript
import { 
  ModernDataNetwork,
  NetworkProvider,
  useNetworkContext,
  THEME_PRESETS 
} from '@neomint/animations';
```

### 2. Component Wrapping

Modern components require the NetworkProvider context:

```typescript
import { NetworkProvider, ModernDataNetwork } from '@neomint/animations';

function App() {
  return (
    <NetworkProvider>
      <ModernDataNetwork data={data} />
    </NetworkProvider>
  );
}
```

### 3. Theme System Migration

**Legacy themes:**
```javascript
const themes = {
  default: { nodeColor: '#3498db', edgeColor: '#95a5a6' },
  dark: { nodeColor: '#e74c3c', edgeColor: '#bdc3c7' }
};
```

**Modern theme presets:**
```typescript
import { THEME_PRESETS } from '@neomint/animations';

// Available presets:
// - default, dark, light
// - neomintResearch, neomintDark, neomintMinimal
// - cyberpunk, organic, corporate

<ModernDataNetwork theme="neomintResearch" />
```

### 4. Props Migration

| Legacy Prop | Modern Prop | Notes |
|-------------|-------------|-------|
| `width`, `height` | `dimensions: { width, height }` | Grouped for better organization |
| `theme` (string) | `theme` (preset name or object) | Enhanced theme system |
| `onNodeClick` | `onNodeClick` | Same API |
| `onEdgeClick` | `onEdgeClick` | Same API |
| `performance` | `performanceConfig` | Enhanced configuration |

### 5. Performance Configuration

**Legacy:**
```javascript
<DataNetwork performance={{ enableGPU: true }} />
```

**Modern:**
```typescript
<ModernDataNetwork 
  performanceConfig={{
    tier: 'high',
    enableGPUAcceleration: true,
    adaptiveQuality: true,
    maxFPS: 60
  }}
/>
```

## Advanced Features

### Context-Based State Management

```typescript
import { useNetworkContext } from '@neomint/animations';

function NetworkControls() {
  const { 
    nodes, 
    edges, 
    theme, 
    updateTheme, 
    updateNodes 
  } = useNetworkContext();
  
  return (
    <div>
      <button onClick={() => updateTheme('cyberpunk')}>
        Cyberpunk Theme
      </button>
    </div>
  );
}
```

### Accessibility Features

```typescript
import { AccessibilityControls } from '@neomint/animations';

<NetworkProvider>
  <ModernDataNetwork data={data} />
  <AccessibilityControls 
    showReducedMotion={true}
    showHighContrast={true}
    showKeyboardHelp={true}
  />
</NetworkProvider>
```

### Performance Monitoring

```typescript
import { PerformanceIndicator } from '@neomint/animations';

<NetworkProvider>
  <ModernDataNetwork data={data} />
  <PerformanceIndicator 
    showFPS={true}
    showMemory={true}
    position="top-right"
  />
</NetworkProvider>
```

## TypeScript Benefits

### Type Safety
```typescript
import { NetworkNodeData, NetworkEdgeData } from '@neomint/animations';

const nodes: NetworkNodeData[] = [
  { id: '1', label: 'Node 1', x: 100, y: 100 }
];

const edges: NetworkEdgeData[] = [
  { id: 'e1', source: '1', target: '2' }
];
```

### IntelliSense Support
Modern components provide full TypeScript definitions for better IDE support.

## Compatibility Matrix

| Feature | Legacy | Modern | Notes |
|---------|--------|--------|-------|
| Basic rendering | ✅ | ✅ | Full compatibility |
| Theme system | ✅ | ✅ | Enhanced in modern |
| Performance opts | ✅ | ✅ | More granular in modern |
| Accessibility | ⚠️ | ✅ | Significantly improved |
| TypeScript | ❌ | ✅ | Full type definitions |
| Context API | ❌ | ✅ | State management |

## Gradual Migration Strategy

### Phase 1: Side-by-side
Run legacy and modern components in the same application:

```typescript
import DataNetwork from '@neomint/animations'; // Legacy
import { ModernDataNetwork, NetworkProvider } from '@neomint/animations';

function App() {
  return (
    <div>
      {/* Legacy component */}
      <DataNetwork data={legacyData} />
      
      {/* Modern component */}
      <NetworkProvider>
        <ModernDataNetwork data={modernData} />
      </NetworkProvider>
    </div>
  );
}
```

### Phase 2: Feature-by-feature
Migrate specific features while keeping the same component:

```typescript
// Start with legacy component
<DataNetwork data={data} theme="dark" />

// Add modern theme
<DataNetwork data={data} theme="neomintDark" />

// Switch to modern component
<NetworkProvider>
  <ModernDataNetwork data={data} theme="neomintDark" />
</NetworkProvider>
```

### Phase 3: Full migration
Complete migration to modern components with enhanced features.

## Troubleshooting

### Common Issues

**1. Context Provider Missing**
```
Error: useNetworkContext must be used within NetworkProvider
```
Solution: Wrap components in NetworkProvider.

**2. Theme Not Found**
```
Warning: Theme 'customTheme' not found
```
Solution: Use THEME_PRESETS or provide complete theme object.

**3. TypeScript Errors**
```
Property 'width' does not exist on type 'NetworkProps'
```
Solution: Use `dimensions` prop instead of separate width/height.

## Support

- Legacy components will be maintained for the next 2 major versions
- Modern components are the recommended approach for new projects
- Both approaches can coexist in the same application
- Full documentation available at [docs/API.md](./API.md)

## Next Steps

1. Try the modern components in a test environment
2. Migrate non-critical features first
3. Gradually adopt TypeScript for better development experience
4. Leverage new accessibility and performance features
5. Consider using the context API for complex state management
