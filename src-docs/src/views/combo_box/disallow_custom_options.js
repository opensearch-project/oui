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
    label: 'Titan',
    'data-test-subj': 'titanOption',
  },
  {
    label: 'Enceladus',
  },
  {
    label: 'Mimas',
  },
  {
    label: 'Dione',
  },
  {
    label: 'Iapetus',
  },
  {
    label: 'Phoebe',
  },
  {
    label: 'Rhea',
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
  },
  {
    label: 'Tethys',
  },
  {
    label: 'Hyperion',
  },
];

export default () => {
  const [selectedOptions, setSelected] = useState([options[2], options[4]]);
  const [error, setError] = useState(undefined);
  const [inputRef, setInputRef] = useState(undefined);

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
    setError(undefined);
  };

  const onSearchChange = (value, hasMatchingOptions) => {
    setError(
      value.length === 0 || hasMatchingOptions
        ? undefined
        : `"${value}" is not a valid option`
    );
  };

  const onBlur = () => {
    if (inputRef) {
      const { value } = inputRef;
      setError(
        value.length === 0 ? undefined : `"${value}" is not a valid option`
      );
    }
  };

  return (
    <OuiFormRow error={error} isInvalid={error !== undefined}>
      <OuiComboBox
        placeholder="Select one or more options"
        options={options}
        selectedOptions={selectedOptions}
        inputRef={setInputRef}
        onChange={onChange}
        onSearchChange={onSearchChange}
        onBlur={onBlur}
      />
    </OuiFormRow>
  );
};
