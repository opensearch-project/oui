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

import { OuiDescriptionList } from '../../../../src/components';

const favoriteVideoGame = [
  {
    title: 'Name',
    description: 'The Elder Scrolls: Morrowind',
  },
  {
    title: 'Game style',
    description: 'Open-world, fantasy, action role-playing',
  },
  {
    title: 'Release date',
    description: '2002',
  },
];

export default () => (
  <OuiDescriptionList textStyle="reverse" listItems={favoriteVideoGame} />
);
