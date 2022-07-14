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

import { OuiAvatar, OuiSpacer, OuiTitle } from '../../../../src/components';

export default () => (
  <div>
    <OuiAvatar size="s" name="Raphael" />
    &emsp;
    <OuiAvatar size="m" name="Donatello" />
    &emsp;
    <OuiAvatar size="l" name="Leonardo" color="#BD10E0" />
    &emsp;
    <OuiAvatar size="xl" name="Michelangelo" />
    <OuiSpacer />
    <OuiTitle size="xs">
      <h2>With image</h2>
    </OuiTitle>
    <OuiSpacer />
    <OuiAvatar
      size="s"
      name="Cat"
      imageUrl="https://source.unsplash.com/64x64/?cat"
    />
    &emsp;
    <OuiAvatar
      size="m"
      name="Cat"
      imageUrl="https://source.unsplash.com/64x64/?cat"
    />
    &emsp;
    <OuiAvatar
      size="l"
      name="Cat"
      imageUrl="https://source.unsplash.com/64x64/?cat"
    />
    &emsp;
    <OuiAvatar
      size="xl"
      name="Cat"
      imageUrl="https://source.unsplash.com/64x64/?cat"
    />
  </div>
);
