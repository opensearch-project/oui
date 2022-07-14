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
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { OuiTableHeaderCellCheckbox } from './table_header_cell_checkbox';
import { WARNING_MESSAGE } from './utils';

describe('OuiTableHeaderCellCheckbox', () => {
  const _consoleWarn = console.warn;
  beforeAll(() => {
    console.warn = (...args: [any?, ...any[]]) => {
      // Suppress an expected warning
      if (args.length === 1 && args[0] === WARNING_MESSAGE) return;
      _consoleWarn.apply(console, args);
    };
  });
  afterAll(() => {
    console.warn = _consoleWarn;
  });

  test('is rendered', () => {
    const component = render(<OuiTableHeaderCellCheckbox {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('width and style', () => {
    test('accepts style attribute', () => {
      const component = (
        <OuiTableHeaderCellCheckbox style={{ width: '20%' }}>
          Test
        </OuiTableHeaderCellCheckbox>
      );

      expect(render(component)).toMatchSnapshot();
    });

    test('accepts width attribute', () => {
      const component = (
        <OuiTableHeaderCellCheckbox width="10%">
          Test
        </OuiTableHeaderCellCheckbox>
      );

      expect(render(component)).toMatchSnapshot();
    });

    test('accepts width attribute as number', () => {
      const component = (
        <OuiTableHeaderCellCheckbox width={100}>
          Test
        </OuiTableHeaderCellCheckbox>
      );

      expect(render(component)).toMatchSnapshot();
    });

    test('resolves style and width attribute', () => {
      const component = (
        <OuiTableHeaderCellCheckbox width="10%" style={{ width: '20%' }}>
          Test
        </OuiTableHeaderCellCheckbox>
      );

      expect(render(component)).toMatchSnapshot();
    });
  });
});
