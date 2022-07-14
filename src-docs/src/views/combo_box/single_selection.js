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
import { DisplayToggles } from '../form_controls/display_toggles';

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
  const [selectedOptions, setSelected] = useState([options[2]]);

  const onChange = (selectedOptions) => {
    // We should only get back either 0 or 1 options.
    setSelected(selectedOptions);
  };

  return (
    <DisplayToggles
      canDisabled={false}
      canReadOnly={false}
      canLoading={false}
      canPrepend={false}
      canIsDisabled
      canAppend>
      <OuiComboBox
        placeholder="Select a single option"
        singleSelection={{ asPlainText: true }}
        options={options}
        selectedOptions={selectedOptions}
        onChange={onChange}
        isDisabled
      />
    </DisplayToggles>
  );
};
