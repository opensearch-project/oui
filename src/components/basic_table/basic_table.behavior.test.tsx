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
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { OuiBasicTable, OuiBasicTableProps } from './basic_table';

describe('OuiBasicTable', () => {
  describe('behavior', () => {
    describe('selected items', () => {
      let props: OuiBasicTableProps<{ id: string; name: string }>;

      beforeEach(() => {
        props = {
          items: [
            { id: '1', name: 'name1' },
            { id: '2', name: 'name2' },
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
            onSelectionChange: () => {},
          },
          onChange: () => {},
        };
      });

      test('check the select all checkbox when all are selected', async () => {
        render(<OuiBasicTable {...props} />);

        const user = userEvent.setup();

        await act(async () => {
          await user.click(screen.getByTestId('checkboxSelectRow-1'));
        });

        await act(async () => {
          await user.click(screen.getByTestId('checkboxSelectRow-2'));
        });

        expect(screen.getByTestId('checkboxSelectAll')).toBeChecked();
      });

      test('uncheck the select all checkbox when some are selected', async () => {
        render(<OuiBasicTable {...props} />);

        const user = userEvent.setup();

        await act(async () => {
          await user.click(screen.getByTestId('checkboxSelectRow-1'));
        });

        expect(screen.getByTestId('checkboxSelectAll')).not.toBeChecked();
      });

      test('are all selected when the select all checkbox is checked', async () => {
        render(<OuiBasicTable {...props} />);

        const user = userEvent.setup();

        await act(async () => {
          await user.click(screen.getByTestId('checkboxSelectAll'));
        });

        expect(screen.getByTestId('checkboxSelectRow-1')).toBeChecked();
        expect(screen.getByTestId('checkboxSelectRow-2')).toBeChecked();
      });

      test('select all checkbox becomes unchecked when selected items are deleted', async () => {
        const { rerender } = render(<OuiBasicTable {...props} />);

        const user = userEvent.setup();

        await act(async () => {
          await user.click(screen.getByTestId('checkboxSelectAll'));
        });

        const updatedProps = {
          ...props,
          items: [],
        };

        rerender(<OuiBasicTable {...updatedProps} />);

        expect(screen.getByTestId('checkboxSelectAll')).not.toBeChecked();
      });
    });
  });
});
