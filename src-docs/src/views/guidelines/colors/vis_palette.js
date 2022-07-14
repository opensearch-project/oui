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
import { getSassVars } from '../_get_sass_vars';

import {
  OuiFlexGroup,
  OuiFlexItem,
  OuiIcon,
  OuiCopy,
  OuiTitle,
  OuiText,
  OuiPanel,
} from '../../../../../src/components';
import { rgbToHex } from '../../../../../src/services';

export const VisPalette = ({ variant }) => {
  const visColors = getSassVars('light').ouiPaletteColorBlind;
  const visColorKeys = Object.keys(getSassVars('light').ouiPaletteColorBlind);

  function renderPaletteColor(palette, color, index, key) {
    const hex = key ? palette[color][key] : palette[color];
    const name = key && key !== 'graphic' ? `${color}_${key}` : color;

    return (
      <OuiFlexItem key={index} grow={false}>
        <OuiFlexGroup responsive={false} alignItems="center">
          <OuiFlexItem grow={false}>
            <OuiCopy beforeMessage="Click to copy color name" textToCopy={name}>
              {(copy) => (
                <OuiIcon
                  onClick={copy}
                  size="xl"
                  type="stopFilled"
                  color={rgbToHex(hex.rgba)}
                />
              )}
            </OuiCopy>
          </OuiFlexItem>
          <OuiFlexItem grow={false}>
            <OuiTitle size="xxs">
              <h3>{name}</h3>
            </OuiTitle>
          </OuiFlexItem>
          <OuiFlexItem>
            <OuiText size="s" color="subdued">
              <p>
                <code>{rgbToHex(hex.rgba).toUpperCase()}</code>
              </p>
            </OuiText>
          </OuiFlexItem>
        </OuiFlexGroup>
      </OuiFlexItem>
    );
  }

  return (
    <OuiPanel paddingSize="l" color="subdued">
      <OuiFlexGroup direction="column" gutterSize="s">
        {visColorKeys.map(function (color, index) {
          return renderPaletteColor(visColors, color, index, variant);
        })}
      </OuiFlexGroup>
    </OuiPanel>
  );
};
