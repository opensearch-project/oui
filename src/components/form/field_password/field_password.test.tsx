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
import { render, mount } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { OuiFieldPassword, OuiFieldPasswordProps } from './field_password';

jest.mock('../validatable_control', () => ({
  OuiValidatableControl: 'oui-validatable-control',
}));

const TYPES: Array<OuiFieldPasswordProps['type']> = [
  'password',
  'text',
  'dual',
];

describe('OuiFieldPassword', () => {
  test('is rendered', () => {
    const component = render(
      <OuiFieldPassword
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
      const component = render(<OuiFieldPassword isInvalid />);

      expect(component).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const component = render(<OuiFieldPassword fullWidth />);

      expect(component).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const component = render(<OuiFieldPassword isLoading />);

      expect(component).toMatchSnapshot();
    });

    test('prepend and append is rendered', () => {
      const component = render(
        <OuiFieldPassword prepend="String" append="String" />
      );

      expect(component).toMatchSnapshot();
    });

    test('compressed is rendered', () => {
      const component = render(<OuiFieldPassword compressed />);

      expect(component).toMatchSnapshot();
    });

    describe('type', () => {
      TYPES.forEach((type) => {
        test(`${type} is rendered`, () => {
          const component = render(<OuiFieldPassword type={type} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('dual', () => {
      test('dualToggleProps is rendered', () => {
        const component = render(
          <OuiFieldPassword type="dual" dualToggleProps={requiredProps} />
        );

        expect(component).toMatchSnapshot();
      });

      test('dual type also renders append', () => {
        const component = render(
          <OuiFieldPassword
            type="dual"
            append={['String', <span>Span</span>]}
          />
        );

        expect(component).toMatchSnapshot();
      });

      test('dual does not mutate the append array prop', () => {
        const props: OuiFieldPasswordProps = {
          type: 'dual',
          append: ['one', 'two'],
          dualToggleProps: {
            'data-test-subj': 'toggleButton',
          },
        };
        const component = mount(<OuiFieldPassword {...props} />);

        expect(
          component.find('button[data-test-subj="toggleButton"]').length
        ).toBe(1);
        expect(
          component
            .find('button[data-test-subj="toggleButton"] OuiIcon')
            .props().type
        ).toBe('eye');

        component
          .find('button[data-test-subj="toggleButton"]')
          .simulate('click');

        expect(
          component.find('button[data-test-subj="toggleButton"]').length
        ).toBe(1);
        expect(
          component
            .find('button[data-test-subj="toggleButton"] OuiIcon')
            .props().type
        ).toBe('eyeClosed');
      });
    });
  });
});
