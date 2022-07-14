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

import moment from 'moment';

import { OuiDatePicker, OuiFormRow } from '../../../../src/components';

export default () => {
  const [startDate, setStartDate] = useState(null);

  const handleChange = (date) => {
    setStartDate(date);
  };

  return (
    <OuiFormRow label="Select a date">
      <OuiDatePicker
        selected={startDate}
        onChange={handleChange}
        openToDate={moment('1993-09-28')}
        placeholder="Back to 1993"
      />
    </OuiFormRow>
  );
};
