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

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { OuiDataGrid, OuiCode } from '../../../../src/components';

import DataGridSchema from './schema';
const dataGridSchemaSource = require('./schema?raw');
const dataGridSchemaHtml = renderToHtml(DataGridSchema);

import {
  OuiDataGridColumn,
  OuiDataGridColumnActions,
  OuiDataGridPaginationProps,
  OuiDataGridSorting,
  OuiDataGridInMemory,
  OuiDataGridStyle,
  OuiDataGridToolBarVisibilityOptions,
  OuiDataGridColumnVisibility,
} from '!!prop-loader!../../../../src/components/datagrid/data_grid_types';

import { OuiDataGridCellValueElementProps } from '!!prop-loader!../../../../src/components/datagrid/data_grid_cell';
import { OuiDataGridSchemaDetector } from '!!prop-loader!../../../../src/components/datagrid/data_grid_schema';

export const DataGridSchemaExample = {
  title: 'Data grid schemas and popovers',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridSchemaSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridSchemaHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Schemas are data types you pass to grid columns to affect how the
            columns and expansion popovers render. Schemas also allow you to
            define individual sorting comparators so that sorts can do more than
            just A-Z comparisons. By default, <strong>OuiDataGrid</strong> ships
            with a few built-in schemas for{' '}
            <OuiCode>numeric, currency, datetime, boolean and json</OuiCode>{' '}
            data. When the <OuiCode>inMemory</OuiCode> prop is in use it will
            automatically try to figure out the best schema based on the{' '}
            <OuiCode language="js">{'inMemory:{{ level: value }}'}</OuiCode> you
            set, but this will come with the caveat that you will need to
            provide and manage sorting outside the component. In general we
            recommend passing schema information to your columns instead of
            using auto-detection when you have that knowledge of your data
            available during ingestion.
          </p>
          <h2>Defining custom schemas</h2>
          <p>
            Custom schemas are passed as an array to{' '}
            <OuiCode>schemaDetectors</OuiCode> and are constructed against the{' '}
            <strong>OuiDataGridSchemaDetector</strong> interface. You can see an
            example of a simple custom schema used on the last column below. In
            addition to schemas being useful to map against for cell and
            expansion rendering, any schema will also add a
            <OuiCode language="js">
              {'className="ouiDataGridRowCell--schemaName"'}
            </OuiCode>{' '}
            to each matching cell.
          </p>
          <h2>Defining expansion</h2>
          <p>
            Likewise, you can inject custom content into any of the popovers a
            cell expands into. Add <OuiCode>popoverContents</OuiCode> functions
            to populate a matching schema&apos;s popover using a new component.
            You can see an example of this by clicking into one of the cells in
            the last column below.
          </p>
          <h2>Disabling expansion popovers</h2>
          <p>
            Often the popovers are unnecessary for short form content. In the
            example below we&apos;ve turned them off by setting{' '}
            <OuiCode language="js">isExpandable=false</OuiCode> on the boolean
            column.
          </p>
        </Fragment>
      ),
      components: { DataGridSchema },
      props: {
        OuiDataGrid,
        OuiDataGridInMemory,
        OuiDataGridColumn,
        OuiDataGridColumnActions,
        OuiDataGridColumnVisibility,
        OuiDataGridPaginationProps,
        OuiDataGridSorting,
        OuiDataGridCellValueElementProps,
        OuiDataGridSchemaDetector,
        OuiDataGridStyle,
        OuiDataGridToolBarVisibilityOptions,
      },
      demo: <DataGridSchema />,
    },
  ],
};
