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
  OuiScreenReaderOnly,
  OuiPanel,
} from '../../../../../src/components';
import { rgbToHex } from '../../../../../src/services';

export function scrollToSelector(selector, attempts = 5) {
  const element = document.querySelector(selector);

  if (element) {
    window.scrollTo({ top: element.offsetTop - 168, behavior: 'smooth' }); // Offset affords for the sticky contrast slider
  } else if (attempts > 0) {
    setTimeout(scrollToSelector.bind(null, selector, attempts - 1), 250);
  }
}

export const CorePalette = ({ theme, colors }) => {
  const palette = getSassVars(theme);

  function renderPaletteColor(palette, color, index) {
    const hex = palette[color];
    const iconClass =
      color === 'ouiColorLightestShade' || color === 'ouiColorEmptyShade'
        ? 'colorGuidelines_colorPreviewTooLight'
        : undefined;

    return (
      <OuiFlexItem key={index} grow={false}>
        <OuiCopy
          title={`$${color}:
          ${rgbToHex(hex.rgba).toUpperCase()}`}
          beforeMessage={
            <small>
              <kbd>Click</kbd> to copy color name
              <br />
              <kbd>Shift + Click</kbd> to scroll to section
            </small>
          }
          afterMessage={<small>Color name copied!</small>}
          textToCopy={color}>
          {(copy) => (
            <button
              className="oui-isFocusable"
              onClick={(e) => {
                e.shiftKey ? scrollToSelector(`#${color}`) : copy();
              }}>
              <OuiIcon
                className={iconClass}
                size="xxl"
                type="stopFilled"
                color={rgbToHex(hex.rgba)}
              />
              <OuiScreenReaderOnly>
                <span>{color}</span>
              </OuiScreenReaderOnly>
            </button>
          )}
        </OuiCopy>
      </OuiFlexItem>
    );
  }

  return (
    <OuiPanel paddingSize="l" color="subdued">
      <OuiFlexGroup gutterSize="s" wrap responsive={false}>
        {colors.map(function (color, index) {
          return renderPaletteColor(palette, color, index);
        })}
      </OuiFlexGroup>
    </OuiPanel>
  );
};
