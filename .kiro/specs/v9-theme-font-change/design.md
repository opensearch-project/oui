# Design Document: V9 Theme Font Change

## Overview

This design describes the implementation approach for changing the primary font family in the v9 theme from 'Rubik' to 'Roboto Mono'. The change will be isolated to the v9 theme directory to prevent impacting other themes (default, oui-next).

The v9 theme typography is currently configured in `src/themes/v9/global_styling/variables/_typography.scss`, which defines the `$ouiFontFamily` variable. This variable is then exposed as a CSS custom property `--oui-font-family` in `src/themes/v9/global_styling/css_variables/_fonts.scss`.

## Architecture

The font configuration follows a layered architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    Theme Entry Points                        │
│  src/theme_v9_dark.scss    src/theme_v9_light.scss          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              V9 Global Styling (variables)                   │
│  src/themes/v9/global_styling/variables/_typography.scss    │
│  - $ouiFontFamily (SASS variable)                           │
│  - $ouiCodeFontFamily (SASS variable)                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              V9 CSS Variables                                │
│  src/themes/v9/global_styling/css_variables/_fonts.scss     │
│  - --oui-font-family (CSS custom property)                  │
│  - --oui-code-font-family (CSS custom property)             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Typography Mixins                               │
│  src/themes/v9/global_styling/mixins/_typography.scss       │
│  - @mixin ouiFont (applies font-family)                     │
│  - @mixin ouiCodeFont (applies code font-family)            │
└─────────────────────────────────────────────────────────────┘
```

### Theme Isolation Strategy

The v9 theme has its own copy of typography variables in `src/themes/v9/global_styling/variables/_typography.scss`. This file is imported only when the v9 theme is loaded, ensuring changes here do not affect:
- Default theme (`src/global_styling/variables/_typography.scss`)
- OUI-Next theme (`src/themes/oui-next/global_styling/variables/_typography.scss`)

## Components and Interfaces

### File: `src/themes/v9/global_styling/variables/_typography.scss`

This is the primary file to modify. It contains the font family definitions for the v9 theme.

**Current Implementation:**
```scss
$ouiFontFamily: #{"'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"} !default;
$ouiCodeFontFamily: #{"'Source Code Pro', Consolas, Menlo, Courier, monospace"} !default;
```

**New Implementation:**
```scss
$ouiFontFamily: #{"'Roboto Mono', Consolas, Menlo, Courier, monospace"} !default;
$ouiCodeFontFamily: #{"'Roboto Mono', Consolas, Menlo, Courier, monospace"} !default;
```

### File: `src/themes/v9/global_styling/css_variables/_fonts.scss`

This file exposes the SASS variables as CSS custom properties. No changes required as it references the SASS variables dynamically:

```scss
:root {
  --oui-font-family: #{$ouiFontFamily};
  --oui-code-font-family: #{$ouiCodeFontFamily};
}
```

### EUI Aliases

The EUI aliases at the bottom of `_typography.scss` will automatically reflect the new values:

```scss
$euiFontFamily: $ouiFontFamily;
$euiCodeFontFamily: $ouiCodeFontFamily;
```

## Data Models

### Font Stack Structure

The font family value follows a standard CSS font-stack pattern:

| Position | Font | Purpose |
|----------|------|---------|
| 1 | 'Roboto Mono' | Primary font (Google Font) |
| 2 | Consolas | Windows fallback |
| 3 | Menlo | macOS fallback |
| 4 | Courier | Legacy fallback |
| 5 | monospace | Generic fallback |



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the prework analysis, the following correctness properties have been identified:

### Property 1: Dark and Light Theme Font Consistency

*For any* v9 theme variant (dark or light), the compiled CSS output SHALL contain the same `--oui-font-family` value, ensuring typography consistency when switching between theme variants.

**Validates: Requirements 3.1, 3.2**

### Property 2: Theme Isolation

*For any* theme in the OUI framework (default, oui-next, v9), the font family values SHALL be independent, such that modifying the v9 theme's font family does not alter the font family values in other themes.

**Validates: Requirements 5.2, 5.3**

### Property 3: Build Output Correctness

*For any* successful build of the v9 theme, the compiled CSS output SHALL contain 'Roboto Mono' as the first font in the `--oui-font-family` custom property value.

**Validates: Requirements 1.1, 6.3**

## Error Handling

### SASS Compilation Errors

| Error Type | Cause | Resolution |
|------------|-------|------------|
| Undefined variable | Missing import | Ensure `_typography.scss` is imported before use |
| Invalid font-family syntax | Malformed string | Use SASS string interpolation `#{"..."}` |
| Lint errors | Quote style violations | Follow sass-lint rules for quotes |

### Font Loading Failures

The font stack provides graceful degradation:
1. If 'Roboto Mono' fails to load → Consolas (Windows)
2. If Consolas unavailable → Menlo (macOS)
3. If Menlo unavailable → Courier (legacy)
4. Final fallback → generic `monospace`

No application-level error handling is required as CSS handles font fallbacks natively.

## Testing Strategy

### Dual Testing Approach

This feature uses a combination of:
- **Manual verification**: Visual inspection of rendered fonts in the documentation site
- **Build verification**: Automated checks that SASS compiles without errors
- **Lint verification**: Automated SASS linting to ensure code quality

### Verification Steps

1. **SASS Compilation Test**
   - Run `yarn build` to compile all themes
   - Verify no compilation errors occur
   - Check that v9 theme CSS files are generated

2. **Lint Verification**
   - Run `yarn lint` to check SASS lint rules
   - Verify no lint errors in modified files

3. **Visual Verification**
   - Run `yarn start` to start the documentation server
   - Switch to v9 dark theme and verify Roboto Mono is applied
   - Switch to v9 light theme and verify Roboto Mono is applied
   - Switch to default theme and verify original font (Inter UI) is unchanged

4. **Theme Isolation Verification**
   - Inspect compiled CSS for each theme
   - Verify v9 themes contain 'Roboto Mono'
   - Verify default theme contains 'Inter UI'
   - Verify oui-next theme contains its original font

### Test Commands

```bash
# Build verification
yarn build

# Lint verification  
yarn lint

# Visual verification (manual)
yarn start
# Navigate to localhost:8030 and test theme switching
```

### Property-Based Testing Note

Due to the nature of this change (SASS variable modification), traditional property-based testing with randomized inputs is not applicable. The correctness properties are verified through:
- Build output inspection
- CSS value assertions
- Theme isolation checks

These are deterministic checks rather than randomized property tests.
