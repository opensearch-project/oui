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

import { OuiButtonEmpty, COLORS, SIZES, FLUSH_TYPES } from './button_empty';
import { ICON_SIDES } from '../button_content';

describe('OuiButtonEmpty', () => {
  test('is rendered', () => {
    const component = render(
      <OuiButtonEmpty {...requiredProps}>Content</OuiButtonEmpty>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isDisabled', () => {
      it('is rendered', () => {
        const component = render(<OuiButtonEmpty isDisabled />);

        expect(component).toMatchSnapshot();
      });

      it('renders a button even when href is defined', () => {
        const component = render(<OuiButtonEmpty href="#" isDisabled />);

        expect(component).toMatchSnapshot();
      });

      it('renders if passed simply as disabled', () => {
        const component = render(<OuiButtonEmpty disabled />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('isLoading', () => {
      it('is rendered', () => {
        const component = render(<OuiButtonEmpty isLoading />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('isSelected', () => {
      it('is rendered as true', () => {
        const component = render(<OuiButtonEmpty isSelected />);

        expect(component).toMatchSnapshot();
      });

      it('is rendered as false', () => {
        const component = render(<OuiButtonEmpty isSelected={false} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const component = render(<OuiButtonEmpty iconType="user" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const component = render(<OuiButtonEmpty color={color} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const component = render(<OuiButtonEmpty size={size} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('iconSide', () => {
      ICON_SIDES.forEach((iconSide) => {
        test(`${iconSide} is rendered`, () => {
          const component = render(
            <OuiButtonEmpty iconType="user" iconSide={iconSide}>
              Content
            </OuiButtonEmpty>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('flush', () => {
      FLUSH_TYPES.forEach((flushType) => {
        test(`${flushType} is rendered`, () => {
          const component = render(<OuiButtonEmpty flush={flushType} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('href', () => {
      it('secures the rel attribute when the target is _blank', () => {
        const component = render(<OuiButtonEmpty href="#" target="_blank" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('supports onClick and href', () => {
        const handler = jest.fn();
        const component = mount(<OuiButtonEmpty href="#" onClick={handler} />);
        component.find('a').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });

      it('supports onClick as a button', () => {
        const handler = jest.fn();
        const component = mount(<OuiButtonEmpty onClick={handler} />);
        component.find('button').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });
    });

    test('contentProps is rendered', () => {
      const component = render(
        <OuiButtonEmpty contentProps={requiredProps}>Content</OuiButtonEmpty>
      );

      expect(component).toMatchSnapshot();
    });

    test('textProps is rendered', () => {
      const component = render(
        <OuiButtonEmpty textProps={requiredProps}>Content</OuiButtonEmpty>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
