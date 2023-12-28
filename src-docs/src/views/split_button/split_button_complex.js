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

import { OuiSplitButton, OuiText } from '../../../../src/components';

export default () => {
  const options = [
    <Fragment>
      <strong>Option one</strong>
      <OuiText isDisabled size="s" color="subdued">
        <p className="ouiTextColor--subdued">
          Has a short description giving more detail to the option.
        </p>
      </OuiText>
    </Fragment>,
    <Fragment>
      <strong>Option two</strong>
      <OuiText size="s" color="subdued">
        <p className="ouiTextColor--subdued">
          Has a short description giving more detail to the option.
        </p>
      </OuiText>
    </Fragment>,
    'Just some Text',
  ];

  const [, setValue] = useState('option_one');

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <OuiSplitButton
      options={options}
      selectedIndex="1"
      onChange={(value) => onChange(value)}
      // itemLayoutAlign="top"
      hasDividers>
      Complex Selections
    </OuiSplitButton>
  );
};
