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
      <h3>Single vs multi-word</h3>
    </OuiTitle>
    <OuiSpacer />
    <OuiAvatar name="Single" />
    &emsp;
    <OuiAvatar name="Two Words" />
    &emsp;
    <OuiAvatar name="More Than Two Words" />
    &emsp;
    <OuiAvatar name="lowercase words" />
    <OuiSpacer />
    <OuiTitle size="xs">
      <h4>Custom</h4>
    </OuiTitle>
    <OuiSpacer />
    <OuiAvatar name="Kibana" initialsLength={2} />
    &emsp;
    <OuiAvatar name="Leonardo Dude" initialsLength={1} />
    &emsp;
    <OuiAvatar name="Not provided" initials="?" />
    &emsp;
    <OuiAvatar name="Engineering User" initials="En" initialsLength={2} />
  </div>
);
