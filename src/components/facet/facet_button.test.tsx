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
import { requiredProps } from '../../test/required_props';

import { OuiFacetButton } from './facet_button';
import { OuiIcon } from '../icon';

describe('OuiFacetButton', () => {
  test('is rendered', () => {
    const component = render(
      <OuiFacetButton {...requiredProps}>Content</OuiFacetButton>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isDisabled', () => {
      it('is rendered', () => {
        const component = render(
          <OuiFacetButton isDisabled>Content</OuiFacetButton>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isLoading', () => {
      it('is rendered', () => {
        const component = render(
          <OuiFacetButton isLoading>Content</OuiFacetButton>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isSelected', () => {
      it('is rendered', () => {
        const component = render(
          <OuiFacetButton isSelected>Content</OuiFacetButton>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('quantity', () => {
      it('is rendered', () => {
        const component = render(
          <OuiFacetButton quantity={60}>Content</OuiFacetButton>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('icon', () => {
      it('is rendered', () => {
        const component = render(
          <OuiFacetButton icon={<OuiIcon type="dot" />}>Content</OuiFacetButton>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('supports onClick', () => {
        const handler = jest.fn();
        const component = mount(
          <OuiFacetButton onClick={handler}>Content</OuiFacetButton>
        );
        component.find('button').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });
    });
  });
});
