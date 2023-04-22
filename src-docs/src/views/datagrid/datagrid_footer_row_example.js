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

import DataGridFooterRow from './footer_row';
const dataGridControlColumnsSource = require('./footer_row?raw');
const dataGridControlColumnsHtml = renderToHtml(DataGridFooterRow);

import { OuiDataGridControlColumn } from '!!prop-loader!../../../../src/components/datagrid/data_grid_types';
import { OuiDataGridCellValueElementProps } from '!!prop-loader!../../../../src/components/datagrid/data_grid_cell';

const gridSnippet = `const footerCellValues = {
  // desired data
};

<OuiDataGrid
  {...usualProps}
  renderFooterCellValue={({ columnId }) =>
    footerCellValues[columnId] || null
  }
/>
`;

export const DataGridFooterRowExample = {
  title: 'Data grid footer row',
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
            A footer row can be used to include value aggregations to the grid.
            Values could be based on the dataset, such as sum/average/min/max of
            numeric values in a column, or any other necessary data.
          </p>
          <p>
            The footer row is defined by passing{' '}
            <OuiCode>renderFooterCellValue</OuiCode> function prop into
            OuiDataGrid. <OuiCode>renderFooterCellValue</OuiCode> acts like a
            React component, receiving{' '}
            <OuiCode>OuiDataGridCellValueElementProps</OuiCode> and returning a
            React node.
          </p>
          <OuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {gridSnippet}
          </OuiCodeBlock>
        </Fragment>
      ),
      components: { DataGridFooterRow },

      props: {
        OuiDataGrid,
        OuiDataGridControlColumn,
        OuiDataGridCellValueElementProps,
      },
      demo: <DataGridFooterRow />,
    },
  ],
};
