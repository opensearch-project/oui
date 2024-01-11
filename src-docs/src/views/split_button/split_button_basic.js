/*
 * copyright opensearch contributors
 * spdx-license-identifier: apache-2.0
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
