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

import { OuiSuperSelect } from '../../../../src/components';
import { DisplayToggles } from '../form_controls/display_toggles';

export default () => {
  const options = [
    {
      value: 'option_one',
      inputDisplay: 'Option one',
      disabled: true,
      'data-test-subj': 'option one',
    },
    {
      value: 'option_two',
      inputDisplay: 'Option two',
    },
    {
      value: 'option_three',
      inputDisplay: (
        <span className="oui-textTruncate oui-displayBlock">
          Option three has a super long text and added truncation
        </span>
      ),
    },
  ];
  const [value, setValue] = useState(options[1].value);

  const onChange = (value) => {
    setValue(value);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles canPrepend={true} canAppend={true}>
      <OuiSuperSelect
        options={options}
        valueOfSelected={value}
        onChange={(value) => onChange(value)}
      />
    </DisplayToggles>
  );
};
