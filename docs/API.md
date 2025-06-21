# API Documentation

## Overview

@neomint/animations provides a comprehensive network visualization library with both legacy JavaScript and modern TypeScript components. This documentation covers both approaches, with emphasis on the modern TypeScript components introduced in v1.0.0.

## Quick Start

### Modern TypeScript Components (Recommended)
```typescript
import { NetworkProvider, ModernDataNetwork } from '@neomint/animations';

function App() {
  return (
    <NetworkProvider>
      <ModernDataNetwork data={myData} theme="neomintResearch" />
    </NetworkProvider>
  );
}
```

### Legacy JavaScript Components (Maintained)
```javascript
import DataNetwork from '@neomint/animations';

function App() {
  return <DataNetwork data={myData} theme="dark" />;
}
```

## Modern Components API

### NetworkProvider
Context provider for modern components. Required for all modern components.

```typescript
interface NetworkProviderProps {
  children: React.ReactNode;
  initialData?: { nodes: NetworkNodeData[]; edges: NetworkEdgeData[] };
  initialTheme?: NetworkTheme | ThemePreset;
  initialPerformanceConfig?: Partial<NetworkPerformanceConfig>;
}
```

### ModernDataNetwork
Main network visualization component with TypeScript support.

```typescript
interface ModernDataNetworkProps {
  data?: { nodes: NetworkNodeData[]; edges: NetworkEdgeData[] };
  dimensions?: { width: number; height: number };
  theme?: NetworkTheme | ThemePreset;
  performanceConfig?: Partial<NetworkPerformanceConfig>;
  accessibilityConfig?: Partial<NetworkAccessibilityConfig>;
  animationConfig?: Partial<NetworkAnimationConfig>;
  interactionConfig?: Partial<NetworkInteractionConfig>;
  onNodeClick?: (event: NetworkInteractionEvent) => void;
  onEdgeClick?: (event: NetworkInteractionEvent) => void;
  onNodeHover?: (event: NetworkInteractionEvent) => void;
  onCanvasClick?: (event: NetworkInteractionEvent) => void;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
  role?: string;
}
```

### NetworkCanvas
Low-level canvas component for custom implementations.

```typescript
interface NetworkCanvasProps {
  width: number;
  height: number;
  nodes: NetworkNodeData[];
  edges: NetworkEdgeData[];
  theme: NetworkTheme;
  onRender?: (context: CanvasRenderingContext2D) => void;
  className?: string;
}
```

### UI Components

#### AccessibilityControls
Provides accessibility control panel.

```typescript
interface AccessibilityControlsProps {
  showReducedMotion?: boolean;
  showHighContrast?: boolean;
  showKeyboardHelp?: boolean;
  showScreenReaderMode?: boolean;
  showFontSize?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'inline';
  className?: string;
  style?: React.CSSProperties;
}
```

#### ThemeSelector
Theme selection component with preview.

```typescript
interface ThemeSelectorProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'inline';
  showPreview?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
```

#### PerformanceIndicator
Real-time performance monitoring display.

```typescript
interface PerformanceIndicatorProps {
  showFPS?: boolean;
  showMemory?: boolean;
  showNodeCount?: boolean;
  showRenderTime?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  style?: React.CSSProperties;
}
```

## Hooks API

### useNetworkContext
Access network state and actions.

```typescript
const {
  nodes,
  edges,
  theme,
  dimensions,
  performanceConfig,
  accessibilityConfig,
  animationConfig,
  interactionConfig,
  metrics,
  updateNodes,
  updateEdges,
  updateDimensions,
  updateTheme,
  updatePerformance,
  updateAccessibility,
  updateAnimation,
  updateInteraction,
  updateMetrics
} = useNetworkContext();
```

### useNetworkTheme
Theme management hook.

```typescript
const {
  currentTheme,
  availablePresets,
  setPreset,
  setCustomTheme,
  resetTheme
} = useNetworkTheme(options);
```

### useNetworkPerformance
Performance monitoring and optimization.

```typescript
const {
  metrics,
  performanceTier,
  adaptiveQuality,
  enableGPU,
  updateConfig
} = useNetworkPerformance(config);
```

### useNetworkAccessibility
Accessibility features management.

```typescript
const {
  status,
  enableHighContrast,
  disableHighContrast,
  toggleReducedMotion,
  enableKeyboardNavigation,
  announceToScreenReader
} = useNetworkAccessibility(config);
```

## Type Definitions

### Core Data Types
```typescript
interface NetworkNodeData {
  id: string;
  label?: string;
  x?: number;
  y?: number;
  type?: string;
  data?: Record<string, any>;
}

interface NetworkEdgeData {
  id: string;
  source: string;
  target: string;
  type?: string;
  weight?: number;
  data?: Record<string, any>;
}

interface NetworkDimensions {
  width: number;
  height: number;
}
```

### Theme System
```typescript
interface NetworkTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
  nodes: {
    default: NodeStyle;
    selected: NodeStyle;
    hover: NodeStyle;
  };
  edges: {
    default: EdgeStyle;
    selected: EdgeStyle;
    hover: EdgeStyle;
  };
  animation: {
    duration: number;
    easing: string;
  };
}

type ThemePreset = 
  | 'default' | 'dark' | 'light'
  | 'neomintResearch' | 'neomintDark' | 'neomintMinimal'
  | 'cyberpunk' | 'organic' | 'corporate';
```

### Configuration Types
```typescript
interface NetworkPerformanceConfig {
  tier: 'low' | 'medium' | 'high';
  maxFPS: number;
  enableGPUAcceleration: boolean;
  adaptiveQuality: boolean;
  maxNodes: number;
  maxEdges: number;
}

interface NetworkAccessibilityConfig {
  enableKeyboardNavigation: boolean;
  enableScreenReader: boolean;
  highContrastMode: boolean;
  reducedMotion: boolean;
  focusIndicators: boolean;
  alternativeText: boolean;
}

interface NetworkAnimationConfig {
  enableAnimations: boolean;
  duration: number;
  easing: string;
  staggerDelay: number;
}

interface NetworkInteractionConfig {
  enablePanning: boolean;
  enableZooming: boolean;
  enableSelection: boolean;
  enableDragging: boolean;
  multiSelect: boolean;
}
```

## Constants

### Theme Presets
```typescript
import { THEME_PRESETS } from '@neomint/animations';

// Available presets:
// THEME_PRESETS.default
// THEME_PRESETS.dark
// THEME_PRESETS.light
// THEME_PRESETS.neomintResearch
// THEME_PRESETS.neomintDark
// THEME_PRESETS.neomintMinimal
// THEME_PRESETS.cyberpunk
// THEME_PRESETS.organic
// THEME_PRESETS.corporate
```

### Performance Tiers
```typescript
import { PERFORMANCE_TIERS } from '@neomint/animations';

// Available tiers:
// PERFORMANCE_TIERS.low
// PERFORMANCE_TIERS.medium
// PERFORMANCE_TIERS.high
```

### Network Defaults
```typescript
import { NETWORK_DEFAULTS } from '@neomint/animations';

// Default configuration values for all network components
```

## Legacy Components API

### DataNetwork (Legacy)
Original component maintained for backward compatibility.

```javascript
// Props remain the same as previous versions
<DataNetwork 
  data={data}
  width={800}
  height={600}
  theme="dark"
  onNodeClick={handleNodeClick}
/>
```

### Legacy Themes
```javascript
import { themes } from '@neomint/animations';

// Legacy themes are still available:
// themes.default
// themes.dark
// Plus all modern theme presets
```

### Legacy Utils
```javascript
import { utils } from '@neomint/animations';

// All legacy utility functions remain available
```

## Migration Guide

For detailed migration instructions, see [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md).

## TypeScript Examples

For comprehensive TypeScript usage examples, see [TYPESCRIPT_EXAMPLES.md](./TYPESCRIPT_EXAMPLES.md).
