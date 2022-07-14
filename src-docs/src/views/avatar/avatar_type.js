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

import { OuiAvatar, OuiTitle, OuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <OuiTitle size="xs">
      <h3>Spaces</h3>
    </OuiTitle>
    <OuiSpacer />
    <OuiAvatar size="s" type="space" name="Kibana" />
    &emsp;
    <OuiAvatar type="space" name="Leonardo Space" />
    &emsp;
    <OuiAvatar size="l" type="space" name="Default" />
    &emsp;
    <OuiAvatar size="xl" type="space" name="Engineering Space" />
  </div>
);
