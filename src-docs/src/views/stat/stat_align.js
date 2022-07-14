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
        <OuiStat title="$ 1,000.00" description="Left align" textAlign="left" />
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiStat
          title="99.9999"
          description="Center align"
          textAlign="center"
        />
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiStat
          title="1,000.00 €"
          description="Right align"
          textAlign="right"
        />
      </OuiFlexItem>
    </OuiFlexGroup>
  </div>
);
