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
  const [startDate2, setStartDate2] = useState(moment());
  const [startDate3, setStartDate3] = useState(moment().add(1, 'days'));
  const [startDate4, setStartDate4] = useState(moment().add(1, 'days'));
  const [startDate5, setStartDate5] = useState(moment());

  const isWeekday = (date) => {
    const day = date.day();
    return day !== 0 && day !== 6;
  };

  return (
    <div>
      <OuiFormRow label="Only allow a certain range of dates">
        <OuiDatePicker
          showTimeSelect
          selected={startDate}
          onChange={setStartDate}
          minDate={moment().subtract(2, 'days')}
          maxDate={moment().add(5, 'days')}
        />
      </OuiFormRow>

      <OuiSpacer />

      <OuiFormRow label="Only allow a certain range of times">
        <OuiDatePicker
          showTimeSelect
          selected={startDate2}
          onChange={setStartDate2}
          minTime={moment().hours(17).minutes(0)}
          maxTime={moment().hours(20).minutes(30)}
        />
      </OuiFormRow>

      <OuiSpacer />

      <OuiFormRow label="Exclude yesterday and today">
        <OuiDatePicker
          showTimeSelect
          selected={startDate3}
          onChange={setStartDate3}
          excludeDates={[moment(), moment().add(1, 'days')]}
        />
      </OuiFormRow>

      <OuiSpacer />

      <OuiFormRow label="Exclude 12AM and 5PM from selection">
        <OuiDatePicker
          showTimeSelect
          selected={startDate4}
          onChange={setStartDate4}
          excludeTimes={[
            moment().hours(0).minutes(0),
            moment().hours(17).minutes(0),
          ]}
        />
      </OuiFormRow>

      <OuiSpacer />

      <OuiFormRow label="Filter so only weekdays are selectable">
        <OuiDatePicker
          showTimeSelect
          selected={startDate5}
          onChange={setStartDate5}
          filterDate={isWeekday}
        />
      </OuiFormRow>
    </div>
  );
};
