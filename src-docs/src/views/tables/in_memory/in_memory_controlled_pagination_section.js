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

import { Table } from './in_memory_controlled_pagination';

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

const source = require('./in_memory_controlled_pagination?raw');
const html = renderToHtml(Table);

export const controlledPaginationSection = {
  title: 'In-memory table with controlled pagination',
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
        By default <OuiCode>OuiInMemoryTable</OuiCode> resets its page index
        when receiving a new <OuiCode>OuiInMemoryTable</OuiCode> array. To avoid
        this behavior the pagination object optionally takes a
        <OuiCode>pageIndex</OuiCode> value to control this yourself.
        Additionally, <OuiCode>pageSize</OuiCode> can also be controlled the
        same way. Both of these are provided to your app during the
        <OuiCode>onTableChange</OuiCode> callback.
      </p>
      <p>
        The example below updates the array of users every second, randomly
        toggling their online status. Pagination state is maintained by the app,
        preventing it from being reset by the updates.
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
