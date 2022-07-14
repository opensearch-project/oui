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
import { requiredProps } from '../../test';
import { OuiLink, COLORS } from './link';

describe('OuiLink', () => {
  COLORS.forEach((color) => {
    test(`${color} is rendered`, () => {
      const component = render(<OuiLink color={color} />);
      expect(component).toMatchSnapshot();
    });
  });

  test('it supports both href and onClick', () => {
    const component = render(<OuiLink href="/imalink" onClick={() => null} />);
    expect(component).toMatchSnapshot();
  });

  test('it passes the default props through', () => {
    const component = render(<OuiLink {...requiredProps} />);
    expect(component).toMatchSnapshot();
  });

  test('supports children', () => {
    const component = render(
      <OuiLink href="#">
        <span>Hiya!!!</span>
      </OuiLink>
    );
    expect(component).toMatchSnapshot();
  });

  test('it is an external link', () => {
    const component = render(<OuiLink external href="/baz/bing" />);
    expect(component).toMatchSnapshot();
  });

  test('supports href', () => {
    const component = render(<OuiLink href="/baz/bing" />);
    expect(component).toMatchSnapshot();
  });

  test('supports target', () => {
    const component = render(<OuiLink href="#" target="_blank" />);
    expect(component).toMatchSnapshot();
  });

  test('allows for target and external to be controlled independently', () => {
    const component = render(
      <OuiLink href="#" target="_blank" external={false} />
    );
    expect(component).toMatchSnapshot();
  });

  test('supports rel', () => {
    const component = render(<OuiLink href="hoi" rel="stylesheet" />);
    expect(component).toMatchSnapshot();
  });

  test('supports disabled', () => {
    const component = render(
      <OuiLink disabled onClick={() => 'hello, world!'} />
    );
    expect(component).toMatchSnapshot();
  });

  test('if href is not specified, it renders a button of type=button', () => {
    const component = render(<OuiLink />);
    expect(component).toMatchSnapshot();
  });

  test('button respects the type property', () => {
    const component = render(
      <OuiLink type="submit" onClick={() => 'hello, world!'} />
    );
    expect(component).toMatchSnapshot();
  });

  test('onClick fires for buttons', () => {
    const handler = jest.fn();
    const component = mount(<OuiLink onClick={handler} />);
    component.find('button').simulate('click');
    expect(handler.mock.calls.length).toEqual(1);
  });

  test('onClick fires for links', () => {
    const handler = jest.fn();
    const component = mount(<OuiLink href="#" onClick={handler} />);
    component.find('a').simulate('click');
    expect(handler.mock.calls.length).toEqual(1);
  });
});
