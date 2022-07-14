/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { GuidePage } from '../../components';

import {
  OuiText,
  OuiSpacer,
  OuiFlexGrid,
  OuiFlexItem,
  OuiLink,
  OuiCode,
  OuiTitle,
} from '../../../../src/components';
import { ratingAA, allowedColors } from './colors/_utilities';
import { CorePalette } from './colors/core_palette';
import { VisPalette } from './colors/vis_palette';
import { ColorSection } from './colors/color_section';
import { ContrastSlider } from './colors/contrast_slider';

export default ({ selectedTheme }) => {
  const [showTextVariants, setShowTextVariants] = useState(true);
  const [contrastValue, setContrastValue] = useState(4.5);
  const selectedThemeIsDark = selectedTheme.includes('dark');

  return (
    <GuidePage title="Color guidelines">
      <OuiText grow={false}>
        <h2>OpenSearch UI builds with a very limited palette.</h2>
        <p>
          We use a core set of three colors, combined with a green / orange /
          red qualitative set of three, and finally combine those against a
          six-color grayscale. Variation beyond these colors is minimal and
          always done with math manipulation against the original set.
        </p>
      </OuiText>

      <OuiSpacer />

      <CorePalette colors={allowedColors} theme={selectedTheme} />

      <OuiSpacer size="xxl" />

      <OuiText grow={false}>
        <h2>Variable naming</h2>
        <p>
          We use the same variable names of each color in all themes. That means
          that our gray color names are opposite of their values in dark mode.
          By just changing the values of the color, and not the usages of the
          variables, we make it easier for the development multiple themes.
        </p>
      </OuiText>

      <OuiSpacer size="xxl" />

      <OuiText grow={false}>
        <h2>Accessible text contrast</h2>
        <p>
          <OuiLink href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html">
            WCAG specifications
          </OuiLink>{' '}
          defines specific contrast ratios between foreground text and a
          background color. The grids below display which color combinations
          pass that rating. In general you should try to use a color combination
          that is {ratingAA} or above with the exception of using large text.
        </p>
      </OuiText>

      <OuiSpacer size="xl" />

      <OuiTitle size="xs">
        <h3>
          Use the slider and toggle to adjust the color combinations shown in
          the sections below.
        </h3>
      </OuiTitle>
      <OuiSpacer size="m" />

      {/* This wrapping div for the sticky positioning */}
      <div>
        <ContrastSlider
          contrastValue={contrastValue}
          showTextVariants={showTextVariants}
          onChange={(sliderValue, toggleChecked) => {
            setContrastValue(sliderValue);
            setShowTextVariants(toggleChecked);
          }}
        />

        <OuiSpacer size="xxl" />
        <OuiSpacer size="xxl" />

        <ColorSection
          color={'ouiColorPrimary'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            Main brand color and used for most call to actions like{' '}
            <Link to="/navigation/button">buttons</Link> and{' '}
            <Link to="/navigation/link">links</Link>. Reserve usages to elements
            with interactions like clickable items not for plain text.
          </p>
        </ColorSection>

        <OuiSpacer size="xxl" />
        <OuiSpacer size="xxl" />

        <ColorSection
          color={'ouiColorAccent'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            Pulls attention to key indicators like{' '}
            <Link to="/display/badge">notifications</Link> or{' '}
            <Link to="/navigation/facet">number of selections</Link>. Don&apos;t
            use on elements with interactions.
          </p>
        </ColorSection>

        <OuiSpacer size="xxl" />
        <OuiSpacer size="xxl" />

        <ColorSection
          color={'ouiColorSuccess'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            Also known as <OuiCode>ouiColorSecondary</OuiCode>. Use this for
            success graphics and <strong>additive</strong> actions.
          </p>
        </ColorSection>

        <OuiSpacer size="xxl" />
        <OuiSpacer size="xxl" />

        <ColorSection
          color={'ouiColorWarning'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            Use this for warnings and actions that have a{' '}
            <strong>potential</strong> to be destructive.
          </p>
        </ColorSection>

        <OuiSpacer size="xxl" />
        <OuiSpacer size="xxl" />

        <ColorSection
          color={'ouiColorDanger'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            Use this for negative graphics like errors and{' '}
            <strong>destructive</strong> actions.
          </p>
        </ColorSection>

        <OuiSpacer size="xxl" />
        <OuiSpacer size="xxl" />

        <ColorSection
          color={'ouiColorEmptyShade'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            Used as the background color of primary{' '}
            <Link to="/layout/page">page content</Link> and{' '}
            <Link to="/layout/panel">panels</Link> including{' '}
            <Link to="/layout/modal">modals</Link> and{' '}
            <Link to="/layout/flyout">flyouts</Link>. Place your main content on
            top of this color, or a panel-style component, to{' '}
            <strong>ensure proper contrast</strong>.
          </p>
          {selectedThemeIsDark ? (
            <p>
              If you need a color that is full black in{' '}
              <strong>both light and dark modes</strong>, use{' '}
              <OuiCode>ouiColorInk</OuiCode>.
            </p>
          ) : (
            <p>
              If you need a color that is full white in{' '}
              <strong>both light and dark modes</strong>, use{' '}
              <OuiCode>ouiColorGhost</OuiCode>.
            </p>
          )}
        </ColorSection>

        <OuiSpacer size="xxl" />
        <OuiSpacer size="xxl" />

        <ColorSection
          color={'ouiColorLightestShade'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            Used to lightly shade areas that contain secondary content or{' '}
            <strong>contain</strong> panel-like components. Proper contrast of
            text on this color cannot be guaranteed.
          </p>
        </ColorSection>

        <OuiSpacer size="xxl" />
        <OuiSpacer size="xxl" />

        <ColorSection
          color={'ouiPageBackgroundColor'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            The background color for the whole window (body) is a slightly
            altered version of <OuiCode>ouiColorLightestShade</OuiCode> that{' '}
            <strong>does</strong> provide proper contrast for the text variant
            colors.
          </p>
        </ColorSection>

        <OuiSpacer size="xxl" />
        <OuiSpacer size="xxl" />

        <ColorSection
          color={'ouiColorLightShade'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            Used for most borders and dividers (
            <Link to="/layout/horizontal-rule">horizontal rules</Link>).
          </p>
        </ColorSection>

        <OuiSpacer size="xxl" />
        <OuiSpacer size="xxl" />

        <ColorSection
          color={'ouiColorMediumShade'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            The middle gray for all themes; this is the base for{' '}
            <OuiCode>ouiTextSubduedColor</OuiCode>. Use subdued text for hint or
            inconsequential text.
          </p>
        </ColorSection>

        <OuiSpacer size="xxl" />
        <OuiSpacer size="xxl" />

        <ColorSection
          color={'ouiColorDarkShade'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            A slightly less subtle shade for text, yet more subtle than the
            default text color.
          </p>
        </ColorSection>

        <OuiSpacer size="xxl" />
        <OuiSpacer size="xxl" />

        <ColorSection
          color={'ouiColorDarkestShade'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            The default <Link to="/display/text">text</Link> color and the
            background color for inverted backgrounds like{' '}
            <Link to="/display/tooltip">tooltips</Link> and the{' '}
            <Link to="/navigation/control-bar">control bar</Link>.{' '}
            {!selectedThemeIsDark && (
              <>
                <Link to="/display/title">Titles</Link> are shaded slightly
                darker than normal text.
              </>
            )}
          </p>
        </ColorSection>

        <OuiSpacer size="xxl" />
      </div>

      <OuiSpacer size="xxl" />

      <ColorSection
        color={'ouiColorFullShade'}
        minimumContrast={contrastValue}
        showTextVariants={showTextVariants}>
        <p>
          The opposite of <OuiCode>ouiColorEmptyShade</OuiCode>.
        </p>
        {selectedThemeIsDark ? (
          <p>
            If you need a color that is full white in{' '}
            <strong>both light and dark modes</strong>, use{' '}
            <OuiCode>ouiColorGhost</OuiCode>.
          </p>
        ) : (
          <p>
            If you need a color that is full black in{' '}
            <strong>both light and dark modes</strong>, use{' '}
            <OuiCode>ouiColorInk</OuiCode>.
          </p>
        )}
      </ColorSection>

      <OuiSpacer size="xxl" />
      <OuiSpacer size="xxl" />

      <OuiText grow={false}>
        <h2>Categorical visualization palette</h2>
        <p>
          The following colors are color-blind safe and should be used in
          categorically seried visualizations and graphics. They are meant to be
          contrasted against the value of <OuiCode>ouiColorEmptyShade</OuiCode>{' '}
          for the current theme.
        </p>
        <p>
          For more visualization palettes and rendering services, go to the{' '}
          <Link to="/utilities/color-palettes">Color Palettes</Link> utility
          page.
        </p>
        <p>
          When using the palette as a background for text (i.e. badges), use the{' '}
          <OuiCode>_behindText</OuiCode> variant. It is a brightened version of
          the base palette to create better contrast with text.
        </p>
      </OuiText>

      <OuiSpacer />

      <OuiSpacer />

      <OuiFlexGrid columns={2}>
        <OuiFlexItem>
          <VisPalette variant="graphic" />
        </OuiFlexItem>
        <OuiFlexItem>
          <VisPalette variant="behindText" />
        </OuiFlexItem>
      </OuiFlexGrid>
    </GuidePage>
  );
};
