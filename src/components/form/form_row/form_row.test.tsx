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
import { shallow, render, mount } from 'enzyme';
import { requiredProps } from '../../../test';

import { OuiFormRow, DISPLAYS } from './form_row';

describe('OuiFormRow', () => {
  test('is rendered', () => {
    const component = render(
      <OuiFormRow {...requiredProps}>
        <input />
      </OuiFormRow>
    );

    expect(component).toMatchSnapshot();
  });

  test('ties together parts for accessibility', () => {
    const props = {
      label: 'Label',
      helpText: 'Help text',
      isInvalid: true,
      error: ['Error one', 'Error two'],
    };

    const tree = shallow(
      <OuiFormRow {...requiredProps} {...props}>
        <input />
      </OuiFormRow>
    );

    // Input is labeled by the label.
    expect(tree.find('input').prop('id')).toEqual('generated-id');
    expect(tree.find('OuiFormLabel').prop('htmlFor')).toEqual('generated-id');

    // Input is described by help and error text.
    expect(tree.find('OuiFormHelpText').prop('id')).toEqual(
      'generated-id-help-0'
    );
    expect(tree.find('OuiFormErrorText').at(0).prop('id')).toEqual(
      'generated-id-error-0'
    );
    expect(tree.find('OuiFormErrorText').at(1).prop('id')).toEqual(
      'generated-id-error-1'
    );
    expect(tree.find('input').prop('aria-describedby')).toEqual(
      'generated-id-help-0 generated-id-error-0 generated-id-error-1'
    );
  });

  describe('props', () => {
    test('label is rendered', () => {
      const component = shallow(
        <OuiFormRow label="label">
          <input />
        </OuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('label append is rendered', () => {
      const component = shallow(
        <OuiFormRow label="label" labelAppend="append">
          <input />
        </OuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('label renders as a legend and subsquently a fieldset wrapper', () => {
      const component = shallow(
        <OuiFormRow label="label" labelType="legend">
          <input />
        </OuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('describedByIds is rendered', () => {
      const component = shallow(
        <OuiFormRow describedByIds={['generated-id-additional']}>
          <input />
        </OuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('id is rendered', () => {
      const component = render(
        <OuiFormRow id="id">
          <input />
        </OuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('isInvalid is rendered', () => {
      const component = render(
        <OuiFormRow isInvalid label="label">
          <input />
        </OuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('error as string is rendered', () => {
      const component = render(
        <OuiFormRow error="Error" isInvalid={true}>
          <input />
        </OuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('error as array is rendered', () => {
      const component = render(
        <OuiFormRow error={['Error', 'Error2']} isInvalid={true}>
          <input />
        </OuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('error is not rendered if isInvalid is false', () => {
      const component = render(
        <OuiFormRow error={['Error']} isInvalid={false}>
          <input />
        </OuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('helpText is rendered', () => {
      const component = render(
        <OuiFormRow helpText={<span>This is help text.</span>}>
          <input />
        </OuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('hasEmptyLabelSpace is rendered', () => {
      const component = render(
        <OuiFormRow hasEmptyLabelSpace>
          <input />
        </OuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const component = render(
        <OuiFormRow fullWidth>
          <input />
        </OuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    describe('display type', () => {
      DISPLAYS.forEach((display) => {
        test(`${display} is rendered`, () => {
          const component = render(
            <OuiFormRow display={display}>
              <input />
            </OuiFormRow>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });

  describe('behavior', () => {
    describe('onFocus', () => {
      test('is called in child', () => {
        const focusMock = jest.fn();

        const component = mount(
          <OuiFormRow label={<span>Label</span>}>
            <input onFocus={focusMock} />
          </OuiFormRow>
        );

        component.find('input').simulate('focus');

        expect(focusMock).toBeCalledTimes(1);

        // Ensure the focus event is properly fired on the parent
        // which will pass down to the OuiFormLabel
        expect(component).toMatchSnapshot();
      });

      test('works in parent even if not in child', () => {
        const component = mount(
          <OuiFormRow label={<span>Label</span>}>
            <input />
          </OuiFormRow>
        );

        component.find('input').simulate('focus');

        // Ensure the focus event is properly fired on the parent
        // which will pass down to the OuiFormLabel
        expect(component).toMatchSnapshot();
      });
    });

    describe('onBlur', () => {
      test('is called in child', () => {
        const blurMock = jest.fn();

        const component = mount(
          <OuiFormRow label={<span>Label</span>}>
            <input onBlur={blurMock} />
          </OuiFormRow>
        );

        component.find('input').simulate('blur');

        expect(blurMock).toBeCalledTimes(1);

        // Ensure the blur event is properly fired on the parent
        // which will pass down to the OuiFormLabel
        expect(component).toMatchSnapshot();
      });

      test('works in parent even if not in child', () => {
        const component = mount(
          <OuiFormRow label={<span>Label</span>}>
            <input />
          </OuiFormRow>
        );

        component.find('input').simulate('blur');

        // Ensure the blur event is properly fired on the parent
        // which will pass down to the OuiFormLabel
        expect(component).toMatchSnapshot();
      });
    });
  });
});
