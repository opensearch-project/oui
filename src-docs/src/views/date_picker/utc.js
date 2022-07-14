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

import {
  OuiDatePicker,
  OuiFormRow,
  OuiSelect,
} from '../../../../src/components';

export default () => {
  const options = [
    { value: -1, text: 'GMT -01:00' },
    { value: -2, text: 'GMT -02:00' },
    { value: -3, text: 'GMT -03:00' },
  ];
  const [startDate, setStartDate] = useState(moment());
  const [utcOffset, setUtcOffset] = useState(options[1].value);

  const onSelectChange = (e) => {
    setUtcOffset(parseInt(e.target.value, 10));
  };

  const selected = startDate && startDate.clone().utcOffset(utcOffset);

  return (
    <div>
      <OuiFormRow label="Select a date">
        <OuiDatePicker
          selected={selected}
          showTimeSelect
          onChange={setStartDate}
          utcOffset={utcOffset * 60}
        />
      </OuiFormRow>
      <OuiFormRow label="UTC offset">
        <OuiSelect
          options={options}
          value={utcOffset}
          onChange={onSelectChange}
        />
      </OuiFormRow>
    </div>
  );
};
