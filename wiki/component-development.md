# Component Development

This guide covers how to add new components to the OUI package, following our established patterns and best practices.

For information on component design principles and patterns, see the [component design docs][component-design].

## Component Architecture

Our component library follows a two-tier architecture:

- **`src/components/ui/`** - Base components from shadcn/ui with minimal modifications
- **`src/components/custom/`** - Enhanced components with OUI-specific styling and functionality

## Development Environment Setup

### Launching Storybook

To view component documentation and examples, start Storybook:

```shell
yarn
yarn start
```

This will launch Storybook at [http://localhost:8030/](http://localhost:8030/). The development server watches for changes to source files and automatically recompiles components and updates documentation when you make changes.

## Adding a New Component

### Step 1: Add Base Component with shadcn CLI

Use the shadcn CLI to add the base component to `src/components/ui/`:

```bash
npx shadcn@latest add [component-name]
```

This will:
- Install the base component in `src/components/ui/`
- Add any required dependencies to `package.json`
- Update your `components.json` configuration

**Example:**
```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add select
```

### Step 2: Create Custom Wrapper (If Needed)

If you need OUI-specific styling, behavior, or additional props, create a wrapper component in `src/components/custom/`:

```typescript
// src/components/custom/button.tsx
import * as React from "react"
import { Button as BaseButton, buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"

function Button({
  className,
  loading = false,
  children,
  ...props
}: React.ComponentProps<typeof BaseButton> & {
  loading?: boolean
}) {
  return (
    <BaseButton
      className={cn("custom-button-styles", className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Spinner className="mr-2 size-4" />}
      {children}
    </BaseButton>
  )
}

export { Button, buttonVariants }
```

### Step 3: Export Components

Add exports to `src/components/index.ts`:

```typescript
// For UI components (base shadcn components)
export * from './ui/accordion';
export * from './ui/alert-dialog';

// For custom components (OUI-enhanced wrappers)
export * from './custom/button';
export * from './custom/badge';
```

**Export Priority:**
- If both `ui/` and `custom/` versions exist, export the `custom/` version
- This ensures consumers get the enhanced OUI version by default

### Step 4: Run the Shadcn Fix Script

After adding a new component (especially if importing from shadcn/ui), run the fix script to ensure proper CSS variable prefixing and import optimization:

```bash
yarn fix:shadcn
```

This script will:
- Prefix any unprefixed CSS variables with `--oui-`
- Update imports from `@/components/ui/ComponentName` to `@/components` for components that have custom versions

### Step 5: Create Storybook Story

Create a story file for your component following our established patterns. See the complete Storybook documentation:

- **[Storybook Template Pattern](./storybook-template-pattern.md)** - Complete story structure and examples
- **[Storybook Naming Conventions](./storybook-naming-conventions.md)** - File naming and story organization

## Component Guidelines

### UI Components (`src/components/ui/`)
- Keep minimal modifications to shadcn base components
- Only modify for critical bug fixes or compatibility
- Preserve original API and behavior

### Custom Components (`src/components/custom/`)
- Add OUI-specific styling and branding
- Extend functionality (loading states, additional props)
- Maintain backward compatibility
- Follow existing patterns (data-slot attributes, consistent naming)

### Styling Components

Components use **Tailwind CSS** with **class-variance-authority** for styling:

- Use Tailwind utility classes for styling
- Leverage `cn()` utility for class merging
- Define variants using `cva()` for different component states
- Use CSS custom properties for theme values
- Follow existing design patterns in the codebase

### Logically-grouped components

When components are related (like `<Toolbar>` and `<ToolbarSearch>`) or tightly-coupled (like `<Button>` and `<ButtonGroup>`), group them in the same directory. Create separate TypeScript files for each component but export them all from the same index file for easy importing.

## TypeScript Patterns

### Pass-through props

Many components use `rest parameters` and the `spread` operator to pass props through to an underlying DOM element. The component's TypeScript definition needs to properly include the target DOM element's props.

A `Foo` component that passes `...rest` through to a `button` element would have the props interface:

```ts
// passes extra props to a button
interface FooProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}
```

Some DOM elements (e.g. `div`, `span`) do not have attributes beyond the basic ones provided by all HTML elements. In these cases use `HTMLAttributes<HTMLDivElement>`:

```ts
// passes extra props to a div
interface FooProps extends HTMLAttributes<HTMLDivElement> {
  title: string
}
```

If your component forwards a `ref` through to an underlying element, the interface needs to be further extended with `DetailedHTMLProps`:

```ts
// passes extra props and forwards the ref to a button
interface FooProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  title: string
}
```

### forwardRef

React's `forwardRef` should be used to provide access to the component's outermost element. We impose two additional requirements when using `forwardRef`:

1. use `forwardRef` instead of `React.forwardRef`, otherwise [react-docgen-typescript](https://www.npmjs.com/package/react-docgen-typescript) does not understand it
2. the resulting component must have a `displayName`, this is useful when the component is included in a snapshot or when inspected in devtools

#### Simple forward/pass-through

```ts
import React, { forwardRef } from 'react';

interface MyComponentProps {...}

export const MyComponent = forwardRef<
  HTMLDivElement, // type of element or component the ref will be passed to
  MyComponentProps // what properties apart from `ref` the component accepts
>(
  (
    { destructure, props, here, ...rest },
    ref
  ) => {
    return (
      <div ref={ref} {...rest}>
        ...
      </div>
    );
  }
);

MyComponent.displayName = 'MyComponent';
```

#### Combining with additional refs

Sometimes an element needs to have 2+ refs passed to it. For this OUI provides a `useCombinedRefs` hook:

```ts
import React, { forwardRef, createRef } from 'react';
import { useCombinedRefs } from '../../services';

interface MyComponentProps {...}

export const MyComponent = forwardRef<
  HTMLDivElement,
  MyComponentProps
>(
  (
    { destructure, props, here, ...rest },
    ref
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    const combinedRefs = useCombinedRefs([ref, localRef]);
    return (
      <div ref={combinedRefs} {...rest}>
        ...
      </div>
    );
  }
);

MyComponent.displayName = 'MyComponent';
```

#### Providing custom or additional data

Rarely, a component's ref needs to be something other than a DOM element, or provide additional information. In these cases, React's `useImperativeHandle` can be used to provide a custom object as the ref's value:

```ts
import React, { useImperativeHandle } from 'react';

export const MyEditor = forwardRef<
  MyEditorRef,
  MyEditorProps
  >(
  (props, ref) => {
    ...

    // combines the textarea element & custom methods into a single object
    useImperativeHandle(
      ref,
      () => ({ textarea: textareaRef.current, customMethod }),
      [customMethod]
    );

    ...
  }
);
```

## Testing Components

Testing is integrated into Storybook stories using Vitest and @testing-library:

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:storybook:watch
```

Tests are written as Storybook stories with `play` functions for interaction testing. This approach combines documentation and behavioral testing in one place.

Refer to the [testing guide](testing.md) for complete guidelines on writing tests in Storybook.

### Testing with Consuming Applications

To test your component changes in a consuming application:

#### Build and Package

```bash
yarn build && npm pack
```

This creates a `.tgz` file in the OUI directory.

#### In Your Application

Update your `package.json` to point to the packed file:

```json
{
  "dependencies": {
    "@opensearch-project/oui": "/path/to/virajsanghvi-oui-x.x.x.tgz"
  }
}
```

Then install:

```bash
yarn install --check-files
```

**Note**: Update the `.tgz` filename after each rebuild to ensure package managers recognize the changes.

## Best Practices

### Component Design
- Keep components focused and single-purpose
- Provide sensible defaults
- Make customization easy but not required
- Follow established naming conventions

### Efficient Wrapping Patterns

When creating custom wrappers, follow these optimization patterns:

#### When not to wrap

If you are just updating an existing variant, and making no other changes, just update the component in the `src/components/ui` directory as CVA does not have a mechanism to extend `cva()` responses.

#### Re-export Unchanged Components
If a component needs no customization, re-export it directly instead of wrapping:

```typescript
// ❌ Unnecessary wrapper
function CustomImage({ className, ...props }) {
  return <BaseImage className={className} {...props} />
}

// ✅ Direct re-export
export { Image } from "../ui/image"
```

#### Share Variant Definitions
When multiple components use the same variants, define them once:

```typescript
// ✅ Shared variants
const shapeVariants = cva("", {
  variants: {
    variant: {
      circular: "rounded-full",
      squared: "rounded-lg",
    },
  },
  defaultVariants: { variant: "circular" },
})

// Both components use the same variants
function Avatar({ variant, ...props }) {
  return <BaseAvatar className={cn(shapeVariants({ variant }))} {...props} />
}

function AvatarFallback({ variant, ...props }) {
  return <BaseAvatarFallback className={cn(shapeVariants({ variant }))} {...props} />
}
```

#### Mixed Export Pattern
Combine direct re-exports with custom wrappers in the same file:

```typescript
// Custom components with variants
export { Avatar, AvatarFallback }
// Direct re-export for unchanged component
export { AvatarImage } from "../ui/avatar"
```

### Documentation
- Write clear prop descriptions in argTypes
- Use realistic examples in stories
- Document any breaking changes or migration notes
- Include usage examples for complex components

### Performance
- Avoid unnecessary re-renders
- Use React.memo() for expensive components
- Keep bundle size impact minimal
- Lazy load heavy dependencies when possible

## Common Patterns

### Loading States
```typescript
// Add loading prop to custom components
loading?: boolean

// Show spinner when loading
{loading && <Spinner className="mr-2 size-4" />}
```

### Variant Systems
```typescript
// Use class-variance-authority for variants
const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        secondary: "secondary-classes",
      },
      size: {
        sm: "small-classes",
        lg: "large-classes",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### Forwarding Refs
```typescript
const Component = React.forwardRef<
  HTMLButtonElement,
  ComponentProps
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn("base-classes", className)}
      {...props}
    />
  )
})
```

## Troubleshooting

### Common Issues

**shadcn component not installing:**
- Check your `components.json` configuration
- Ensure you're in the project root directory
- Verify network connectivity for downloading components

**TypeScript errors:**
- Check that all required dependencies are installed
- Verify import paths are correct
- Ensure component props extend the correct base types

**Storybook not showing component:**
- Verify the story file is in the `stories/` directory
- Check that the component is properly exported
- Ensure the story follows the correct naming convention

**Styling not applying:**
- Check Tailwind CSS configuration
- Verify class names are correct
- Ensure CSS is being built and imported properly

### Getting Help

- Check existing components for patterns and examples
- Review the [Storybook documentation](./storybook-template-pattern.md)
- Test changes in Storybook before committing
- Follow the established code review process

[component-design]: component-design.md