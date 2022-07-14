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

import { OuiComboBox, OuiFormRow } from '../../../../src/components';

const options = [
  {
    label: 'Software Developer',
    'data-test-subj': 'softDevOption',
  },
  {
    label: 'Mobile Developer',
  },
  {
    label: 'Javascript Engineer',
  },
  {
    label: 'UX Designer',
  },
  {
    label: 'UI Designer',
  },
  {
    label: 'Product Designer',
  },
  {
    label: 'QA Engineer',
  },
];

export default () => {
  const [selectedOptions, setSelected] = useState([options[2]]);

  const onChange = (selectedOptions) => {
    // We should only get back either 0 or 1 options.
    setSelected(selectedOptions);
  };

  const onCreateOption = (searchValue = []) => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    const newOption = {
      label: searchValue,
    };

    // Select the option.
    setSelected([newOption]);
  };

  return (
    <OuiFormRow
      label="Your occupation"
      helpText="Select an occupation from the list. If your occupation isn’t available, create a custom one.">
      <OuiComboBox
        placeholder="Select a single option"
        singleSelection={{ asPlainText: true }}
        options={options}
        selectedOptions={selectedOptions}
        onChange={onChange}
        onCreateOption={onCreateOption}
        customOptionText="Add {searchValue} as your occupation"
      />
    </OuiFormRow>
  );
};
