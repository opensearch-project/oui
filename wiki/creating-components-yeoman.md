# Creating Components

> **Note**: This library has migrated to a shadcn/ui-based architecture. Yeoman generators are no longer available.

## Component Creation

For creating new components, please refer to the [Manual Component Creation Guide](creating-components-manually.md) which covers the current shadcn/ui-based approach.

## Key Changes

The new component creation process:

1. Uses **TypeScript** and **Tailwind CSS** instead of SCSS
2. Leverages **Radix UI primitives** for accessibility
3. Uses **class-variance-authority** for component variants
4. Documents components in **Storybook** instead of a custom documentation system
5. Uses **Vitest** for testing instead of Jest

## Migration

If you were previously using Yeoman to generate components, the new manual process provides:

- Better type safety with TypeScript
- More flexible styling with Tailwind CSS
- Improved accessibility with Radix UI
- Better testing with Storybook integration
- Smaller bundle sizes and better performance

Please see the [Creating Components Guide](creating-components-manually.md) for the complete workflow.