/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

import { OuiFlexGroup, OuiFlexItem } from '../../../../src/components/flex';

export default () => (
  <div>
    <OuiFlexGroup>
      <OuiFlexItem basis={'auto'}>
        Auto
        <br />
        Varies based on content size or width/height property
      </OuiFlexItem>
      <OuiFlexItem basis={'fit-content'}>
        Fit-content
        <br />
        Sizes the item based on the content&apos;s width but within the
        container.
      </OuiFlexItem>
      <OuiFlexItem basis={'max-content'}>
        Max-content
        <br />
        Sizes the item to be as large as the content&apos;s maximum width.
      </OuiFlexItem>
      <OuiFlexItem basis={'min-content'}>
        Min-content
        <br />
        Sizes the item to be as small as the content&apos;s minimum width
        without breaking.
      </OuiFlexItem>
    </OuiFlexGroup>
  </div>
);
