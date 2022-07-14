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
        <OuiStat title="1" description="Default color" />
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiStat title="10" description="Subdued color" titleColor="subdued" />
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiStat title="100" description="Primary color" titleColor="primary" />
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiStat
          title="1,000"
          description="Success color"
          titleColor="success"
        />
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiStat
          title="10,000"
          description="Danger color"
          titleColor="danger"
        />
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiStat
          title="100,000"
          description="Accent color"
          titleColor="accent"
        />
      </OuiFlexItem>
    </OuiFlexGroup>
  </div>
);
