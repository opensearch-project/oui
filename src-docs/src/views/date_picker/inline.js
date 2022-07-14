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

import { OuiDatePicker } from '../../../../src/components';

export default () => {
  const [startDate, setStartDate] = useState(moment());

  const handleChange = (date) => {
    setStartDate(date);
  };

  return (
    <div>
      <OuiDatePicker
        selected={startDate}
        onChange={handleChange}
        inline
        showTimeSelect
      />
      <OuiDatePicker
        selected={startDate}
        onChange={handleChange}
        inline
        showTimeSelect
        shadow={false}
      />
    </div>
  );
};
