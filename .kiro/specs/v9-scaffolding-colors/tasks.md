# Implementation Plan: V9 Scaffolding Colors

## Overview

Add DRUIDS-inspired scaffolding color CSS custom properties to the OUI v9 theme. Implementation follows the existing elevation system pattern: SASS variables with `!default` in the light theme defaults, overrides in the dark theme color file, and a CSS custom properties file that maps them to `:root`.

## Tasks

- [x] 1. Define light theme SASS variable defaults
  - [x] 1.1 Add scaffolding color SASS variables to `src/themes/v9/global_styling/variables/_colors.scss`
    - Add `$ouiBackgroundColor`, `$ouiBackgroundSecondary`, `$ouiBackgroundTertiary`, `$ouiBackgroundShade`, `$ouiPlaceholderColor`, `$ouiAiBackgroundPrimary`, `$ouiAiBackgroundSecondary` with `!default` flag
    - Place after existing `$ouiPageBackgroundColor` / `$ouiColorHighlight` declarations, before computed text color variables
    - Add corresponding `$eui*` aliases in the OUI -> EUI Aliases section
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 5.4_

- [x] 2. Define dark theme SASS variable overrides
  - [x] 2.1 Add scaffolding color overrides to `src/themes/v9/v9_colors_dark.scss`
    - Set `$ouiBackgroundColor`, `$ouiBackgroundSecondary`, `$ouiBackgroundTertiary`, `$ouiBackgroundShade`, `$ouiPlaceholderColor`, `$ouiAiBackgroundPrimary`, `$ouiAiBackgroundSecondary` without `!default`
    - Place alongside existing `$ouiBackgroundElevated` / `$ouiBorderElevated` overrides
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 5.5_

- [x] 3. Create CSS custom properties file and wire into index
  - [x] 3.1 Create `src/themes/v9/global_styling/css_variables/_scaffolding_colors.scss`
    - Include Apache 2.0 license header
    - Declare all 8 CSS custom properties on `:root` mapping from SASS variables
    - Do NOT declare `--oui-background-elevated` or `--oui-border-elevated`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 4.1, 5.1, 5.2, 5.3_
  - [x] 3.2 Update `src/themes/v9/global_styling/css_variables/_index.scss` to import `scaffolding_colors` after `elevation`
    - _Requirements: 4.2_

- [x] 4. Checkpoint - Verify SASS compilation
  - Ensure both `src/theme_v9_light.scss` and `src/theme_v9_dark.scss` compile without errors, ask the user if questions arise.

- [ ] 5. Add tests for scaffolding colors
  - [x] 5.1 Install fast-check as a dev dependency
    - Run `yarn add --dev fast-check`
  - [ ] 5.2 Create test file `src/themes/v9/global_styling/css_variables/_scaffolding_colors.test.ts`
    - Write SASS compilation helper that compiles a theme entry point and returns CSS string
    - Write unit tests verifying light theme CSS output contains all 8 custom properties with expected values
    - Write unit tests verifying dark theme CSS output contains all 8 custom properties with expected dark values
    - Write unit test verifying scaffolding file output does not contain `--oui-background-elevated` or `--oui-border-elevated`
    - Write unit test verifying `_index.scss` imports `scaffolding_colors` after `elevation`
    - _Requirements: 1.1–1.7, 2.1–2.7, 3.1–3.8, 4.1, 4.2, 5.1, 5.2_
  - [ ]* 5.3 Write property test: CSS custom property naming convention
    - **Property 1: CSS custom property naming convention**
    - Parse compiled CSS output, extract all `--oui-` properties from the scaffolding block, verify each matches `--oui-[a-z0-9-]+` pattern
    - **Validates: Requirements 5.3**
  - [ ]* 5.4 Write property test: Dark theme overrides omit !default
    - **Property 2: Dark theme scaffolding overrides omit !default**
    - Parse `v9_colors_dark.scss` source, extract scaffolding variable declarations, verify none contain `!default`
    - **Validates: Requirements 5.5**
  - [ ]* 5.5 Write property test: Light theme defaults use !default
    - **Property 3: Light theme scaffolding defaults use !default**
    - Parse `_colors.scss` source, extract scaffolding variable declarations, verify all contain `!default`
    - **Validates: Requirements 5.4**

- [ ] 6. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The existing `--oui-background-elevated` and `--oui-border-elevated` in `_elevation.scss` are intentionally left untouched
- Property tests validate naming conventions across all tokens rather than checking individual values
