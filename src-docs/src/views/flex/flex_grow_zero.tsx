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
  <OuiFlexGroup>
    <OuiFlexItem grow={false}>This item won&rsquo;t grow</OuiFlexItem>
    <OuiFlexItem>But this item will.</OuiFlexItem>
  </OuiFlexGroup>
);
