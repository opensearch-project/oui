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
import { mount } from 'enzyme';
import { requiredProps } from '../../../test';

import { OuiFormRow } from '../form_row';
import { OuiDescribedFormGroup } from './described_form_group';

describe('OuiDescribedFormGroup', () => {
  const props = {
    title: <h3>Title</h3>,
    description: 'Test description',
  };

  test('is rendered', () => {
    const component = mount(
      <OuiDescribedFormGroup {...requiredProps} {...props}>
        <OuiFormRow>
          <input />
        </OuiFormRow>
      </OuiDescribedFormGroup>
    );

    expect(component).toMatchSnapshot();
  });

  test('ties together parts for accessibility', () => {
    const formRowProps = {
      label: 'Label',
      helpText: 'Help text',
      isInvalid: true,
      error: ['Error one', 'Error two'],
    };

    const tree = mount(
      <OuiDescribedFormGroup {...requiredProps} {...props}>
        <OuiFormRow {...formRowProps}>
          <input />
        </OuiFormRow>
      </OuiDescribedFormGroup>
    );

    expect(tree).toMatchSnapshot();
  });

  describe('props', () => {
    test('fullWidth is rendered', () => {
      const describedFormGroupProps = {
        fullWidth: true,
      };

      const component = mount(
        <OuiDescribedFormGroup
          {...requiredProps}
          {...props}
          {...describedFormGroupProps}>
          <OuiFormRow fullWidth>
            <input />
          </OuiFormRow>
        </OuiDescribedFormGroup>
      );

      expect(component).toMatchSnapshot();
    });

    test('gutterSize is rendered', () => {
      const component = mount(
        <OuiDescribedFormGroup gutterSize="s" {...requiredProps} {...props}>
          <OuiFormRow>
            <input />
          </OuiFormRow>
        </OuiDescribedFormGroup>
      );

      expect(component).toMatchSnapshot();
    });

    test('titleSize is rendered', () => {
      const component = mount(
        <OuiDescribedFormGroup titleSize="l" {...requiredProps} {...props}>
          <OuiFormRow>
            <input />
          </OuiFormRow>
        </OuiDescribedFormGroup>
      );

      expect(component).toMatchSnapshot();
    });

    test("description is not rendered when it's not provided", () => {
      const component = mount(
        <OuiDescribedFormGroup {...requiredProps} title={<h3>Title</h3>}>
          <OuiFormRow>
            <input />
          </OuiFormRow>
        </OuiDescribedFormGroup>
      );

      expect(component).toMatchSnapshot();
    });

    test('props for the flex item containers are passed down', () => {
      const component = mount(
        <OuiDescribedFormGroup
          {...requiredProps}
          {...props}
          descriptionFlexItemProps={{ grow: 2 }}
          fieldFlexItemProps={{ component: 'section' }}>
          <OuiFormRow>
            <input />
          </OuiFormRow>
        </OuiDescribedFormGroup>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
