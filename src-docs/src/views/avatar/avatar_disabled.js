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

import { OuiAvatar } from '../../../../src/components';

export default () => (
  <div>
    <OuiAvatar
      size="m"
      type="space"
      name="Disabled"
      initials="Di"
      initialsLength={2}
      isDisabled={true}
    />
    &emsp;
    <OuiAvatar
      size="m"
      type="user"
      name="User"
      initials="En"
      initialsLength={2}
      isDisabled={true}
    />
    &emsp;
    <OuiAvatar
      size="m"
      name="Cat"
      imageUrl="https://source.unsplash.com/64x64/?cat"
      isDisabled={true}
    />
    &emsp;
    <OuiAvatar
      size="m"
      name="Management"
      iconType="managementApp"
      isDisabled={true}
    />
  </div>
);
