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

import { OuiSplitButton } from '../../../../src/components';

export default () => {
  const options = ['Option 1', 'Option 2'];
  const [, setValue] = useState();

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <OuiSplitButton options={options} onChange={(value) => onChange(value)}>
      Basic Split Button
    </OuiSplitButton>
  );
};
