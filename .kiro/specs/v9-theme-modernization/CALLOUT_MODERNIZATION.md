# CallOut Component Modernization

## Current State Analysis

### Visual Characteristics
Based on the screenshot and code analysis:
- **Border Radius**: None (sharp corners)
- **Left Border**: 4px solid color accent (calc($ouiSizeXS / 2))
- **Background**: Tinted color (90% light, 70% dark via `tintOrShade()`)
- **Padding**: 16px standard, 12px small
- **Icon**: Positioned with 2px vertical offset, colored to match theme
- **Typography**: Title uses `ouiTitle('xs')` with regular weight
- **Dismiss Button**: Absolute positioned in top-right corner
- **Shadow**: None

### Current Implementation
```scss
.ouiCallOut {
  padding: $ouiSize;
  border-left: calc($ouiSizeXS / 2) solid transparent;
  position: relative;
}
```

Color generation uses SASS functions:
```scss
$backgroundColor: tintOrShade($color, 90%, 70%);
$foregroundColor: shadeOrTint(makeHighContrastColor($color, $backgroundColor), 0%, 20%);
```

## Problems with Current Design

1. **No Border Radius**: Sharp corners look dated compared to modern designs
2. **Heavy Left Border**: 4px border is quite thick and dominant
3. **No Elevation**: Flat appearance without subtle shadows
4. **Basic Backgrounds**: Simple tinted colors without sophistication
5. **Limited Visual Hierarchy**: Icon and title don't stand out enough
6. **Dismiss Button Positioning**: Could be better integrated

## Modern Design Inspiration

### shadcn/ui Alert Component
- 8px border radius (rounded corners)
- Subtle border all around (1px)
- No heavy left accent
- Soft background colors
- Icon and text well-balanced
- Clean, minimal aesthetic

### Other Modern Patterns
- **Linear**: Subtle backgrounds, rounded corners, no heavy borders
- **GitHub**: Soft colors, good spacing, clear hierarchy
- **Vercel**: Minimal borders, focus on content, subtle shadows

## Modernization Recommendations

### Option A: Subtle All-Around Border (Recommended)
**Visual Style**: Clean, minimal, modern
- **Border Radius**: 8px (matches base border radius)
- **Border**: 1px solid subtle color all around
- **Left Accent**: 3px rounded accent bar (inset from edge)
- **Background**: Softer, more transparent (95% light, 80% dark)
- **Shadow**: Subtle elevation (`0 1px 2px rgba(0, 0, 0, 0.05)`)
- **Padding**: Increase to 20px for better breathing room
- **Icon Size**: Keep at 'm' but ensure good alignment

**Pros**:
- Modern, clean appearance
- Maintains visual distinction with accent
- Better elevation and depth
- Aligns with shadcn/ui aesthetic

**Cons**:
- Slightly more complex styling
- Requires careful color balance

### Option B: Background-Only (Minimal)
**Visual Style**: Ultra-minimal, content-focused
- **Border Radius**: 8px
- **Border**: None
- **Left Accent**: None
- **Background**: Very subtle (97% light, 85% dark)
- **Shadow**: None or very subtle
- **Padding**: 20px

**Pros**:
- Extremely clean
- Focus on content
- Simple implementation

**Cons**:
- May lack visual distinction
- Less clear hierarchy between types

### Option C: Enhanced Left Accent (Evolution)
**Visual Style**: Evolution of current design
- **Border Radius**: 8px
- **Border**: None on top/right/bottom
- **Left Accent**: 3px rounded bar (with border radius)
- **Background**: Softer colors (95% light, 80% dark)
- **Shadow**: Subtle (`0 1px 2px rgba(0, 0, 0, 0.05)`)
- **Padding**: 20px

**Pros**:
- Familiar pattern, modernized
- Clear visual hierarchy
- Good balance of old and new

**Cons**:
- Still relies on left accent pattern
- Less aligned with modern minimal trends

## Recommended Approach: Option A

### Visual Specifications

#### Border Radius
```scss
border-radius: $ouiBorderRadius; // 8px
```

#### Border
```scss
border: 1px solid;
// Colors per type (using modern palette):
// primary: rgba(37, 99, 235, 0.2)   // Blue-500 at 20%
// success: rgba(16, 185, 129, 0.2)  // Green-500 at 20%
// warning: rgba(245, 158, 11, 0.2)  // Amber-500 at 20%
// danger: rgba(239, 68, 68, 0.2)    // Red-500 at 20%
```

#### Left Accent Bar
```scss
&::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: 3px;
  border-radius: 2px;
  background-color: currentColor; // Uses the theme color
}
```

#### Background Colors
```scss
// Light theme - more transparent
background-color: rgba($color, 0.05); // 5% opacity

// Dark theme - slightly more visible
background-color: rgba($color, 0.12); // 12% opacity
```

#### Shadow
```scss
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

// Dark theme
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
```

#### Padding
```scss
padding: calc($ouiSize * 1.25); // 20px (was 16px)

&.ouiCallOut--small {
  padding: $ouiSize; // 16px (was 12px)
}
```

#### Icon Styling
```scss
.ouiCallOutHeader__icon {
  flex: 0 0 auto;
  transform: translateY(1px); // Reduced from 2px
  opacity: 0.9; // Slightly muted
}
```

#### Dismiss Button
```scss
.ouiCallOut__closeIcon {
  position: absolute;
  right: $ouiSizeS; // 8px from edge
  top: $ouiSizeS;   // 8px from top
  opacity: 0.7;
  transition: opacity $ouiAnimSpeedNormal ease;
  
  &:hover {
    opacity: 1;
  }
}
```

### Color Specifications

Using the modern color palette from COLOR_MODERNIZATION.md:

#### Light Theme
```scss
// Primary (Blue)
border-color: rgba(37, 99, 235, 0.2);
background-color: rgba(37, 99, 235, 0.05);
color: #1e40af; // Blue-800

// Success (Green)
border-color: rgba(16, 185, 129, 0.2);
background-color: rgba(16, 185, 129, 0.05);
color: #047857; // Green-700

// Warning (Amber)
border-color: rgba(245, 158, 11, 0.2);
background-color: rgba(245, 158, 11, 0.05);
color: #b45309; // Amber-700

// Danger (Red)
border-color: rgba(239, 68, 68, 0.2);
background-color: rgba(239, 68, 68, 0.05);
color: #b91c1c; // Red-700
```

#### Dark Theme
```scss
// Primary (Blue)
border-color: rgba(59, 130, 246, 0.3);
background-color: rgba(59, 130, 246, 0.12);
color: #93c5fd; // Blue-300

// Success (Green)
border-color: rgba(52, 211, 153, 0.3);
background-color: rgba(52, 211, 153, 0.12);
color: #6ee7b7; // Green-300

// Warning (Amber)
border-color: rgba(251, 191, 36, 0.3);
background-color: rgba(251, 191, 36, 0.12);
color: #fcd34d; // Amber-300

// Danger (Red)
border-color: rgba(248, 113, 113, 0.3);
background-color: rgba(248, 113, 113, 0.12);
color: #fca5a5; // Red-300
```

## Implementation Details

### Files to Modify

1. **src/components/call_out/_call_out.scss**
   - Add border-radius
   - Update border styling (remove border-left, add all-around border)
   - Add left accent bar using ::before pseudo-element
   - Add box-shadow
   - Update padding
   - Improve dismiss button positioning
   - Add hover states

2. **src/components/call_out/_mixins.scss**
   - Update `ouiCallOutColor()` function to return border colors
   - Adjust background color opacity
   - Add foreground color adjustments for better contrast

3. **src/themes/v9/global_styling/variables/_colors.scss** (if needed)
   - May need to add specific callout color variables

### Backward Compatibility

All changes are purely visual (CSS-only):
- No component API changes
- No prop changes
- No breaking changes to existing usage
- All existing callouts will automatically get new styling

### Accessibility Considerations

1. **Color Contrast**: Ensure WCAG 2.1 Level AA compliance
   - Text on background: minimum 4.5:1 ratio
   - Icon on background: minimum 3:1 ratio
   - Border provides additional visual distinction

2. **Focus States**: Maintain clear focus indicators for dismiss button

3. **Reduced Motion**: Respect `prefers-reduced-motion` for transitions

### Testing Checklist

- [ ] All four color types render correctly (primary, success, warning, danger)
- [ ] Small and medium sizes work properly
- [ ] Dismiss button functions and is accessible
- [ ] Icon alignment is correct
- [ ] Text wrapping works properly
- [ ] Dark theme colors have sufficient contrast
- [ ] Light theme colors have sufficient contrast
- [ ] Border radius is consistent
- [ ] Shadow is subtle and appropriate
- [ ] Spacing feels balanced

## Visual Comparison

### Before (Current)
```
┌─────────────────────────────────────┐
│ ▌ ⓘ  Title                      ✕  │
│ ▌                                   │
│ ▌ Content text goes here and       │
│ ▌ wraps to multiple lines           │
└─────────────────────────────────────┘
```
- Sharp corners
- Heavy 4px left border
- No shadow
- Basic background

### After (Modernized)
```
╭─────────────────────────────────────╮
│ ▌ ⓘ  Title                      ✕  │
│ ▌                                   │
│ ▌ Content text goes here and       │
│ ▌ wraps to multiple lines           │
╰─────────────────────────────────────╯
```
- 8px rounded corners
- Subtle 1px border all around
- 3px rounded left accent bar (inset)
- Soft shadow for elevation
- More transparent background
- Better spacing

## Migration Notes

No migration required - all changes are automatic when the v9 theme is applied.

## Related Documentation

- [COLOR_MODERNIZATION.md](./COLOR_MODERNIZATION.md) - Modern color palette
- [BADGE_MODERNIZATION.md](./BADGE_MODERNIZATION.md) - Similar modernization approach
- [SIDENAV_MODERNIZATION.md](./SIDENAV_MODERNIZATION.md) - Background-based selection pattern
