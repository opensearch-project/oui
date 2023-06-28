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

export default () => {
  return (
    <div>
      <OuiPanel hasShadow={false}>
        <OuiCode>{'hasShadow={false}'}</OuiCode>
      </OuiPanel>

      <OuiSpacer />

      <OuiPanel hasShadow={false} hasBorder={false}>
        <OuiCode>{'hasShadow={false} hasBorder={false}'}</OuiCode>
      </OuiPanel>
    </div>
  );
};
