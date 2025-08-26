Migration Guide: Enzyme to React Testing Library

This guide outlines the process of migrating tests from Enzyme to React Testing Library (RTL) to support both React 16 and React 18.

## Important Rules

These are rules that should not be broken without confirmation:

1. **Don't change source code** - The migration should only affect test files, not the actual component code.
2. **Don't change test names** - Keep the original test names and structure to maintain consistency.
3. **Understand snapshot differences** - When snapshots don't match, understand and document why before updating them.
4. **Preserve formatting** - Don't remove newlines unnecessarily to keep diffs simple and focused on the actual changes.
5. **Never skip any tests** - Don't mark tests to skip them; instead, revert any changes and mark the test in the pending tests list.
6. **Don't delete pending tests list in this guide** - Keep it up to date, but don't delete it.
7. **Confirm any updates to this guide** - Keep it up to date, but don't delete it.

## Setup

1. Install React Testing Library dependencies:

```bash
yarn add -D @testing-library/react@12.1.5 @testing-library/jest-dom @testing-library/user-event
```

Note: We're using version 12.1.5 of @testing-library/react which is compatible with React 16.

2. Create a setup file for React Testing Library:

```javascript
// scripts/jest/setup/testing-library.js
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configure RTL to use data-test-subj as the testIdAttribute
configure({
  testIdAttribute: 'data-test-subj',
});
```

3. Update Jest configurations to include the RTL setup file:

```json
// scripts/jest/config.json and scripts/jest/config-react18.json
{
  "setupFilesAfterEnv": [
    "<rootDir>/scripts/jest/setup/mocks.js",
    "<rootDir>/scripts/jest/setup/polyfills.js",
    "<rootDir>/scripts/jest/setup/unmount_enzyme.js",
    "<rootDir>/scripts/jest/setup/testing-library.js"
  ]
}
```

4. **Optional**: Create utility functions for RTL if needed for complex test setups. Most tests can use RTL methods directly:

```typescript
// Example: Custom render with providers (create only if needed)
const renderWithProviders = (ui: React.ReactElement) => {
  return render(ui, { wrapper: SomeProvider });
};
```

## Migration Patterns

### Imports

**Enzyme:**
```typescript
import { render, mount } from 'enzyme';
```

**RTL:**
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
```

### Rendering Components

**Enzyme:**
```typescript
const component = render(<Component {...props} />);
// or
const component = mount(<Component {...props} />);
```

**RTL:**
```typescript
const { container } = render(<Component {...props} />);
```

### Snapshot Testing

**Enzyme:**
```typescript
expect(component).toMatchSnapshot();
```

**RTL:**
```typescript
expect(container).toMatchSnapshot();
```

**RTL (for Portal Components):**
```typescript
// For components that render into portals (modals, overlays, tooltips)
expect(document.body).toMatchSnapshot();
```

### Finding Elements

**Enzyme:**
```typescript
component.find('button');
component.find('.class-name');
component.find('[data-test-subj="my-element"]');
```

**RTL:**
```typescript
screen.getByRole('button');
container.querySelector('.class-name');
screen.getByTestId('my-element');
```

### Simulating Events

**Enzyme:**
```typescript
component.find('button').simulate('click');
```

**RTL (Preferred - userEvent):**
```typescript
const user = userEvent.setup();
await user.click(screen.getByRole('button'));
```

**RTL (Alternative - fireEvent):**
```typescript
fireEvent.click(screen.getByRole('button'));
```

**When to use each:**
- Use `userEvent` for realistic user interactions (preferred)
- Use `fireEvent` for lower-level events or when `userEvent` causes issues in React 18

### Checking Props and State

**Enzyme:**
```typescript
expect(component.find('button').prop('disabled')).toBe(true);
```

**RTL:**
```typescript
expect(screen.getByRole('button')).toBeDisabled();
```

## Example Migration

### Original Enzyme Test

```typescript
import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { OuiButton } from './button';

describe('OuiButton', () => {
  test('is rendered', () => {
    const component = render(<OuiButton {...requiredProps}>Content</OuiButton>);
    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('onClick', () => {
      it('supports onClick as a button', () => {
        const handler = jest.fn();
        const component = mount(<OuiButton onClick={handler} />);
        component.find('button').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });
    });
  });
});
```

### Migrated RTL Test

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { requiredProps } from '../../test/required_props';

import { OuiButton } from './button';

describe('OuiButton', () => {
  test('is rendered', () => {
    const { container } = render(<OuiButton {...requiredProps}>Content</OuiButton>);
    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    describe('onClick', () => {
      it('supports onClick as a button', async () => {
        const handler = jest.fn();
        render(<OuiButton onClick={handler} />);

        const user = userEvent.setup();
        await user.click(screen.getByRole('button'));

        expect(handler).toHaveBeenCalledTimes(1);
      });
    });
  });
});
```

## Common Migration Patterns

### Using `act()` for State Updates

Import `act` from RTL when you need to handle state updates or async operations:

```typescript
import { render, fireEvent, act } from '@testing-library/react';

// For focus operations
act(() => {
  element.focus();
});

// For programmatic state changes
act(() => {
  someStateChangeFunction();
});
```

### Event Handling Patterns

**For simple clicks:**
```typescript
fireEvent.click(element);
```

**For complex user interactions:**
```typescript
const user = userEvent.setup();
await user.click(element);
```

**For keyboard events:**
```typescript
fireEvent.keyDown(element, { key: 'Escape' });
```

### Async Testing Patterns

**Waiting for elements to appear:**
```typescript
import { waitFor } from '@testing-library/react';

// Wait for element to appear
await waitFor(() => {
  expect(screen.getByText('Loading complete')).toBeInTheDocument();
});

// Wait for focus to change
await waitFor(() => {
  expect(document.activeElement).toEqual(expectedElement);
});
```

**Testing focus management:**
```typescript
// Focus tests often need waitFor in React 18
const button = screen.getByRole('button');
await waitFor(() => {
  expect(document.activeElement).toEqual(button);
});
```

### Finding Elements

**By role (preferred):**
```typescript
screen.getByRole('button')
screen.getByRole('textbox')
```

**By test ID:**
```typescript
screen.getByTestId('my-element')  // finds data-test-subj="my-element"
// Or destructure from render result
const { getByTestId } = render(<Component />);
getByTestId('my-element')
```

**By text content:**
```typescript
screen.getByText('Button Text')
```

**Direct DOM queries (when needed):**
```typescript
container.querySelector('.class-name')
// Or use getByTestId with data-test-subj
const { getByTestId } = render(<Component />);
getByTestId('my-test-id')  // finds data-test-subj="my-test-id"
```

## Notes

1. When migrating tests and encountering snapshot differences:
   - First, analyze and document the differences in your PR or commit message
   - Explain why the differences are expected and not functional changes
   - Only then update the snapshots with:
   ```bash
   yarn test-unit -u path/to/test/file
   ```

2. RTL wraps rendered components in a `<div>` container, which will cause snapshot differences.

3. For tests that are too complex to migrate, revert any changes and add them to the "Tests Pending Migration" section at the end of this guide for future work.

4. The tests should pass with React 16 (`yarn test-unit`) first, and then we can work on making them pass with React 18.

5. For React 18 compatibility, RTL automatically handles most `act()` wrapping, but you may need explicit `act()` calls for:
   - Focus operations
   - Programmatic state changes
   - Timer-based operations

## Services/React Mock for React 18

For tests that use components which internally call `enqueueStateChange` from `src/services/react.ts`, you may encounter React 18 `act()` warnings. This mock ensures proper wrapping of state changes:

```typescript
jest.mock('../../services/react', () => {
  const originalModule = jest.requireActual('../../services/react');
  const { act } = jest.requireActual('../../test/react_test_utils');
  return {
    ...originalModule,
    enqueueStateChange: (fn: Function) => {
      act(() => {
        fn();
      });
    },
  };
});

// Don't forget to add cleanup
afterAll(() => {
  jest.restoreAllMocks();
});
```

**When to use this mock:**
- Components use `enqueueStateChange` internally
- You see React 18 `act()` warnings about state updates
- Tests involve async state changes or timers

**Benefits:**
- Wraps all `enqueueStateChange` calls in `act()` to prevent React 18 warnings
- Works with both React 16 and React 18
- Ensures proper cleanup after tests

### Example Usage

```typescript
import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../../services/react', () => {
  const originalModule = jest.requireActual('../../services/react');
  const { act } = jest.requireActual('../../test/react_test_utils');
  return {
    ...originalModule,
    enqueueStateChange: (fn: Function) => {
      act(() => {
        fn();
      });
    },
  };
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('MyComponent', () => {
  test('renders without act warnings', () => {
    const { container } = render(<MyComponent />);
    expect(container).toMatchSnapshot();
  });
});
```

## Understanding Snapshot Differences

When migrating from Enzyme to RTL, you'll notice several consistent differences in snapshots:

1. **Container div**: RTL wraps components in a `<div>` container, which will appear in all snapshots.
   ```html
   + <div>
       <button>...</button>
     </div>
   ```

2. **Style formatting**: RTL formats inline styles differently than Enzyme.
   ```html
   - style="background-color:#d3dae6;color:#000"
   + style="background-color: rgb(211, 218, 230); color: rgb(0, 0, 0);"
   ```

3. **Additional attributes**: RTL may include additional attributes like `title` that weren't in the Enzyme snapshots.
   ```html
   + title="Content"
   ```

4. **Spacing and formatting**: There may be minor differences in spacing and formatting.

**For portal components (modals, tooltips, overlays):**
- Use `expect(document.body).toMatchSnapshot()` instead of `expect(container).toMatchSnapshot()`
- These components render outside the container div

Before updating snapshots with `yarn test-unit -u`, make sure you understand these differences and confirm they're expected changes from the migration rather than actual functional changes.

## React 18 Specific Considerations

When migrating tests to work with React 18, you may encounter additional challenges:

1. **Act Warnings**: React 18 is more strict about wrapping state updates in `act()`. RTL handles most cases automatically, but you may need explicit `act()` for:

```typescript
import { act } from '@testing-library/react';

// For focus operations
act(() => {
  element.focus();
});

// For programmatic state changes
act(() => {
  component.setState({ value: 'new' });
});

// For timer-based operations
act(() => {
  jest.advanceTimersByTime(1000);
});
```

2. **Event Handling**: Prefer `fireEvent` over `userEvent` in React 18 tests to avoid complex async behavior:

```typescript
// Recommended for React 18
fireEvent.click(element);
fireEvent.keyDown(element, { key: 'Escape' });

// Use userEvent only when realistic user simulation is critical
const user = userEvent.setup();
await user.click(element);
```

3. **Focus Management**: Focus-related tests may need explicit `act()` wrapping:
   - Use `act()` to wrap focus operations
   - Use `waitFor` for focus assertions that might be async
   - Consider using `HTMLElement` type assertions when working with DOM elements

4. **Component Mocking**: Avoid adding custom attributes to DOM elements in mocks, as this can cause React warnings in React 18.

## Tests Pending Migration

This section tracks tests that were too complex to migrate or had issues during migration. These tests should be revisited in the future.

| Component | Test File | Issue Description | Migration Status |
|-----------|-----------|-------------------|------------------|

