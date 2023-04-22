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
import { OuiBasicTable, OuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './paginated';
const source = require('./paginated?raw');
const html = renderToHtml(Table);

export const section = {
  title: 'Adding pagination to a table',
  source: [
    {
      type: GuideSectionTypes.JS,
      code: source,
    },
    {
      type: GuideSectionTypes.HTML,
      code: html,
    },
  ],
  text: (
    <p>
      The following example shows how to configure pagination via the{' '}
      <OuiCode>pagination</OuiCode>
      property.
    </p>
  ),
  components: { OuiBasicTable },
  demo: <Table />,
};
