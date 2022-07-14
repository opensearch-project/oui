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

import {
  OuiColorPicker,
  OuiColorStops,
  OuiFormRow,
  OuiSpacer,
} from '../../../../src/components';

import {
  useColorPickerState,
  useColorStopsState,
} from '../../../../src/services';

export default () => {
  const [color, setColor, errors] = useColorPickerState();
  const [colorStops, setColorStops] = useColorStopsState();

  const customSwatches = ['#333', '#666', '#999', '#CCC'];

  return (
    <React.Fragment>
      <OuiFormRow label="Pick a color" isInvalid={!!errors} error={errors}>
        <OuiColorPicker
          onChange={setColor}
          color={color}
          isInvalid={!!errors}
          swatches={customSwatches}
        />
      </OuiFormRow>

      <OuiSpacer />

      <OuiFormRow label="Set color stops">
        <OuiColorStops
          label="Set color stops"
          onChange={setColorStops}
          colorStops={colorStops}
          min={0}
          max={100}
          swatches={customSwatches}
        />
      </OuiFormRow>
    </React.Fragment>
  );
};
