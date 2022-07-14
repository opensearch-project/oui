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
  OuiSpacer,
  OuiCode,
  OuiFlexGroup,
  OuiFlexItem,
} from '../../../../src/components';

export default () => (
  <OuiFlexGroup>
    <OuiFlexItem>
      <OuiCode>xs</OuiCode>
      <OuiSpacer size="xs" />
    </OuiFlexItem>

    <OuiFlexItem>
      <OuiCode>s</OuiCode>
      <OuiSpacer size="s" />
    </OuiFlexItem>

    <OuiFlexItem>
      <OuiCode>m</OuiCode>
      <OuiSpacer size="m" />
    </OuiFlexItem>

    <OuiFlexItem>
      <OuiCode>l (default)</OuiCode>
      <OuiSpacer />
    </OuiFlexItem>

    <OuiFlexItem>
      <OuiCode>xl</OuiCode>
      <OuiSpacer size="xl" />
    </OuiFlexItem>

    <OuiFlexItem>
      <OuiCode>xxl</OuiCode>
      <OuiSpacer size="xxl" />
    </OuiFlexItem>
  </OuiFlexGroup>
);
