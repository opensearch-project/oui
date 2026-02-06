# V9 Theme Modernization Spec

## Overview

This spec defines the modernization of the OpenSearch UI (OUI) v9 theme to achieve a contemporary, shadcn-like aesthetic. The modernization focuses on updating design tokens (border radius, shadows, typography, spacing, **colors**) and component variables to create a cleaner, more professional look without requiring a full migration.

## Spec Documents

### Core Documents

1. **[requirements.md](./requirements.md)** - Complete requirements with acceptance criteria
   - 10 main requirements covering all aspects of modernization
   - 60+ detailed acceptance criteria
   - EARS-compliant format

2. **[design.md](./design.md)** - Detailed design decisions and architecture
   - Component-by-component design specifications
   - 8 correctness properties for validation
   - Comprehensive testing strategy
   - Implementation notes and migration path

3. **[tasks.md](./tasks.md)** - Implementation task list
   - 17 main tasks with sub-tasks
   - Incremental approach with checkpoints
   - Requirements traceability
   - Optional test tasks marked for faster MVP

### Color Modernization Documents

4. **[COLOR_MODERNIZATION.md](./COLOR_MODERNIZATION.md)** - Complete color palette reference
   - Detailed color specifications for light and dark themes
   - Usage guidelines for each color
   - Accessibility compliance information
   - Implementation file references

5. **[COLOR_COMPARISON.md](./COLOR_COMPARISON.md)** - Before/after color comparison
   - Visual side-by-side comparisons
   - Key differences summary
   - User-facing impact analysis
   - Testing checklist

### Component-Specific Guides

6. **[FORM_LAYOUT_FIX.md](./FORM_LAYOUT_FIX.md)** - Form control layout border radius fix
   - Problem description with visual diagrams
   - Step-by-step implementation guide
   - Complete SCSS code changes
   - Edge cases and testing checklist

7. **[SIDENAV_MODERNIZATION.md](./SIDENAV_MODERNIZATION.md)** - SideNav component modernization
   - Current state analysis with visual examples
   - Three modernization options (Background Highlight, Pill Style, Subtle with Accent Bar)
   - Recommended approach: Option C (Subtle with Accent Bar)
   - Complete implementation guide with SCSS changes
   - Branch indicator modernization
   - Accessibility and motion considerations

8. **[BADGE_MODERNIZATION.md](./BADGE_MODERNIZATION.md)** - Badge component modernization
   - Current state analysis with visual examples
   - Three modernization options (Subtle Rounded, Pill Style, Squared with Accent)
   - Recommended approach: Option A (Subtle Rounded)
   - Complete implementation guide with SCSS changes
   - Related components (Beta Badge, Notification Badge)
   - Interactive states and accessibility considerations

9. **[CALLOUT_MODERNIZATION.md](./CALLOUT_MODERNIZATION.md)** - CallOut component modernization
   - Current state analysis with visual examples
   - Three modernization options (Subtle All-Around Border, Background-Only, Enhanced Left Accent)
   - Recommended approach: Option A (Subtle All-Around Border)
   - Complete implementation guide with SCSS changes
   - Color specifications for all callout types
   - Accessibility and contrast considerations

10. **[FILTERGROUP_MODERNIZATION.md](./FILTERGROUP_MODERNIZATION.md)** - FilterGroup component modernization
   - Current state analysis with visual examples
   - Three modernization options (Separated Buttons, Connected with Rounded Ends, Pill-Shaped)
   - Recommended approach: Option B (Connected Buttons with Rounded Ends)
   - Complete implementation guide with SCSS changes
   - Selected and active filter states
   - Notification badge modernization
   - Accessibility and touch target considerations

11. **[DATAGRID_MODERNIZATION.md](./DATAGRID_MODERNIZATION.md)** - DataGrid component modernization
   - Current state analysis with visual examples
   - Two modernization options (Minimal, Maximum)
   - Recommended approach: Option A (Minimal Modernization)
   - Complete implementation guide with SCSS changes
   - Header, cell, and row styling enhancements
   - Focus states and hover transitions
   - Dark theme adjustments
   - Accessibility and performance considerations

12. **[TOAST_MODERNIZATION.md](./TOAST_MODERNIZATION.md)** - Toast component modernization
   - Current state analysis with visual examples
   - Three modernization options (Left Accent, Top Accent, Floating Card)
   - Recommended approach: Option A (Subtle All-Around with Left Accent)
   - Complete implementation guide with SCSS changes
   - Container, title, and close button enhancements
   - Left accent bar for color indication
   - Animation improvements
   - Dark theme adjustments
   - Accessibility considerations

## Quick Start

### For Implementers

1. Read [requirements.md](./requirements.md) to understand what needs to be done
2. Review [design.md](./design.md) for implementation details
3. Check [COLOR_MODERNIZATION.md](./COLOR_MODERNIZATION.md) for color specifications
4. Follow [tasks.md](./tasks.md) step-by-step for implementation

### For Reviewers

1. Review [requirements.md](./requirements.md) for acceptance criteria
2. Check [COLOR_COMPARISON.md](./COLOR_COMPARISON.md) for visual changes
3. Verify [design.md](./design.md) correctness properties
4. Validate implementation against [tasks.md](./tasks.md)

## Key Features

### Design Token Updates

- **Border Radius**: 4px → 8px (with 6px and 12px variants)
- **Shadows**: Softer, layered shadows with reduced opacity
- **Typography**: Expanded font weights (300-700), improved line heights
- **Spacing**: Consistent 16px-based scale
- **Colors**: Modern Slate-based palette (see color docs)

### Color Modernization Highlights

#### Light Theme
- **Primary**: #0268BC → #2563EB (vibrant blue)
- **Success**: #0F7B68 → #10B981 (distinct green)
- **Neutrals**: Blue-tinted → Slate-based (warm undertones)
- **Background**: #F0F2F4 → #F8FAFC (softer)

#### Dark Theme
- **Primary**: #0097D1 → #3B82F6 (brighter)
- **Text**: #959BA2 → #CBD5E1 (much better contrast!)
- **Neutrals**: Cold grays → Slate-based (refined)
- **Background**: #02020E → #020617 (richer)

### Component Updates

- Buttons: Modern radius, smooth transitions
- Forms: Rounded inputs, better focus states
- Panels/Cards: Elevated appearance with refined shadows
- Modals: Larger radius for prominence
- SideNav: Modern selection with subtle background + accent bar
- Badges: Rounded corners, better spacing, semibold typography
- CallOuts: Rounded corners, subtle borders, refined colors with accent bar
- FilterGroups: Connected buttons with rounded ends, modern selected state
- DataGrid: Rounded container, enhanced header, optimized cell padding, smooth hover transitions
- Toast: Rounded corners, left accent bar, semibold title, always-visible close button
- All components: Consistent spacing and modern colors

## Implementation Status

Track progress in [tasks.md](./tasks.md):

- ✅ Core border radius variables
- ✅ Shadow system modernization
- ✅ Typography enhancements
- ✅ Transition system
- ✅ Component variables (buttons, forms, panels, modals)
- ✅ Color system refinements (see color docs)
- ⏳ SideNav modernization (NEW - see SIDENAV_MODERNIZATION.md)
- ⏳ Badge modernization (NEW - see BADGE_MODERNIZATION.md)
- ⏳ CallOut modernization (NEW - see CALLOUT_MODERNIZATION.md)
- ⏳ FilterGroup modernization (NEW - see FILTERGROUP_MODERNIZATION.md)
- ⏳ DataGrid modernization (NEW - see DATAGRID_MODERNIZATION.md)
- ⏳ Toast modernization (NEW - see TOAST_MODERNIZATION.md)
- ⏳ Testing and validation

## Design Philosophy

### Inspired By

- [shadcn/ui](https://ui.shadcn.com/) - Modern, minimalist aesthetic
- [Tailwind CSS](https://tailwindcss.com/) - Slate color palette
- [Radix UI](https://www.radix-ui.com/) - Accessible design tokens
- Contemporary design systems (GitHub, Linear, Vercel)

### Core Principles

1. **Minimalism**: Clean, uncluttered interfaces
2. **Accessibility**: WCAG 2.1 Level AA compliance
3. **Consistency**: Harmonious spacing and color scales
4. **Modern**: Aligned with current design trends
5. **Professional**: Sophisticated but not flashy

## Backward Compatibility

✅ **No Breaking Changes**
- All variable names unchanged
- EUI aliases maintained
- Components work without modification
- Drop-in replacement

## Testing Strategy

### Dual Approach

1. **Unit Tests**: Specific examples and edge cases
2. **Property Tests**: Universal correctness properties

### Coverage Areas

- Border radius values
- Shadow layering and opacity
- Typography hierarchy
- Color contrast (WCAG AA)
- Spacing scale consistency
- Backward compatibility
- Dual theme support

## References

- [shadcn/ui Design Principles](https://ui.shadcn.com/)
- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Design Elevation](https://material.io/design/environment/elevation.html)
- [Inclusive Components](https://inclusive-components.design/)

## Questions?

- **Requirements unclear?** See [requirements.md](./requirements.md)
- **Implementation details?** See [design.md](./design.md)
- **Color questions?** See [COLOR_MODERNIZATION.md](./COLOR_MODERNIZATION.md)
- **Visual comparison?** See [COLOR_COMPARISON.md](./COLOR_COMPARISON.md)
- **Form layout issues?** See [FORM_LAYOUT_FIX.md](./FORM_LAYOUT_FIX.md)
- **SideNav modernization?** See [SIDENAV_MODERNIZATION.md](./SIDENAV_MODERNIZATION.md)
- **Badge modernization?** See [BADGE_MODERNIZATION.md](./BADGE_MODERNIZATION.md)
- **CallOut modernization?** See [CALLOUT_MODERNIZATION.md](./CALLOUT_MODERNIZATION.md)
- **FilterGroup modernization?** See [FILTERGROUP_MODERNIZATION.md](./FILTERGROUP_MODERNIZATION.md)
- **Next steps?** See [tasks.md](./tasks.md)

---

**Ready to implement?** Start with task 1 in [tasks.md](./tasks.md)!
