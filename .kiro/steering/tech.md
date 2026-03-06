# Technology Stack

## Core Technologies

- **React**: v16.12+ (with React 18 support in testing)
- **TypeScript**: v4.7.4 (strict mode enabled)
- **SASS**: For styling with sass-embedded
- **Webpack**: v5 for bundling
- **Babel**: For transpilation

## Build System

- **Package Manager**: Yarn (npm is NOT supported)
- **Node Version**: Defined in `.nvmrc` - use `nvm install && nvm use`
- **Module Formats**: ES modules (es/) and CommonJS (lib/)

## Testing

- **Jest**: Unit testing framework
- **Enzyme**: React component testing (v16)
- **Testing Library**: Modern testing utilities (React 18)
- **Puppeteer**: Accessibility testing with axe-core

## Code Quality

- **ESLint**: With TypeScript, React, and accessibility rules
- **Prettier**: Code formatting
- **sass-lint**: SASS linting

## Common Commands

### Development
```bash
yarn start              # Start docs server at localhost:8030
yarn start-react18      # Start with React 18
```

### Building
```bash
yarn build              # Full build (i18n, clean, compile, themes, charts)
yarn clean              # Clean build artifacts
yarn compile-icons      # Compile icon assets
```

### Testing
```bash
yarn test               # Run lint + unit tests
yarn test-unit          # Run Jest tests
yarn test-unit button   # Run tests matching "button"
yarn test-unit -- -u    # Update snapshots
yarn test-unit -- --watch           # Watch mode
yarn test-unit -- --coverage        # Generate coverage report
yarn test-a11y          # Run accessibility tests
```

### Linting
```bash
yarn lint               # Run all linters (TypeScript, ESLint, SASS)
yarn lint-fix           # Auto-fix ESLint issues
yarn lint-sass-fix      # Auto-fix SASS issues
```

### Component Generation
```bash
yarn yo-component       # Generate new component with Yeoman
yarn yo-doc             # Generate documentation page
```

## TypeScript Configuration

- Strict mode enabled
- ES modules output
- JSX transformed to React.createElement
- Custom type definitions in `src/custom_typings/`
- Declaration files generated

## License Headers

All new files require Apache 2.0 license header:
```javascript
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
```

Modified files require extended header noting OpenSearch modifications.
