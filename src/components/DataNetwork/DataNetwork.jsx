import React, { useRef, useEffect, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { usePerformanceMonitor } from '../../utils/hooks/usePerformanceMonitor';
import { useSmartDefaults } from '../../utils/hooks/useSmartDefaults';
import { detectMotionPreferences, getAccessibilitySettings, createMotionListener, announceToScreenReader } from '../../utils/accessibility';
import { resolveThemeConfig, createThemeListener } from '../../utils/themes';
import {
  DataNetworkPropTypes,
  DataNetworkDefaultProps,
  validateDataNetworkProps
} from './DataNetwork.types';

const DataNetwork = forwardRef((props, ref) => {
  // Extract props with smart defaults
  const {
    // Resolved props from smart defaults
    width,
    height,
    className,
    style,
    nodeCount,
    animationSpeed,
    connectionDistance,
    nodeRadius,
    lineWidth,
    nodeColor,
    lineColor,
    backgroundColor,
    opacity,
    preset,
    theme,
    performanceTier,
    performance,
    analytics,
    maxFPS,
    enableGPUAcceleration,
    accessibility,
    ariaLabel,
    staticMode,
    reducedMotion,
    context,
    interactive,
    pauseOnHover,
    autoPlay,
    onPerformanceChange,
    onThemeChange,
    onAnimationComplete,
    onError,
    debug,
    showStats,
    validateProps,
    // Smart defaults computed values
    deviceCapabilities,
    motionPreferences: smartMotionPreferences,
    effectiveReducedMotion,
    isAnimationDisabled: smartIsAnimationDisabled,
    performanceImpact,
    validationWarnings,
    shouldUseStaticRendering,
    canUseGPUAcceleration
  } = useSmartDefaults(props);
  // Component refs
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const nodesRef = useRef([]);
  const frameCountRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const isPlayingRef = useRef(autoPlay);
  const statsRef = useRef({ fps: 0, frameTime: 0, nodeUpdates: 0 });
  
  // Component state
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [motionPreferences, setMotionPreferences] = useState(smartMotionPreferences);
  const [currentTheme, setCurrentTheme] = useState(null);
  const [isPaused, setIsPaused] = useState(!autoPlay);
  const [isHovered, setIsHovered] = useState(false);
  const [animationCycles, setAnimationCycles] = useState(0);

  // Performance monitoring integration
  const {
    recordFrame,
    optimalSettings,
    performanceLevel,
    deviceCapabilities: monitorDeviceCapabilities
  } = usePerformanceMonitor(performance === 'auto' || analytics || showStats);
  
  // Use monitor device capabilities if available, otherwise use smart defaults
  const effectiveDeviceCapabilities = monitorDeviceCapabilities || deviceCapabilities;

  // Accessibility settings override
  const accessibilitySettings = accessibility === 'respect-motion' 
    ? getAccessibilitySettings(motionPreferences) 
    : null;

  // Determine if animation should be disabled (including static mode)
  const isAnimationDisabled = smartIsAnimationDisabled || staticMode || shouldUseStaticRendering();
  
  // Validate props in development
  useEffect(() => {
    if (validateProps && process.env.NODE_ENV === 'development') {
      const { errors, warnings } = validateDataNetworkProps(props);
      
      if (errors.length > 0) {
        errors.forEach(error => console.error(`[DataNetwork] ${error}`));
        if (onError) {
          onError(new Error(`Prop validation failed: ${errors.join(', ')}`));
        }
      }
      
      if (warnings.length > 0 || validationWarnings.length > 0) {
        [...warnings, ...validationWarnings].forEach(warning =>
          console.warn(`[DataNetwork] ${warning}`)
        );
      }
    }
  }, [validateProps, props, validationWarnings, onError]);

  // Resolve theme configuration with auto-detection
  useEffect(() => {
    const resolvedTheme = resolveThemeConfig(preset, theme);
    setCurrentTheme(resolvedTheme);
    
    // Set up theme listener for auto theme
    if (theme === 'auto') {
      const removeThemeListener = createThemeListener(({ autoTheme }) => {
        if (autoTheme) {
          setCurrentTheme(autoTheme);
        } else {
          // Fallback to preset if no CSS variables detected
          setCurrentTheme(resolveThemeConfig(preset, 'default'));
        }
      });
      
      return removeThemeListener;
    }
  }, [preset, theme]);

  // Apply theme values with prop overrides and opacity
  const effectiveNodeColor = nodeColor || currentTheme?.nodeColor || '#ffffff';
  const effectiveLineColor = lineColor || currentTheme?.lineColor || 'rgba(255, 255, 255, 0.1)';
  const effectiveBackgroundColor = backgroundColor !== 'transparent'
    ? backgroundColor
    : (currentTheme?.backgroundColor || 'transparent');
  const effectiveOpacity = opacity;

  // Apply accessibility settings with fallbacks
  const getEffectiveValue = (userValue, autoValue, accessibilityValue, defaultValue) => {
    if (userValue !== undefined) return userValue;
    if (accessibilitySettings && accessibilityValue !== undefined) return accessibilityValue;
    if (performance === 'auto') return autoValue;
    return defaultValue;
  };

  const effectiveNodeCount = getEffectiveValue(
    nodeCount, 
    optimalSettings.nodeCount, 
    accessibilitySettings?.nodeCount, 
    50
  );
  
  const effectiveAnimationSpeed = getEffectiveValue(
    animationSpeed, 
    optimalSettings.animationSpeed, 
    accessibilitySettings?.animationSpeed, 
    0.5
  );
  
  const effectiveConnectionDistance = getEffectiveValue(
    connectionDistance, 
    optimalSettings.connectionDistance, 
    accessibilitySettings?.connectionDistance, 
    120
  );
  
  // Notify performance changes
  useEffect(() => {
    if (onPerformanceChange && performanceLevel) {
      onPerformanceChange({
        level: performanceLevel,
        tier: performanceTier,
        fps: statsRef.current.fps,
        impact: performanceImpact,
        deviceCapabilities: effectiveDeviceCapabilities
      });
    }
  }, [performanceLevel, performanceTier, onPerformanceChange, performanceImpact, effectiveDeviceCapabilities]);
  
  // Notify theme changes
  useEffect(() => {
    if (onThemeChange && currentTheme) {
      onThemeChange({
        theme: currentTheme,
        preset: preset,
        mode: theme
      });
    }
  }, [currentTheme, preset, theme, onThemeChange]);

  // Listen for motion preference changes
  useEffect(() => {
    if (accessibility === 'respect-motion') {
      const removeListener = createMotionListener((prefersReduced) => {
        setMotionPreferences(prev => ({
          ...prev,
          prefersReducedMotion: prefersReduced,
          respectMotion: prefersReduced
        }));
      });

      return removeListener;
    }
  }, [accessibility]);

  // Initialize nodes with accessibility considerations
  const initializeNodes = useCallback((canvasWidth, canvasHeight, count) => {
    const nodes = [];
    for (let i = 0; i < count; i++) {
      const radiusRange = nodeRadius.max - nodeRadius.min;
      nodes.push({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        vx: (Math.random() - 0.5) * effectiveAnimationSpeed,
        vy: (Math.random() - 0.5) * effectiveAnimationSpeed,
        radius: Math.random() * radiusRange + nodeRadius.min
      });
    }
    return nodes;
  }, [effectiveAnimationSpeed, nodeRadius]);

  // Enhanced animation loop with FPS limiting
  const animate = useCallback((currentTime) => {
    if (isAnimationDisabled || !isPlayingRef.current) return;
    
    // FPS limiting
    if (lastFrameTimeRef.current) {
      const deltaTime = currentTime - lastFrameTimeRef.current;
      const targetFrameTime = 1000 / maxFPS;
      
      if (deltaTime < targetFrameTime) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      // Update stats
      if (showStats || analytics) {
        statsRef.current.fps = Math.round(1000 / deltaTime);
        statsRef.current.frameTime = deltaTime;
      }
    }
    
    lastFrameTimeRef.current = currentTime;
    frameCountRef.current++;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { width: canvasWidth, height: canvasHeight } = canvas;

    // Record frame for performance monitoring
    if (performance === 'auto' || analytics) {
      recordFrame();
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Apply GPU acceleration if supported
    if (enableGPUAcceleration && canUseGPUAcceleration()) {
      ctx.imageSmoothingEnabled = false;
      canvas.style.willChange = 'transform';
    }

    // Apply global opacity
    const globalOpacity = (accessibilitySettings?.opacity || 1) * effectiveOpacity;

    // Check if paused by hover
    const shouldAnimate = !isHovered || !pauseOnHover;
    
    // Update and draw nodes
    let nodeUpdates = 0;
    nodesRef.current.forEach(node => {
      // Update position only if animation is enabled and not paused
      if (!isAnimationDisabled && shouldAnimate) {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x <= 0 || node.x >= canvasWidth) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvasHeight) node.vy *= -1;

        // Keep nodes in bounds
        node.x = Math.max(node.radius, Math.min(canvasWidth - node.radius, node.x));
        node.y = Math.max(node.radius, Math.min(canvasHeight - node.radius, node.y));
        nodeUpdates++;
      }

      // Draw node with theme colors and accessibility opacity
      ctx.globalAlpha = globalOpacity;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = effectiveNodeColor;
      ctx.fill();
    });

    // Draw connections with theme colors and accessibility considerations
    ctx.strokeStyle = effectiveLineColor;
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = globalOpacity * 0.3;

    const maxConnections = effectiveDeviceCapabilities.isHighPerformance ? nodesRef.current.length : Math.min(nodesRef.current.length, 30);

    for (let i = 0; i < maxConnections; i++) {
      for (let j = i + 1; j < nodesRef.current.length; j++) {
        const nodeA = nodesRef.current[i];
        const nodeB = nodesRef.current[j];
        const distance = Math.sqrt(
          Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2)
        );

        if (distance < effectiveConnectionDistance) {
          const opacity = 1 - (distance / effectiveConnectionDistance);
          ctx.globalAlpha = opacity * 0.3 * globalOpacity;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    
    // Update stats
    if (showStats || analytics) {
      statsRef.current.nodeUpdates = nodeUpdates;
    }
    
    // Check for animation cycle completion
    if (frameCountRef.current % (60 * 5) === 0) { // Every 5 seconds at 60fps
      setAnimationCycles(prev => prev + 1);
      if (onAnimationComplete) {
        onAnimationComplete({
          cycles: animationCycles + 1,
          performance: statsRef.current
        });
      }
    }
    
    if (!isAnimationDisabled && isPlayingRef.current) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [
    effectiveNodeColor, effectiveLineColor, effectiveConnectionDistance, lineWidth,
    recordFrame, effectiveDeviceCapabilities, performance, analytics, showStats,
    isAnimationDisabled, accessibilitySettings, effectiveOpacity, maxFPS,
    enableGPUAcceleration, canUseGPUAcceleration, pauseOnHover, isHovered,
    onAnimationComplete, animationCycles
  ]);

  // Render static version for disabled animation
  const renderStatic = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isAnimationDisabled) return;

    const ctx = canvas.getContext('2d');
    const { width: canvasWidth, height: canvasHeight } = canvas;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const globalOpacity = accessibilitySettings?.opacity || 0.5;

    // Draw static nodes with theme colors
    nodesRef.current.forEach(node => {
      ctx.globalAlpha = globalOpacity;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = effectiveNodeColor;
      ctx.fill();
    });

    ctx.globalAlpha = 1;
  }, [effectiveNodeColor, isAnimationDisabled, accessibilitySettings]);

  // Handle canvas resize with accessibility
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    const devicePixelRatio = effectiveDeviceCapabilities.isHighPerformance && enableGPUAcceleration ? (window.devicePixelRatio || 1) : 1;

    const displayWidth = rect.width;
    const displayHeight = rect.height;

    const canvasWidth = displayWidth * devicePixelRatio;
    const canvasHeight = displayHeight * devicePixelRatio;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(devicePixelRatio, devicePixelRatio);

    setCanvasSize({ width: displayWidth, height: displayHeight });

    // Reinitialize nodes
    nodesRef.current = initializeNodes(displayWidth, displayHeight, effectiveNodeCount);
    
    // Render static if animation disabled
    if (isAnimationDisabled) {
      renderStatic();
    }
  }, [initializeNodes, effectiveNodeCount, effectiveDeviceCapabilities, isAnimationDisabled, renderStatic, enableGPUAcceleration]);

  // Setup canvas and animation with accessibility
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    // Start animation or render static
    if (isAnimationDisabled) {
      renderStatic();
    } else if (autoPlay && !isPaused) {
      isPlayingRef.current = true;
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleResize, animate, isAnimationDisabled, renderStatic, autoPlay, isPaused]);
  
  // Public API methods
  useImperativeHandle(ref, () => ({
    play: () => {
      if (!isAnimationDisabled) {
        setIsPaused(false);
        isPlayingRef.current = true;
        if (!animationRef.current) {
          animationRef.current = requestAnimationFrame(animate);
        }
        announceToScreenReader('Animation started');
      }
    },
    pause: () => {
      setIsPaused(true);
      isPlayingRef.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      announceToScreenReader('Animation paused');
    },
    toggle: () => {
      if (isPaused || !isPlayingRef.current) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
    },
    reset: () => {
      const canvas = canvasRef.current;
      if (canvas) {
        nodesRef.current = initializeNodes(canvasSize.width, canvasSize.height, effectiveNodeCount);
        if (isAnimationDisabled) {
          renderStatic();
        }
      }
    },
    getStats: () => statsRef.current,
    getPerformanceInfo: () => ({
      tier: performanceTier,
      level: performanceLevel,
      impact: performanceImpact,
      deviceCapabilities: effectiveDeviceCapabilities
    }),
    updateTheme: (newTheme) => {
      setCurrentTheme(resolveThemeConfig(preset, newTheme));
    }
  }), [
    isAnimationDisabled, animate, isPaused, initializeNodes, canvasSize,
    effectiveNodeCount, renderStatic, performanceTier, performanceLevel,
    performanceImpact, effectiveDeviceCapabilities, preset
  ]);

  // Interactive handlers
  const handleMouseEnter = useCallback(() => {
    if (interactive || pauseOnHover) {
      setIsHovered(true);
    }
  }, [interactive, pauseOnHover]);
  
  const handleMouseLeave = useCallback(() => {
    if (interactive || pauseOnHover) {
      setIsHovered(false);
    }
  }, [interactive, pauseOnHover]);
  
  // Error boundary for canvas operations
  useEffect(() => {
    const handleCanvasError = (error) => {
      console.error('[DataNetwork] Canvas error:', error);
      if (onError) {
        onError(error);
      }
    };
    
    window.addEventListener('error', handleCanvasError);
    return () => window.removeEventListener('error', handleCanvasError);
  }, [onError]);

  // Enhanced debug info with comprehensive stats
  const debugInfo = (analytics || debug || showStats) && (
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      background: 'rgba(0,0,0,0.7)',
      color: 'white',
      padding: '8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontFamily: 'monospace',
      pointerEvents: 'none',
      zIndex: 10,
      maxWidth: '300px'
    }}>
      <div>
        <strong>Performance</strong><br/>
        Level: {performanceLevel} | Tier: {performanceTier}<br/>
        FPS: {statsRef.current.fps} | Frame Time: {statsRef.current.frameTime.toFixed(2)}ms<br/>
        Nodes: {effectiveNodeCount} | Updates/Frame: {statsRef.current.nodeUpdates}
      </div>
      {debug && (
        <>
          <div style={{ marginTop: '8px' }}>
            <strong>Device</strong><br/>
            Type: {effectiveDeviceCapabilities.isHighPerformance ? 'High-end' : 'Standard'}<br/>
            Mobile: {effectiveDeviceCapabilities.isMobile ? 'Yes' : 'No'}<br/>
            GPU Accel: {enableGPUAcceleration && canUseGPUAcceleration() ? 'On' : 'Off'}
          </div>
          <div style={{ marginTop: '8px' }}>
            <strong>Animation</strong><br/>
            State: {isAnimationDisabled ? 'Disabled' : (isPaused ? 'Paused' : 'Playing')}<br/>
            Motion: {motionPreferences.prefersReducedMotion ? 'Reduced' : 'Normal'}<br/>
            Cycles: {animationCycles}
          </div>
        </>
      )}
      {showStats && (
        <div style={{ marginTop: '8px' }}>
          <strong>Theme</strong><br/>
          Mode: {theme} | Preset: {preset}<br/>
          Context: {context}<br/>
          Impact: {performanceImpact.level} ({performanceImpact.score.toFixed(0)}/100)
        </div>
      )}
    </div>
  );

  return (
    <div
      className={className}
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: effectiveBackgroundColor,
        ...style
      }}
      role="img"
      aria-label={ariaLabel}
      aria-live={isAnimationDisabled ? 'off' : 'polite'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
        aria-hidden="true"
      />
      {debugInfo}
    </div>
  );
});

// Display name for debugging
DataNetwork.displayName = 'DataNetwork';

// PropTypes
DataNetwork.propTypes = DataNetworkPropTypes;

// Default props
DataNetwork.defaultProps = DataNetworkDefaultProps;

export default DataNetwork;