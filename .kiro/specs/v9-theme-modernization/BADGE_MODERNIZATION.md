# Badge Component Modernization

## Overview

This document outlines the modernization of the OuiBadge component to achieve a contemporary look aligned with shadcn/ui and modern design systems. The modernization focuses on border radius, spacing, typography, and color refinements while maintaining backward compatibility.

## Current State Analysis

### Current Badge Implementation

**File**: `src/components/badge/_badge.scss`

**Current Styling**:
```scss
.ouiBadge {
  font-size: $ouiFontSizeXS;              // 12px
  font-weight: $ouiFontWeightMedium;      // 500
  line-height: $ouiSize + 2px;            // 18px (16px + 2px for border)
  padding: 0 $ouiSizeS;                   // 0 8px
  border-radius: calc($ouiBorderRadius / 2); // 2px (was 4px / 2)
  border: solid 1px transparent;
  background-color: transparent;
  white-space: nowrap;
  vertical-align: middle;
  cursor: default;
}
```

**Current Issues**:

1. **Sharp Corners**: Border radius of 2px feels dated and harsh
2. **Tight Spacing**: Horizontal padding of 8px feels cramped
3. **Minimal Height**: Line height of 18px creates small badges
4. **Old Font Weight**: Medium (500) doesn't provide enough emphasis
5. **No Transitions**: No smooth state changes for interactive badges
6. **Hollow Variant**: Uses old border color system

### Related Components

**Beta Badge** (`beta_badge/_beta_badge.scss`):
- Uses `border-radius: $ouiSizeL` (24px) for pill shape
- Has better padding: `0 $ouiSize` (0 16px)
- Uses uppercase text with letter spacing
- More modern appearance overall

**Notification Badge** (`notification_badge/_notification_badge.scss`):
- Uses `border-radius: $ouiBorderRadius` (currently 4px, will be 8px)
- Has better sizing: `height: $ouiSize` (16px)
- More compact and modern

## Modernization Recommendations

### Option A: Subtle Rounded (Recommended)

Modern, professional badges with gentle rounding inspired by shadcn/ui.

**Visual Characteristics**:
- Border radius: 6px (subtle but noticeable)
- Comfortable padding: 6px 10px
- Better height: 22px minimum
- Semibold font weight (600)
- Smooth transitions on interactive badges

**Benefits**:
- Professional and clean
- Works well at all sizes
- Aligns with form controls (6px radius)
- Not too playful, not too sharp

### Option B: Pill Style

Fully rounded badges with maximum border radius.

**Visual Characteristics**:
- Border radius: 999px (full pill)
- Generous padding: 6px 12px
- Better height: 24px minimum
- Semibold font weight (600)

**Benefits**:
- Very modern and friendly
- Excellent for tags and labels
- High visual distinction

**Drawbacks**:
- May feel too casual for some contexts
- Takes more horizontal space

### Option C: Squared with Accent

Minimal rounding with subtle accent colors.

**Visual Characteristics**:
- Border radius: 4px (minimal)
- Tight padding: 4px 8px
- Compact height: 20px
- Medium font weight (500)

**Benefits**:
- Compact and space-efficient
- Works in dense UIs

**Drawbacks**:
- Less modern feeling
- Doesn't align with other modernized components

## Recommended Approach: Option A (Subtle Rounded)

This approach provides the best balance of modern aesthetics and professional appearance while aligning with the overall v9 theme modernization.

## Implementation Guide

### Step 1: Update Badge Variables

Create or update `src/themes/v9/global_styling/variables/_badge.scss`:

```scss
// Badge sizing
$ouiBadgeBorderRadius: $ouiBorderRadiusSmall !default;        // 6px
$ouiBadgePaddingHorizontal: 10px !default;                    // More comfortable
$ouiBadgePaddingVertical: 2px !default;                       // Vertical padding
$ouiBadgeMinHeight: 22px !default;                            // Better minimum height
$ouiBadgeFontSize: $ouiFontSizeXS !default;                   // 12px
$ouiBadgeFontWeight: $ouiFontWeightSemiBold !default;         // 600 (was 500)
$ouiBadgeLineHeight: 1.5 !default;                            // 18px (12px * 1.5)

// Badge transitions
$ouiBadgeTransition: background-color $ouiAnimSpeedFast $ouiAnimEaseInOut,
                     border-color $ouiAnimSpeedFast $ouiAnimEaseInOut,
                     color $ouiAnimSpeedFast $ouiAnimEaseInOut,
                     box-shadow $ouiAnimSpeedFast $ouiAnimEaseInOut !default;

// Badge colors - use modern palette
$ouiBadgeHollowBorderColor: transparentize($ouiBorderColor, 0.3) !default;

// Icon spacing
$ouiBadgeIconSpacing: $ouiSizeXS !default;                    // 4px

// EUI Aliases
$euiBadgeBorderRadius: $ouiBadgeBorderRadius;
$euiBadgePaddingHorizontal: $ouiBadgePaddingHorizontal;
$euiBadgePaddingVertical: $ouiBadgePaddingVertical;
$euiBadgeMinHeight: $ouiBadgeMinHeight;
$euiBadgeFontSize: $ouiBadgeFontSize;
$euiBadgeFontWeight: $ouiBadgeFontWeight;
$euiBadgeLineHeight: $ouiBadgeLineHeight;
$euiBadgeTransition: $ouiBadgeTransition;
$euiBadgeHollowBorderColor: $ouiBadgeHollowBorderColor;
$euiBadgeIconSpacing: $ouiBadgeIconSpacing;
```

### Step 2: Update Badge Component Styles

Modify `src/components/badge/_badge.scss`:

```scss
.ouiBadge {
  font-size: $ouiBadgeFontSize;                    // 12px
  font-weight: $ouiBadgeFontWeight;                // 600 (was 500)
  line-height: $ouiBadgeLineHeight;                // 1.5 (was $ouiSize + 2px)
  padding: $ouiBadgePaddingVertical $ouiBadgePaddingHorizontal; // 2px 10px (was 0 8px)
  min-height: $ouiBadgeMinHeight;                  // 22px minimum
  display: inline-flex;                            // Changed from inline-block
  align-items: center;                             // Center content vertically
  text-decoration: none;
  border-radius: $ouiBadgeBorderRadius;            // 6px (was calc($ouiBorderRadius / 2))
  border: solid 1px transparent;
  background-color: transparent;
  white-space: nowrap;
  vertical-align: middle;
  cursor: default;
  max-width: 100%;
  text-align: left;
  transition: $ouiBadgeTransition;                 // Add smooth transitions

  &.ouiBadge-isDisabled {
    // sass-lint:disable-block no-important
    // Using !important to override inline styles
    color: makeHighContrastColor($ouiButtonColorDisabled, $ouiButtonColorDisabled, 2) !important;
    background-color: $ouiButtonColorDisabled !important;
  }

  &:focus-within {
    @include ouiFocusRing('small');
  }

  + .ouiBadge {
    margin-left: $ouiSizeXS;
  }

  .ouiBadge__content {
    min-height: $ouiBadgeMinHeight;                // Ensure proper height
    display: flex;
    align-items: center;
    overflow: hidden;
    gap: $ouiBadgeIconSpacing;                     // Use gap instead of margins
  }

  .ouiBadge__childButton {
    @include ouiTextTruncate;
    flex: 1 1 auto;
    text-align: inherit;
    font-weight: inherit;
    line-height: inherit;
    color: inherit;

    &:disabled {
      cursor: not-allowed;
    }

    &:not(:disabled) {
      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }
  }

  .ouiBadge__iconButton {
    flex: 0 0 auto;
    font-size: 0;
    margin-left: 0;                                // Remove margin (using gap now)

    &:focus {
      background-color: transparentize($ouiColorGhost, .2);
      color: $ouiColorInk;
      border-radius: 2px;
    }

    &:disabled {
      cursor: not-allowed;
    }

    .ouiBadge__icon {
      margin: 0 !important; // sass-lint:disable-line no-important
    }
  }

  .ouiBadge__text {
    @include ouiTextTruncate;
    flex: 1 1 auto;
    cursor: default;
  }

  .ouiBadge__icon {
    flex: 0 0 auto;
    margin: 0;                                     // Remove margin (using gap now)
  }

  &.ouiBadge--iconLeft {
    .ouiBadge__content {
      flex-direction: row-reverse;
    }
  }
  
  // Respect reduced motion
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.ouiBadge-isClickable {
  &:not(:disabled) {
    &:hover {
      text-decoration: underline;
      transform: translateY(-1px);               // Subtle lift on hover
      box-shadow: 0 2px 4px rgba($ouiShadowColor, 0.1); // Subtle shadow
    }
    
    &:active {
      transform: translateY(0);                  // Reset on click
      box-shadow: none;
    }
    
    &:focus {
      text-decoration: underline;
    }
  }

  &.ouiBadge-isDisabled {
    cursor: not-allowed;
  }

  &:focus {
    @include ouiFocusRing('small');
  }

  .ouiBadge__text {
    cursor: inherit;
  }
  
  // Respect reduced motion
  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
    
    &:active {
      transform: none;
    }
  }
}

// Hollow has a border and is mostly used for autocompleters
.ouiBadge--hollow {
  background-color: $ouiColorEmptyShade;
  border-color: $ouiBadgeHollowBorderColor;      // Use new variable
  color: $ouiTextColor;
}
```

### Step 3: Update Beta Badge (Optional Enhancement)

While Beta Badge is already modern, align it with new variables:

```scss
.ouiBetaBadge {
  display: inline-block;
  padding: 0 $ouiSize;
  border-radius: $ouiSizeL;                      // Keep pill shape
  box-shadow: inset 0 0 0 1px $ouiBorderColor;
  vertical-align: super;

  font-size: $ouiFontSizeXS;
  font-weight: $ouiFontWeightBold;               // Keep bold (700)
  text-transform: uppercase;
  letter-spacing: .05em;
  line-height: $ouiSizeL;
  text-align: center;
  white-space: nowrap;
  cursor: default;
  transition: $ouiBadgeTransition;               // Add transitions

  &:focus {
    @include ouiFocusRing;
    outline-color: lightOrDarkTheme($ouiColorInk, $ouiColorGhost);
    outline-offset: 2px;
  }

  &:not(.ouiBetaBadge--hollow) {
    box-shadow: none;
  }

  &.ouiBetaBadge--small {
    @include fontSize($ouiFontSize * .625);
    line-height: $ouiSize + $ouiSizeXS;
    padding: 0 $ouiSizeM;
  }
  
  // Respect reduced motion
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}
```

### Step 4: Update Notification Badge (Optional Enhancement)

Align with modernized border radius:

```scss
.ouiNotificationBadge {
  flex-shrink: 0;
  display: inline-block;
  border-radius: $ouiBorderRadiusSmall;          // 6px (was $ouiBorderRadius/4px)
  font-size: $ouiFontSizeXS;
  font-weight: $ouiFontWeightSemiBold;           // 600 (was 500)
  line-height: $ouiSize;
  height: $ouiSize;
  min-width: $ouiSize;
  padding-left: $ouiSizeXS;
  padding-right: $ouiSizeXS;
  vertical-align: middle;
  text-align: center;
  transition: $ouiBadgeTransition;               // Add transitions
  cursor: default;

  $backgroundColor: $ouiColorAccentText;
  background: $backgroundColor;
  color: chooseLightOrDarkText($backgroundColor, $ouiColorGhost, $ouiColorInk);
  
  // Respect reduced motion
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}
```

### Step 5: Import Badge Variables

Add to `src/themes/v9/v9_globals.scss`:

```scss
// Badge variables
@import 'global_styling/variables/badge';
```

## Visual Comparison

### Before (Current)

```
┌─────────────┐
│   Primary   │  ← 2px radius, tight padding, 500 weight
└─────────────┘
```

### After (Modernized)

```
╭──────────────╮
│   Primary    │  ← 6px radius, comfortable padding, 600 weight
╰──────────────╯
```

### Size Comparison

| Aspect | Current | Modernized | Change |
|--------|---------|------------|--------|
| Border Radius | 2px | 6px | +4px (3x rounder) |
| Horizontal Padding | 8px | 10px | +2px (25% more) |
| Vertical Padding | 0px | 2px | +2px (better height) |
| Min Height | ~18px | 22px | +4px (22% taller) |
| Font Weight | 500 | 600 | +100 (more emphasis) |
| Line Height | 18px | 18px (1.5) | Same (better calc) |

## Color Usage with Modern Palette

Badges will automatically benefit from the modernized color palette:

### Light Theme Badges

```scss
// Primary badge
background-color: #2563EB;  // Modern blue (was #0268BC)
color: #FFFFFF;

// Success badge
background-color: #10B981;  // Modern green (was #0F7B68)
color: #FFFFFF;

// Warning badge
background-color: #F59E0B;  // Warm amber (was #E0A130)
color: #0F172A;             // Dark text for contrast

// Danger badge
background-color: #EF4444;  // Clean red (was #C43D35)
color: #FFFFFF;

// Hollow badge
background-color: #FFFFFF;
border-color: rgba(148, 163, 184, 0.7); // Slate-400 with transparency
color: #1E293B;             // Slate-800
```

### Dark Theme Badges

```scss
// Primary badge
background-color: #3B82F6;  // Brighter blue (was #0097D1)
color: #020617;             // Dark text for contrast

// Success badge
background-color: #10B981;  // Modern green (was #129079)
color: #020617;

// Warning badge
background-color: #FBBF24;  // Brighter amber (was #F4AE27)
color: #020617;

// Danger badge
background-color: #F87171;  // Softer red (was #CD5D56)
color: #020617;

// Hollow badge
background-color: #020617;  // Slate-950
border-color: rgba(100, 116, 139, 0.7); // Slate-500 with transparency
color: #CBD5E1;             // Slate-300
```

## Interactive States

### Clickable Badges

```scss
// Default state
.ouiBadge-isClickable {
  cursor: pointer;
}

// Hover state
.ouiBadge-isClickable:hover {
  text-decoration: underline;
  transform: translateY(-1px);           // Subtle lift
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); // Gentle shadow
}

// Active/Pressed state
.ouiBadge-isClickable:active {
  transform: translateY(0);              // Reset position
  box-shadow: none;
}

// Focus state
.ouiBadge-isClickable:focus {
  outline: 2px solid $ouiFocusRingColor;
  outline-offset: 2px;
}
```

## Accessibility Considerations

### Contrast Requirements

All badge color combinations must meet WCAG 2.1 Level AA:
- **Normal text**: 4.5:1 contrast ratio
- **Focus indicators**: 3:1 contrast ratio

### Motion Sensitivity

```scss
@media (prefers-reduced-motion: reduce) {
  .ouiBadge,
  .ouiBadge-isClickable {
    transition: none;
    
    &:hover {
      transform: none;
    }
  }
}
```

### Keyboard Navigation

- Focus states clearly visible with outline
- Interactive badges fully keyboard accessible
- Icon buttons within badges keyboard accessible

## Testing Checklist

### Visual Testing

- [ ] Badge border radius is 6px (not 2px)
- [ ] Badge padding feels comfortable (not cramped)
- [ ] Badge height is appropriate (22px minimum)
- [ ] Font weight is semibold (600, not 500)
- [ ] Hollow badges use modern border color
- [ ] All badge colors use modern palette
- [ ] Badges align properly with text
- [ ] Icon spacing is consistent

### Interactive Testing

- [ ] Clickable badges show hover effect
- [ ] Hover includes subtle lift and shadow
- [ ] Active state resets transform
- [ ] Focus ring is visible and accessible
- [ ] Transitions are smooth (200ms)
- [ ] Reduced motion preference respected

### Accessibility Testing

- [ ] All badge colors meet WCAG AA contrast (4.5:1)
- [ ] Focus indicators meet 3:1 contrast
- [ ] Keyboard navigation works correctly
- [ ] Screen readers announce badge content
- [ ] Icon-only badges have aria-labels

### Cross-Theme Testing

- [ ] Light theme badges look modern
- [ ] Dark theme badges have good contrast
- [ ] Hollow badges work in both themes
- [ ] Color badges work in both themes
- [ ] Transitions work in both themes

### Regression Testing

- [ ] Badge groups still work correctly
- [ ] Beta badges still function
- [ ] Notification badges still function
- [ ] Badge truncation still works
- [ ] Icon badges still align properly
- [ ] Close button badges still work

## Migration Notes

### Backward Compatibility

✅ **No Breaking Changes**
- All existing badge props work unchanged
- Color API remains the same
- Component behavior unchanged
- Only visual appearance updated

### Automatic Benefits

Components using badges will automatically get:
- Modern border radius (6px)
- Better padding and spacing
- Improved font weight
- Smooth transitions
- Modern color palette

### Manual Updates (Optional)

For custom badge implementations:
- Update any hardcoded border-radius values
- Update any hardcoded padding values
- Update any hardcoded font-weight values
- Add transition properties if desired

## Examples

### Basic Badge

```tsx
<OuiBadge>Default</OuiBadge>
<OuiBadge color="primary">Primary</OuiBadge>
<OuiBadge color="success">Success</OuiBadge>
<OuiBadge color="warning">Warning</OuiBadge>
<OuiBadge color="danger">Danger</OuiBadge>
```

### Clickable Badge

```tsx
<OuiBadge
  onClick={() => console.log('clicked')}
  onClickAriaLabel="Click badge"
>
  Clickable
</OuiBadge>
```

### Badge with Icon

```tsx
<OuiBadge iconType="check">
  With Icon
</OuiBadge>

<OuiBadge
  iconType="cross"
  iconOnClick={() => console.log('remove')}
  iconOnClickAriaLabel="Remove badge"
>
  Removable
</OuiBadge>
```

### Hollow Badge

```tsx
<OuiBadge color="hollow">
  Hollow Badge
</OuiBadge>
```

## Summary

The badge modernization brings:

1. **Modern Appearance**: 6px border radius, better spacing
2. **Improved Typography**: Semibold weight (600) for better emphasis
3. **Smooth Interactions**: Transitions on all state changes
4. **Better Colors**: Automatic benefit from modern palette
5. **Enhanced Accessibility**: Proper contrast, motion sensitivity
6. **Backward Compatible**: No breaking changes

This modernization aligns badges with the overall v9 theme aesthetic while maintaining full backward compatibility.
