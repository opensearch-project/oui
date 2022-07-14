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
  return (
    <OuiFormRow label="Pick a color" isInvalid={!!errors} error={errors}>
      <OuiColorPicker onChange={setColor} color={color} isInvalid={!!errors} />
    </OuiFormRow>
  );
};
