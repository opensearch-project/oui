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

import { Table } from './expanding_rows';
const source = require('./expanding_rows?raw');
const html = renderToHtml(Table);

export const section = {
  title: 'Expanding rows',
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
      You can expand rows by passing in a{' '}
      <OuiCode>itemIdToExpandedRowMap</OuiCode> prop which will contain the
      content you want rendered inside the expanded row. When building out your
      table manually (not using OuiBasicTable), you will also need to add the
      prop <OuiCode>isExpandedRow</OuiCode> to the row that will be revealed.
    </p>
  ),
  components: { OuiBasicTable },
  demo: <Table />,
};
