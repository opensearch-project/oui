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

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { Component, ReactElement } from 'react';
import { isString } from '../../services/predicate';
import { OuiFlexGroup, OuiFlexItem } from '../flex';
import { OuiSearchBox, SchemaType } from './search_box';
import { OuiSearchFilters, SearchFilterConfig } from './search_filters';
import { Query } from './query/query';
import { CommonProps } from '../common';
import { OuiFieldSearchProps } from '../form/field_search';

export type QueryType = Query | string;

type Tools = ReactElement | ReactElement[];

interface ArgsWithQuery {
  query: Query;
  queryText: string;
  error: null;
}

interface ArgsWithError {
  query: null;
  queryText: string;
  error: Error;
}

export interface OuiSearchBarProps extends CommonProps {
  onChange?: (args: ArgsWithQuery | ArgsWithError) => void | boolean;

  /**
   The initial query the bar will hold when first mounted
   */
  defaultQuery?: QueryType;

  /**
   If you wish to use the search bar as a controlled component, continuously pass the query via this prop.
   */
  query?: QueryType;

  /**
   Configures the search box. Set `placeholder` to change the placeholder text in the box and `incremental` to support incremental (as you type) search.
   */
  box?: OuiFieldSearchProps & {
    // Boolean values are not meaningful to this OuiSearchBox, but are allowed so that other
    // components can use e.g. a true value to mean "auto-derive a schema". See OuiInMemoryTable.
    // Admittedly, this is a bit of a hack.
    schema?: SchemaType | boolean;
  };

  /**
   An array of search filters. See #SearchFilterConfig.
   */
  filters?: SearchFilterConfig[];

  /**
   * Tools which go to the left of the search bar.
   */
  toolsLeft?: Tools;

  /**
   * Tools which go to the right of the search bar.
   */
  toolsRight?: Tools;

  /**
   * Date formatter to use when parsing date values
   */
  dateFormat?: object;
}

const parseQuery = (
  query: QueryType | undefined,
  props: OuiSearchBarProps
): Query => {
  let schema: SchemaType | undefined = undefined;
  if (props.box && props.box.schema && typeof props.box.schema === 'object') {
    schema = props.box.schema;
  }
  const dateFormat = props.dateFormat;
  const parseOptions = { schema, dateFormat };
  if (!query) {
    return Query.parse('', parseOptions);
  }
  return isString(query) ? Query.parse(query, parseOptions) : query;
};

interface State {
  query: Query;
  queryText: string;
  error: null | Error;
}

// `state.query` is never null, but can be passed as `null` to `notifyControllingParent`
// when `error` is not null.
type StateWithOptionalQuery = Omit<State, 'query'> & { query: Query | null };

export class OuiSearchBar extends Component<OuiSearchBarProps, State> {
  static Query = Query;

  constructor(props: OuiSearchBarProps) {
    super(props);
    const query = parseQuery(props.defaultQuery || props.query, props);
    this.state = {
      query,
      queryText: query.text,
      error: null,
    };
  }

  static getDerivedStateFromProps(
    nextProps: OuiSearchBarProps,
    prevState: State
  ): State | null {
    if (
      (nextProps.query || nextProps.query === '') &&
      (!prevState.query ||
        (typeof nextProps.query !== 'string' &&
          nextProps.query.text !== prevState.query.text) ||
        (typeof nextProps.query === 'string' &&
          nextProps.query !== prevState.query.text))
    ) {
      const query = parseQuery(nextProps.query, nextProps);
      return {
        query,
        queryText: query.text,
        error: null,
      };
    }
    return null;
  }

  notifyControllingParent(newState: StateWithOptionalQuery) {
    const { onChange } = this.props;
    if (!onChange) {
      return;
    }
    const oldState = this.state;
    const { query, queryText, error } = newState;

    const isQueryDifferent = oldState.queryText !== queryText;

    const oldError = oldState.error ? oldState.error.message : null;
    const newError = error ? error.message : null;
    const isErrorDifferent = oldError !== newError;

    if (isQueryDifferent || isErrorDifferent) {
      if (error == null) {
        onChange({ query: query!, queryText, error });
      } else {
        onChange({ query: null, queryText, error });
      }
    }
  }

  onSearch = (queryText: string) => {
    try {
      const query = parseQuery(queryText, this.props);
      this.notifyControllingParent({ query, queryText, error: null });
      this.setState({ query, queryText, error: null });
    } catch (e) {
      const error: Error = { name: e.name, message: e.message };
      this.notifyControllingParent({ query: null, queryText, error });
      this.setState({ queryText, error });
    }
  };

  onFiltersChange = (query: Query) => {
    this.notifyControllingParent({ query, queryText: query.text, error: null });
    this.setState({
      query,
      queryText: query.text,
      error: null,
    });
  };

  renderTools(tools?: Tools) {
    if (!tools) {
      return undefined;
    }

    if (Array.isArray(tools)) {
      return tools.map((tool) => (
        <OuiFlexItem grow={false} key={tool.key == null ? undefined : tool.key}>
          {tool}
        </OuiFlexItem>
      ));
    }

    return <OuiFlexItem grow={false}>{tools}</OuiFlexItem>;
  }

  render() {
    const { query, queryText, error } = this.state;
    const {
      box: { schema, ...box } = { schema: '' }, // strip `schema` out to prevent passing it to OuiSearchBox
      filters,
      toolsLeft,
      toolsRight,
    } = this.props;

    const toolsLeftEl = this.renderTools(toolsLeft);

    const filtersBar = !filters ? undefined : (
      <OuiFlexItem className="ouiSearchBar__filtersHolder" grow={false}>
        <OuiSearchFilters
          filters={filters}
          query={query}
          onChange={this.onFiltersChange}
        />
      </OuiFlexItem>
    );

    const toolsRightEl = this.renderTools(toolsRight);

    return (
      <OuiFlexGroup gutterSize="m" alignItems="center" wrap>
        {toolsLeftEl}
        <OuiFlexItem className="ouiSearchBar__searchHolder" grow={true}>
          <OuiSearchBox
            {...box}
            query={queryText}
            onSearch={this.onSearch}
            isInvalid={error != null}
            title={error ? error.message : undefined}
          />
        </OuiFlexItem>
        {filtersBar}
        {toolsRightEl}
      </OuiFlexGroup>
    );
  }
}
