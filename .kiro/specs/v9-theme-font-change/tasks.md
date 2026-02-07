# Implementation Plan: V9 Theme Font Change

## Overview

This implementation plan covers changing the primary font family in the v9 theme from 'Rubik' to 'Roboto Mono'. The change is isolated to a single SASS file within the v9 theme directory, ensuring no impact on other themes.

## Tasks

- [x] 1. Update v9 theme typography variables
  - [x] 1.1 Modify `$ouiFontFamily` variable in `src/themes/v9/global_styling/variables/_typography.scss`
    - Change from `'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`
    - Change to `'Roboto Mono', Consolas, Menlo, Courier, monospace`
    - Ensure `!default` flag is preserved
    - _Requirements: 1.1, 1.2, 1.4_
  
  - [x] 1.2 Modify `$ouiCodeFontFamily` variable in the same file
    - Change from `'Source Code Pro', Consolas, Menlo, Courier, monospace`
    - Change to `'Roboto Mono', Consolas, Menlo, Courier, monospace`
    - Ensure `!default` flag is preserved
    - _Requirements: 2.1, 2.2, 2.4_

- [x] 2. Verify theme isolation
  - [x] 2.1 Confirm default theme typography is unchanged
    - Check `src/global_styling/variables/_typography.scss` still has 'Inter UI'
    - _Requirements: 5.2_
  
  - [x] 2.2 Confirm oui-next theme typography is unchanged
    - Check `src/themes/oui-next/global_styling/variables/_typography.scss` is unmodified
    - _Requirements: 5.3_

- [x] 3. Checkpoint - Build and lint verification
  - Run `yarn lint` to verify SASS lint passes
  - Run `yarn build` to verify compilation succeeds
  - Ensure all tests pass, ask the user if questions arise.
  - _Requirements: 6.1, 6.2_

- [x] 4. Verify build output
  - [x] 4.1 Check compiled v9 dark theme CSS contains 'Roboto Mono'
    - Inspect build output for `--oui-font-family` value
    - _Requirements: 3.3, 6.3_
  
  - [x] 4.2 Check compiled v9 light theme CSS contains 'Roboto Mono'
    - Inspect build output for `--oui-font-family` value
    - _Requirements: 3.4, 6.3_
  
  - [x] 4.3 Verify other themes have original fonts unchanged
    - Check default theme CSS still has 'Inter UI'
    - _Requirements: 6.4_

- [x] 5. Final checkpoint - Ensure all verifications pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- This is a minimal change affecting only one file: `src/themes/v9/global_styling/variables/_typography.scss`
- The EUI aliases (`$euiFontFamily`, `$euiCodeFontFamily`) automatically update since they reference the OUI variables
- CSS custom properties (`--oui-font-family`, `--oui-code-font-family`) automatically update since they reference the SASS variables
- No component code changes are required
- Visual verification can be done by running `yarn start` and switching themes in the documentation site
