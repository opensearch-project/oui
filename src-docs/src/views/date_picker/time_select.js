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
  OuiSpacer,
} from '../../../../src/components';

export default () => {
  const [startDate, setStartDate] = useState(moment());

  const handleChange = (date) => {
    setStartDate(date);
  };

  return (
    <div>
      <OuiFormRow label="Time select on">
        <OuiDatePicker
          showTimeSelect
          selected={startDate}
          onChange={handleChange}
        />
      </OuiFormRow>

      <OuiSpacer />

      <OuiFormRow label="Only time select, 24 hour clock">
        <OuiDatePicker
          showTimeSelect
          showTimeSelectOnly
          selected={startDate}
          onChange={handleChange}
          dateFormat="HH:mm"
          timeFormat="HH:mm"
        />
      </OuiFormRow>

      <OuiSpacer />

      <OuiFormRow label="Inject additional times into the list">
        <OuiDatePicker
          showTimeSelect
          showTimeSelectOnly
          selected={startDate}
          onChange={handleChange}
          dateFormat="hh:mm a"
          timeFormat="hh:mm a"
          injectTimes={[
            moment().hours(0).minutes(1),
            moment().hours(0).minutes(5),
            moment().hours(23).minutes(59),
          ]}
        />
      </OuiFormRow>
    </div>
  );
};
