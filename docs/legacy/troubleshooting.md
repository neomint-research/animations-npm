# Troubleshooting Guide

This guide helps you resolve common issues with NEOMINT animations.

## Common Issues and Solutions

### Animation Not Showing

#### Issue: Blank or empty container

**Possible Causes & Solutions:**

1. **No dimensions specified**
   ```jsx
   // ❌ Wrong - container has no height
   <div>
     <DataNetwork />
   </div>
   
   // ✅ Correct - explicit dimensions
   <div style={{ width: '100%', height: '400px' }}>
     <DataNetwork />
   </div>
   ```

2. **Parent container has zero height**
   ```jsx
   // ❌ Wrong - flexbox child needs explicit height
   <div style={{ display: 'flex' }}>
     <DataNetwork />
   </div>
   
   // ✅ Correct - use flex: 1 or explicit height
   <div style={{ display: 'flex', height: '400px' }}>
     <DataNetwork style={{ flex: 1 }} />
   </div>
   ```

3. **Canvas not supported**
   ```jsx
   // Add fallback for older browsers
   <DataNetwork
     onError={(error) => {
       console.error('Canvas not supported:', error);
       // Show fallback content
     }}
   />
   ```

#### Debugging Steps:

1. Check browser console for errors
2. Inspect element to verify dimensions
3. Test in different browsers
4. Enable debug mode: `<DataNetwork debug={true} />`

### Performance Issues

#### Issue: Low FPS / Choppy Animation

**Solutions:**

1. **Enable automatic optimization**
   ```jsx
   <DataNetwork performance="auto" />
   ```

2. **Reduce node count**
   ```jsx
   // High-end devices
   <DataNetwork nodeCount={100} />
   
   // Mobile/low-end
   <DataNetwork nodeCount={25} />
   ```

3. **Limit frame rate**
   ```jsx
   <DataNetwork maxFPS={30} />
   ```

4. **Use performance tiers**
   ```jsx
   <DataNetwork performanceTier="low" />
   ```

#### Issue: High CPU Usage

**Solutions:**

1. **Reduce animation complexity**
   ```jsx
   <DataNetwork
     animationSpeed={0.3}
     connectionDistance={80}
     nodeCount={30}
   />
   ```

2. **Pause when not visible**
   ```jsx
   import { useInView } from 'react-intersection-observer';
   
   function OptimizedNetwork() {
     const { ref, inView } = useInView();
     
     return (
       <div ref={ref}>
         <DataNetwork autoPlay={inView} />
       </div>
     );
   }
   ```

3. **Disable GPU acceleration if causing issues**
   ```jsx
   <DataNetwork enableGPUAcceleration={false} />
   ```

### Browser Compatibility

#### Issue: Not working in Safari

**Solution:**
```jsx
// Add Safari-specific fixes
<DataNetwork
  enableGPUAcceleration={false}  // Safari GPU issues
  maxFPS={30}  // Better Safari performance
/>
```

#### Issue: Internet Explorer 11

**Solution:**
```jsx
// Provide static fallback
const isIE11 = !!window.MSInputMethodContext;

{isIE11 ? (
  <img src="/static-network.png" alt="Network visualization" />
) : (
  <DataNetwork />
)}
```

#### Issue: Mobile browser crashes

**Solution:**
```jsx
// Use minimal settings for mobile
const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

<DataNetwork
  performanceTier={isMobile ? 'minimal' : 'auto'}
  nodeCount={isMobile ? 15 : 50}
  maxFPS={isMobile ? 24 : 60}
/>
```

### Build and Bundling Issues

#### Issue: Module not found errors

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install neomint
```

#### Issue: TypeScript errors

**Solution:**
```typescript
// Add types
npm install --save-dev @types/neomint

// Or declare module
declare module 'neomint' {
  export const DataNetwork: React.FC<any>;
}
```

#### Issue: SSR/Next.js errors

**Solution:**
```jsx
// Dynamic import with no SSR
import dynamic from 'next/dynamic';

const DataNetwork = dynamic(
  () => import('neomint').then(mod => mod.DataNetwork),
  { ssr: false }
);
```

#### Issue: Webpack build errors

**Solution:**
```javascript
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      'neomint': path.resolve(__dirname, 'node_modules/neomint')
    }
  }
};
```

### Theme and Styling Issues

#### Issue: Theme not applying

**Solutions:**

1. **Check theme prop syntax**
   ```jsx
   // ❌ Wrong
   <DataNetwork theme="cybersecurity" />
   
   // ✅ Correct - use preset for named themes
   <DataNetwork preset="cybersecurity" />
   ```

2. **CSS variables not detected**
   ```jsx
   // Ensure CSS variables are on :root
   :root {
     --color-primary: #00958F;
     --animation-node-color: #00958F;
   }
   
   // Force refresh
   <DataNetwork 
     theme="auto"
     key={Date.now()} // Force re-render
   />
   ```

3. **Custom theme validation**
   ```jsx
   // Check console for validation errors
   <DataNetwork
     theme={{
       nodeColor: '#invalid',  // Will show warning
       lineColor: 'rgba(0,0,0,0.2)',
       backgroundColor: 'transparent'
     }}
     validateProps={true}
   />
   ```

#### Issue: Colors look different than expected

**Solution:**
```jsx
// Disable opacity if colors appear faded
<DataNetwork
  opacity={1}
  lineColor="rgba(255, 255, 255, 0.5)"  // Control opacity here
/>
```

### Memory Leaks

#### Issue: Memory usage increasing over time

**Solutions:**

1. **Proper cleanup**
   ```jsx
   function NetworkComponent() {
     const networkRef = useRef();
     
     useEffect(() => {
       return () => {
         // Clean up on unmount
         networkRef.current?.pause();
         networkRef.current = null;
       };
     }, []);
     
     return <DataNetwork ref={networkRef} />;
   }
   ```

2. **Avoid creating new objects in render**
   ```jsx
   // ❌ Wrong - creates new object every render
   <DataNetwork
     theme={{ nodeColor: '#fff', lineColor: '#000' }}
   />
   
   // ✅ Correct - stable reference
   const theme = useMemo(() => ({
     nodeColor: '#fff',
     lineColor: '#000'
   }), []);
   
   <DataNetwork theme={theme} />
   ```

### Accessibility Issues

#### Issue: Screen reader not announcing

**Solution:**
```jsx
<DataNetwork
  ariaLabel="Descriptive label for the animation"
  role="img"
  aria-live="polite"
/>
```

#### Issue: Reduced motion not working

**Solution:**
```jsx
// Ensure accessibility mode is set
<DataNetwork
  accessibility="respect-motion"
  reducedMotion={true}  // Force if needed
/>
```

## FAQ Section

### General Questions

**Q: Why is my animation running slowly?**

A: NEOMINT automatically adjusts to device capabilities. To improve performance:
- Use `performance="auto"`
- Reduce `nodeCount`
- Lower `animationSpeed`
- Set `maxFPS={30}` for mobile

**Q: Can I use NEOMINT with React Native?**

A: No, NEOMINT is designed for web browsers only. It requires Canvas API support.

**Q: How do I make the animation responsive?**

A: NEOMINT is responsive by default. Use percentage values:
```jsx
<DataNetwork width="100%" height="50vh" />
```

**Q: Can I customize individual nodes?**

A: Currently, all nodes share the same styling. For individual node customization, consider using the theme system with different presets.

### Performance Questions

**Q: What's the maximum number of nodes I should use?**

A: Depends on the device:
- Desktop (high-end): 100-150 nodes
- Desktop (standard): 50-80 nodes
- Mobile (modern): 20-30 nodes
- Mobile (low-end): 10-15 nodes

**Q: How can I test performance?**

A: Enable performance monitoring:
```jsx
<DataNetwork
  showStats={true}
  onPerformanceChange={(data) => console.log(data)}
/>
```

**Q: Why does GPU acceleration cause issues?**

A: Some browsers/devices have GPU driver issues. Disable if experiencing problems:
```jsx
<DataNetwork enableGPUAcceleration={false} />
```

### Styling Questions

**Q: How do I create a gradient background?**

A: Use CSS gradient syntax:
```jsx
<DataNetwork
  backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
/>
```

**Q: Can I use images as backgrounds?**

A: Apply to the container, not the component:
```jsx
<div style={{ 
  backgroundImage: 'url(/bg.jpg)',
  backgroundSize: 'cover'
}}>
  <DataNetwork backgroundColor="transparent" />
</div>
```

**Q: How do I match my brand colors?**

A: Create a custom theme:
```jsx
<DataNetwork
  theme={{
    nodeColor: '#yourBrandColor',
    lineColor: 'rgba(yourR, yourG, yourB, 0.2)',
    backgroundColor: 'transparent'
  }}
/>
```

## Debugging Tools

### Enable Debug Mode

```jsx
<DataNetwork
  debug={true}
  showStats={true}
  validateProps={true}
  onError={(error) => console.error('DataNetwork Error:', error)}
/>
```

### Performance Profiling

```jsx
function ProfiledNetwork() {
  const [metrics, setMetrics] = useState({});
  
  return (
    <>
      <DataNetwork
        analytics={true}
        onPerformanceChange={setMetrics}
      />
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
    </>
  );
}
```

### Browser DevTools

1. **Performance Tab**: Record animation performance
2. **Memory Tab**: Check for memory leaks
3. **Network Tab**: Verify asset loading
4. **Console**: Check for errors/warnings

## Getting Additional Help

### Before Reporting Issues

1. Check you're using the latest version
2. Test in different browsers
3. Try with minimal configuration
4. Check browser console for errors
5. Review this troubleshooting guide

### Reporting Bugs

Include:
- NEOMINT version
- Browser and OS
- Minimal reproduction code
- Error messages/screenshots
- Performance metrics

### Community Support

- GitHub Issues: Bug reports and feature requests
- GitHub Discussions: General questions
- Stack Overflow: Tag with `neomint`
- Discord: Real-time help

### Professional Support

For enterprise support, contact: support@neomint.dev