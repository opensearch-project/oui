# Storybook Naming Conventions

## Overview

This document establishes consistent naming conventions for all Storybook stories in OUI. These conventions ensure predictable navigation, clear organization, and maintainable code across all component stories.

## Story File Naming Standards

### File Naming Convention: kebab-case

All story files must use kebab-case naming that exactly matches the component file name:

```
✅ Correct Examples:
button.stories.tsx          → matches button.tsx
alert-dialog.stories.tsx    → matches alert-dialog.tsx
input-otp.stories.tsx       → matches input-otp.tsx
navigation-menu.stories.tsx → matches navigation-menu.tsx
toggle-group.stories.tsx    → matches toggle-group.tsx

❌ Incorrect Examples:
Button.stories.tsx          → should be button.stories.tsx
alertDialog.stories.tsx     → should be alert-dialog.stories.tsx
InputOTP.stories.tsx        → should be input-otp.stories.tsx
```

### File Extension
- Always use `.stories.tsx` for TypeScript React components
- Never use `.stories.js` or `.stories.ts`

### File Location
- All story files must be placed in the `stories/` directory
- No subdirectories or nested organization within stories folder

## Story Title Hierarchy Patterns

### Standard Title Pattern: "UI/ComponentName"

All component stories must follow the exact title pattern `"UI/ComponentName"` where ComponentName uses PascalCase:

```typescript
✅ Correct Examples:
title: 'UI/Button'
title: 'UI/AlertDialog'
title: 'UI/InputOTP'
title: 'UI/NavigationMenu'
title: 'UI/ToggleGroup'

❌ Incorrect Examples:
title: 'Components/Button'     → should use "UI" category
title: 'UI/button'            → should use PascalCase
title: 'UI/Alert Dialog'      → should use PascalCase without spaces
title: 'Button'               → missing "UI/" prefix
title: 'UI/Alert-Dialog'      → should use PascalCase, not kebab-case
```

### Component Name Transformation Rules

Transform kebab-case file names to PascalCase for titles:

```
File Name              → Title Component Name
button                 → Button
alert-dialog           → AlertDialog
input-otp              → InputOTP
navigation-menu        → NavigationMenu
toggle-group           → ToggleGroup
aspect-ratio           → AspectRatio
scroll-area            → ScrollArea
```

### Category Organization

- **Primary Category**: Always use `"UI"` as the top-level category
- **No Subcategories**: Do not create additional nested categories
- **Alphabetical Ordering**: Components will appear alphabetically within the UI category

## Story Variant Naming Guidelines

### Story Export Names: PascalCase Descriptive Names

All story exports must use PascalCase with descriptive, meaningful names:

```typescript
✅ Correct Examples:
export const Default: Story = { ... }
export const Primary: Story = { ... }
export const Secondary: Story = { ... }
export const Destructive: Story = { ... }
export const WithIcon: Story = { ... }
export const LoadingState: Story = { ... }
export const ErrorState: Story = { ... }
export const AllVariants: Story = { ... }
export const AllSizes: Story = { ... }
export const LongText: Story = { ... }
export const MultiLine: Story = { ... }

❌ Incorrect Examples:
export const default: Story = { ... }        → should be "Default"
export const primary: Story = { ... }        → should be "Primary"
export const with_icon: Story = { ... }      → should be "WithIcon"
export const loading_state: Story = { ... }  → should be "LoadingState"
export const Story1: Story = { ... }         → should be descriptive
export const Example: Story = { ... }        → should be specific
export const Test: Story = { ... }           → should be descriptive
```

### Standard Story Types and Naming

Each component should include these standard story types in this specific order:

#### 1. Default Story
```typescript
export const Default: Story = {
  args: {
    // Basic usage with minimal props
  },
};
```

#### 2. Variant Stories (if applicable)
Use the exact variant name in PascalCase:
```typescript
export const Primary: Story = { ... }
export const Secondary: Story = { ... }
export const Destructive: Story = { ... }
export const Outline: Story = { ... }
export const Ghost: Story = { ... }
export const Link: Story = { ... }
```

#### 3. Size Stories (if applicable)
Use descriptive size names:
```typescript
export const Small: Story = { ... }
export const Medium: Story = { ... }  // or Default
export const Large: Story = { ... }
export const ExtraLarge: Story = { ... }
export const Icon: Story = { ... }    // for icon-only sizes
```

#### 4. State Stories
Use descriptive state names:
```typescript
export const Disabled: Story = { ... }
export const Loading: Story = { ... }
export const LoadingState: Story = { ... }
export const ErrorState: Story = { ... }
export const SuccessState: Story = { ... }
export const FocusedState: Story = { ... }
export const HoverState: Story = { ... }
```

#### 5. Content Variation Stories
Use descriptive content-based names:
```typescript
export const WithIcon: Story = { ... }
export const WithoutIcon: Story = { ... }
export const LongText: Story = { ... }
export const ShortText: Story = { ... }
export const MultiLine: Story = { ... }
export const EmptyState: Story = { ... }
```

#### 6. Showcase Stories
Use "All" prefix for comprehensive displays:
```typescript
export const AllVariants: Story = { ... }
export const AllSizes: Story = { ... }
export const AllStates: Story = { ... }
export const AllCombinations: Story = { ... }
```

#### 7. Interactive/Complex Stories
Use descriptive functional names:
```typescript
export const InteractiveExample: Story = { ... }
export const FormIntegration: Story = { ... }
export const RealWorldExample: Story = { ... }
export const ComplexLayout: Story = { ... }
```

### Naming Pattern Rules

1. **Always PascalCase**: First letter and each word capitalized
2. **No Abbreviations**: Use full words (LoadingState, not LoadState)
3. **Descriptive**: Name should indicate what the story demonstrates
4. **Consistent Terminology**: Use same terms across similar components
5. **Logical Ordering**: Stories should appear in logical sequence

### Component-Specific Naming Examples

#### Form Components
```typescript
// Input, Textarea, Select, etc.
export const Default: Story = { ... }
export const WithLabel: Story = { ... }
export const WithPlaceholder: Story = { ... }
export const WithError: Story = { ... }
export const WithHelperText: Story = { ... }
export const Disabled: Story = { ... }
export const Required: Story = { ... }
export const ReadOnly: Story = { ... }
```

#### Layout Components
```typescript
// Card, Dialog, Sheet, etc.
export const Default: Story = { ... }
export const WithHeader: Story = { ... }
export const WithFooter: Story = { ... }
export const WithHeaderAndFooter: Story = { ... }
export const LongContent: Story = { ... }
export const MinimalContent: Story = { ... }
```

#### Navigation Components
```typescript
// Tabs, NavigationMenu, Breadcrumb, etc.
export const Default: Story = { ... }
export const HorizontalLayout: Story = { ... }
export const VerticalLayout: Story = { ... }
export const WithIcons: Story = { ... }
export const ManyItems: Story = { ... }
export const FewItems: Story = { ... }
```

### Exception: Showcase Stories Content

For showcase stories like `AllVariants`, `AllSizes`, `AllStates`, use the actual variant/size/state names as content to clearly identify each option:

```typescript
✅ Showcase Stories - Use descriptive labels:
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

❌ Don't use realistic content in showcase stories:
<Button variant="default">Save Changes</Button>  // Makes it unclear which variant this is
<Button variant="destructive">Delete Account</Button>  // Content doesn't help identify the variant
```

This exception ensures developers can easily identify which variant, size, or state each example represents in showcase stories.

## ArgTypes Naming Conventions

### Property Names
Use the exact prop names from the component interface:
```typescript
argTypes: {
  variant: { ... },      // matches component prop exactly
  size: { ... },         // matches component prop exactly
  disabled: { ... },     // matches component prop exactly
  children: { ... },     // matches component prop exactly
  onClick: { ... },      // matches component prop exactly
}
```

### Control Descriptions
Use clear, helpful descriptions in sentence case:
```typescript
✅ Correct Examples:
description: 'The visual style variant of the button'
description: 'Whether the component is disabled'
description: 'Function called when button is clicked'
description: 'The size of the component'

❌ Incorrect Examples:
description: 'variant'                    → too brief
description: 'BUTTON VARIANT'            → all caps
description: 'The Variant Of The Button' → title case
description: 'button variant type'       → no capitalization
```

## Quality Checklist

Before completing any story file, verify naming conventions:

- [ ] File name uses kebab-case matching component file name
- [ ] File uses `.stories.tsx` extension
- [ ] Story title follows `"UI/ComponentName"` pattern with PascalCase
- [ ] All story exports use PascalCase descriptive names
- [ ] Story names clearly indicate what they demonstrate
- [ ] ArgTypes use exact component prop names
- [ ] ArgType descriptions are clear and helpful
- [ ] Stories are organized in logical order
- [ ] Naming is consistent with similar components
- [ ] No abbreviations or unclear names used

## Examples of Complete Naming Implementation

### Simple Component (Badge)
```typescript
// File: badge.stories.tsx
const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  // ...
};

export const Default: Story = { ... }
export const Secondary: Story = { ... }
export const Destructive: Story = { ... }
export const Outline: Story = { ... }
export const AllVariants: Story = { ... }
```

### Complex Component (AlertDialog)
```typescript
// File: alert-dialog.stories.tsx
const meta: Meta<typeof AlertDialog> = {
  title: 'UI/AlertDialog',
  // ...
};

export const Default: Story = { ... }
export const Destructive: Story = { ... }
export const WithLongContent: Story = { ... }
export const WithCustomActions: Story = { ... }
export const ConfirmationDialog: Story = { ... }
export const DeleteConfirmation: Story = { ... }
```

This naming convention system ensures that all Storybook stories are predictable, navigable, and maintainable across OUI.