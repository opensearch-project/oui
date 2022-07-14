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
  const [color, setColor, errors] = useColorPickerState('#D36086');
  const [colorStops, setColorStops] = useColorStopsState();

  return (
    <React.Fragment>
      <OuiFormRow label="Pick a swatch" isInvalid={!!errors} error={errors}>
        <OuiColorPicker
          mode="swatch"
          onChange={setColor}
          color={color}
          isInvalid={!!errors}
        />
      </OuiFormRow>
      <OuiFormRow label="Pick a color" isInvalid={!!errors} error={errors}>
        <OuiColorPicker
          mode="picker"
          onChange={setColor}
          color={color}
          isInvalid={!!errors}
        />
      </OuiFormRow>

      <OuiSpacer />

      <OuiFormRow label="Set stops with swatches">
        <OuiColorStops
          label="Set stops with swatches"
          onChange={setColorStops}
          colorStops={colorStops}
          min={0}
          max={100}
          mode="swatch"
        />
      </OuiFormRow>

      <OuiFormRow label="Set stops with picker">
        <OuiColorStops
          label="Set stops with picker"
          onChange={setColorStops}
          colorStops={colorStops}
          min={0}
          max={100}
          mode="picker"
        />
      </OuiFormRow>
    </React.Fragment>
  );
};
