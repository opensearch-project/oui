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

import React, { FunctionComponent } from 'react';
import { DefaultItemAction } from '../../../../../src/components/basic_table/action_types';
import { Search } from '../../../../../src/components/basic_table/in_memory_table';
import { SearchFilterConfig } from '../../../../../src/components/search_bar/filters';

// Simulating the `item` generic
type T = {};

export const DefaultItemActionProps: FunctionComponent<DefaultItemAction<
  T
>> = () => <div />;

export const SearchProps: FunctionComponent<Search> = () => <div />;

export const SearchFilterConfigProps: FunctionComponent<SearchFilterConfig> = () => (
  <div />
);
