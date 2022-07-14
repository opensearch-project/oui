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
import { OuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <div>
    <OuiFlexGroup gutterSize="none">
      <OuiFlexItem>None</OuiFlexItem>
      <OuiFlexItem>None</OuiFlexItem>
      <OuiFlexItem>None</OuiFlexItem>
      <OuiFlexItem>None</OuiFlexItem>
    </OuiFlexGroup>

    <OuiSpacer />

    <OuiFlexGroup gutterSize="xs">
      <OuiFlexItem>Extra small</OuiFlexItem>
      <OuiFlexItem>Extra small</OuiFlexItem>
      <OuiFlexItem>Extra small</OuiFlexItem>
      <OuiFlexItem>Extra small</OuiFlexItem>
    </OuiFlexGroup>

    <OuiSpacer />

    <OuiFlexGroup gutterSize="s">
      <OuiFlexItem>Small</OuiFlexItem>
      <OuiFlexItem>Small</OuiFlexItem>
      <OuiFlexItem>Small</OuiFlexItem>
      <OuiFlexItem>Small</OuiFlexItem>
    </OuiFlexGroup>

    <OuiSpacer />

    <OuiFlexGroup gutterSize="m">
      <OuiFlexItem>Medium</OuiFlexItem>
      <OuiFlexItem>Medium</OuiFlexItem>
      <OuiFlexItem>Medium</OuiFlexItem>
      <OuiFlexItem>Medium</OuiFlexItem>
    </OuiFlexGroup>

    <OuiSpacer />

    <OuiFlexGroup gutterSize="l">
      <OuiFlexItem>Large (default)</OuiFlexItem>
      <OuiFlexItem>Large (default)</OuiFlexItem>
      <OuiFlexItem>Large (default)</OuiFlexItem>
      <OuiFlexItem>Large (default)</OuiFlexItem>
    </OuiFlexGroup>

    <OuiSpacer />

    <OuiFlexGroup gutterSize="xl">
      <OuiFlexItem>Extra Large</OuiFlexItem>
      <OuiFlexItem>Extra Large</OuiFlexItem>
      <OuiFlexItem>Extra Large</OuiFlexItem>
      <OuiFlexItem>Extra Large</OuiFlexItem>
    </OuiFlexGroup>
  </div>
);
