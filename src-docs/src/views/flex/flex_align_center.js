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

import { OuiFlexGroup, OuiFlexItem } from '../../../../src/components';

export default () => (
  <OuiFlexGroup alignItems="center">
    <OuiFlexItem grow={false}>
      <p>I</p>
      <p>am</p>
      <p>a</p>
      <p>tall</p>
      <p>item</p>
    </OuiFlexItem>
    <OuiFlexItem>I am vertically centered</OuiFlexItem>
  </OuiFlexGroup>
);
