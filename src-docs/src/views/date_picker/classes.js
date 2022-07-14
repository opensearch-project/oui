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
      <OuiFormRow label="className example">
        <OuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          className="dpTest__purpleInput"
        />
      </OuiFormRow>

      <OuiSpacer size="m" />

      <OuiFormRow label="calendarClassName example">
        <OuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          calendarClassName="dpTest__purpleCal"
        />
      </OuiFormRow>

      <OuiSpacer size="m" />

      <OuiFormRow label="dayClassName example">
        <OuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          dayClassName={(date) =>
            date.date() < Math.random() * 31 ? 'dpTest__purpleDay' : undefined
          }
        />
      </OuiFormRow>

      <OuiSpacer size="m" />

      <OuiFormRow label="popperClassName example">
        <OuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          popperClassName="dpTest__purplePopper"
        />
      </OuiFormRow>
    </div>
  );
};
