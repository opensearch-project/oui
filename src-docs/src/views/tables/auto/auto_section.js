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
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';
import { OuiCode } from '../../../../../src/components';

import { Table } from './auto';

const source = require('./auto?raw');
const html = renderToHtml(Table);
const layoutSnippet = [
  `<OuiBasicTable
  columns={[
    { field: 'column1', name: 'Column 1' },
    { field: 'column2', name: 'Column 2' }
  ]}
  tableLayout="auto"
/>
`,
  `<OuiBasicTable
    columns={[
      { field: 'column1', name: 'Column 1', truncateText: true, width: '20%' },
      { field: 'column2', name: 'Column 2' }
    ]}
    tableLayout="fixed"
/>`,
];

export const section = {
  title: 'Table layout',
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
    <div>
      <p>
        <strong>OuiBasicTable</strong> has a fixed layout by default. You can
        change it to <OuiCode>auto</OuiCode> using the{' '}
        <OuiCode>tableLayout</OuiCode> prop. Note that setting{' '}
        <OuiCode>tableLayout</OuiCode> to <OuiCode>auto</OuiCode> prevents the{' '}
        <OuiCode>truncateText</OuiCode> prop from working properly. If you want
        to set different columns widths while still being able to use{' '}
        <OuiCode>truncateText</OuiCode>, set the width of each column using the{' '}
        <OuiCode>width</OuiCode> prop.
      </p>
    </div>
  ),
  snippet: layoutSnippet,
  demo: <Table />,
};
