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

import React, { useMemo } from 'react';

import { OuiColorPicker, OuiFormRow } from '../../../../src/components';

import { useColorPickerState } from '../../../../src/services';

export default () => {
  const [color, setColor, errors] = useColorPickerState();
  const isInvalid = useMemo(() => color !== '' && !!errors, [color, errors]);

  return (
    <React.Fragment>
      <OuiFormRow label="Pick a color" isInvalid={isInvalid} error={errors}>
        <OuiColorPicker
          onChange={setColor}
          color={color}
          isInvalid={isInvalid}
          placeholder="Auto"
          isClearable={true}
        />
      </OuiFormRow>
    </React.Fragment>
  );
};
