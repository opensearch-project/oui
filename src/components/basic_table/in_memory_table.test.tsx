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

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { requiredProps } from '../../test';

import { OuiInMemoryTable, OuiInMemoryTableProps } from './in_memory_table';
import { keys, SortDirection } from '../../services';
import { SearchFilterConfig } from '../search_bar/filters';

interface BasicItem {
  id: number | string;
  name: string;
}

interface StateItem {
  active: boolean;
  name: string;
}

interface ComplexItem {
  active: boolean;
  complex: {
    name: string;
  };
}

describe('OuiInMemoryTable', () => {
  test('empty array', () => {
    const props: OuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
    };
    const { container } = render(<OuiInMemoryTable {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('with message', () => {
    const props: OuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
      message: 'where my items at?',
    };
    const { container } = render(<OuiInMemoryTable {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('with message and loading', () => {
    const props: OuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
      message: 'Loading items....',
      loading: true,
    };
    const { container } = render(<OuiInMemoryTable {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('with executeQueryOptions', () => {
    const props: OuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
      executeQueryOptions: {
        defaultFields: ['name'],
      },
    };
    const { container } = render(<OuiInMemoryTable {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('with items', () => {
    const props: OuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
    };
    const { container } = render(<OuiInMemoryTable {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('with items and expanded item', () => {
    const props: OuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      itemId: 'id',
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
      itemIdToExpandedRowMap: {
        '1': <div>expanded row content</div>,
      },
    };
    const { container } = render(<OuiInMemoryTable {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('with items and message - expecting to show the items', () => {
    const props: OuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      message: 'show me!',
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
    };
    const { container } = render(<OuiInMemoryTable {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('with pagination', () => {
    const props: OuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
      pagination: {
        pageSizeOptions: [2, 4, 6],
      },
    };
    const { container } = render(<OuiInMemoryTable {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('with pagination and default page size and index', () => {
    const props: OuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
      pagination: {
        initialPageIndex: 1,
        initialPageSize: 2,
        pageSizeOptions: [1, 2, 3],
      },
    };
    const { container } = render(<OuiInMemoryTable {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('with pagination, default page size and error', () => {
    const props: OuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [{ id: '1', name: 'name1' }],
      error: 'ouch!',
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
      pagination: {
        initialPageSize: 4,
        pageSizeOptions: [2, 4, 6],
      },
    };
    const { container } = render(<OuiInMemoryTable {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('with pagination, hiding the per page options', () => {
    const props: OuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
      pagination: {
        hidePerPageOptions: true,
      },
    };
    const { container } = render(<OuiInMemoryTable {...props} />);

    expect(container).toMatchSnapshot();
  });

  describe('sorting', () => {
    test('with field sorting (off by default)', () => {
      const props: OuiInMemoryTableProps<BasicItem> = {
        ...requiredProps,
        items: [
          { id: '3', name: 'name3' },
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
        ],
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
            sortable: true,
          },
        ],
        sorting: true,
      };
      const { container } = render(<OuiInMemoryTable {...props} />);

      const cellTexts = Array.from(
        container.querySelectorAll('tbody .ouiTableCellContent__text')
      ).map((cell) => cell.textContent);

      expect(cellTexts).toEqual(['name3', 'name1', 'name2']);
    });

    test('with field sorting (on by default)', () => {
      const props: OuiInMemoryTableProps<BasicItem> = {
        ...requiredProps,
        items: [
          { id: '3', name: 'name3' },
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
        ],
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
            sortable: true,
          },
        ],
        sorting: {
          sort: {
            field: 'name',
            direction: SortDirection.ASC,
          },
        },
      };
      const { container } = render(<OuiInMemoryTable {...props} />);

      const cellTexts = Array.from(
        container.querySelectorAll('tbody .ouiTableCellContent__text')
      ).map((cell) => cell.textContent);

      expect(cellTexts).toEqual(['name1', 'name2', 'name3']);
    });

    test('with name sorting', () => {
      const props: OuiInMemoryTableProps<BasicItem> = {
        ...requiredProps,
        items: [
          { id: '3', name: 'name3' },
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
        ],
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
            sortable: true,
          },
        ],
        sorting: {
          sort: {
            field: 'Name',
            direction: SortDirection.DESC,
          },
        },
      };
      const { container } = render(<OuiInMemoryTable {...props} />);

      const cellTexts = Array.from(
        container.querySelectorAll('tbody .ouiTableCellContent__text')
      ).map((cell) => cell.textContent);

      expect(cellTexts).toEqual(['name3', 'name2', 'name1']);
    });

    test('verify field sorting precedes name sorting', () => {
      const props: OuiInMemoryTableProps<BasicItem> = {
        ...requiredProps,
        items: [
          { id: '1', name: 'name3' },
          { id: '3', name: 'name1' },
          { id: '2', name: 'name2' },
        ],
        columns: [
          {
            field: 'name',
            name: 'Column 1',
            description: 'description',
            sortable: true,
          },
          {
            field: 'id',
            name: 'name',
            description: 'description',
            sortable: true,
          },
        ],
        sorting: {
          sort: {
            field: 'name',
            direction: SortDirection.DESC,
          },
        },
      };
      const { container } = render(<OuiInMemoryTable {...props} />);

      // name TDs should be sorted desc, id TDs should be asc,
      const cellTexts = Array.from(
        container.querySelectorAll('tbody .ouiTableCellContent__text')
      ).map((cell) => cell.textContent);

      expect(cellTexts).toEqual(['name3', '1', 'name2', '2', 'name1', '3']);
    });

    test('verify an invalid sort field does not blow everything up', () => {
      const props: OuiInMemoryTableProps<BasicItem> = {
        ...requiredProps,
        items: [
          { id: '3', name: 'name3' },
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
        ],
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
            sortable: true,
          },
        ],
        sorting: {
          sort: {
            field: 'something_nonexistant',
            direction: SortDirection.ASC,
          },
        },
      };
      expect(() => {
        render(<OuiInMemoryTable {...props} />);
      }).not.toThrow();
    });
  });

  test('with initial sorting', () => {
    const items = [
      { id: '1', name: 'name1' },
      { id: '2', name: 'name2' },
      { id: '3', name: 'name3' },
    ];

    // copy the array to ensure the `items` prop doesn't mutate
    const itemsProp = items.slice(0);

    const props: OuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: itemsProp,
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
          sortable: true,
        },
      ],
      sorting: {
        sort: {
          field: 'name',
          direction: SortDirection.DESC,
        },
      },
    };
    const { container } = render(<OuiInMemoryTable {...props} />);

    expect(container).toMatchSnapshot();
    expect(itemsProp).toEqual(items);
  });

  test('with initial selection', () => {
    const props: OuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      itemId: 'id',
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
      selection: {
        onSelectionChange: () => undefined,
        initialSelected: [{ id: '1', name: 'name1' }],
      },
    };
    const { container } = render(<OuiInMemoryTable {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('with pagination and selection', () => {
    const props: OuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      itemId: 'id',
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
        },
      ],
      pagination: true,
      selection: {
        onSelectionChange: () => undefined,
      },
    };
    const { container } = render(<OuiInMemoryTable {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('with pagination, selection and sorting', () => {
    const props: OuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      itemId: 'id',
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
          sortable: true,
        },
      ],
      pagination: true,
      sorting: true,
      selection: {
        onSelectionChange: () => undefined,
      },
    };
    const { container } = render(<OuiInMemoryTable {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('with pagination, selection, sorting and column renderer', () => {
    const props: OuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      itemId: 'id',
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
          sortable: true,
          render: (name: any) => name.toUpperCase(),
        },
      ],
      pagination: {
        pageSizeOptions: [2, 4, 6],
      },
      sorting: true,
      selection: {
        onSelectionChange: () => undefined,
      },
    };
    const { container } = render(<OuiInMemoryTable {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('with pagination, selection, sorting and a single record action', () => {
    const props: OuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      itemId: 'id',
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
          sortable: true,
        },
        {
          name: 'Actions',
          actions: [
            {
              name: 'Edit',
              description: 'edit',
              onClick: () => undefined,
            },
          ],
        },
      ],
      pagination: true,
      sorting: true,
      selection: {
        onSelectionChange: () => undefined,
      },
    };
    const { container } = render(<OuiInMemoryTable {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('with pagination, selection, sorting  and simple search', () => {
    const props: OuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      itemId: 'id',
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
          sortable: true,
        },
        {
          name: 'Actions',
          actions: [
            {
              name: 'Edit',
              description: 'edit',
              onClick: () => undefined,
            },
          ],
        },
      ],
      pagination: true,
      sorting: true,
      search: true,
      selection: {
        onSelectionChange: () => undefined,
      },
    };
    const { container } = render(<OuiInMemoryTable {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('with search and component between search and table', () => {
    const props: OuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      itemId: 'id',
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
          sortable: true,
        },
        {
          name: 'Actions',
          actions: [
            {
              name: 'Edit',
              description: 'edit',
              onClick: () => undefined,
            },
          ],
        },
      ],
      search: true,
      childrenBetween: <div>Children Between</div>,
    };
    const { container } = render(<OuiInMemoryTable {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('with pagination, selection, sorting and configured search', () => {
    const props: OuiInMemoryTableProps<BasicItem> = {
      ...requiredProps,
      items: [
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
      itemId: 'id',
      columns: [
        {
          field: 'name',
          name: 'Name',
          description: 'description',
          sortable: true,
        },
        {
          name: 'Actions',
          actions: [
            {
              name: 'Edit',
              description: 'edit',
              onClick: () => undefined,
            },
          ],
        },
      ],
      pagination: true,
      sorting: true,
      search: {
        onChange: () => {},
        defaultQuery: 'name:name1',
        box: {
          incremental: true,
        },
        filters: [
          {
            type: 'field_value_toggle',
            field: 'name',
            value: 'name1',
            name: 'Name1',
            negatedName: 'Not Name1',
          },
        ] as SearchFilterConfig[],
      },
      selection: {
        onSelectionChange: () => undefined,
      },
    };
    const { container } = render(<OuiInMemoryTable {...props} />);

    expect(container).toMatchSnapshot();
  });

  describe('search interaction & functionality', () => {
    it('updates the results as based on the entered query', async () => {
      const props: OuiInMemoryTableProps<StateItem> = {
        items: [
          {
            active: true,
            name: 'Kansas',
          },
          {
            active: true,
            name: 'North Dakota',
          },
          {
            active: false,
            name: 'Florida',
          },
        ],
        columns: [
          {
            field: 'active',
            name: 'Is Active',
          },
          {
            field: 'name',
            name: 'Name',
          },
        ],
        search: {
          onChange: () => true,
        },
        className: 'testTable',
      };

      const { container } = render(<OuiInMemoryTable {...props} />);

      // should render with all three results visible
      expect(container.querySelectorAll('.testTable .ouiTableRow').length).toBe(
        3
      );

      const searchField = container.querySelector(
        'input[type="search"]'
      ) as HTMLInputElement;

      fireEvent.keyUp(searchField, {
        target: {
          value: 'is:active',
        },
        key: keys.ENTER,
      });

      // should render with the two active results
      expect(container.querySelectorAll('.testTable .ouiTableRow').length).toBe(
        2
      );

      fireEvent.keyUp(searchField, {
        target: {
          value: 'active:false',
        },
        key: keys.ENTER,
      });

      // should render with the one inactive result
      expect(container.querySelectorAll('.testTable .ouiTableRow').length).toBe(
        1
      );
    });

    it('passes down the executeQueryOptions properly', () => {
      const props: OuiInMemoryTableProps<ComplexItem> = {
        items: [
          {
            active: true,
            complex: {
              name: 'Kansas',
            },
          },
          {
            active: true,
            complex: {
              name: 'North Dakota',
            },
          },
          {
            active: false,
            complex: {
              name: 'Florida',
            },
          },
        ],
        columns: [
          {
            field: 'active',
            name: 'Is Active',
          },
          {
            field: 'complex.name',
            name: 'Name',
          },
        ],
        search: {
          onChange: () => {},
          defaultQuery: 'No',
        },
        className: 'testTable',
        message: <span className="customMessage">No items found!</span>,
      };

      const { container: noDefaultFieldsContainer } = render(
        <OuiInMemoryTable {...props} />
      );
      // should render with the no items found text
      expect(
        noDefaultFieldsContainer.querySelectorAll('.customMessage').length
      ).toBe(1);

      // With defaultFields and a search query, we should only see one
      const props2: OuiInMemoryTableProps<ComplexItem> = {
        items: [
          {
            active: true,
            complex: {
              name: 'Kansas',
            },
          },
          {
            active: true,
            complex: {
              name: 'North Dakota',
            },
          },
          {
            active: false,
            complex: {
              name: 'Florida',
            },
          },
        ],
        columns: [
          {
            field: 'active',
            name: 'Is Active',
          },
          {
            field: 'complex.name',
            name: 'Name',
          },
        ],
        search: {
          onChange: () => {},
          defaultQuery: 'No',
        },
        className: 'testTable',
        message: <span className="customMessage">No items found!</span>,
      };

      const { container: defaultFieldContainer } = render(
        <OuiInMemoryTable {...props2} />
      );
      expect(
        defaultFieldContainer.querySelectorAll('.testTable .ouiTableRow').length
      ).toBe(1);
    });
  });

  describe('custom column sorting', () => {
    it('calls the sortable function and uses its return value for sorting', () => {
      const props: OuiInMemoryTableProps<BasicItem> = {
        ...requiredProps,
        items: [
          { id: 7, name: 'Alfred' },
          { id: 3, name: 'Betty' },
          { id: 5, name: 'Charlie' },
        ],
        itemId: 'id',
        columns: [
          {
            field: 'name',
            name: 'Name',
            sortable: ({ id }: any) => id,
          },
        ],
        sorting: {
          sort: {
            field: 'name',
            direction: SortDirection.ASC,
          },
        },
      };
      const { container } = render(<OuiInMemoryTable {...props} />);

      // Check that the items are sorted by id (3, 5, 7) rather than by name
      const cellTexts = Array.from(
        container.querySelectorAll('tbody .ouiTableCellContent__text')
      ).map((cell) => cell.textContent);

      expect(cellTexts).toEqual(['Betty', 'Charlie', 'Alfred']);
    });
  });

  describe('behavior', () => {
    test('pagination', async () => {
      const props: OuiInMemoryTableProps<BasicItem> = {
        ...requiredProps,
        items: [
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
          { id: '3', name: 'name3' },
          { id: '4', name: 'name4' },
        ],
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
          },
        ],
        pagination: {
          pageSizeOptions: [2, 4, 6],
        },
      };
      const { container, rerender } = render(<OuiInMemoryTable {...props} />);

      const paginationButton = container.querySelector(
        '[data-test-subj="pagination-button-1"]'
      ) as HTMLButtonElement;
      fireEvent.click(paginationButton);

      // forces OuiInMemoryTable's getDerivedStateFromProps to re-execute
      // this is specifically testing regression against https://github.com/elastic/eui/issues/1007
      rerender(<OuiInMemoryTable {...props} />);

      expect(container).toMatchSnapshot();
    });

    test('pagination with actions column and sorting set to true', async () => {
      const props: OuiInMemoryTableProps<BasicItem> = {
        ...requiredProps,
        items: [
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
          { id: '3', name: 'name3' },
          { id: '4', name: 'name4' },
        ],
        columns: [
          {
            name: 'Actions',
            actions: [],
          },
        ],
        sorting: true,
        pagination: {
          pageSizeOptions: [2, 4, 6],
        },
      };
      const { container } = render(<OuiInMemoryTable {...props} />);

      const paginationButton = container.querySelector(
        '[data-test-subj="pagination-button-1"]'
      ) as HTMLButtonElement;
      fireEvent.click(paginationButton);
    });

    test('onTableChange callback', () => {
      const props: OuiInMemoryTableProps<BasicItem> = {
        ...requiredProps,
        items: [
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
          { id: '3', name: 'name3' },
          { id: '4', name: 'name4' },
        ],
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
            sortable: true,
          },
        ],
        sorting: true,
        pagination: {
          pageSizeOptions: [2, 4, 6],
        },
        onTableChange: jest.fn(),
      };

      const { container } = render(<OuiInMemoryTable {...props} />);

      expect(props.onTableChange).toHaveBeenCalledTimes(0);

      const paginationButton = container.querySelector(
        '[data-test-subj="pagination-button-1"]'
      ) as HTMLButtonElement;
      fireEvent.click(paginationButton);

      expect(props.onTableChange).toHaveBeenCalledTimes(1);
      expect(props.onTableChange).toHaveBeenCalledWith({
        sort: {},
        page: {
          index: 1,
          size: 2,
        },
      });

      (props.onTableChange as jest.Mock).mockClear();

      const sortButton = container.querySelector(
        '[data-test-subj*="tableHeaderCell_name_0"] [data-test-subj="tableHeaderSortButton"]'
      ) as HTMLButtonElement;
      fireEvent.click(sortButton);

      expect(props.onTableChange).toHaveBeenCalledTimes(1);
      expect(props.onTableChange).toHaveBeenCalledWith({
        sort: {
          direction: SortDirection.ASC,
          field: 'name',
        },
        page: {
          index: 0,
          size: 2,
        },
      });
    });
  });

  describe('controlled pagination', () => {
    it('respects pageIndex', () => {
      const pagination = {
        initialPageIndex: 2,
        pageIndex: 1,
        pageSizeOptions: [2],
      };
      const items = [
        { index: 0 },
        { index: 1 },
        { index: 2 },
        { index: 3 },
        { index: 4 },
        { index: 5 },
      ];
      const columns = [
        {
          field: 'index',
          name: 'Index',
        },
      ];
      const onTableChange = jest.fn();
      const { container, rerender } = render(
        <OuiInMemoryTable
          items={items}
          columns={columns}
          pagination={pagination}
          onTableChange={onTableChange}
        />
      );

      // ensure table is on 2nd page (pageIndex=1)
      expect(
        container.querySelectorAll(
          'button[data-test-subj="pagination-button-1"][disabled]'
        ).length
      ).toBe(1);
      const tableCells = container.querySelectorAll('td');
      expect(tableCells[0].textContent).toBe('Index2');
      expect(tableCells[1].textContent).toBe('Index3');

      // click the first pagination button
      const firstPageButton = container.querySelector(
        '[data-test-subj="pagination-button-0"]'
      ) as HTMLButtonElement;
      fireEvent.click(firstPageButton);

      expect(onTableChange).toHaveBeenCalledTimes(1);
      expect(onTableChange).toHaveBeenCalledWith({
        sort: {},
        page: {
          index: 0,
          size: 2,
        },
      });

      // ensure table is still on the 2nd page (pageIndex=1)
      expect(
        container.querySelectorAll(
          'button[data-test-subj="pagination-button-1"][disabled]'
        ).length
      ).toBe(1);
      const tableCellsAfterClick = container.querySelectorAll('td');
      expect(tableCellsAfterClick[0].textContent).toBe('Index2');
      expect(tableCellsAfterClick[1].textContent).toBe('Index3');

      // re-render with an updated `pageIndex` value
      pagination.pageIndex = 2;
      rerender(
        <OuiInMemoryTable
          items={items}
          columns={columns}
          pagination={pagination}
          onTableChange={onTableChange}
        />
      );

      // ensure table is on 3rd page (pageIndex=2)
      expect(
        container.querySelectorAll(
          'button[data-test-subj="pagination-button-2"][disabled]'
        ).length
      ).toBe(1);
      const tableCellsAfterRerender = container.querySelectorAll('td');
      expect(tableCellsAfterRerender[0].textContent).toBe('Index4');
      expect(tableCellsAfterRerender[1].textContent).toBe('Index5');
    });

    it('respects pageSize', () => {
      const pagination = {
        pageSize: 2,
        initialPageSize: 4,
        pageSizeOptions: [1, 2, 4],
      };
      const items = [
        { index: 0 },
        { index: 1 },
        { index: 2 },
        { index: 3 },
        { index: 4 },
        { index: 5 },
      ];
      const columns = [
        {
          field: 'index',
          name: 'Index',
        },
      ];
      const onTableChange = jest.fn();
      const { container, rerender } = render(
        <OuiInMemoryTable
          items={items}
          columns={columns}
          pagination={pagination}
          onTableChange={onTableChange}
        />
      );

      // check that the first 2 items rendered
      expect(container.querySelectorAll('td').length).toBe(2);
      const initialCells = container.querySelectorAll('td');
      expect(initialCells[0].textContent).toBe('Index0');
      expect(initialCells[1].textContent).toBe('Index1');

      // change the page size
      const paginationButton = container.querySelector(
        'button[data-test-subj="tablePaginationPopoverButton"]'
      ) as HTMLButtonElement;
      fireEvent.click(paginationButton);

      const pageSizeButton = document.body.querySelector(
        'button[data-test-subj="tablePagination-4-rows"]'
      ) as HTMLButtonElement;
      fireEvent.click(pageSizeButton);

      // check callback
      expect(onTableChange).toHaveBeenCalledTimes(1);
      expect(onTableChange).toHaveBeenCalledWith({
        sort: {},
        page: {
          index: 0,
          size: 4,
        },
      });

      // verify still only rendering the first 2 rows
      expect(container.querySelectorAll('td').length).toBe(2);
      const cellsAfterSizeChange = container.querySelectorAll('td');
      expect(cellsAfterSizeChange[0].textContent).toBe('Index0');
      expect(cellsAfterSizeChange[1].textContent).toBe('Index1');

      // update the controlled page size
      pagination.pageSize = 4;
      rerender(
        <OuiInMemoryTable
          items={items}
          columns={columns}
          pagination={pagination}
          onTableChange={onTableChange}
        />
      );

      // verify it now renders 4 rows
      expect(container.querySelectorAll('td').length).toBe(4);
      const finalCells = container.querySelectorAll('td');
      expect(finalCells[0].textContent).toBe('Index0');
      expect(finalCells[1].textContent).toBe('Index1');
      expect(finalCells[2].textContent).toBe('Index2');
      expect(finalCells[3].textContent).toBe('Index3');
    });
  });
});
