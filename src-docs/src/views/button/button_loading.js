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
  OuiButton,
  OuiFlexGroup,
  OuiFlexItem,
} from '../../../../src/components';

export default () => (
  <OuiFlexGroup gutterSize="s" alignItems="center" wrap>
    <OuiFlexItem grow={false}>
      <OuiButton isLoading={true}>Loading&hellip;</OuiButton>
    </OuiFlexItem>

    <OuiFlexItem grow={false}>
      <OuiButton fill isLoading={true}>
        Loading&hellip;
      </OuiButton>
    </OuiFlexItem>

    <OuiFlexItem grow={false}>
      <OuiButton fill isLoading={true} iconType="check" iconSide="right">
        Loading&hellip;
      </OuiButton>
    </OuiFlexItem>
  </OuiFlexGroup>
);
