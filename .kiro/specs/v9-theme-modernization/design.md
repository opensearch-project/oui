# Design Document: V9 Theme Modernization

## Overview

This design document outlines the modernization of the OpenSearch UI (OUI) v9 theme to achieve a contemporary, shadcn-like aesthetic. The modernization focuses on updating design tokens and component variables within the existing SCSS architecture to create a cleaner, more professional look without requiring a full migration or breaking changes.

### Goals

1. **Modern Aesthetic**: Update visual design to align with contemporary UI trends (shadcn/ui style)
2. **Minimal Disruption**: Achieve modernization through variable updates, not architectural changes
3. **Backward Compatibility**: Maintain existing variable names and component functionality
4. **Accessibility**: Meet or exceed WCAG 2.1 Level AA standards
5. **Theme Consistency**: Apply changes uniformly across light and dark themes

### Non-Goals

- Complete theme architecture redesign
- Migration to CSS-in-JS or other styling paradigms
- Breaking changes to component APIs
- New component creation

## Architecture

### Current V9 Theme Structure

The v9 theme is organized as follows:

```
src/themes/v9/
├── v9_colors_light.scss          # Light theme color overrides (currently empty)
├── v9_colors_dark.scss           # Dark theme color definitions
├── v9_globals.scss               # Global styling imports
└── global_styling/
    ├── variables/                # Design token definitions
    │   ├── _borders.scss         # Border radius, widths, colors
    │   ├── _typography.scss      # Font families, sizes, weights
    │   ├── _size.scss            # Spacing scale
    │   ├── _buttons.scss         # Button-specific variables
    │   ├── _form.scss            # Form control variables
    │   └── ...                   # Other component variables
    ├── mixins/
    │   ├── _shadow.scss          # Shadow generation mixins
    │   └── ...                   # Other mixins
    ├── functions/                # SASS utility functions
    ├── css_variables/            # CSS custom properties
    └── utility/                  # Utility classes
```

### Modernization Strategy

The modernization will be achieved through a **token-first approach**:

1. **Update Core Design Tokens**: Modify base variables in `variables/` directory
2. **Refine Shadow System**: Update shadow mixins for modern depth perception
3. **Enhance Component Variables**: Update component-specific variables to use new tokens
4. **Maintain Aliases**: Keep EUI aliases for backward compatibility
5. **Dual Theme Support**: Apply changes to both light and dark themes

This approach ensures that all components automatically inherit the modern aesthetic through the updated token system.

## Components and Interfaces

### 1. Border Radius System

**Current Implementation** (`_borders.scss`):
```scss
$ouiBorderRadius: 4px;
$ouiBorderRadiusSmall: calc($ouiBorderRadius / 2); // 2px
```

**Modernized Implementation**:
```scss
// Base border radius values - modernized for contemporary look
$ouiBorderRadius: 8px;                              // Default: 0.5rem equivalent
$ouiBorderRadiusSmall: 6px;                         // Small: 0.375rem equivalent
$ouiBorderRadiusLarge: 12px;                        // Large: 0.75rem equivalent

// Maintain backward compatibility
$ouiBorderRadiusSmall: $ouiBorderRadiusSmall;       // Override calculated value
```

**Component Applications**:
- Buttons: Use `$ouiBorderRadius` (8px)
- Form inputs: Use `$ouiBorderRadius` (8px)
- Panels/Cards: Use `$ouiBorderRadius` (8px)
- Modals/Popovers: Use `$ouiBorderRadiusLarge` (12px)
- Checkboxes: Use `$ouiBorderRadiusSmall` (6px)

### 2. Shadow System

**Current Implementation** (`mixins/_shadow.scss`):
The current system uses multiple shadow mixins with relatively high opacity values:
- `ouiSlightShadow`: opacity 0.3
- `ouiBottomShadowSmall`: opacity 0.3
- `ouiBottomShadowMedium`: opacity 0.2
- `ouiBottomShadow`: opacity 0.1
- `ouiBottomShadowLarge`: opacity 0.1

**Modernized Implementation**:

Create softer, more layered shadows with reduced opacity and increased blur:

```scss
// Extra Small Shadow - Subtle elevation for hover states
@mixin ouiSlightShadow($color: $ouiShadowColor, $opacity: .08) {
  box-shadow: 
    0 1px 2px 0 rgba($color, $opacity),
    0 1px 3px 0 rgba($color, calc($opacity * 0.5));
}

// Small Shadow - Gentle depth for dropdowns and tooltips
@mixin ouiBottomShadowSmall($color: $ouiShadowColor, $opacity: .1) {
  box-shadow:
    0 2px 4px -1px rgba($color, calc($opacity * 0.6)),
    0 4px 6px -1px rgba($color, calc($opacity * 0.4));
}

// Medium Shadow - Moderate elevation for cards and panels
@mixin ouiBottomShadowMedium($color: $ouiShadowColor, $opacity: .12) {
  box-shadow:
    0 4px 6px -2px rgba($color, calc($opacity * 0.5)),
    0 8px 12px -4px rgba($color, calc($opacity * 0.4)),
    0 12px 16px -4px rgba($color, calc($opacity * 0.3));
}

// Large Shadow - Prominent depth for modals and dialogs
@mixin ouiBottomShadow($color: $ouiShadowColorLarge, $opacity: .15, $adjustBorders: false) {
  box-shadow:
    0 8px 16px -4px rgba($color, calc($opacity * 0.5)),
    0 12px 24px -6px rgba($color, calc($opacity * 0.4)),
    0 16px 32px -8px rgba($color, calc($opacity * 0.3));

  @if ($adjustBorders and not (lightness($ouiBorderColor) < 50)) {
    border-color: tint($color, 85%);
    border-top-color: tint($color, 90%);
    border-bottom-color: tint($color, 75%);
  }
}

// Extra Large Shadow - Maximum elevation for overlays
@mixin ouiBottomShadowLarge(
  $color: $ouiShadowColorLarge,
  $opacity: .18,
  $adjustBorders: false,
  $reverse: false
) {
  @if ($reverse) {
    box-shadow:
      0 -20px 32px -8px rgba($color, calc($opacity * 0.4)),
      0 -32px 48px -12px rgba($color, calc($opacity * 0.3)),
      0 -40px 64px -16px rgba($color, calc($opacity * 0.2));
  } @else {
    box-shadow:
      0 12px 24px -6px rgba($color, calc($opacity * 0.5)),
      0 20px 32px -8px rgba($color, calc($opacity * 0.4)),
      0 32px 48px -12px rgba($color, calc($opacity * 0.3)),
      0 40px 64px -16px rgba($color, calc($opacity * 0.2));
  }

  @if ($adjustBorders and not (lightness($ouiBorderColor) < 50)) {
    border-color: tint($color, 80%);
    border-top-color: tint($color, 90%);
    border-bottom-color: tint($color, 70%);
  }
}

// Hover Shadow - Enhanced elevation on interaction
@mixin ouiSlightShadowHover($color: $ouiShadowColor, $opacity: .12) {
  box-shadow:
    0 2px 4px 0 rgba($color, calc($opacity * 0.5)),
    0 4px 8px -2px rgba($color, calc($opacity * 0.6));
}

// Active/Pressed Shadow - Inset shadow for pressed state
@mixin ouiSlightShadowActive($color: $ouiShadowColor, $opacity: .08) {
  box-shadow: inset 0 2px 4px rgba($color, $opacity);
}
```

**Shadow Usage Guidelines**:
- Hover states: `ouiSlightShadow` → `ouiSlightShadowHover`
- Dropdowns/Tooltips: `ouiBottomShadowSmall`
- Cards/Panels: `ouiBottomShadowMedium`
- Modals/Dialogs: `ouiBottomShadow`
- Full-screen overlays: `ouiBottomShadowLarge`

### 3. Typography System

**Current Implementation** (`_typography.scss`):
```scss
$ouiFontFamily: 'Rubik', system fonts;
$ouiFontSize: 14px;
$ouiLineHeight: 1.5;
$ouiFontWeightLight: 400;
$ouiFontWeightRegular: 400;
$ouiFontWeightMedium: 500;
$ouiFontWeightSemiBold: 500;
$ouiFontWeightBold: 500;
```

**Modernized Implementation**:
```scss
// Font family - maintain Rubik for brand consistency
$ouiFontFamily: 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;

// Font sizes - maintain existing scale
$ouiFontSize: 14px;
$ouiFontSizeXS: 12px;
$ouiFontSizeS: 14px;
$ouiFontSizeM: 16px;
$ouiFontSizeL: 18px;
$ouiFontSizeXL: 24px;
$ouiFontSizeXXL: 28px;

// Line heights - improved readability
$ouiLineHeight: 1.6;                    // Body text (was 1.5)
$ouiBodyLineHeight: 1;                  // Maintain for specific cases
$ouiHeadingLineHeight: 1.3;             // New: Tighter for headings

// Font weights - expanded range for better hierarchy
$ouiFontWeightLight: 300;               // New: True light weight
$ouiFontWeightRegular: 400;             // Standard body text
$ouiFontWeightMedium: 500;              // Emphasis
$ouiFontWeightSemiBold: 600;            // New: Strong emphasis
$ouiFontWeightBold: 700;                // New: Maximum emphasis

// Letter spacing - subtle improvements
$ouiLetterSpacingTight: -0.01em;        // New: For large headings
$ouiLetterSpacingNormal: 0;             // Default
$ouiLetterSpacingWide: 0.02em;          // New: For small text legibility
```

**Typography Hierarchy Updates**:
Update the `$ouiTitles` map to use new line heights and weights:
```scss
$ouiTitles: (
  'xxxs': (
    'font-size': $ouiFontSizeS,
    'line-height': $ouiHeadingLineHeight,
    'font-weight': $ouiFontWeightSemiBold,
  ),
  'xxs': (
    'font-size': $ouiFontSizeS,
    'line-height': $ouiHeadingLineHeight,
    'font-weight': $ouiFontWeightSemiBold,
  ),
  'xs': (
    'font-size': $ouiFontSizeM,
    'line-height': $ouiHeadingLineHeight,
    'font-weight': $ouiFontWeightSemiBold,
  ),
  's': (
    'font-size': $ouiFontSizeL,
    'line-height': $ouiHeadingLineHeight,
    'font-weight': $ouiFontWeightSemiBold,
  ),
  'm': (
    'font-size': $ouiFontSizeXL,
    'line-height': $ouiHeadingLineHeight,
    'font-weight': $ouiFontWeightMedium,
  ),
  'l': (
    'font-size': $ouiFontSizeXXL,
    'line-height': $ouiHeadingLineHeight,
    'font-weight': $ouiFontWeightMedium,
  ),
);
```

### 4. Transition System

**New Implementation** (add to `_animation.scss` or similar):
```scss
// Transition durations
$ouiAnimSpeedExtraFast: 50ms;          // Micro-interactions
$ouiAnimSpeedFast: 100ms;              // Quick feedback
$ouiAnimSpeedNormal: 200ms;            // Standard transitions
$ouiAnimSpeedSlow: 300ms;              // Deliberate animations
$ouiAnimSpeedExtraSlow: 400ms;         // Emphasis animations

// Transition easing functions
$ouiAnimEaseInOut: cubic-bezier(0.4, 0, 0.2, 1);     // Standard
$ouiAnimEaseOut: cubic-bezier(0.0, 0, 0.2, 1);       // Enter animations
$ouiAnimEaseIn: cubic-bezier(0.4, 0, 1, 1);          // Exit animations
$ouiAnimEaseElastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);  // Playful

// Common transition properties
$ouiTransition: all $ouiAnimSpeedNormal $ouiAnimEaseInOut;
$ouiTransitionFast: all $ouiAnimSpeedFast $ouiAnimEaseInOut;
$ouiTransitionSlow: all $ouiAnimSpeedSlow $ouiAnimEaseInOut;

// Respect user preferences
@mixin ouiRespectMotion($property: all, $duration: $ouiAnimSpeedNormal, $easing: $ouiAnimEaseInOut) {
  transition: $property $duration $easing;
  
  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.01ms;
  }
}
```

### 5. Color Refinements

The color palette modernization focuses on adopting contemporary, slate-based neutrals and vibrant, accessible core colors inspired by shadcn/ui and modern design systems.

**Light Theme Colors** (`v9_colors_light.scss` and `global_styling/variables/_colors.scss`):

**Current Implementation**:
```scss
// Core Colors
$ouiColorPrimary: #0268BC;      // Darker, less vibrant blue
$ouiColorSecondary: #0F7B68;    // Teal-ish green
$ouiColorAccent: #9C47BF;       // Purple

// Status Colors
$ouiColorSuccess: $ouiColorSecondary;
$ouiColorWarning: #E0A130;      // Muted amber
$ouiColorDanger: #C43D35;       // Dark red

// Neutral Grays - Blue-tinted, cold
$ouiColorEmptyShade: #FCFEFF;
$ouiColorLightestShade: #E3E5E8;
$ouiColorLightShade: #D6D9DD;
$ouiColorMediumShade: #ADB4BA;
$ouiColorDarkShade: #5A6875;
$ouiColorDarkestShade: #2A3947;
$ouiColorFullShade: #0A1219;

// Backgrounds
$ouiPageBackgroundColor: #F0F2F4;
$ouiColorHighlight: #FFE1B0;
```

**Modernized Implementation**:
```scss
// Core Colors - Modern, vibrant but professional
$ouiColorPrimary: #2563EB;      // Modern blue (Tailwind blue-600)
$ouiColorSecondary: #059669;    // Fresh green (Tailwind emerald-600)
$ouiColorAccent: #7C3AED;       // Vibrant purple (Tailwind violet-600)

// Status Colors - Muted, sophisticated
$ouiColorSuccess: #10B981;      // Modern green (Tailwind emerald-500)
$ouiColorWarning: #F59E0B;      // Warm amber (Tailwind amber-500)
$ouiColorDanger: #EF4444;       // Clean red (Tailwind red-500)

// Neutral Grays - Warmer, softer (Slate-inspired)
$ouiColorEmptyShade: #FFFFFF;   // Pure white
$ouiColorLightestShade: #F8FAFC; // Slate-50
$ouiColorLightShade: #E2E8F0;   // Slate-200
$ouiColorMediumShade: #94A3B8;  // Slate-400
$ouiColorDarkShade: #475569;    // Slate-600
$ouiColorDarkestShade: #1E293B; // Slate-800
$ouiColorFullShade: #0F172A;    // Slate-950

// Backgrounds - Softer, more refined
$ouiPageBackgroundColor: #F8FAFC; // Subtle off-white (Slate-50)
$ouiColorHighlight: #FEF3C7;    // Softer yellow (Tailwind amber-100)
```

**Dark Theme Colors** (`v9_colors_dark.scss`):

**Current Implementation**:
```scss
// Core Colors
$ouiColorPrimary: #0097D1;      // Cyan-ish blue
$ouiColorSecondary: #129079;    // Teal
$ouiColorAccent: #AA63C4;       // Purple

// Status Colors
$ouiColorSuccess: $ouiColorSecondary;
$ouiColorWarning: #F4AE27;      // Yellow
$ouiColorDanger: #CD5D56;       // Muted red

// Neutral Grays - Blue-tinted, cold
$ouiColorEmptyShade: #0F171F;
$ouiColorLightestShade: #19222B;
$ouiColorLightShade: #2A3540;
$ouiColorMediumShade: #5C666F;
$ouiColorDarkShade: #959BA2;
$ouiColorDarkestShade: #E3E5E9;
$ouiColorFullShade: #FCFEFF;

// Backgrounds
$ouiPageBackgroundColor: #02020E;
$ouiColorHighlight: #3D2C0D;

// Text Colors
$ouiTextColor: $ouiColorDarkShade;  // #959BA2
$ouiTitleColor: #C6C9CE;
$ouiTextSubduedColor: #798189;
```

**Modernized Implementation**:
```scss
// Core Colors - Brighter, more vibrant for dark mode
$ouiColorPrimary: #3B82F6;      // Brighter blue (Tailwind blue-500)
$ouiColorSecondary: #10B981;    // Vibrant green (Tailwind emerald-500)
$ouiColorAccent: #A78BFA;       // Softer purple (Tailwind violet-400)

// Status Colors - Higher contrast for dark backgrounds
$ouiColorSuccess: #10B981;      // Modern green (Tailwind emerald-500)
$ouiColorWarning: #FBBF24;      // Brighter amber (Tailwind amber-400)
$ouiColorDanger: #F87171;       // Softer red (Tailwind red-400)

// Neutral Grays - Refined slate tones
$ouiColorEmptyShade: #020617;   // Slate-950
$ouiColorLightestShade: #0F172A; // Slate-900
$ouiColorLightShade: #1E293B;   // Slate-800
$ouiColorMediumShade: #64748B;  // Slate-500
$ouiColorDarkShade: #94A3B8;    // Slate-400
$ouiColorDarkestShade: #E2E8F0; // Slate-200
$ouiColorFullShade: #F8FAFC;    // Slate-50

// Backgrounds
$ouiPageBackgroundColor: #020617; // Deep slate (Slate-950)
$ouiColorHighlight: #422006;    // Warmer highlight (Tailwind amber-950)

// Text Colors - Better contrast
$ouiTextColor: #CBD5E1;         // Slate-300
$ouiTitleColor: #F1F5F9;        // Slate-100
$ouiTextSubduedColor: #94A3B8;  // Slate-400

// Borders - More subtle
$ouiBorderColor: transparentize(#334155, 0.5); // Slate-700 with 50% transparency
```

**Color Modernization Rationale**:

1. **Slate-Based Neutrals**: Adopting Tailwind's Slate palette provides warmer, more sophisticated grays compared to the cold blue-grays currently used. Slate colors have subtle warm undertones that reduce eye strain and feel more contemporary.

2. **Vibrant Core Colors**: 
   - Primary blue (#2563EB) is more saturated and energetic than the current darker blue
   - Secondary green (#059669 light, #10B981 dark) is fresher and more recognizable as "success"
   - Accent purple (#7C3AED light, #A78BFA dark) is more refined and modern

3. **Semantic Status Colors**: Each status color is now distinct and immediately recognizable:
   - Success: Vibrant green (not teal)
   - Warning: Warm amber (not muted yellow)
   - Danger: Clean red (not dark maroon)

4. **Better Contrast**: All colors are optimized for WCAG AA compliance while maintaining a modern aesthetic. Dark mode colors are specifically brightened for better visibility on dark backgrounds.

5. **Consistent Saturation**: All colors have similar saturation levels, creating visual harmony across the interface.

6. **Surface Differentiation**: Background shades provide clear visual hierarchy with sufficient contrast between surface levels.

**Color Comparison Tables**:

**Light Theme Color Changes**:

| Color Variable | Current Value | Modern Value | Color Name | Improvement |
|----------------|---------------|--------------|------------|-------------|
| `$ouiColorPrimary` | #0268BC | #2563EB | Blue-600 | More vibrant, energetic |
| `$ouiColorSecondary` | #0F7B68 | #059669 | Emerald-600 | Fresher, clearer green |
| `$ouiColorAccent` | #9C47BF | #7C3AED | Violet-600 | More refined purple |
| `$ouiColorSuccess` | #0F7B68 | #10B981 | Emerald-500 | Distinct from secondary |
| `$ouiColorWarning` | #E0A130 | #F59E0B | Amber-500 | Warmer, more visible |
| `$ouiColorDanger` | #C43D35 | #EF4444 | Red-500 | Cleaner, more modern |
| `$ouiColorEmptyShade` | #FCFEFF | #FFFFFF | White | Pure white |
| `$ouiColorLightestShade` | #E3E5E8 | #F8FAFC | Slate-50 | Warmer, softer |
| `$ouiColorLightShade` | #D6D9DD | #E2E8F0 | Slate-200 | Less blue-tinted |
| `$ouiColorMediumShade` | #ADB4BA | #94A3B8 | Slate-400 | Warmer neutrals |
| `$ouiColorDarkShade` | #5A6875 | #475569 | Slate-600 | Better contrast |
| `$ouiColorDarkestShade` | #2A3947 | #1E293B | Slate-800 | Warmer dark tone |
| `$ouiColorFullShade` | #0A1219 | #0F172A | Slate-950 | Refined deepest shade |
| `$ouiPageBackgroundColor` | #F0F2F4 | #F8FAFC | Slate-50 | Softer, less gray |
| `$ouiColorHighlight` | #FFE1B0 | #FEF3C7 | Amber-100 | More subtle |

**Dark Theme Color Changes**:

| Color Variable | Current Value | Modern Value | Color Name | Improvement |
|----------------|---------------|--------------|------------|-------------|
| `$ouiColorPrimary` | #0097D1 | #3B82F6 | Blue-500 | Brighter, more visible |
| `$ouiColorSecondary` | #129079 | #10B981 | Emerald-500 | More vibrant |
| `$ouiColorAccent` | #AA63C4 | #A78BFA | Violet-400 | Softer, easier on eyes |
| `$ouiColorSuccess` | #129079 | #10B981 | Emerald-500 | Consistent with light |
| `$ouiColorWarning` | #F4AE27 | #FBBF24 | Amber-400 | Better dark contrast |
| `$ouiColorDanger` | #CD5D56 | #F87171 | Red-400 | Softer, more modern |
| `$ouiColorEmptyShade` | #0F171F | #020617 | Slate-950 | Deeper, richer |
| `$ouiColorLightestShade` | #19222B | #0F172A | Slate-900 | Warmer dark tone |
| `$ouiColorLightShade` | #2A3540 | #1E293B | Slate-800 | Less blue-tinted |
| `$ouiColorMediumShade` | #5C666F | #64748B | Slate-500 | Better mid-tone |
| `$ouiColorDarkShade` | #959BA2 | #94A3B8 | Slate-400 | Warmer light tone |
| `$ouiColorDarkestShade` | #E3E5E9 | #E2E8F0 | Slate-200 | Consistent with light |
| `$ouiColorFullShade` | #FCFEFF | #F8FAFC | Slate-50 | Consistent with light |
| `$ouiPageBackgroundColor` | #02020E | #020617 | Slate-950 | Richer, warmer |
| `$ouiColorHighlight` | #3D2C0D | #422006 | Amber-950 | Warmer highlight |
| `$ouiTextColor` | #959BA2 | #CBD5E1 | Slate-300 | Much better contrast |
| `$ouiTitleColor` | #C6C9CE | #F1F5F9 | Slate-100 | Clearer hierarchy |
| `$ouiTextSubduedColor` | #798189 | #94A3B8 | Slate-400 | Better readability |

**Key Benefits of Modern Color Palette**:

1. **Slate Foundation**: All neutrals use Tailwind's Slate scale, providing warm undertones that reduce eye strain
2. **Semantic Clarity**: Status colors are now distinct and immediately recognizable
3. **Better Contrast**: Dark mode text colors significantly improved (Slate-300 vs old #959BA2)
4. **Visual Harmony**: Consistent saturation levels across all colors
5. **Modern Aesthetic**: Aligns with shadcn/ui, Tailwind, and contemporary design systems
6. **WCAG Compliance**: All combinations maintain AA contrast ratios (4.5:1 for normal text)

### 6. Component Variable Updates

#### Buttons (`_buttons.scss`)

**Current**:
```scss
$ouiButtonBorderRadius: $ouiBorderRadius;  // 4px
```

**Modernized**:
```scss
$ouiButtonBorderRadius: $ouiBorderRadius;  // Now 8px (inherits from updated token)

// Add transition support
$ouiButtonTransition: background-color $ouiAnimSpeedFast $ouiAnimEaseInOut,
                      border-color $ouiAnimSpeedFast $ouiAnimEaseInOut,
                      box-shadow $ouiAnimSpeedFast $ouiAnimEaseInOut;
```

#### Forms (`_form.scss`)

**Current**:
```scss
$ouiFormControlBorderRadius: 0;
$ouiFormControlCompressedBorderRadius: 2px;
$ouiCheckboxBorderRadius: $ouiBorderRadius;
```

**Modernized**:
```scss
$ouiFormControlBorderRadius: $ouiBorderRadiusSmall;           // 6px (was 0)
$ouiFormControlCompressedBorderRadius: $ouiBorderRadiusSmall; // 6px (was 2px)
$ouiCheckboxBorderRadius: $ouiBorderRadiusSmall;              // 6px (was 4px)

// Add transition support
$ouiFormControlTransition: border-color $ouiAnimSpeedFast $ouiAnimEaseInOut,
                           box-shadow $ouiAnimSpeedFast $ouiAnimEaseInOut,
                           background-color $ouiAnimSpeedFast $ouiAnimEaseInOut;
```

**Form Control Layout with Prepend/Append** (`form_control_layout/_form_control_layout.scss`):

The current implementation sets `border-radius: 0` on all prepend/append elements, which prevents the modern rounded appearance. This needs to be updated to apply border radius only to the outer edges:

**Current Issue**:
```scss
.ouiFormControlLayout__prepend,
.ouiFormControlLayout__append {
  border-radius: 0; // This removes all border radius!
}
```

**Modernized Solution**:
```scss
.ouiFormControlLayout--group {
  border-radius: $ouiFormControlBorderRadius; // Apply to container
  
  .ouiFormControlLayout__prepend,
  .ouiFormControlLayout__append {
    // Remove the blanket border-radius: 0
    
    // Icons and buttons inside should remain square
    &.ouiIcon,
    .ouiIcon,
    &.ouiButtonIcon,
    &.ouiButtonEmpty,
    .ouiButtonIcon,
    .ouiButtonEmpty {
      border-radius: 0;
    }
  }
  
  // First prepend gets left border radius
  > .ouiFormControlLayout__prepend:first-child {
    border-radius: $ouiFormControlBorderRadius 0 0 $ouiFormControlBorderRadius;
  }
  
  // Last append gets right border radius
  > .ouiFormControlLayout__append:last-child {
    border-radius: 0 $ouiFormControlBorderRadius $ouiFormControlBorderRadius 0;
  }
  
  // Compressed variant
  &.ouiFormControlLayout--compressed {
    border-radius: $ouiFormControlCompressedBorderRadius;
    
    > .ouiFormControlLayout__prepend:first-child {
      border-radius: $ouiFormControlCompressedBorderRadius 0 0 $ouiFormControlCompressedBorderRadius;
    }
    
    > .ouiFormControlLayout__append:last-child {
      border-radius: 0 $ouiFormControlCompressedBorderRadius $ouiFormControlCompressedBorderRadius 0;
    }
  }
}
```

This ensures:
- The outer container has rounded corners
- First prepend element has rounded left corners
- Last append element has rounded right corners
- Inner elements (icons, buttons) remain square for clean joins
- Both regular and compressed variants work correctly

#### Panels and Cards

**Add new variables** (if not already present):
```scss
$ouiPanelBorderRadius: $ouiBorderRadius;                      // 8px
$ouiPanelPaddingModifier: $ouiSize;                           // 16px
$ouiCardBorderRadius: $ouiBorderRadius;                       // 8px
```

#### Modals and Popovers

**Add new variables**:
```scss
$ouiModalBorderRadius: $ouiBorderRadiusLarge;                 // 12px
$ouiPopoverBorderRadius: $ouiBorderRadius;                    // 8px
```

### 7. SideNav Modernization

The SideNav component requires comprehensive modernization to achieve a contemporary look inspired by Linear, GitHub, and Vercel navigation patterns.

**Current Implementation** (`_side_nav_item.scss`):
```scss
.ouiSideNavItemButton {
  padding: calc($ouiSizeXS / 2) 0; // Minimal padding
  // No border radius
  
  &.ouiSideNavItemButton-isSelected {
    font-weight: $ouiFontWeightBold;
    
    .ouiSideNavItemButton__label {
      text-decoration: underline; // Old-school indicator
    }
  }
}
```

**Modernized Implementation**:

**New Variables** (`src/themes/v9/global_styling/variables/_side_nav.scss`):
```scss
// Spacing
$ouiSideNavItemPadding: $ouiSizeS !default;                   // 8px padding
$ouiSideNavItemBorderRadius: $ouiBorderRadiusSmall !default;  // 6px rounded
$ouiSideNavItemSpacing: $ouiSizeM !default;                   // 12px between items

// Selection - Subtle background with accent bar
$ouiSideNavSelectedBackground: transparentize($ouiColorPrimary, 0.92) !default;
$ouiSideNavSelectedAccentWidth: 3px !default;
$ouiSideNavSelectedAccentHeight: 60% !default;

// Hover states
$ouiSideNavHoverBackground: transparentize($ouiColorLightShade, 0.6) !default;
$ouiSideNavActiveBackground: transparentize($ouiColorLightShade, 0.3) !default;

// Transitions
$ouiSideNavTransition: background-color $ouiAnimSpeedFast $ouiAnimEaseInOut,
                       color $ouiAnimSpeedFast $ouiAnimEaseInOut,
                       transform $ouiAnimSpeedFast $ouiAnimEaseInOut !default;

// Branch indicators - Modern styling
$ouiSideNavBranchLineWidth: 2px !default;                     // Thicker line
$ouiSideNavBranchLineColor: transparentize($ouiBorderColor, 0.5) !default;
$ouiSideNavBranchTickWidth: $ouiSizeS !default;               // Longer tick
$ouiSideNavBranchTickHeight: 2px !default;                    // Thicker tick

// Update emphasized background to be more subtle
$ouiSideNavEmphasizedBackgroundColor: transparentize($ouiColorPrimary, 0.95) !default; // was .8
```

**Updated Item Styling** (`_side_nav_item.scss`):
```scss
.ouiSideNavItemButton {
  @include ouiFontSizeS;
  text-align: left;
  display: block;
  width: 100%;
  padding: $ouiSideNavItemPadding;              // 8px all around
  border-radius: $ouiSideNavItemBorderRadius;   // 6px rounded corners
  transition: $ouiSideNavTransition;            // Smooth transitions
  color: inherit;

  &.ouiSideNavItemButton--isClickable:not(:disabled) {
    &:hover {
      cursor: pointer;
      background-color: $ouiSideNavHoverBackground; // Background on hover
      
      .ouiSideNavItemButton__label {
        text-decoration: none; // Remove underline
      }
    }
    
    &:active {
      background-color: $ouiSideNavActiveBackground;
      transform: scale(0.98); // Subtle press effect
    }
    
    &:focus-visible {
      outline: 2px solid $ouiFocusRingColor;
      outline-offset: 2px;
      background-color: $ouiSideNavHoverBackground;
    }
  }

  // Modern selection indicator - Background + left accent bar
  &.ouiSideNavItemButton-isSelected {
    background-color: $ouiSideNavSelectedBackground;
    color: $ouiColorPrimary;
    font-weight: $ouiFontWeightSemiBold; // 600 weight
    position: relative;
    
    // Left accent bar
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: $ouiSideNavSelectedAccentWidth;
      height: $ouiSideNavSelectedAccentHeight;
      background-color: $ouiColorPrimary;
      border-radius: 0 2px 2px 0; // Rounded on right side
    }
    
    .ouiSideNavItemButton__label {
      // No underline needed
    }
  }

  &:disabled {
    @include ouiDisabledState($ouiSideNavDisabledTextcolor);
  }
  
  // Respect reduced motion
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}
```

**Modern Branch Indicators**:
```scss
.ouiSideNavItem--branch {
  position: relative;
  color: $ouiSideNavBranchTextcolor;

  // Vertical line - thicker and more subtle
  &::after {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    width: $ouiSideNavBranchLineWidth;        // 2px instead of 1px
    background: $ouiSideNavBranchLineColor;   // More subtle
    left: 0;
    border-radius: 1px;                       // Rounded line
  }

  // Fade out at the bottom
  &:last-of-type::after {
    height: $ouiSizeM;
    background: linear-gradient(
      to bottom,
      $ouiSideNavBranchLineColor,
      transparent
    );
  }

  // Horizontal tick - thicker and longer
  & > .ouiSideNavItemButton {
    position: relative;
    padding-left: $ouiSizeS;
    padding-right: $ouiSizeS;

    &:after {
      position: absolute;
      content: '';
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      width: $ouiSideNavBranchTickWidth;      // Longer tick
      height: $ouiSideNavBranchTickHeight;    // Thicker tick
      background: $ouiSideNavBranchLineColor;
      border-radius: 1px;
    }
  }

  & > .ouiSideNavItem__items {
    margin-left: $ouiSize;
  }
}
```

**Refined Emphasized State**:
```scss
.ouiSideNavItem--emphasized {
  background: $ouiSideNavEmphasizedBackgroundColor; // More subtle (95% transparent)
  border-radius: $ouiBorderRadius;                  // Rounded container
  padding: $ouiSizeS;
  margin: 0 (-$ouiSizeS);                          // Extend to edges
  
  // Modern shadow instead of box-shadow hack
  @include ouiBottomShadowSmall;
  
  > .ouiSideNavItemButton {
    font-weight: $ouiFontWeightSemiBold;
    
    &.ouiSideNavItemButton-isSelected {
      background-color: transparentize($ouiColorPrimary, 0.88);
    }
  }
  
  // Remove extra shadows from nested emphasized items
  .ouiSideNavItem--emphasized {
    background: transparent;
    box-shadow: none;
  }
}
```

**Better Spacing**:
```scss
.ouiSideNavItem--root {
  & > .ouiSideNavItemButton {
    margin-bottom: $ouiSideNavItemSpacing; // 12px instead of 8px
    padding: $ouiSideNavItemPadding;       // Consistent padding
    
    .ouiSideNavItemButton__label {
      @include ouiTitle('xs');
      font-weight: $ouiFontWeightSemiBold;  // 600 instead of 500
      letter-spacing: $ouiLetterSpacingTight;
    }
  }
  
  & + & {
    margin-top: $ouiSizeXXL; // More separation between root groups
  }
}
```

**SideNav Modernization Benefits**:

1. **Modern Selection Indicator**: Background + left accent bar (no underline)
2. **Clear Hover Feedback**: Background color change on hover
3. **Active State**: Subtle scale effect on click
4. **Rounded Corners**: 6px border radius on all items
5. **Better Spacing**: More comfortable padding and margins
6. **Smooth Transitions**: Animated state changes
7. **Modern Branch Lines**: Thicker, rounded, more subtle
8. **Refined Emphasized State**: Subtle background with modern shadow
9. **Accessibility**: Maintains focus indicators and keyboard navigation
10. **Reduced Motion**: Respects user preferences

### 8. Badge Modernization

The OuiBadge component requires modernization to align with contemporary design patterns while maintaining its compact, inline nature.

**Current Implementation** (`_badge.scss`):
```scss
.ouiBadge {
  font-size: $ouiFontSizeXS;                     // 12px
  font-weight: $ouiFontWeightMedium;             // 500
  line-height: $ouiSize + 2px;                   // 18px
  padding: 0 $ouiSizeS;                          // 0 8px
  border-radius: calc($ouiBorderRadius / 2);     // 2px (was 4px / 2)
  border: solid 1px transparent;
}
```

**Current Issues**:
- Sharp corners (2px border radius)
- Tight horizontal padding (8px)
- No vertical padding
- Medium font weight (500) lacks emphasis
- No transitions for interactive badges

**Modernized Implementation**:

**New Variables** (`src/themes/v9/global_styling/variables/_badge.scss`):
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

// Badge colors
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

**Updated Badge Styling** (`_badge.scss`):
```scss
.ouiBadge {
  font-size: $ouiBadgeFontSize;                    // 12px
  font-weight: $ouiBadgeFontWeight;                // 600 (was 500)
  line-height: $ouiBadgeLineHeight;                // 1.5 (was $ouiSize + 2px)
  padding: $ouiBadgePaddingVertical $ouiBadgePaddingHorizontal; // 2px 10px
  min-height: $ouiBadgeMinHeight;                  // 22px minimum
  display: inline-flex;                            // Changed from inline-block
  align-items: center;                             // Center content vertically
  text-decoration: none;
  border-radius: $ouiBadgeBorderRadius;            // 6px (was 2px)
  border: solid 1px transparent;
  background-color: transparent;
  white-space: nowrap;
  vertical-align: middle;
  cursor: default;
  max-width: 100%;
  text-align: left;
  transition: $ouiBadgeTransition;                 // Add smooth transitions

  // ... (rest of badge styles)

  .ouiBadge__content {
    min-height: $ouiBadgeMinHeight;
    display: flex;
    align-items: center;
    overflow: hidden;
    gap: $ouiBadgeIconSpacing;                     // Use gap instead of margins
  }

  .ouiBadge__icon {
    flex: 0 0 auto;
    margin: 0;                                     // Remove margin (using gap)
  }

  // Respect reduced motion
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

// Interactive badges with hover effects
.ouiBadge-isClickable {
  &:not(:disabled) {
    &:hover {
      text-decoration: underline;
      transform: translateY(-1px);               // Subtle lift on hover
      box-shadow: 0 2px 4px rgba($ouiShadowColor, 0.1);
    }
    
    &:active {
      transform: translateY(0);                  // Reset on click
      box-shadow: none;
    }
  }

  // Respect reduced motion
  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }
}

// Hollow variant with modern border
.ouiBadge--hollow {
  background-color: $ouiColorEmptyShade;
  border-color: $ouiBadgeHollowBorderColor;      // Use new variable
  color: $ouiTextColor;
}
```

**Badge Modernization Benefits**:

1. **Modern Appearance**: 6px border radius (3x rounder than 2px)
2. **Better Spacing**: 10px horizontal padding (25% more), 2px vertical padding
3. **Improved Typography**: Semibold weight (600) for better emphasis
4. **Smooth Interactions**: Transitions on all state changes
5. **Enhanced Hover**: Subtle lift and shadow on clickable badges
6. **Better Layout**: Flexbox with gap for cleaner icon spacing
7. **Accessibility**: Respects prefers-reduced-motion
8. **Modern Colors**: Automatically benefits from refined color palette

**Size Comparison**:

| Aspect | Current | Modernized | Change |
|--------|---------|------------|--------|
| Border Radius | 2px | 6px | +4px (3x rounder) |
| Horizontal Padding | 8px | 10px | +2px (25% more) |
| Vertical Padding | 0px | 2px | +2px (better height) |
| Min Height | ~18px | 22px | +4px (22% taller) |
| Font Weight | 500 | 600 | +100 (more emphasis) |

**Related Components**:

**Beta Badge** - Already modern with pill shape, add transitions:
```scss
.ouiBetaBadge {
  // ... existing styles
  transition: $ouiBadgeTransition;
  
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}
```

**Notification Badge** - Align with modernized radius:
```scss
.ouiNotificationBadge {
  border-radius: $ouiBorderRadiusSmall;          // 6px (was $ouiBorderRadius)
  font-weight: $ouiFontWeightSemiBold;           // 600 (was 500)
  transition: $ouiBadgeTransition;
  
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}
```

### 9. CallOut Modernization

The OuiCallOut component requires modernization to achieve a contemporary, shadcn-like aesthetic with rounded corners, subtle borders, and refined colors.

**Current Implementation** (`_call_out.scss`):
```scss
.ouiCallOut {
  padding: $ouiSize;                              // 16px
  border-left: calc($ouiSizeXS / 2) solid transparent; // 4px left border
  position: relative;
}
```

**Current Issues**:
- No border radius (sharp corners)
- Heavy 4px left border only
- No elevation/shadow
- Basic tinted backgrounds
- No transitions

**Modernized Implementation**:

**Updated CallOut Styling** (`_call_out.scss`):
```scss
.ouiCallOut {
  padding: calc($ouiSize * 1.25);                 // 20px (was 16px)
  border: 1px solid transparent;                  // All-around border
  border-radius: $ouiBorderRadius;                // 8px rounded corners
  position: relative;
  box-shadow: 0 1px 2px 0 rgba($ouiShadowColor, 0.05); // Subtle elevation
  
  // Left accent bar (inset from edge)
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    bottom: 8px;
    width: 3px;
    border-radius: 2px;
    background-color: transparent;
  }

  &.ouiCallOut--small {
    padding: $ouiSize;                            // 16px (was 12px)
  }

  .ouiCallOutHeader__icon {
    flex: 0 0 auto;
    transform: translateY(1px);                   // Reduced from 2px
    opacity: 0.9;                                 // Slightly muted
  }

  .ouiCallOutHeader__title {
    @include ouiCallOutTitle;
    margin-bottom: 0;
  }

  .ouiCallOut__closeIcon {
    position: absolute;
    right: $ouiSizeS;                             // 8px from edge
    top: $ouiSizeS;                               // 8px from top
    opacity: 0.7;
    transition: opacity $ouiAnimSpeedNormal ease;
    
    &:hover {
      opacity: 1;
    }
  }
  
  // Respect reduced motion
  @media (prefers-reduced-motion: reduce) {
    .ouiCallOut__closeIcon {
      transition: none;
    }
  }
}

// Create callout modifiers with modern colors
@each $name, $color in $ouiCallOutTypes {
  .ouiCallOut--#{$name} {
    border-color: rgba($color, 0.2);              // 20% opacity border
    background-color: rgba($color, 0.05);         // 5% opacity background (light)
    
    &::before {
      background-color: $color;                   // Accent bar color
    }

    .ouiCallOutHeader__icon {
      fill: ouiCallOutColor($name, 'foreground');
    }

    .ouiCallOutHeader__title {
      color: ouiCallOutColor($name, 'foreground');
    }

    .ouiCallOut__closeIcon {
      fill: ouiCallOutColor($name, 'foreground');
    }
  }
}

// Dark theme adjustments
@if (lightness($ouiPageBackgroundColor) < 50) {
  .ouiCallOut {
    box-shadow: 0 1px 2px 0 rgba($ouiShadowColor, 0.2); // Stronger shadow for dark
    
    @each $name, $color in $ouiCallOutTypes {
      &.ouiCallOut--#{$name} {
        border-color: rgba($color, 0.3);          // 30% opacity border (dark)
        background-color: rgba($color, 0.12);     // 12% opacity background (dark)
      }
    }
  }
}
```

**Updated Color Function** (`_mixins.scss`):
```scss
@function ouiCallOutColor($type: 'primary', $returnBackgroundOrForeground: 'background') {
  @if (map-has-key($ouiCallOutTypes, $type)) {
    $color: map-get($ouiCallOutTypes, $type);
    
    // Modern foreground colors with better contrast
    @if ($returnBackgroundOrForeground == 'foreground') {
      @if (lightness($ouiPageBackgroundColor) < 50) {
        // Dark theme - use lighter shades
        @if ($type == 'primary') {
          @return #93c5fd; // Blue-300
        } @else if ($type == 'success') {
          @return #6ee7b7; // Green-300
        } @else if ($type == 'warning') {
          @return #fcd34d; // Amber-300
        } @else if ($type == 'danger') {
          @return #fca5a5; // Red-300
        }
      } @else {
        // Light theme - use darker shades
        @if ($type == 'primary') {
          @return #1e40af; // Blue-800
        } @else if ($type == 'success') {
          @return #047857; // Green-700
        } @else if ($type == 'warning') {
          @return #b45309; // Amber-700
        } @else if ($type == 'danger') {
          @return #b91c1c; // Red-700
        }
      }
    }
    
    // Background colors handled by rgba() in component styles
    @return transparent;
  } @else {
    @warn 'Incorrect type of call out provided. See the $ouiCallOutTypes map for allowed values.';
  }
}
```

**CallOut Modernization Benefits**:

1. **Modern Appearance**: 8px border radius (rounded corners)
2. **Subtle Borders**: 1px all-around border with 20% opacity
3. **Left Accent Bar**: 3px rounded bar inset from edge (modern pattern)
4. **Better Backgrounds**: More transparent (5% light, 12% dark)
5. **Subtle Elevation**: Soft shadow for depth
6. **Better Spacing**: 20px padding (25% more breathing room)
7. **Improved Icon**: Slightly muted with better alignment
8. **Enhanced Dismiss**: Better positioning with hover transition
9. **Modern Colors**: Uses refined palette with proper contrast
10. **Accessibility**: Maintains WCAG AA contrast, respects reduced motion

**Visual Comparison**:

| Aspect | Current | Modernized | Change |
|--------|---------|------------|--------|
| Border Radius | 0px | 8px | +8px (rounded) |
| Border Style | 4px left only | 1px all around | More balanced |
| Left Accent | 4px solid | 3px rounded bar | More refined |
| Background Opacity | 90% tint | 5% (light), 12% (dark) | More subtle |
| Shadow | None | 0 1px 2px | Subtle elevation |
| Padding | 16px | 20px | +4px (25% more) |
| Icon Opacity | 100% | 90% | Slightly muted |
| Dismiss Position | Right 4px, Top 0 | Right 8px, Top 8px | Better spacing |

**Color Specifications**:

**Light Theme**:
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

**Dark Theme**:
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

### 10. FilterGroup Modernization

The OuiFilterGroup component requires modernization to achieve a contemporary appearance with rounded corners, connected buttons, and clear visual feedback.

**Current Implementation** (`_filter_group.scss`, `_filter_button.scss`):
```scss
.ouiFilterGroup {
  display: inline-flex;
  border-right: 1px solid $ouiFormBorderColor;
  box-shadow: 0 1px 2px -1px transparentize($ouiShadowColor, .8), 
              0 3px 3px -2px transparentize($ouiShadowColor, .8);
  overflow: hidden;
}

.ouiFilterButton {
  background-color: $ouiFormBackgroundColor;
  height: $ouiFormControlHeight;
  border: 1px solid $ouiFormBorderColor;
  border-right: none;                               // Connected buttons
}

.ouiFilterButton-isSelected {
  background-color: $ouiColorLightestShade;         // Basic gray background
}
```

**Current Issues**:
- No border radius (sharp corners)
- Flat appearance without modern elevation
- Basic selected state (gray background)
- No transitions for state changes
- Weak shadow

**Modernized Implementation**:

**New Variables** (`src/themes/v9/global_styling/variables/_filter_group.scss`):
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

**Updated FilterGroup Styling** (`_filter_group.scss`):
```scss
.ouiFilterGroup {
  display: inline-flex;
  max-width: 100%;
  border-radius: $ouiFilterGroupBorderRadius;       // 8px rounded container
  box-shadow: 0 1px 3px 0 rgba($ouiShadowColor, 0.1),
              0 1px 2px 0 rgba($ouiShadowColor, 0.06); // Modern shadow
  overflow: hidden;                                 // Clip to rounded corners
}
```

**Updated FilterButton Styling** (`_filter_button.scss`):
```scss
.ouiFilterButton {
  background-color: $ouiFormBackgroundColor;
  height: $ouiFormControlHeight;
  border: 1px solid $ouiFormBorderColor;
  border-right: none;                               // Connected buttons
  font-size: $ouiFontSizeS;
  transition: $ouiFilterButtonTransition;
  
  // First button gets left border radius
  &:first-child {
    border-radius: $ouiFilterGroupBorderRadius 0 0 $ouiFilterGroupBorderRadius; // 8px left
  }
  
  // Last button gets right border radius and full border
  &:last-child {
    border-radius: 0 $ouiFilterGroupBorderRadius $ouiFilterGroupBorderRadius 0; // 8px right
    border-right: 1px solid $ouiFormBorderColor;
  }
  
  // Single button gets full border radius
  &:only-child {
    border-radius: $ouiFilterGroupBorderRadius;
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
  
  &:disabled {
    color: $ouiButtonColorDisabledText;
    pointer-events: none;
    
    .ouiFilterButton__notification {
      opacity: .5;
    }
  }
}

// Modern selected state
.ouiFilterButton-isSelected {
  background-color: $ouiFilterButtonSelectedBackground; // Primary color
  border-color: $ouiFilterButtonSelectedBorder;
  color: $ouiFilterButtonSelectedColor;             // White text
  font-weight: $ouiFontWeightSemiBold;              // 600 weight
  z-index: 2;                                       // Lift above siblings
  
  &:hover:not(:disabled) {
    background-color: darken($ouiFilterButtonSelectedBackground, 5%);
    border-color: darken($ouiFilterButtonSelectedBorder, 5%);
  }
  
  // Invert notification badge colors
  .ouiFilterButton__notification {
    background-color: $ouiFilterButtonSelectedColor; // White badge
    color: $ouiFilterButtonSelectedBackground;      // Primary text
  }
}

// Active filters state (not selected)
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

// Update notification badge
.ouiFilterButton__notification {
  margin-left: $ouiSizeS;
  border-radius: $ouiBorderRadiusSmall;             // 6px (was pill)
  transition: all $ouiAnimSpeedFast $ouiAnimEaseInOut;
}

// Respect reduced motion
@media (prefers-reduced-motion: reduce) {
  .ouiFilterButton {
    transition: none;
  }
  
  .ouiFilterButton__notification {
    transition: none;
  }
}
```

**Dark Theme Adjustments**:
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

**FilterGroup Modernization Benefits**:

1. **Modern Appearance**: 8px rounded corners on container
2. **Familiar Pattern**: Maintains connected button style (compact)
3. **Enhanced Feedback**: Hover effects with z-index layering
4. **Improved Selected State**: Primary color background with white text
5. **Better Active State**: Semibold weight and primary border for active filters
6. **Smooth Interactions**: Transitions on all state changes
7. **Modern Badges**: 6px border radius, inverted colors when selected
8. **Compact Layout**: No gaps means efficient use of horizontal space
9. **Accessibility**: Maintains WCAG AA compliance, respects reduced motion
10. **Consistent Design**: Aligns with other modernized components

**Visual Comparison**:

| Aspect | Current | Modernized | Change |
|--------|---------|------------|--------|
| Container Radius | 0px | 8px | +8px (rounded) |
| Button Radius | 0px | 8px (first/last) | +8px (rounded ends) |
| Button Separation | Connected | Connected | Maintained |
| Selected Background | Gray | Primary color | More prominent |
| Selected Text | Default | White | Better contrast |
| Hover Effect | None | Z-index lift | Better feedback |
| Badge Radius | Pill | 6px | More consistent |
| Shadow | Weak | Modern layered | Better elevation |

## Data Models

### Design Token Structure

The design tokens follow a hierarchical structure:

```
Core Tokens (Primitives)
├── Border Radius
│   ├── Small (6px)
│   ├── Base (8px)
│   └── Large (12px)
├── Shadows
│   ├── XS (Slight)
│   ├── SM (Small)
│   ├── MD (Medium)
│   ├── LG (Large)
│   └── XL (Extra Large)
├── Typography
│   ├── Font Family
│   ├── Font Sizes (XS → XXL)
│   ├── Font Weights (300 → 700)
│   ├── Line Heights
│   └── Letter Spacing
├── Spacing
│   └── Size Scale (XXS → XXL)
├── Colors
│   ├── Core (Primary, Secondary, Accent)
│   ├── Status (Success, Warning, Danger)
│   ├── Neutrals (Shades)
│   └── Semantic (Text, Background, Border)
└── Animation
    ├── Durations (50ms → 400ms)
    └── Easing Functions

Component Tokens (Semantic)
├── Button Variables
├── Form Variables
├── Panel Variables
├── Modal Variables
└── ... (other components)
```

### Variable Naming Convention

All variables follow the existing OUI naming pattern:
- Prefix: `$oui` (with `$eui` aliases for backward compatibility)
- Category: Descriptive name (e.g., `BorderRadius`, `FontWeight`)
- Modifier: Size or variant (e.g., `Small`, `Large`, `Medium`)

Example: `$ouiBorderRadiusLarge`, `$ouiFontWeightSemiBold`

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Border Radius Modernization

*For any* component that uses border radius (buttons, forms, panels, cards, modals, popovers), the border radius value should be one of the modernized values (6px, 8px, or 12px) rather than the old values (2px, 4px).

**Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7**

### Property 2: Shadow System Modernization

*For any* shadow mixin (slight, small, medium, large, extra-large), the generated box-shadow should use multiple layered shadows with softer blur radii (larger than current implementation) and reduced opacity values (lower than current implementation).

**Validates: Requirements 2.6, 2.7, 2.8**

### Property 3: Typography Hierarchy Consistency

*For any* heading level (h1 through h6), the font size should be larger than or equal to the next smaller heading level, creating a clear visual hierarchy.

**Validates: Requirements 3.6**

### Property 4: WCAG Contrast Compliance

*For any* text color and background color combination used in the theme (both light and dark), the contrast ratio should meet WCAG 2.1 Level AA requirements (4.5:1 for normal text, 3:1 for large text and focus indicators).

**Validates: Requirements 4.1, 4.8, 4.9, 10.1, 10.2**

### Property 5: Spacing Scale Consistency

*For any* component variable that defines padding, margin, or gap, the value should reference a variable from the spacing scale ($ouiSizeXXS through $ouiSizeXXL) rather than using arbitrary pixel values.

**Validates: Requirements 8.3, 8.4, 8.5, 8.6**

### Property 6: Backward Compatibility Preservation

*For any* variable that existed in the original v9 theme, the variable name should still be defined in the modernized theme (either as a primary variable or as an alias).

**Validates: Requirements 7.1, 7.3, 7.4, 7.5**

### Property 7: Dual Theme Support

*For any* design token that affects visual appearance (colors, shadows, borders), both the light and dark theme files should define appropriate values that maintain visual hierarchy and accessibility standards.

**Validates: Requirements 9.1, 9.2, 9.3, 9.4**

### Property 8: Minimum Touch Target Size

*For any* interactive element size variable (button heights, form control heights), the value should be at least 44px to meet accessibility touch target requirements.

**Validates: Requirements 10.3**

## Error Handling

### SCSS Compilation Errors

**Error Type**: Variable undefined errors
- **Cause**: Missing variable definitions or broken references
- **Handling**: Ensure all new variables are defined before use; maintain backward-compatible aliases
- **Prevention**: Test SCSS compilation after each variable update

**Error Type**: Circular dependency errors
- **Cause**: Variables referencing each other in a loop
- **Handling**: Review variable dependencies; use intermediate variables to break cycles
- **Prevention**: Follow token hierarchy (primitives → semantic → component)

**Error Type**: Invalid color function errors
- **Cause**: Color manipulation functions receiving invalid inputs
- **Handling**: Validate color values before passing to functions; provide fallback values
- **Prevention**: Use color validation in mixins

### Theme Switching Issues

**Issue**: Inconsistent appearance between themes
- **Cause**: Missing or incorrect variable definitions in one theme
- **Handling**: Ensure both theme files define all necessary variables
- **Prevention**: Use a checklist to verify both themes are updated

**Issue**: Contrast failures in dark theme
- **Cause**: Colors that work in light theme don't meet contrast requirements in dark theme
- **Handling**: Calculate and verify contrast ratios for both themes
- **Prevention**: Use contrast checking tools during development

### Browser Compatibility

**Issue**: CSS custom properties not supported
- **Cause**: Older browsers don't support CSS variables
- **Handling**: SCSS variables compile to static values, providing fallback
- **Prevention**: Maintain SCSS variable system as primary source of truth

**Issue**: Transition/animation issues
- **Cause**: Browser doesn't support certain easing functions or properties
- **Handling**: Provide fallback transitions; respect prefers-reduced-motion
- **Prevention**: Test in target browsers; use standard easing functions

## Testing Strategy

### Dual Testing Approach

The modernization will be validated through both unit tests and property-based tests:

**Unit Tests**: Verify specific examples, edge cases, and error conditions
- Test specific variable values (e.g., `$ouiBorderRadius === 8px`)
- Test shadow mixin output for specific inputs
- Test SCSS compilation succeeds
- Test that specific component variables reference correct tokens

**Property Tests**: Verify universal properties across all inputs
- Test that all shadow mixins use multiple layers
- Test that all text/background combinations meet WCAG contrast
- Test that all component spacing uses spacing scale values
- Test that all existing variables are preserved

Together, these approaches provide comprehensive coverage: unit tests catch concrete bugs in specific implementations, while property tests verify general correctness across the entire theme system.

### Property-Based Testing Configuration

**Testing Library**: Use a SCSS testing framework with property-based testing support (e.g., True + custom property generators)

**Test Configuration**:
- Minimum 100 iterations per property test
- Each property test references its design document property
- Tag format: **Feature: v9-theme-modernization, Property {number}: {property_text}**

**Property Test Examples**:

```scss
// Property 1: Border Radius Modernization
@include test-module('Border Radius Modernization') {
  @include test('All component border radii use modernized values [Property 1]') {
    // Feature: v9-theme-modernization, Property 1: Border radius modernization
    // Generate test cases for all component border radius variables
    // Verify each uses 6px, 8px, or 12px
  }
}

// Property 2: Shadow System Modernization
@include test-module('Shadow System Modernization') {
  @include test('All shadows use multiple layers with soft blur [Property 2]') {
    // Feature: v9-theme-modernization, Property 2: Shadow system modernization
    // For each shadow mixin, verify:
    // - Multiple box-shadow layers (comma-separated)
    // - Blur radii larger than old implementation
    // - Opacity values lower than old implementation
  }
}

// Property 4: WCAG Contrast Compliance
@include test-module('WCAG Contrast Compliance') {
  @include test('All text/background combinations meet WCAG AA [Property 4]') {
    // Feature: v9-theme-modernization, Property 4: WCAG contrast compliance
    // Generate all text color / background color combinations
    // Calculate contrast ratio for each
    // Verify ratio >= 4.5:1 for normal text, >= 3:1 for large text
  }
}
```

### Unit Test Examples

```scss
// Specific variable value tests
@include test-module('Border Radius Variables') {
  @include test('Base border radius is 8px') {
    @include assert-equal($ouiBorderRadius, 8px);
  }
  
  @include test('Small border radius is 6px') {
    @include assert-equal($ouiBorderRadiusSmall, 6px);
  }
  
  @include test('Large border radius is 12px') {
    @include assert-equal($ouiBorderRadiusLarge, 12px);
  }
}

// Shadow mixin output tests
@include test-module('Shadow Mixins') {
  @include test('ouiSlightShadow generates box-shadow') {
    $output: inspect(ouiSlightShadow());
    @include assert-true(str-index($output, 'box-shadow') != null);
  }
}

// Compilation tests
@include test-module('Theme Compilation') {
  @include test('Dark theme compiles without errors') {
    // Import dark theme and verify no compilation errors
    @import 'themes/v9/v9_colors_dark';
    @include assert-true(true); // If we get here, compilation succeeded
  }
}
```

### Visual Regression Testing

While not part of automated unit/property tests, visual regression testing should be performed:

1. **Component Screenshots**: Capture before/after screenshots of all components
2. **Theme Comparison**: Compare light and dark theme renderings
3. **Interaction States**: Test hover, focus, active, and disabled states
4. **Responsive Behavior**: Verify appearance at different viewport sizes

### Accessibility Testing

1. **Contrast Verification**: Use automated tools to verify WCAG contrast ratios
2. **Focus Indicators**: Manually verify focus states are visible
3. **Touch Targets**: Verify interactive elements meet 44x44px minimum
4. **Reduced Motion**: Test that animations respect prefers-reduced-motion

### Browser Testing

Test in target browsers:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### Performance Testing

1. **Build Time**: Verify SCSS compilation time doesn't significantly increase
2. **CSS Output Size**: Verify generated CSS size remains reasonable
3. **Runtime Performance**: Verify transitions/animations perform smoothly

## Implementation Notes

### Migration Path

The modernization will be implemented in phases:

**Phase 1: Core Tokens**
1. Update border radius variables
2. Update shadow mixins
3. Update typography variables
4. Add transition variables

**Phase 2: Component Variables**
1. Update button variables
2. Update form variables
3. Update panel/card variables
4. Update modal/popover variables

**Phase 3: Color Refinements**
1. Refine border colors
2. Adjust background differentiation
3. Verify contrast ratios

**Phase 4: Testing & Validation**
1. Run unit tests
2. Run property tests
3. Perform visual regression testing
4. Verify accessibility compliance

### Rollout Strategy

1. **Development**: Implement changes in feature branch
2. **Testing**: Comprehensive testing in staging environment
3. **Documentation**: Update theme documentation with new values
4. **Release**: Include in next minor version release
5. **Communication**: Announce changes in release notes

### Deprecation Policy

No variables will be removed in the initial release. Future deprecations will follow this process:

1. **Mark as Deprecated**: Add comments indicating deprecation
2. **Provide Alternatives**: Document replacement variables
3. **Grace Period**: Maintain for at least 2 major versions
4. **Removal**: Remove in major version with breaking changes

### Documentation Updates

Update the following documentation:

1. **Theme Guide**: Document new design token values
2. **Migration Guide**: Explain changes for theme consumers
3. **Component Examples**: Update documentation site examples
4. **Changelog**: List all variable changes

## References

- [shadcn/ui Design Principles](https://ui.shadcn.com/)
- [WCAG 2.1 Level AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Design Elevation](https://material.io/design/environment/elevation.html)
- [Inclusive Components](https://inclusive-components.design/)
- [OUI Theme Documentation](https://oui.opensearch.org/docs/theming)


### 11. DataGrid Modernization

The OuiDataGrid component requires modernization to achieve a clean, professional appearance with better visual hierarchy and readability for large datasets.

**Current Implementation** (`_data_grid.scss`, `_data_grid_header_row.scss`, `_data_grid_data_row.scss`):
```scss
.ouiDataGrid__content {
  height: 100%;
  background: $ouiColorEmptyShade;
  // No border radius, no shadow
}

.ouiDataGridHeader {
  background: $ouiColorEmptyShade;                  // Same as content
  position: sticky;
  top: 0;
}

@include ouiDataGridHeaderCell {
  font-weight: $ouiFontWeightBold;                  // Bold (700)
  padding: $ouiDataGridCellPaddingM;                // 6px
  border-bottom: $ouiBorderThin;                    // 1px border
}

@include ouiDataGridRowCell {
  padding: $ouiDataGridCellPaddingM;                // 6px
  border-right: $ouiDataGridVerticalBorder;         // Tinted border
  border-bottom: $ouiBorderThin;
  background: $ouiColorEmptyShade;
  // No transitions
}
```

**Current Issues**:
- Sharp corners (no border radius)
- No elevation (no shadow)
- Header doesn't stand out from data rows
- Tight padding reduces readability
- No hover transitions
- Basic focus states

**Modernized Implementation**:

**New Variables** (`src/themes/v9/global_styling/variables/_data_grid.scss`):
```scss
// Container styling
$ouiDataGridBorderRadius: $ouiBorderRadius !default;                    // 8px
$ouiDataGridBorder: 1px solid $ouiBorderColor !default;
$ouiDataGridShadow: 0 1px 3px 0 rgba($ouiShadowColor, 0.1), 
                    0 1px 2px 0 rgba($ouiShadowColor, 0.06) !default;

// Header styling
$ouiDataGridHeaderBackground: transparentize($ouiColorLightShade, 0.5) !default;
$ouiDataGridHeaderBorderBottom: 2px solid $ouiBorderColor !default;
$ouiDataGridHeaderFontWeight: $ouiFontWeightSemiBold !default;          // 600
$ouiDataGridHeaderPadding: $ouiSizeS $ouiSizeM !default;                // 8px 12px
$ouiDataGridHeaderHoverBackground: transparentize($ouiColorLightShade, 0.3) !default;

// Cell styling
$ouiDataGridCellPadding: $ouiSizeS $ouiSizeM !default;                  // 8px 12px
$ouiDataGridCellBorder: 1px solid transparentize($ouiBorderColor, 0.5) !default;
$ouiDataGridCellHoverBackground: transparentize($ouiColorHighlight, 0.3) !default;
$ouiDataGridCellTransition: background-color $ouiAnimSpeedFast $ouiAnimEaseInOut !default;

// Row striping
$ouiDataGridStripeBackground: transparentize($ouiColorLightShade, 0.7) !default;

// Focus states
$ouiDataGridCellFocusBorder: 2px solid $ouiColorPrimary !default;
$ouiDataGridCellFocusShadow: 0 0 0 2px transparentize($ouiColorPrimary, 0.8) !default;
$ouiDataGridCellFocusBorderRadius: 2px !default;

// EUI Aliases
$euiDataGridBorderRadius: $ouiDataGridBorderRadius;
$euiDataGridBorder: $ouiDataGridBorder;
$euiDataGridShadow: $ouiDataGridShadow;
$euiDataGridHeaderBackground: $ouiDataGridHeaderBackground;
$euiDataGridHeaderBorderBottom: $ouiDataGridHeaderBorderBottom;
$euiDataGridHeaderFontWeight: $ouiDataGridHeaderFontWeight;
$euiDataGridHeaderPadding: $ouiDataGridHeaderPadding;
$euiDataGridHeaderHoverBackground: $ouiDataGridHeaderHoverBackground;
$euiDataGridCellPadding: $ouiDataGridCellPadding;
$euiDataGridCellBorder: $ouiDataGridCellBorder;
$euiDataGridCellHoverBackground: $ouiDataGridCellHoverBackground;
$euiDataGridCellTransition: $ouiDataGridCellTransition;
$euiDataGridStripeBackground: $ouiDataGridStripeBackground;
$euiDataGridCellFocusBorder: $ouiDataGridCellFocusBorder;
$euiDataGridCellFocusShadow: $ouiDataGridCellFocusShadow;
$euiDataGridCellFocusBorderRadius: $ouiDataGridCellFocusBorderRadius;
```

**Updated Container Styling** (`_data_grid.scss`):
```scss
// V9 theme modernization
@if (variable-exists(ouiDataGridBorderRadius)) {
  .ouiDataGrid__content {
    border-radius: $ouiDataGridBorderRadius;        // 8px rounded corners
    box-shadow: $ouiDataGridShadow;                 // Subtle elevation
    overflow: hidden;                               // Clip to border radius
  }
  
  .ouiDataGrid__controlBtn {
    transition: background-color $ouiAnimSpeedFast $ouiAnimEaseInOut,
                border-color $ouiAnimSpeedFast $ouiAnimEaseInOut;
    
    &:hover {
      background: transparentize($ouiColorLightShade, 0.5);
    }
  }
}
```

**Updated Header Styling** (`_data_grid_header_row.scss`):
```scss
// V9 theme modernization
@if (variable-exists(ouiDataGridHeaderBackground)) {
  .ouiDataGridHeader {
    background: $ouiDataGridHeaderBackground;       // Subtle background
  }
  
  @include ouiDataGridHeaderCell {
    font-weight: $ouiDataGridHeaderFontWeight;      // Semibold (600)
    padding: $ouiDataGridHeaderPadding;             // 8px 12px
    border-bottom: $ouiDataGridHeaderBorderBottom;  // 2px emphasis
    
    // Hover effect for sortable columns
    .ouiDataGridHeaderCell__button:hover {
      background: $ouiDataGridHeaderHoverBackground;
      border-radius: $ouiBorderRadiusSmall;         // 6px
      transition: background-color $ouiAnimSpeedFast $ouiAnimEaseInOut;
    }
  }
}
```

**Updated Cell Styling** (`_data_grid_data_row.scss`):
```scss
// V9 theme modernization
@if (variable-exists(ouiDataGridCellPadding)) {
  @include ouiDataGridRowCell {
    padding: $ouiDataGridCellPadding;               // 8px 12px
    border-right: $ouiDataGridCellBorder;           // Softer border
    border-bottom: $ouiDataGridCellBorder;
    transition: $ouiDataGridCellTransition;         // Smooth hover
    
    &:focus {
      border: $ouiDataGridCellFocusBorder;          // 2px primary
      box-shadow: $ouiDataGridCellFocusShadow;      // Focus ring
      border-radius: $ouiDataGridCellFocusBorderRadius; // 2px
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
        background: $ouiDataGridStripeBackground;   // Very subtle
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

**Dark Theme Adjustments** (`src/themes/v9/components/_data_grid.scss`):
```scss
@if (lightness($ouiPageBackgroundColor) < 50) {
  // Adjust header background for dark theme
  $ouiDataGridHeaderBackground: transparentize($ouiColorLightShade, 0.6);
  
  // More visible borders
  $ouiDataGridCellBorder: 1px solid transparentize($ouiBorderColor, 0.3);
  
  // Stronger shadow for elevation
  $ouiDataGridShadow: 0 1px 3px 0 rgba($ouiShadowColor, 0.3),
                      0 1px 2px 0 rgba($ouiShadowColor, 0.2);
  
  // Lighter hover for visibility
  $ouiDataGridCellHoverBackground: transparentize($ouiColorHighlight, 0.2);
  
  // More visible striping
  $ouiDataGridStripeBackground: transparentize($ouiColorLightShade, 0.8);
}
```

**DataGrid Modernization Benefits**:

1. **Modern Container**: 8px border radius with subtle shadow
2. **Enhanced Header**: Distinct background, semibold text, 2px bottom border
3. **Better Readability**: Increased padding (8px x 12px) for breathing room
4. **Softer Borders**: Transparent borders for cleaner appearance
5. **Smooth Interactions**: Transitions on hover and focus
6. **Subtle Striping**: Very light background for alternating rows
7. **Improved Focus**: 2px primary border with focus ring
8. **Professional Look**: Clean, modern aesthetic suitable for enterprise
9. **Accessibility**: WCAG AA compliant, respects reduced motion
10. **Backward Compatible**: All existing APIs and styles preserved

**Visual Comparison**:

| Aspect | Current | Modernized | Change |
|--------|---------|------------|--------|
| Container Radius | 0px | 8px | +8px (rounded) |
| Container Shadow | None | Layered | Added elevation |
| Header Background | Same as content | Subtle shade | Better distinction |
| Header Font Weight | Bold (700) | Semibold (600) | Softer hierarchy |
| Header Border | 1px | 2px | More emphasis |
| Cell Padding | 6px | 8px x 12px | +33% vertical, +100% horizontal |
| Cell Borders | Standard | Transparent | Softer appearance |
| Row Hover | Basic | Smooth transition | Better feedback |
| Striping | Standard | Very subtle | Cleaner look |
| Focus Border | 1px | 2px + ring | More visible |
| Focus Radius | 1px | 2px | Softer corners |



### 12. Toast Modernization

The OuiToast component requires modernization to achieve a clean, professional notification aesthetic with better visual hierarchy and smooth interactions.

**Current Implementation** (`_toast.scss`):
```scss
.ouiToast {
  border: $ouiBorderThin;
  @include ouiBottomShadowLarge($adjustBorders: true);
  padding: $ouiSize;
  background-color: $ouiColorEmptyShade;
}

@each $name, $color in $ouiToastTypes {
  .ouiToast--#{$name} {
    border-top: 2px solid $color;                   // Top accent
  }
}

.ouiToastHeader__title {
  @include ouiTitle('xs');
  font-weight: $ouiFontWeightLight;                 // Light (300)
}

.ouiToast__closeButton {
  opacity: 0;                                       // Hidden by default
  transition: opacity $ouiAnimSpeedFast;
}
```

**Current Issues**:
- No border radius (sharp corners)
- Top border accent feels dated
- Light title weight (300) lacks hierarchy
- Hidden close button reduces discoverability
- Standard shadow

**Modernized Implementation**:

**New Variables** (`src/themes/v9/global_styling/variables/_toast.scss`):
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

// EUI Aliases
$euiToastBorderRadius: $ouiToastBorderRadius;
$euiToastBorder: $ouiToastBorder;
$euiToastShadow: $ouiToastShadow;
$euiToastPadding: $ouiToastPadding;
$euiToastAccentWidth: $ouiToastAccentWidth;
$euiToastAccentBorderRadius: $ouiToastAccentBorderRadius;
$euiToastTitleFontWeight: $ouiToastTitleFontWeight;
$euiToastCloseButtonOpacity: $ouiToastCloseButtonOpacity;
$euiToastCloseButtonHoverBackground: $ouiToastCloseButtonHoverBackground;
$euiToastCloseButtonTransition: $ouiToastCloseButtonTransition;
$euiToastAnimationDuration: $ouiToastAnimationDuration;
$euiToastAnimationEasing: $ouiToastAnimationEasing;
```

**Updated Container Styling** (`_toast.scss`):
```scss
// V9 theme modernization
@if (variable-exists(ouiToastBorderRadius)) {
  .ouiToast {
    border: $ouiToastBorder;                        // Subtle all-around
    border-radius: $ouiToastBorderRadius;           // 8px rounded
    box-shadow: $ouiToastShadow;                    // Modern shadow
    padding: $ouiToastPadding;
    overflow: hidden;                               // Clip accent bar
    
    // Left accent bar
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: $ouiToastAccentWidth;                  // 3px
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

**Updated Title Styling** (`_toast.scss`):
```scss
// V9 theme modernization
@if (variable-exists(ouiToastTitleFontWeight)) {
  .ouiToastHeader__title {
    font-weight: $ouiToastTitleFontWeight;          // Semibold (600)
  }
}
```

**Updated Close Button** (`_toast.scss`):
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
}
```

**Updated Animations** (`_global_toast_list.scss`):
```scss
// V9 theme modernization
@if (variable-exists(ouiToastAnimationDuration)) {
  .ouiGlobalToastListItem {
    animation: $ouiToastAnimationDuration ouiShowToast $ouiToastAnimationEasing;
    
    &.ouiGlobalToastListItem-isDismissed {
      transition: opacity $ouiToastAnimationDuration $ouiToastAnimationEasing,
                  transform $ouiToastAnimationDuration $ouiToastAnimationEasing;
      opacity: 0;
      transform: scale(0.95);                       // Scale down on exit
    }
  }
  
  @keyframes ouiShowToast {
    from {
      transform: translateY($ouiSizeL) scale(0.95);
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
        opacity: 0;
      }
      
      to {
        opacity: 1;
      }
    }
  }
}
```

**Dark Theme Adjustments** (`src/themes/v9/components/_toast.scss`):
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

**Toast Modernization Benefits**:

1. **Modern Container**: 8px border radius with subtle all-around border
2. **Clear Indication**: 3px left accent bar (consistent with CallOut)
3. **Better Hierarchy**: Semibold title (600) instead of light (300)
4. **Enhanced Visibility**: Always-visible close button
5. **Smooth Interactions**: Hover effects and transitions
6. **Modern Shadow**: Layered shadow for elevation
7. **Improved Animations**: Scale effects on entrance and exit
8. **Professional Look**: Clean, contemporary aesthetic
9. **Accessibility**: Enhanced focus states, respects reduced motion
10. **Backward Compatible**: All existing APIs preserved

**Visual Comparison**:

| Aspect | Current | Modernized | Change |
|--------|---------|------------|--------|
| Border Radius | 0px | 8px | +8px (rounded) |
| Color Accent | Top border (2px) | Left bar (3px) | Position change |
| Border | All sides (1px) | Subtle (transparent) | Softer |
| Shadow | Standard | Layered | More elevation |
| Title Weight | Light (300) | Semibold (600) | +300 (stronger) |
| Close Button | Hidden (opacity: 0) | Visible (opacity: 1) | Always shown |
| Close Hover | Opacity change | Background + opacity | Better feedback |
| Exit Animation | Fade only | Fade + scale | More polished |
| Animation Speed | Normal (200ms) | Fast (150ms) | Snappier |

