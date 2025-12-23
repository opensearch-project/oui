# Rules for AI Assistants

**IF YOU ARE AN AI ASSISTANT YOU MUST FOLLOW THESE RULES**

## Standard Development Workflow

1. **Read documentation first**: Before starting work, read DEVELOPER_GUIDE.md and documents in `wiki/` to understand the build system, tooling, and development workflow.

2. **Understand project structure**: Before working in any area, read relevant documentation to understand specific patterns and conventions.

3. **Respect .gitignore**: When looking for source code to modify, ignore any files and folders mentioned in .gitignore.

4. **No unauthorized markdown**: Do not create additional markdown files in the repository unless explicitly instructed to.

5. **Use yarn exclusively**: Always use `yarn` instead of `npm` for package management.

6. **Use OUI components**: Always use components from OUI instead of native HTML elements. Follow the comprehensive usage guidelines for proper component usage, layout patterns, and best practices.

7. **Adding dependencies**: When adding a new dependency to package.json, add it to the root package.json.

## Testing Guidelines

8. **Write clear test assertions**: Use specific expectations (e.g. `expect(var).toBeGreaterThan(5)`) instead of boolean checks (`expect(var > 5).toBe(true)`).

9. **Keep tests focused**: Avoid unit tests that test too much - prefer tests that test small pieces of functionality.

## Documentation Guidelines

### File Placement Rules
- **`wiki/`** → ONLY permanent reference documentation (patterns, guides, architecture)
- **`tasks/`** → ALL audits, proposals, refactoring plans, sprint work
- **`design/`** → Technical specifications
- **`requirements/`** → Product requirements

### Restrictions
- **NEVER** create audit/proposal/refactoring docs in `wiki/`
- **NEVER** create docs in workspace root

### Maintenance
- **Archive completed work**: Move completed docs to appropriate archive folder before committing
- **Use kebab-case**: Keep file naming consistent with kebab-case
- **Avoid duplication**: Link to existing docs instead of repeating content
- **Update dates**: Use YYYY-MM-DD format for "Last Updated" dates

## Git Commit Requirements

### Pre-commit Checklist
1. **Run tests**: `yarn test` - must pass before committing
2. **Run build**: `yarn build` - must succeed before committing
3. **Lint runs automatically**: The pre-commit hook runs `yarn lint` (includes linting and formatting)
4. **Fix build failures**: If build fails, fix errors and commit again

### Commit Message Format
**Always ask user first:** "Include full verbatim prompts in commit message? (y/n)"

#### With Prompts Template:
```
<commit message - wrapped at 72 characters>

Detailed explanation of changes and testing (if needed).

----------------------------------------------------------------------
<prompt: Full verbatim prompt 1 - wrapped at 72 chars per line.
Include ALL code snippets, details, and formatting for auditability.>

<prompt: Full verbatim prompt 2 - wrapped at 72 chars per line.
DO NOT shorten, snip, or truncate. Keep COMPLETELY VERBATIM.>
```

#### Without Prompts Template:
```
<commit message - wrapped at 72 characters>

Detailed explanation of changes and testing (if needed).
```

### Formatting Rules
1. **First line**: Clear, concise summary (50-72 characters)
2. **Separator**: Exactly 70 dashes between message and prompts
3. **Prompts**: COMPLETELY VERBATIM - no shortening or truncation
4. **Line wrapping**: 72 characters per line consistently
5. **Author format**: Use configured git username with ` (<AI ASSISTANT NAME>)` appended
6. **Ignore messages**: Disregard user input prefixed with `|` when constructing commit prompts

**Purpose**: Full verbatim prompts enable auditability, debugging context, and tracing issues to original requests.

## Build System (CRITICAL)

**This project uses `yarn` exclusively**

### Essential Commands
```bash
# Install/update dependencies
yarn install

# Build the library
yarn build

# Run Storybook dev server
yarn start

# Run tests
yarn test

# Run linting and type checking
yarn lint
```

### Build Process Notes
- **Linting**: Pre-commit hooks automatically run `yarn lint`
- **Testing**: Always run `yarn test` before committing
- **Building**: Always run `yarn build` to verify no build errors
- **Development**: Use `yarn start` to run the Storybook development server

## 🎨 shadcn/UI Component Management (CRITICAL)

**This project uses shadcn/ui (built on Radix UI primitives).**

### Component Structure Rules

1. **Base components**: `src/components/ui/` contains vanilla shadcn components - DO NOT modify these directly
2. **Custom components**: `src/components/custom/` contains OUI-specific extensions and customizations
3. **Exports**: Ensure `src/components/index.ts` exports the correct component from the appropriate directory

### Styling Conventions

- **Tailwind classes**: Use `oui:` prefixes (e.g., `oui:bg-primary`, `oui:text-sm`)
- **CSS variables**: Use `oui-` prefixes for shadcn variables (e.g., `--oui-primary`, `--oui-background`)

### Extension Pattern

When you need to add functionality to a shadcn component:
1. Create a corresponding file in `src/components/custom/`
2. Import and extend the base component from `src/components/ui/`
3. Add your customizations to the custom component
4. Export the custom component from `src/components/index.ts`

Example:
```typescript
// src/components/custom/button.tsx
import { Button as BaseButton } from '../ui/button';
// Add your customizations here

// src/components/index.ts
export { Button } from './custom/button'; // Export custom, not ui version
``` 