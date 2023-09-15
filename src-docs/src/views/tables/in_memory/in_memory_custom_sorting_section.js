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

import { Table } from './in_memory_custom_sorting';

import { OuiInMemoryTable } from '../../../../../src/components/basic_table/in_memory_table';
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
import {
  DefaultItemActionProps as DefaultItemAction,
  SearchProps as Search,
  SearchFilterConfigProps as SearchFilterConfig,
} from '../props/props';
import { FieldValueOptionType } from '!!prop-loader!../../../../../src/components/search_bar/filters/field_value_selection_filter';
import { FieldValueToggleGroupFilterItemType } from '!prop-loader!../../../../../src/components/search_bar/filters/field_value_toggle_group_filter.tsx';

const source = require('./in_memory_custom_sorting?raw');
const html = renderToHtml(Table);

export const customSortingSection = {
  title: 'In-memory table with custom sort values',
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
        Sometimes the value displayed in a column is not appropriate to use for
        sorting, such as pre-formatting values to be human-readable. In these
        cases it&apos;s possible to pass the <OuiCode>sortable</OuiCode> prop as
        a function instead of <OuiCode>true</OuiCode> or{' '}
        <OuiCode>false</OuiCode>. The function is used to extract or calculate
        the intended sort value for each <OuiCode>item</OuiCode>.
      </p>
    </div>
  ),
  props: {
    OuiInMemoryTable,
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
    Search,
    SearchFilterConfig,
    FieldValueOptionType,
    FieldValueToggleGroupFilterItemType,
  },
  demo: <Table />,
};
