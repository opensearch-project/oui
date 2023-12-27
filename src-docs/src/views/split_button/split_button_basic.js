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
    <OuiHealth color="subdued" style={{ lineHeight: 'inherit' }}>
      Warning
    </OuiHealth>,
    <OuiHealth color="warning" style={{ lineHeight: 'inherit' }}>
      Minor
    </OuiHealth>,
    <OuiHealth color="danger" style={{ lineHeight: 'inherit' }}>
      Critical
    </OuiHealth>,
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
