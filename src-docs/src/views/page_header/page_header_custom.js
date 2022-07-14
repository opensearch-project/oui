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
  OuiPageHeader,
  OuiPageHeaderSection,
  OuiTitle,
} from '../../../../src/components';

export default () => (
  <OuiPageHeader alignItems="center">
    <OuiPageHeaderSection>
      <OuiTitle size="l">
        <h1>Page title</h1>
      </OuiTitle>
    </OuiPageHeaderSection>
    <OuiPageHeaderSection>Page abilities</OuiPageHeaderSection>
  </OuiPageHeader>
);
