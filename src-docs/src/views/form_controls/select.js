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

import { OuiSelect } from '../../../../src/components';
import { DisplayToggles } from './display_toggles';

export default () => {
  const options = [
    { value: 'option_one', text: 'Option one' },
    { value: 'option_two', text: 'Option two' },
    { value: 'option_three', text: 'Option three' },
  ];

  const [value, setValue] = useState(options[1].value);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles canPrepend canAppend canReadOnly={false}>
      <OuiSelect
        id="selectDocExample"
        options={options}
        value={value}
        onChange={(e) => onChange(e)}
        aria-label="Use aria labels when no actual label is in use"
      />
    </DisplayToggles>
  );
};
