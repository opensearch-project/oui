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
import {
  OuiDataGrid,
  OuiCallOut,
  OuiCode,
  OuiText,
  OuiSpacer,
} from '../../../../src/components';

import InMemoryDataGrid from './in_memory';
const inMemoryDataGridSource = require('./in_memory?raw');
const inMemoryDataGridHtml = renderToHtml(InMemoryDataGrid);

import InMemoryEnhancementsDataGrid from './in_memory_enhancements';
const inMemoryEnhancementsDataGridSource = require('./in_memory_enhancements?raw');
const inMemoryEnhancementsDataGridHtml = renderToHtml(
  InMemoryEnhancementsDataGrid
);

import InMemoryPaginationDataGrid from './in_memory_pagination';
const inMemoryPaginationDataGridSource = require('./in_memory_pagination?raw');
const inMemoryPaginationDataGridHtml = renderToHtml(InMemoryPaginationDataGrid);

import InMemorySortingDataGrid from './in_memory_sorting';
const inMemorySortingDataGridSource = require('./in_memory_sorting?raw');
const inMemorySortingDataGridHtml = renderToHtml(InMemorySortingDataGrid);

import {
  OuiDataGridColumn,
  OuiDataGridPaginationProps,
  OuiDataGridSorting,
  OuiDataGridInMemory,
  OuiDataGridStyle,
  OuiDataGridToolBarVisibilityOptions,
  OuiDataGridColumnVisibility,
} from '!!prop-loader!../../../../src/components/datagrid/data_grid_types';

import { OuiDataGridCellValueElementProps } from '!!prop-loader!../../../../src/components/datagrid/data_grid_cell';
import { OuiDataGridSchemaDetector } from '!!prop-loader!../../../../src/components/datagrid/data_grid_schema';

export const DataGridMemoryExample = {
  title: 'Data grid in-memory settings',
  intro: (
    <Fragment>
      <OuiCallOut title="What is the difference in the examples?">
        <p>
          These examples show the same grid built with the four available{' '}
          <OuiCode>inMemory</OuiCode> settings. While they may look the same,
          look at the source to see how they require different levels of data
          management in regards to sorting and pagination.
        </p>
      </OuiCallOut>
      <OuiSpacer />
      <OuiText>
        <p>
          The grid has levels of <strong>in-memory</strong> settings that can be
          set. It is in the consuming application&apos;s best interest to put as
          much of the data grid in memory as performance allows. Try to use the
          highest level <OuiCode language="js">{'inMemory="sorting"'}</OuiCode>{' '}
          whenever possible. The following values are available.
        </p>
        <ul>
          <li>
            <strong>undefined (default)</strong>: When not in use the grid will
            not autodetect schemas. The sorting and pagination is the
            responsibility of the consuming application.
          </li>
          <li>
            <strong>enhancements</strong>: Provides no in-memory operations. If
            set, the grid will try to autodetect schemas only based on the
            content currently available (the current page of data).
          </li>
          <li>
            <strong>pagination</strong>: Schema detection works as above and
            pagination is performed in-memory. The pagination callbacks are
            still triggered on user interactions, but the row updates are
            performed by the grid.
          </li>
          <li>
            <strong>sorting (suggested)</strong>: Schema detection and
            pagination are performed as above, and sorting is applied in-memory
            too. The onSort callback is still called and the application must
            own the column sort state, but data sorting is done by the grid
            based on the defined and/or detected schemas.
          </li>
        </ul>
        <p>
          When enabled, <strong>in-memory</strong> renders cell data off-screen
          and uses those values to detect schemas and perform sorting. This
          detaches the user experience from the raw data; the data grid never
          has access to the backing data, only what is returned by{' '}
          <OuiCode>renderCellValue</OuiCode>.
        </p>
      </OuiText>
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inMemoryDataGridSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inMemoryDataGridHtml,
        },
      ],
      title: 'When in-memory is not used',
      text: (
        <p>
          When <OuiCode>inMemory</OuiCode> is not in use the grid will not
          autodetect schemas. In the below example only the{' '}
          <OuiCode>amount</OuiCode> column has a schema because it is manually
          set. Sorting and pagination data management is the responsibility of
          the consuming application. Column sorting in particular is going to be
          imprecise because there is no backend service to call, and data grid
          instead defaults to naively applying JavaScript&apos;s default array
          sort which doesn&apos;t work well with numeric data and doesn&apos;t
          sort React elements such as the links. This is a good example of what
          happens when you <strong>don&apos;t</strong> utilize schemas for
          complex data.
        </p>
      ),
      props: {
        OuiDataGrid,
        OuiDataGridInMemory,
        OuiDataGridColumn,
        OuiDataGridColumnVisibility,
        OuiDataGridPaginationProps,
        OuiDataGridSorting,
        OuiDataGridCellValueElementProps,
        OuiDataGridSchemaDetector,
        OuiDataGridStyle,
        OuiDataGridToolBarVisibilityOptions,
      },
      components: { InMemoryDataGrid },
      demo: <InMemoryDataGrid />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inMemoryEnhancementsDataGridSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inMemoryEnhancementsDataGridHtml,
        },
      ],
      title: 'Enhancements only in-memory',
      text: (
        <p>
          With{' '}
          <OuiCode language="js">
            {"inMemory={{ level: 'enhancements' }}"}
          </OuiCode>{' '}
          the grid will now autodetect schemas based on the content it has
          available on the currently viewed page. Notice that the field list
          under Sort fields has detected the type of data each column contains.
        </p>
      ),
      props: {
        OuiDataGrid,
        OuiDataGridInMemory,
        OuiDataGridColumn,
        OuiDataGridColumnVisibility,
        OuiDataGridPaginationProps,
        OuiDataGridSorting,
        OuiDataGridCellValueElementProps,
        OuiDataGridSchemaDetector,
        OuiDataGridStyle,
        OuiDataGridToolBarVisibilityOptions,
      },
      components: { InMemoryEnhancementsDataGrid },
      demo: <InMemoryEnhancementsDataGrid />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inMemoryPaginationDataGridSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inMemoryPaginationDataGridHtml,
        },
      ],
      title: 'Pagination only in-memory',
      text: (
        <p>
          With{' '}
          <OuiCode language="js">
            {"inMemory={{ level: 'pagination' }}"}
          </OuiCode>{' '}
          the grid will now take care of managing the data cleanup for
          pagination. Like before it will autodetect schemas when possible.
        </p>
      ),
      props: {
        OuiDataGrid,
        OuiDataGridInMemory,
        OuiDataGridColumn,
        OuiDataGridColumnVisibility,
        OuiDataGridPaginationProps,
        OuiDataGridSorting,
        OuiDataGridCellValueElementProps,
        OuiDataGridSchemaDetector,
        OuiDataGridStyle,
        OuiDataGridToolBarVisibilityOptions,
      },
      components: { InMemoryPaginationDataGrid },
      demo: <InMemoryPaginationDataGrid />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inMemorySortingDataGridSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inMemorySortingDataGridHtml,
        },
      ],
      title: 'Sorting and pagination in-memory',
      text: (
        <p>
          With{' '}
          <OuiCode language="js">{"inMemory={{ level: 'sorting' }}"}</OuiCode>{' '}
          the grid will now take care of managing the data cleanup for sorting
          as well as pagination. Like before it will autodetect schemas when
          possible.
        </p>
      ),
      props: {
        OuiDataGrid,
        OuiDataGridInMemory,
        OuiDataGridColumn,
        OuiDataGridColumnVisibility,
        OuiDataGridPaginationProps,
        OuiDataGridSorting,
        OuiDataGridCellValueElementProps,
        OuiDataGridSchemaDetector,
        OuiDataGridStyle,
        OuiDataGridToolBarVisibilityOptions,
      },
      components: { InMemorySortingDataGrid },
      demo: <InMemorySortingDataGrid />,
    },
  ],
};
