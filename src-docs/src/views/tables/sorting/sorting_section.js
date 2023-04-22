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
import { OuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { OuiTableSortingType } from '!!prop-loader!../../../../../src/components/basic_table/table_types';

import { Table } from './sorting';
const source = require('./sorting?raw');
const html = renderToHtml(Table);

export const section = {
  title: 'Adding sorting to a table',
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
      The following example shows how to configure column sorting via the{' '}
      <OuiCode>sorting</OuiCode> property and flagging the sortable columns as{' '}
      <OuiCode language="js">sortable: true</OuiCode>. To enable the default
      sorting ability for <strong>every</strong> column, pass{' '}
      <OuiCode language="js">enableAllColumns: true</OuiCode> to the{' '}
      <OuiCode>sorting</OuiCode> prop. If you don&apos;t want the user to have
      control over the sort you can pass{' '}
      <OuiCode language="js">readOnly: true</OuiCode> to the{' '}
      <OuiCode>sorting</OuiCode> prop or per column.
    </p>
  ),
  props: { OuiTableSortingType },
  demo: <Table />,
};
