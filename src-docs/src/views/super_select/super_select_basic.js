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

import { OuiSuperSelect, OuiHealth } from '../../../../src/components';

export default () => {
  const options = [
    {
      value: 'warning',
      inputDisplay: (
        <OuiHealth color="subdued" style={{ lineHeight: 'inherit' }}>
          Warning
        </OuiHealth>
      ),
      'data-test-subj': 'option-warning',
      disabled: true,
    },
    {
      value: 'minor',
      inputDisplay: (
        <OuiHealth color="warning" style={{ lineHeight: 'inherit' }}>
          Minor
        </OuiHealth>
      ),
      'data-test-subj': 'option-minor',
    },
    {
      value: 'critical',
      inputDisplay: (
        <OuiHealth color="danger" style={{ lineHeight: 'inherit' }}>
          Critical
        </OuiHealth>
      ),
      'data-test-subj': 'option-critical',
    },
  ];
  const [value, setValue] = useState(options[1].value);

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <OuiSuperSelect
      options={options}
      valueOfSelected={value}
      onChange={(value) => onChange(value)}
    />
  );
};
