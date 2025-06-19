# Performance Guide

NEOMINT is designed with performance as a core feature, offering automatic optimization, manual controls, and comprehensive monitoring tools.

## Performance Modes

### Automatic Performance Mode (Default)

NEOMINT automatically optimizes based on device capabilities:

```jsx
<DataNetwork performance="auto" />
```

This mode:
- Detects device hardware (CPU cores, memory, GPU)
- Adjusts node count, animation speed, and quality
- Monitors FPS and adapts in real-time
- Respects battery and power saving modes

### Manual Performance Mode

Take full control over performance settings:

```jsx
<DataNetwork
  performance="manual"
  nodeCount={100}
  animationSpeed={0.8}
  connectionDistance={150}
  maxFPS={60}
/>
```

## Performance Tiers

NEOMINT uses a tiered system to match animation complexity to device capabilities:

### High Performance Tier

**Target**: High-end desktops with dedicated GPUs
- Node Count: 80-100+
- Animation Speed: 0.6-0.8
- Connection Distance: 140-160
- FPS Target: 60
- GPU Acceleration: Enabled

```jsx
<DataNetwork performanceTier="high" />
```

### Medium Performance Tier

**Target**: Standard desktops and high-end laptops
- Node Count: 40-60
- Animation Speed: 0.4-0.5
- Connection Distance: 100-120
- FPS Target: 30-60
- GPU Acceleration: Enabled

```jsx
<DataNetwork performanceTier="medium" />
```

### Low Performance Tier

**Target**: Mobile devices and older computers
- Node Count: 20-30
- Animation Speed: 0.2-0.3
- Connection Distance: 60-80
- FPS Target: 24-30
- GPU Acceleration: Optional

```jsx
<DataNetwork performanceTier="low" />
```

### Minimal Performance Tier

**Target**: Low-end devices and accessibility mode
- Node Count: 10-15
- Animation Speed: 0.1-0.2
- Connection Distance: 40-60
- FPS Target: 15-24
- GPU Acceleration: Disabled

```jsx
<DataNetwork performanceTier="minimal" />
```

## Performance Monitoring

### Using usePerformanceMonitor Hook

Monitor real-time performance metrics:

```jsx
import { DataNetwork, usePerformanceMonitor } from 'neomint';

function MonitoredAnimation() {
  const {
    fps,
    averageFPS,
    performanceLevel,
    deviceCapabilities,
    optimalSettings,
    recordFrame
  } = usePerformanceMonitor(true);

  return (
    <div>
      <DataNetwork
        nodeCount={optimalSettings.nodeCount}
        animationSpeed={optimalSettings.animationSpeed}
      />
      <div>
        Current FPS: {fps} | Average: {averageFPS}
        <br />
        Performance Level: {performanceLevel}
      </div>
    </div>
  );
}
```

### Built-in Performance Stats

Enable performance overlay:

```jsx
<DataNetwork
  showStats={true}
  analytics={true}
  debug={true}
/>
```

This displays:
- Real-time FPS
- Frame time (ms)
- Node update count
- Performance level
- Device capabilities
- Animation state

### Performance Events

Monitor performance changes:

```jsx
<DataNetwork
  onPerformanceChange={({ level, tier, fps, impact, deviceCapabilities }) => {
    console.log('Performance Update:', {
      level,        // 'high', 'medium', 'low'
      tier,         // Current tier name
      fps,          // Current FPS
      impact: {
        score,      // 0-100 performance impact
        level,      // 'light', 'moderate', 'heavy'
        cpu,        // CPU usage estimate
        gpu,        // GPU usage estimate
        memory,     // Memory usage estimate
        battery     // Battery impact estimate
      }
    });
  }}
/>
```

## Optimization Strategies

### 1. Context-Based Optimization

Use appropriate contexts for automatic optimization:

```jsx
// Background animations - automatically reduced
<DataNetwork context="background" />

// Hero sections - balanced performance
<DataNetwork context="hero" />

// Dashboards - optimized for continuous viewing
<DataNetwork context="dashboard" />

// Loading states - minimal resources
<DataNetwork context="loading" />
```

### 2. FPS Limiting

Cap frame rate for better battery life:

```jsx
// Mobile devices
<DataNetwork maxFPS={30} />

// Battery saving mode
<DataNetwork maxFPS={15} />

// Smooth desktop experience
<DataNetwork maxFPS={60} />
```

### 3. GPU Acceleration

Control GPU usage:

```jsx
// Enable for desktop
<DataNetwork enableGPUAcceleration={true} />

// Disable for compatibility
<DataNetwork enableGPUAcceleration={false} />
```

### 4. Dynamic Quality Adjustment

Implement adaptive quality:

```jsx
function AdaptiveAnimation() {
  const [quality, setQuality] = useState('auto');
  
  return (
    <DataNetwork
      performance="auto"
      onPerformanceChange={({ fps, level }) => {
        if (fps < 20) {
          setQuality('minimal');
        } else if (fps < 30) {
          setQuality('low');
        } else {
          setQuality('auto');
        }
      }}
      performanceTier={quality}
    />
  );
}
```

## Best Practices for Large Datasets

### 1. Progressive Enhancement

Start minimal and enhance based on performance:

```jsx
function ProgressiveNetwork({ data }) {
  const [nodeCount, setNodeCount] = useState(20);
  const [canEnhance, setCanEnhance] = useState(false);

  return (
    <DataNetwork
      nodeCount={nodeCount}
      onPerformanceChange={({ fps, deviceCapabilities }) => {
        if (fps > 50 && deviceCapabilities.isHighPerformance) {
          setCanEnhance(true);
        }
      }}
      onAnimationComplete={() => {
        if (canEnhance && nodeCount < data.length) {
          setNodeCount(prev => Math.min(prev + 10, data.length));
        }
      }}
    />
  );
}
```

### 2. Viewport-Based Rendering

Only animate when visible:

```jsx
import { useInView } from 'react-intersection-observer';

function ViewportAwareNetwork() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  return (
    <div ref={ref}>
      <DataNetwork
        autoPlay={inView}
        staticMode={!inView}
      />
    </div>
  );
}
```

### 3. Performance Budgets

Set performance constraints:

```jsx
const PERFORMANCE_BUDGET = {
  mobile: {
    maxNodes: 30,
    maxSpeed: 0.3,
    targetFPS: 24
  },
  desktop: {
    maxNodes: 80,
    maxSpeed: 0.6,
    targetFPS: 45
  }
};

function BudgetedAnimation() {
  const isMobile = /iPhone|Android/i.test(navigator.userAgent);
  const budget = isMobile ? PERFORMANCE_BUDGET.mobile : PERFORMANCE_BUDGET.desktop;

  return (
    <DataNetwork
      nodeCount={budget.maxNodes}
      animationSpeed={budget.maxSpeed}
      maxFPS={budget.targetFPS}
    />
  );
}
```

### 4. Memory Management

Prevent memory leaks with proper cleanup:

```jsx
function ManagedAnimation() {
  const networkRef = useRef();

  useEffect(() => {
    // Start animation
    networkRef.current?.play();

    return () => {
      // Clean up on unmount
      networkRef.current?.pause();
      networkRef.current?.reset();
    };
  }, []);

  return <DataNetwork ref={networkRef} />;
}
```

## Device-Specific Optimizations

### Mobile Optimization

```jsx
const MobileOptimizedNetwork = () => {
  const [settings, setSettings] = useState({
    nodeCount: 20,
    animationSpeed: 0.2,
    maxFPS: 24,
    enableGPUAcceleration: false
  });

  useEffect(() => {
    // Detect battery level
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        if (battery.level < 0.2) {
          setSettings(prev => ({
            ...prev,
            animationSpeed: 0.1,
            maxFPS: 15
          }));
        }
      });
    }
  }, []);

  return <DataNetwork {...settings} />;
};
```

### Desktop Optimization

```jsx
const DesktopOptimizedNetwork = () => {
  return (
    <DataNetwork
      performanceTier="high"
      enableGPUAcceleration={true}
      maxFPS={60}
      nodeCount={100}
      animationSpeed={0.8}
    />
  );
};
```

## Performance Metrics

### Understanding Performance Impact

```jsx
import { calculatePerformanceImpact } from 'neomint/utils';

// Analyze theme performance
const impact = calculatePerformanceImpact('desktopHeavy');
console.log({
  overall: impact.overall,        // 0-100 score
  cpu: impact.cpu,               // CPU impact
  gpu: impact.gpu,               // GPU impact
  memory: impact.memory,         // Memory impact
  battery: impact.battery,       // Battery drain
  level: impact.level           // 'minimal', 'light', 'moderate', 'heavy', 'intensive'
});
```

### Performance Recommendations

```jsx
import { getPerformanceRecommendations } from 'neomint/utils';

const recommendations = getPerformanceRecommendations({
  deviceType: 'mobile',
  gpu: 'integrated',
  memory: 4,
  cores: 4,
  networkSpeed: 'slow',
  batteryLevel: 50,
  powerMode: 'balanced'
});

// Returns:
// {
//   recommendedTheme: 'mobileLight',
//   alternatives: ['mobileMinimal', 'accessibilitySafe'],
//   warnings: ['Limited memory available'],
//   optimizations: ['Reduce node count', 'Limit FPS to 30']
// }
```

## Troubleshooting Performance Issues

### Common Issues and Solutions

1. **Low FPS on Mobile**
   ```jsx
   <DataNetwork
     performanceTier="minimal"
     maxFPS={24}
     enableGPUAcceleration={false}
   />
   ```

2. **Janky Animation**
   ```jsx
   <DataNetwork
     nodeCount={30}  // Reduce nodes
     connectionDistance={80}  // Shorter connections
     performance="auto"  // Let NEOMINT optimize
   />
   ```

3. **High CPU Usage**
   ```jsx
   <DataNetwork
     animationSpeed={0.3}  // Slower animation
     maxFPS={30}  // Cap frame rate
     pauseOnHover={true}  // Allow pausing
   />
   ```

4. **Memory Leaks**
   ```jsx
   // Always use refs and cleanup
   const networkRef = useRef();
   
   useEffect(() => {
     return () => {
       networkRef.current?.pause();
     };
   }, []);
   ```

## Performance Checklist

- [ ] Use `performance="auto"` for automatic optimization
- [ ] Set appropriate `context` for usage scenario
- [ ] Implement viewport-based rendering for off-screen animations
- [ ] Monitor performance with `onPerformanceChange`
- [ ] Set `maxFPS` based on device type
- [ ] Use performance tiers for manual control
- [ ] Clean up animations on component unmount
- [ ] Test on real devices, not just desktop
- [ ] Consider battery and power saving modes
- [ ] Use static mode for decorative backgrounds

## Advanced Performance Tuning

### Custom Performance Monitor

```jsx
class CustomPerformanceMonitor {
  constructor(thresholds = {}) {
    this.thresholds = {
      critical: 15,
      low: 30,
      target: 45,
      ...thresholds
    };
    this.measurements = [];
  }

  measure(callback) {
    const start = performance.now();
    callback();
    const duration = performance.now() - start;
    
    this.measurements.push(duration);
    if (this.measurements.length > 60) {
      this.measurements.shift();
    }
    
    return this.analyze();
  }

  analyze() {
    const avg = this.measurements.reduce((a, b) => a + b, 0) / this.measurements.length;
    const fps = 1000 / avg;
    
    return {
      fps: Math.round(fps),
      status: fps < this.thresholds.critical ? 'critical' :
              fps < this.thresholds.low ? 'low' :
              fps < this.thresholds.target ? 'acceptable' : 'optimal'
    };
  }
}
```

### Performance Profiling

Enable detailed profiling:

```jsx
<DataNetwork
  debug={true}
  showStats={true}
  analytics={true}
  validateProps={true}
  onPerformanceChange={(data) => {
    // Log to analytics service
    analytics.track('animation_performance', data);
  }}
/>