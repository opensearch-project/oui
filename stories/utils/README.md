# Storybook Utilities

## Warning Banner Utility

The `warning-banner.ts` utility provides reusable functions for adding work-in-progress warnings to component stories.

### Usage

```typescript
import { createDocsWithWarning } from './utils/warning-banner';

const meta: Meta<typeof YourComponent> = {
  title: 'UI/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('Brief description of what your component does.'),
  },
  tags: ['autodocs'],
  // ... other configuration
};
```

### Functions

#### `createWorkInProgressWarning(componentDescription: string): string`

Generates the HTML string for the warning banner.

**Parameters:**
- `componentDescription` - A brief description of what the component does

**Returns:** HTML string with styled warning banner

#### `createDocsWithWarning(componentDescription: string)`

Creates a complete Storybook docs parameter object with the warning banner.

**Parameters:**
- `componentDescription` - A brief description of what the component does

**Returns:** Object that can be spread into Storybook parameters

### Styling

The warning banner uses:
- **Background:** Light amber (`#fef3c7`)
- **Border:** Orange (`#f59e0b`) 
- **Text:** Dark amber (`#92400e`)
- **Icon:** Warning emoji (⚠️)
- **Layout:** Flexbox with proper spacing

### When to Use

Use this utility for any component that is:
- A preliminary implementation
- Waiting for Figma design finalization
- Subject to significant API changes
- Not recommended for production use

### Removing Warnings

Once a component's Figma design is finalized and the component is production-ready:

1. Remove the import: `import { createDocsWithWarning } from './utils/warning-banner';`
2. Replace the parameters with standard docs:
   ```typescript
   parameters: {
     layout: 'centered',
     docs: {
       description: {
         component: 'Your component description here.',
       },
     },
   },
   ```