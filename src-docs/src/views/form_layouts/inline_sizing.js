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
  OuiFlexGroup,
  OuiFlexItem,
  OuiFormRow,
  OuiButton,
  OuiFieldText,
  OuiFieldNumber,
  OuiAvatar,
} from '../../../../src/components/';

export default () => (
  <OuiFlexGroup style={{ maxWidth: 600 }}>
    <OuiFlexItem grow={false} style={{ width: 100 }}>
      <OuiFormRow label="Age">
        <OuiFieldNumber max={10} placeholder={42} />
      </OuiFormRow>
    </OuiFlexItem>
    <OuiFlexItem>
      <OuiFormRow label="Full name">
        <OuiFieldText icon="user" placeholder="John Doe" />
      </OuiFormRow>
    </OuiFlexItem>
    <OuiFlexItem grow={false}>
      <OuiFormRow label="Avatar" display="center">
        <OuiAvatar name="John Doe" size="s" />
      </OuiFormRow>
    </OuiFlexItem>
    <OuiFlexItem grow={false}>
      <OuiFormRow hasEmptyLabelSpace display="center">
        <OuiButton>Save</OuiButton>
      </OuiFormRow>
    </OuiFlexItem>
  </OuiFlexGroup>
);
