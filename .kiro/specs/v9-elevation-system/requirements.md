# Requirements Document

## Introduction

The v9 elevation system introduces a structured, DRUIDS-inspired approach to shadows and stacking in the OUI component library. It replaces the current ad-hoc shadow mixins with a 6-level shadow token system, adds theme-aware dark mode shadow handling, provides a `useElevation` React hook for dynamic overlay z-index management, and establishes local elevation conventions for within-component stacking. Shadow strength is intentionally decoupled from stacking order.

## Glossary

- **Shadow_Level**: One of six predefined box-shadow values (1 through 6) representing visual depth. Each level includes a base layer of `0 0 1px rgba(0, 0, 0, 0.1)`.
- **Elevation_System**: The combined set of shadow tokens, CSS custom properties, SASS mixins, and the `useElevation` hook that manage visual depth and stacking.
- **useElevation_Hook**: A React hook that returns a `style` object containing a dynamically assigned `z-index` for overlay components.
- **Elevation_Provider**: A React context provider that tracks open overlay components and assigns incrementing z-index values.
- **Local_Elevation**: Within-component stacking using small z-index values (1–89) and CSS `isolation: isolate` to create contained stacking contexts.
- **Overlay_Component**: A component that renders above the normal document flow (e.g., Modal, Popover, Tooltip, SidePanel).
- **Shadow_Opacity**: The alpha channel value used in shadow `rgba()` definitions — 0.32 for light theme, 0.80 for dark theme.
- **Elevated_Background**: A CSS custom property (`--oui-background-elevated`) that provides contrast for elevated surfaces in dark theme. Has no visual effect in light theme.
- **Elevated_Border**: A CSS custom property (`--oui-border-elevated`) that provides border contrast for elevated surfaces in dark theme. Has no visual effect in light theme.

## Requirements

### Requirement 1: Shadow Level Tokens

**User Story:** As a developer, I want a set of predefined shadow level tokens, so that I can apply consistent elevation shadows across components without defining custom box-shadow values.

#### Acceptance Criteria

1. THE Elevation_System SHALL define six Shadow_Level SASS variables (`$ouiShadow1` through `$ouiShadow6`) in the v9 theme shadow variables file.
2. WHEN a Shadow_Level variable is used, THE Elevation_System SHALL produce a `box-shadow` value consisting of the level-specific shadow and a base layer of `0 0 1px rgba(0, 0, 0, 0.1)`.
3. THE Elevation_System SHALL define the following shadow offset and blur values:
   - Shadow_Level 1: `0 1px 2px`
   - Shadow_Level 2: `0 1px 4px`
   - Shadow_Level 3: `0 2px 8px`
   - Shadow_Level 4: `0 3px 12px`
   - Shadow_Level 5: `0 4px 16px`
   - Shadow_Level 6: `0 5px 24px`
4. THE Elevation_System SHALL provide a SASS mixin `ouiElevation($level)` that applies the corresponding Shadow_Level box-shadow for a given level (1–6).
5. IF an invalid level (outside 1–6) is passed to the `ouiElevation` mixin, THEN THE Elevation_System SHALL emit a SASS warning.

### Requirement 2: Theme-Aware Shadow Opacity

**User Story:** As a developer, I want shadow opacity to automatically adjust between light and dark themes, so that shadows remain visible and appropriate in both contexts.

#### Acceptance Criteria

1. WHILE the light theme is active, THE Elevation_System SHALL use a Shadow_Opacity of 0.32 for all Shadow_Level definitions.
2. WHILE the dark theme is active, THE Elevation_System SHALL use a Shadow_Opacity of 0.80 for all Shadow_Level definitions.
3. THE Elevation_System SHALL define the Shadow_Opacity as a SASS variable (`$ouiShadowOpacity`) that is overridden per theme color file.

### Requirement 3: Dark Theme Elevated Surface Tokens

**User Story:** As a developer, I want CSS custom properties for elevated surface backgrounds and borders in dark theme, so that elevated components have sufficient contrast against the page background.

#### Acceptance Criteria

1. THE Elevation_System SHALL define a CSS custom property `--oui-background-elevated` that provides a lighter background color for elevated surfaces in dark theme.
2. THE Elevation_System SHALL define a CSS custom property `--oui-border-elevated` that provides a visible border color for elevated surfaces in dark theme.
3. WHILE the light theme is active, THE Elevation_System SHALL set `--oui-background-elevated` to `transparent` and `--oui-border-elevated` to `transparent`, producing no visual effect.
4. WHILE the dark theme is active, THE Elevation_System SHALL set `--oui-background-elevated` and `--oui-border-elevated` to values that provide visible contrast against the dark page background.
5. THE Elevation_System SHALL provide a SASS mixin `ouiElevatedSurface` that applies `--oui-background-elevated` as `background-color` and `--oui-border-elevated` as `border-color`.

### Requirement 4: Dynamic Overlay Stacking (useElevation Hook)

**User Story:** As a developer, I want overlay components to automatically stack correctly based on their open order, so that I do not need to manually manage z-index values for modals, popovers, tooltips, and side panels.

#### Acceptance Criteria

1. THE Elevation_Provider SHALL maintain a counter that tracks the current highest z-index assigned to open Overlay_Components.
2. WHEN an Overlay_Component mounts and calls the useElevation_Hook with `{ isEnabled: true }`, THE Elevation_Provider SHALL assign the next available z-index value and return a `style` object containing that z-index.
3. WHEN an Overlay_Component unmounts, THE Elevation_Provider SHALL release the z-index value assigned to that component.
4. WHEN the useElevation_Hook is called with `{ isEnabled: false }`, THE useElevation_Hook SHALL return a `style` object without a z-index property.
5. THE Elevation_Provider SHALL assign z-index values starting from 90 and incrementing by 10 for each new overlay.
6. THE useElevation_Hook SHALL accept an `{ isEnabled }` parameter that defaults to `true`.

### Requirement 5: Local Elevation Conventions

**User Story:** As a developer, I want clear conventions for within-component stacking, so that local z-index values do not conflict with the dynamic overlay system.

#### Acceptance Criteria

1. THE Elevation_System SHALL provide a SASS mixin `ouiLocalElevation` that applies `isolation: isolate` to create a new stacking context.
2. THE Elevation_System SHALL define SASS variables for local z-index values: `$ouiLocalZIndex1: 1`, `$ouiLocalZIndex2: 2`, `$ouiLocalZIndex3: 3`.
3. THE Elevation_System SHALL document that local z-index values used within components stay below 90 to avoid conflicts with the useElevation_Hook starting z-index.

### Requirement 6: Documentation Page

**User Story:** As a developer, I want a documentation page in the OUI docs site that showcases the elevation system, so that I can understand and reference the available shadow levels, elevated surface tokens, and the useElevation hook.

#### Acceptance Criteria

1. THE Elevation_System SHALL provide a documentation page at a route in the OUI docs site that demonstrates all six Shadow_Levels visually.
2. THE documentation page SHALL include an interactive demo of the useElevation_Hook showing dynamic overlay stacking.
3. THE documentation page SHALL include a demo of the elevated surface CSS custom properties in a dark theme context.
4. THE documentation page SHALL include a demo of Local_Elevation conventions using `isolation: isolate`.

### Requirement 7: Shadow and Stacking Independence

**User Story:** As a developer, I want shadow strength to be independent of stacking order, so that I can apply the appropriate visual shadow level without it implying a specific z-index.

#### Acceptance Criteria

1. THE Elevation_System SHALL allow any Shadow_Level (1–6) to be applied to a component regardless of that component's z-index value.
2. THE `ouiElevation` mixin SHALL apply only `box-shadow` and SHALL NOT modify the `z-index` property.
