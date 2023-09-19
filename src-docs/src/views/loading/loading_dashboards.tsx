/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

import { OuiLoadingDashboards } from '../../../../src/components/loading';

export default () => (
  <div>
    <OuiLoadingDashboards />
    &emsp;
    <OuiLoadingDashboards size="l" />
    &emsp;
    <OuiLoadingDashboards size="xl" />
    &emsp;
    <OuiLoadingDashboards size="xxl" />
  </div>
);
