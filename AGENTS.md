# Rules for AI Assistants

**IF YOU ARE AN AI ASSISTANT YOU MUST FOLLOW THESE RULES**

## Standard Development Workflow

1. Before starting work, read DEVELOPER_GUIDE.md to understand the build system, tooling, and development workflow.

2. If you are working on a feature, first read the design doc for the feature in docs/features and any other feature required for the task.

3. Before working in any workspace, read that workspace's README to understand its specific patterns and conventions. Always update the appropriate README or design document when you make a change that impacts the contents of these documents.

4. When looking for source code to modify, ignore any files and folders mentioned in .gitignore.

5. Do not create additional markdown files in the repository unless you are instructed explicitly to.

6. Use `yarn` instead of `npm`.

7. Commit your changes in git using a well-formed commit message consisting of a single sentence summary and no more than a few paragraphs explaining the change and your testing. After this explanation, place the prompt the user used to trigger this work prefixed with a "Prompt: " after a single line consisting of '---'. Make sure there are no empty lines before or after this line. Word wrap all paragraphs at 72 columns including the prompt. If multiple prompts contributed to a commit, attempt to formulate an equivalent single prompt that would have had the same outcome and use that instead of just the original prompt. For the author of the commit, use the configured username in git with ' (<AI ASSISTANT NAME>)' appended and the user email. For example, `git commit --author="John Doe (<AI ASSISTANT NAME>) <john@bigco.com>"`. If the user's input is prefixed with a `|` character, disregard that message when constructing the commit prompt section. The pre-commit hook will automatically run `brazil-build` which includes linting, formatting, building, and testing. If the build fails, fix any errors and commit again.

8. When working on unit tests, write tests that will fail with clear errors (e.g. use `expect(var).toBeGreaterThan(5)`, instead of `expect(var > 5).toBe(true)`).

9. Avoid unit tests that test too much, prefer tests that test small piece of functionality.

10. When adding a new dependency to package.json in a workspace, first see if that dependency is shared with any other workspaces. If it is, add it to the root package.json instead.

11. Always use components from OUI instead of native HTML elements. Follow the comprehensive usage guidelines for proper component usage, layout patterns, and best practices.

**ALWAYS FOLLOW THESE RULES WHEN YOU WORK IN THIS PROJECT**
