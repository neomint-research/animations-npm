/**
 * @neomint/animations - Standardized Hook Pattern
 * 
 * Provides a consistent pattern for all network hooks with:
 * - Error handling
 * - Loading states
 * - Cleanup
 * - Performance optimization
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import { useCallback, useEffect, useRef, useState } from 'react';

// ============================================================================
// Hook State Interface
// ============================================================================

export interface StandardHookState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  initialized: boolean;
}

export interface StandardHookConfig {
  enableErrorBoundary?: boolean;
  enableLoading?: boolean;
  autoCleanup?: boolean;
  debugMode?: boolean;
}

export interface StandardHookActions<T> {
  setData: (data: T) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
  refresh: () => Promise<void>;
}

export type StandardHookReturn<T> = StandardHookState<T> & StandardHookActions<T>;

// ============================================================================
// Standardized Hook Factory
// ============================================================================

export function useStandardizedHook<T>(
  hookName: string,
  initialData: T | null = null,
  config: StandardHookConfig = {}
): StandardHookReturn<T> {
  const {
    enableErrorBoundary = true,
    enableLoading = true,
    autoCleanup = true,
    debugMode = process.env.NODE_ENV === 'development'
  } = config;

  // ============================================================================
  // State Management
  // ============================================================================

  const [state, setState] = useState<StandardHookState<T>>({
    data: initialData,
    loading: false,
    error: null,
    initialized: false
  });

  const mountedRef = useRef(true);
  const errorBoundaryRef = useRef<((error: Error) => void) | null>(null);

  // ============================================================================
  // Error Handling
  // ============================================================================

  const handleError = useCallback((error: Error) => {
    if (!mountedRef.current) return;

    if (debugMode) {
      console.error(`[${hookName}] Error:`, error);
    }

    setState(prev => ({ ...prev, error, loading: false }));

    if (enableErrorBoundary && errorBoundaryRef.current) {
      errorBoundaryRef.current(error);
    }
  }, [hookName, debugMode, enableErrorBoundary]);

  // ============================================================================
  // Actions
  // ============================================================================

  const setData = useCallback((data: T) => {
    if (!mountedRef.current) return;
    setState(prev => ({ ...prev, data, error: null, initialized: true }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    if (!mountedRef.current || !enableLoading) return;
    setState(prev => ({ ...prev, loading }));
  }, [enableLoading]);

  const setError = useCallback((error: Error | null) => {
    if (!mountedRef.current) return;
    setState(prev => ({ ...prev, error, loading: false }));
  }, []);

  const reset = useCallback(() => {
    if (!mountedRef.current) return;
    setState({
      data: initialData,
      loading: false,
      error: null,
      initialized: false
    });
  }, [initialData]);

  const refresh = useCallback(async () => {
    if (!mountedRef.current) return;
    
    try {
      setLoading(true);
      // This would be implemented by the specific hook
      // For now, just reset loading state
      setLoading(false);
    } catch (error) {
      handleError(error as Error);
    }
  }, [setLoading, handleError]);

  // ============================================================================
  // Lifecycle Management
  // ============================================================================

  useEffect(() => {
    mountedRef.current = true;
    
    if (debugMode) {
      console.log(`[${hookName}] Hook initialized`);
    }

    return () => {
      mountedRef.current = false;
      
      if (debugMode) {
        console.log(`[${hookName}] Hook cleanup`);
      }
    };
  }, [hookName, debugMode]);

  // Auto cleanup on unmount
  useEffect(() => {
    if (!autoCleanup) return;

    return () => {
      if (debugMode) {
        console.log(`[${hookName}] Auto cleanup triggered`);
      }
      // Cleanup logic would go here
    };
  }, [autoCleanup, hookName, debugMode]);

  // ============================================================================
  // Return Hook Interface
  // ============================================================================

  return {
    ...state,
    setData,
    setLoading,
    setError,
    reset,
    refresh
  };
}

// ============================================================================
// Hook Performance Utilities
// ============================================================================

export function useHookPerformance(hookName: string) {
  const startTimeRef = useRef<number>(0);
  const renderCountRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = performance.now();
    renderCountRef.current += 1;
  });

  useEffect(() => {
    const endTime = performance.now();
    const duration = endTime - startTimeRef.current;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${hookName}] Render #${renderCountRef.current} took ${duration.toFixed(2)}ms`);
    }
  });

  return {
    renderCount: renderCountRef.current,
    lastRenderTime: performance.now() - startTimeRef.current
  };
}

// ============================================================================
// Hook Error Boundary Integration
// ============================================================================

export function useHookErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const captureError = useCallback((error: Error) => {
    setError(error);
  }, []);

  // Throw error to trigger error boundary
  if (error) {
    throw error;
  }

  return {
    captureError,
    resetError,
    hasError: !!error
  };
}

// ============================================================================
// Hook Cleanup Utilities
// ============================================================================

export function useHookCleanup(cleanupFn: () => void, deps: React.DependencyList = []) {
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    cleanupRef.current = cleanupFn;
  }, deps);

  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);
}
