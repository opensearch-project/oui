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
import { getSassVars } from '../_get_sass_vars';

import {
  OuiIcon,
  OuiTitle,
  OuiCode,
  OuiSpacer,
  OuiText,
  OuiFlexGrid,
  OuiPanel,
} from '../../../../../src/components';
import {
  getHexValueFromColorName,
  ColorsContrastItem,
  allowedColors,
  textVariants,
  coreColors,
  coreTextVariants,
} from './_utilities';

export const ColorSection = ({
  color,
  minimumContrast,
  showTextVariants,
  children,
}) => {
  const theme = useContext(ThemeContext).theme;
  const palette = getSassVars(theme);
  const colorsForContrast = showTextVariants ? textVariants : allowedColors;
  const hex = getHexValueFromColorName(palette, color);
  const iconClass =
    color.includes('Lightest') ||
    color.includes('Empty') ||
    color.includes('Page')
      ? 'colorGuidelines_colorPreviewTooLight'
      : undefined;

  function colorIsCore(color) {
    return coreColors.includes(color) || coreTextVariants.includes(color);
  }

  return (
    <>
      <OuiTitle size="xs">
        <h3 id={color}>
          <OuiIcon
            className={iconClass}
            aria-hidden="true"
            type="stopFilled"
            size="xxl"
            color={hex}
          />{' '}
          &ensp;
          {color}: <OuiCode>{hex}</OuiCode>
        </h3>
      </OuiTitle>

      <OuiSpacer />

      <OuiText grow={false}>{children}</OuiText>

      <OuiSpacer />

      <OuiPanel color="subdued">
        <OuiText size="xs">
          <OuiFlexGrid columns={2} direction="column" gutterSize="s">
            {showTextVariants && colorIsCore(color) && (
              <ColorsContrastItem
                foreground={`${color}Text`}
                background={'ouiPageBackgroundColor'}
                minimumContrast={minimumContrast}
              />
            )}
            {colorsForContrast.map((color2) => {
              if (colorIsCore(color) && colorIsCore(color2)) {
                // i.e. don't render if both are core colors
                return;
              }
              return (
                <ColorsContrastItem
                  foreground={color2}
                  background={color}
                  key={color2}
                  minimumContrast={minimumContrast}
                />
              );
            })}
          </OuiFlexGrid>
        </OuiText>
      </OuiPanel>
    </>
  );
};
