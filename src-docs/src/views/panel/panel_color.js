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

import { OuiPanel, OuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <OuiPanel color="subdued" borderRadius="none" hasShadow={false}>
      <p>I am a simple shaded box</p>
    </OuiPanel>

    <OuiSpacer />

    <OuiPanel color="transparent" hasBorder={false}>
      <p>I am a transparent box simply for padding</p>
    </OuiPanel>

    <OuiSpacer />

    {['m', 'l', 'xl'].map((borderRadius) => (
      <>
        <OuiPanel color="subdued" borderRadius={borderRadius}>
          <p>
            I am shaded box with{' '}
            <code>borderRadius=&quot;{borderRadius}&quot;</code>
          </p>
        </OuiPanel>
        <OuiSpacer />
      </>
    ))}
  </div>
);
