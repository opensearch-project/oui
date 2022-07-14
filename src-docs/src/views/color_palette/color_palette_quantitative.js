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

import React, { Fragment, useState } from 'react';

import {
  OuiFlexGroup,
  OuiFlexItem,
  OuiRange,
  OuiFormRow,
  OuiSpacer,
} from '../../../../src/components';

import { ColorPaletteFlexItem, ColorPaletteCopyCode } from './shared';

import {
  ouiPaletteComplimentary,
  ouiPaletteForStatus,
  ouiPaletteForTemperature,
  ouiPaletteCool,
  ouiPaletteWarm,
  ouiPaletteNegative,
  ouiPalettePositive,
  ouiPaletteGray,
} from '../../../../src/services';
const paletteData = {
  ouiPaletteForStatus,
  ouiPaletteForTemperature,
  ouiPaletteComplimentary,
  ouiPaletteNegative,
  ouiPalettePositive,
  ouiPaletteCool,
  ouiPaletteWarm,
  ouiPaletteGray,
};
const paletteNames = Object.keys(paletteData);

export default () => {
  const [length, setLength] = useState(5);

  const onLengthChange = (e) => {
    setLength(e.currentTarget.value);
  };

  return (
    <Fragment>
      <OuiFormRow label="Number of steps" display="columnCompressed">
        <OuiRange
          value={length}
          onChange={onLengthChange}
          min={1}
          max={20}
          compressed
          showValue
        />
      </OuiFormRow>

      <OuiSpacer />

      {paletteNames.map((paletteName) => (
        <OuiFlexGroup alignItems="center" key={paletteName}>
          <OuiFlexItem grow={false}>
            <OuiFlexGroup
              className="guideColorPalette__swatchHolder"
              gutterSize="none"
              responsive={false}>
              {paletteData[paletteName](Number(length)).map((hexCode) => (
                <ColorPaletteFlexItem hexCode={hexCode} key={hexCode} />
              ))}
            </OuiFlexGroup>
          </OuiFlexItem>
          <OuiFlexItem>
            <ColorPaletteCopyCode
              textToCopy={`${paletteName}(${length});`}
              code={`${paletteName}(${length})`}
            />
          </OuiFlexItem>
        </OuiFlexGroup>
      ))}
    </Fragment>
  );
};
