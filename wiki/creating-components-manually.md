# Creating Components

This guide covers how to create new components in the shadcn-based OUI library.

## Component Structure

Components are organized into two directories:

- `src/components/ui/` - Core shadcn/ui components (built on Radix UI primitives)
- `src/components/custom/` - Custom components and extensions

## Creating a New Component

### 1. Choose the Right Location

- **Use `ui/` for**: Standard shadcn/ui components that are direct ports or close adaptations
- **Use `custom/` for**: OpenSearch-specific components, complex compositions, or heavily customized versions

### 2. Create the Component File

Create `{component-name}.tsx` in the appropriate directory:

```tsx
// src/components/ui/my-component.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const myComponentVariants = cva(
  'base-classes-here',
  {
    variants: {
      variant: {
        default: 'default-styles',
        secondary: 'secondary-styles',
      },
      size: {
        sm: 'small-styles',
        md: 'medium-styles',
        lg: 'large-styles',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {
  // Add custom props here
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(myComponentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

MyComponent.displayName = 'MyComponent'

export { MyComponent, myComponentVariants }
```

### 3. Export the Component

Add the export to `src/components/index.ts`:

```ts
export * from './ui/my-component';
// or
export * from './custom/my-component';
```

### 4. Run the Shadcn Fix Script

After adding a new component (especially if importing from shadcn/ui), run the fix script to ensure proper CSS variable prefixing and import optimization:

```bash
yarn fix:shadcn
```

This script will:
- Prefix any unprefixed CSS variables with `--oui-`
- Update imports from `@/components/ui/ComponentName` to `@/components` for components that have custom versions

### 5. Create Storybook Documentation

Create a story file in the `stories/` directory:

```tsx
// stories/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { MyComponent } from '../src/components'

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'MyComponent',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'MyComponent',
  },
}
```

## Component Guidelines

### TypeScript

- Always use TypeScript
- Extend appropriate HTML element interfaces
- Use `React.forwardRef` for component refs
- Set `displayName` for better debugging

### Styling

- Use Tailwind CSS classes
- Leverage `class-variance-authority` for variants
- Use the `cn()` utility to merge classes
- Follow the existing design system patterns

### Props

- Extend HTML element props where appropriate
- Support common props like `className`, `children`
- Use descriptive prop names and include JSDoc comments

### Testing

Tests should be written in Storybook stories using the `@storybook/test` package for interaction testing and visual regression testing.

## Adding Icons

If you need icons, use `lucide-react`:

```tsx
import { ChevronDown } from 'lucide-react'

// Use in component
<ChevronDown className="h-4 w-4" />
```

## Best Practices

1. **Keep components focused** - Each component should have a single responsibility
2. **Use composition** - Build complex components by composing simpler ones
3. **Follow naming conventions** - Use PascalCase for components, kebab-case for files
4. **Document props** - Use JSDoc comments for complex props
5. **Test in Storybook** - Include comprehensive stories and interaction tests