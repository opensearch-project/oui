# Component Design

For information on how to develop components, see the [component development docs][component-development].

We use a number of patterns and conventions throughout our components.

## Size enums

We use abbreviations to refer to sizes, e.g. `xxl`, `xl`, `l`, `m`, `s`, `xs`, and `xxs`.

## Component Variants

We use `class-variance-authority` (CVA) to define component variants with Tailwind CSS classes. Here's how to create variants for a fictional `MegaMenu` component:

```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Define variants using CVA
const megaMenuVariants = cva(
  'base-mega-menu-classes', // base classes applied to all variants
  {
    variants: {
      color: {
        primary: 'bg-primary text-primary-foreground',
        success: 'bg-green-500 text-white',
        warning: 'bg-yellow-500 text-black',
        danger: 'bg-red-500 text-white',
      },
      size: {
        sm: 'px-2 py-1 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
      }
    },
    defaultVariants: {
      color: 'primary',
      size: 'md',
    },
  }
)

// Define props interface extending VariantProps
export interface MegaMenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof megaMenuVariants> {
  isDisabled?: boolean;
}

// Component implementation
export const MegaMenu = React.forwardRef<HTMLDivElement, MegaMenuProps>(
  ({ className, color, size, isDisabled, ...props }, ref) => {
    return (
      <div
        className={cn(
          megaMenuVariants({ color, size }),
          isDisabled && 'opacity-50 pointer-events-none',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

MegaMenu.displayName = 'MegaMenu'
```

## Pass-through props

To give the consumer as much flexibility as possible we use the destructuring assignment to pull
expected props out of the received props and pass `...rest` to one of the elements in the
`render()` method. This element is typically the root element, though in rare cases another element
makes more sense.

The main benefit behind this practice is that the consumer can specify any of
the [DOM attributes](https://reactjs.org/docs/dom-elements.html) supported by React, including
custom ones with the `data-` prefix.

In Typescript, it makes sense to then extend the props of that element when declaring the component's type. OUI also provides a shortlist of commonly used props like `className`, `aria-label`, and `data-test-subj` that you should extend as well.

```jsx
import { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';

export type OuiMegaMenuProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    color: OuiMegaMenuColor;
    isDisabled?: boolean;
    /* ... */
  };

export const OuiMegaMenu: FunctionComponent<OuiMegaMenuProps> = ({
  children,
  className,
  color = 'primary',
  size,
  className,
  isDisabled = false,
  ...rest
}) => {

  // Anything else specified by the consumer will be applied to the div as a DOM attribute.
  return (
    <div {...rest}>
      {/* ... */}
    </div>
  );
}
```

## Naming props

### Enums

String literals should be used wherever possible and prioritized over booleans. This allows for the most extensibility when it comes to adding more features/options in the future. For example, instead of the prop `isHorizontal: boolean` use `layout: 'horizontal' | 'vertical'`.

### Booleans

Generally, boolean props should have an `is` prefix, e.g. `isPlaceholder` or `isReadOnly`. The exception to this is when the prop matches an existing HTML attribute such as `disabled`; to avoid confusion the prop name should align with the HTML specification. Mirroring the attributes this way makes the most sense when the component is a thin wrapper around an existing HTML element, e.g. OuiButton -> `<button>` and OuiRadio ->   `<input type="radio">`.

### Event handlers

All event handlers should take the form `onEvent` and accurately describe when it will be called. e.g. `onClick` indicates the handler is called when the component is clicked, but if there is more granularity the handler should reflect that with `onItemClick`, `onRowClick`, etc.

## Design Principles and Best Practices

### Core Tenets

**Composable Building Blocks**: We provide composable building blocks rather than monolithic prop-driven components, following shadcn/ui's approach of giving developers flexible primitives to build with.

**Vanilla Interface Preservation**: We maintain the vanilla interface of shadcn components as much as possible, ensuring familiar APIs for developers already using shadcn/ui.

### Component Development Guidelines

#### 1. Semantic Theming
- **Never use hard-coded colors** - Always create semantic tokens using CSS custom properties
- This maintains free theming and light/dark mode functionality that comes with Tailwind out of the box
- Example: `text-primary` instead of `text-blue-500`

#### 2. App-Specific Wrapping
- For application-specific needs, wrap primitive shadcn components in thin app-level exports
- Keep the wrapper minimal and focused on the specific use case

#### 3. Leverage the Variants System
- Use `class-variance-authority` for any prop that tweaks component visuals (size, state, colors)
- Almost any visual variation should be controlled via variants rather than direct prop-to-class mapping

```tsx
const buttonVariants = cva('base-button-classes', {
  variants: {
    variant: { primary: '...', secondary: '...' },
    size: { sm: '...', md: '...', lg: '...' },
    state: { default: '...', loading: '...', disabled: '...' }
  }
})
```

#### 4. Create Utility Classes for Patterns
- Create Tailwind utility classes for shared patterns rather than duplicating long class strings:

```css
@utility ui-card {
  @apply rounded-xl bg-card shadow-md;
}
```

#### 5. Standard Props Support
- **Always allow `className`** for custom styling
- **Support `asChild` prop** where possible for composition flexibility
- Example implementation:

```tsx
export interface ButtonProps
  extends React.ComponentProps<"button"> {
  asChild?: boolean;
  // other props...
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
```

#### 6. HTML-Native Interfaces
- Make building blocks emulate native HTML components as closely as possible
- Use `React.ComponentProps<"element">` to extend the appropriate HTML element interface
- Example: `interface ButtonProps extends React.ComponentProps<"button"> { ... }`

#### 7. Prefer Slot-Based APIs
- Use slot-based composition patterns where appropriate
- This provides more flexibility than prop-based APIs for complex components

#### 8. Tailwind Organization
- Use the Tailwind ESLint plugin to help organize className strings
- Follow consistent ordering: layout → positioning → sizing → colors → effects
- Create Tailwind presets for shared theme variables across multiple packages

## Common Props

All components should support these standard props:

- `className` - For custom styling via Tailwind or CSS classes
- `children` - For content composition
- `asChild` - For composition flexibility (where applicable)
- Standard HTML attributes appropriate to the underlying element

[component-development]: component-development.md
