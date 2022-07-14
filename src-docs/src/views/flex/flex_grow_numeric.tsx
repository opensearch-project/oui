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
  <div>
    <OuiFlexGroup>
      <OuiFlexItem grow={1}>1</OuiFlexItem>
      <OuiFlexItem grow={2}>
        2<br />
        wraps content if necessary
      </OuiFlexItem>
      <OuiFlexItem grow={3}>
        3<br />
        expands_to_fit_if_content_cannot_wrap
      </OuiFlexItem>
      <OuiFlexItem grow={4}>4</OuiFlexItem>
    </OuiFlexGroup>

    <OuiSpacer />

    <OuiFlexGroup>
      <OuiFlexItem grow={6}>6</OuiFlexItem>
      <OuiFlexItem grow={3}>3</OuiFlexItem>
      <OuiFlexItem grow={1}>1</OuiFlexItem>
      <OuiFlexItem grow={3}>3</OuiFlexItem>
      <OuiFlexItem grow={6}>6</OuiFlexItem>
    </OuiFlexGroup>
  </div>
);
