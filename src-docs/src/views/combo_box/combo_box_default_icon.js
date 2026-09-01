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
import { OnCreateOption as comboBoxOnCreateOption } from './combo_box_icon'; // Rename the import to avoid naming conflicts
import { OuiComboBox } from '../../../../src/components';

export default () => {
  const [options] = useState([
    {
      label: 'Titan',
      'data-test-subj': 'titanOption',
    },
    {
      label: 'Enceladus is disabled',
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
  ]);

  const [selectedOptions, setSelected] = useState([options[2], options[4]]);

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  const onCreateOption = (searchValue, flattenedOptions) => {
    // Pass options and setSelected as parameters to OnCreateOption
    comboBoxOnCreateOption(searchValue, flattenedOptions, options, setSelected);
  };

  return (
    <OuiComboBox
      placeholder="Select or create options"
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
      onCreateOption={onCreateOption}
      isClearable={true}
      icon
    />
  );
};
