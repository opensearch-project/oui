# Implementation Plan: V9 Theme Modernization

## Overview

This implementation plan breaks down the v9 theme modernization into discrete, incremental tasks. Each task builds on previous work, with regular checkpoints to ensure quality. The approach focuses on updating design tokens first, then component variables, followed by comprehensive testing.

## Tasks

- [x] 1. Update core border radius variables
  - Modify `src/themes/v9/global_styling/variables/_borders.scss`
  - Change `$ouiBorderRadius` from 4px to 8px
  - Change `$ouiBorderRadiusSmall` from calc($ouiBorderRadius / 2) to 6px
  - Add new `$ouiBorderRadiusLarge` variable set to 12px
  - Ensure EUI aliases are updated
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 2. Modernize shadow system
  - [x] 2.1 Update shadow mixins in `src/themes/v9/global_styling/mixins/_shadow.scss`
    - Modify `ouiSlightShadow` mixin to use multiple layers with reduced opacity (0.08)
    - Modify `ouiBottomShadowSmall` mixin with softer blur radii and reduced opacity (0.1)
    - Modify `ouiBottomShadowMedium` mixin with layered shadows and reduced opacity (0.12)
    - Modify `ouiBottomShadow` mixin with softer shadows and reduced opacity (0.15)
    - Modify `ouiBottomShadowLarge` mixin with enhanced layering and reduced opacity (0.18)
    - Modify `ouiSlightShadowHover` mixin with reduced opacity (0.12)
    - Modify `ouiSlightShadowActive` mixin with reduced opacity (0.08)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_

  - [ ]* 2.2 Write property test for shadow modernization
    - **Property 2: Shadow System Modernization**
    - **Validates: Requirements 2.6, 2.7, 2.8**

- [ ] 3. Enhance typography system
  - [x] 3.1 Update typography variables in `src/themes/v9/global_styling/variables/_typography.scss`
    - Update `$ouiLineHeight` from 1.5 to 1.6 for improved readability
    - Add new `$ouiHeadingLineHeight` variable set to 1.3
    - Update `$ouiFontWeightLight` from 400 to 300
    - Update `$ouiFontWeightSemiBold` from 500 to 600
    - Update `$ouiFontWeightBold` from 500 to 700
    - Add new letter spacing variables: `$ouiLetterSpacingTight`, `$ouiLetterSpacingNormal`, `$ouiLetterSpacingWide`
    - Update `$ouiTitles` map to use `$ouiHeadingLineHeight` and updated font weights
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [ ]* 3.2 Write property test for typography hierarchy
    - **Property 3: Typography Hierarchy Consistency**
    - **Validates: Requirements 3.6**

- [ ] 4. Implement transition system
  - [x] 4.1 Create animation variables file `src/themes/v9/global_styling/variables/_animation.scss`
    - Define transition duration variables: `$ouiAnimSpeedExtraFast` (50ms), `$ouiAnimSpeedFast` (100ms), `$ouiAnimSpeedNormal` (200ms), `$ouiAnimSpeedSlow` (300ms), `$ouiAnimSpeedExtraSlow` (400ms)
    - Define easing function variables: `$ouiAnimEaseInOut`, `$ouiAnimEaseOut`, `$ouiAnimEaseIn`, `$ouiAnimEaseElastic`
    - Define common transition variables: `$ouiTransition`, `$ouiTransitionFast`, `$ouiTransitionSlow`
    - Create `ouiRespectMotion` mixin that respects prefers-reduced-motion
    - Add EUI aliases for all new variables
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.7_

  - [x] 4.2 Import animation variables in `src/themes/v9/v9_globals.scss`
    - Add `@import 'global_styling/variables/animation';` to the variables import section
    - _Requirements: 5.1_

- [x] 5. Checkpoint - Verify core token updates
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Update button component variables
  - [x] 6.1 Modify button variables in `src/themes/v9/global_styling/variables/_buttons.scss`
    - Verify `$ouiButtonBorderRadius` inherits updated `$ouiBorderRadius` (8px)
    - Add `$ouiButtonTransition` variable using new transition tokens
    - _Requirements: 1.4, 5.5, 6.1_

  - [ ]* 6.2 Write unit tests for button variables
    - Test that `$ouiButtonBorderRadius` equals 8px
    - Test that `$ouiButtonTransition` includes background-color, border-color, and box-shadow
    - _Requirements: 1.4, 5.5, 6.1_

- [ ] 7. Update form component variables
  - [x] 7.1 Modify form variables in `src/themes/v9/global_styling/variables/_form.scss`
    - Change `$ouiFormControlBorderRadius` from 0 to `$ouiBorderRadiusSmall` (6px)
    - Change `$ouiFormControlCompressedBorderRadius` from 2px to `$ouiBorderRadiusSmall` (6px)
    - Update `$ouiCheckboxBorderRadius` to use `$ouiBorderRadiusSmall` (6px)
    - Add `$ouiFormControlTransition` variable using new transition tokens
    - _Requirements: 1.5, 5.6, 6.2_

  - [x] 7.2 Fix form control layout prepend/append border radius in `src/components/form/form_control_layout/_form_control_layout.scss`
    - Remove `border-radius: 0` from `.ouiFormControlLayout__prepend` and `.ouiFormControlLayout__append`
    - Add border radius to first prepend element (left side): `border-radius: $ouiFormControlBorderRadius 0 0 $ouiFormControlBorderRadius`
    - Add border radius to last append element (right side): `border-radius: 0 $ouiFormControlBorderRadius $ouiFormControlBorderRadius 0`
    - For compressed variant, use `$ouiFormControlCompressedBorderRadius`
    - Ensure icons and buttons within prepend/append maintain `border-radius: 0`
    - _Requirements: 1.5, 6.2_

  - [ ]* 7.3 Write unit tests for form variables
    - Test that form control border radii use 6px
    - Test that `$ouiFormControlTransition` includes border-color, box-shadow, and background-color
    - Test that prepend/append elements have correct border radius on outer edges
    - _Requirements: 1.5, 5.6, 6.2_

- [ ] 8. Add panel and card variables
  - [x] 8.1 Create or update panel variables in `src/themes/v9/global_styling/variables/_panel.scss`
    - Add `$ouiPanelBorderRadius` variable set to `$ouiBorderRadius` (8px)
    - Add `$ouiPanelPaddingModifier` variable set to `$ouiSize` (16px)
    - Add `$ouiCardBorderRadius` variable set to `$ouiBorderRadius` (8px)
    - Add EUI aliases for all new variables
    - _Requirements: 1.6, 6.3, 6.4_

  - [x] 8.2 Import panel variables if new file created
    - If `_panel.scss` is a new file, add import to `src/themes/v9/v9_globals.scss`
    - _Requirements: 1.6_

  - [ ]* 8.3 Write unit tests for panel variables
    - Test that panel and card border radii equal 8px
    - Test that panel padding uses spacing scale
    - _Requirements: 1.6, 6.3, 6.4_

- [ ] 9. Add modal and popover variables
  - [x] 9.1 Create or update modal/popover variables
    - Add `$ouiModalBorderRadius` variable set to `$ouiBorderRadiusLarge` (12px)
    - Add `$ouiPopoverBorderRadius` variable set to `$ouiBorderRadius` (8px)
    - Add EUI aliases for all new variables
    - Add to appropriate variable file (e.g., `_modal.scss` or `_popover.scss`)
    - _Requirements: 1.7, 6.5, 6.6_

  - [x] 9.2 Import modal/popover variables if new files created
    - If new variable files created, add imports to `src/themes/v9/v9_globals.scss`
    - _Requirements: 1.7_

  - [ ]* 9.3 Write unit tests for modal and popover variables
    - Test that modal border radius equals 12px
    - Test that popover border radius equals 8px
    - _Requirements: 1.7, 6.5, 6.6_

- [x] 10. Checkpoint - Verify component variable updates
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Refine color system
  - [x] 11.1 Update light theme colors in `src/themes/v9/global_styling/variables/_colors.scss`
    - Update `$ouiColorPrimary` from #0268BC to #2563EB (modern blue)
    - Update `$ouiColorSecondary` from #0F7B68 to #059669 (fresh green)
    - Update `$ouiColorAccent` from #9C47BF to #7C3AED (vibrant purple)
    - Update `$ouiColorSuccess` to #10B981 (modern green)
    - Update `$ouiColorWarning` from #E0A130 to #F59E0B (warm amber)
    - Update `$ouiColorDanger` from #C43D35 to #EF4444 (clean red)
    - Update `$ouiColorEmptyShade` from #FCFEFF to #FFFFFF (pure white)
    - Update `$ouiColorLightestShade` from #E3E5E8 to #F8FAFC (Slate-50)
    - Update `$ouiColorLightShade` from #D6D9DD to #E2E8F0 (Slate-200)
    - Update `$ouiColorMediumShade` from #ADB4BA to #94A3B8 (Slate-400)
    - Update `$ouiColorDarkShade` from #5A6875 to #475569 (Slate-600)
    - Update `$ouiColorDarkestShade` from #2A3947 to #1E293B (Slate-800)
    - Update `$ouiColorFullShade` from #0A1219 to #0F172A (Slate-950)
    - Update `$ouiPageBackgroundColor` from #F0F2F4 to #F8FAFC (Slate-50)
    - Update `$ouiColorHighlight` from #FFE1B0 to #FEF3C7 (softer amber)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 4.13_

  - [x] 11.2 Update dark theme colors in `src/themes/v9/v9_colors_dark.scss`
    - Update `$ouiColorPrimary` from #0097D1 to #3B82F6 (brighter blue)
    - Update `$ouiColorSecondary` from #129079 to #10B981 (vibrant green)
    - Update `$ouiColorAccent` from #AA63C4 to #A78BFA (softer purple)
    - Update `$ouiColorSuccess` to #10B981 (modern green)
    - Update `$ouiColorWarning` from #F4AE27 to #FBBF24 (brighter amber)
    - Update `$ouiColorDanger` from #CD5D56 to #F87171 (softer red)
    - Update `$ouiColorEmptyShade` from #0F171F to #020617 (Slate-950)
    - Update `$ouiColorLightestShade` from #19222B to #0F172A (Slate-900)
    - Update `$ouiColorLightShade` from #2A3540 to #1E293B (Slate-800)
    - Update `$ouiColorMediumShade` from #5C666F to #64748B (Slate-500)
    - Update `$ouiColorDarkShade` from #959BA2 to #94A3B8 (Slate-400)
    - Update `$ouiColorDarkestShade` from #E3E5E9 to #E2E8F0 (Slate-200)
    - Update `$ouiColorFullShade` from #FCFEFF to #F8FAFC (Slate-50)
    - Update `$ouiPageBackgroundColor` from #02020E to #020617 (Slate-950)
    - Update `$ouiColorHighlight` from #3D2C0D to #422006 (warmer amber)
    - Update `$ouiTextColor` from $ouiColorDarkShade to #CBD5E1 (Slate-300)
    - Update `$ouiTitleColor` from #C6C9CE to #F1F5F9 (Slate-100)
    - Update `$ouiTextSubduedColor` from #798189 to #94A3B8 (Slate-400)
    - Update `$ouiBorderColor` to transparentize(#334155, 0.5) (Slate-700 with transparency)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.9, 4.10, 4.11, 4.12, 4.14, 9.2, 9.3, 9.4_

  - [ ]* 11.3 Write property test for WCAG contrast compliance
    - **Property 4: WCAG Contrast Compliance**
    - **Validates: Requirements 4.12, 4.13, 10.1, 10.2**

  - [ ]* 11.4 Write property test for background differentiation
    - Verify that background colors at different surface levels are distinguishable
    - **Validates: Requirements 4.9**

- [ ] 12. Verify backward compatibility
  - [ ]* 12.1 Write property test for backward compatibility
    - **Property 6: Backward Compatibility Preservation**
    - **Validates: Requirements 7.1, 7.3, 7.4, 7.5**

  - [ ]* 12.2 Write unit test for SCSS compilation
    - Test that both light and dark themes compile without errors
    - **Validates: Requirements 7.2**

- [ ] 13. Verify dual theme support
  - [ ]* 13.1 Write property test for dual theme support
    - **Property 7: Dual Theme Support**
    - **Validates: Requirements 9.1, 9.2, 9.3, 9.4**

- [ ] 14. Verify accessibility standards
  - [ ]* 14.1 Write property test for minimum touch target sizes
    - **Property 8: Minimum Touch Target Size**
    - **Validates: Requirements 10.3**

  - [ ]* 14.2 Write unit test for prefers-reduced-motion support
    - Test that `ouiRespectMotion` mixin includes media query
    - **Validates: Requirements 5.7, 10.5**

- [ ] 15. Verify spacing scale consistency
  - [ ]* 15.1 Write property test for spacing scale consistency
    - **Property 5: Spacing Scale Consistency**
    - **Validates: Requirements 8.3, 8.4, 8.5, 8.6**

  - [ ]* 15.2 Write unit tests for spacing scale values
    - Test that all spacing variables have correct values (XXS through XXL)
    - **Validates: Requirements 8.1, 8.2**

- [x] 16. Final checkpoint - Comprehensive testing
  - Run all unit tests and property tests
  - Verify SCSS compilation for both themes
  - Check for any console warnings or errors
  - Ensure all tests pass, ask the user if questions arise.

- [x] 17. Build and visual verification
  - [x] 17.1 Build the theme and documentation site
    - Run `yarn build` to compile all themes
    - Run `yarn start` to launch documentation site
    - _Requirements: All_

  - [x] 17.2 Visual inspection of components
    - Manually inspect buttons, forms, panels, cards, modals, and popovers
    - Verify border radius, shadows, and transitions appear modern
    - Test both light and dark themes
    - Test hover, focus, and active states
    - _Requirements: All_

- [ ] 18. Modernize SideNav component
  - [x] 18.1 Add SideNav variables in `src/themes/v9/global_styling/variables/_side_nav.scss`
    - Add `$ouiSideNavItemPadding` set to `$ouiSizeS` (8px)
    - Add `$ouiSideNavItemBorderRadius` set to `$ouiBorderRadiusSmall` (6px)
    - Add `$ouiSideNavItemSpacing` set to `$ouiSizeM` (12px)
    - Add `$ouiSideNavSelectedBackground` set to `transparentize($ouiColorPrimary, 0.92)`
    - Add `$ouiSideNavSelectedAccentWidth` set to `3px`
    - Add `$ouiSideNavSelectedAccentHeight` set to `60%`
    - Add `$ouiSideNavHoverBackground` set to `transparentize($ouiColorLightShade, 0.6)`
    - Add `$ouiSideNavActiveBackground` set to `transparentize($ouiColorLightShade, 0.3)`
    - Add `$ouiSideNavTransition` variable with background-color, color, and transform
    - Add `$ouiSideNavBranchLineWidth` set to `2px`
    - Add `$ouiSideNavBranchLineColor` set to `transparentize($ouiBorderColor, 0.5)`
    - Add `$ouiSideNavBranchTickWidth` set to `$ouiSizeS`
    - Add `$ouiSideNavBranchTickHeight` set to `2px`
    - Update `$ouiSideNavEmphasizedBackgroundColor` from `transparentize($ouiColorPrimary, .8)` to `transparentize($ouiColorPrimary, 0.95)`
    - Add EUI aliases for all new variables
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8_

  - [x] 18.2 Update SideNav item styling in `src/components/side_nav/_side_nav_item.scss`
    - Add `padding: $ouiSideNavItemPadding` to `.ouiSideNavItemButton`
    - Add `border-radius: $ouiSideNavItemBorderRadius` to `.ouiSideNavItemButton`
    - Add `transition: $ouiSideNavTransition` to `.ouiSideNavItemButton`
    - Add hover state with `background-color: $ouiSideNavHoverBackground`
    - Add active state with `background-color: $ouiSideNavActiveBackground` and `transform: scale(0.98)`
    - Add focus-visible state with outline and background
    - Replace underline selection with background + left accent bar using `::before` pseudo-element
    - Update selected state to use `background-color: $ouiSideNavSelectedBackground`
    - Update selected state color to `$ouiColorPrimary`
    - Update selected state font-weight to `$ouiFontWeightSemiBold`
    - Add `@media (prefers-reduced-motion: reduce)` to disable transitions
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.6, 10.9, 10.10_

  - [x] 18.3 Modernize branch indicators in `src/components/side_nav/_side_nav_item.scss`
    - Update `.ouiSideNavItem--branch::after` width to `$ouiSideNavBranchLineWidth`
    - Update `.ouiSideNavItem--branch::after` background to `$ouiSideNavBranchLineColor`
    - Add `border-radius: 1px` to `.ouiSideNavItem--branch::after`
    - Add gradient fade-out for last branch item
    - Update horizontal tick width to `$ouiSideNavBranchTickWidth`
    - Update horizontal tick height to `$ouiSideNavBranchTickHeight`
    - Update horizontal tick background to `$ouiSideNavBranchLineColor`
    - Add `border-radius: 1px` to horizontal tick
    - Center tick vertically with `transform: translateY(-50%)`
    - _Requirements: 10.7_

  - [x] 18.4 Refine emphasized state in `src/components/side_nav/_side_nav_item.scss`
    - Update `.ouiSideNavItem--emphasized` background to use updated `$ouiSideNavEmphasizedBackgroundColor`
    - Add `border-radius: $ouiBorderRadius` to `.ouiSideNavItem--emphasized`
    - Add `padding: $ouiSizeS` to `.ouiSideNavItem--emphasized`
    - Add `margin: 0 (-$ouiSizeS)` to `.ouiSideNavItem--emphasized`
    - Replace box-shadow hack with `@include ouiBottomShadowSmall`
    - Update nested emphasized items to remove extra shadows
    - _Requirements: 10.8_

  - [x] 18.5 Improve root item spacing in `src/components/side_nav/_side_nav_item.scss`
    - Update `.ouiSideNavItem--root > .ouiSideNavItemButton` margin-bottom to `$ouiSideNavItemSpacing`
    - Update `.ouiSideNavItem--root > .ouiSideNavItemButton` padding to `$ouiSideNavItemPadding`
    - Update `.ouiSideNavItem--root + .ouiSideNavItem--root` margin-top to `$ouiSizeXXL`
    - Update root label font-weight to `$ouiFontWeightSemiBold`
    - Add `letter-spacing: $ouiLetterSpacingTight` to root labels
    - _Requirements: 10.5_

  - [ ]* 18.6 Write unit tests for SideNav modernization
    - Test that SideNav items have 6px border radius
    - Test that selected items have background color (not underline)
    - Test that hover states apply background color
    - Test that transitions are defined
    - Test that branch indicators use modern styling
    - Test that emphasized state uses subtle background
    - _Requirements: 10.1, 10.2, 10.3, 10.6, 10.7, 10.8_

- [ ] 19. Final verification and documentation
  - [ ] 19.1 Verify all modernization changes
    - Test border radius on all components
    - Test shadows on all components
    - Test typography hierarchy
    - Test color palette in both themes
    - Test transitions and animations
    - Test SideNav modern styling
    - Test Badge modern styling
    - Test CallOut modern styling
    - Test FilterGroup modern styling
    - _Requirements: All_

  - [ ] 19.2 Update theme documentation
    - Document new design token values
    - Document SideNav modernization changes
    - Document Badge modernization changes
    - Document CallOut modernization changes
    - Document FilterGroup modernization changes
    - Update migration guide
    - Update changelog
    - _Requirements: All_

- [ ] 20. Modernize Badge component
  - [x] 20.1 Add Badge variables in `src/themes/v9/global_styling/variables/_badge.scss`
    - Add `$ouiBadgeBorderRadius` set to `$ouiBorderRadiusSmall` (6px)
    - Add `$ouiBadgePaddingHorizontal` set to `10px`
    - Add `$ouiBadgePaddingVertical` set to `2px`
    - Add `$ouiBadgeMinHeight` set to `22px`
    - Add `$ouiBadgeFontSize` set to `$ouiFontSizeXS` (12px)
    - Add `$ouiBadgeFontWeight` set to `$ouiFontWeightSemiBold` (600)
    - Add `$ouiBadgeLineHeight` set to `1.5`
    - Add `$ouiBadgeTransition` variable with background-color, border-color, color, and box-shadow
    - Add `$ouiBadgeHollowBorderColor` set to `transparentize($ouiBorderColor, 0.3)`
    - Add `$ouiBadgeIconSpacing` set to `$ouiSizeXS` (4px)
    - Add EUI aliases for all new variables
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.7, 12.8_

  - [x] 20.2 Update Badge component styling in `src/components/badge/_badge.scss`
    - Update `font-weight` to use `$ouiBadgeFontWeight` (600)
    - Update `line-height` to use `$ouiBadgeLineHeight` (1.5)
    - Update `padding` to use `$ouiBadgePaddingVertical $ouiBadgePaddingHorizontal` (2px 10px)
    - Add `min-height: $ouiBadgeMinHeight` (22px)
    - Change `display` from `inline-block` to `inline-flex`
    - Add `align-items: center` for vertical centering
    - Update `border-radius` to use `$ouiBadgeBorderRadius` (6px)
    - Add `transition: $ouiBadgeTransition` for smooth state changes
    - Update `.ouiBadge__content` to use `gap: $ouiBadgeIconSpacing` instead of margins
    - Remove margins from `.ouiBadge__icon` (using gap now)
    - Add `@media (prefers-reduced-motion: reduce)` to disable transitions
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.8, 12.9_

  - [x] 20.3 Add hover effects for clickable badges in `src/components/badge/_badge.scss`
    - Add `transform: translateY(-1px)` to `.ouiBadge-isClickable:hover`
    - Add `box-shadow: 0 2px 4px rgba($ouiShadowColor, 0.1)` to hover state
    - Add `transform: translateY(0)` to `.ouiBadge-isClickable:active` to reset
    - Add `box-shadow: none` to active state
    - Add `@media (prefers-reduced-motion: reduce)` to disable transform
    - _Requirements: 12.6, 12.9_

  - [x] 20.4 Update hollow badge border in `src/components/badge/_badge.scss`
    - Update `.ouiBadge--hollow` border-color to use `$ouiBadgeHollowBorderColor`
    - _Requirements: 12.7_

  - [x] 20.5 Update related badge components (optional enhancement)
    - Add `transition: $ouiBadgeTransition` to `.ouiBetaBadge` in `src/components/badge/beta_badge/_beta_badge.scss`
    - Add `@media (prefers-reduced-motion: reduce)` to `.ouiBetaBadge`
    - Update `.ouiNotificationBadge` border-radius to `$ouiBorderRadiusSmall` in `src/components/badge/notification_badge/_notification_badge.scss`
    - Update `.ouiNotificationBadge` font-weight to `$ouiFontWeightSemiBold`
    - Add `transition: $ouiBadgeTransition` to `.ouiNotificationBadge`
    - Add `@media (prefers-reduced-motion: reduce)` to `.ouiNotificationBadge`
    - _Requirements: 12.5, 12.9_

  - [x] 20.6 Import badge variables in `src/themes/v9/v9_globals.scss`
    - Add `@import 'global_styling/variables/badge';` to the variables import section
    - _Requirements: 12.1_

  - [ ]* 20.7 Write unit tests for Badge modernization
    - Test that badge border radius equals 6px
    - Test that badge padding is 2px 10px
    - Test that badge font weight is 600
    - Test that badge minimum height is 22px
    - Test that clickable badges have hover effects
    - Test that transitions are defined
    - Test that hollow badges use modern border color
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_

- [x] 21. Modernize CallOut component
  - [x] 21.1 Update CallOut component styling in `src/components/call_out/_call_out.scss`
    - Update padding from `$ouiSize` to `calc($ouiSize * 1.25)` (20px)
    - Replace `border-left` with `border: 1px solid transparent` (all-around border)
    - Add `border-radius: $ouiBorderRadius` (8px)
    - Add `box-shadow: 0 1px 2px 0 rgba($ouiShadowColor, 0.05)` for light theme
    - Add `::before` pseudo-element for left accent bar (3px width, rounded)
    - Update `.ouiCallOut--small` padding to `$ouiSize` (16px, was 12px)
    - Update `.ouiCallOutHeader__icon` transform to `translateY(1px)` (was 2px)
    - Add `opacity: 0.9` to `.ouiCallOutHeader__icon`
    - Update `.ouiCallOut__closeIcon` right position to `$ouiSizeS` (8px)
    - Update `.ouiCallOut__closeIcon` top position to `$ouiSizeS` (8px)
    - Add `opacity: 0.7` to `.ouiCallOut__closeIcon`
    - Add hover transition to `.ouiCallOut__closeIcon` with `opacity: 1` on hover
    - Add `@media (prefers-reduced-motion: reduce)` to disable transitions
    - _Requirements: 13.1, 13.2, 13.3, 13.5, 13.6, 13.7, 13.8, 13.10_

  - [x] 21.2 Update CallOut color modifiers in `src/components/call_out/_call_out.scss`
    - Update `.ouiCallOut--#{$name}` to use `border-color: rgba($color, 0.2)` (20% opacity)
    - Update `.ouiCallOut--#{$name}` to use `background-color: rgba($color, 0.05)` (5% opacity)
    - Add `&::before { background-color: $color; }` for accent bar color
    - Add dark theme adjustments with `@if (lightness($ouiPageBackgroundColor) < 50)`
    - For dark theme: use `border-color: rgba($color, 0.3)` (30% opacity)
    - For dark theme: use `background-color: rgba($color, 0.12)` (12% opacity)
    - For dark theme: use `box-shadow: 0 1px 2px 0 rgba($ouiShadowColor, 0.2)`
    - _Requirements: 13.2, 13.3, 13.4, 13.5, 13.9_

  - [x] 21.3 Update CallOut color function in `src/components/call_out/_mixins.scss`
    - Update `ouiCallOutColor()` function to return modern foreground colors
    - For light theme primary: return `#1e40af` (Blue-800)
    - For light theme success: return `#047857` (Green-700)
    - For light theme warning: return `#b45309` (Amber-700)
    - For light theme danger: return `#b91c1c` (Red-700)
    - For dark theme primary: return `#93c5fd` (Blue-300)
    - For dark theme success: return `#6ee7b7` (Green-300)
    - For dark theme warning: return `#fcd34d` (Amber-300)
    - For dark theme danger: return `#fca5a5` (Red-300)
    - Use `lightness($ouiPageBackgroundColor) < 50` to detect dark theme
    - _Requirements: 13.9, 13.12, 13.13_

  - [ ]* 21.4 Write unit tests for CallOut modernization
    - Test that callout border radius equals 8px
    - Test that callout has all-around border (not just left)
    - Test that callout has left accent bar (::before pseudo-element)
    - Test that callout padding is 20px (16px for small)
    - Test that callout has box-shadow
    - Test that callout backgrounds use rgba with low opacity
    - Test that callout borders use rgba with 20-30% opacity
    - Test that callout foreground colors meet WCAG AA contrast
    - Test that dismiss button has hover transition
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.9, 13.12, 13.13_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The implementation follows a token-first approach: core tokens → component variables → testing
- All changes maintain backward compatibility through variable aliases
- Both light and dark themes are updated consistently


- [ ] 22. Modernize FilterGroup component
  - [x] 22.1 Create FilterGroup variables in `src/themes/v9/global_styling/variables/_filter_group.scss`
    - Add `$ouiFilterGroupBorderRadius` set to `$ouiBorderRadius` (8px)
    - Add `$ouiFilterButtonTransition` variable with all, fast speed, ease-in-out
    - Add `$ouiFilterButtonSelectedBackground` set to `$ouiColorPrimary`
    - Add `$ouiFilterButtonSelectedColor` set to `$ouiColorEmptyShade`
    - Add `$ouiFilterButtonSelectedBorder` set to `$ouiColorPrimary`
    - Add EUI aliases for all new variables
    - _Requirements: 14.1, 14.2, 14.6, 14.8, 14.10_

  - [x] 22.2 Import FilterGroup variables in `src/themes/v9/v9_globals.scss`
    - Add `@import 'global_styling/variables/filter_group';` to the variables import section
    - _Requirements: 14.1_

  - [x] 22.3 Update FilterGroup container styling in `src/components/filter_group/_filter_group.scss`
    - Add `border-radius: $ouiFilterGroupBorderRadius` (8px on outer edges)
    - Update `box-shadow` to modern layered shadow (0 1px 3px, 0 1px 2px)
    - Keep `overflow: hidden` to clip inner button corners
    - Add dark theme adjustments with `@if (lightness($ouiPageBackgroundColor) < 50)`
    - _Requirements: 14.1, 14.2, 14.4, 14.5, 14.16_

  - [x] 22.4 Update FilterButton styling in `src/components/filter_group/_filter_button.scss`
    - Keep `border-right: none` for connected appearance
    - Add `border-radius: 0` to middle buttons (default)
    - Add `border-radius: $ouiFilterGroupBorderRadius 0 0 $ouiFilterGroupBorderRadius` to first button
    - Add `border-radius: 0 $ouiFilterGroupBorderRadius $ouiFilterGroupBorderRadius 0` to last button
    - Add `border-radius: $ouiFilterGroupBorderRadius` to only-child button
    - Add `transition: $ouiFilterButtonTransition`
    - Add hover state with background, border-color, and box-shadow
    - Update `.ouiFilterButton-isSelected` to use `$ouiFilterButtonSelectedBackground`
    - Update `.ouiFilterButton-isSelected` to use `$ouiFilterButtonSelectedColor`
    - Update `.ouiFilterButton-isSelected` border-color to `$ouiFilterButtonSelectedBorder`
    - Add `font-weight: $ouiFontWeightSemiBold` to `.ouiFilterButton-isSelected`
    - Add hover state for selected buttons (darken by 5%)
    - Invert notification badge colors for selected state
    - Remove `--withNext` border adjustments (no longer needed)
    - _Requirements: 14.1, 14.2, 14.6, 14.7, 14.8, 14.9, 14.10, 14.13_

  - [x] 22.5 Update active filters state in `src/components/filter_group/_filter_button.scss`
    - Add `.ouiFilterButton-hasActiveFilters:not(.ouiFilterButton-isSelected)` selector
    - Add `font-weight: $ouiFontWeightSemiBold` (600)
    - Add `border-color: $ouiColorPrimary` (primary border)
    - Update notification badge to use primary background and white text
    - _Requirements: 14.11_

  - [x] 22.6 Update notification badge styling in `src/components/filter_group/_filter_button.scss`
    - Update `.ouiFilterButton__notification` border-radius to `$ouiBorderRadiusSmall` (6px)
    - Add `transition: all $ouiAnimSpeedFast $ouiAnimEaseInOut`
    - _Requirements: 14.12_

  - [x] 22.7 Add reduced motion support in `src/components/filter_group/_filter_button.scss`
    - Add `@media (prefers-reduced-motion: reduce)` block
    - Disable transitions on `.ouiFilterButton`
    - Disable transitions on `.ouiFilterButton__notification`
    - _Requirements: 14.14_

  - [ ]* 22.8 Write unit tests for FilterGroup modernization
    - Test that filter group has 8px border radius on outer edges
    - Test that first button has left border radius only
    - Test that last button has right border radius only
    - Test that middle buttons have no border radius
    - Test that only-child button has full border radius
    - Test that filter buttons keep `border-right: none` for connected appearance
    - Test that selected buttons use primary background and white text
    - Test that active filters (not selected) have semibold weight and primary border
    - Test that notification badges have 6px border radius
    - Test that selected button badges are inverted (white bg, primary text)
    - Test that hover effects include background and shadow changes
    - Test that transitions are defined
    - Test that reduced motion is respected
    - _Requirements: 14.1, 14.2, 14.4, 14.5, 14.6, 14.7, 14.8, 14.9, 14.10, 14.11, 14.12, 14.13, 14.14_


- [x] 23. Modernize DataGrid component
  - [x] 23.1 Create DataGrid variables in `src/themes/v9/global_styling/variables/_data_grid.scss`
    - Add `$ouiDataGridBorderRadius` set to `$ouiBorderRadius` (8px)
    - Add `$ouiDataGridBorder` set to `1px solid $ouiBorderColor`
    - Add `$ouiDataGridShadow` with layered shadow (0 1px 3px, 0 1px 2px)
    - Add `$ouiDataGridHeaderBackground` set to `transparentize($ouiColorLightShade, 0.5)`
    - Add `$ouiDataGridHeaderBorderBottom` set to `2px solid $ouiBorderColor`
    - Add `$ouiDataGridHeaderFontWeight` set to `$ouiFontWeightSemiBold` (600)
    - Add `$ouiDataGridHeaderPadding` set to `$ouiSizeS $ouiSizeM` (8px 12px)
    - Add `$ouiDataGridHeaderHoverBackground` set to `transparentize($ouiColorLightShade, 0.3)`
    - Add `$ouiDataGridCellPadding` set to `$ouiSizeS $ouiSizeM` (8px 12px)
    - Add `$ouiDataGridCellBorder` set to `1px solid transparentize($ouiBorderColor, 0.5)`
    - Add `$ouiDataGridCellHoverBackground` set to `transparentize($ouiColorHighlight, 0.3)`
    - Add `$ouiDataGridCellTransition` variable with background-color transition
    - Add `$ouiDataGridStripeBackground` set to `transparentize($ouiColorLightShade, 0.7)`
    - Add `$ouiDataGridCellFocusBorder` set to `2px solid $ouiColorPrimary`
    - Add `$ouiDataGridCellFocusShadow` set to `0 0 0 2px transparentize($ouiColorPrimary, 0.8)`
    - Add `$ouiDataGridCellFocusBorderRadius` set to `2px`
    - Add EUI aliases for all new variables
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 15.8, 15.9, 15.10, 15.11, 15.12, 15.13_

  - [x] 23.2 Import DataGrid variables in `src/themes/v9/v9_globals.scss`
    - Add `@import 'global_styling/variables/data_grid';` to the variables import section
    - _Requirements: 15.1_

  - [x] 23.3 Update DataGrid container styling in `src/components/datagrid/_data_grid.scss`
    - Add conditional block `@if (variable-exists(ouiDataGridBorderRadius))`
    - Add `border-radius: $ouiDataGridBorderRadius` to `.ouiDataGrid__content` (8px)
    - Add `box-shadow: $ouiDataGridShadow` to `.ouiDataGrid__content`
    - Add `overflow: hidden` to `.ouiDataGrid__content` to clip to border radius
    - Add transition to `.ouiDataGrid__controlBtn` for background and border
    - Add hover state to `.ouiDataGrid__controlBtn` with background change
    - _Requirements: 15.1, 15.2, 15.14_

  - [x] 23.4 Update DataGrid header styling in `src/components/datagrid/_data_grid_header_row.scss`
    - Add conditional block `@if (variable-exists(ouiDataGridHeaderBackground))`
    - Update `.ouiDataGridHeader` background to `$ouiDataGridHeaderBackground`
    - Update header cell font-weight to `$ouiDataGridHeaderFontWeight` (600)
    - Update header cell padding to `$ouiDataGridHeaderPadding` (8px 12px)
    - Update header cell border-bottom to `$ouiDataGridHeaderBorderBottom` (2px)
    - Add hover effect to `.ouiDataGridHeaderCell__button` with background and border-radius
    - Add transition to header button hover
    - _Requirements: 15.3, 15.4, 15.5, 15.6, 15.7_

  - [x] 23.5 Update DataGrid cell styling in `src/components/datagrid/_data_grid_data_row.scss`
    - Add conditional block `@if (variable-exists(ouiDataGridCellPadding))`
    - Update cell padding to `$ouiDataGridCellPadding` (8px 12px)
    - Update cell border-right to `$ouiDataGridCellBorder`
    - Update cell border-bottom to `$ouiDataGridCellBorder`
    - Add `transition: $ouiDataGridCellTransition` to cells
    - Update focus state border to `$ouiDataGridCellFocusBorder` (2px)
    - Update focus state box-shadow to `$ouiDataGridCellFocusShadow`
    - Update focus state border-radius to `$ouiDataGridCellFocusBorderRadius` (2px)
    - _Requirements: 15.8, 15.9, 15.10, 15.12, 15.13_

  - [x] 23.6 Update DataGrid row hover in `src/components/datagrid/_data_grid_data_row.scss`
    - Update `rowHoverHighlight` style to use `$ouiDataGridCellHoverBackground`
    - Ensure smooth transition on hover
    - _Requirements: 15.10_

  - [x] 23.7 Update DataGrid striping in `src/components/datagrid/_data_grid_data_row.scss`
    - Update `stripes` style to use `$ouiDataGridStripeBackground`
    - Ensure very subtle background for alternating rows
    - _Requirements: 15.11_

  - [x] 23.8 Add reduced motion support in `src/components/datagrid/_data_grid_data_row.scss`
    - Add `@media (prefers-reduced-motion: reduce)` block
    - Disable transitions on cells
    - _Requirements: 15.15_

  - [x] 23.9 Create dark theme adjustments in `src/themes/v9/components/_data_grid.scss`
    - Create new file if it doesn't exist
    - Add conditional block `@if (lightness($ouiPageBackgroundColor) < 50)`
    - Override `$ouiDataGridHeaderBackground` with darker value (0.6 transparency)
    - Override `$ouiDataGridCellBorder` with more visible border (0.3 transparency)
    - Override `$ouiDataGridShadow` with stronger shadow
    - Override `$ouiDataGridCellHoverBackground` with lighter value (0.2 transparency)
    - Override `$ouiDataGridStripeBackground` with more visible value (0.8 transparency)
    - _Requirements: 15.17, 15.18_

  - [ ]* 23.10 Write unit tests for DataGrid modernization
    - Test that data grid container has 8px border radius
    - Test that data grid container has layered shadow
    - Test that header has subtle background color
    - Test that header font weight is 600 (semibold)
    - Test that header border-bottom is 2px
    - Test that cell padding is 8px x 12px
    - Test that cell borders use transparency
    - Test that row hover has smooth transition
    - Test that striping uses very subtle background
    - Test that focus border is 2px with focus ring
    - Test that focus border radius is 2px
    - Test that transitions are defined
    - Test that reduced motion is respected
    - Test that dark theme adjustments are applied
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 15.8, 15.9, 15.10, 15.11, 15.12, 15.13, 15.14, 15.15, 15.17, 15.18_


- [x] 24. Modernize Toast component
  - [x] 24.1 Create Toast variables in `src/themes/v9/global_styling/variables/_toast.scss`
    - Add `$ouiToastBorderRadius` set to `$ouiBorderRadius` (8px)
    - Add `$ouiToastBorder` set to `1px solid transparentize($ouiBorderColor, 0.5)`
    - Add `$ouiToastShadow` with layered shadow (0 4px 6px, 0 2px 4px)
    - Add `$ouiToastPadding` set to `$ouiSize` (16px)
    - Add `$ouiToastAccentWidth` set to `3px`
    - Add `$ouiToastAccentBorderRadius` set to `$ouiBorderRadius 0 0 $ouiBorderRadius`
    - Add `$ouiToastTitleFontWeight` set to `$ouiFontWeightSemiBold` (600)
    - Add `$ouiToastCloseButtonOpacity` set to `1` (always visible)
    - Add `$ouiToastCloseButtonHoverBackground` set to `transparentize($ouiColorLightShade, 0.5)`
    - Add `$ouiToastCloseButtonTransition` variable with background-color transition
    - Add `$ouiToastAnimationDuration` set to `$ouiAnimSpeedFast` (150ms)
    - Add `$ouiToastAnimationEasing` set to `$ouiAnimEaseOut`
    - Add EUI aliases for all new variables
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7, 16.8, 16.9, 16.10_

  - [x] 24.2 Import Toast variables in `src/themes/v9/v9_globals.scss`
    - Add `@import 'global_styling/variables/toast';` to the variables import section
    - _Requirements: 16.1_

  - [x] 24.3 Update Toast container styling in `src/components/toast/_toast.scss`
    - Add conditional block `@if (variable-exists(ouiToastBorderRadius))`
    - Add `border: $ouiToastBorder` (subtle all-around)
    - Add `border-radius: $ouiToastBorderRadius` (8px)
    - Add `box-shadow: $ouiToastShadow` (modern layered)
    - Add `overflow: hidden` to clip accent bar
    - Add `::before` pseudo-element for left accent bar (3px width, full height)
    - Update color modifiers to remove `border-top` and use `::before` for accent
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.10_

  - [x] 24.4 Update Toast title styling in `src/components/toast/_toast.scss`
    - Add conditional block `@if (variable-exists(ouiToastTitleFontWeight))`
    - Update `.ouiToastHeader__title` font-weight to `$ouiToastTitleFontWeight` (600)
    - _Requirements: 16.5_

  - [x] 24.5 Update Toast close button in `src/components/toast/_toast.scss`
    - Add conditional block `@if (variable-exists(ouiToastCloseButtonOpacity))`
    - Update `.ouiToast__closeButton` opacity to `$ouiToastCloseButtonOpacity` (1)
    - Add `transition: $ouiToastCloseButtonTransition`
    - Add `border-radius: $ouiBorderRadiusSmall` (6px)
    - Update hover state to add `background-color: $ouiToastCloseButtonHoverBackground`
    - Update focus state styling
    - Remove opacity changes from container hover/focus states
    - _Requirements: 16.6, 16.7, 16.16_

  - [x] 24.6 Update Toast animations in `src/components/toast/_global_toast_list.scss`
    - Add conditional block `@if (variable-exists(ouiToastAnimationDuration))`
    - Update `.ouiGlobalToastListItem` animation duration and easing
    - Update `.ouiGlobalToastListItem-isDismissed` to include scale transform (0.95)
    - Update `@keyframes ouiShowToast` to use scale(0.95) in from state
    - Add `@media (prefers-reduced-motion: reduce)` block to disable transforms
    - _Requirements: 16.8, 16.9, 16.11_

  - [x] 24.7 Create dark theme adjustments in `src/themes/v9/components/_toast.scss`
    - Create new file if it doesn't exist
    - Add conditional block `@if (lightness($ouiPageBackgroundColor) < 50)`
    - Override `$ouiToastBorder` with more visible border (0.3 transparency)
    - Override `$ouiToastShadow` with stronger shadow
    - Override `$ouiToastCloseButtonHoverBackground` with lighter value
    - Add accent bar color adjustments (lighten by 5%) for all toast types
    - _Requirements: 16.13, 16.14_

  - [ ]* 24.8 Write unit tests for Toast modernization
    - Test that toast has 8px border radius
    - Test that toast has subtle all-around border
    - Test that toast has 3px left accent bar
    - Test that toast has modern layered shadow
    - Test that title font-weight is 600 (semibold)
    - Test that close button opacity is 1 (always visible)
    - Test that close button has hover background
    - Test that close button has 6px border radius
    - Test that entrance animation uses scale
    - Test that exit animation includes scale-down
    - Test that animation duration is 150ms
    - Test that reduced motion is respected
    - Test that dark theme adjustments are applied
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7, 16.8, 16.9, 16.10, 16.11, 16.13, 16.14, 16.15, 16.16, 16.17_
