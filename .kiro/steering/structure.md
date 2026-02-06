# Project Structure

## Root Organization

```
oui/
├── src/                    # Source code for components
├── src-docs/               # Documentation site
├── packages/               # Standalone packages
├── scripts/                # Build and utility scripts
├── generator-oui/          # Yeoman generators
└── wiki/                   # Development guides
```

## Component Structure

Components live in `src/components/{component_name}/`:

```
src/components/button/
├── _index.scss            # Imports all component SCSS
├── _button.scss           # Component styles
├── button.tsx             # Main component
├── button.test.tsx        # Tests
├── index.ts               # Exports
└── __snapshots__/         # Jest snapshots
```

### Component File Conventions

1. **SCSS Files**: Prefixed with underscore (`_button.scss`)
2. **React Components**: TypeScript files (`.tsx` or `.ts`)
3. **Tests**: Named `{component}.test.tsx` in same directory
4. **Exports**: All exports through `index.ts`
5. **Snapshots**: Auto-generated in `__snapshots__/`

### Logically-Grouped Components

Related components share a directory:
- Subcomponents: `<OuiToolBar>` and `<OuiToolBarSearch>`
- Tightly-coupled: `<OuiButton>` and `<OuiButtonGroup>`
- Related inputs: `<OuiTextInput>`, `<OuiTextArea>`, `<OuiCheckBox>`

## Documentation Structure

Documentation lives in `src-docs/src/views/{component_name}/`:

```
src-docs/src/views/button/
├── button_example.js      # Example definitions
├── button_basic.tsx       # Example implementations
└── button_advanced.tsx
```

Routes defined in `src-docs/src/services/routes/routes.js`.

## Key Directories

### `src/components/`
All React components with co-located styles and tests.

### `src/services/`
Utility functions and hooks:
- `accessibility/` - A11y helpers
- `color/` - Color utilities
- `hooks/` - Custom React hooks
- `format/` - Formatting utilities

### `src/themes/`
Theme definitions:
- `oui/` - Default theme
- `oui-next/` - Next generation theme
- `v9/` - Version 9 theme
- `charts/` - Chart theming

### `src/global_styling/`
Global SASS utilities:
- `mixins/` - Reusable SASS mixins
- `variables/` - SASS variables
- `functions/` - SASS functions
- `utility/` - Utility classes

### `packages/`
Standalone packages:
- `opensearch-datemath/` - Date math utilities
- `react-datepicker/` - Datepicker component
- `eslint-plugin/` - Custom ESLint rules

### `scripts/`
Build tooling:
- `babel/` - Babel plugins and transforms
- `jest/` - Jest configuration
- `compile-*.js` - Build scripts

## Import/Export Pattern

1. Component exports from `src/components/{name}/index.ts`
2. Re-exported from `src/components/index.js`
3. Available as `import { Component } from '@opensearch-project/oui'`

## Testing Files

- Unit tests: Co-located with components (`*.test.tsx`)
- Test utilities: `src/test/`
- Jest config: `scripts/jest/config.json`
- Mock files: Use `*.testenv.*` namespace

## TypeScript Definitions

- Main types: `oui.d.ts` (generated)
- Custom types: `src/custom_typings/`
- Component props: Defined in component files
