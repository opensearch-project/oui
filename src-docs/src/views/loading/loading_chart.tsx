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

import { OuiLoadingChart } from '../../../../src/components/loading';

export default () => (
  <div>
    <OuiLoadingChart size="m" />
    &nbsp;&nbsp;
    <OuiLoadingChart size="l" />
    &nbsp;&nbsp;
    <OuiLoadingChart size="xl" />
    <br />
    <br />
    <OuiLoadingChart size="m" mono />
    &nbsp;&nbsp;
    <OuiLoadingChart size="l" mono />
    &nbsp;&nbsp;
    <OuiLoadingChart size="xl" mono />
  </div>
);
