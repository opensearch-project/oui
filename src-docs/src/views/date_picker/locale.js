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
      <OuiFormRow label="US with fractional seconds">
        <OuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          dateFormat="YYYY-MM-DD hh:mm:ss:SSS A"
        />
      </OuiFormRow>

      <OuiSpacer size="m" />

      <OuiFormRow label="China">
        <OuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          dateFormat="YYYY-MM-DD hh:mm A"
          locale="zh-cn"
        />
      </OuiFormRow>

      <OuiSpacer size="m" />

      <OuiFormRow label="Korea">
        <OuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          locale="ko"
          dateFormat="YYYY-MM-DD hh:mm A"
        />
      </OuiFormRow>

      <OuiSpacer size="m" />

      <OuiFormRow label="Germany on 24 hour clock">
        <OuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          dateFormat="DD-MM-YYYY HH:mm"
          timeFormat="HH:mm"
          locale="de-de"
        />
      </OuiFormRow>
    </div>
  );
};
