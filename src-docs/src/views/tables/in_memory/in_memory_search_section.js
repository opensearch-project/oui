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

import { Table } from './in_memory_search';
import { Link } from 'react-router-dom';

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

const source = require('./in_memory_search?raw');
const html = renderToHtml(Table);

export const searchSection = {
  title: 'In-memory table with search',
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
        The example shows how to configure <strong>OuiInMemoryTable </strong>
        to display a search bar by passing the search prop. You can read more
        about the search bar&apos;s properties and its syntax{' '}
        <Link to="/forms/search-bar">
          <strong>here</strong>
        </Link>{' '}
        .
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
