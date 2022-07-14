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

import {
  OuiFlexGrid,
  OuiFlexGroup,
  OuiFlexItem,
} from '../../../../src/components/flex';
import { OuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <div>
    <OuiFlexGroup>
      <OuiFlexItem grow={false}>
        <div>Flex Group</div>
        <OuiSpacer />
        <OuiFlexGroup>
          <OuiFlexItem>Nested Grid One</OuiFlexItem>
          <OuiFlexItem>Nested Grid Two</OuiFlexItem>
        </OuiFlexGroup>
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <div>Flex Grid</div>
        <OuiSpacer />
        <OuiFlexGrid columns={3}>
          <OuiFlexItem>Nested Grid One</OuiFlexItem>
          <OuiFlexItem>Nested Grid Two</OuiFlexItem>
          <OuiFlexItem>Nested Grid Three</OuiFlexItem>
          <OuiFlexItem>Nested Grid Four</OuiFlexItem>
        </OuiFlexGrid>
      </OuiFlexItem>
    </OuiFlexGroup>
  </div>
);
