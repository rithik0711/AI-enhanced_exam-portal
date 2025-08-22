import { useState, useEffect } from 'react';

// Breakpoint definitions
const BREAKPOINTS = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1400
};

export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [breakpoint, setBreakpoint] = useState('xl');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowSize({ width, height });
      
      // Determine breakpoint
      if (width < BREAKPOINTS.xs) {
        setBreakpoint('xs');
      } else if (width < BREAKPOINTS.sm) {
        setBreakpoint('sm');
      } else if (width < BREAKPOINTS.md) {
        setBreakpoint('md');
      } else if (width < BREAKPOINTS.lg) {
        setBreakpoint('lg');
      } else if (width < BREAKPOINTS.xl) {
        setBreakpoint('xl');
      } else {
        setBreakpoint('xl');
      }
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper functions
  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';
  const isTablet = breakpoint === 'md';
  const isDesktop = breakpoint === 'lg' || breakpoint === 'xl';
  const isSmallScreen = breakpoint === 'xs';
  const isMediumScreen = breakpoint === 'sm' || breakpoint === 'md';
  const isLargeScreen = breakpoint === 'lg' || breakpoint === 'xl';

  // Responsive values based on breakpoint
  const getResponsiveValue = (values) => {
    if (typeof values === 'object') {
      return values[breakpoint] || values.default || values.xl;
    }
    return values;
  };

  // Responsive spacing
  const spacing = {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48
  };

  // Responsive font sizes
  const fontSize = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    '2xl': 32,
    '3xl': 48
  };

  return {
    windowSize,
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    getResponsiveValue,
    spacing: spacing[breakpoint],
    fontSize: fontSize[breakpoint],
    BREAKPOINTS
  };
};

export default useResponsive;
