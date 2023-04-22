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
import { OuiDataGrid, OuiCodeBlock, OuiCode } from '../../../../src/components';

import DataGridControlColumns from './control_columns';
const dataGridControlColumnsSource = require('./control_columns?raw');
const dataGridControlColumnsHtml = renderToHtml(DataGridControlColumns);

import { OuiDataGridControlColumn } from '!!prop-loader!../../../../src/components/datagrid/data_grid_types';

const gridSnippet = `<OuiDataGrid
  {...usualProps}
  leadingControlColumns={[
    {
      id: 'selection',
      width: 31,
      headerCellRender: () => <span>Select a Row</span>,
      rowCellRender: () => <div><OuiSelectBox ... /></div>,
    },
  ]}
  trailingControlColumns={[
    {
      id: 'actions',
      width: 40,
      headerCellRender: () => null,
      rowCellRender: MyGridActionsComponent,
    },
  ]}
/>
`;

export const DataGridControlColumnsExample = {
  title: 'Data grid control columns',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridControlColumnsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridControlColumnsHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Control columns can be used to include ancillary cells not based on
            the dataset, such as row selection checkboxes or action buttons.
            These columns can be placed at either side of the data grid, and
            users are unable to resize, sort, or rearrange them.
          </p>
          <p>
            These custom columns are defined by passing an array of
            OuiDataGridControlColumn objects (see <em>Props</em> tab below) to{' '}
            <OuiCode>leadingControlColumns</OuiCode> and/or{' '}
            <OuiCode>trailingControlColumns</OuiCode>.
          </p>
          <p>
            As with the data grid&apos;s <OuiCode>renderCellValue</OuiCode>, the
            control columns&apos; <OuiCode>headerCellRender</OuiCode> and{' '}
            <OuiCode>rowCellRender</OuiCode> props are treated as React
            components.
          </p>
          <OuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {gridSnippet}
          </OuiCodeBlock>
        </Fragment>
      ),
      components: { DataGridControlColumns },

      props: {
        OuiDataGrid,
        OuiDataGridControlColumn,
      },
      demo: <DataGridControlColumns />,
    },
  ],
};
