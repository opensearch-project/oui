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

import { OuiColorPicker, OuiFormRow } from '../../../../src/components';
import { useColorPickerState } from '../../../../src/services';

export default () => {
  const [color, setColor, errors] = useColorPickerState('#D36086');
  const [color2, setColor2, errors2] = useColorPickerState('#D36086');
  const [color3, setColor3, errors3] = useColorPickerState('211, 96, 134');
  return (
    <>
      <OuiFormRow label="Auto format" isInvalid={!!errors} error={errors}>
        <OuiColorPicker
          onChange={setColor}
          color={color}
          isInvalid={!!errors}
        />
      </OuiFormRow>
      <OuiFormRow label="Hex format" isInvalid={!!errors2} error={errors2}>
        <OuiColorPicker
          format="hex"
          onChange={setColor2}
          color={color2}
          isInvalid={!!errors2}
        />
      </OuiFormRow>
      <OuiFormRow label="RGB(a) format" isInvalid={!!errors3} error={errors3}>
        <OuiColorPicker
          format="rgba"
          onChange={setColor3}
          color={color3}
          isInvalid={!!errors3}
          showAlpha={true}
        />
      </OuiFormRow>
    </>
  );
};
