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
import { OuiButton } from '../../../../src/components/button';
import { OuiFlexGroup, OuiFlexItem } from '../../../../src/components/flex';

export default () => (
  <OuiFlexGroup>
    <OuiFlexItem>
      <OuiButton fill>Buttons will widen</OuiButton>
    </OuiFlexItem>
    <OuiFlexItem>
      <div>
        <OuiButton fill>Unless you wrap them</OuiButton>
      </div>
    </OuiFlexItem>
  </OuiFlexGroup>
);
