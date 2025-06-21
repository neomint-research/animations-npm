/**
 * @neomint/animations - Network Animation Hook
 * 
 * Manages animation state and controls for the network visualization.
 * Provides play, pause, reset functionality with performance optimization.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import { useCallback, useRef, useState, useEffect } from 'react';
import { useNetworkContext } from '../context/NetworkContext';

// ============================================================================
// Hook Configuration
// ============================================================================

interface UseNetworkAnimationConfig {
  enabled?: boolean;
  autoPlay?: boolean;
  onAnimationComplete?: (cycle: number) => void;
}

interface AnimationControls {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useNetworkAnimation({
  enabled = true,
  autoPlay = true,
  onAnimationComplete
}: UseNetworkAnimationConfig = {}): AnimationControls {
  const { animation, updateAnimation } = useNetworkContext();
  const [isPlaying, setIsPlaying] = useState(autoPlay && enabled);
  const animationCycleRef = useRef(0);
  const frameCountRef = useRef(0);
  
  // ============================================================================
  // Animation Controls
  // ============================================================================
  
  const play = useCallback(() => {
    if (!enabled) return;
    
    setIsPlaying(true);
    updateAnimation({ enabled: true, autoPlay: true });
    
    // Announce to screen readers
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Animation started');
      utterance.volume = 0.1;
      window.speechSynthesis.speak(utterance);
    }
  }, [enabled, updateAnimation]);
  
  const pause = useCallback(() => {
    setIsPlaying(false);
    updateAnimation({ autoPlay: false });
    
    // Announce to screen readers
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Animation paused');
      utterance.volume = 0.1;
      window.speechSynthesis.speak(utterance);
    }
  }, [updateAnimation]);
  
  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);
  
  const reset = useCallback(() => {
    animationCycleRef.current = 0;
    frameCountRef.current = 0;
    
    // Reset animation state
    updateAnimation({
      enabled: true,
      autoPlay: autoPlay && enabled
    });
    
    setIsPlaying(autoPlay && enabled);
  }, [autoPlay, enabled, updateAnimation]);
  
  const setSpeed = useCallback((speed: number) => {
    updateAnimation({ speed: Math.max(0.1, Math.min(5, speed)) });
  }, [updateAnimation]);
  
  // ============================================================================
  // Animation Cycle Tracking
  // ============================================================================
  
  useEffect(() => {
    if (!isPlaying || !enabled) return;
    
    const interval = setInterval(() => {
      frameCountRef.current++;
      
      // Check for animation cycle completion (every 5 seconds at 60fps)
      if (frameCountRef.current % (60 * 5) === 0) {
        animationCycleRef.current++;
        onAnimationComplete?.(animationCycleRef.current);
      }
    }, 1000 / 60); // 60 FPS
    
    return () => clearInterval(interval);
  }, [isPlaying, enabled, onAnimationComplete]);
  
  // ============================================================================
  // Accessibility: Respect reduced motion preferences
  // ============================================================================
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // User prefers reduced motion
        pause();
        updateAnimation({ 
          enabled: false,
          speed: 0.1,
          nodeAnimation: { enabled: false },
          edgeAnimation: { enabled: false }
        });
      } else {
        // User is okay with motion
        if (autoPlay && enabled) {
          play();
        }
        updateAnimation({ 
          enabled: true,
          speed: 1,
          nodeAnimation: { enabled: true },
          edgeAnimation: { enabled: true }
        });
      }
    };
    
    // Check initial preference
    if (mediaQuery.matches) {
      handleMotionPreferenceChange({ matches: true } as MediaQueryListEvent);
    }
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, [autoPlay, enabled, play, pause, updateAnimation]);
  
  // ============================================================================
  // Keyboard Controls
  // ============================================================================
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle if no input is focused
      if (document.activeElement?.tagName === 'INPUT' || 
          document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }
      
      switch (event.key) {
        case ' ': // Spacebar
          event.preventDefault();
          toggle();
          break;
        case 'r':
        case 'R':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            reset();
          }
          break;
        case 'p':
        case 'P':
          pause();
          break;
        case 's':
        case 'S':
          play();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [toggle, reset, pause, play]);
  
  // ============================================================================
  // Return Controls
  // ============================================================================
  
  return {
    isPlaying,
    play,
    pause,
    toggle,
    reset,
    setSpeed
  };
}

// ============================================================================
// Utility Hook for Animation State
// ============================================================================

export function useAnimationState() {
  const { animation } = useNetworkContext();
  
  return {
    enabled: animation.enabled,
    autoPlay: animation.autoPlay,
    speed: animation.speed,
    nodeAnimation: animation.nodeAnimation,
    edgeAnimation: animation.edgeAnimation
  };
}

// ============================================================================
// Hook for Performance-Aware Animation
// ============================================================================

export function usePerformanceAwareAnimation() {
  const { performance, metrics } = useNetworkContext();
  const [adaptiveSpeed, setAdaptiveSpeed] = useState(1);
  
  useEffect(() => {
    if (!performance.adaptiveQuality) return;
    
    // Adjust animation speed based on FPS
    const targetFPS = performance.maxFPS || 60;
    const currentFPS = metrics.fps;
    
    if (currentFPS < targetFPS * 0.8) {
      // Performance is struggling, reduce speed
      setAdaptiveSpeed(prev => Math.max(0.3, prev * 0.9));
    } else if (currentFPS > targetFPS * 0.95) {
      // Performance is good, can increase speed
      setAdaptiveSpeed(prev => Math.min(1, prev * 1.05));
    }
  }, [performance, metrics.fps]);
  
  return { adaptiveSpeed };
}
