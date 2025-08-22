import React from 'react';
import { createContext, useContext } from 'react';
import useResponsive from '../hooks/useResponsive';

// Create responsive context
const ResponsiveContext = createContext();

// Responsive provider component
export const ResponsiveProvider = ({ children }) => {
  const responsive = useResponsive();
  
  return (
    <ResponsiveContext.Provider value={responsive}>
      {children}
    </ResponsiveContext.Provider>
  );
};

// Hook to use responsive context
export const useResponsiveContext = () => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('useResponsiveContext must be used within a ResponsiveProvider');
  }
  return context;
};

// Responsive wrapper component
export const ResponsiveWrapper = ({ 
  children, 
  className = '', 
  mobileClass = '', 
  tabletClass = '', 
  desktopClass = '',
  style = {},
  ...props 
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  
  // Determine responsive classes
  let responsiveClass = '';
  if (isMobile) responsiveClass = mobileClass;
  else if (isTablet) responsiveClass = tabletClass;
  else if (isDesktop) responsiveClass = desktopClass;
  
  // Combine classes
  const combinedClass = `${className} ${responsiveClass}`.trim();
  
  return (
    <div 
      className={combinedClass} 
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

// Responsive grid component
export const ResponsiveGrid = ({ 
  children, 
  columns = { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 },
  gap = { xs: 16, sm: 20, md: 24, lg: 28, xl: 32 },
  className = '',
  ...props 
}) => {
  const { breakpoint } = useResponsive();
  
  const currentColumns = columns[breakpoint] || columns.xl || 4;
  const currentGap = gap[breakpoint] || gap.xl || 32;
  
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${currentColumns}, 1fr)`,
    gap: `${currentGap}px`,
    width: '100%'
  };
  
  return (
    <div 
      className={`responsive-grid ${className}`}
      style={gridStyle}
      {...props}
    >
      {children}
    </div>
  );
};

// Responsive flex component
export const ResponsiveFlex = ({ 
  children, 
  direction = { xs: 'column', sm: 'row', md: 'row' },
  gap = { xs: 16, sm: 20, md: 24, lg: 28, xl: 32 },
  className = '',
  ...props 
}) => {
  const { breakpoint } = useResponsive();
  
  const currentDirection = direction[breakpoint] || direction.xl || 'row';
  const currentGap = gap[breakpoint] || gap.xl || 32;
  
  const flexStyle = {
    display: 'flex',
    flexDirection: currentDirection,
    gap: `${currentGap}px`,
    width: '100%',
    flexWrap: 'wrap'
  };
  
  return (
    <div 
      className={`responsive-flex ${className}`}
      style={flexStyle}
      {...props}
    >
      {children}
    </div>
  );
};

// Responsive text component
export const ResponsiveText = ({ 
  children, 
  size = { xs: 'sm', sm: 'base', md: 'lg', lg: 'xl', xl: '2xl' },
  weight = 'normal',
  className = '',
  ...props 
}) => {
  const { breakpoint } = useResponsive();
  
  const currentSize = size[breakpoint] || size.xl || '2xl';
  
  const textClass = `responsive-text text-${currentSize}`;
  const combinedClass = `${textClass} ${className}`.trim();
  
  return (
    <div 
      className={combinedClass}
      style={{ fontWeight: weight }}
      {...props}
    >
      {children}
    </div>
  );
};

// Responsive button component
export const ResponsiveButton = ({ 
  children, 
  variant = 'primary',
  size = { xs: 'sm', sm: 'base', md: 'lg', lg: 'xl', xl: 'xl' },
  className = '',
  ...props 
}) => {
  const { breakpoint } = useResponsive();
  
  const currentSize = size[breakpoint] || size.xl || 'xl';
  
  const buttonClass = `responsive-btn btn-${variant} btn-${currentSize}`;
  const combinedClass = `${buttonClass} ${className}`.trim();
  
  return (
    <button 
      className={combinedClass}
      {...props}
    >
      {children}
    </button>
  );
};

export default ResponsiveWrapper;
