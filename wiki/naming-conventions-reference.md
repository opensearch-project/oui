# Naming Conventions Quick Reference

## File Naming: kebab-case

```
Component File          Story File
button.tsx           →  button.stories.tsx
alert-dialog.tsx     →  alert-dialog.stories.tsx
input-otp.tsx        →  input-otp.stories.tsx
navigation-menu.tsx  →  navigation-menu.stories.tsx
toggle-group.tsx     →  toggle-group.stories.tsx
```

## Story Titles: "UI/PascalCase"

```
File Name              Story Title
button                 → "UI/Button"
alert-dialog           → "UI/AlertDialog"
input-otp              → "UI/InputOTP"
navigation-menu        → "UI/NavigationMenu"
toggle-group           → "UI/ToggleGroup"
aspect-ratio           → "UI/AspectRatio"
scroll-area            → "UI/ScrollArea"
```

## Story Export Names: PascalCase Descriptive

### Standard Story Types (in order)

1. **Default Story**
   ```typescript
   export const Default: Story = { ... }
   ```

2. **Variant Stories**
   ```typescript
   export const Primary: Story = { ... }
   export const Secondary: Story = { ... }
   export const Destructive: Story = { ... }
   export const Outline: Story = { ... }
   export const Ghost: Story = { ... }
   export const Link: Story = { ... }
   ```

3. **Size Stories**
   ```typescript
   export const Small: Story = { ... }
   export const Medium: Story = { ... }
   export const Large: Story = { ... }
   export const ExtraLarge: Story = { ... }
   export const Icon: Story = { ... }
   ```

4. **State Stories**
   ```typescript
   export const Disabled: Story = { ... }
   export const LoadingState: Story = { ... }
   export const ErrorState: Story = { ... }
   export const SuccessState: Story = { ... }
   export const FocusedState: Story = { ... }
   ```

5. **Content Variation Stories**
   ```typescript
   export const WithIcon: Story = { ... }
   export const WithoutIcon: Story = { ... }
   export const LongText: Story = { ... }
   export const ShortText: Story = { ... }
   export const MultiLine: Story = { ... }
   export const EmptyState: Story = { ... }
   ```

6. **Showcase Stories**
   ```typescript
   export const AllVariants: Story = { ... }
   export const AllSizes: Story = { ... }
   export const AllStates: Story = { ... }
   ```

7. **Interactive/Complex Stories**
   ```typescript
   export const InteractiveExample: Story = { ... }
   export const FormIntegration: Story = { ... }
   export const RealWorldExample: Story = { ... }
   ```

## Realistic Content Examples

### Button Content
```typescript
✅ Good (Individual Stories):
children: 'Save Changes'
children: 'Delete Account'
children: 'Learn More'
children: 'Get Started'
children: 'Cancel'

✅ Good (Showcase Stories):
children: 'Default'      // for AllVariants
children: 'Destructive'  // for AllVariants
children: 'Small'        // for AllSizes
children: 'Large'        // for AllSizes

❌ Avoid:
children: 'Button'
children: 'Click me'
children: 'Lorem ipsum'
```

### Form Input Content
```typescript
✅ Good:
placeholder: 'Enter your email address'
placeholder: 'e.g. John Smith'
value: 'john.smith@company.com'

❌ Avoid:
placeholder: 'Type here'
value: 'Sample text'
```

### ArgType Descriptions
```typescript
✅ Good:
description: 'The visual style variant of the button'
description: 'Whether the component is disabled'
description: 'Function called when button is clicked'

❌ Avoid:
description: 'variant'
description: 'BUTTON VARIANT'
description: 'button variant type'
```

## Transformation Rules

### kebab-case → PascalCase
```
alert-dialog    → AlertDialog
input-otp       → InputOTP
navigation-menu → NavigationMenu
toggle-group    → ToggleGroup
scroll-area     → ScrollArea
```

### Common Patterns
```
with-icon       → WithIcon
loading-state   → LoadingState
error-state     → ErrorState
all-variants    → AllVariants
long-text       → LongText
multi-line      → MultiLine
```

## Quality Checklist

- [ ] File name uses kebab-case
- [ ] File uses `.stories.tsx` extension
- [ ] Title follows `"UI/ComponentName"` pattern
- [ ] Component name uses PascalCase
- [ ] Story exports use PascalCase
- [ ] Story names are descriptive
- [ ] Content is realistic and professional
- [ ] ArgType descriptions are clear
- [ ] Stories follow standard ordering

## Common Mistakes to Avoid

```typescript
❌ Wrong file naming:
Button.stories.tsx          → should be button.stories.tsx
alertDialog.stories.tsx     → should be alert-dialog.stories.tsx

❌ Wrong title patterns:
title: 'Components/Button'  → should be 'UI/Button'
title: 'UI/button'         → should be 'UI/Button'
title: 'Button'            → should be 'UI/Button'

❌ Wrong story names:
export const primary        → should be Primary
export const with_icon      → should be WithIcon
export const Story1         → should be descriptive

❌ Generic content:
children: 'Button'          → should be 'Save Changes'
placeholder: 'Type here'    → should be 'Enter your email'
```