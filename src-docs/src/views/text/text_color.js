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
  OuiText,
  OuiTextColor,
  OuiTitle,
} from '../../../../src/components';

export default () => (
  <div>
    <OuiTitle>
      <h2>
        <OuiTextColor color="default">You </OuiTextColor>
        <OuiTextColor color="success">use </OuiTextColor>
        <OuiTextColor color="accent">it </OuiTextColor>
        <OuiTextColor color="warning">on </OuiTextColor>
        <OuiTextColor color="danger">anything!</OuiTextColor>
      </h2>
    </OuiTitle>

    <OuiSpacer size="l" />

    <OuiText>
      <p>
        <OuiTextColor color="default">Default text color</OuiTextColor>
      </p>
      <p>
        <OuiTextColor color="subdued">Subdued text color</OuiTextColor>
      </p>
      <p>
        <OuiTextColor color="success">Success text color</OuiTextColor>
      </p>
      <p>
        <OuiTextColor color="accent">Accent text color</OuiTextColor>
      </p>
      <p>
        <OuiTextColor color="warning">Warning text color</OuiTextColor>
      </p>
      <p>
        <OuiTextColor color="danger">Danger text color</OuiTextColor>
      </p>
      <p>
        <span style={{ background: '#222' }}>
          <OuiTextColor color="ghost">
            Ghost text color is always white regardless of theme.
          </OuiTextColor>
        </span>
      </p>
    </OuiText>

    <OuiSpacer />

    <OuiText color="danger">
      <h2>Works on OuiText as well.</h2>
      <p>
        Sometimes you need to color entire blocks of text, no matter what is in
        them. You can always apply color directly (versus using the separated
        component) to make it easy. Links should still{' '}
        <a href="#">properly color</a>.
      </p>
    </OuiText>
  </div>
);
