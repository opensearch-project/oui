# OpenSearch Dashboards Migration Guide: EUI to @opensearch-project/oui (shadcn-based)

## Overview

This guide outlines the migration strategy from the current design system (@opensearch-project/oui@1.x, an EUI fork) to the new @opensearch-project/oui@2.x design system based on shadcn/ui.

**Key Migration Approach**: This migration will be **incremental and horizontal**, meaning:
- **Incremental**: Migrate parts of OSD incrementally, not all at once.
- **Horizontal**: Translate existing interfaces horizontally into the new OUI while maintaining functionality
- **Safe**: Rollback is possible at any point during the migration

## Migration Strategy

### High-Level Approach

We will design a foundational set of components up front to ensure system cohesion, rather than waiting to define the entire system before use. As we consume this library in OpenSearch Dashboards—migrating existing experiences and building new ones—we'll incrementally develop additional components and make them available.

During this process, we will either not expose components for consumption or mark them experimental to avoid people relying on components that may change.

### Migration Phases

#### Phase 1: Prepare System for Consumption
**Goal**: Can start building against design system for first dogfooding exercise

**Includes**:
- Setup with vanilla shadcn/ui
- Configure foundational system to align with OUI 1.x v9 theme to avoid unevenness
- Remove unnecessary components or capabilities (or call them out as experimental)
- Evaluate and design initial set of components ready for consumption
- Ensure exposed components are tested and solidified for use

**Initial Component Set**: Layout primitives (Flex, Container), Typography, Button, Input, Card, Alert

#### Phase 2: Dogfood in Existing Component
**Goal**: Make OpenSearch Dashboards depend on the new library and migrate an existing component to work out development kinks

**Target**: Left navigation component
**Focus**: Integration testing, build system compatibility, CSS scoping validation

#### Phase 3: Incremental Migration of High-Value Pages
**Goal**: Migrate additional pages that provide customer value and increase system coverage

**Process for each page**:
1. Identify missing components and design system functionality needed for the page
2. Build required components and fill system gaps
3. Ensure comprehensive testing before and after migration
4. Implement feature flags to enable switching between old and new systems
5. Release with monitoring and feedback collection
6. Clean up legacy code once migration is stable

**Migration Priority**: Start with high-level chrome (navigation, headers), then migrate pages with highest customer impact (e.g., dashboards). New pages can use the new system immediately, provided required components are available.

## Migration Methodology

### Page-Based Migration Process

We migrate by **complete pages and features** rather than individual components to ensure cohesive user experiences and thoroughly validate the design system in realistic contexts.

#### Step 1: Page Assessment
```bash
# Inventory components used in a page/feature
grep -r "Eui" src/plugins/[feature]/public/components/ --include="*.tsx" | sort | uniq -c
```

**Assessment Checklist**:
- [ ] Catalog all EUI components used in the page/feature
- [ ] Identify missing OUI components that need to be built
- [ ] Identify missing testing or `data-test-subj` attributes
- [ ] Review accessibility requirements
- [ ] Plan feature flag implementation

#### Step 2: Component Gap Analysis
- Review [Component Mapping Reference](./oui-1.x-2.x-component-mapping-reference.md) for available components
- Identify missing components that need to be built first
- Prioritize component creation based on page and overall OSD requirements

#### Step 3: Test Coverage Validation & Backfilling
**Goal**: Ensure adequate automation testing exists to validate functionality before and after migration

**Pre-Migration Testing Checklist**:
- [ ] Audit existing unit tests for the page/feature being migrated
- [ ] Identify gaps in test coverage for critical user flows
- [ ] Backfill missing unit tests for components being migrated
- [ ] Create integration tests to validate page-level functionality
- [ ] Document expected behavior and edge cases
- [ ] Establish baseline test suite that must pass both before and after migration

**Testing Requirements**:
- All critical user interactions must have corresponding tests
- Data-test-subj attributes must be covered in test assertions
- Component prop combinations and edge cases should be tested
- Error states and loading states must be validated

#### Step 4: Migration Execution

**Migration Checklist per Page**:
- [ ] Update import statements to use @opensearch-project/oui
- [ ] Map component props using [Component Mapping Reference](./oui-1.x-2.x-component-mapping-reference.md)
- [ ] **Critical**: Preserve all `data-test-subj` attributes to keep tests passing
- [ ] Update styling using new design tokens and utility classes
- [ ] Replace icons with Lucide React equivalents
- [ ] Implement feature flag for gradual rollout
- [ ] Test functionality in isolation and integration

#### Step 5: Validation & Release
- [ ] Run all tests to ensure nothing is broken
- [ ] Verify accessibility features (keyboard navigation, screen readers)
- [ ] Enable feature flag for internal testing
- [ ] Monitor for issues and gather feedback
- [ ] Roll out to users progressively
- [ ] Remove feature flag once stable

## Critical: Test ID Preservation During Migration

**Critical Rule**: All `data-test-subj` attributes MUST be preserved.

**Why this is critical**: The `data-test-subj` attributes are used by automated tests throughout the OpenSearch Dashboards codebase. Changing or removing them will cause test failures and break CI/CD pipelines.

```typescript
// CRITICAL: Always preserve data-test-subj exactly
// ✅ Correct migration
// Before: <EuiButton data-test-subj="save-workspace">Save</EuiButton>
// After:  <Button data-test-subj="save-workspace">Save</Button>

// ❌ Never do this - breaks existing tests
// <Button testId="save-workspace">Save</Button>
// <Button data-testid="save-workspace">Save</Button>
// <Button test-id="save-workspace">Save</Button>
```

**Common Mistakes to Avoid:**
- Changing attribute name from `data-test-subj` to `testId`, `data-testid`, or `test-id`
- Modifying the attribute value in any way
- Removing the attribute entirely
- Adding prefixes or suffixes to existing values

## Migration Examples

### Basic Button Migration
**Before:**
```typescript
<EuiButton
  data-test-subj="workspace-detail-collaborator-table-actions"
  color="primary"
  fill={false}
  size="s"
  iconType="arrowDown"
  iconSide="right"
  onClick={handleClick}
>
  Actions
</EuiButton>
```

**After:**
```typescript
<Button
  data-test-subj="workspace-detail-collaborator-table-actions"
  variant="outline"
  size="sm"
  onClick={handleClick}
  className="flex items-center gap-2"
>
  Actions
  <ChevronDownIcon className="h-4 w-4" />
</Button>
```

### Modal Migration
**Before:**
```typescript
<EuiConfirmModal
  data-test-subj="delete-confirm-modal"
  title="Delete collaborator"
  onCancel={onCancel}
  onConfirm={onConfirm}
  cancelButtonText="Cancel"
  confirmButtonText="Confirm"
>
  <EuiText>Confirmation message</EuiText>
</EuiConfirmModal>
```

**After:**
```typescript
<AlertDialog>
  <AlertDialogTrigger asChild>
    {/* Trigger button */}
  </AlertDialogTrigger>
  <AlertDialogContent data-test-subj="delete-confirm-modal">
    <AlertDialogHeader>
      <AlertDialogTitle>Delete collaborator</AlertDialogTitle>
    </AlertDialogHeader>
    <AlertDialogDescription>
      Confirmation message
    </AlertDialogDescription>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Troubleshooting Common Issues

### Styling Conflicts
**Problem**: New components don't match existing design or conflict with CSS

**Solutions**:
- Verify you're using scoped CSS (`style.scoped.css`) when running alongside existing systems
- Check design token usage - ensure you're using semantic tokens rather than hardcoded values
- Use `oui:` prefixed utility classes to avoid conflicts with existing styles
- Verify CSS variables are properly scoped with `--oui-` prefix

### Test Failures After Migration
**Problem**: Tests fail after component migration

**Solutions**:
- **Critical**: Verify `data-test-subj` preservation - this is the #1 cause of test failures
- Check for API changes in component props or event handlers
- Update test selectors if component structure changed
- Ensure test utilities are imported from correct location (`test-env` directory)

### Performance Regressions
**Problem**: Pages load slower after migration

**Diagnostic Steps**:
1. Use bundle analyzer to check for bundle size increases
2. Profile page load times before and after migration
3. Check network tab for additional HTTP requests

**Solutions**:
- **Optimize Imports**: Use barrel imports to leverage tree-shaking
- **Review Dependencies**: Ensure you're not importing heavy, unused libraries
- **Lazy Loading**: Consider lazy loading for non-critical components
- **Bundle Analysis**: Remove any unnecessary polyfills or duplicate dependencies

```typescript
// ✅ Recommended - barrel imports enable tree-shaking
import { Button, Card, Typography } from '@opensearch-project/oui';

// ❌ Avoid - deep imports may bypass optimizations
import { Button } from '@opensearch-project/oui/components/button';
```

### Accessibility Issues
**Problem**: Screen readers or keyboard navigation broken after migration

**Solutions**:
- Review ARIA attributes - some may need updating for new component structure
- Test focus management and keyboard navigation thoroughly
- Check color contrast with new design tokens
- Verify semantic HTML structure is maintained

## Migration Tracking

Migration completion and component availability are tracked in the [Component Mapping Reference](./oui-1.x-2.x-component-mapping-reference.md). This document provides:

- **Component Status**: Which components are available, in progress, or planned
- **Migration Status**: Tracking of EUI → OUI component mappings
- **Priority**: Component development priorities based on OSD usage
- **Coverage**: How much of OSD can be migrated with currently available components

For tracking specific page migrations within your team, use feature flags and standard project management tools rather than maintaining migration state in code.

## Testing Strategy

Our testing approach ensures functionality remains intact during migration while acknowledging that visual changes are expected.

### Core Testing Principles
- **Functionality First**: Focus on preserving behavior, not visual appearance
- **Test Compatibility**: Same tests should pass before and after migration
- **Gap Filling**: Backfill missing test coverage before migration
- **Experience Validation**: Ensure new UI doesn't create uneven user experience

### Integration Testing Strategy
**Pre-Migration Requirements**:
- [ ] Audit existing integration tests for pages being migrated
- [ ] Identify gaps in integration test coverage
- [ ] Backfill missing integration tests for critical user flows
- [ ] Document expected behavior and user journeys
- [ ] Establish baseline integration test suite

**Migration Validation**:
- [ ] All pre-migration integration tests must continue to pass
- [ ] Tests should work identically whether feature flag is on or off
- [ ] New tests may be added for new functionality, but existing behavior should be preserved

### Unit Testing Strategy
- **Existing Tests**: All current unit tests must continue to pass after migration
- **Updated Tests**: Only update tests if component APIs change, not for styling
- **New Tests**: Add tests for any new functionality introduced during migration
- **Test ID Preservation**: Critical for maintaining test compatibility

```typescript
// Test utility to verify data-test-subj preservation
const verifyTestIds = (component: ReactWrapper) => {
  const originalTestIds = extractTestIds(originalComponent);
  const migratedTestIds = extractTestIds(component);
  expect(migratedTestIds).toEqual(originalTestIds);
};
```

### Visual Testing Approach
**No Visual Regression Testing Required**: The new design system will intentionally look different. Instead:
- Focus on functional equivalence, not pixel-perfect visual matching
- Validate layout and spacing make sense in context
- Ensure accessibility standards are maintained or improved

### User Acceptance Testing (UAT)
**Goal**: Validate that the new experience feels cohesive and doesn't create jarring inconsistencies

**UAT Checklist**:
- [ ] Mixed UI states (old + new components on same page) feel acceptable
- [ ] User flows work end-to-end without confusion
- [ ] New components meet or exceed usability of old ones
- [ ] No broken functionality or missing features
- [ ] Accessibility requirements are maintained
- [ ] Performance is acceptable or improved

**UAT Sign-off Process**:
1. Demo migrated pages to UX team and stakeholders
2. Gather feedback on user experience consistency
3. Address major issues before broader rollout
4. Document any known limitations or planned improvements

## Success Criteria

### Technical Requirements
- [ ] All `data-test-subj` attributes preserved exactly
- [ ] Unit and integration tests continue to pass
- [ ] Performance maintained or improved (no significant regressions)
- [ ] TypeScript compilation without errors
- [ ] Bundle size impact analyzed and within acceptable limits
- [ ] Accessibility standards maintained or improved

### Process Requirements
- [ ] Feature flags implemented for safe rollout
- [ ] Code review includes migration checklist validation
- [ ] UAT sign-off completed before full deployment
- [ ] Rollback plan tested and ready if needed
- [ ] Migration progress tracked in component mapping reference

## Rollback Strategy

Our rollback approach is designed to be simple and reliable, leveraging feature flags and incremental migration.

### Feature Flag Based Rollback
**Primary Rollback Method**: Turn off the feature flag to revert to the original EUI experience.

**Benefits**:
- **Instant**: No code deployment needed for rollback
- **Safe**: Returns users to the proven, stable experience
- **Granular**: Can rollback specific pages or features independently
- **Reversible**: Easy to re-enable once issues are resolved

### Incremental Migration Protection
**Controlled Scope**: We migrate parts of OSD incrementally, which means:
- Issues are contained to specific pages or features
- Rollback impact is limited to the migrated area
- Rest of the application remains unaffected
- Low risk of system-wide problems

### Rollback Process
1. **Issue Detection**: Monitor for errors, user complaints, or performance problems
2. **Assessment**: Determine if issue requires immediate rollback or can be fixed quickly
3. **Rollback Execution**: Disable feature flag for affected pages/features
4. **Resolution**: Fix issues in development environment
5. **Re-deployment**: Re-enable feature flag after testing fixes
6. **Monitoring**: Continue monitoring for any remaining issues

**Emergency Rollback**: Feature flags can be disabled instantly without requiring code deployment, making rollback safe even in critical situations.

## Resources

- **[Component Mapping Reference](./oui-1.x-2.x-component-mapping-reference.md)** - Detailed EUI → OUI component mappings with prop translations
- **[shadcn/ui Documentation](https://ui.shadcn.com)** - Base component library documentation
- **[Component Development Guide](./component-development.md)** - How to build and extend OUI components
- **[Testing Guide](./testing.md)** - Testing patterns for OUI components


---

**Note**: This migration should be treated as a major architectural change. Each phase should be thoroughly tested and reviewed before proceeding to the next phase.