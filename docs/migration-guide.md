# Migration Guide

This guide helps you upgrade NEOMINT to newer versions and migrate from older animation libraries.

## Version Migration

### Upgrading to v2.0.0

#### Breaking Changes

1. **Theme System Overhaul**
   ```jsx
   // Old (v1.x)
   <DataNetwork color="mint" mode="dark" />
   
   // New (v2.0)
   <DataNetwork preset="neomintDark" theme="auto" />
   ```

2. **Performance API Changes**
   ```jsx
   // Old (v1.x)
   <DataNetwork quality="high" autoOptimize={true} />
   
   // New (v2.0)
   <DataNetwork performance="auto" performanceTier="high" />
   ```

3. **Accessibility Props**
   ```jsx
   // Old (v1.x)
   <DataNetwork respectMotion={true} a11y={true} />
   
   // New (v2.0)
   <DataNetwork accessibility="respect-motion" ariaLabel="Network visualization" />
   ```

4. **Event Handler Names**
   ```jsx
   // Old (v1.x)
   <DataNetwork
     onFrame={(fps) => {}}
     onTheme={(theme) => {}}
   />
   
   // New (v2.0)
   <DataNetwork
     onPerformanceChange={({ fps, level }) => {}}
     onThemeChange={({ theme, preset }) => {}}
   />
   ```

#### New Features in v2.0

- Smart defaults based on device and context
- CSS variable auto-detection
- Performance monitoring hooks
- Industry-specific themes
- Enhanced accessibility modes

#### Migration Steps

1. **Update imports**
   ```jsx
   // Old
   import DataNetwork from 'neomint/DataNetwork';
   
   // New
   import { DataNetwork } from 'neomint';
   ```

2. **Update theme usage**
   ```jsx
   // Old
   <DataNetwork
     color="mint"
     mode="dark"
     background="#1a1a1a"
   />
   
   // New
   <DataNetwork
     preset="neomintDark"
     theme="auto"
     backgroundColor="#1a1a1a"
   />
   ```

3. **Update performance settings**
   ```jsx
   // Old
   <DataNetwork
     quality="high"
     fps={60}
     nodes={100}
   />
   
   // New
   <DataNetwork
     performanceTier="high"
     maxFPS={60}
     nodeCount={100}
   />
   ```

4. **Update event handlers**
   ```jsx
   // Old
   <DataNetwork
     onFrame={(fps) => console.log(fps)}
     onLoad={() => console.log('loaded')}
   />
   
   // New
   <DataNetwork
     onPerformanceChange={({ fps }) => console.log(fps)}
     onAnimationComplete={({ cycles }) => console.log('cycle:', cycles)}
   />
   ```

### Upgrading from v1.x to v2.0

#### Automated Migration Script

Run the migration script to automatically update most changes:

```bash
npx neomint-migrate v2
```

This will:
- Update import statements
- Rename deprecated props
- Add required accessibility props
- Update event handler names

#### Manual Migration Checklist

- [ ] Update all import statements
- [ ] Replace color/mode props with preset/theme
- [ ] Update performance-related props
- [ ] Add ariaLabel to all instances
- [ ] Update event handler names
- [ ] Test with reduced motion enabled
- [ ] Verify theme appearance

## Migrating from Other Libraries

### From particles.js

```jsx
// particles.js configuration
particlesJS('particles', {
  particles: {
    number: { value: 80 },
    color: { value: '#ffffff' },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4
    },
    move: {
      speed: 6
    }
  }
});

// NEOMINT equivalent
<DataNetwork
  nodeCount={80}
  nodeColor="#ffffff"
  connectionDistance={150}
  lineColor="rgba(255, 255, 255, 0.4)"
  animationSpeed={0.6}
/>
```

### From react-particles-js

```jsx
// react-particles-js
import Particles from 'react-particles-js';

<Particles
  params={{
    particles: {
      number: { value: 50 },
      size: { value: 3 }
    }
  }}
/>

// NEOMINT equivalent
import { DataNetwork } from 'neomint';

<DataNetwork
  nodeCount={50}
  nodeRadius={{ min: 2, max: 4 }}
/>
```

### From three.js Particle Systems

```jsx
// three.js particle system
const geometry = new THREE.BufferGeometry();
const material = new THREE.PointsMaterial({
  color: 0x00ff00,
  size: 0.01
});
const points = new THREE.Points(geometry, material);

// NEOMINT equivalent
<DataNetwork
  nodeColor="#00ff00"
  nodeRadius={{ min: 1, max: 2 }}
  enableGPUAcceleration={true}
/>
```

## Common Migration Patterns

### 1. Theme Migration

#### Old Theme System
```jsx
// v1.x theme definition
const theme = {
  primary: '#00958F',
  background: 'dark',
  particles: {
    color: '#00958F',
    opacity: 0.8
  }
};

<DataNetwork customTheme={theme} />
```

#### New Theme System
```jsx
// v2.0 theme definition
const theme = {
  nodeColor: '#00958F',
  lineColor: 'rgba(0, 149, 143, 0.3)',
  backgroundColor: '#1a1a1a'
};

<DataNetwork theme={theme} />
// Or use a preset
<DataNetwork preset="neomintDark" />
```

### 2. Performance Settings Migration

#### Old Performance API
```jsx
// v1.x
<DataNetwork
  quality="auto"
  deviceOptimized={true}
  maxParticles={100}
  targetFPS={30}
/>
```

#### New Performance API
```jsx
// v2.0
<DataNetwork
  performance="auto"
  performanceTier="auto"
  nodeCount={100}
  maxFPS={30}
/>
```

### 3. Animation Control Migration

#### Old Control Methods
```jsx
// v1.x
const network = useRef();

network.current.start();
network.current.stop();
network.current.setSpeed(0.5);
```

#### New Control Methods
```jsx
// v2.0
const network = useRef();

network.current.play();
network.current.pause();
network.current.toggle();
// Speed is now a prop
<DataNetwork animationSpeed={0.5} />
```

### 4. Event System Migration

#### Old Events
```jsx
// v1.x
<DataNetwork
  onInit={() => {}}
  onFrame={(stats) => {}}
  onResize={() => {}}
  onDestroy={() => {}}
/>
```

#### New Events
```jsx
// v2.0
<DataNetwork
  onPerformanceChange={({ fps, level }) => {}}
  onThemeChange={({ theme }) => {}}
  onAnimationComplete={({ cycles }) => {}}
  onError={(error) => {}}
/>
```

## Deprecated Features

### Removed in v2.0

1. **Custom particle shapes** - Use nodeRadius for size variation
2. **Particle trails** - Not supported (performance reasons)
3. **3D mode** - Focus on 2D performance
4. **Custom shaders** - Use themes instead
5. **Interaction events** - Use ref methods

### Deprecated Props

| Old Prop | New Prop | Notes |
|----------|----------|-------|
| `color` | `nodeColor` | More specific naming |
| `bgColor` | `backgroundColor` | Consistent naming |
| `particles` | `nodeCount` | Clearer terminology |
| `speed` | `animationSpeed` | More descriptive |
| `quality` | `performanceTier` | Better performance model |
| `fps` | `maxFPS` | Clearer intent |
| `responsive` | automatic | Always responsive now |
| `retina` | `enableGPUAcceleration` | Better performance control |

## Testing Your Migration

### 1. Visual Regression Testing

```jsx
// Test that animations look the same
describe('Migration Visual Tests', () => {
  it('should match v1 appearance', async () => {
    const { container } = render(
      <DataNetwork
        preset="default"
        nodeCount={50}
      />
    );
    
    await expect(container).toMatchSnapshot();
  });
});
```

### 2. Performance Testing

```jsx
// Ensure performance is maintained
it('should maintain 30+ FPS', (done) => {
  let fpsReadings = [];
  
  render(
    <DataNetwork
      showStats={true}
      onPerformanceChange={({ fps }) => {
        fpsReadings.push(fps);
        
        if (fpsReadings.length > 10) {
          const avgFPS = fpsReadings.reduce((a, b) => a + b) / fpsReadings.length;
          expect(avgFPS).toBeGreaterThan(30);
          done();
        }
      }}
    />
  );
});
```

### 3. Accessibility Testing

```jsx
// Verify accessibility compliance
import { axe } from 'jest-axe';

it('should be accessible after migration', async () => {
  const { container } = render(
    <DataNetwork ariaLabel="Migrated network animation" />
  );
  
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Rollback Strategy

If you need to rollback:

1. **Keep v1.x in a separate branch**
   ```bash
   git checkout -b neomint-v1-stable
   ```

2. **Use aliasing during migration**
   ```json
   {
     "dependencies": {
       "neomint": "^2.0.0",
       "neomint-legacy": "npm:neomint@^1.9.0"
     }
   }
   ```

3. **Gradual migration**
   ```jsx
   // Use both versions during migration
   import { DataNetwork as DataNetworkV2 } from 'neomint';
   import DataNetworkV1 from 'neomint-legacy';
   
   // Migrate component by component
   const MyComponent = ({ useNewVersion }) => {
     return useNewVersion ? 
       <DataNetworkV2 {...newProps} /> : 
       <DataNetworkV1 {...oldProps} />;
   };
   ```

## Getting Help

### Migration Support

- Check the [GitHub Discussions](https://github.com/neomint/neomint/discussions)
- File issues with the `migration` label
- Join our Discord community

### Common Migration Issues

1. **Theme not applying**
   - Ensure you're using the new theme prop names
   - Check CSS variable names if using auto theme

2. **Performance degradation**
   - Use `performance="auto"` for automatic optimization
   - Check if GPU acceleration is enabled

3. **Accessibility warnings**
   - Add `ariaLabel` to all DataNetwork instances
   - Use `accessibility="respect-motion"`

### Resources

- [API Reference](./api-reference.md) - Complete v2.0 API
- [Examples](../examples/) - Updated example code
- [Changelog](../CHANGELOG.md) - Detailed change log