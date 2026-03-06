# Implementation Plan: V9 Elevation System

## Overview

Implement the v9 elevation system in four phases: SASS shadow tokens and mixins, dark theme elevated surface CSS custom properties, the React `useElevation` hook with context provider, and the documentation page. Each phase builds on the previous, with tests co-located alongside implementation.

## Tasks

- [x] 1. Implement shadow level tokens and elevation mixin
  - [x] 1.1 Update v9 shadow variables (`src/themes/v9/global_styling/variables/_shadows.scss`)
    - Add `$ouiShadowOpacity: 0.32 !default` variable
    - Add `$ouiShadowBase` variable for the base layer `0 0 1px rgba(0, 0, 0, 0.1)`
    - Add `$ouiShadow1` through `$ouiShadow6` variables using `$ouiShadowOpacity`
    - Add `$ouiLocalZIndex1: 1`, `$ouiLocalZIndex2: 2`, `$ouiLocalZIndex3: 3`
    - _Requirements: 1.1, 1.2, 1.3, 5.2_

  - [x] 1.2 Add `ouiElevation`, `ouiLocalElevation`, and `ouiElevatedSurface` mixins to v9 shadow mixin file (`src/themes/v9/global_styling/mixins/_shadow.scss`)
    - Add `@mixin ouiElevation($level)` with level 1–6 lookup and `@warn` for invalid levels
    - Add `@mixin ouiLocalElevation` that applies `isolation: isolate`
    - Add `@mixin ouiElevatedSurface` that applies `background-color: var(--oui-background-elevated)` and `border-color: var(--oui-border-elevated)`
    - _Requirements: 1.4, 1.5, 3.5, 5.1_

  - [ ]* 1.3 Write property test for shadow mixin correctness
    - **Property 1: Shadow mixin produces correct box-shadow with base layer**
    - **Validates: Requirements 1.2, 1.4, 7.2**

- [x] 2. Implement theme-aware shadow opacity and elevated surface tokens
  - [x] 2.1 Override `$ouiShadowOpacity` in dark theme color file (`src/themes/v9/v9_colors_dark.scss`)
    - Add `$ouiShadowOpacity: 0.80;` before shadow variables are imported
    - _Requirements: 2.2, 2.3_

  - [x] 2.2 Create elevation CSS custom properties file (`src/themes/v9/global_styling/css_variables/_elevation.scss`)
    - Define `:root` block with `--oui-background-elevated: transparent` and `--oui-border-elevated: transparent` (light theme defaults)
    - Import in `src/themes/v9/global_styling/css_variables/_index.scss`
    - _Requirements: 3.1, 3.2, 3.3_

  - [x] 2.3 Add dark theme elevated surface overrides
    - In `v9_colors_dark.scss` or a dark-theme-specific CSS variables block, set `--oui-background-elevated` to `$ouiColorLightShade` and `--oui-border-elevated` to a visible slate border value
    - _Requirements: 3.4_

  - [ ]* 2.4 Write property test for theme-aware shadow opacity
    - **Property 2: Theme-aware shadow opacity**
    - **Validates: Requirements 2.1, 2.2**

- [x] 3. Checkpoint
  - Ensure all SASS compiles correctly, all tests pass, ask the user if questions arise.

- [x] 4. Implement useElevation hook and ElevationProvider
  - [x] 4.1 Create elevation context and provider (`src/services/elevation/`)
    - Create `elevation_context.ts` with `ElevationContextValue` interface and React context
    - Create `elevation_provider.tsx` with `OuiElevationProvider` component that manages a ref-based counter starting at 90, incrementing by 10
    - Create `use_elevation.ts` hook that consumes the context, calls `register`/`unregister` on mount/unmount, and returns `{ style: { zIndex } }` or `{ style: {} }` based on `isEnabled`
    - Create `index.ts` barrel export
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [x] 4.2 Export elevation service from `src/services/index.ts`
    - Add exports for `OuiElevationProvider`, `useElevation`, and related types
    - _Requirements: 4.1_

  - [ ]* 4.3 Write property test for sequential z-index assignment
    - **Property 3: Sequential z-index assignment**
    - **Validates: Requirements 4.1, 4.2, 4.5**

  - [ ]* 4.4 Write property test for z-index cleanup on unmount
    - **Property 4: Z-index cleanup on unmount**
    - **Validates: Requirements 4.3**

  - [ ]* 4.5 Write unit tests for useElevation edge cases
    - Test `useElevation({ isEnabled: false })` returns empty style
    - Test `useElevation()` defaults isEnabled to true
    - Test hook outside provider returns empty style with console warning
    - _Requirements: 4.4, 4.6_

- [x] 5. Checkpoint
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Create documentation page
  - [x] 6.1 Create shadow levels demo (`src-docs/src/views/elevation/elevation_shadows.tsx`)
    - Render six cards, each with a different shadow level applied, labeled with level number and use case
    - _Requirements: 6.1_

  - [x] 6.2 Create elevated surfaces demo (`src-docs/src/views/elevation/elevation_dark_theme.tsx`)
    - Show elevated surface tokens in a dark theme context with `--oui-background-elevated` and `--oui-border-elevated`
    - _Requirements: 6.3_

  - [x] 6.3 Create useElevation hook demo (`src-docs/src/views/elevation/elevation_use_elevation.tsx`)
    - Interactive demo with buttons that open stacked overlays demonstrating automatic z-index assignment
    - _Requirements: 6.2_

  - [x] 6.4 Create local elevation demo (`src-docs/src/views/elevation/elevation_local.tsx`)
    - Demo showing within-component stacking using `ouiLocalElevation` and `$ouiLocalZIndex` variables
    - _Requirements: 6.4_

  - [x] 6.5 Create example definition file and register route (`src-docs/src/views/elevation/elevation_example.js`)
    - Export `ElevationExample` with sections for each demo
    - Add import and route entry in `src-docs/src/routes.js`
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 7. Final checkpoint
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests use fast-check with minimum 100 iterations
- SASS tests compile SCSS snippets and verify CSS output
- All new files require Apache 2.0 license headers
