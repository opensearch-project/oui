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

import React from 'react';

import { OuiSplitButton } from '../../../../src/components';

export default () => {
  const options = [
    { id: '1', display: 'Option 1', href: '#' },
    {
      id: '2',
      display: 'Option 2',
      onClick: () => console.log('Option 2 clicked'),
    },
  ];

  const primaryClick = () => console.log('Primary clicked');

  return (
    <OuiSplitButton options={options} onClick={primaryClick}>
      Basic Split Button
    </OuiSplitButton>
  );
};
