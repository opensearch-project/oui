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

import { OuiFlexGroup, OuiFlexItem } from '../../../../src/components/flex';
import { OuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <OuiFlexGroup>
    <OuiFlexItem>Content grid item</OuiFlexItem>
    <OuiFlexItem>
      <p>Another content grid item</p>
      <OuiSpacer />
      <p>
        Note how both of these are the same width and height despite having
        different content?
      </p>
    </OuiFlexItem>
  </OuiFlexGroup>
);
