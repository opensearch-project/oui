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

import React, { useState } from 'react';

import {
  OuiDatePicker,
  OuiSpacer,
  OuiFormRow,
} from '../../../../src/components';
import { DisplayToggles } from '../form_controls/display_toggles';

export default () => {
  const [startDate, setStartDate] = useState(null);

  const handleChange = (date) => {
    setStartDate(date);
  };

  const errors = [
    "Here's an example of an error",
    'You might have more than one error, so pass an array.',
  ];

  return (
    /* DisplayToggles wrapper for Docs only */
    <div>
      <DisplayToggles canCompressed={false}>
        <OuiDatePicker
          showTimeSelect
          selected={startDate}
          onChange={handleChange}
          placeholder="Placeholder text"
        />
      </DisplayToggles>

      <OuiSpacer size="l" />

      <OuiDatePicker
        showTimeSelect
        selected={startDate}
        onChange={handleChange}
        onClear={() => handleChange(null)}
        placeholder="Clearable"
      />

      <OuiSpacer size="m" />

      <OuiFormRow label="Form row validation" isInvalid error={errors}>
        <OuiDatePicker
          showTimeSelect
          isInvalid
          selected={startDate}
          onChange={handleChange}
          placeholder="Example of an error"
        />
      </OuiFormRow>
    </div>
  );
};
