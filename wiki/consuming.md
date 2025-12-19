# Consuming OUI

## Requirements and dependencies

This shadcn-based version of OUI requires React 16.12 or later and modern browser support. The library is built with TypeScript and uses CSS custom properties for theming.

## What's available

OUI publishes React UI components, JavaScript helpers called services, and utilities for writing Jest tests. Please refer to the [OpenSearch UI website](https://oui.opensearch.org) for comprehensive info on what's available.

OUI is published through [NPM](https://www.npmjs.com/package/@opensearch-project/oui) as a dependency.

### Components

You can import React components from the top-level OUI module. Components follow shadcn/ui patterns and are built on Radix UI primitives.

```js
import {
  Button,
  Alert,
  Card,
} from '@opensearch-project/oui';
```

### Services

Most services are published from the `lib/services` directory. Some are published from their module directories in this directory.

```js
import { keys } from '@opensearch-project/oui/lib/services';
import { Timer } from '@opensearch-project/oui/lib/services/time';
```

### Test

Test utilities are published from the `lib/test` directory.

```js
import { findTestSubject } from '@opensearch-project/oui/lib/test';
```

## Using OUI in a standalone project

You can consume OUI in standalone projects, such as plugins and prototypes.

### Importing styles

Import the compiled CSS that provides Tailwind-based styling for all components:

```js
import '@opensearch-project/oui/style.css';
```

For scoped styles to avoid conflicts with other design systems, use the scoped version and wrap your components with `.oui2` and `.oui2-end` classes:

```js
import '@opensearch-project/oui/style.scoped.css';
```

```jsx
<div className="oui2">
  {/* Your OUI components here */}
  <Button>Click me</Button>
<div className="oui2-end"></div>
</div>
```

#### Important considerations for scoped styles

When using scoped styles, there are some important limitations to be aware of:

**HTML and body styles**: Some expected styles that would normally apply to `html` and `body` elements may not be presented when using scoped styles. This happens because if `.oui2` is used on a descendant element, the scoped styles cannot affect parent elements like `html` or `body`. For the most consistent behavior, consider placing `.oui2` as high up in your DOM tree as possible.

**Background colors**: Since `body` styles are scoped and won't apply unless `.oui2` is placed directly on the `<body>` element, you should use the `.oui2-body` class on your root container to get the expected background color:

```jsx
<div className="oui2 oui2-body">
  {/* Your OUI components here */}
  <Button>Click me</Button>
<div className="oui2-end"></div>
</div>
```

The library supports both light and dark themes through CSS custom properties and the `dark` class.

### Customizing with CSS custom properties

OUI uses CSS custom properties (CSS variables) for theming. You can customize the theme by overriding these variables in your CSS:

```css
:root {
  --oui-severity-low: 120 100% 25%;
  --oui-severity-med: 45 100% 50%;
  --oui-severity-high: 15 100% 55%;
  --oui-severity-critical: 0 85% 60%;
}

.dark {
  --oui-severity-low: 120 50% 40%;
  --oui-severity-med: 45 80% 60%;
  /* ... other dark theme overrides */
}
```

### Using with Tailwind CSS

If your project uses Tailwind CSS, you can extend your configuration to use OUI's design tokens:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'severity-low': 'hsl(var(--oui-severity-low))',
        'severity-med': 'hsl(var(--oui-severity-med))',
        'severity-high': 'hsl(var(--oui-severity-high))',
        'severity-critical': 'hsl(var(--oui-severity-critical))'
      }
    }
  }
}
```

### Fonts

OUI uses system fonts by default for better performance. If you want to customize the font stack, you can override the CSS custom properties or use your own font imports in your CSS.

### Using design tokens in CSS-in-JS

You can access OUI's design tokens through CSS custom properties in your styled-components or other CSS-in-JS solutions:

```js
import styled from 'styled-components';

const CustomComponent = styled.div`
  color: hsl(var(--oui-severity-high));
  /* or use Tailwind utility classes */
`;
```

### "Module build failed" or "Module parse failed: Unexpected token" error

If you get an error when importing a React component, you might need to configure Webpack's `resolve.mainFields` to `['webpack', 'browser', 'main']` to import the components from `lib` instead of `src`. See the [Webpack docs](https://webpack.js.org/configuration/resolve/#resolve-mainfields) for more info.

### Failing icon imports

To reduce OUI's impact to application bundle sizes, the icons are dynamically imported on-demand. This is problematic for some bundlers and/or deployments, so a method exists to preload specific icons an application needs.

```javascript
import { appendIconComponentCache } from '@opensearch-project/oui/es/components/icon/icon';

import { icon as OuiIconArrowDown } from '@opensearch-project/oui/es/components/icon/assets/arrow_down';
import { icon as OuiIconArrowLeft } from '@opensearch-project/oui/es/components/icon/assets/arrow_left';

// One or more icons are passed in as an object of iconKey (string): IconComponent
appendIconComponentCache({
  arrowDown: OuiIconArrowDown,
  arrowLeft: OuiIconArrowLeft,
});
```

## Customizing with `className`

All components accept a `className` prop that gets merged with the component's internal classes using `cn()` (a tailwind-merge utility). You can use Tailwind utility classes or custom CSS classes:

```jsx
<Button className="bg-blue-500 hover:bg-blue-600" />

// Or with custom CSS
<Button className="my-custom-button" />
```

The library uses `class-variance-authority` for component variants, so you can also pass variant props where available:

```jsx
<Button variant="outline" size="sm" />
```

## Using the `test-env` build

OUI provides a separate babel-transformed and partially mocked commonjs build for testing environments in consuming projects. The output is identical to that of `lib/`, but has transformed async functions and dynamic import statements, and also applies some useful mocks. This build mainly targets OpenSearch Dashboard's Jest environment, but may be helpful for testing environments in other projects.

### Mapping to the `test-env` directory

In OpenSearch Dashboard's Jest configuration, the `moduleNameMapper` option is used to resolve standard OUI import statements with `test-env` aliases.

```js
moduleNameMapper: {
  '@opensearch-project/oui$': '<rootDir>/node_modules/@opensearch-project/oui/test-env'
}
```

This eliminates the need to polyfill or transform the OUI build for an environment that otherwise has no need for such processing.

### Mocked component files

Besides babel transforms, the test environment build consumes mocked component files of the type `src/**/[name].testenv.*`. During the build, files of the type `src/**/[name].*` will be replaced by those with the `testenv` namespace. The purpose of this mocking is to further mitigate the impacts of time- and import-dependent rendering, and simplify environment output such as test snapshots. Information on creating mock component files can be found with [testing documentation](testing.md).
