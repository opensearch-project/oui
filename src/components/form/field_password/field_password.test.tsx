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
import { render, screen, fireEvent } from '@testing-library/react';
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
    const { container } = render(
      <OuiFieldPassword
        name="elastic"
        id="1"
        placeholder="Placeholder"
        value="1"
        onChange={() => {}}
        {...requiredProps}
      />
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    test('isInvalid is rendered', () => {
      const { container } = render(<OuiFieldPassword isInvalid />);

      expect(container).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const { container } = render(<OuiFieldPassword fullWidth />);

      expect(container).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const { container } = render(<OuiFieldPassword isLoading />);

      expect(container).toMatchSnapshot();
    });

    test('prepend and append is rendered', () => {
      const { container } = render(
        <OuiFieldPassword prepend="String" append="String" />
      );

      expect(container).toMatchSnapshot();
    });

    test('compressed is rendered', () => {
      const { container } = render(<OuiFieldPassword compressed />);

      expect(container).toMatchSnapshot();
    });

    describe('type', () => {
      TYPES.forEach((type) => {
        test(`${type} is rendered`, () => {
          const { container } = render(<OuiFieldPassword type={type} />);

          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('dual', () => {
      test('dualToggleProps is rendered', () => {
        const { container } = render(
          <OuiFieldPassword type="dual" dualToggleProps={requiredProps} />
        );

        expect(container).toMatchSnapshot();
      });

      test('dual type also renders append', () => {
        const { container } = render(
          <OuiFieldPassword
            type="dual"
            append={['String', <span>Span</span>]}
          />
        );

        expect(container).toMatchSnapshot();
      });

      test('dual does not mutate the append array prop', () => {
        const props: OuiFieldPasswordProps = {
          type: 'dual',
          append: ['one', 'two'],
          dualToggleProps: {
            'data-test-subj': 'toggleButton',
          },
        };
        const { container } = render(<OuiFieldPassword {...props} />);

        const toggleButton = screen.getByTestId('toggleButton');
        expect(toggleButton).toBeInTheDocument();

        const eyeIcon = container.querySelector('[data-ouiicon-type="eye"]');
        expect(eyeIcon).toBeInTheDocument();

        fireEvent.click(toggleButton);

        const eyeClosedIcon = container.querySelector(
          '[data-ouiicon-type="eyeClosed"]'
        );
        expect(eyeClosedIcon).toBeInTheDocument();
      });
    });
  });
});
