/**
 * @neomint/animations - Error Boundary Component
 * 
 * React Error Boundary for graceful error handling in network components.
 * Provides fallback UI and error reporting capabilities.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import React, { Component, ReactNode, ErrorInfo } from 'react';

// ============================================================================
// Error Boundary Props and State
// ============================================================================

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

// ============================================================================
// Default Error Fallback Component
// ============================================================================

const DefaultErrorFallback: React.FC<{ 
  error: Error | null; 
  errorId: string;
  onRetry?: () => void;
}> = ({ error, errorId, onRetry }) => (
  <div 
    style={{
      padding: '20px',
      border: '1px solid #ff6b6b',
      borderRadius: '8px',
      backgroundColor: '#fff5f5',
      color: '#c92a2a',
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '500px',
      margin: '20px auto'
    }}
    role="alert"
    aria-live="assertive"
  >
    <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>
      ⚠️ Network Visualization Error
    </h3>
    <p style={{ margin: '0 0 15px 0', fontSize: '14px' }}>
      Something went wrong while rendering the network visualization.
    </p>
    {process.env.NODE_ENV === 'development' && error && (
      <details style={{ marginBottom: '15px' }}>
        <summary style={{ cursor: 'pointer', fontSize: '12px' }}>
          Error Details (Development)
        </summary>
        <pre style={{ 
          fontSize: '11px', 
          overflow: 'auto', 
          backgroundColor: '#f8f9fa',
          padding: '10px',
          borderRadius: '4px',
          marginTop: '5px'
        }}>
          {error.message}
          {error.stack && `\n\n${error.stack}`}
        </pre>
      </details>
    )}
    <div style={{ fontSize: '12px', color: '#868e96', marginBottom: '15px' }}>
      Error ID: {errorId}
    </div>
    {onRetry && (
      <button
        onClick={onRetry}
        style={{
          backgroundColor: '#00958F',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Try Again
      </button>
    )}
  </div>
);

// ============================================================================
// Error Boundary Class Component
// ============================================================================

export class NetworkErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Generate unique error ID for tracking
    const errorId = `net-err-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error,
      errorId
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Update state with error info
    this.setState({ errorInfo });

    // Log error for debugging
    console.error('[NetworkErrorBoundary] Caught error:', error);
    console.error('[NetworkErrorBoundary] Error info:', errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      try {
        this.props.onError(error, errorInfo);
      } catch (handlerError) {
        console.error('[NetworkErrorBoundary] Error in onError handler:', handlerError);
      }
    }

    // Report to error tracking service in production
    if (process.env.NODE_ENV === 'production') {
      this.reportError(error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetOnPropsChange, resetKeys } = this.props;
    const { hasError } = this.state;

    // Reset error state if resetKeys changed
    if (hasError && resetOnPropsChange && resetKeys) {
      const prevResetKeys = prevProps.resetKeys || [];
      const hasResetKeyChanged = resetKeys.some((key, index) => 
        key !== prevResetKeys[index]
      );

      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
      }
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  private reportError = (error: Error, errorInfo: ErrorInfo) => {
    // In a real application, you would send this to your error tracking service
    // Example: Sentry, LogRocket, Bugsnag, etc.
    
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // For now, just log to console in production
    console.error('[NetworkErrorBoundary] Error report:', errorReport);
  };

  private resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    });
  };

  private handleRetry = () => {
    this.resetErrorBoundary();
  };

  render() {
    const { hasError, error, errorId } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Use custom fallback if provided, otherwise use default
      if (fallback) {
        return fallback;
      }

      return (
        <DefaultErrorFallback 
          error={error} 
          errorId={errorId}
          onRetry={this.handleRetry}
        />
      );
    }

    return children;
  }
}

// ============================================================================
// Hook for Error Boundary Integration
// ============================================================================

export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  // Throw error to be caught by Error Boundary
  if (error) {
    throw error;
  }

  return { captureError, resetError };
};

// ============================================================================
// Higher-Order Component for Error Boundary
// ============================================================================

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <NetworkErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </NetworkErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

// ============================================================================
// Export Default
// ============================================================================

export default NetworkErrorBoundary;
