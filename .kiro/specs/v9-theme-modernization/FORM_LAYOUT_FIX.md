# Form Control Layout Border Radius Fix

## Problem

Input fields with prepend and append elements currently have **no border radius** (sharp corners), which looks outdated and inconsistent with the modern theme aesthetic.

### Current Behavior

```
┌─────────┬──────────────────────┬─────────┐
│ Prepend │      Input Field     │ Append  │  ← All corners are sharp (90°)
└─────────┴──────────────────────┴─────────┘
```

The issue is in `src/components/form/form_control_layout/_form_control_layout.scss`:

```scss
.ouiFormControlLayout__prepend,
.ouiFormControlLayout__append {
  border-radius: 0; // ❌ This removes ALL border radius
}
```

## Solution

Apply border radius **only to the outer edges** of the form control group:

### Desired Behavior

```
╭─────────┬──────────────────────┬─────────╮
│ Prepend │      Input Field     │ Append  │  ← Outer corners are rounded
╰─────────┴──────────────────────┴─────────╯
  ↑                                        ↑
  Left corners rounded              Right corners rounded
  (first prepend)                   (last append)
```

## Implementation

### Step 1: Update Container

Add border radius to the form control layout group container:

```scss
.ouiFormControlLayout--group {
  border-radius: $ouiFormControlBorderRadius; // 6px for regular, 6px for compressed
  overflow: hidden; // Clip children to container radius
}
```

### Step 2: Remove Blanket Border Radius Reset

Remove or modify the blanket `border-radius: 0` rule:

```scss
.ouiFormControlLayout__prepend,
.ouiFormControlLayout__append {
  // ❌ Remove this:
  // border-radius: 0;
  
  // ✅ Keep inner elements square for clean joins:
  &.ouiIcon,
  .ouiIcon,
  &.ouiButtonIcon,
  &.ouiButtonEmpty,
  .ouiButtonIcon,
  .ouiButtonEmpty {
    border-radius: 0; // Icons and buttons stay square
  }
}
```

### Step 3: Apply Selective Border Radius

Add border radius only to first and last elements:

```scss
.ouiFormControlLayout--group {
  // First prepend gets left border radius
  > .ouiFormControlLayout__prepend:first-child {
    border-radius: $ouiFormControlBorderRadius 0 0 $ouiFormControlBorderRadius;
    // Top-left and bottom-left corners rounded
  }
  
  // Last append gets right border radius
  > .ouiFormControlLayout__append:last-child {
    border-radius: 0 $ouiFormControlBorderRadius $ouiFormControlBorderRadius 0;
    // Top-right and bottom-right corners rounded
  }
}
```

### Step 4: Handle Compressed Variant

Apply the same logic for compressed form controls:

```scss
.ouiFormControlLayout--group.ouiFormControlLayout--compressed {
  border-radius: $ouiFormControlCompressedBorderRadius; // 6px
  
  > .ouiFormControlLayout__prepend:first-child {
    border-radius: $ouiFormControlCompressedBorderRadius 0 0 $ouiFormControlCompressedBorderRadius;
  }
  
  > .ouiFormControlLayout__append:last-child {
    border-radius: 0 $ouiFormControlCompressedBorderRadius $ouiFormControlCompressedBorderRadius 0;
  }
}
```

## Complete SCSS Changes

### File: `src/components/form/form_control_layout/_form_control_layout.scss`

**Find this section** (around line 50-60):

```scss
.ouiFormControlLayout__prepend,
.ouiFormControlLayout__append {
  @include ouiTextTruncate;
  flex-shrink: 0;
  height: 100%;
  border-radius: 0; // ❌ REMOVE THIS LINE
```

**Replace with**:

```scss
.ouiFormControlLayout__prepend,
.ouiFormControlLayout__append {
  @include ouiTextTruncate;
  flex-shrink: 0;
  height: 100%;
  // Border radius handled selectively below
```

**Then add these rules** (after the prepend/append section, around line 140):

```scss
// Apply border radius to outer edges only
.ouiFormControlLayout--group {
  border-radius: $ouiFormControlBorderRadius;
  
  // First prepend gets left rounded corners
  > .ouiFormControlLayout__prepend:first-child {
    border-top-left-radius: $ouiFormControlBorderRadius;
    border-bottom-left-radius: $ouiFormControlBorderRadius;
    
    // But keep icons/buttons square
    &.ouiIcon,
    .ouiIcon,
    &.ouiButtonIcon,
    &.ouiButtonEmpty,
    .ouiButtonIcon,
    .ouiButtonEmpty {
      border-radius: 0;
    }
  }
  
  // Last append gets right rounded corners
  > .ouiFormControlLayout__append:last-child {
    border-top-right-radius: $ouiFormControlBorderRadius;
    border-bottom-right-radius: $ouiFormControlBorderRadius;
    
    // But keep icons/buttons square
    &.ouiIcon,
    .ouiIcon,
    &.ouiButtonIcon,
    &.ouiButtonEmpty,
    .ouiButtonIcon,
    .ouiButtonEmpty {
      border-radius: 0;
    }
  }
  
  // Compressed variant
  &.ouiFormControlLayout--compressed {
    border-radius: $ouiFormControlCompressedBorderRadius;
    
    > .ouiFormControlLayout__prepend:first-child {
      border-top-left-radius: $ouiFormControlCompressedBorderRadius;
      border-bottom-left-radius: $ouiFormControlCompressedBorderRadius;
    }
    
    > .ouiFormControlLayout__append:last-child {
      border-top-right-radius: $ouiFormControlCompressedBorderRadius;
      border-bottom-right-radius: $ouiFormControlCompressedBorderRadius;
    }
  }
}
```

## Visual Examples

### Before (Current)

```
Input with Prepend:
┌────────┬─────────────────────┐
│ String │ Input text here...  │  ← Sharp corners
└────────┴─────────────────────┘

Input with Append:
┌─────────────────────┬─────────┐
│ Input text here...  │ Tooltip │  ← Sharp corners
└─────────────────────┴─────────┘

Input with Both:
┌────────┬─────────────────────┬─────────┐
│ String │ Input text here...  │ Tooltip │  ← Sharp corners
└────────┴─────────────────────┴─────────┘
```

### After (Fixed)

```
Input with Prepend:
╭────────┬─────────────────────┐
│ String │ Input text here...  │  ← Left corners rounded
╰────────┴─────────────────────┘

Input with Append:
┌─────────────────────┬─────────╮
│ Input text here...  │ Tooltip │  ← Right corners rounded
└─────────────────────┴─────────╯

Input with Both:
╭────────┬─────────────────────┬─────────╮
│ String │ Input text here...  │ Tooltip │  ← Both outer corners rounded
╰────────┴─────────────────────┴─────────╯
```

## Edge Cases to Handle

### 1. Multiple Prepends/Appends

Only the **first** prepend and **last** append should have rounded corners:

```
╭─────────┬─────────┬──────────┬─────────┬─────────╮
│ Prepend │ Prepend │  Input   │ Append  │ Append  │
╰─────────┴─────────┴──────────┴─────────┴─────────╯
  ↑                                              ↑
  Only this gets                         Only this gets
  left radius                            right radius
```

### 2. Icons and Buttons Inside Prepend/Append

Icons and buttons should remain **square** (no border radius) for clean visual joins:

```scss
.ouiFormControlLayout__prepend,
.ouiFormControlLayout__append {
  &.ouiIcon,
  .ouiIcon,
  &.ouiButtonIcon,
  &.ouiButtonEmpty,
  .ouiButtonIcon,
  .ouiButtonEmpty {
    border-radius: 0 !important; // Keep square
  }
}
```

### 3. Text Labels

Text labels (`.ouiFormLabel`, `.ouiText`) should follow the same pattern as the container.

## Testing Checklist

After implementing the fix, verify:

- [ ] Input with left prepend has rounded left corners
- [ ] Input with right append has rounded right corners
- [ ] Input with both prepend and append has rounded outer corners
- [ ] Multiple prepends: only first has left radius
- [ ] Multiple appends: only last has right radius
- [ ] Icons inside prepend/append remain square
- [ ] Buttons inside prepend/append remain square
- [ ] Compressed variant works correctly
- [ ] Regular variant works correctly
- [ ] ReadOnly state maintains border radius
- [ ] Disabled state maintains border radius
- [ ] Focus state doesn't break border radius

## Browser Compatibility

The solution uses standard CSS properties that work in all modern browsers:
- `border-radius` (all browsers)
- `border-top-left-radius`, etc. (all browsers)
- `:first-child`, `:last-child` selectors (all browsers)
- `overflow: hidden` (all browsers)

## Related Files

- **Variables**: `src/themes/v9/global_styling/variables/_form.scss`
- **Component**: `src/components/form/form_control_layout/_form_control_layout.scss`
- **Mixins**: `src/themes/v9/global_styling/mixins/_form.scss`

## References

- Task 7.2 in `tasks.md`
- Requirement 1.6 in `requirements.md`
- Design section "Forms" in `design.md`
