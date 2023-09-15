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
import {
  OuiCode,
  OuiTable,
  OuiTableBody,
  OuiTableHeader,
  OuiTableHeaderCell,
  OuiTableHeaderCellCheckbox,
  OuiTablePagination,
  OuiTableRow,
  OuiTableRowCellCheckbox,
  OuiTableHeaderMobile,
  OuiTableSortMobile,
  OuiTableSortMobileItem,
} from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import Custom from './custom';
const source = require('./custom?raw');
const html = renderToHtml(Custom);
import { cellPropsInfo } from './props_info';

export const section = {
  title: 'Build a custom table from individual components',
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
        As an alternative to <strong>OuiBasicTable</strong> you can instead
        construct a table from individual{' '}
        <strong>low level, basic components</strong> like{' '}
        <strong>OuiTableHeader</strong>
        &nbsp;and <strong>OuiTableRowCell</strong>. Below is one of many ways
        you might set this up on your own. Important to note are how you need to
        set individual props like the <OuiCode>truncateText</OuiCode> prop to
        cells to enforce a single-line behavior and truncate their contents, or
        set the <OuiCode>textOnly</OuiCode> prop to <OuiCode>false</OuiCode> if
        you need the contents to be a direct descendent of the cell.
      </p>
      <h3>Responsive extras</h3>
      <p>
        You must supply a <OuiCode language="js">mobileOptions.header</OuiCode>{' '}
        prop equivalent to the column header on each{' '}
        <strong>OuiTableRowCell</strong> so that the mobile version will use
        that to populate the per cell headers.
      </p>
      <p>
        Also, custom table implementations <strong>will not</strong>{' '}
        auto-populate any header level functions like selection and filtering.
        In order to add mobile support for these functions, you will need to
        implement the <strong>OuiTableHeaderMobile</strong> component as a
        wrapper around these and use <strong>OuiTableSortMobile</strong>
        &nbsp;and <strong>OuiTableSortMobileItem</strong> components to supply
        mobile sorting. See demo below.
      </p>
    </div>
  ),
  components: { OuiTable },
  props: {
    OuiTable,
    OuiTableBody,
    OuiTableHeader,
    OuiTableHeaderCell,
    OuiTableHeaderCellCheckbox,
    OuiTablePagination,
    OuiTableRow,
    OuiTableRowCellCheckbox,
    ...cellPropsInfo,
    OuiTableHeaderMobile,
    OuiTableSortMobile,
    OuiTableSortMobileItem,
  },
  demo: <Custom />,
};
