/*
 * copyright opensearch contributors
 * spdx-license-identifier: apache-2.0
 */

import React from 'react';

import { OuiSplitButton } from '../../../../src/components';

export default () => {
  const primaryClick = () => console.log('Primary clicked');

  return (
    <OuiSplitButton options={[]} initiallyOpen onClick={primaryClick}>
      Basic Split Button
    </OuiSplitButton>
  );
};
