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

import React from 'react';
import sizes from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_size.scss';
import zindexs from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_z_index.scss';
import animations from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_animations.scss';
import breakpoints from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_responsive.scss';
import { rgbToHex } from '../../../../src/services';

import { Link } from 'react-router-dom';

import { GuidePage, GuideRuleTitle } from '../../components';
import { getSassVars } from './_get_sass_vars';
import { allowedColors } from './colors/_utilities';

import {
  OuiText,
  OuiSpacer,
  OuiFlexGroup,
  OuiFlexGrid,
  OuiFlexItem,
  OuiTitle,
  OuiLink,
  OuiCode,
  OuiCodeBlock,
  OuiCallOut,
  OuiPanel,
} from '../../../../src/components';

const ouiColors = [...allowedColors, 'ouiColorGhost', 'ouiColorInk'];

const ouiTextColors = ['ouiTextColor', 'ouiColorDarkShade', 'ouiLinkColor'];

const ouiSizes = [
  'ouiSizeXS',
  'ouiSizeS',
  'ouiSizeM',
  'ouiSize',
  'ouiSizeL',
  'ouiSizeXL',
  'ouiSizeXXL',
];

const ouiFontSizes = [
  'ouiFontSizeXS',
  'ouiFontSizeS',
  'ouiFontSizeM',
  'ouiFontSize',
  'ouiFontSizeL',
  'ouiFontSizeXL',
];

const ouiShadows = [
  'ouiBottomShadowFlat',
  'ouiSlightShadow',
  'ouiBottomShadowSmall',
  'ouiBottomShadowMedium',
  'ouiBottomShadow',
  'ouiBottomShadowLarge',
];

const ouiBorders = ['ouiBorderThin', 'ouiBorderThick', 'ouiBorderEditable'];

const ouiLevels = [
  'ouiZToastList',
  'ouiZComboBox',
  'ouiZModal',
  'ouiZMask',
  'ouiZNavigation',
  'ouiZContentMenu',
  'ouiZHeader',
  'ouiZContent',
];

const ouiAnimationSpeeds = [
  'ouiAnimSpeedExtraFast',
  'ouiAnimSpeedFast',
  'ouiAnimSpeedNormal',
  'ouiAnimSpeedSlow',
  'ouiAnimSpeedExtraSlow',
];

const ouiAnimationTimings = ['ouiAnimSlightBounce', 'ouiAnimSlightResistance'];

const ouiBreakPoints = Object.getOwnPropertyNames(breakpoints.ouiBreakpoints);

function renderPaletteColor(palette, color) {
  let optionalDefault;
  if (color === 'ouiTextColor') {
    optionalDefault = (
      <OuiFlexItem grow={false}>
        <strong>default</strong>
      </OuiFlexItem>
    );
  }

  return (
    <OuiFlexGroup
      responsive={false}
      alignItems="center"
      gutterSize="s"
      className="guideSass__swatchItem"
      key={color}>
      <OuiFlexItem grow={false}>
        <div
          className="guideSass__swatch"
          style={{ background: rgbToHex(palette[color].rgba).toUpperCase() }}
        />
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiCode>${color}</OuiCode>
      </OuiFlexItem>
      {optionalDefault}
    </OuiFlexGroup>
  );
}

function renderSize(size) {
  return (
    <OuiFlexGroup
      responsive={false}
      alignItems="center"
      gutterSize="s"
      key={size}
      className="guideSass__sizeRow">
      <OuiFlexItem grow={false} className="guideSass__sizeItem">
        <div
          className="guideSass__size"
          style={{ width: sizes[size], height: sizes[size] }}
        />
      </OuiFlexItem>
      <OuiFlexItem grow={false} style={{ minWidth: 184 }}>
        <div>
          <OuiCode>${size}</OuiCode>
        </div>
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiText size="s">{sizes[size]}px</OuiText>
      </OuiFlexItem>
    </OuiFlexGroup>
  );
}

function renderFontSize(size) {
  return (
    <div key={size} className="guideSass__fontSizeExample">
      <div className={`guideSass__fontSize guideSass__fontSize--${size}`}>
        The quick brown fox
      </div>
      <OuiCode>${size}</OuiCode>
    </div>
  );
}

function renderLevel(level, index) {
  return (
    <OuiFlexGroup
      responsive={false}
      alignItems="center"
      gutterSize="s"
      key={level}
      className="guideSass__levelRow">
      <OuiFlexItem grow={false}>
        <div
          className="guideSass__level"
          style={{ opacity: 1 - index * 0.1 }}
        />
      </OuiFlexItem>
      <OuiFlexItem grow={false} style={{ minWidth: 200, paddingLeft: 16 }}>
        <div>
          <OuiCode>${level}</OuiCode>
        </div>
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiText size="s">{zindexs[level]}</OuiText>
      </OuiFlexItem>
    </OuiFlexGroup>
  );
}

function renderShadow(shadow) {
  return (
    <div
      key={shadow}
      className={`guideSass__shadow guideSass__shadow--${shadow}`}>
      <OuiCodeBlock language="scss" paddingSize="none" transparentBackground>
        @include {shadow};
      </OuiCodeBlock>
    </div>
  );
}

function renderBorder(border) {
  return (
    <OuiFlexItem
      key={border}
      className={`guideSass__border guideSass__border--${border}`}>
      <OuiCodeBlock language="scss" paddingSize="none" transparentBackground>
        border: ${border}
      </OuiCodeBlock>
    </OuiFlexItem>
  );
}

function renderAnimationSpeed(speed) {
  return (
    <div
      key={speed}
      className={`guideSass__animRow guideSass__animRow--${speed}`}>
      <OuiFlexGroup alignItems="center" gutterSize="s">
        <OuiFlexItem grow={false}>
          {animations[speed]}ms
          <OuiSpacer size="s" />
          <OuiCodeBlock
            transparentBackground
            paddingSize="none"
            language="scss">
            animation-duration: ${speed}
          </OuiCodeBlock>
          <OuiSpacer size="s" />
        </OuiFlexItem>
      </OuiFlexGroup>
      <div className={'guideSass__animParent'}>
        <div className="guideSass__animChild" />
      </div>
    </div>
  );
}

function renderAnimationTiming(speed) {
  return (
    <div
      key={speed}
      className={`guideSass__animRow guideSass__animRow--${speed}`}>
      <OuiFlexGroup alignItems="center" gutterSize="s">
        <OuiFlexItem grow={false}>
          {animations[speed]}
          <OuiSpacer size="s" />
          <OuiCodeBlock
            transparentBackground
            paddingSize="none"
            language="scss">
            animation-timing-function: ${speed}
          </OuiCodeBlock>
          <OuiSpacer size="s" />
        </OuiFlexItem>
      </OuiFlexGroup>
      <div className={'guideSass__animParent'}>
        <div className="guideSass__animChild" />
      </div>
    </div>
  );
}

export function renderBreakpoint(size, breakpoints) {
  return (
    <OuiFlexGroup
      responsive={false}
      alignItems="center"
      gutterSize="s"
      key={size}>
      <OuiFlexItem grow={false}>
        <OuiText size="s" className="oui-textRight" style={{ minWidth: 50 }}>
          <OuiCode>{size}</OuiCode>
        </OuiText>
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiText size="s">{breakpoints.ouiBreakpoints[size]}px</OuiText>
      </OuiFlexItem>
    </OuiFlexGroup>
  );
}

const bemExample = `// Use camelCase naming
.ouiButton {
  // Put mixins first before properties
  @include ouiButton;
  @include ouiSlightShadow;

  border-radius: $ouiBorderRadius;


  // Elements exist within the component
  .ouiButton__content {
    padding: 0 ($ouiSize - $ouiSizeXS);
  }

  // Modifiers augment existing components or elements
  &.ouiButton--primary {
    background-color: $ouiColorPrimary;
  }

  // States are written with a verb prefix
  &.ouiButton-isLoading {
    opacity: .5;
  }
}

// Put breakpoints at the bottom of the document
@include ouiBreakpoint("xs", "s") {
  .ouiButton {
    width: 100%;
  }
}
`;

const borderRadiusExample = `border: $ouiBorderThin;
border-radius: $ouiBorderRadius;
`;

const borderRadiusSmallExample = `border: $ouiBorderThin;
border-radius: $ouiBorderRadiusSmall;
`;

const importKibanaExample = `// In Kibana you can add this to the top of your Sass file
@import 'ui/public/styles/styling_constants';
`;

const importOutsideExample = `// In an outside project, import the core variables like so
@import '@opensearch-project/oui/src/global_styling/functions/index';
@import '@opensearch-project/oui/src/global_styling/variables/index';
@import '@opensearch-project/oui/src/global_styling/mixins/index';
`;

const tintOrShadeExample = `// tintOrShade(color, tint_percent, shade_percent)
// will tint the color by % in light themes
// and shade the color by % in dark themes
.themedBox {
  background-color: tintOrShade($ouiColorPrimary, 90%, 70%);
  border-left: $ouiBorderThick;
  border-color: $ouiColorPrimary;
  padding: $ouiSize;
  color: $ouiTextColor;
}
`;

const contrastExample = `// Make sure text passes a contrast check
.contrastBox {
  $backgroundColor: tintOrShade($ouiColorWarning, 90%, 70%);
  background: $backgroundColor;

  // Given two colors, adjust the first until contrast is 4.5
  color: makeHighContrastColor($ouiColorWarning, $backgroundColor);
  padding: $ouiSize;
  border-left: $ouiBorderThick;
  border-color: $ouiColorWarning;

  // Graphics can have a lower minimum contrast level of 3.0
  .square {
    fill: makeGraphicContrastColor($ouiColorWarning, $backgroundColor);
  }
}
`;

export const SassGuidelines = ({ selectedTheme }) => {
  const palette = getSassVars(selectedTheme);

  return (
    <GuidePage title="Sass guidelines">
      <OuiTitle>
        <h2>Core variables</h2>
      </OuiTitle>

      <OuiSpacer size="xxl" />

      <OuiFlexGrid columns={2}>
        <OuiFlexItem>
          <div>
            <OuiTitle size="s">
              <h3>Sizing</h3>
            </OuiTitle>

            <OuiSpacer />

            {ouiSizes.map(function (size, index) {
              return renderSize(size, index);
            })}

            <OuiSpacer />

            <OuiTitle size="s">
              <h3>Z-index</h3>
            </OuiTitle>

            <OuiSpacer />

            {ouiLevels.map(function (level, index) {
              return renderLevel(level, index);
            })}
          </div>
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiTitle size="s">
            <h3>Color</h3>
          </OuiTitle>

          <OuiSpacer />

          {ouiColors.map(function (color, index) {
            return renderPaletteColor(palette, color, index);
          })}
        </OuiFlexItem>
      </OuiFlexGrid>

      <OuiSpacer size="xxl" />

      <GuideRuleTitle>Going beyond the provided colors</GuideRuleTitle>

      <OuiSpacer size="xxl" />

      <OuiFlexGrid columns={2}>
        <OuiFlexItem>
          <OuiTitle size="s">
            <h3>Theming patterns</h3>
          </OuiTitle>

          <OuiSpacer />
          <OuiText>
            <p>
              Often you need to go beyond the provided color set. When doing so{' '}
              <strong>always</strong> use color functions to modify the base
              set. Here are some examples.
            </p>
          </OuiText>
          <OuiSpacer />

          <OuiFlexGroup alignItems="center" responsive={false} gutterSize="s">
            <OuiFlexItem grow={false}>
              <div className="guideSass__swatch guideSass__swatch--danger" />
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiCode>$ouiCodeDanger</OuiCode>
            </OuiFlexItem>
          </OuiFlexGroup>
          <OuiSpacer />
          <OuiFlexGroup alignItems="center" responsive={false} gutterSize="s">
            <OuiFlexItem grow={false}>
              <div className="guideSass__swatch guideSass__swatch--dangerTint" />
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiCode>tint($ouiCodeDanger, 30%)</OuiCode>
            </OuiFlexItem>
          </OuiFlexGroup>
          <OuiSpacer />
          <OuiFlexGroup alignItems="center" responsive={false} gutterSize="s">
            <OuiFlexItem grow={false}>
              <div className="guideSass__swatch guideSass__swatch--dangerShade" />
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiCode>shade($ouiCodeDanger, 30%)</OuiCode>
            </OuiFlexItem>
          </OuiFlexGroup>

          <OuiSpacer />
          <OuiText>
            <p>
              Remember that OUI provides dark and light mode theming support.
              Sometimes the traditional color functions don&apos;t give enough
              flexibility for both modes.
            </p>
            <p>
              For example, depending upon what theme you use{' '}
              <OuiCode>$ouiColorPrimary</OuiCode> will be a different hex value.
            </p>
          </OuiText>
          <OuiSpacer />

          <OuiFlexGroup alignItems="center" responsive={false} gutterSize="s">
            <OuiFlexItem
              grow={false}
              style={{ background: '#FFF', padding: 8 }}>
              <div className="guideSass__swatch guideSass__swatch--primaryLight" />
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiCode>$ouiColorPrimary</OuiCode>
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiText size="s">
                <p>is #0079A5 in the light theme</p>
              </OuiText>
            </OuiFlexItem>
          </OuiFlexGroup>
          <OuiSpacer />
          <OuiFlexGroup alignItems="center" responsive={false} gutterSize="s">
            <OuiFlexItem
              grow={false}
              style={{ background: '#222', padding: 8 }}>
              <div className="guideSass__swatch guideSass__swatch--primaryDark" />
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiCode>$ouiColorPrimary</OuiCode>
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiText size="s">
                <p>is #4da1c0 in the dark theme</p>
              </OuiText>
            </OuiFlexItem>
          </OuiFlexGroup>

          <OuiSpacer />
          <OuiText>
            <p>
              Taking the default primary color above we want to tint the color
              in the light mode, but shade it in the dark mode. This makes the
              background color more subtle in both use cases.
            </p>
          </OuiText>

          <OuiSpacer />

          <OuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none">
            {tintOrShadeExample}
          </OuiCodeBlock>

          <OuiSpacer />

          <OuiFlexGrid columns={2}>
            <OuiFlexItem style={{ background: '#FFF', padding: 16 }}>
              <div className="guideSass__themedBox guideSass__themedBox--light">
                Light theme
              </div>
            </OuiFlexItem>
            <OuiFlexItem style={{ background: '#222', padding: 16 }}>
              <div className="guideSass__themedBox guideSass__themedBox--dark">
                Dark theme
              </div>
            </OuiFlexItem>
          </OuiFlexGrid>
        </OuiFlexItem>

        <OuiFlexItem>
          <OuiTitle size="s">
            <h3>Color contrast patterns</h3>
          </OuiTitle>

          <OuiSpacer />

          <OuiText>
            <p>
              OUI provides some nifty color functions for auto-adjusting color
              to pass AA contrast checks. Often this is needed when using the
              base colors on top of each other. Here is an example similar to
              our callouts with a pesky orange.
            </p>
          </OuiText>

          <OuiSpacer />

          <OuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none">
            {contrastExample}
          </OuiCodeBlock>

          <OuiSpacer />

          <div className="guideSass__contrastExample">
            <svg
              className="square"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16">
              <rect
                width="12"
                height="12"
                x="2"
                y="2"
                rx="2"
                fillRule="evenodd"
              />
            </svg>{' '}
            This orange text now passes a contrast check!
          </div>

          <OuiSpacer />

          <OuiTitle size="s">
            <h3>More on color contrast</h3>
          </OuiTitle>

          <OuiSpacer />

          <OuiText>
            <p>
              Consult the larger{' '}
              <Link to="/guidelines/colors">color guidelines</Link> page for a
              better explanation about passing color contrast.
            </p>
          </OuiText>

          <OuiSpacer />
        </OuiFlexItem>
      </OuiFlexGrid>

      <GuideRuleTitle>Typography</GuideRuleTitle>

      <OuiText grow={false}>
        <p>
          View the{' '}
          <OuiLink href="https://github.com/opensearch-project/oui/blob/main/src/global_styling/variables/_typography.scss">
            variable
          </OuiLink>{' '}
          and{' '}
          <OuiLink href="https://github.com/opensearch-project/oui/blob/main/src/global_styling/mixins/_typography.scss">
            mixins
          </OuiLink>{' '}
          Sass code for typography. For most of your components we recommend
          using <Link to="/display/text">OuiText</Link> or{' '}
          <Link to="/display/title">OuiTitle</Link> instead of these Sass
          variables.
        </p>
      </OuiText>

      <OuiSpacer />
      <OuiCallOut
        size="s"
        color="warning"
        title={
          <span>
            It is more common to use these as a mixin (e.g.{' '}
            <OuiCode language="css">@include ouiFontSizeS;</OuiCode>) to
            automatically apply line-height as well as size.
          </span>
        }
      />

      <OuiSpacer />
      <OuiFlexGrid columns={2}>
        <OuiFlexItem>
          <OuiTitle size="s">
            <h3>Text sizes</h3>
          </OuiTitle>

          <OuiSpacer />
          {ouiFontSizes.map(function (size, index) {
            return renderFontSize(size, index);
          })}
        </OuiFlexItem>
        <OuiFlexItem>
          <div>
            <OuiTitle size="s">
              <h3>Text colors</h3>
            </OuiTitle>

            <OuiSpacer />

            {ouiTextColors.map(function (color, index) {
              return renderPaletteColor(palette, color, index);
            })}

            <OuiSpacer />

            <OuiTitle>
              <h3>Font families</h3>
            </OuiTitle>

            <OuiSpacer />

            <OuiFlexGroup responsive={false} alignItems="center">
              <OuiFlexItem grow={false} className="guideSass__fontFamily">
                Abc
              </OuiFlexItem>
              <OuiFlexItem grow={false}>
                <OuiCode language="css">@include ouiFont;</OuiCode>
              </OuiFlexItem>
            </OuiFlexGroup>

            <OuiFlexGroup responsive={false} alignItems="center">
              <OuiFlexItem
                grow={false}
                className="guideSass__fontFamily guideSass__fontFamily--code">
                Abc
              </OuiFlexItem>
              <OuiFlexItem grow={false}>
                <OuiCode language="css">@include ouiCodeFont;</OuiCode>
              </OuiFlexItem>
            </OuiFlexGroup>
          </div>
        </OuiFlexItem>
      </OuiFlexGrid>

      <OuiSpacer size="xxl" />

      <GuideRuleTitle>Borders</GuideRuleTitle>

      <OuiSpacer size="xxl" />

      <OuiText grow={false}>
        <p>
          OUI provides some helper variables for setting common border types.
        </p>
      </OuiText>

      <OuiSpacer />

      <OuiFlexGrid columns={3}>
        {ouiBorders.map(function (border, index) {
          return renderBorder(border, index);
        })}
      </OuiFlexGrid>

      <OuiSpacer />

      <OuiText grow={false}>
        <p>
          In addition, you can utilize <OuiCode>$ouiBorderRadius</OuiCode> or{' '}
          <OuiCode>$ouiBorderRadiusSmall</OuiCode> to round the corners.
        </p>
      </OuiText>

      <OuiSpacer />

      <OuiFlexGrid columns={3}>
        <OuiFlexItem className="guideSass__border guideSass__border--radius">
          <OuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none">
            {borderRadiusExample}
          </OuiCodeBlock>
        </OuiFlexItem>
        <OuiFlexItem className="guideSass__border guideSass__border--radiusSmall">
          <OuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none">
            {borderRadiusSmallExample}
          </OuiCodeBlock>
        </OuiFlexItem>
      </OuiFlexGrid>

      <GuideRuleTitle>Shadow and Depth</GuideRuleTitle>

      <OuiFlexGrid columns={2}>
        <OuiFlexItem>
          <OuiTitle size="s">
            <h3>Use mixins for shadows</h3>
          </OuiTitle>

          <OuiText>
            <p>
              <OuiLink href="https://github.com/opensearch-project/oui/blob/main/src/global_styling/mixins/_shadow.scss">
                View the Sass code for shadow mixins
              </OuiLink>
              .
            </p>
          </OuiText>

          <OuiSpacer />

          {ouiShadows.map(function (shadow, index) {
            return renderShadow(shadow, index);
          })}

          <OuiSpacer />

          <OuiTitle size="s">
            <h3>Adding color to shadows</h3>
          </OuiTitle>

          <OuiText>
            <p>Most shadow mixins can also accept color.</p>
          </OuiText>

          <OuiSpacer />

          <div className="guideSass__shadow guideSass__shadow--color oui-textBreakAll">
            <OuiCodeBlock
              language="scss"
              paddingSize="none"
              transparentBackground>
              @include ouiBottomShadowLarge(desaturate($ouiColorPrimary, 30%));
            </OuiCodeBlock>
          </div>
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiTitle size="s">
            <h3>Shadows to create graceful overflows</h3>
          </OuiTitle>

          <OuiText>
            <p>
              Primarily used in modals and flyouts, the overflow shadow masks
              the edges to indicate there is more content.
            </p>
          </OuiText>

          <OuiSpacer />

          <OuiTitle size="xs">
            <h4>
              Vertical scrolling with <OuiCode>ouiYScrollWithShadows</OuiCode>
            </h4>
          </OuiTitle>

          <OuiSpacer size="s" />

          <OuiPanel paddingSize="none" grow={false}>
            <div className="guideSass__overflowShadows">
              <OuiText className="guideSass__overflowShadowText" size="s">
                <p>
                  It requires a wrapping element to control the height with{' '}
                  <OuiCode>overflow-y: hidden;</OuiCode> and the content to
                  <OuiCode>@include ouiYScrollWithShadows;</OuiCode> or use the{' '}
                  <Link to="/utilities/css-utility-classes">
                    CSS utility class
                  </Link>{' '}
                  <OuiCode>.oui-yScrollWithShadows</OuiCode>.
                </p>
                <p>
                  <b>Example:</b>
                </p>
                <OuiCodeBlock language="sass" isCopyable paddingSize="s">
                  {`.overflowY {
  height: 200px;
  overflow-y: hidden;

  .overflowY__content {
    @include ouiYScrollWithShadows;
  }
}`}
                </OuiCodeBlock>
                <p>
                  Consequuntur atque nulla atque nemo tenetur numquam. Assumenda
                  aspernatur qui aut sit. Aliquam doloribus iure sint id.
                  Possimus dolor qui soluta cum id tempore ea illum. Facilis
                  voluptatem aut aut ut similique ut. Sed repellendus commodi
                  iure officiis exercitationem praesentium dolor. Ratione non ut
                  nulla accusamus et. Optio laboriosam id incidunt. Ipsam
                  voluptate ab quia necessitatibus sequi earum voluptate. Porro
                  tempore et veritatis quo omnis. Eaque ut libero tempore sit
                  placeat maxime laudantium. Mollitia tempore minus qui autem
                  modi adipisci ad. Iste reprehenderit accusamus voluptatem
                  velit. Quidem delectus eos veritatis et vitae et nisi.
                  Doloribus ut corrupti voluptates qui exercitationem dolores.
                </p>
              </OuiText>
            </div>
          </OuiPanel>

          <OuiSpacer />

          <OuiTitle size="xs">
            <h4>
              Horizontal scrolling with <OuiCode>ouiXScrollWithShadows</OuiCode>
            </h4>
          </OuiTitle>

          <OuiSpacer size="s" />

          <OuiPanel paddingSize="none" grow={false}>
            <div className="guideSass__overflowShadowsX">
              <OuiText className="guideSass__overflowShadowTextX" size="s">
                <p>
                  You may want to add at least <OuiCode>$ouiSizeS</OuiCode>
                  &apos;s worth of padding to the sides of your content so the
                  mask doesn&apos;t overlay it.
                </p>
                <p>
                  <b>Example:</b>
                </p>
                <OuiCodeBlock language="sass" isCopyable paddingSize="s">
                  {`.overflowXContent {
  @include ouiXScrollWithShadows;
  padding-left: $ouiSizeS;
  padding-right: $ouiSizeS;
}`}
                </OuiCodeBlock>
              </OuiText>
            </div>
          </OuiPanel>
          <OuiSpacer size="xl" />
          <OuiText>
            <p>
              If you need to further customize the position or side of the
              overflow shadow use the <OuiCode>ouiOverflowShadow</OuiCode>{' '}
              <OuiLink href="https://github.com/opensearch-project/oui/blob/main/src/global_styling/mixins/_shadow.scss">
                mixin
              </OuiLink>
              .
            </p>
          </OuiText>
        </OuiFlexItem>
      </OuiFlexGrid>

      <OuiSpacer size="xxl" />

      <GuideRuleTitle>Media queries and breakpoints</GuideRuleTitle>

      <OuiText>
        <p>
          <OuiLink href="https://github.com/opensearch-project/oui/blob/main/src/global_styling/mixins/_responsive.scss">
            View the Sass code for media queries
          </OuiLink>
          .
        </p>
        <p>
          Breakpoints in OUI are provided through the use of a Sass mixin{' '}
          <OuiCode>@include ouiBreakpoint()</OuiCode> that accepts an array of
          sizes.
        </p>
      </OuiText>

      <OuiSpacer />
      <div className="guideSass__breakpointExample" />
      <OuiSpacer />

      <OuiFlexGrid columns={2}>
        <OuiFlexItem>
          <div>
            <OuiTitle size="s">
              <h3>Breakpoint sizing</h3>
            </OuiTitle>

            <OuiSpacer />

            {ouiBreakPoints.map(function (size) {
              return renderBreakpoint(size, breakpoints);
            })}
          </div>
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiTitle size="s">
            <h3>Mixin usage</h3>
          </OuiTitle>

          <OuiSpacer />

          <OuiText>
            <p>Target mobile devices only</p>
          </OuiText>
          <OuiCodeBlock language="scss" transparentBackground paddingSize="s">
            {"@include ouiBreakpoint('xs','s') {...}"}
          </OuiCodeBlock>

          <OuiSpacer />

          <OuiText>
            <p>Target mobile and tablets</p>
          </OuiText>
          <OuiCodeBlock language="scss" transparentBackground paddingSize="s">
            {"@include ouiBreakpoint('xs', 's', 'm') {...}"}
          </OuiCodeBlock>

          <OuiSpacer />

          <OuiText>
            <p>Target tablets only</p>
          </OuiText>
          <OuiCodeBlock language="scss" transparentBackground paddingSize="s">
            {"@include ouiBreakpoint('m') {...}"}
          </OuiCodeBlock>

          <OuiSpacer />

          <OuiText>
            <p>Target very wide displays only</p>
          </OuiText>
          <OuiCodeBlock language="scss" transparentBackground paddingSize="s">
            {"@include ouiBreakpoint('xl') {...}"}
          </OuiCodeBlock>

          <OuiSpacer />
        </OuiFlexItem>
      </OuiFlexGrid>

      <OuiSpacer size="xxl" />

      <GuideRuleTitle>Animation</GuideRuleTitle>
      <OuiText grow={false}>
        <p>
          <OuiLink href="https://github.com/opensearch-project/oui/blob/main/src/global_styling/variables/_animations.scss">
            View the Sass code for animation
          </OuiLink>
          .
        </p>
        <p>
          OUI utilizes the following constants to maintain a similar
          &apos;bounce&apos; to its animations. That said, animations are
          tricky, and if they aren&apos;t working for your specific application
          this is the one place where we think it&apos;s OK to come up with your
          own rules.
        </p>
      </OuiText>
      <OuiSpacer />
      <OuiFlexGrid columns={2}>
        <OuiFlexItem>
          <OuiTitle size="s">
            <h3>Speed</h3>
          </OuiTitle>

          <OuiSpacer />

          {ouiAnimationSpeeds.map(function (speed, index) {
            return renderAnimationSpeed(speed, index);
          })}
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiTitle size="s">
            <h3>Timing</h3>
          </OuiTitle>

          <OuiSpacer />

          {ouiAnimationTimings.map(function (speed, index) {
            return renderAnimationTiming(speed, index);
          })}
        </OuiFlexItem>
      </OuiFlexGrid>

      <OuiSpacer size="xl" />

      <GuideRuleTitle>Sass best practices</GuideRuleTitle>

      <OuiSpacer size="xl" />

      <OuiFlexGrid columns={2}>
        <OuiFlexItem>
          <OuiText>
            <h3>Component based naming</h3>
            <p>
              OUI is written in a{' '}
              <OuiLink href="http://getbem.com/introduction/">BEM</OuiLink>ish
              style with the addition of verb states (ex:{' '}
              <OuiCode>*-isLoading</OuiCode>). Below is an example of proper
              formatting.
            </p>
          </OuiText>
          <OuiSpacer />
          <OuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none">
            {bemExample}
          </OuiCodeBlock>
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiText grow={false}>
            <h3>Writing Sass the OUI way</h3>
            <p>
              In general, when writing new SCSS in a project that installs OUI
              as a dependency try to follow these best practices:
            </p>
          </OuiText>
          <OuiSpacer />
          <OuiText size="s" grow={false}>
            <ul>
              <li>
                Utilize color variables and functions rather than hard-coded
                values
              </li>
              <li>Utilize the sizing variables for padding and margins</li>
              <li>
                Utilize the animation variables for animations when possible
              </li>
              <li>
                Utilize the responsive mixins for all screen width calculations
              </li>
              <li>
                Utilize the typography mixins and variables for all font family,
                weight, and sizing
              </li>
              <li>
                Utilize the shadow mixins and z-index variables to manage depth
              </li>
              <li>
                Utilize the border and border-radius variable to handle border
                usage
              </li>
              <li>
                Minimize your overwrites and try to make new Sass additive in
                nature
              </li>
            </ul>
          </OuiText>

          <OuiSpacer />

          <OuiTitle size="s">
            <h3>Importing OUI global Sass</h3>
          </OuiTitle>

          <OuiSpacer />

          <OuiText grow={false}>
            <p>
              Most OUI based projects should already import the OUI global
              scope. For example, Kibana has its own liner that will give you
              everything on this page.
            </p>
          </OuiText>
          <OuiSpacer />
          <OuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none">
            {importKibanaExample}
          </OuiCodeBlock>
          <OuiSpacer />
          <OuiText grow={false}>
            <p>
              If you want to construct your own import, you would just need to
              import the following core files into a fresh Sass project.
            </p>
          </OuiText>

          <OuiSpacer />

          <OuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none">
            {importOutsideExample}
          </OuiCodeBlock>
        </OuiFlexItem>
      </OuiFlexGrid>
    </GuidePage>
  );
};
