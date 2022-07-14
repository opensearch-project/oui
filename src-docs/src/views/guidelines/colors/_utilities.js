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

import React, { useContext } from 'react';
import { ThemeContext } from '../../../components';
import { calculateContrast, rgbToHex } from '../../../../../src/services';
import { getSassVars } from '../_get_sass_vars';

import { OuiBadge, OuiCopy, OuiFlexItem } from '../../../../../src/components';
import { OuiIcon } from '../../../../../src/components/icon';

export const coreColors = [
  'ouiColorPrimary',
  'ouiColorAccent',
  'ouiColorSuccess',
  'ouiColorWarning',
  'ouiColorDanger',
];

export const coreTextVariants = [
  'ouiColorPrimaryText',
  'ouiColorAccentText',
  'ouiColorSuccessText',
  'ouiColorWarningText',
  'ouiColorDangerText',
];

export const grayColors = [
  'ouiColorEmptyShade',
  'ouiColorLightestShade',
  'ouiColorLightShade',
  'ouiColorMediumShade',
  'ouiColorDarkShade',
  'ouiColorDarkestShade',
  'ouiColorFullShade',
];

export const textColors = [
  'ouiTextSubduedColor',
  'ouiTextColor',
  'ouiTitleColor',
  'ouiColorGhost',
  'ouiColorInk',
];

export const allowedColors = [...coreColors, ...grayColors];

export const textVariants = [...coreTextVariants, ...textColors];

export const ratingAAA = (
  <OuiBadge iconType="checkInCircleFilled" color="#000">
    AAA
  </OuiBadge>
);
export const ratingAA = (
  <OuiBadge iconType="checkInCircleFilled" color="#333">
    AA
  </OuiBadge>
);
export const ratingAA18 = (
  <OuiBadge iconType="partial" color="#666">
    AA18
  </OuiBadge>
);
export const ratingAll = <OuiBadge color="#eee">ALL</OuiBadge>;

function getContrastRatings(background, foreground, palette) {
  const contrast = calculateContrast(
    [palette[background].r, palette[background].g, palette[background].b],
    [palette[foreground].r, palette[foreground].g, palette[foreground].b]
  );

  let contrastRating;
  let contrastRatingBadge;
  if (contrast >= 7) {
    contrastRating = 'checkInCircleFilled';
    contrastRatingBadge = ratingAAA;
  } else if (contrast >= 4.5) {
    contrastRating = 'checkInCircleFilled';
    contrastRatingBadge = ratingAA;
  } else if (contrast >= 3) {
    contrastRating = 'partial';
    contrastRatingBadge = ratingAA18;
  } else if (foreground.includes('Shade') && contrast >= 2) {
    contrastRating = 'minusInCircle';
    contrastRatingBadge = <OuiIcon type="minusInCircle" />;
  } else {
    contrastRating = 'cross';
    contrastRatingBadge = <OuiIcon type="cross" />;
  }

  return { contrast, contrastRating, contrastRatingBadge };
}

export const ColorsContrastItem = ({
  foreground,
  background,
  minimumContrast,
}) => {
  const themeContext = useContext(ThemeContext);
  const palette = getSassVars(themeContext.theme);
  const contrastRatings = getContrastRatings(background, foreground, palette);

  if (!contrastRatings || contrastRatings.contrast < minimumContrast) {
    return <></>;
  }

  const { contrast, contrastRating, contrastRatingBadge } = getContrastRatings(
    background,
    foreground,
    palette
  );
  const contastIsAcceptableToCopy = contrast >= 3;
  const textToCopy = `background-color: $${background};
color: $${foreground};`;
  const beforeMessage = contastIsAcceptableToCopy ? (
    <small>
      <kbd>Click</kbd> to copy SASS configuration
    </small>
  ) : (
    <small>
      Cannot copy configuration because the contrast is not acceptable
    </small>
  );

  return (
    <OuiFlexItem className="oui-textCenter">
      <OuiCopy
        anchorClassName="oui-displayBlock"
        title={
          <span>
            {contrastRatingBadge} Contrast is {contrast.toFixed(1)}
          </span>
        }
        beforeMessage={beforeMessage}
        afterMessage={<small>Copied!</small>}
        textToCopy={textToCopy}>
        {(copy) => (
          <OuiBadge
            className="guideColorSection__button"
            iconType={contrastRating}
            onClick={copy}
            onClickAriaLabel="Click to copy SASS configurations"
            disabled={!contastIsAcceptableToCopy}
            style={{
              backgroundColor: palette[background].rgba,
              color: palette[foreground].rgba,
            }}>
            {foreground}
          </OuiBadge>
        )}
      </OuiCopy>
    </OuiFlexItem>
  );
};

export function getHexValueFromColorName(palette, colorName, key) {
  const hex = key ? palette[colorName][key] : palette[colorName];
  return rgbToHex(hex.rgba).toUpperCase();
}
