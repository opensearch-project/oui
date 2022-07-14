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

import { OuiFieldNumber } from './field_number';

jest.mock('../form_control_layout', () => {
  const formControlLayout = jest.requireActual('../form_control_layout');
  return {
    ...formControlLayout,
    OuiFormControlLayout: 'oui-form-control-layout',
  };
});
jest.mock('../validatable_control', () => ({
  OuiValidatableControl: 'oui-validatable-control',
}));

describe('OuiFieldNumber', () => {
  test('is rendered', () => {
    const component = render(
      <OuiFieldNumber
        id="1"
        name="elastic"
        min={1}
        max={8}
        step={1}
        value={1}
        icon="alert"
        onChange={() => {}}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('isInvalid is rendered', () => {
      const component = render(<OuiFieldNumber isInvalid />);

      expect(component).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const component = render(<OuiFieldNumber fullWidth />);

      expect(component).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const component = render(<OuiFieldNumber isLoading />);

      expect(component).toMatchSnapshot();
    });

    test('readOnly is rendered', () => {
      const component = render(<OuiFieldNumber readOnly />);

      expect(component).toMatchSnapshot();
    });

    test('controlOnly is rendered', () => {
      const component = render(<OuiFieldNumber controlOnly />);

      expect(component).toMatchSnapshot();
    });

    describe('value', () => {
      test('value is number', () => {
        const component = render(
          <OuiFieldNumber value={0} onChange={() => {}} />
        );
        expect(component).toMatchSnapshot();
      });

      test('no initial value', () => {
        const component = render(
          <OuiFieldNumber value={''} onChange={() => {}} />
        );
        expect(component).toMatchSnapshot();
      });
    });
  });
});
