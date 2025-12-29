# Testing

## Testing Framework

OUI uses **Vitest** for testing with **@testing-library** for component testing. All tests are written in **Storybook stories** to combine documentation and interaction testing.

## Writing Tests in Storybook

### Basic Story Structure

Create tests as Storybook stories in the `stories/` directory:

```tsx
// stories/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'
import { Button } from '../src/components/ui/button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const WithInteraction: Story = {
  args: {
    children: 'Click me',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')

    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalled()
  },
}
```

### Interaction Testing

Use the `play` function for interaction testing:

```tsx
export const FormInteraction: Story = {
  render: () => (
    <form>
      <input data-testid="name-input" />
      <Button type="submit">Submit</Button>
    </form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const input = canvas.getByTestId('name-input')
    const submit = canvas.getByRole('button')

    await userEvent.type(input, 'John Doe')
    await userEvent.click(submit)

    await expect(input).toHaveValue('John Doe')
  },
}
```

## Running Tests

### Test Commands

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:storybook:watch

# Run Storybook (for visual component review)
yarn start
```

### Test Structure

Tests are organized as:
- **Unit tests**: Component behavior and props
- **Interaction tests**: User interactions via Storybook play functions
- **Accessibility tests**: Built into Storybook with addon-a11y

## Testing Guidelines

### Test Naming

Use descriptive story names that indicate what is being tested:

```tsx
export const Default: Story = { /* basic rendering */ }
export const WithVariants: Story = { /* different variants */ }
export const WithUserInteraction: Story = { /* user interactions */ }
export const WithAccessibilityFeatures: Story = { /* a11y testing */ }
```

### Test Data

Use `data-testid` attributes for reliable element selection:

```tsx
<Button data-testid="submit-button">Submit</Button>

// In test
const button = canvas.getByTestId('submit-button')
```

### Component Props Testing

Test all component variants and props:

```tsx
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-x-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}
```

### Error States

Test error conditions and edge cases:

```tsx
export const WithError: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')

    await expect(button).toBeDisabled()
  },
}
```

## Testing Best Practices

### Test ID Strategy

#### Use `data-test-subj` Attributes
Use descriptive and stable test IDs for reliable testing:

```typescript
// ✅ Good - Descriptive and stable
<Button data-test-subj="workspace-save-button">Save</Button>

// ❌ Avoid - Generic or implementation-dependent
<Button data-test-subj="btn-1">Save</Button>
```

### Component Testing Approach

#### Test Behavior, Not Implementation
Focus on what the component does, not how it does it:

```typescript
// ✅ Good - Test behavior
test('saves workspace when save button is clicked', () => {
  render(<WorkspaceForm />);

  fireEvent.click(screen.getByTestId('workspace-save-button'));

  expect(mockSaveWorkspace).toHaveBeenCalled();
});

// ❌ Avoid - Testing internal state
test('button has correct className', () => {
  render(<Button variant="primary">Save</Button>);

  expect(screen.getByRole('button')).toHaveClass('btn-primary');
});
```

### Do's

- **Use semantic queries**: `getByRole`, `getByLabelText`, `getByText`
- **Test user interactions**: Click, type, hover, focus
- **Test accessibility**: Screen reader compatibility, keyboard navigation
- **Test all variants**: All component props and states
- **Use descriptive test names**: Clear, specific story names
- **Test behavior**: Focus on user outcomes, not implementation details

### Don'ts

- **Don't test implementation details**: Avoid testing internal state or methods
- **Don't use brittle selectors**: Avoid CSS classes or complex selectors
- **Don't skip edge cases**: Test loading, error, and empty states
- **Don't forget accessibility**: Always consider screen readers and keyboard users

## Accessibility Testing

Storybook automatically runs accessibility tests with `@storybook/addon-a11y`:

```tsx
export const AccessibilityExample: Story = {
  args: {
    children: 'Accessible Button',
    'aria-label': 'Close dialog',
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            // Custom accessibility rules
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
}
```

## Migration from Jest

If migrating from Jest-based tests:

1. **Move tests to Storybook stories**
2. **Replace Jest matchers** with Vitest equivalents
3. **Use @testing-library/user-event** instead of Enzyme
4. **Update test commands** in package.json

The new approach provides better integration between documentation and testing.