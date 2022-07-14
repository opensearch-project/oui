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

import React, { Fragment, useState } from 'react';

import { OuiSuperSelect, OuiText } from '../../../../src/components';

export default () => {
  const options = [
    {
      value: 'option_one',
      inputDisplay: 'Option one',
      dropdownDisplay: (
        <Fragment>
          <strong>Option one</strong>
          <OuiText size="s" color="subdued">
            <p className="ouiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </OuiText>
        </Fragment>
      ),
    },
    {
      value: 'option_two',
      inputDisplay: 'Option two',
      dropdownDisplay: (
        <Fragment>
          <strong>Option two</strong>
          <OuiText size="s" color="subdued">
            <p className="ouiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </OuiText>
        </Fragment>
      ),
    },
    {
      value: 'option_three',
      inputDisplay: 'Option three',
      dropdownDisplay: (
        <Fragment>
          <strong>Option three</strong>
          <OuiText size="s" color="subdued">
            <p className="ouiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </OuiText>
        </Fragment>
      ),
    },
  ];

  const [value, setValue] = useState('option_one');

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <OuiSuperSelect
      options={options}
      valueOfSelected={value}
      onChange={(value) => onChange(value)}
      itemLayoutAlign="top"
      hasDividers
    />
  );
};
