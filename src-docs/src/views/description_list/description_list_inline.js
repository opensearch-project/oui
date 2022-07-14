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

const favoriteVideoGames = [
  {
    title: 'The Elder Scrolls: Morrowind',
    description: 'The opening music alone evokes such strong memories.',
  },
  {
    title: 'TIE Fighter',
    description:
      'The sequel to XWING, join the dark side and fly for the Emporer.',
  },
  {
    title: 'Quake 2',
    description: 'The game that made me drop out of college.',
  },
];
export default () => (
  <OuiDescriptionList
    type="inline"
    listItems={favoriteVideoGames}
    style={{ maxWidth: '400px' }}
  />
);
