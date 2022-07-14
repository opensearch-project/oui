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

import { ouiPaletteColorBlind, colorPalette } from '../../../../src/services';
import { ColorPaletteFlexItem, ColorPaletteCopyCode } from './shared';

const customPalettes = [
  [ouiPaletteColorBlind()[3]],
  [ouiPaletteColorBlind()[3], ouiPaletteColorBlind()[4]],
  [ouiPaletteColorBlind()[3], ouiPaletteColorBlind()[4]],
];

export default () => {
  const [length, setLength] = useState(10);

  const onLengthChange = (e) => {
    setLength(e.currentTarget.value);
  };

  return (
    <Fragment>
      <OuiFormRow label="Number of steps" display="columnCompressed">
        <OuiRange
          value={length}
          onChange={onLengthChange}
          min={2}
          max={20}
          compressed
          showValue
        />
      </OuiFormRow>

      <OuiSpacer />

      {customPalettes.map((palette, i) => (
        <OuiFlexGroup alignItems="center" key={i}>
          <OuiFlexItem grow={false}>
            <OuiFlexGroup
              className="guideColorPalette__swatchHolder"
              gutterSize="none"
              responsive={false}>
              {colorPalette(palette, Number(length), i > 1).map((hexCode) => (
                <ColorPaletteFlexItem hexCode={hexCode} key={hexCode} />
              ))}
            </OuiFlexGroup>
          </OuiFlexItem>
          <OuiFlexItem>
            <ColorPaletteCopyCode
              textToCopy={`colorPalette([], ${length}${
                i > 1 ? ', true' : ''
              });`}
              code={`colorPalette([${palette}], ${length}${
                i > 1 ? ', true' : ''
              });`}
            />
          </OuiFlexItem>
        </OuiFlexGroup>
      ))}
    </Fragment>
  );
};
