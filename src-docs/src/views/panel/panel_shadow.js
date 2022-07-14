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

import React, { useContext } from 'react';

import { OuiPanel, OuiCode, OuiSpacer } from '../../../../src/components';
import { ThemeContext } from '../../components';

export default () => {
  const themeContext = useContext(ThemeContext);
  const isAmsterdamTheme = themeContext.theme.includes('amsterdam');

  return (
    <div>
      <OuiPanel hasShadow={false}>
        <OuiCode>{'hasShadow={false}'}</OuiCode>
      </OuiPanel>

      <OuiSpacer />

      {/* This example only works for the Amsterdam theme. The default theme has `hasBorder={true}` by default. */}
      {isAmsterdamTheme && (
        <>
          <OuiPanel hasBorder={true}>
            <OuiCode>{'hasBorder={true}'}</OuiCode>
          </OuiPanel>
          <OuiSpacer />
        </>
      )}

      <OuiPanel hasShadow={false} hasBorder={false}>
        <OuiCode>{'hasShadow={false} hasBorder={false}'}</OuiCode>
      </OuiPanel>
    </div>
  );
};
