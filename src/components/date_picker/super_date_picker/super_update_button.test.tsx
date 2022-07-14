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
import { shallow, mount } from 'enzyme';

import { OuiSuperUpdateButton } from './super_update_button';
import { OuiButton, OuiButtonProps } from '../../button';

const noop = () => {};

describe('OuiSuperUpdateButton', () => {
  test('is rendered', () => {
    const component = shallow(<OuiSuperUpdateButton onClick={noop} />);

    expect(component).toMatchSnapshot();
  });

  test('needsUpdate', () => {
    const component = shallow(
      <OuiSuperUpdateButton needsUpdate onClick={noop} />
    );

    expect(component).toMatchSnapshot();
  });

  test('isDisabled', () => {
    const component = shallow(
      <OuiSuperUpdateButton isDisabled onClick={noop} />
    );

    expect(component).toMatchSnapshot();
  });

  test('isLoading', () => {
    const component = shallow(
      <OuiSuperUpdateButton isLoading onClick={noop} />
    );

    expect(component).toMatchSnapshot();
  });

  test('showTooltip', () => {
    const component = shallow(
      <OuiSuperUpdateButton showTooltip onClick={noop} />
    );

    expect(component).toMatchSnapshot();
  });

  test('forwards props to OuiButton', () => {
    const speciallyHandledProps = {
      className: 'testClass',
      textProps: {
        className: 'textPropsTestClass',
        id: 'test',
      },
    };
    const extraProps: Partial<OuiButtonProps> = {
      fill: false,
      size: 's',
      contentProps: { id: 'contentSpan' },
    };

    const component = mount(
      <OuiSuperUpdateButton
        onClick={() => {}}
        {...speciallyHandledProps}
        {...extraProps}
      />
    );

    const {
      // props not passed through
      isDisabled,
      isLoading,
      onClick,

      // props with special handling
      className,
      textProps,

      ...forwardedProps
    } = component.find(OuiButton).props();

    expect(className).toBe('ouiSuperUpdateButton testClass');
    expect(textProps).toEqual({
      className: 'ouiSuperUpdateButton__text textPropsTestClass',
      id: 'test',
    });
    expect(forwardedProps).toMatchObject(extraProps);
  });
});
