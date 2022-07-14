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

import { OuiPanel, OuiCode, OuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <OuiPanel paddingSize="none">
      <OuiCode>paddingSize=&quot;none&quot;</OuiCode>
    </OuiPanel>

    <OuiSpacer size="l" />

    <OuiPanel paddingSize="s">
      <OuiCode>paddingSize=&quot;s&quot;</OuiCode>
    </OuiPanel>

    <OuiSpacer size="l" />

    <OuiPanel paddingSize="m">
      <OuiCode>paddingSize=&quot;m&quot; (default)</OuiCode>
    </OuiPanel>

    <OuiSpacer size="l" />

    <OuiPanel paddingSize="l">
      <OuiCode>paddingSize=&quot;l&quot;</OuiCode>
    </OuiPanel>
  </div>
);
