# Theming

## How OUI theming works

OUI uses CSS custom properties (CSS variables) for theming, allowing for dynamic theme switching and easy customization. The library supports both light and dark themes out of the box.

## Available Themes

- **Light theme** (default) - Clean, accessible light theme
- **Dark theme** - Dark mode variant with proper contrast ratios

## Theme Implementation

### CSS Custom Properties

The theme system uses CSS custom properties defined in the `:root` and `.dark` selectors:

```css
:root {
  --oui-severity-low: 120 100% 25%;
  --oui-severity-med: 45 100% 50%;
  --oui-severity-high: 15 100% 55%;
  --oui-severity-critical: 0 85% 60%;
  /* Additional theme variables... */
}

.dark {
  --oui-severity-low: 120 50% 40%;
  --oui-severity-med: 45 80% 60%;
  --oui-severity-high: 15 90% 65%;
  --oui-severity-critical: 0 75% 65%;
  /* Dark theme overrides... */
}
```

### Theme Switching

The dark theme is activated by adding the `dark` class to a parent element (typically `<html>` or `<body>`):

```html
<html class="dark">
  <!-- Dark theme active for entire page -->
</html>
```

Or for specific sections:

```jsx
<div className="dark">
  {/* Dark theme active for this section */}
  <Button>Dark themed button</Button>
</div>
```

## Creating Custom Themes

### 1. Override CSS Custom Properties

Create your custom theme by overriding the CSS variables:

```css
/* custom-theme.css */
:root {
  --oui-severity-low: 200 100% 30%;    /* Custom blue-green */
  --oui-severity-high: 280 100% 50%;   /* Custom purple */
  /* Override other variables as needed */
}

/* Custom dark theme variant */
.dark {
  --oui-severity-low: 200 80% 40%;
  --oui-severity-high: 280 80% 60%;
}
```

### 2. Extend Tailwind Configuration

If you're using Tailwind CSS in your project, extend your configuration:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Map OUI variables to Tailwind classes
        'severity-low': 'hsl(var(--oui-severity-low))',
        'severity-med': 'hsl(var(--oui-severity-med))',
        'severity-high': 'hsl(var(--oui-severity-high))',
        'severity-critical': 'hsl(var(--oui-severity-critical))',
        // Add your custom colors
        'brand-primary': 'hsl(var(--oui-brand-primary))',
      }
    }
  }
}
```

### 3. Component-Level Theming

You can also apply themes to specific components using CSS-in-JS or CSS modules:

```tsx
const ThemedComponent = () => {
  return (
    <div
      style={{
        '--oui-severity-high': '300 100% 50%', // Override for this component
      }}
    >
      <Button variant="destructive">Custom themed button</Button>
    </div>
  )
}
```

## Theming Best Practices

1. **Use semantic color names** - Define colors by purpose, not appearance
2. **Test both themes** - Ensure your customizations work in light and dark modes
3. **Maintain contrast ratios** - Follow WCAG guidelines for accessibility
4. **Leverage existing variables** - Override only what you need to change
5. **HSL color format** - Use HSL values (without `hsl()` wrapper) for better manipulation

## Dynamic Theme Switching

For runtime theme switching, you can use a theme provider or simple class toggling:

```tsx
const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return (
    <div>
      <button onClick={() => setIsDark(!isDark)}>
        Toggle {isDark ? 'Light' : 'Dark'} Mode
      </button>
      {children}
    </div>
  )
}
```

## Migration from SCSS Themes

If you're migrating from the previous SCSS-based theming:

1. **Extract color values** from your SCSS variables
2. **Convert to HSL format** (preferred for CSS custom properties)
3. **Define in CSS custom properties** instead of SCSS variables
4. **Update component usage** to reference the new variable names
5. **Test thoroughly** in both light and dark modes

The new system provides more flexibility and better performance than the previous SCSS approach.