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
import { requiredProps } from '../../../test/required_props';

import { OuiFieldSearch } from './field_search';

jest.mock('../form_control_layout', () => ({
  OuiFormControlLayout: 'oui-form-control-layout',
}));
jest.mock('../validatable_control', () => ({
  OuiValidatableControl: 'oui-validatable-control',
}));

describe('OuiFieldSearch', () => {
  test('is rendered', () => {
    const component = render(
      <OuiFieldSearch
        name="elastic"
        id="1"
        placeholder="Placeholder"
        value="1"
        onChange={() => {}}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('isInvalid is rendered', () => {
      const component = render(<OuiFieldSearch isInvalid />);

      expect(component).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const component = render(<OuiFieldSearch fullWidth />);

      expect(component).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const component = render(<OuiFieldSearch isLoading />);

      expect(component).toMatchSnapshot();
    });

    describe('isClearable', () => {
      test('is accepted', () => {
        const component = render(<OuiFieldSearch isClearable />);

        expect(component).toMatchSnapshot();
      });

      test('is rendered when a value exists', () => {
        const component = render(
          <OuiFieldSearch isClearable defaultValue="Hello" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    test('prepend is rendered', () => {
      const component = render(<OuiFieldSearch prepend="Prepend" />);

      expect(component).toMatchSnapshot();
    });

    test('append is rendered', () => {
      const component = render(<OuiFieldSearch prepend="Append" />);

      expect(component).toMatchSnapshot();
    });
  });
});
