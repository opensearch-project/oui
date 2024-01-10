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
  const [selectedIndex, setSelectedIndex] = useState(0);

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
      button: 'Option one',
      onClick: () => setSelectedIndex(0),
      onButtonClick: () => console.log('Option one clicked'),
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
      button: 'Option two',
      onClick: () => setSelectedIndex(1),
      onButtonClick: () => console.log('Option two clicked'),
    },
    {
      display: 'Just some Text',
      button: 'Option three',
      onClick: () => setSelectedIndex(2),
      onButtonClick: () => console.log('Option three clicked'),
    },
  ];

  return (
    <OuiSplitButton
      options={options}
      selectedIndex={selectedIndex}
      onClick={options[selectedIndex].onButtonClick}
      hasDividers
      optionProps={{ textAlign: 'left' }}>
      {options[selectedIndex].button}
    </OuiSplitButton>
  );
};
