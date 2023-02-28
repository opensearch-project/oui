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

import React, { Fragment } from 'react';

import {
  OuiDescriptionList,
  OuiSpacer,
  OuiTitle,
} from '../../../../src/components';

const list = [
  {
    title: 'Item 1',
    description:
      'Aliqua reprehenderit voluptate laborum sit irure proident veniam sint laborum amet elit.',
  },
  {
    title: 'Item 2',
    description:
      'Officia nostrud pariatur sint pariatur ea esse non ea tempor laboris sint.',
  },
  {
    title: 'Item 3',
    description: 'Qui ea duis veniam nisi commodo laborum.',
  },
];
export default () => (
  <Fragment>
    <OuiDescriptionList
      type="column"
      listItems={list}
      style={{ maxWidth: '400px' }}
    />

    <OuiSpacer size="xl" />

    <OuiTitle size="s">
      <h3>
        The following list will become the typical row format on small screens
      </h3>
    </OuiTitle>

    <OuiSpacer />

    <OuiDescriptionList
      type="responsiveColumn"
      listItems={list}
      style={{ maxWidth: '400px' }}
    />
  </Fragment>
);
