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

import { Table } from './mobile';
import { propsInfo } from './props_info';
import { OuiTextColor } from '../../../../../src/components/text';
import { OuiCode, OuiCodeBlock } from '../../../../../src/components/code';
const source = require('./mobile?raw');
const html = renderToHtml(Table);

const exampleItem = `{
  field: 'firstName',
  name: 'First Name',
  truncateText: true,
  mobileOptions: {
    render: (item) => (<span>{item.firstName} {item.lastName}</span>), // Custom renderer for mobile view only
    header: false,   // Won't show inline header in mobile view
    width: '100%', // Applies a specific width
    enlarge: true,   // Increase text size compared to rest of cells
    truncateText: false, // Only works if a 'render()' is also provided
  }
}`;

export const section = {
  title: 'Responsive tables',
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
        Allowing a table to be responsive means breaking each row down into its
        own section and individually displaying each table header above the cell
        contents. There are few times when you may want to exclude this behavior
        from your table, for instance, when the table has very few columns or
        the table does not break down easily into this format. For these use
        cases, you may set <OuiCode language="js">responsive=false</OuiCode>.
      </p>
      <h4>
        To make your table work responsively, please make sure you add the
        following <OuiTextColor color="danger">additional</OuiTextColor> props
        to the top level table component (<strong>OuiBasicTable</strong> or{' '}
        <strong>OuiInMemoryTable</strong>):
      </h4>
      <ul>
        <li>
          <OuiCode>isSelectable</OuiCode>: if the table has a single column of
          checkboxes for selecting rows
        </li>
        <li>
          <OuiCode>isExpandable</OuiCode>: if the table has rows that can expand
        </li>
        <li>
          <OuiCode>hasActions</OuiCode>: if the table has a column for actions
          which may/may not be hidden in hover
        </li>
      </ul>
      <h4>
        The <OuiCode>mobileOptions</OuiCode> object can be passed to the{' '}
        <strong>OuiTableRowCell</strong> directly or with each column item
        provided to <strong>OuiBasicTable</strong>.
      </h4>
      <OuiCodeBlock language="js">{exampleItem}</OuiCodeBlock>
      <h4>Note:</h4>
      <p>
        You can also change basic table row cell props like{' '}
        <OuiCode>truncateText</OuiCode> and <OuiCode>textOnly</OuiCode> for
        mobile layouts, though you must also be passing a mobile specific render
        function.
      </p>
    </div>
  ),
  props: propsInfo,
  demo: <Table />,
};
