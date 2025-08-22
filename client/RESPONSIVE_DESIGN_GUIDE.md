# Responsive Design Guide for AI Exam Portal

## Overview
This guide explains how to use the responsive design system implemented in the AI Exam Portal to ensure the application works seamlessly across all laptop resolutions and devices.

## Responsive Breakpoints

The system uses the following breakpoints based on Bootstrap's responsive grid system:

- **XS (Extra Small)**: < 576px (Mobile phones)
- **SM (Small)**: 576px - 767px (Large phones, small tablets)
- **MD (Medium)**: 768px - 991px (Tablets)
- **LG (Large)**: 992px - 1199px (Small laptops)
- **XL (Extra Large)**: ≥ 1200px (Large laptops, desktops)

## CSS Custom Properties (Variables)

The system uses CSS custom properties for consistent spacing and sizing:

```css
:root {
  --container-max-width: 1200px;
  --container-padding: 20px;
  --border-radius: 10px;
  --box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
  --transition: all 0.3s ease;
  
  /* Responsive spacing */
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 32px;
  --spacing-xl: 48px;
  
  /* Responsive font sizes */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
  --font-size-3xl: 48px;
}
```

## Responsive Utility Classes

### Container Classes
- `.responsive-container` - Responsive container with max-width and auto margins
- `.responsive-grid` - CSS Grid with auto-fit columns
- `.responsive-flex` - Flexbox with responsive wrapping

### Typography Classes
- `.responsive-text` - Base responsive text
- `.responsive-heading` - Responsive headings
- `.responsive-subheading` - Responsive subheadings

### Component Classes
- `.responsive-box` - Responsive box component
- `.responsive-btn` - Responsive button
- `.responsive-input` - Responsive form input
- `.responsive-card` - Responsive card component
- `.responsive-table` - Responsive table wrapper
- `.responsive-modal` - Responsive modal/overlay
- `.responsive-sidebar` - Responsive sidebar
- `.responsive-nav` - Responsive navigation

### Spacing Utility Classes
- `.mb-0` to `.mb-5` - Margin bottom utilities
- `.mt-0` to `.mt-5` - Margin top utilities
- `.p-0` to `.p-5` - Padding utilities

### Responsive Visibility Classes
- `.hide-xs`, `.hide-sm`, `.hide-md`, `.hide-lg`, `.hide-xl` - Hide on specific breakpoints
- `.show-xs`, `.show-sm`, `.show-md`, `.show-lg`, `.show-xl` - Show on specific breakpoints

## React Components

### ResponsiveProvider
Wraps your app to provide responsive context:

```jsx
import { ResponsiveProvider } from './components/ResponsiveWrapper';

const App = () => {
  return (
    <ResponsiveProvider>
      {/* Your app content */}
    </ResponsiveProvider>
  );
};
```

### ResponsiveWrapper
Conditionally applies classes based on screen size:

```jsx
import { ResponsiveWrapper } from './components/ResponsiveWrapper';

<ResponsiveWrapper 
  className="base-class"
  mobileClass="mobile-specific-class"
  tabletClass="tablet-specific-class"
  desktopClass="desktop-specific-class"
>
  Content
</ResponsiveWrapper>
```

### ResponsiveGrid
Creates responsive grid layouts:

```jsx
import { ResponsiveGrid } from './components/ResponsiveWrapper';

<ResponsiveGrid 
  columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
  gap={{ xs: 16, sm: 20, md: 24, lg: 28, xl: 32 }}
>
  <div>Grid Item 1</div>
  <div>Grid Item 2</div>
  <div>Grid Item 3</div>
</ResponsiveGrid>
```

### ResponsiveFlex
Creates responsive flexbox layouts:

```jsx
import { ResponsiveFlex } from './components/ResponsiveWrapper';

<ResponsiveFlex 
  direction={{ xs: 'column', sm: 'row', md: 'row' }}
  gap={{ xs: 16, sm: 20, md: 24, lg: 28, xl: 32 }}
>
  <div>Flex Item 1</div>
  <div>Flex Item 2</div>
</ResponsiveFlex>
```

## Custom Hook

### useResponsive
Provides responsive information and utilities:

```jsx
import useResponsive from './hooks/useResponsive';

const MyComponent = () => {
  const { 
    breakpoint, 
    isMobile, 
    isTablet, 
    isDesktop,
    windowSize,
    getResponsiveValue 
  } = useResponsive();

  // Use responsive values
  const spacing = getResponsiveValue({ xs: 8, sm: 16, md: 24, lg: 32, xl: 48 });

  return (
    <div style={{ padding: spacing }}>
      Current breakpoint: {breakpoint}
      {isMobile && <p>Mobile view</p>}
      {isTablet && <p>Tablet view</p>}
      {isDesktop && <p>Desktop view</p>}
    </div>
  );
};
```

## Media Queries

The system includes comprehensive media queries for all breakpoints:

```css
/* Extra Small devices (phones, 576px and down) */
@media (max-width: 575.98px) {
  :root {
    --container-padding: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --font-size-xl: 20px;
    --font-size-2xl: 28px;
    --font-size-3xl: 36px;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  :root {
    --container-padding: 18px;
    --spacing-lg: 28px;
    --spacing-xl: 40px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  :root {
    --container-padding: 20px;
    --spacing-lg: 30px;
    --spacing-xl: 44px;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {
  :root {
    --container-padding: 24px;
    --spacing-lg: 32px;
    --spacing-xl: 48px;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  :root {
    --container-padding: 32px;
    --spacing-lg: 40px;
    --spacing-xl: 56px;
  }
}
```

## Best Practices

### 1. Use CSS Custom Properties
Instead of hardcoded values, use the CSS variables:

```css
/* Good */
.my-component {
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

/* Avoid */
.my-component {
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
}
```

### 2. Use Responsive Utility Classes
Leverage the pre-built responsive classes:

```jsx
// Good
<div className="responsive-container responsive-grid">
  <div className="responsive-card">Card 1</div>
  <div className="responsive-card">Card 2</div>
</div>

// Avoid
<div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid' }}>
  <div style={{ background: 'white', borderRadius: '10px' }}>Card 1</div>
</div>
```

### 3. Use the Responsive Hook
For dynamic responsive behavior:

```jsx
// Good
const { isMobile, breakpoint } = useResponsive();
const columns = isMobile ? 1 : 3;

// Avoid
const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
useEffect(() => {
  const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  // ... event listener setup
}, []);
```

### 4. Test on Multiple Devices
Always test your responsive design on:
- Different laptop resolutions (1366x768, 1920x1080, 2560x1440, etc.)
- Tablets (768px, 1024px)
- Mobile devices (320px, 375px, 414px)
- Different aspect ratios

## Common Patterns

### Responsive Navigation
```jsx
<nav className="responsive-nav">
  <div className="hide-xs">Desktop Menu</div>
  <div className="show-xs">Mobile Menu</div>
</nav>
```

### Responsive Cards
```jsx
<div className="responsive-grid">
  <div className="responsive-card">
    <h3 className="responsive-heading">Card Title</h3>
    <p className="responsive-text">Card content</p>
  </div>
</div>
```

### Responsive Forms
```jsx
<form className="responsive-container">
  <input className="responsive-input" type="text" placeholder="Enter text" />
  <button className="responsive-btn" type="submit">Submit</button>
</form>
```

## Troubleshooting

### Common Issues

1. **Elements not responding to breakpoints**
   - Ensure the responsive CSS is imported
   - Check that media queries are properly nested
   - Verify breakpoint values are correct

2. **Layout breaking on specific screen sizes**
   - Use the responsive hook to debug breakpoint detection
   - Check CSS specificity issues
   - Ensure proper box-sizing is set

3. **Images not scaling properly**
   - Use `.responsive-img` class
   - Set `max-width: 100%` and `height: auto`
   - Consider using `object-fit: cover` for consistent aspect ratios

### Debug Tools

1. **Browser DevTools**
   - Use responsive design mode
   - Test different screen sizes
   - Check CSS applied at each breakpoint

2. **Responsive Hook Debugging**
   ```jsx
   const responsive = useResponsive();
   console.log('Current breakpoint:', responsive.breakpoint);
   console.log('Window size:', responsive.windowSize);
   ```

## Performance Considerations

1. **CSS Variables**: CSS custom properties are well-supported and performant
2. **Media Queries**: Use `min-width` and `max-width` for optimal performance
3. **Responsive Images**: Consider using `srcset` for different resolutions
4. **Lazy Loading**: Implement lazy loading for images and components

## Browser Support

The responsive system supports:
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 12+
- Internet Explorer 11 (with polyfills)

## Conclusion

This responsive design system provides a comprehensive solution for creating adaptive layouts that work across all laptop resolutions and devices. By following the patterns and best practices outlined in this guide, you can ensure your AI Exam Portal provides an optimal user experience regardless of screen size.
