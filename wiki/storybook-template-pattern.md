# Storybook Story Template Pattern Documentation

## Overview

This document defines the self-contained story structure pattern for OUI. Each story file must be completely independent with no external dependencies, utilities, or abstractions. This ensures maintainability, predictability, and ease of understanding for developers using the design system.

## Self-Contained Story Structure Pattern

### Basic Template Structure

Every story file follows this exact pattern:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '@/components/ui/component-name';

const meta: Meta<typeof ComponentName> = {
  title: 'UI/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // All argTypes defined inline - no external utilities
    // See argTypes examples below
  },
  args: {
    // Default args defined inline
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Standard story exports
export const Default: Story = {
  args: {
    // Realistic, contextually appropriate content
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      {/* Multiple variants displayed together */}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available variants of the component.',
      },
    },
  },
};
```

### Key Principles

1. **Complete Independence**: Each file contains all necessary configuration
2. **No External Dependencies**: No utility functions, templates, or shared configurations
3. **Inline Definitions**: All argTypes, args, and configurations defined within the file
4. **Standard Storybook APIs**: Use only Meta and StoryObj patterns
5. **TypeScript Safety**: Full type safety throughout

## Inline ArgTypes Examples

### Common Component Types

#### Button Components

```typescript
argTypes: {
  variant: {
    control: { type: 'select' },
    options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    description: 'The visual style variant of the button',
  },
  size: {
    control: { type: 'select' },
    options: ['default', 'sm', 'lg', 'icon'],
    description: 'The size of the button',
  },
  disabled: {
    control: { type: 'boolean' },
    description: 'Whether the button is disabled',
  },
  children: {
    control: { type: 'text' },
    description: 'The content of the button',
  },
  onClick: {
    action: 'clicked',
    description: 'Function called when button is clicked',
  },
},
```

#### Form Input Components

```typescript
argTypes: {
  type: {
    control: { type: 'select' },
    options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    description: 'The input type',
  },
  placeholder: {
    control: { type: 'text' },
    description: 'Placeholder text shown when input is empty',
  },
  disabled: {
    control: { type: 'boolean' },
    description: 'Whether the input is disabled',
  },
  required: {
    control: { type: 'boolean' },
    description: 'Whether the input is required',
  },
  value: {
    control: { type: 'text' },
    description: 'The current value of the input',
  },
  onChange: {
    action: 'changed',
    description: 'Function called when input value changes',
  },
},
```

#### Layout Components

```typescript
argTypes: {
  className: {
    control: { type: 'text' },
    description: 'Additional CSS classes to apply',
  },
  children: {
    control: { type: 'text' },
    description: 'The content of the component',
  },
},
```

#### Badge/Status Components

```typescript
argTypes: {
  variant: {
    control: { type: 'select' },
    options: ['default', 'secondary', 'destructive', 'outline'],
    description: 'The visual style variant of the badge',
  },
  children: {
    control: { type: 'text' },
    description: 'The text content of the badge',
  },
},
```

#### Dialog/Modal Components

```typescript
argTypes: {
  open: {
    control: { type: 'boolean' },
    description: 'Whether the dialog is open',
  },
  onOpenChange: {
    action: 'openChanged',
    description: 'Function called when dialog open state changes',
  },
  title: {
    control: { type: 'text' },
    description: 'The title of the dialog',
  },
  description: {
    control: { type: 'text' },
    description: 'The description text of the dialog',
  },
},
```

## Realistic Content Guidelines

### Professional, Contextual Content

Use realistic, professional content that demonstrates real-world usage rather than generic placeholder text.

#### Button Content Examples

```typescript
// ✅ Good - Realistic action labels (Individual Stories)
children: 'Save Changes'
children: 'Delete Account'
children: 'Learn More'
children: 'Get Started'
children: 'Cancel'

// ✅ Good - Descriptive labels (Showcase Stories)
children: 'Default'      // for AllVariants showcase
children: 'Destructive'  // for AllVariants showcase
children: 'Small'        // for AllSizes showcase
children: 'Large'        // for AllSizes showcase

// ❌ Avoid - Generic or unclear labels
children: 'Button'
children: 'Click me'
children: 'Lorem ipsum'
```

#### Exception: Showcase Stories

For showcase stories like `AllVariants`, `AllSizes`, use the actual variant/size names as content to clearly identify each option rather than realistic content.

#### Form Input Examples

```typescript
// ✅ Good - Realistic form scenarios
placeholder: 'Enter your email address'
placeholder: 'e.g. John Smith'
placeholder: 'Acme Corporation'
value: 'john.smith@company.com'

// ❌ Avoid - Generic placeholders
placeholder: 'Type here'
placeholder: 'Input text'
value: 'Sample text'
```

#### Card/Layout Content Examples

```typescript
// ✅ Good - Meaningful business content
title: 'User Profile Settings'
description: 'Manage your account preferences and privacy settings'
content: 'Update your personal information, notification preferences, and security settings.'

// ❌ Avoid - Lorem ipsum or generic content
title: 'Card Title'
description: 'Lorem ipsum dolor sit amet'
```

### Content Categories by Component Type

#### Navigation Components
- "Dashboard", "Projects", "Team", "Settings", "Reports"
- "Home", "About", "Services", "Contact", "Support"

#### Form Components
- Labels: "Email Address", "Full Name", "Company Name", "Phone Number"
- Placeholders: "Enter your email", "e.g. John Smith", "Optional"
- Validation: "Email is required", "Password must be 8+ characters"

#### Status/Badge Components
- "Active", "Pending", "Completed", "Draft", "Published"
- "High Priority", "Medium", "Low", "Critical"
- "Online", "Offline", "Away", "Busy"

#### Action Components
- Primary: "Save Changes", "Submit Form", "Create Account", "Get Started"
- Secondary: "Cancel", "Learn More", "View Details", "Go Back"
- Destructive: "Delete Account", "Remove Item", "Clear Data", "Reset"

## Standard Story Organization

### Required Story Types

Each component should include these standard stories in this order:

1. **Default**: Basic usage with minimal props
2. **Variants**: Individual stories for each variant (if applicable)
3. **Sizes**: Individual stories for each size (if applicable)  
4. **States**: Disabled, loading, error states (as applicable)
5. **Showcase**: All variants/sizes displayed together
6. **Interactive**: Complex usage examples with realistic content

### Example Story Implementation

```typescript
export const Default: Story = {
  args: {
    children: 'Save Changes',
    variant: 'default',
  },
};

export const Primary: Story = {
  args: {
    children: 'Get Started',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Learn More',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete Account',
    variant: 'destructive',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Save Changes',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <ComponentName variant="default">Save Changes</ComponentName>
      <ComponentName variant="secondary">Cancel</ComponentName>
      <ComponentName variant="destructive">Delete</ComponentName>
      <ComponentName variant="outline">Learn More</ComponentName>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants displayed together.',
      },
    },
  },
};
```

## Naming Conventions

For complete naming convention guidelines, see the [Storybook Naming Conventions](./storybook-naming-conventions.md) document.

### Quick Reference

#### File Naming
- Use kebab-case: `button.stories.tsx`, `alert-dialog.stories.tsx`
- Match component file names exactly
- Always use `.stories.tsx` extension

#### Story Titles
- Use "UI/ComponentName" pattern: `title: 'UI/Button'`
- Use PascalCase for component names: `UI/AlertDialog`
- Transform kebab-case file names to PascalCase for titles

#### Story Export Names
- Use PascalCase: `Default`, `Primary`, `AllVariants`
- Be descriptive: `WithIcon`, `LongText`, `ErrorState`
- Avoid generic names: `Story1`, `Example`, `Test`
- Follow standard story type ordering (Default, Variants, Sizes, States, Showcase)

## Quality Checklist

Before completing any story file, verify:

- [ ] File is completely self-contained with no external dependencies
- [ ] All argTypes are defined inline with clear descriptions
- [ ] Realistic, professional content is used throughout
- [ ] All component variants and states are covered
- [ ] Interactive controls work properly
- [ ] TypeScript types are correct and complete
- [ ] Story follows standard naming conventions
- [ ] Documentation is clear and helpful

This template pattern ensures consistency, maintainability, and an excellent developer experience across all Storybook stories in OUI.