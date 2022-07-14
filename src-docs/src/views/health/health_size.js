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

import { OuiHealth, OuiSpacer, OuiTitle } from '../../../../src/components';

export default () => (
  <div>
    <OuiHealth textSize="xs" color="success">
      Extra small
    </OuiHealth>

    <OuiSpacer />

    <OuiHealth textSize="s" color="success">
      Small (Default)
    </OuiHealth>

    <OuiSpacer />

    <OuiHealth textSize="m" color="success">
      Medium
    </OuiHealth>

    <OuiSpacer />

    <OuiTitle size="s">
      <h3>
        <OuiHealth textSize="inherit" color="success">
          Inherit
        </OuiHealth>
      </h3>
    </OuiTitle>
  </div>
);
