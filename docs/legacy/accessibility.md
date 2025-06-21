# Accessibility Guide

NEOMINT is built with accessibility as a core principle, following WCAG 2.1 guidelines and respecting user preferences.

## Accessibility Features

### Motion Preferences

NEOMINT automatically detects and respects system-level motion preferences:

```jsx
// Default - respects user preferences
<DataNetwork accessibility="respect-motion" />
```

When `prefers-reduced-motion` is enabled:
- Node count reduced to 15
- Animation speed reduced to 0.1
- Connection distance reduced to 60
- Opacity reduced to 0.3

### Accessibility Modes

#### Respect Motion (Default)

Automatically adapts to user preferences:

```jsx
<DataNetwork
  accessibility="respect-motion"
  ariaLabel="Network visualization with reduced motion"
/>
```

#### Disable Mode

Completely disables animation features:

```jsx
<DataNetwork
  accessibility="disable"
  ariaLabel="Static network diagram"
/>
```

#### Force Static Mode

Renders a static snapshot:

```jsx
<DataNetwork
  accessibility="force-static"
  staticMode={true}
/>
```

#### Custom Mode

Define custom accessibility settings:

```jsx
<DataNetwork
  accessibility="custom"
  nodeCount={10}
  animationSpeed={0.05}
  connectionDistance={50}
  opacity={0.4}
/>
```

## WCAG Compliance

### Level A Compliance

- **Non-text Content**: All animations have descriptive ARIA labels
- **Info and Relationships**: Semantic HTML structure
- **Meaningful Sequence**: Logical DOM order
- **Use of Color**: Not solely reliant on color

### Level AA Compliance

- **Contrast Ratio**: Themes meet 4.5:1 contrast requirements
- **Resize Text**: Scales with browser zoom
- **Images of Text**: Uses actual text, not images
- **Keyboard Access**: Full keyboard navigation support

### Level AAA Features

- **Contrast Enhanced**: High contrast themes available
- **Visual Presentation**: Customizable visual properties
- **Animation Control**: Play/pause controls available

## Keyboard Navigation

### Built-in Controls

Enable keyboard controls:

```jsx
import React, { useRef } from 'react';
import { DataNetwork } from 'neomint';

function AccessibleNetwork() {
  const networkRef = useRef();

  const handleKeyPress = (e) => {
    switch(e.key) {
      case ' ':  // Spacebar
        networkRef.current?.toggle();
        break;
      case 'r':  // R key
        networkRef.current?.reset();
        break;
      case 'Escape':
        networkRef.current?.pause();
        break;
    }
  };

  return (
    <div 
      tabIndex={0}
      onKeyDown={handleKeyPress}
      role="application"
      aria-label="Interactive network animation. Press space to play/pause, R to reset, Escape to stop."
    >
      <DataNetwork
        ref={networkRef}
        interactive={true}
        ariaLabel="Network visualization"
      />
    </div>
  );
}
```

### Focus Management

Proper focus indicators:

```jsx
<div
  style={{
    position: 'relative',
    ':focus': {
      outline: '2px solid #00958F',
      outlineOffset: '2px'
    }
  }}
>
  <DataNetwork />
</div>
```

## Screen Reader Support

### Descriptive Labels

Always provide meaningful ARIA labels:

```jsx
<DataNetwork
  ariaLabel="Real-time data flow visualization showing 50 connected nodes"
/>
```

### Live Regions

Animation state changes are announced:

```jsx
<DataNetwork
  ariaLabel="Network animation"
  onAnimationComplete={({ cycles }) => {
    // Automatically announces: "Animation cycle 1 completed"
  }}
/>
```

### Status Announcements

Built-in announcements for state changes:
- "Animation started"
- "Animation paused"
- "Animation reset"
- "Performance level changed to [level]"

## Motion Preferences

### Detecting User Preferences

```jsx
import { detectMotionPreferences } from 'neomint/utils';

const preferences = detectMotionPreferences();
// Returns:
// {
//   prefersReducedMotion: boolean,
//   prefersHighContrast: boolean,
//   respectMotion: boolean
// }
```

### Responding to Preference Changes

```jsx
import { createMotionListener } from 'neomint/utils';

useEffect(() => {
  const removeListener = createMotionListener((prefersReduced) => {
    console.log('Motion preference changed:', prefersReduced);
  });

  return removeListener;
}, []);
```

### Manual Override

Allow users to override system preferences:

```jsx
function AccessibilityControls() {
  const [reducedMotion, setReducedMotion] = useState(null);

  return (
    <>
      <DataNetwork
        reducedMotion={reducedMotion}
        accessibility={reducedMotion === false ? 'custom' : 'respect-motion'}
      />
      
      <fieldset>
        <legend>Motion Preferences</legend>
        <label>
          <input
            type="radio"
            name="motion"
            checked={reducedMotion === null}
            onChange={() => setReducedMotion(null)}
          />
          Use system preference
        </label>
        <label>
          <input
            type="radio"
            name="motion"
            checked={reducedMotion === false}
            onChange={() => setReducedMotion(false)}
          />
          Enable animation
        </label>
        <label>
          <input
            type="radio"
            name="motion"
            checked={reducedMotion === true}
            onChange={() => setReducedMotion(true)}
          />
          Reduce motion
        </label>
      </fieldset>
    </>
  );
}
```

## High Contrast Support

### Detecting High Contrast Mode

```jsx
const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;

<DataNetwork
  preset={prefersHighContrast ? 'accessibility' : 'default'}
/>
```

### High Contrast Themes

Use accessibility-optimized themes:

```jsx
// High contrast theme
<DataNetwork
  nodeColor="#FFFFFF"
  lineColor="rgba(255, 255, 255, 0.6)"
  backgroundColor="#000000"
/>

// WCAG AAA compliant theme
<DataNetwork
  preset="accessibilitySafe"
/>
```

## Best Practices

### 1. Always Provide Context

```jsx
<DataNetwork
  ariaLabel={`Network visualization showing ${nodeCount} data points with ${connectionCount} connections`}
/>
```

### 2. Offer User Controls

```jsx
function AccessibleAnimation() {
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [speed, setSpeed] = useState(0.5);

  return (
    <div>
      <DataNetwork
        staticMode={!animationEnabled}
        animationSpeed={speed}
        ariaLabel="Configurable network animation"
      />
      
      <div role="group" aria-label="Animation controls">
        <button onClick={() => setAnimationEnabled(!animationEnabled)}>
          {animationEnabled ? 'Disable' : 'Enable'} Animation
        </button>
        
        <label>
          Animation Speed:
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            aria-valuemin="0.1"
            aria-valuemax="1"
            aria-valuenow={speed}
          />
        </label>
      </div>
    </div>
  );
}
```

### 3. Provide Alternative Content

```jsx
function NetworkWithFallback() {
  const [showAnimation, setShowAnimation] = useState(true);

  return (
    <figure>
      {showAnimation ? (
        <DataNetwork
          ariaLabel="Interactive network visualization"
          onError={() => setShowAnimation(false)}
        />
      ) : (
        <img
          src="/static-network-diagram.png"
          alt="Network diagram showing data connections"
        />
      )}
      <figcaption>
        Data network visualization showing real-time connections
      </figcaption>
    </figure>
  );
}
```

### 4. Color Independence

Don't rely solely on color:

```jsx
<DataNetwork
  nodeRadius={{ min: 2, max: 6 }}  // Size variation
  lineWidth={2}  // Visible lines
  ariaLabel="Network where node size indicates importance"
/>
```

## Testing for Accessibility

### Automated Testing

```jsx
// jest-axe testing
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('DataNetwork is accessible', async () => {
  const { container } = render(
    <DataNetwork ariaLabel="Test network" />
  );
  
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing Checklist

- [ ] Test with keyboard only (no mouse)
- [ ] Enable high contrast mode
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Enable reduced motion preference
- [ ] Zoom to 200% and verify usability
- [ ] Check color contrast ratios
- [ ] Verify focus indicators are visible
- [ ] Test with browser extensions (axe, WAVE)

### Screen Reader Testing

Test announcements with different screen readers:

```jsx
<DataNetwork
  ariaLabel="Network animation with 50 nodes"
  aria-live="polite"
  aria-atomic="true"
  role="img"
/>
```

## Accessibility Utilities

### Get Accessibility Settings

```jsx
import { getAccessibilitySettings } from 'neomint/utils';

const settings = getAccessibilitySettings({
  prefersReducedMotion: true
});
// Returns optimized settings for reduced motion
```

### Announce to Screen Readers

```jsx
import { announceToScreenReader } from 'neomint/utils';

// Make custom announcements
announceToScreenReader('Data updated', 'polite');
announceToScreenReader('Error occurred', 'assertive');
```

## Common Accessibility Patterns

### Loading States

```jsx
function AccessibleLoader() {
  return (
    <div role="status" aria-live="polite">
      <DataNetwork
        context="loading"
        ariaLabel="Loading animation"
      />
      <span className="sr-only">Loading data...</span>
    </div>
  );
}
```

### Progress Indication

```jsx
function ProgressNetwork({ progress }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Loading progress: ${progress}%`}
    >
      <DataNetwork
        nodeCount={Math.floor(progress / 2)}
        ariaLabel={`Progress visualization at ${progress}%`}
      />
    </div>
  );
}
```

### Error States

```jsx
function AccessibleError() {
  return (
    <div role="alert" aria-live="assertive">
      <DataNetwork
        staticMode={true}
        opacity={0.3}
        ariaLabel="Error state visualization"
      />
      <p>Unable to load data. Please try again.</p>
    </div>
  );
}
```

## Compliance Guidelines

### WCAG 2.1 Compliance

NEOMINT meets or exceeds:
- ✅ Level A: All criteria met
- ✅ Level AA: All criteria met
- ✅ Level AAA: Enhanced contrast and control options

### Section 508 Compliance

- ✅ Keyboard accessible
- ✅ Screen reader compatible
- ✅ Reduced motion support
- ✅ High contrast support

### ARIA Best Practices

- ✅ Semantic HTML structure
- ✅ Proper ARIA labels
- ✅ Live region updates
- ✅ Focus management