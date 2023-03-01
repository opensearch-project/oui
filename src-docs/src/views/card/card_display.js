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
  OuiCard,
  OuiFlexGroup,
  OuiFlexItem,
  OuiSpacer,
} from '../../../../src/components';

export default () => (
  <div>
    <OuiSpacer size="s" />
    <OuiFlexGroup gutterSize="l">
      <OuiFlexItem>
        <OuiCard
          layout="horizontal"
          onClick={() => {}}
          title="Plain"
          display="plain"
          description="This one still has a solid background color."
        />
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiCard
          title="Subdued"
          display="subdued"
          description="This one has a subdued background color."
          onClick={() => {}}
        />
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiCard
          layout="horizontal"
          title="Transparent"
          display="transparent"
          description="This one doesn't have a background color anymore."
          betaBadgeLabel="experimental"
          betaBadgeTooltipContent="This module is not GA. Please help us by reporting any bugs."
          onClick={() => {}}
        />
      </OuiFlexItem>
    </OuiFlexGroup>
  </div>
);
