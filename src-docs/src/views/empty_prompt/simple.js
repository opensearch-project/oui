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
  OuiEmptyPrompt,
  OuiButton,
  OuiButtonEmpty,
} from '../../../../src/components';

export default () => (
  <OuiEmptyPrompt
    title={<h2>You have no spice</h2>}
    actions={[
      <OuiButton color="primary" fill>
        Harvest spice
      </OuiButton>,
      <OuiButtonEmpty color="danger">Sabotage all spice fields</OuiButtonEmpty>,
    ]}
  />
);
