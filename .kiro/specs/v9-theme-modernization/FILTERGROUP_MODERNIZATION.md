# FilterGroup Component Modernization

## Current State Analysis

### Visual Characteristics
Based on the screenshot and code analysis:
- **Border Radius**: None (sharp corners)
- **Borders**: 1px solid borders between buttons, right border on group
- **Shadow**: Basic shadow (0 1px 2px -1px, 0 3px 3px -2px with 80% transparency)
- **Button Height**: Standard form control height (32px)
- **Selected State**: Light gray background (`$ouiColorLightestShade`)
- **Notification Badge**: Pill-shaped badge showing filter count
- **Spacing**: Buttons are connected with no gaps

### Current Implementation
```scss
.ouiFilterGroup {
  display: inline-flex;
  max-width: 100%;
  border-right: 1px solid $ouiFormBorderColor;
  box-shadow: 0 1px 2px -1px transparentize($ouiShadowColor, .8), 
              0 3px 3px -2px transparentize($ouiShadowColor, .8);
  overflow: hidden;
}

.ouiFilterButton {
  background-color: $ouiFormBackgroundColor;
  height: $ouiFormControlHeight;
  border: 1px solid $ouiFormBorderColor;
  border-right: none;
  font-size: $ouiFontSizeS;
}

.ouiFilterButton-isSelected {
  background-color: $ouiColorLightestShade;
}
```

## Problems with Current Design

1. **No Border Radius**: Sharp corners look dated
2. **Flat Appearance**: Lacks modern depth and elevation
3. **Basic Selected State**: Simple background change without modern feedback
4. **No Transitions**: State changes are abrupt
5. **Connected Buttons**: No visual separation between filter buttons
6. **Basic Shadow**: Weak shadow doesn't provide enough elevation

## Modern Design Inspiration

### shadcn/ui Filter Pattern
- Rounded corners on group container
- Individual button separation with gaps
- Subtle shadows for elevation
- Clear selected state with accent color
- Smooth transitions

### Other Modern Patterns
- **Linear**: Separated buttons with rounded corners, subtle backgrounds
- **GitHub**: Clear visual separation, modern spacing
- **Vercel**: Minimal borders, focus on content, subtle shadows

## Modernization Recommendations

### Option B: Connected with Rounded Ends (Recommended)
**Visual Style**: Evolution of current design
- **Border Radius**: 8px on first and last buttons only
- **Button Separation**: No gaps (connected)
- **Borders**: Maintain current border pattern (border-right: none on middle buttons)
- **Selected State**: Primary color background with white text
- **Shadow**: Improved elevation on group container
- **Transitions**: Smooth state changes
- **Notification Badge**: Modernized with 6px radius

**Pros**:
- Familiar pattern, modernized
- Compact horizontal space
- Clean, connected appearance
- Easier migration

**Cons**:
- Less modern than separated buttons
- Slightly harder to distinguish individual buttons

### Option A: Separated Buttons with Gaps
**Visual Style**: Modern, clean, clear separation
- **Border Radius**: 8px on group container, 6px on individual buttons
- **Button Separation**: 4px gap between buttons
- **Borders**: 1px solid subtle border on each button
- **Selected State**: Primary color background with white text
- **Shadow**: Subtle elevation on group container
- **Transitions**: Smooth state changes
- **Notification Badge**: Modernized with 6px radius

**Pros**:
- Modern, contemporary appearance
- Clear visual separation
- Better touch targets
- Aligns with shadcn/ui aesthetic

**Cons**:
- Slightly more complex layout
- Takes up slightly more horizontal space
- User feedback: doesn't look as good as connected style

### Option C: Pill-Shaped Group (Bold)
**Visual Style**: Bold, modern, distinctive
- **Border Radius**: 20px on group container (pill shape)
- **Button Separation**: No gaps
- **Borders**: Minimal or none
- **Selected State**: Strong accent color
- **Shadow**: Prominent elevation

**Pros**:
- Very modern and distinctive
- Strong visual identity

**Cons**:
- May be too bold for some contexts
- Significant departure from current design

## Recommended Approach: Option B (Connected with Rounded Ends)

### Visual Specifications

#### Group Container
```scss
.ouiFilterGroup {
  display: inline-flex;
  max-width: 100%;
  border-radius: $ouiBorderRadius;                  // 8px rounded container
  box-shadow: 0 1px 3px 0 rgba($ouiShadowColor, 0.1),
              0 1px 2px 0 rgba($ouiShadowColor, 0.06); // Modern shadow
  overflow: hidden;                                 // Clip to rounded corners
}
```

#### Filter Buttons
```scss
.ouiFilterButton {
  background-color: $ouiFormBackgroundColor;
  height: $ouiFormControlHeight;                    // 32px
  border: 1px solid $ouiFormBorderColor;
  border-right: none;                               // Connected buttons
  font-size: $ouiFontSizeS;
  transition: all $ouiAnimSpeedFast $ouiAnimEaseInOut;
  
  // First button gets left border radius
  &:first-child {
    border-radius: $ouiBorderRadius 0 0 $ouiBorderRadius; // 8px left
  }
  
  // Last button gets right border radius and full border
  &:last-child {
    border-radius: 0 $ouiBorderRadius $ouiBorderRadius 0; // 8px right
    border-right: 1px solid $ouiFormBorderColor;
  }
  
  // Single button gets full border radius
  &:only-child {
    border-radius: $ouiBorderRadius;
    border-right: 1px solid $ouiFormBorderColor;
  }
  
  &:hover:not(:disabled) {
    background-color: $ouiColorLightestShade;
    border-color: $ouiColorMediumShade;
    z-index: 1;                                     // Lift above siblings
    
    // Keep underline on text only
    text-decoration: none;
    .ouiFilterButton__textShift {
      text-decoration: underline;
    }
  }
  
  &:active:not(:disabled) {
    background-color: darken($ouiColorLightestShade, 3%);
  }
}
```

#### Selected State
```scss
.ouiFilterButton-isSelected {
  background-color: $ouiColorPrimary;               // Primary color background
  border-color: $ouiColorPrimary;
  color: $ouiColorEmptyShade;                       // White text
  font-weight: $ouiFontWeightSemiBold;              // 600 weight
  z-index: 2;                                       // Lift above siblings
  
  &:hover:not(:disabled) {
    background-color: darken($ouiColorPrimary, 5%);
    border-color: darken($ouiColorPrimary, 5%);
  }
  
  .ouiFilterButton__notification {
    background-color: $ouiColorEmptyShade;          // White badge
    color: $ouiColorPrimary;                        // Primary text
  }
}
```

#### Active Filters State
```scss
.ouiFilterButton-hasActiveFilters:not(.ouiFilterButton-isSelected) {
  font-weight: $ouiFontWeightSemiBold;              // 600 weight
  border-color: $ouiColorPrimary;                   // Primary border
  z-index: 1;                                       // Lift above siblings
  
  &:hover:not(:disabled) {
    border-color: darken($ouiColorPrimary, 5%);
  }
  
  .ouiFilterButton__notification {
    background-color: $ouiColorPrimary;
    color: $ouiColorEmptyShade;
  }
}
```

#### Notification Badge
```scss
.ouiFilterButton__notification {
  margin-left: $ouiSizeS;
  border-radius: $ouiBorderRadiusSmall;             // 6px (was pill)
  transition: all $ouiAnimSpeedFast $ouiAnimEaseInOut;
}
```

#### Reduced Motion
```scss
@media (prefers-reduced-motion: reduce) {
  .ouiFilterButton {
    transition: none;
  }
  
  .ouiFilterButton__notification {
    transition: none;
  }
}
```

### Dark Theme Adjustments
```scss
@if (lightness($ouiPageBackgroundColor) < 50) {
  .ouiFilterGroup {
    box-shadow: 0 1px 3px 0 rgba($ouiShadowColor, 0.2),
                0 1px 2px 0 rgba($ouiShadowColor, 0.12);
  }
  
  .ouiFilterButton {
    background-color: $ouiFormBackgroundColor;      // Use form background
    
    &:hover:not(:disabled) {
      background-color: $ouiColorLightestShade;
    }
  }
}
```

## Implementation Details

### Files to Modify

1. **src/components/filter_group/_filter_group.scss**
   - Add border-radius to container
   - Improve box-shadow
   - Keep overflow: hidden (for rounded corners)

2. **src/components/filter_group/_filter_button.scss**
   - Add border-radius to first/last/only buttons
   - Keep border-right: none for connected appearance
   - Add transitions
   - Update selected state styling
   - Add hover effects with z-index
   - Update active filters state
   - Add reduced motion support

3. **src/themes/v9/global_styling/variables/_filter_group.scss** (new file)
   - Add filter group-specific variables
   - Define container border radius
   - Define transition properties
   - Add transitions
   - Update selected state styling
   - Add hover effects with transform
   - Update active filters state
   - Add reduced motion support

3. **src/themes/v9/global_styling/variables/_filter_group.scss** (new file)
   - Add filter group-specific variables
   - Define gap spacing
   - Define container padding
   - Define transition properties

### New Variables

Create `src/themes/v9/global_styling/variables/_filter_group.scss`:
```scss
// FilterGroup styling
$ouiFilterGroupBorderRadius: $ouiBorderRadius !default;       // 8px container radius

// FilterButton styling
$ouiFilterButtonTransition: all $ouiAnimSpeedFast $ouiAnimEaseInOut !default;

// FilterButton selected state
$ouiFilterButtonSelectedBackground: $ouiColorPrimary !default;
$ouiFilterButtonSelectedColor: $ouiColorEmptyShade !default;
$ouiFilterButtonSelectedBorder: $ouiColorPrimary !default;

// EUI Aliases
$euiFilterGroupBorderRadius: $ouiFilterGroupBorderRadius;
$euiFilterButtonTransition: $ouiFilterButtonTransition;
$euiFilterButtonSelectedBackground: $ouiFilterButtonSelectedBackground;
$euiFilterButtonSelectedColor: $ouiFilterButtonSelectedColor;
$euiFilterButtonSelectedBorder: $ouiFilterButtonSelectedBorder;
```

### Backward Compatibility

All changes are purely visual (CSS-only):
- No component API changes
- No prop changes
- No breaking changes to existing usage
- All existing filter groups will automatically get new styling

### Accessibility Considerations

1. **Color Contrast**: Ensure WCAG 2.1 Level AA compliance
   - Selected state: White text on primary background (verify 4.5:1 ratio)
   - Notification badges: Verify contrast in all states

2. **Focus States**: Maintain clear focus indicators
   - Ensure focus ring is visible on all buttons
   - Focus ring should have 3:1 contrast with background

3. **Touch Targets**: Maintain minimum 44x44px touch targets
   - Current height (32px) + padding should meet requirements
   - Gap between buttons improves touch accuracy

4. **Reduced Motion**: Respect `prefers-reduced-motion`
   - Disable transform animations
   - Disable transition effects

### Testing Checklist

- [ ] All filter button states render correctly (default, hover, active, selected, disabled)
- [ ] Notification badges display correctly in all states
- [ ] Gap spacing between buttons is consistent
- [ ] Border radius is applied correctly to container and buttons
- [ ] Shadows provide appropriate elevation
- [ ] Transitions are smooth and performant
- [ ] Dark theme colors have sufficient contrast
- [ ] Light theme colors have sufficient contrast
- [ ] Focus states are clearly visible
- [ ] Touch targets meet 44x44px minimum
- [ ] Reduced motion preference is respected
- [ ] Responsive behavior works on small screens
- [ ] Full-width variant works correctly

## Visual Comparison

### Before (Current)
```
┌────────────────────────────────────────────────┐
│ Filter │ On │ Off │ Composers 2 ▼ │ Filter... │
└────────────────────────────────────────────────┘
```
- Sharp corners
- Connected buttons
- Flat appearance
- Basic shadow

### After (Modernized - Connected Style)
```
╭────────────────────────────────────────────────╮
│ Filter │ On │ Off │ Composers 2 ▼ │ Filter... │
╰────────────────────────────────────────────────╯
```
- 8px rounded corners on container
- Connected buttons (maintained)
- Modern shadow elevation
- Smooth transitions
- Primary color selected state
- Better hover feedback

## Benefits Summary

1. **Modern Appearance**: Rounded corners on container align with contemporary design
2. **Familiar Pattern**: Maintains connected button style (user preference)
3. **Enhanced Feedback**: Hover effects with z-index layering
4. **Improved Selected State**: Primary color background with white text
5. **Smooth Interactions**: Transitions on all state changes
6. **Compact Layout**: No gaps means efficient use of horizontal space
7. **Accessibility**: Maintains WCAG AA compliance, respects reduced motion
8. **Consistent Design**: Aligns with other modernized components (Badge, CallOut, SideNav)
9. **Easy Migration**: Minimal changes to existing structure
10. **Better Elevation**: Modern layered shadow provides depth

## Migration Notes

No migration required - all changes are automatic when the v9 theme is applied.

## Related Documentation

- [BADGE_MODERNIZATION.md](./BADGE_MODERNIZATION.md) - Similar notification badge updates
- [CALLOUT_MODERNIZATION.md](./CALLOUT_MODERNIZATION.md) - Similar border and shadow patterns
- [COLOR_MODERNIZATION.md](./COLOR_MODERNIZATION.md) - Modern color palette
