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

import { OuiComboBox } from '../../../../src/components';

const options = [];
let groupOptions = [];
for (let i = 1; i < 5000; i++) {
  groupOptions.push({ label: `option${i}` });
  if (i % 25 === 0) {
    options.push({
      label: `Options ${i - (groupOptions.length - 1)} to ${i}`,
      options: groupOptions,
    });
    groupOptions = [];
  }
}

export default () => {
  const [selectedOptions, setSelected] = useState([]);

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  return (
    <OuiComboBox
      placeholder="Select one or more options"
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
    />
  );
};
