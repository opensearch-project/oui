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

export default () => (
  <OuiFlexGroup direction="column">
    <OuiFlexItem grow={false}>Content grid item</OuiFlexItem>
    <OuiFlexItem grow={false}>Another content grid item</OuiFlexItem>
    <OuiFlexItem grow={false}>Using the column direction</OuiFlexItem>
  </OuiFlexGroup>
);
