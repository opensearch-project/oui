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

import { OuiStat, OuiFlexItem, OuiFlexGroup } from '../../../../src/components';

export default () => (
  <div>
    <OuiFlexGroup>
      <OuiFlexItem>
        <OuiStat title="1,000,000" description="Large size" titleSize="l" />
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiStat title="1,000,000" description="Medium size" titleSize="m" />
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiStat title="1,000,000" description="Small size" titleSize="s" />
      </OuiFlexItem>
    </OuiFlexGroup>
    <OuiFlexGroup>
      <OuiFlexItem>
        <OuiStat
          title="1,000,000"
          description="Extra small size"
          titleSize="xs"
        />
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiStat
          title="1,000,000"
          description="Extra extra small size"
          titleSize="xxs"
        />
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiStat
          title="1,000,000"
          description="Extra extra extra small size"
          titleSize="xxxs"
        />
      </OuiFlexItem>
    </OuiFlexGroup>
  </div>
);
