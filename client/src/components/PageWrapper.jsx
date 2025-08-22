import React from 'react';
import { useResponsive } from '../hooks/useResponsive';

const PageWrapper = ({ 
  children, 
  className = '', 
  maxWidth = '1200px',
  padding = { xs: 16, sm: 20, md: 24, lg: 32, xl: 32 },
  ...props 
}) => {
  const { breakpoint } = useResponsive();
  
  const currentPadding = padding[breakpoint] || padding.xl || 32;
  
  const wrapperStyle = {
    maxWidth: maxWidth,
    margin: '0 auto',
    padding: `${currentPadding}px`,
    width: '100%',
    boxSizing: 'border-box',
    minHeight: 'calc(100vh - 100px)', // Account for navbar height
  };
  
  return (
    <div 
      className={`page-wrapper ${className}`}
      style={wrapperStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
