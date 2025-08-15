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
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { requiredProps } from '../../test';
import { OuiLink, COLORS } from './link';

describe('OuiLink', () => {
  COLORS.forEach((color) => {
    test(`${color} is rendered`, () => {
      const { container } = render(<OuiLink color={color} />);
      expect(container).toMatchSnapshot();
    });
  });

  test('it supports both href and onClick', () => {
    const { container } = render(
      <OuiLink href="/imalink" onClick={() => null} />
    );
    expect(container).toMatchSnapshot();
  });

  test('it passes the default props through', () => {
    const { container } = render(<OuiLink {...requiredProps} />);
    expect(container).toMatchSnapshot();
  });

  test('supports children', () => {
    const { container } = render(
      <OuiLink href="#">
        <span>Hiya!!!</span>
      </OuiLink>
    );
    expect(container).toMatchSnapshot();
  });

  test('it is an external link', () => {
    const { container } = render(<OuiLink external href="/baz/bing" />);
    expect(container).toMatchSnapshot();
  });

  test('supports href', () => {
    const { container } = render(<OuiLink href="/baz/bing" />);
    expect(container).toMatchSnapshot();
  });

  test('supports target', () => {
    const { container } = render(<OuiLink href="#" target="_blank" />);
    expect(container).toMatchSnapshot();
  });

  test('allows for target and external to be controlled independently', () => {
    const { container } = render(
      <OuiLink href="#" target="_blank" external={false} />
    );
    expect(container).toMatchSnapshot();
  });

  test('supports rel', () => {
    const { container } = render(<OuiLink href="hoi" rel="stylesheet" />);
    expect(container).toMatchSnapshot();
  });

  test('supports disabled', () => {
    const { container } = render(
      <OuiLink disabled onClick={() => 'hello, world!'} />
    );
    expect(container).toMatchSnapshot();
  });

  test('if href is not specified, it renders a button of type=button', () => {
    const { container } = render(<OuiLink />);
    expect(container).toMatchSnapshot();
  });

  test('button respects the type property', () => {
    const { container } = render(
      <OuiLink type="submit" onClick={() => 'hello, world!'} />
    );
    expect(container).toMatchSnapshot();
  });

  test('onClick fires for buttons', async () => {
    const handler = jest.fn();
    render(<OuiLink onClick={handler} />);

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByRole('button'));
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('onClick fires for links', async () => {
    const handler = jest.fn();
    render(<OuiLink href="#" onClick={handler} />);

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByRole('link'));
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
