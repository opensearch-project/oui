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

import { OuiProgress, OuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <OuiProgress value={20} max={100} size="xs" />
    <OuiSpacer size="l" />

    <OuiProgress value={40} max={100} size="xs" />
    <OuiSpacer size="l" />

    <OuiProgress value={60} max={100} size="s" />
    <OuiSpacer size="l" />

    <OuiProgress value={80} max={100} size="m" />
    <OuiSpacer size="l" />

    <OuiProgress value={90} max={100} size="l" />
  </div>
);
