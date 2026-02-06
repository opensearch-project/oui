# Toast Modernization for V9 Theme

## Overview

This document outlines the modernization approach for the OuiToast component in the v9 theme. The goal is to create a cleaner, more modern notification aesthetic with better visual hierarchy and smoother interactions.

## Current State Analysis

From the screenshot, the current Toast has:
- Sharp top corners with 2px colored border-top
- Standard border on all sides
- Basic shadow
- Light font-weight for title (300)
- Close button with opacity transition
- White background

## Modernization Goals

1. **Softer Appearance**: Add border radius to all corners
2. **Enhanced Visual Hierarchy**: Improve title typography and icon styling
3. **Better Color Accent**: Use left accent bar instead of top border
4. **Modern Shadow**: Upgrade to layered, softer shadow
5. **Improved Close Button**: Better visibility and interaction
6. **Smooth Animations**: Enhance entrance and exit transitions

## Design Decisions

### Option A: Subtle All-Around with Left Accent (RECOMMENDED)
- Border radius on all corners (8px)
- Subtle all-around border (1px)
- Left accent bar (3px) for color indication
- Modern layered shadow
- Semibold title (600)
- Always-visible close button

**Benefits:**
- Modern, clean appearance
- Clear color indication without being heavy
- Better visual hierarchy
- Professional look
- Consistent with CallOut modernization

### Option B: Top Accent with Rounded Corners
- Border radius on all corners (8px)
- Keep 2px top border for color
- Remove other borders
- Modern shadow
- Semibold title

**Drawbacks:**
- Less consistent with other modernized components
- Top accent can feel dated
- Less elegant than left accent

### Option C: Floating Card Style
- Large border radius (12px)
- No borders, shadow only
- Colored icon for indication
- Maximum elevation

**Drawbacks:**
- May feel too "floaty" for notifications
- Less clear color indication
- Could be distracting

**Recommendation: Option A** - Provides the best balance of modern aesthetics, clear visual hierarchy, and consistency with other modernized components.

## Visual Specifications

### Container
- **Border Radius**: 8px on all corners (`$ouiBorderRadius`)
- **Border**: 1px solid with subtle color
- **Background**: Clean white/dark background
- **Shadow**: Modern layered shadow for elevation
- **Padding**: 16px (current)

### Left Accent Bar
- **Width**: 3px
- **Height**: 100% (full height)
- **Position**: Absolute, left edge
- **Border Radius**: Inherit from container (rounded with container)
- **Colors**: Based on toast type (primary, success, warning, danger)

### Title
- **Font Weight**: Semibold (600) instead of light (300)
- **Font Size**: Maintain current size
- **Color**: Title color (unchanged)

### Icon
- **Size**: Current size maintained
- **Color**: Title color (unchanged)
- **Alignment**: Baseline with title

### Close Button
- **Visibility**: Always visible (opacity: 1)
- **Hover**: Background change with smooth transition
- **Focus**: Enhanced focus state
- **Position**: Top-right corner

### Animation
- **Entrance**: Slide up with scale (current)
- **Exit**: Fade out with slight scale down
- **Duration**: Fast (150ms)
- **Easing**: Ease-out

## Implementation Details

### New Variables (v9 theme only)

```scss
// Toast container
$ouiToastBorderRadius: $ouiBorderRadius !default;                    // 8px
$ouiToastBorder: 1px solid transparentize($ouiBorderColor, 0.5) !default;
$ouiToastShadow: 0 4px 6px -1px rgba($ouiShadowColor, 0.1),
                 0 2px 4px -1px rgba($ouiShadowColor, 0.06) !default;
$ouiToastPadding: $ouiSize !default;                                 // 16px

// Left accent bar
$ouiToastAccentWidth: 3px !default;
$ouiToastAccentBorderRadius: $ouiBorderRadius 0 0 $ouiBorderRadius !default;

// Title
$ouiToastTitleFontWeight: $ouiFontWeightSemiBold !default;           // 600

// Close button
$ouiToastCloseButtonOpacity: 1 !default;                             // Always visible
$ouiToastCloseButtonHoverBackground: transparentize($ouiColorLightShade, 0.5) !default;
$ouiToastCloseButtonTransition: background-color $ouiAnimSpeedFast $ouiAnimEaseInOut !default;

// Animation
$ouiToastAnimationDuration: $ouiAnimSpeedFast !default;              // 150ms
$ouiToastAnimationEasing: $ouiAnimEaseOut !default;
```

### Dark Theme Adjustments

For dark theme, adjust:
- Border: More visible (`transparentize($ouiBorderColor, 0.3)`)
- Shadow: Stronger for elevation (`rgba($ouiShadowColor, 0.3)`)
- Close button hover: Lighter background
- Accent bar: Slightly brighter colors

## Component Changes

### 1. Container Styling
**File**: `src/components/toast/_toast.scss`

Replace current styling with v9-specific:
```scss
// V9 theme modernization
@if (variable-exists(ouiToastBorderRadius)) {
  .ouiToast {
    border: $ouiToastBorder;                        // Subtle all-around
    border-radius: $ouiToastBorderRadius;           // 8px rounded
    box-shadow: $ouiToastShadow;                    // Modern shadow
    padding: $ouiToastPadding;
    position: relative;
    overflow: hidden;                               // Clip accent bar
    
    // Remove old border-top styling
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: $ouiToastAccentWidth;                  // 3px left accent
      border-radius: $ouiToastAccentBorderRadius;
    }
  }
  
  // Update color modifiers to use left accent
  @each $name, $color in $ouiToastTypes {
    .ouiToast--#{$name} {
      border-top: none;                             // Remove old top border
      
      &::before {
        background-color: $color;                   // Colored accent bar
      }
    }
  }
}
```

### 2. Title Modernization
**File**: `src/components/toast/_toast.scss`

Update title styling:
```scss
// V9 theme modernization
@if (variable-exists(ouiToastTitleFontWeight)) {
  .ouiToastHeader__title {
    font-weight: $ouiToastTitleFontWeight;          // Semibold (600)
  }
}
```

### 3. Close Button Enhancement
**File**: `src/components/toast/_toast.scss`

Update close button:
```scss
// V9 theme modernization
@if (variable-exists(ouiToastCloseButtonOpacity)) {
  .ouiToast__closeButton {
    opacity: $ouiToastCloseButtonOpacity;           // Always visible
    transition: $ouiToastCloseButtonTransition;
    border-radius: $ouiBorderRadiusSmall;           // 6px
    
    &:hover {
      background-color: $ouiToastCloseButtonHoverBackground;
      
      svg {
        fill: $ouiTitleColor;
      }
    }
    
    &:focus {
      background-color: $ouiFocusBackgroundColor;
      
      svg {
        fill: $ouiColorPrimary;
      }
    }
  }
  
  // Remove hover/focus opacity changes from container
  .ouiToast {
    &:hover .ouiToast__closeButton,
    &:focus .ouiToast__closeButton {
      opacity: 1;                                   // No change needed
    }
  }
}
```

### 4. Animation Enhancement
**File**: `src/components/toast/_global_toast_list.scss`

Update animations:
```scss
// V9 theme modernization
@if (variable-exists(ouiToastAnimationDuration)) {
  .ouiGlobalToastListItem {
    animation: $ouiToastAnimationDuration ouiShowToast $ouiToastAnimationEasing;
    
    &.ouiGlobalToastListItem-isDismissed {
      transition: opacity $ouiToastAnimationDuration $ouiToastAnimationEasing,
                  transform $ouiToastAnimationDuration $ouiToastAnimationEasing;
      opacity: 0;
      transform: scale(0.95);                       // Slight scale down on exit
    }
  }
  
  @keyframes ouiShowToast {
    from {
      transform: translateY($ouiSizeL) scale(0.95); // Slightly less scale
      opacity: 0;
    }
    
    to {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }
  
  // Respect reduced motion
  @media (prefers-reduced-motion: reduce) {
    .ouiGlobalToastListItem {
      animation: none;
      
      &.ouiGlobalToastListItem-isDismissed {
        transition: opacity $ouiToastAnimationDuration;
        transform: none;
      }
    }
    
    @keyframes ouiShowToast {
      from {
        transform: none;
        opacity: 0;
      }
      
      to {
        transform: none;
        opacity: 1;
      }
    }
  }
}
```

### 5. Dark Theme Overrides
**File**: `src/themes/v9/components/_toast.scss`

```scss
@if (lightness($ouiPageBackgroundColor) < 50) {
  // More visible border
  $ouiToastBorder: 1px solid transparentize($ouiBorderColor, 0.3);
  
  // Stronger shadow
  $ouiToastShadow: 0 4px 6px -1px rgba($ouiShadowColor, 0.3),
                   0 2px 4px -1px rgba($ouiShadowColor, 0.2);
  
  // Lighter close button hover
  $ouiToastCloseButtonHoverBackground: transparentize($ouiColorLightShade, 0.3);
  
  // Slightly brighter accent colors
  .ouiToast--primary::before {
    background-color: lighten($ouiColorPrimary, 5%);
  }
  
  .ouiToast--success::before {
    background-color: lighten($ouiColorSecondary, 5%);
  }
  
  .ouiToast--warning::before {
    background-color: lighten($ouiColorWarning, 5%);
  }
  
  .ouiToast--danger::before {
    background-color: lighten($ouiColorDanger, 5%);
  }
}
```

## Backward Compatibility

All changes are scoped to v9 theme only using:
```scss
@if (variable-exists(ouiToastBorderRadius)) {
  // V9-specific styles
}
```

This ensures:
- Other themes remain unchanged
- No breaking changes
- Variables are optional
- Graceful degradation

## Accessibility Considerations

1. **Focus Indicators**: Enhanced close button focus state
2. **Color Contrast**: All colors meet WCAG 2.1 Level AA standards
3. **Reduced Motion**: Animations disabled when `prefers-reduced-motion` is set
4. **Screen Readers**: No changes to ARIA attributes or semantic structure
5. **Keyboard Navigation**: Close button remains fully keyboard accessible

## Testing Requirements

### Visual Tests
- [ ] Toast has 8px border radius on all corners
- [ ] Toast has subtle all-around border
- [ ] Toast has 3px left accent bar in correct color
- [ ] Toast has modern layered shadow
- [ ] Title uses semibold font-weight (600)
- [ ] Close button is always visible
- [ ] Close button has hover background
- [ ] Entrance animation is smooth
- [ ] Exit animation includes scale
- [ ] Dark theme adjustments work correctly

### Functional Tests
- [ ] Toast displays with correct color type
- [ ] Close button dismisses toast
- [ ] Multiple toasts stack correctly
- [ ] Toast list scrolling works
- [ ] Auto-dismiss timing works
- [ ] Toast positioning (left/right) works

### Accessibility Tests
- [ ] Close button focus state is visible
- [ ] Color contrast ratios are compliant
- [ ] Keyboard navigation works correctly
- [ ] Screen readers announce correctly
- [ ] Reduced motion is respected

## Migration Notes

For developers using Toast:
- No API changes required
- Styling changes are automatic in v9 theme
- Custom toast styles should use new variables when available
- Close button is now always visible (no opacity change needed)

## Visual Comparison

### Before (Current)
- Sharp corners (no border radius)
- 2px colored top border
- Standard shadow
- Light title (300)
- Hidden close button (opacity: 0)
- Basic animation

### After (Modernized)
- Rounded corners (8px)
- Subtle all-around border
- 3px left accent bar
- Modern layered shadow
- Semibold title (600)
- Always-visible close button
- Enhanced animations
- Better visual hierarchy

## Benefits Summary

1. **Modern Aesthetic**: Rounded corners and left accent bar
2. **Better Hierarchy**: Semibold title stands out more
3. **Enhanced Visibility**: Always-visible close button
4. **Professional Look**: Consistent with other modernized components
5. **Smooth Interactions**: Enhanced animations
6. **Accessibility**: Improved focus states and reduced motion support
7. **Backward Compatible**: No breaking changes
8. **Theme-Specific**: Only affects v9 theme
9. **Clear Indication**: Left accent bar clearly shows toast type
10. **Elegant Design**: Subtle borders and modern shadows

## Implementation Priority

1. **High Priority** (Core modernization):
   - Container border radius and shadow
   - Left accent bar implementation
   - Title font-weight update
   - Close button always-visible

2. **Medium Priority** (Enhancements):
   - Close button hover effects
   - Animation improvements
   - Dark theme adjustments

3. **Low Priority** (Polish):
   - Fine-tuning shadows
   - Optimizing transitions
   - Additional hover effects
