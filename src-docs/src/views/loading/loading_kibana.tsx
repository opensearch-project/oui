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

import { OuiLoadingLogo } from '../../../../src/components/loading';

export default () => (
  <div>
    <OuiLoadingLogo />
    &emsp;
    <OuiLoadingLogo logo="logoObservability" size="l" />
    &emsp;
    <OuiLoadingLogo logo="logoSecurity" size="xl" />
  </div>
);
