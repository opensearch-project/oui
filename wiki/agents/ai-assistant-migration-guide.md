# AI Assistant Migration Guide: EUI to @opensearch-project/oui

<!--TODO: Review as we get into actual migration to help AI assistants work more efficiently-->

> **🤖 For AI Assistants**: This guide provides systematic, actionable instructions for automating OpenSearch Dashboards design system migrations. Follow the workflow precisely to ensure consistent, safe migrations.

## Migration Philosophy & Strategy

### Page-Based Migration Approach
**Migrate complete pages/features**, not individual components, to ensure cohesive user experiences and thorough design system validation.

### Critical Non-Negotiables
1. **NEVER modify `data-test-subj` attributes** - Breaking tests breaks CI/CD
2. **ALWAYS read files before editing** - Understand context and dependencies
3. **Use feature flags** - Enable safe rollback during migration
4. **Test immediately** - Catch issues before they compound
5. **Follow component mapping exactly** - Use [Component Mapping Reference](../oui-1.x-2.x-component-mapping-reference.md)

## AI Automation Workflow

### Phase 1: Pre-Migration Analysis

#### Step 1.1: Page/Feature Assessment
```bash
# Use this exact command structure for analysis
grep -r "Eui" [target-directory] --include="*.tsx" --include="*.ts" | sort | uniq -c
```

**AI Checklist Template:**
```markdown
## Page Assessment: [Page/Feature Name]

### EUI Components Found:
- [ ] EuiButton (X occurrences)
- [ ] EuiFlexGroup (X occurrences)
- [ ] EuiText (X occurrences)
[Continue with all found components]

### Phase 1 Components Available:
✅ Ready: [List any marked as ✅ Ready in mapping table]
⬜ Phase 1: [List any marked as ⬜ Phase 1 - need verification]
❌ Missing: [List any not in Phase 1]

### Migration Readiness: [Ready/Not Ready]
**Blockers:** [List any components not available in Phase 1]
```

#### Step 1.2: Data Test Subject Audit
**Critical**: Document ALL test IDs before migration

```bash
# Extract all data-test-subj attributes
grep -rn "data-test-subj" [target-files] > test-ids-before.txt
```

### Phase 2: Component Gap Analysis

#### Step 2.1: Reference Component Mapping
**ALWAYS check**: [Component Mapping Reference](../oui-1.x-2.x-component-mapping-reference.md)

**Automated Gap Check Process:**
1. For each EUI component found → Look up in mapping table
2. Check status: ⬜ Phase 1 (needs verification) or other status
3. If ⬜ Phase 1: Add to "needs verification" list
4. If not Phase 1: Flag as blocker

#### Step 2.2: Create Migration Plan
```markdown
## Migration Plan: [Page Name]

### Components Requiring Verification:
⬜ **EuiButton** → Button (verify variant mappings)
⬜ **EuiFlexGroup** → Flex (verify responsive behavior)
[Continue for all ⬜ Phase 1 components]

### Expected Prop Changes:
- EuiButton: `color="primary"` → `variant="default"`
- EuiFlexGroup: `gutterSize="m"` → `gap="md"`
[Use mapping table for exact changes]

### Test IDs to Preserve: [Count] total
[List critical ones]
```

### Phase 3: Test Coverage Validation (Pre-Migration)

```bash
# Find associated test files
find . -name "*[component-name]*.test.*" -o -name "*[component-name]*.spec.*"

# Run existing tests to establish baseline
npm run test -- --testPathPattern=[path-to-tests]
```

### Phase 4: Migration Execution

#### Step 4.1: Import Updates
**Pattern**: Replace EUI imports with OUI equivalents using barrel imports

```typescript
// BEFORE
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText
} from '@elastic/eui';

// AFTER
import {
  Button,
  Flex,
  Typography
} from '@opensearch-project/oui';
```

#### Step 4.2: Component Migration (Follow Mapping Table Exactly)

**Phase 1 Component Migrations:**

**EuiButton → Button**
```typescript
// BEFORE
<EuiButton
  data-test-subj="save-workspace"
  color="primary"
  fill={true}
  size="s"
  iconType="save"
  onClick={handleSave}
>
  Save
</EuiButton>

// AFTER
<Button
  data-test-subj="save-workspace"
  variant="default"
  size="sm"
  onClick={handleSave}
  className="flex items-center gap-2"
>
  <SaveIcon className="h-4 w-4" />
  Save
</Button>
```

**EuiFlexGroup/EuiFlexItem → Flex + div**
```typescript
// BEFORE
<EuiFlexGroup direction="row" alignItems="center" gutterSize="m">
  <EuiFlexItem grow={false}>
    <EuiTitle size="m"><h2>Title</h2></EuiTitle>
  </EuiFlexItem>
  <EuiFlexItem>
    <EuiText>Description</EuiText>
  </EuiFlexItem>
</EuiFlexGroup>

// AFTER
<Flex direction="row" align="center" gap="md" className="w-full">
  <div className="flex-shrink-0">
    <Typography variant="h2" size="lg">Title</Typography>
  </div>
  <div className="flex-1">
    <Typography variant="body">Description</Typography>
  </div>
</Flex>
```

**EuiText/EuiTitle → Typography**
```typescript
// BEFORE
<EuiTitle size="s">
  <h3>Section Title</h3>
</EuiTitle>
<EuiText size="s" color="subdued">
  Helper text
</EuiText>

// AFTER
<Typography variant="h3" size="sm">
  Section Title
</Typography>
<Typography variant="body" size="sm" className="text-muted-foreground">
  Helper text
</Typography>
```

#### Step 4.3: Form Component Migrations

**EuiFormRow + EuiFieldText → FormField + Input**
```typescript
// BEFORE
<EuiCompressedFormRow label="Username" helpText="Enter username">
  <EuiCompressedFieldText
    data-test-subj="username-input"
    value={username}
    onChange={handleChange}
    isInvalid={hasError}
  />
</EuiCompressedFormRow>

// AFTER
<FormField>
  <FormLabel>Username</FormLabel>
  <Input
    data-test-subj="username-input"
    value={username}
    onChange={handleChange}
    error={hasError}
    size="sm"
  />
  <FormDescription>Enter username</FormDescription>
  {hasError && <FormErrorMessage>Error message</FormErrorMessage>}
</FormField>
```

#### Step 4.4: Display Component Migrations

**EuiCard → Card**
```typescript
// BEFORE
<EuiCard
  data-test-subj="workspace-card"
  title="Workspace Name"
  description="Workspace description"
  footer={<EuiButton>Open</EuiButton>}
/>

// AFTER
<Card data-test-subj="workspace-card">
  <CardHeader>
    <CardTitle>Workspace Name</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Workspace description</p>
  </CardContent>
  <CardFooter>
    <Button>Open</Button>
  </CardFooter>
</Card>
```

**EuiAlert → Alert**
```typescript
// BEFORE
<EuiAlert
  data-test-subj="error-alert"
  color="danger"
  iconType="alert"
  title="Error occurred"
>
  Something went wrong
</EuiAlert>

// AFTER
<Alert variant="destructive" data-test-subj="error-alert">
  <AlertTriangleIcon className="h-4 w-4" />
  <AlertTitle>Error occurred</AlertTitle>
  <AlertDescription>Something went wrong</AlertDescription>
</Alert>
```

### Phase 5: Icon Migration

**Critical Pattern**: Icons change from props to child components

```typescript
// Icon Mapping Examples (see full mapping in component reference)
iconType="add" → <PlusIcon className="h-4 w-4" />
iconType="edit" → <EditIcon className="h-4 w-4" />
iconType="delete" → <TrashIcon className="h-4 w-4" />
iconType="save" → <SaveIcon className="h-4 w-4" />
iconType="search" → <SearchIcon className="h-4 w-4" />
```

### Phase 6: Validation & Testing

#### Step 6.1: Test ID Verification (Critical)
```bash
# Extract test IDs after migration
grep -rn "data-test-subj" [migrated-files] > test-ids-after.txt

# Compare counts (must be identical)
wc -l test-ids-before.txt test-ids-after.txt

# Detailed diff (should show no differences in IDs)
diff test-ids-before.txt test-ids-after.txt
```

#### Step 6.2: Automated Testing
```bash
# TypeScript compilation
npm run type-check

# Unit tests
npm run test -- --testPathPattern=[test-path]

# Build verification
npm run build

# Linting
npm run lint
```

#### Step 6.3: Feature Flag Implementation
```typescript
// Example feature flag pattern
const useNewUI = useFeatureFlag('workspace-ui-v2');

return useNewUI ? (
  // New OUI components
  <NewWorkspaceUI />
) : (
  // Original EUI components
  <OriginalWorkspaceUI />
);
```

## AI Automation Commands

### Discovery Commands
```bash
# Find all EUI usage in a directory
grep -r "import.*@elastic/eui" src/plugins/[plugin-name] --include="*.tsx"

# Count component usage
grep -r "EuiButton" src/ --include="*.tsx" | wc -l

# Find data-test-subj attributes
grep -rn "data-test-subj" src/plugins/[plugin-name] --include="*.tsx"
```

### Validation Commands
```bash
# Verify no EUI imports remain
! grep -r "@elastic/eui" [migrated-files]

# Verify test ID preservation
diff <(grep -o 'data-test-subj="[^"]*"' [original]) <(grep -o 'data-test-subj="[^"]*"' [migrated])

# Check for missing OUI imports
grep -r "Button\|Flex\|Typography" [files] | grep -v "import"
```

## Phase 1 Component Priority Queue

Based on [Component Mapping Reference](../oui-1.x-2.x-component-mapping-reference.md):

### ⬜ Phase 1 - Ready for Verification
1. **EuiButton** → Button (variant mappings need verification)
2. **EuiFlexGroup/EuiFlexItem** → Flex + div (responsive behavior needs testing)
3. **EuiText/EuiTitle** → Typography (color variants need verification)
4. **EuiFormRow/EuiFieldText** → FormField + Input (validation patterns need testing)
5. **EuiCard** → Card (action button patterns need definition)
6. **EuiAlert** → Alert (icon/dismiss patterns need verification)
7. **EuiContainer** → Container (responsive sizing maintained)
8. **EuiIcon** → Lucide React icons (see icon mapping table)

### Process for Each ⬜ Component
1. **Verify** the component works as documented
2. **Test** all prop mappings from the table
3. **Update** status from ⬜ to ✅ in mapping reference
4. **Document** any deviations or issues found

## Common Migration Patterns

### CSS Scoping (When Running Alongside EUI)
```css
/* Use oui: prefixes when both systems coexist */
.oui:bg-background { /* OUI background */ }
.oui:text-foreground { /* OUI text */ }
```

### Error Handling Patterns
```typescript
// Wrap migrations in error boundaries
<ErrorBoundary fallback={<LegacyComponent />}>
  <NewOUIComponent />
</ErrorBoundary>
```

### Performance Optimization
```typescript
// Use React.lazy for large component migrations
const NewWorkspaceUI = React.lazy(() => import('./NewWorkspaceUI'));

// Feature flag with Suspense
const WorkspaceComponent = () => {
  const useNewUI = useFeatureFlag('workspace-v2');

  return useNewUI ? (
    <Suspense fallback={<LoadingSpinner />}>
      <NewWorkspaceUI />
    </Suspense>
  ) : (
    <LegacyWorkspaceUI />
  );
};
```

## Migration Checklist Template (For AI Use)

```markdown
## Migration: [Page/Feature Name]

### Pre-Migration Analysis
- [ ] EUI components inventoried (count: X)
- [ ] Phase 1 availability confirmed
- [ ] Test IDs documented (count: X)
- [ ] Test files located and passing
- [ ] Migration plan created

### Component Verification (Phase 1 Only)
- [ ] EuiButton → Button (verified ⬜→✅?)
- [ ] EuiFlexGroup → Flex (verified ⬜→✅?)
- [ ] EuiText → Typography (verified ⬜→✅?)
[Continue for all components]

### Migration Execution
- [ ] Imports updated to @opensearch-project/oui
- [ ] Components migrated per mapping table
- [ ] All data-test-subj preserved (diff = 0)
- [ ] Icons migrated to child components
- [ ] Feature flag implemented

### Testing & Validation
- [ ] TypeScript compilation passes
- [ ] Unit tests pass
- [ ] Build succeeds
- [ ] Lint passes
- [ ] Visual verification complete
- [ ] Feature flag tested (on/off)

### Documentation
- [ ] Component mapping status updated
- [ ] Migration notes added
- [ ] Any deviations documented
```

## Troubleshooting Guide

### Issue: Component Not Available
**Problem**: EUI component not in Phase 1
**Solution**: Skip migration, document as blocker, continue with available components

### Issue: Test Failures
**Problem**: Tests fail after migration
**Solution**:
1. Verify `data-test-subj` preservation (most common issue)
2. Check component API changes
3. Update test selectors only if component structure changed

### Issue: Visual Differences
**Problem**: New components look different
**Solution**: Expected behavior - focus on functional equivalence, not pixel-perfect matching

### Issue: Performance Regression
**Problem**: Page slower after migration
**Solution**:
1. Check bundle size with analyzer
2. Verify tree-shaking with barrel imports
3. Add lazy loading if needed

## Success Criteria

A migration is complete when:
- ✅ All Phase 1 components verified and working
- ✅ All tests pass
- ✅ All `data-test-subj` attributes preserved
- ✅ Feature flag enables safe rollback
- ✅ Component mapping status updated
- ✅ No functional regressions detected

---

**Next Steps**: See [Design System Migration Guide](../design-system-migration-guide.md) for overall strategy and [Component Mapping Reference](../oui-1.x-2.x-component-mapping-reference.md) for detailed component mappings.