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

import { OuiHealth, OuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <OuiHealth color="subdued">Inactive</OuiHealth>

    <OuiSpacer />

    <OuiHealth color="primary">Active</OuiHealth>

    <OuiSpacer />

    <OuiHealth color="success">Healthy</OuiHealth>

    <OuiSpacer />

    <OuiHealth color="warning">Warning</OuiHealth>

    <OuiSpacer />

    <OuiHealth color="danger">Failure</OuiHealth>

    <OuiSpacer />

    <OuiHealth color="#000000">Custom color as hex</OuiHealth>
  </div>
);
