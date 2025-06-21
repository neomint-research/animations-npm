# Themes Guide

NEOMINT provides a comprehensive theming system with 16+ built-in themes, automatic CSS variable detection, and custom theme support.

## Theme System Overview

NEOMINT's theming system has three layers:
1. **Automatic Detection** - Detects and uses your app's CSS variables
2. **Built-in Presets** - Professional themes for various use cases
3. **Custom Themes** - Full control over visual appearance

## Using Themes

### Auto Theme Detection

NEOMINT can automatically detect and use your application's CSS variables:

```jsx
<DataNetwork theme="auto" />
```

Detected CSS variables:
- `--color-primary` - Primary brand color
- `--color-primary-rgb` - RGB values for opacity
- `--color-background` - Background color
- `--animation-node-color` - Node color override
- `--animation-line-color` - Line color override
- `--animation-background` - Animation background

### Theme Modes

```jsx
// Auto-detect from CSS
<DataNetwork theme="auto" />

// Force light theme
<DataNetwork theme="light" />

// Force dark theme  
<DataNetwork theme="dark" />
```

## Built-in Theme Presets

### NEOMINT Brand Themes

#### `default`
- **Node Color**: `#ffffff`
- **Line Color**: `rgba(255, 255, 255, 0.1)`
- **Background**: `transparent`
- **Use Case**: General purpose, works on any background

#### `neomintResearch`
- **Node Color**: `#00958F` (NEOMINT Mint)
- **Line Color**: `rgba(0, 149, 143, 0.2)`
- **Background**: `linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)`
- **Use Case**: Research presentations, professional contexts

#### `neomintDark`
- **Node Color**: `#00958F`
- **Line Color**: `rgba(0, 149, 143, 0.3)`
- **Background**: `#1a1a1a`
- **Use Case**: Dark mode applications

#### `neomintMinimal`
- **Node Color**: `#002B2B` (NEOMINT Dark Green)
- **Line Color**: `rgba(0, 43, 43, 0.15)`
- **Background**: `transparent`
- **Use Case**: Minimalist designs, subtle presence

#### `neomintHero`
- **Node Color**: `#ffffff`
- **Line Color**: `rgba(255, 255, 255, 0.25)`
- **Background**: `linear-gradient(135deg, #00958F 0%, #002B2B 100%)`
- **Use Case**: Hero sections, high visual impact

### Industry-Specific Themes

#### `cybersecurity`
- **Node Color**: `#00d4ff` (Cyan)
- **Line Color**: `rgba(0, 212, 255, 0.3)`
- **Background**: `#000000`
- **Industry**: Cybersecurity, tech
- **Mood**: High-tech, futuristic

#### `aiResearch`
- **Node Color**: `#ff6b6b` (Coral)
- **Line Color**: `rgba(255, 107, 107, 0.25)`
- **Background**: `linear-gradient(135deg, #4ecdc4 0%, #44a8b3 100%)`
- **Industry**: AI, machine learning
- **Mood**: Innovative, creative

#### `dataScience`
- **Node Color**: `#9c88ff` (Purple)
- **Line Color**: `rgba(156, 136, 255, 0.2)`
- **Background**: `#f0f0f0`
- **Industry**: Data analytics
- **Mood**: Analytical, professional

#### `fintech`
- **Node Color**: `#2ecc71` (Green)
- **Line Color**: `rgba(46, 204, 113, 0.2)`
- **Background**: `#e8f4fd`
- **Industry**: Finance, banking
- **Mood**: Trustworthy, stable

#### `healthcare`
- **Node Color**: `#3498db` (Blue)
- **Line Color**: `rgba(52, 152, 219, 0.15)`
- **Background**: `#ffffff`
- **Industry**: Healthcare, medical
- **Mood**: Clean, professional

#### `gaming`
- **Node Color**: `#e74c3c` (Red)
- **Line Color**: `rgba(231, 76, 60, 0.35)`
- **Background**: `linear-gradient(135deg, #2c3e50 0%, #34495e 100%)`
- **Industry**: Gaming, entertainment
- **Mood**: Energetic, dynamic

### Performance-Based Themes

These themes include performance optimizations:

#### `desktopHeavy`
- **Performance**: High-end desktop
- **Node Count**: 100
- **Animation Speed**: 0.8
- **Connection Distance**: 160
- **Target**: Powerful desktop machines

#### `desktopStandard`
- **Performance**: Standard desktop
- **Node Count**: 60
- **Animation Speed**: 0.5
- **Connection Distance**: 120
- **Target**: Average desktop computers

#### `mobileLight`
- **Performance**: Mobile optimized
- **Node Count**: 25
- **Animation Speed**: 0.3
- **Connection Distance**: 80
- **Target**: Modern smartphones

#### `mobileMinimal`
- **Performance**: Low-end mobile
- **Node Count**: 15
- **Animation Speed**: 0.2
- **Connection Distance**: 60
- **Target**: Budget devices

#### `accessibilitySafe`
- **Performance**: Minimal motion
- **Node Count**: 12
- **Animation Speed**: 0.1
- **Connection Distance**: 60
- **Special**: WCAG AAA compliant

#### `backgroundSubtle`
- **Performance**: Background decoration
- **Node Count**: 30
- **Animation Speed**: 0.2
- **Connection Distance**: 100
- **Opacity**: 0.6

#### `presentationMode`
- **Performance**: Balanced for projection
- **Node Count**: 80
- **Animation Speed**: 0.4
- **Connection Distance**: 140
- **Visual Impact**: High

## Creating Custom Themes

### Basic Custom Theme

```jsx
<DataNetwork
  theme={{
    nodeColor: '#ff00ff',
    lineColor: 'rgba(255, 0, 255, 0.2)',
    backgroundColor: '#000000'
  }}
/>
```

### Advanced Custom Theme

```jsx
const customTheme = {
  // Required colors
  nodeColor: '#00ff00',
  lineColor: 'rgba(0, 255, 0, 0.15)',
  backgroundColor: 'linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 100%)',
  
  // Performance settings (optional)
  nodeCount: 40,
  animationSpeed: 0.6,
  connectionDistance: 100,
  
  // Metadata (optional)
  metadata: {
    industry: 'custom',
    mood: 'unique',
    primaryColor: '#00ff00',
    contrastRatio: 'high'
  }
};

<DataNetwork theme={customTheme} />
```

### Theme with CSS Variables

Define CSS variables in your app:

```css
:root {
  --color-primary: #ff6b6b;
  --color-primary-rgb: 255, 107, 107;
  --animation-node-color: #ff6b6b;
  --animation-line-color: rgba(255, 107, 107, 0.3);
  --animation-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

Then use auto-detection:

```jsx
<DataNetwork theme="auto" />
```

## Theme Inheritance

Combine presets with overrides:

```jsx
// Start with a preset
<DataNetwork
  preset="neomintDark"
  nodeColor="#ff00ff"  // Override just the node color
/>

// Performance preset with visual overrides
<DataNetwork
  preset="mobileLight"
  theme={{
    nodeColor: '#00ff00',
    lineColor: 'rgba(0, 255, 0, 0.2)'
  }}
/>
```

## Theme Utilities

### Getting Theme Information

```jsx
import { getThemeMetadata, getAllThemes } from 'neomint/utils';

// Get metadata for a theme
const metadata = getThemeMetadata('cybersecurity');
// Returns: { industry, mood, primaryColor, contrastRatio }

// Get all available themes
const themes = getAllThemes();
// Returns array of theme objects with names and configs
```

### Theme Selection by Industry

```jsx
import { getThemesByIndustry } from 'neomint/utils';

const financeThemes = getThemesByIndustry('fintech');
const gamingThemes = getThemesByIndustry('gaming');
```

### Performance Impact Analysis

```jsx
import { calculatePerformanceImpact } from 'neomint/utils';

const impact = calculatePerformanceImpact('desktopHeavy');
// Returns: {
//   overall: 75,
//   cpu: 80,
//   gpu: 70,
//   memory: 75,
//   battery: 70,
//   level: 'heavy'
// }
```

## Best Practices

### 1. Context-Appropriate Themes

Choose themes based on usage context:

```jsx
// Hero sections
<DataNetwork preset="neomintHero" context="hero" />

// Backgrounds
<DataNetwork preset="backgroundSubtle" context="background" />

// Dashboards
<DataNetwork preset="neomintMinimal" context="dashboard" />
```

### 2. Responsive Theming

Adapt themes based on device:

```jsx
const ResponsiveNetwork = () => {
  const isMobile = window.innerWidth < 768;
  
  return (
    <DataNetwork
      preset={isMobile ? 'mobileLight' : 'desktopStandard'}
    />
  );
};
```

### 3. Dark Mode Support

```jsx
const ThemedNetwork = () => {
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  return (
    <DataNetwork
      preset={isDarkMode ? 'neomintDark' : 'neomintResearch'}
    />
  );
};
```

### 4. Accessibility Considerations

Always consider contrast ratios:

```jsx
// High contrast for accessibility
<DataNetwork
  preset="accessibilitySafe"
  accessibility="respect-motion"
/>
```

## Theme Examples

### Professional Dashboard

```jsx
<DataNetwork
  preset="neomintMinimal"
  width="100%"
  height="200px"
  nodeCount={30}
  animationSpeed={0.3}
/>
```

### Marketing Hero Section

```jsx
<DataNetwork
  preset="neomintHero"
  width="100vw"
  height="60vh"
  interactive={true}
  pauseOnHover={true}
/>
```

### Technical Documentation

```jsx
<DataNetwork
  preset="dataScience"
  context="background"
  opacity={0.5}
  staticMode={true}  // Static for documentation
/>
```

### Gaming Platform

```jsx
<DataNetwork
  preset="gaming"
  nodeCount={100}
  animationSpeed={0.8}
  enableGPUAcceleration={true}
  maxFPS={60}
/>
```

## Theme Color Reference

### NEOMINT Brand Colors

- **Primary Mint**: `#00958F`
- **Dark Green**: `#002B2B`
- **Light Background**: `#FFFFFF`
- **Dark Background**: `#1a1a1a`

### Recommended Color Combinations

1. **Light Mode**
   - Nodes: `#002B2B`
   - Lines: `rgba(0, 43, 43, 0.15)`
   - Background: `#FFFFFF` or `transparent`

2. **Dark Mode**
   - Nodes: `#00958F`
   - Lines: `rgba(0, 149, 143, 0.3)`
   - Background: `#1a1a1a` or `#000000`

3. **High Contrast**
   - Nodes: `#FFFFFF`
   - Lines: `rgba(255, 255, 255, 0.4)`
   - Background: `#000000`