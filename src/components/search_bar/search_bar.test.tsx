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

/* eslint-disable react/no-multi-comp */
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { requiredProps } from '../../test';
import { OuiSearchBar } from './search_bar';
import { Query } from './query';
import { keys } from '../../services';
import { SearchFilterConfig } from './search_filters';

describe('SearchBar', () => {
  test('render - no config, no query', () => {
    const props = {
      ...requiredProps,
      onChange: () => {},
    };

    const { container } = render(<OuiSearchBar {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('render - tools', () => {
    const props = {
      ...requiredProps,
      onChange: () => {},
      toolsLeft: <div>Left</div>,
      toolsRight: <div>Right</div>,
    };

    const { container } = render(<OuiSearchBar {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('render - box', () => {
    const props = {
      box: {
        placeholder: 'find something...',
        incremental: false,
        ...requiredProps,
      },
      onChange: () => {},
    };

    const { container } = render(<OuiSearchBar {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('render - provided query, filters', async () => {
    const filters: SearchFilterConfig[] = [
      {
        type: 'is',
        field: 'open',
        name: 'Open',
      },
      {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        options: () => Promise.resolve([]),
      },
    ];

    const props = {
      ...requiredProps,
      filters,
      query: 'this is a query',
      onChange: () => {},
    };

    let container: HTMLElement;
    await act(async () => {
      const result = render(<OuiSearchBar {...props} />);
      container = result.container;
    });

    expect(container!).toMatchSnapshot();
  });

  describe('controlled input', () => {
    test('calls onChange callback when the query is modified', () => {
      const onChange = jest.fn();

      render(
        <OuiSearchBar
          query="status:active"
          onChange={onChange}
          box={{ 'data-test-subj': 'searchbar' }}
        />
      );

      const input = screen.getByTestId('searchbar');

      // In React Testing Library, we need to set the value and then trigger the keyUp event
      Object.defineProperty(input, 'value', { value: 'status:inactive' });

      act(() => {
        fireEvent.keyUp(input, { key: keys.ENTER });
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      const [[{ query, queryText }]] = onChange.mock.calls;
      expect(query).toBeInstanceOf(Query);
      expect(queryText).toBe('status:inactive');
    });
  });
});
