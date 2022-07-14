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

import { OuiFlexGrid, OuiFlexItem } from '../../../../src/components/flex';

export default () => (
  <div>
    <OuiFlexGrid columns={2} direction="column">
      <OuiFlexItem>
        <div>One</div>
      </OuiFlexItem>
      <OuiFlexItem>
        <div>Two</div>
      </OuiFlexItem>
      <OuiFlexItem>
        <div>Three</div>
      </OuiFlexItem>
      <OuiFlexItem>
        <div>Four</div>
      </OuiFlexItem>
      <OuiFlexItem>
        <div>Five</div>
      </OuiFlexItem>
      <OuiFlexItem>
        <div>Six</div>
      </OuiFlexItem>
      <OuiFlexItem>
        <div>Seven</div>
      </OuiFlexItem>
    </OuiFlexGrid>
  </div>
);
