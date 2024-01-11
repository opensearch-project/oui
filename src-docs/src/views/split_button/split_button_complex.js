/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Fragment } from 'react';

import { OuiSplitButton, OuiText } from '../../../../src/components';

export default () => {
  const options = [
    {
      display: (
        <Fragment>
          <strong>Option one</strong>
          <OuiText disabled size="s" color="subdued">
            Has a short description giving more detail to the option.
          </OuiText>
        </Fragment>
      ),
      onClick: () => console.log('Option one clicked'),
    },
    {
      display: (
        <Fragment>
          <strong>Option two</strong>
          <OuiText size="s" color="subdued">
            Has a short description giving more detail to the option.
          </OuiText>
        </Fragment>
      ),
      onClick: () => console.log('Option 2 clicked'),
    },
    {
      display: 'Just some Text',
      onClick: () => console.log('Option 3 Clicked'),
    },
  ];

  return (
    <OuiSplitButton
      options={options}
      selectedIndex={1}
      hasDividers
      optionProps={{ textAlign: 'left' }}>
      Complex Selections
    </OuiSplitButton>
  );
};
