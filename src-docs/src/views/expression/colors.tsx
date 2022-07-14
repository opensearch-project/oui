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

import { OuiExpression } from '../../../../src/components/expression';
import { OuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <div>
    <OuiExpression description="Success" value="isDefault()" />
    <OuiSpacer size="s" />
    <OuiExpression description="Primary" value="color()" color="primary" />
    <OuiSpacer size="s" />
    <OuiExpression description="accent" value="color()" color="accent" />
    <OuiSpacer size="s" />
    <OuiExpression description="warning" value="color()" color="warning" />
    <OuiSpacer size="s" />
    <OuiExpression description="danger" value="color()" color="danger" />
    <OuiSpacer size="s" />
    <OuiExpression description="subdued" value="color()" color="subdued" />
    <OuiSpacer size="s" />
    <OuiExpression
      description="active"
      value="state will get color() as well"
      color="accent"
      isActive
    />
  </div>
);
