/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

import { OuiFlexGroup, OuiFlexItem } from '../../../../src/components/flex';
import { OuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <div>
    <OuiFlexGroup>
      <OuiFlexItem grow={false} shrink={1}>
        Extensive Text Extensive Text Extensive Text
      </OuiFlexItem>
      <OuiFlexItem grow={false} shrink={2}>
        Extensive Text Extensive Text Extensive Text
      </OuiFlexItem>
      <OuiFlexItem grow={false} shrink={4}>
        Extensive Text Extensive Text Extensive Text
      </OuiFlexItem>
      <OuiFlexItem grow={false} shrink={8}>
        Extensive Text Extensive Text Extensive Text
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiSpacer />

    <OuiFlexGroup>
      <OuiFlexItem shrink={1} basis={'auto'}>
        Extensive Text Extensive Text Extensive Text
      </OuiFlexItem>
      <OuiFlexItem shrink={2} basis={'auto'}>
        Extensive Text Extensive Text Extensive Text
      </OuiFlexItem>
      <OuiFlexItem shrink={4} basis={'auto'}>
        Extensive Text Extensive Text Extensive Text
      </OuiFlexItem>
      <OuiFlexItem shrink={8} basis={'auto'}>
        Extensive Text Extensive Text Extensive Text
      </OuiFlexItem>
    </OuiFlexGroup>
  </div>
);
