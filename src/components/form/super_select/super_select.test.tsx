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
import { requiredProps } from '../../../test';

import { OuiSuperSelect } from './super_select';

jest.mock('../../portal', () => ({
  OuiPortal: ({ children }: any) => children,
}));

const options = [
  { value: '1', inputDisplay: 'Option #1' },
  { value: '2', inputDisplay: 'Option #2' },
];

describe('OuiSuperSelect', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiSuperSelect
        {...requiredProps}
        options={options}
        onChange={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    test('fullWidth is rendered', () => {
      const { container } = render(
        <OuiSuperSelect
          {...requiredProps}
          options={options}
          onChange={() => {}}
          fullWidth
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('compressed is rendered', () => {
      const { container } = render(
        <OuiSuperSelect
          {...requiredProps}
          options={options}
          onChange={() => {}}
          compressed
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('is rendered with a prepend and append', () => {
      const { container } = render(
        <OuiSuperSelect
          {...requiredProps}
          options={options}
          onChange={() => {}}
          prepend="prepend"
          append="append"
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('select component is rendered', () => {
      const { container } = render(
        <OuiSuperSelect
          options={[
            { value: '1', inputDisplay: 'Option #1' },
            { value: '2', inputDisplay: 'Option #2' },
          ]}
          onChange={() => {}}
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('options are rendered when select is open', () => {
      const { getByTestId } = render(
        <OuiSuperSelect
          options={options}
          onChange={() => {}}
          data-test-subj="superSelect"
        />
      );

      fireEvent.click(getByTestId('superSelect'));

      expect(document.body).toMatchSnapshot();
    });

    test('valueSelected is rendered', () => {
      const { container } = render(
        <OuiSuperSelect
          options={options}
          valueOfSelected="2"
          onChange={() => {}}
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('custom display is propagated to dropdown', () => {
      const { getByTestId } = render(
        <OuiSuperSelect
          options={[
            {
              value: '1',
              inputDisplay: 'Option #1',
              dropdownDisplay: 'Custom Display #1',
            },
            {
              value: '2',
              inputDisplay: 'Option #2',
              dropdownDisplay: 'Custom Display #2',
            },
          ]}
          onChange={() => {}}
          data-test-subj="superSelect"
        />
      );

      fireEvent.click(getByTestId('superSelect'));

      expect(document.body).toMatchSnapshot();
    });

    test('more props are propogated to each option', () => {
      const { getByTestId } = render(
        <OuiSuperSelect
          options={[
            { value: '1', inputDisplay: 'Option #1', disabled: true },
            {
              value: '2',
              inputDisplay: 'Option #2',
              'data-test-subj': 'option two',
            },
          ]}
          valueOfSelected="1"
          onChange={() => {}}
          data-test-subj="superSelect"
        />
      );

      fireEvent.click(getByTestId('superSelect'));

      expect(document.body).toMatchSnapshot();
    });
  });
});
