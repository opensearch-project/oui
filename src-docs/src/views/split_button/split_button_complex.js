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

import React, { Fragment } from 'react';

import { OuiSplitButton, OuiText } from '../../../../src/components';

export default () => {
  const options = [
    {
      display: (
        <Fragment>
          <strong>Option one</strong>
          <OuiText isDisabled size="s" color="subdued">
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
    <OuiSplitButton options={options} selectedIndex={1} hasDividers>
      Complex Selections
    </OuiSplitButton>
  );
};
