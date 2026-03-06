# SideNav Component Modernization Analysis

## Current State Analysis

The SideNav component has several areas that could be modernized to achieve a contemporary look and feel inspired by modern design systems like shadcn/ui, Linear, and GitHub.

### Current Design Characteristics

1. **No Border Radius**: Items are completely square with no rounded corners
2. **Underline-Based Selection**: Selected items use text-decoration underline
3. **Simple Vertical Lines**: Branch items use basic 1px borders for hierarchy
4. **Transparent Emphasized Background**: Uses `transparentize($ouiColorPrimary, .8)` which is very subtle
5. **No Hover States**: Limited visual feedback on hover
6. **No Active/Pressed States**: No visual indication when clicking
7. **Basic Typography**: Standard font weights without much hierarchy
8. **No Spacing Refinement**: Items are tightly packed

## Modern Design Principles for Navigation

Based on contemporary design systems, modern side navigation should have:

1. **Subtle Rounded Corners**: Soft border radius on interactive items (4-6px)
2. **Background-Based Selection**: Colored background instead of underline
3. **Smooth Hover States**: Gentle background color change on hover
4. **Active/Pressed Feedback**: Visual indication when clicking
5. **Better Spacing**: More breathing room between items
6. **Refined Typography**: Better font weight hierarchy
7. **Smooth Transitions**: Animated state changes
8. **Modern Indicators**: Pill-shaped or rounded selection indicators

## Proposed Modernization Changes

### 1. Add Border Radius to Interactive Items

**Current**:
```scss
.ouiSideNavItemButton {
  // No border radius
  padding: calc($ouiSizeXS / 2) 0;
}
```

**Modernized**:
```scss
.ouiSideNavItemButton {
  padding: $ouiSizeXS $ouiSizeS; // More padding
  border-radius: $ouiBorderRadiusSmall; // 6px rounded corners
  transition: $ouiTransitionFast; // Smooth transitions
  
  &.ouiSideNavItemButton--isClickable:not(:disabled) {
    &:hover {
      background-color: transparentize($ouiColorLightShade, 0.5);
      cursor: pointer;
    }
    
    &:active {
      background-color: transparentize($ouiColorLightShade, 0.3);
      transform: scale(0.98); // Subtle press effect
    }
  }
}
```

### 2. Modern Selection Indicator

**Current**:
```scss
&.ouiSideNavItemButton-isSelected {
  color: $ouiSideNavSelectedTextcolor;
  font-weight: $ouiFontWeightBold;
  
  .ouiSideNavItemButton__label {
    text-decoration: underline; // Old-school underline
  }
}
```

**Modernized Option A - Background Highlight**:
```scss
&.ouiSideNavItemButton-isSelected {
  background-color: transparentize($ouiColorPrimary, 0.9); // Subtle primary tint
  color: $ouiColorPrimary; // Primary color text
  font-weight: $ouiFontWeightSemiBold; // 600 weight
  
  // Add left border accent
  border-left: 3px solid $ouiColorPrimary;
  padding-left: calc($ouiSizeS - 3px); // Compensate for border
  
  .ouiSideNavItemButton__label {
    // Remove underline
  }
}
```

**Modernized Option B - Pill Style** (More modern):
```scss
&.ouiSideNavItemButton-isSelected {
  background-color: $ouiColorPrimary;
  color: $ouiColorGhost; // White text on primary background
  font-weight: $ouiFontWeightSemiBold;
  border-radius: $ouiBorderRadius; // 8px for more prominent pill
  
  .ouiSideNavItemButton__label {
    // No underline needed
  }
  
  // Ensure icon color matches
  .ouiSideNavItemButton__icon {
    color: inherit;
  }
}
```

**Modernized Option C - Subtle with Accent** (Recommended):
```scss
&.ouiSideNavItemButton-isSelected {
  background-color: transparentize($ouiColorPrimary, 0.92); // Very subtle
  color: $ouiColorPrimary;
  font-weight: $ouiFontWeightSemiBold;
  
  // Modern left accent bar
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 60%; // Doesn't span full height
    background-color: $ouiColorPrimary;
    border-radius: 0 2px 2px 0; // Rounded on right side
  }
  
  .ouiSideNavItemButton__label {
    // No underline
  }
}
```

### 3. Improved Hover States

**Add to all clickable items**:
```scss
.ouiSideNavItemButton--isClickable:not(:disabled) {
  &:hover {
    background-color: transparentize($ouiColorLightShade, 0.6);
    
    .ouiSideNavItemButton__label {
      // Remove underline on hover
      text-decoration: none;
    }
  }
  
  &:focus-visible {
    outline: 2px solid $ouiFocusRingColor;
    outline-offset: 2px;
    background-color: transparentize($ouiColorLightShade, 0.7);
  }
}
```

### 4. Better Spacing and Typography

**Current**:
```scss
.ouiSideNavItem--root {
  & > .ouiSideNavItemButton {
    margin-bottom: $ouiSizeS;
    padding: 0;
  }
  
  & + & {
    margin-top: $ouiSizeXL;
  }
}
```

**Modernized**:
```scss
.ouiSideNavItem--root {
  & > .ouiSideNavItemButton {
    margin-bottom: $ouiSizeM; // More space
    padding: $ouiSizeS; // Consistent padding
    
    .ouiSideNavItemButton__label {
      @include ouiTitle('xs');
      font-weight: $ouiFontWeightSemiBold; // 600 instead of 500
      letter-spacing: $ouiLetterSpacingTight; // Tighter for headings
    }
  }
  
  & + & {
    margin-top: $ouiSizeXXL; // Even more separation
  }
}
```

### 5. Modern Branch Indicators

**Current**:
```scss
.ouiSideNavItem--branch {
  &::after {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    width: 1px;
    background: $ouiBorderColor;
    left: 0;
  }
}
```

**Modernized**:
```scss
.ouiSideNavItem--branch {
  &::after {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    width: 2px; // Slightly thicker
    background: transparentize($ouiBorderColor, 0.5); // More subtle
    left: 0;
    border-radius: 1px; // Rounded line
  }
  
  // Fade out at the bottom
  &:last-of-type::after {
    height: $ouiSizeM;
    background: linear-gradient(
      to bottom,
      $ouiBorderColor,
      transparent
    );
  }
  
  & > .ouiSideNavItemButton {
    &:after {
      width: $ouiSizeS; // Longer tick
      height: 2px; // Thicker tick
      background: transparentize($ouiBorderColor, 0.5);
      border-radius: 1px;
    }
  }
}
```

### 6. Refined Emphasized State

**Current**:
```scss
.ouiSideNavItem--emphasized {
  background: $ouiSideNavEmphasizedBackgroundColor;
  box-shadow: 100px 0 0 0 $ouiSideNavEmphasizedBackgroundColor, 
              -100px 0 0 0 $ouiSideNavEmphasizedBackgroundColor;
}
```

**Modernized**:
```scss
.ouiSideNavItem--emphasized {
  background: transparentize($ouiColorPrimary, 0.95); // More subtle
  border-radius: $ouiBorderRadius; // Rounded container
  padding: $ouiSizeS;
  margin: 0 (-$ouiSizeS); // Negative margin to extend to edges
  
  // Modern shadow instead of box-shadow hack
  @include ouiBottomShadowSmall;
  
  > .ouiSideNavItemButton {
    font-weight: $ouiFontWeightSemiBold;
    
    &.ouiSideNavItemButton-isSelected {
      background-color: transparentize($ouiColorPrimary, 0.88);
    }
  }
}
```

### 7. Add Smooth Transitions

**Add to variables** (`_side_nav.scss`):
```scss
$ouiSideNavTransition: background-color $ouiAnimSpeedFast $ouiAnimEaseInOut,
                       color $ouiAnimSpeedFast $ouiAnimEaseInOut,
                       transform $ouiAnimSpeedFast $ouiAnimEaseInOut !default;
```

**Apply to items**:
```scss
.ouiSideNavItemButton {
  transition: $ouiSideNavTransition;
  
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}
```

### 8. Modern Mobile Toggle

**Current**:
```scss
.ouiSideNav__mobileToggle {
  border-bottom: $ouiBorderThin;
  border-radius: 0 !important;
}
```

**Modernized**:
```scss
.ouiSideNav__mobileToggle {
  border-bottom: $ouiBorderThin;
  border-radius: $ouiBorderRadius; // Add rounded corners
  background-color: transparentize($ouiColorLightShade, 0.7);
  transition: $ouiTransitionFast;
  
  &:hover {
    background-color: transparentize($ouiColorLightShade, 0.5);
  }
  
  &:active {
    background-color: transparentize($ouiColorLightShade, 0.3);
  }
}
```

## Visual Comparison

### Current Design
```
┌─────────────────────────┐
│ Root Item               │ ← No background, no radius
│   ├─ Branch Item        │ ← Underline when selected
│   ├─ Branch Item        │
│   └─ Branch Item        │
│                         │
│ Root Item               │
│   ├─ Branch Item        │
│   └─ Branch Item        │
└─────────────────────────┘
```

### Modernized Design (Option C - Recommended)
```
╭─────────────────────────╮
│ Root Item               │ ← Rounded corners
│   ╭─ Branch Item ◄──────┤ ← Subtle background + accent bar
│   ├─ Branch Item        │ ← Hover background
│   ╰─ Branch Item        │
│                         │
│ Root Item               │
│   ╭─ Branch Item        │
│   ╰─ Branch Item        │
╰─────────────────────────╯
```

## Implementation Priority

### High Priority (Core Modernization)
1. ✅ Add border radius to items (6px)
2. ✅ Replace underline with background-based selection
3. ✅ Add hover states with background color
4. ✅ Add smooth transitions
5. ✅ Improve spacing between items

### Medium Priority (Polish)
6. ✅ Add left accent bar for selected items
7. ✅ Refine branch indicators (thicker, rounded)
8. ✅ Update emphasized state styling
9. ✅ Add active/pressed states

### Low Priority (Nice to Have)
10. ⚪ Add subtle animations on expand/collapse
11. ⚪ Add icon color transitions
12. ⚪ Add keyboard navigation indicators

## Variables to Add/Update

### New Variables
```scss
// Spacing
$ouiSideNavItemPadding: $ouiSizeS !default;
$ouiSideNavItemBorderRadius: $ouiBorderRadiusSmall !default;
$ouiSideNavItemSpacing: $ouiSizeM !default;

// Selection
$ouiSideNavSelectedBackground: transparentize($ouiColorPrimary, 0.92) !default;
$ouiSideNavSelectedAccentWidth: 3px !default;
$ouiSideNavSelectedAccentHeight: 60% !default;

// Hover
$ouiSideNavHoverBackground: transparentize($ouiColorLightShade, 0.6) !default;
$ouiSideNavActiveBackground: transparentize($ouiColorLightShade, 0.3) !default;

// Transitions
$ouiSideNavTransition: background-color $ouiAnimSpeedFast $ouiAnimEaseInOut,
                       color $ouiAnimSpeedFast $ouiAnimEaseInOut,
                       transform $ouiAnimSpeedFast $ouiAnimEaseInOut !default;

// Branch indicators
$ouiSideNavBranchLineWidth: 2px !default;
$ouiSideNavBranchLineColor: transparentize($ouiBorderColor, 0.5) !default;
$ouiSideNavBranchTickWidth: $ouiSizeS !default;
$ouiSideNavBranchTickHeight: 2px !default;
```

### Updated Variables
```scss
// Update emphasized background to be more subtle
$ouiSideNavEmphasizedBackgroundColor: transparentize($ouiColorPrimary, 0.95) !default; // was .8
```

## Files to Modify

1. **`src/themes/v9/global_styling/variables/_side_nav.scss`**
   - Add new variables
   - Update emphasized background color

2. **`src/components/side_nav/_side_nav_item.scss`**
   - Add border radius to items
   - Replace underline with background selection
   - Add hover/active states
   - Add left accent bar for selected items
   - Update spacing and padding
   - Add transitions

3. **`src/components/side_nav/_side_nav.scss`**
   - Update mobile toggle styling
   - Refine spacing

4. **`src/components/side_nav/_mixins.scss`**
   - Update embellish mixin if needed

## Dark Theme Considerations

For dark theme, ensure:
- Hover backgrounds are lighter (not darker)
- Selected backgrounds have sufficient contrast
- Accent bars remain visible
- Branch indicators are visible but subtle

```scss
// Dark theme adjustments
$ouiSideNavHoverBackground: transparentize($ouiColorLightShade, 0.85) !default;
$ouiSideNavSelectedBackground: transparentize($ouiColorPrimary, 0.85) !default;
```

## Accessibility Checklist

- [ ] Selected items have 3:1 contrast ratio (focus indicators)
- [ ] Hover states are visible
- [ ] Focus states are clear and distinct
- [ ] Keyboard navigation works smoothly
- [ ] Screen readers announce selection state
- [ ] Transitions respect prefers-reduced-motion
- [ ] Touch targets are at least 44x44px

## Testing Checklist

- [ ] Items have rounded corners
- [ ] Selected items show background + accent bar (no underline)
- [ ] Hover states work smoothly
- [ ] Active/pressed states provide feedback
- [ ] Transitions are smooth
- [ ] Branch indicators are visible and modern
- [ ] Emphasized items have subtle background
- [ ] Mobile toggle has rounded corners
- [ ] Dark theme looks good
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility maintained

## References

- [Linear App Navigation](https://linear.app/) - Modern side nav with subtle selection
- [GitHub Navigation](https://github.com/) - Clean, minimal side nav
- [Vercel Dashboard](https://vercel.com/) - Pill-style selection
- [shadcn/ui Sidebar](https://ui.shadcn.com/) - Modern navigation patterns
