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

import { OuiLoadingSpinner } from '../../../../src/components/loading';

export default () => (
  <div>
    <OuiLoadingSpinner size="s" />
    &nbsp;&nbsp;
    <OuiLoadingSpinner size="m" />
    &nbsp;&nbsp;
    <OuiLoadingSpinner size="l" />
    &nbsp;&nbsp;
    <OuiLoadingSpinner size="xl" />
  </div>
);
