/**
 * @neomint/animations - Network Container Component
 * 
 * Provides the main container for network visualizations with responsive
 * sizing, theme support, and accessibility features.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import React, { forwardRef, useEffect, useRef, ReactNode, CSSProperties } from 'react';
import { useNetworkContext } from '../context/NetworkContext';
import { NetworkTheme } from '../types';

// ============================================================================
// Component Props
// ============================================================================

interface NetworkContainerProps {
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: CSSProperties;
  theme?: NetworkTheme;
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  aspectRatio?: number; // width/height ratio
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  padding?: number | string;
  border?: boolean;
  borderRadius?: number | string;
  shadow?: boolean;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  tabIndex?: number;
  role?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

// ============================================================================
// Component Implementation
// ============================================================================

export const NetworkContainer = forwardRef<HTMLDivElement, NetworkContainerProps>(({
  children,
  width = '100%',
  height = 600,
  className = '',
  style = {},
  theme,
  responsive = true,
  maintainAspectRatio = false,
  aspectRatio = 16 / 9,
  minWidth = 300,
  minHeight = 200,
  maxWidth,
  maxHeight,
  padding = 0,
  border = false,
  borderRadius = 0,
  shadow = false,
  overflow = 'hidden',
  tabIndex = 0,
  role = 'img',
  'aria-label': ariaLabel = 'Network visualization',
  'aria-describedby': ariaDescribedBy,
  ...restProps
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const { dimensions, updateDimensions } = useNetworkContext();
  
  // ============================================================================
  // Responsive Sizing
  // ============================================================================
  
  useEffect(() => {
    if (!responsive || !containerRef.current) return;
    
    const updateSize = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      let newWidth = rect.width;
      let newHeight = rect.height;
      
      // Apply constraints
      if (minWidth && newWidth < minWidth) newWidth = minWidth;
      if (maxWidth && newWidth > maxWidth) newWidth = maxWidth;
      if (minHeight && newHeight < minHeight) newHeight = minHeight;
      if (maxHeight && newHeight > maxHeight) newHeight = maxHeight;
      
      // Maintain aspect ratio if requested
      if (maintainAspectRatio) {
        const currentRatio = newWidth / newHeight;
        if (currentRatio > aspectRatio) {
          newWidth = newHeight * aspectRatio;
        } else {
          newHeight = newWidth / aspectRatio;
        }
      }
      
      // Update dimensions if changed
      if (newWidth !== dimensions.width || newHeight !== dimensions.height) {
        updateDimensions({
          width: Math.round(newWidth),
          height: Math.round(newHeight),
          devicePixelRatio: window.devicePixelRatio || 1
        });
      }
    };
    
    // Initial size calculation
    updateSize();
    
    // Set up ResizeObserver for responsive updates
    let cleanupResize: (() => void) | undefined;

    if ('ResizeObserver' in window) {
      resizeObserverRef.current = new ResizeObserver(() => {
        updateSize();
      });
      resizeObserverRef.current.observe(containerRef.current);
    } else if (typeof window !== 'undefined') {
      // Fallback for browsers without ResizeObserver
      const handleResize = () => updateSize();
      (window as any).addEventListener('resize', handleResize);
      cleanupResize = () => {
        (window as any).removeEventListener('resize', handleResize);
      };
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      if (cleanupResize) {
        cleanupResize();
      }
    };
  }, [
    responsive,
    maintainAspectRatio,
    aspectRatio,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    dimensions.width,
    dimensions.height,
    updateDimensions
  ]);
  
  // ============================================================================
  // Theme-based Styling
  // ============================================================================
  
  const getThemeStyles = (): CSSProperties => {
    if (!theme) return {};
    
    return {
      backgroundColor: theme.backgroundColor,
      color: theme.textColor || '#000000',
      borderColor: theme.edgeColor,
      ...(shadow && {
        boxShadow: `0 4px 12px ${theme.edgeColor}40`
      })
    };
  };
  
  // ============================================================================
  // Container Styles
  // ============================================================================
  
  const containerStyles: CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    minWidth: minWidth ? `${minWidth}px` : undefined,
    minHeight: minHeight ? `${minHeight}px` : undefined,
    maxWidth: maxWidth ? `${maxWidth}px` : undefined,
    maxHeight: maxHeight ? `${maxHeight}px` : undefined,
    padding: typeof padding === 'number' ? `${padding}px` : padding,
    overflow,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    ...(border && {
      border: `1px solid ${theme?.edgeColor || '#ddd'}`
    }),
    ...getThemeStyles(),
    ...style
  };
  
  // ============================================================================
  // Accessibility Features
  // ============================================================================
  
  const accessibilityProps = {
    role,
    tabIndex,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-live': 'polite' as const,
    'aria-atomic': true
  };
  
  // ============================================================================
  // Keyboard Navigation
  // ============================================================================
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle container-specific keyboard shortcuts
      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();
          // Focus first interactive element inside
          const firstInteractive = container.querySelector(
            'button, [tabindex]:not([tabindex="-1"]), input, select, textarea'
          ) as HTMLElement;
          if (firstInteractive) {
            firstInteractive.focus();
          }
          break;
        case 'Escape':
          // Blur the container
          container.blur();
          break;
      }
    };
    
    container.addEventListener('keydown', handleKeyDown);
    
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  // ============================================================================
  // Focus Management
  // ============================================================================
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleFocus = () => {
      container.style.outline = '2px solid #0066cc';
      container.style.outlineOffset = '2px';
    };
    
    const handleBlur = () => {
      container.style.outline = 'none';
      container.style.outlineOffset = '0';
    };
    
    container.addEventListener('focus', handleFocus);
    container.addEventListener('blur', handleBlur);
    
    return () => {
      container.removeEventListener('focus', handleFocus);
      container.removeEventListener('blur', handleBlur);
    };
  }, []);
  
  // ============================================================================
  // Ref Forwarding
  // ============================================================================
  
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(containerRef.current);
      } else {
        ref.current = containerRef.current;
      }
    }
  }, [ref]);
  
  // ============================================================================
  // Render
  // ============================================================================
  
  return (
    <div
      ref={containerRef}
      className={`network-container ${className}`}
      style={containerStyles}
      {...accessibilityProps}
      {...restProps}
    >
      {children}
      
      {/* Screen reader description */}
      {ariaDescribedBy && (
        <div
          id={ariaDescribedBy}
          style={{
            position: 'absolute',
            left: '-10000px',
            width: '1px',
            height: '1px',
            overflow: 'hidden'
          }}
        >
          Interactive network visualization. Use arrow keys to navigate, 
          space to pause/play animation, and tab to access controls.
        </div>
      )}
    </div>
  );
});

NetworkContainer.displayName = 'NetworkContainer';

// ============================================================================
// Responsive Wrapper Component
// ============================================================================

interface ResponsiveWrapperProps {
  children: ReactNode;
  breakpoints?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  mobileHeight?: number;
  tabletHeight?: number;
  desktopHeight?: number;
}

export const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({
  children,
  breakpoints = { mobile: 768, tablet: 1024, desktop: 1200 },
  mobileHeight = 300,
  tabletHeight = 400,
  desktopHeight = 600
}) => {
  const [screenSize, setScreenSize] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      
      if (width < breakpoints.mobile!) {
        setScreenSize('mobile');
      } else if (width < breakpoints.tablet!) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };
    
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    
    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, [breakpoints]);
  
  const getHeight = () => {
    switch (screenSize) {
      case 'mobile': return mobileHeight;
      case 'tablet': return tabletHeight;
      case 'desktop': return desktopHeight;
      default: return desktopHeight;
    }
  };
  
  return (
    <NetworkContainer
      height={getHeight()}
      responsive={true}
      className={`responsive-${screenSize}`}
    >
      {children}
    </NetworkContainer>
  );
};
