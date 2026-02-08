# Requirements Document

## Introduction

This feature adds a comprehensive set of DRUIDS-inspired scaffolding color CSS custom properties to the OUI v9 theme. These tokens provide semantic color abstractions for backgrounds, borders, placeholders, and AI-specific surfaces, enabling consistent theming across light and dark modes. The tokens are defined as CSS custom properties (prefixed `--oui-`) backed by SASS variables, following the existing v9 theme patterns established by the elevation system.

## Glossary

- **Scaffolding_Colors**: A set of CSS custom properties that define semantic color roles for structural UI elements (backgrounds, borders, placeholders) rather than raw color values.
- **CSS_Custom_Property**: A CSS variable declared with `--` prefix on `:root`, enabling runtime theme switching and component-level overrides.
- **SASS_Variable**: A compile-time variable (prefixed `$oui`) that provides the default value for a CSS custom property and supports the `!default` pattern for theme overrides.
- **V9_Theme**: The current generation theme in OUI, using Slate-based color palettes and modern design tokens.
- **Light_Theme**: The default OUI color mode, using light backgrounds (white/Slate-50) and dark text.
- **Dark_Theme**: The alternate color mode defined in `v9_colors_dark.scss`, using dark backgrounds (Slate-950/900) and light text.
- **Elevation_System**: The existing CSS custom property system in `_elevation.scss` that defines `--oui-background-elevated` and `--oui-border-elevated`.
- **Shade_Appearance**: A visual treatment used by components like Toast and Tooltip that inverts the typical background/foreground relationship (dark background in light theme, lighter background in dark theme).
- **Placeholder_Element**: Block-style loading skeleton elements (e.g., OuiLoadingContent, OuiTextPlaceholder) that use a neutral fill color to indicate pending content.
- **AI_Surface**: A background color specifically designated for AI-related interaction areas within the UI.

## Requirements

### Requirement 1: Define Scaffolding Color SASS Variables with Light Theme Defaults

**User Story:** As a theme developer, I want scaffolding color SASS variables defined with `!default` values for the light theme, so that the dark theme can override them before they are consumed.

#### Acceptance Criteria

1. THE Scaffolding_Colors module SHALL define a SASS variable `$ouiBackgroundColor` with a `!default` value matching the light theme standard background (`$ouiColorEmptyShade`).
2. THE Scaffolding_Colors module SHALL define a SASS variable `$ouiBackgroundSecondary` with a `!default` value providing subtle contrast against the standard background in the light theme (`$ouiColorLightestShade`).
3. THE Scaffolding_Colors module SHALL define a SASS variable `$ouiBackgroundTertiary` with a `!default` value providing stronger contrast than secondary in the light theme (`$ouiColorLightShade`).
4. THE Scaffolding_Colors module SHALL define a SASS variable `$ouiBackgroundShade` with a `!default` value appropriate for shade-appearance components in the light theme (`$ouiColorDarkestShade`).
5. THE Scaffolding_Colors module SHALL define a SASS variable `$ouiPlaceholderColor` with a `!default` value appropriate for loading placeholder elements in the light theme.
6. THE Scaffolding_Colors module SHALL define a SASS variable `$ouiAiBackgroundPrimary` with a `!default` value for the primary AI interaction surface in the light theme.
7. THE Scaffolding_Colors module SHALL define a SASS variable `$ouiAiBackgroundSecondary` with a `!default` value for the secondary AI interaction surface in the light theme.

### Requirement 2: Define Dark Theme Overrides for Scaffolding Color SASS Variables

**User Story:** As a theme developer, I want dark theme overrides for all scaffolding color SASS variables, so that the scaffolding tokens produce appropriate contrast in dark mode.

#### Acceptance Criteria

1. WHEN the dark theme color file is loaded, THE Dark_Theme SHALL set `$ouiBackgroundColor` to the dark theme standard background value (`$ouiColorEmptyShade`, Slate-950).
2. WHEN the dark theme color file is loaded, THE Dark_Theme SHALL set `$ouiBackgroundSecondary` to a value providing subtle contrast against the dark standard background (`$ouiColorLightestShade`, Slate-900).
3. WHEN the dark theme color file is loaded, THE Dark_Theme SHALL set `$ouiBackgroundTertiary` to a value providing stronger contrast than secondary in the dark theme (`$ouiColorLightShade`, Slate-800).
4. WHEN the dark theme color file is loaded, THE Dark_Theme SHALL set `$ouiBackgroundShade` to a value appropriate for shade-appearance components in the dark theme (lighter than the standard dark background).
5. WHEN the dark theme color file is loaded, THE Dark_Theme SHALL set `$ouiPlaceholderColor` to a value appropriate for loading placeholder elements in the dark theme.
6. WHEN the dark theme color file is loaded, THE Dark_Theme SHALL set `$ouiAiBackgroundPrimary` to a value appropriate for the primary AI interaction surface in the dark theme.
7. WHEN the dark theme color file is loaded, THE Dark_Theme SHALL set `$ouiAiBackgroundSecondary` to a value appropriate for the secondary AI interaction surface in the dark theme.

### Requirement 3: Expose Scaffolding Colors as CSS Custom Properties

**User Story:** As a component developer, I want scaffolding colors available as CSS custom properties on `:root`, so that I can reference them in component styles and they automatically adapt to the active theme.

#### Acceptance Criteria

1. THE Scaffolding_Colors module SHALL declare `--oui-background` on `:root` with the value of `$ouiBackgroundColor`.
2. THE Scaffolding_Colors module SHALL declare `--oui-background-secondary` on `:root` with the value of `$ouiBackgroundSecondary`.
3. THE Scaffolding_Colors module SHALL declare `--oui-background-tertiary` on `:root` with the value of `$ouiBackgroundTertiary`.
4. THE Scaffolding_Colors module SHALL declare `--oui-background-shade` on `:root` with the value of `$ouiBackgroundShade`.
5. THE Scaffolding_Colors module SHALL declare `--oui-border` on `:root` with the value of `$ouiBorderColor`.
6. THE Scaffolding_Colors module SHALL declare `--oui-placeholder` on `:root` with the value of `$ouiPlaceholderColor`.
7. THE Scaffolding_Colors module SHALL declare `--oui-ai-background-primary` on `:root` with the value of `$ouiAiBackgroundPrimary`.
8. THE Scaffolding_Colors module SHALL declare `--oui-ai-background-secondary` on `:root` with the value of `$ouiAiBackgroundSecondary`.

### Requirement 4: Reconcile with Existing Elevation CSS Custom Properties

**User Story:** As a theme maintainer, I want the new scaffolding color system to coexist with the existing elevation CSS custom properties (`--oui-background-elevated` and `--oui-border-elevated`), so that there is no duplication or conflict.

#### Acceptance Criteria

1. THE Scaffolding_Colors module SHALL NOT re-declare `--oui-background-elevated` or `--oui-border-elevated`, since the Elevation_System already defines these properties.
2. THE Scaffolding_Colors module SHALL be imported after the Elevation_System in the CSS variables index, so that both sets of properties are available together.
3. WHEN a component references elevated background or border tokens, THE component SHALL continue to use `--oui-background-elevated` and `--oui-border-elevated` from the Elevation_System.

### Requirement 5: Follow OUI File and Naming Conventions

**User Story:** As a contributor, I want the new scaffolding color files to follow established OUI conventions, so that the codebase remains consistent and maintainable.

#### Acceptance Criteria

1. THE new SCSS file for scaffolding color CSS custom properties SHALL be named `_scaffolding_colors.scss` and placed in `src/themes/v9/global_styling/css_variables/`.
2. THE new SCSS file SHALL include the Apache 2.0 license header required by the project.
3. THE CSS custom property names SHALL use the `--oui-` prefix followed by kebab-case naming.
4. THE SASS variable names SHALL use the `$oui` prefix followed by camelCase naming and the `!default` flag for light theme defaults.
5. WHEN dark theme overrides are added to `v9_colors_dark.scss`, THE overrides SHALL NOT use the `!default` flag, ensuring they take precedence over light theme defaults.
