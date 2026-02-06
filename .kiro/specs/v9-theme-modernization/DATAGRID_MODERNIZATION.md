# DataGrid Modernization for V9 Theme

## Overview

This document outlines the modernization approach for the OuiDataGrid component in the v9 theme. The goal is to create a cleaner, more modern table aesthetic while maintaining full backward compatibility with other themes.

## Current State Analysis

From the screenshot, the current DataGrid has:
- Sharp corners (no border radius)
- Standard borders between cells
- Basic hover states
- Traditional table styling
- Minimal visual hierarchy

## Modernization Goals

1. **Softer Appearance**: Add subtle border radius to the container
2. **Enhanced Visual Hierarchy**: Improve header distinction with modern styling
3. **Better Cell Spacing**: Optimize padding and spacing for readability
4. **Modern Borders**: Use softer, more subtle borders
5. **Improved Hover States**: Add smooth transitions and better visual feedback
6. **Striping Enhancement**: Modernize row striping with subtle backgrounds
7. **Focus States**: Improve focus indicators with modern styling

## Design Decisions

### Option A: Minimal Modernization (RECOMMENDED)
- Add border radius to outer container only (8px)
- Enhance header with subtle background and better typography
- Improve cell padding and spacing
- Add smooth hover transitions
- Keep internal cell borders minimal

**Benefits:**
- Clean, modern look
- Maintains data density
- Easy to scan
- Professional appearance
- Minimal disruption to existing layouts

### Option B: Maximum Modernization
- Add border radius to container and individual cells
- Remove all internal borders
- Add shadows to rows on hover
- Larger padding throughout

**Drawbacks:**
- Reduces data density
- May feel too "card-like" for a data table
- Could impact usability for dense data

**Recommendation: Option A** - Provides modern aesthetics while preserving the functional nature of data tables.

## Visual Specifications

### Container
- **Border Radius**: 8px on outer container (`$ouiBorderRadius`)
- **Border**: 1px solid with modern color
- **Background**: Clean white/dark background
- **Shadow**: Subtle elevation shadow

### Header
- **Background**: Subtle shade (`transparentize($ouiColorLightShade, 0.5)`)
- **Border Bottom**: 2px solid for emphasis
- **Font Weight**: Semibold (600)
- **Padding**: Slightly increased for breathing room
- **Hover**: Subtle background change on sortable columns

### Cells
- **Padding**: Optimized spacing (8px vertical, 12px horizontal)
- **Borders**: Softer, more subtle borders
- **Background**: Clean, with subtle striping option
- **Hover**: Smooth background transition

### Row Hover
- **Background**: Subtle highlight color
- **Transition**: Smooth 150ms ease
- **Shadow**: Optional subtle shadow for elevation

### Striping
- **Background**: Very subtle (`transparentize($ouiColorLightShade, 0.7)`)
- **Alternating**: Every other row
- **Hover Override**: Hover state takes precedence

### Focus States
- **Border**: 2px solid primary color
- **Shadow**: Focus ring with primary color
- **Border Radius**: 2px for cells
- **Z-index**: Elevated above other cells

## Implementation Details

### New Variables (v9 theme only)

```scss
// Container
$ouiDataGridBorderRadius: $ouiBorderRadius; // 8px
$ouiDataGridBorder: 1px solid $ouiBorderColor;
$ouiDataGridShadow: 0 1px 3px 0 rgba($ouiShadowColor, 0.1), 0 1px 2px 0 rgba($ouiShadowColor, 0.06);

// Header
$ouiDataGridHeaderBackground: transparentize($ouiColorLightShade, 0.5);
$ouiDataGridHeaderBorderBottom: 2px solid $ouiBorderColor;
$ouiDataGridHeaderFontWeight: $ouiFontWeightSemiBold; // 600
$ouiDataGridHeaderPadding: $ouiSizeS $ouiSizeM; // 8px 12px
$ouiDataGridHeaderHoverBackground: transparentize($ouiColorLightShade, 0.3);

// Cells
$ouiDataGridCellPadding: $ouiSizeS $ouiSizeM; // 8px 12px
$ouiDataGridCellBorder: 1px solid transparentize($ouiBorderColor, 0.5);
$ouiDataGridCellHoverBackground: transparentize($ouiColorHighlight, 0.3);
$ouiDataGridCellTransition: background-color $ouiAnimSpeedFast $ouiAnimEaseInOut;

// Row Striping
$ouiDataGridStripeBackground: transparentize($ouiColorLightShade, 0.7);

// Focus
$ouiDataGridCellFocusBorder: 2px solid $ouiColorPrimary;
$ouiDataGridCellFocusShadow: 0 0 0 2px transparentize($ouiColorPrimary, 0.8);
$ouiDataGridCellFocusBorderRadius: 2px;
```

### Dark Theme Adjustments

For dark theme, adjust:
- Header background: `transparentize($ouiColorLightShade, 0.6)`
- Cell borders: More visible (`transparentize($ouiBorderColor, 0.3)`)
- Hover background: Lighter for visibility
- Stripe background: `transparentize($ouiColorLightShade, 0.8)`
- Shadow: Stronger for elevation (`rgba($ouiShadowColor, 0.3)`)

## Component Changes

### 1. Container Styling
**File**: `src/components/datagrid/_data_grid.scss`

Add v9-specific styling:
```scss
// V9 theme modernization
@if (variable-exists(ouiDataGridBorderRadius)) {
  .ouiDataGrid__content {
    border-radius: $ouiDataGridBorderRadius;
    box-shadow: $ouiDataGridShadow;
    overflow: hidden; // Clip child elements to border radius
  }
}
```

### 2. Header Modernization
**File**: `src/components/datagrid/_data_grid_header_row.scss`

Add v9-specific styling:
```scss
// V9 theme modernization
@if (variable-exists(ouiDataGridHeaderBackground)) {
  .ouiDataGridHeader {
    background: $ouiDataGridHeaderBackground;
  }
  
  @include ouiDataGridHeaderCell {
    font-weight: $ouiDataGridHeaderFontWeight;
    padding: $ouiDataGridHeaderPadding;
    border-bottom: $ouiDataGridHeaderBorderBottom;
    
    .ouiDataGridHeaderCell__button:hover {
      background: $ouiDataGridHeaderHoverBackground;
      border-radius: $ouiBorderRadiusSmall;
      transition: background-color $ouiAnimSpeedFast $ouiAnimEaseInOut;
    }
  }
}
```

### 3. Cell Modernization
**File**: `src/components/datagrid/_data_grid_data_row.scss`

Add v9-specific styling:
```scss
// V9 theme modernization
@if (variable-exists(ouiDataGridCellPadding)) {
  @include ouiDataGridRowCell {
    padding: $ouiDataGridCellPadding;
    border-right: $ouiDataGridCellBorder;
    border-bottom: $ouiDataGridCellBorder;
    transition: $ouiDataGridCellTransition;
    
    &:focus {
      border: $ouiDataGridCellFocusBorder;
      box-shadow: $ouiDataGridCellFocusShadow;
      border-radius: $ouiDataGridCellFocusBorderRadius;
    }
  }
  
  // Row hover
  @include ouiDataGridStyles(rowHoverHighlight) {
    .ouiDataGridRow:hover {
      @include ouiDataGridRowCell {
        background-color: $ouiDataGridCellHoverBackground !important;
      }
    }
  }
  
  // Striping
  @include ouiDataGridStyles(stripes) {
    @include ouiDataGridRowCell {
      &.ouiDataGridRowCell--stripe {
        background: $ouiDataGridStripeBackground;
      }
    }
  }
  
  // Reduced motion
  @media (prefers-reduced-motion: reduce) {
    @include ouiDataGridRowCell {
      transition: none;
    }
  }
}
```

### 4. Control Buttons
**File**: `src/components/datagrid/_data_grid.scss`

Enhance control buttons:
```scss
@if (variable-exists(ouiDataGridBorderRadius)) {
  .ouiDataGrid__controlBtn {
    transition: background-color $ouiAnimSpeedFast $ouiAnimEaseInOut,
                border-color $ouiAnimSpeedFast $ouiAnimEaseInOut;
    
    &:hover {
      background: transparentize($ouiColorLightShade, 0.5);
    }
  }
}
```

## Backward Compatibility

All changes are scoped to v9 theme only using:
```scss
@if (variable-exists(ouiDataGridBorderRadius)) {
  // V9-specific styles
}
```

This ensures:
- Other themes remain unchanged
- No breaking changes
- Variables are optional
- Graceful degradation

## Accessibility Considerations

1. **Focus Indicators**: Enhanced focus states with 2px borders and shadows
2. **Color Contrast**: All colors meet WCAG 2.1 Level AA standards
3. **Reduced Motion**: Transitions disabled when `prefers-reduced-motion` is set
4. **Touch Targets**: Maintain minimum 44x44px touch targets
5. **Keyboard Navigation**: Focus states clearly visible

## Testing Requirements

### Visual Tests
- [ ] Container has 8px border radius
- [ ] Header has subtle background and semibold text
- [ ] Cells have optimized padding (8px x 12px)
- [ ] Row hover shows smooth transition
- [ ] Striping uses subtle background
- [ ] Focus states are clearly visible
- [ ] Dark theme adjustments work correctly

### Functional Tests
- [ ] Sorting still works with new header styling
- [ ] Cell expansion works with new padding
- [ ] Column resizing works with new borders
- [ ] Pagination works with new container styling
- [ ] Fullscreen mode works correctly
- [ ] All grid styles (borders, padding, fonts) still work

### Accessibility Tests
- [ ] Focus indicators meet WCAG standards
- [ ] Color contrast ratios are compliant
- [ ] Keyboard navigation works correctly
- [ ] Screen readers announce correctly
- [ ] Reduced motion is respected

## Migration Notes

For developers using DataGrid:
- No API changes required
- Styling changes are automatic in v9 theme
- Custom cell renderers may need padding adjustments
- Custom styles should use new variables when available

## Visual Comparison

### Before (Current)
- Sharp corners
- Standard borders
- Basic hover
- Traditional table look

### After (Modernized)
- Rounded container (8px)
- Subtle borders
- Smooth transitions
- Modern, clean aesthetic
- Better visual hierarchy
- Enhanced readability

## Benefits Summary

1. **Modern Aesthetic**: Aligns with contemporary design trends
2. **Better Readability**: Improved spacing and hierarchy
3. **Enhanced UX**: Smooth transitions and better feedback
4. **Accessibility**: Improved focus states and contrast
5. **Backward Compatible**: No breaking changes
6. **Theme-Specific**: Only affects v9 theme
7. **Professional**: Suitable for enterprise applications

## Implementation Priority

1. **High Priority** (Core modernization):
   - Container border radius and shadow
   - Header background and typography
   - Cell padding optimization
   - Basic hover transitions

2. **Medium Priority** (Enhancements):
   - Striping improvements
   - Focus state refinements
   - Dark theme adjustments

3. **Low Priority** (Polish):
   - Control button transitions
   - Additional hover effects
   - Fine-tuning animations
