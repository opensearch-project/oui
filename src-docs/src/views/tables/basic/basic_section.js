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
import { Table } from './basic';
import { OuiBasicTable } from '../../../../../src/components/basic_table';
import {
  Criteria,
  CriteriaWithPagination,
} from '!!prop-loader!../../../../../src/components/basic_table/basic_table';
import { Pagination } from '!!prop-loader!../../../../../src/components/basic_table/pagination_bar';
import {
  OuiTableFieldDataColumnType,
  OuiTableComputedColumnType,
  OuiTableActionsColumnType,
  OuiTableSelectionType,
  OuiTableSortingType,
} from '!!prop-loader!../../../../../src/components/basic_table/table_types';
import { CustomItemAction } from '!!prop-loader!../../../../../src/components/basic_table/action_types';
import { DefaultItemActionProps as DefaultItemAction } from '../props/props';

const source = require('./basic?raw');
const html = renderToHtml(Table);

export const section = {
  title: 'A basic table',
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
        <strong>OuiBasicTable</strong> is an opinionated high level component
        that standardizes both display and injection. At its most simple it only
        accepts two properties:
      </p>
      <ul>
        <li>
          <OuiCode>items</OuiCode> are an array of objects that should be
          displayed in the table; one item per row. The exact item data that
          will be rendered in each cell in these rows is determined by the{' '}
          <OuiCode>columns</OuiCode> property. You can define{' '}
          <OuiCode>rowProps</OuiCode> and <OuiCode>cellProps</OuiCode> props
          which can either be objects or functions that return objects. The
          returned objects will be applied as props to the rendered rows and row
          cells, respectively.
        </li>
        <li>
          <OuiCode>columns</OuiCode> defines what columns the table has and how
          to extract item data to display each cell in each row.
        </li>
      </ul>
      <p>
        This example shows the most basic form of the{' '}
        <strong>OuiBasicTable</strong>. It is configured with the required{' '}
        <OuiCode>items</OuiCode> and <OuiCode>columns</OuiCode> properties. It
        shows how each column defines the data it needs to display per item.
        Some columns display the value as is (e.g. <OuiCode>firstName</OuiCode>{' '}
        and <OuiCode>lastName</OuiCode> fields for the user column). Other
        columns customize the display of the data before it is injected. This
        customization can be done in two (non-mutual exclusive) ways:
      </p>
      <ul>
        <li>
          Provide a hint about the type of data (e.g. the &quot;Date of
          Birth&quot; column indicates that the data it shows is of type{' '}
          <OuiCode>date</OuiCode>). Providing data type hints will cause
          built-in display components to be adjusted (e.g. numbers will become
          right aligned, just like Excel).
        </li>
        <li>
          Provide a <OuiCode>render</OuiCode> function that given the value (and
          the item as a second argument) returns the React node that should be
          displayed as the content of the cell. This can be as simple as
          formatting values (e.g. the &quot;Date of Birth&quot; column) to
          utilizing more complex React components (e.g. the &quot;Online&quot;,
          &quot;Github&quot;, and &quot;Nationality&quot; columns as seen
          below).
          <br />
          <strong>Note:</strong> the basic table will treat any cells that use a{' '}
          <OuiCode>render</OuiCode> function as being{' '}
          <OuiCode language="js">textOnly: false</OuiCode>. This may cause
          unnecessary word breaks. Apply{' '}
          <OuiCode language="js">textOnly: true</OuiCode> to ensure it breaks
          properly.
        </li>
      </ul>
    </div>
  ),
  props: {
    OuiBasicTable,
    Criteria,
    CriteriaWithPagination,
    Pagination,
    OuiTableSortingType,
    OuiTableSelectionType,
    OuiTableFieldDataColumnType,
    OuiTableComputedColumnType,
    OuiTableActionsColumnType,
    DefaultItemAction,
    CustomItemAction,
  },
  demo: <Table />,
};
