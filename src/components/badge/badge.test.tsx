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
import { render } from '@testing-library/react';
import { requiredProps } from '../../test/required_props';

import { OuiBadge, COLORS, ICON_SIDES } from './badge';

describe('OuiBadge', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiBadge {...requiredProps}>Content</OuiBadge>
    );
    expect(container).toMatchSnapshot();
  });

  test('is disabled', () => {
    const { container } = render(
      <OuiBadge isDisabled {...requiredProps}>
        Content
      </OuiBadge>
    );
    expect(container).toMatchSnapshot();
  });

  test('is rendered with onClick provided', () => {
    const { container } = render(
      <OuiBadge
        {...requiredProps}
        onClick={jest.fn()}
        onClickAriaLabel="Example of onclick event for the button">
        Content
      </OuiBadge>
    );
    expect(container).toMatchSnapshot();
  });

  test('is rendered with href provided', () => {
    const { container } = render(
      <OuiBadge {...requiredProps} href="/#/">
        Content
      </OuiBadge>
    );
    expect(container).toMatchSnapshot();
  });

  test('is rendered with iconOnClick provided', () => {
    const { container } = render(
      <OuiBadge
        {...requiredProps}
        iconOnClick={jest.fn()}
        iconOnClickAriaLabel="Example of onclick event for icon within the button">
        Content
      </OuiBadge>
    );
    expect(container).toMatchSnapshot();
  });

  test('is rendered with iconOnClick and onClick provided', () => {
    const { container } = render(
      <OuiBadge
        {...requiredProps}
        iconOnClick={jest.fn()}
        iconOnClickAriaLabel="Example of onclick event for icon within the button"
        onClick={jest.fn()}
        onClickAriaLabel="Example of onclick event for the button">
        Content
      </OuiBadge>
    );
    expect(container).toMatchSnapshot();
  });

  test('is rendered with iconOnClick and href provided', () => {
    const { container } = render(
      <OuiBadge
        {...requiredProps}
        iconOnClick={jest.fn()}
        iconOnClickAriaLabel="Example of onclick event for icon within the anchor"
        href="/#/">
        Content
      </OuiBadge>
    );
    expect(container).toMatchSnapshot();
  });

  test('is rendered with href and rel provided', () => {
    const { container } = render(
      <OuiBadge
        {...requiredProps}
        iconOnClick={jest.fn()}
        iconOnClickAriaLabel="Example of onclick event for icon within the anchor"
        href="/#/"
        rel="noopener">
        Content
      </OuiBadge>
    );
    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    describe('iconType', () => {
      it('is rendered', () => {
        const { container } = render(
          <OuiBadge iconType="user">Content</OuiBadge>
        );
        expect(container).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        it(`${color} is rendered`, () => {
          const { container } = render(
            <OuiBadge color={color}>Content</OuiBadge>
          );
          expect(container).toMatchSnapshot();
        });
      });

      it('accepts rgba', () => {
        const { container } = render(
          <OuiBadge color="rgba(255,255,255,1)">Content</OuiBadge>
        );
        expect(container).toMatchSnapshot();
      });

      it('accepts hex', () => {
        const { container } = render(<OuiBadge color="#333">Content</OuiBadge>);
        expect(container).toMatchSnapshot();
      });
    });

    describe('iconSide', () => {
      ICON_SIDES.forEach((iconSide) => {
        it(`${iconSide} is rendered`, () => {
          const { container } = render(
            <OuiBadge iconType="user" iconSide={iconSide}>
              Content
            </OuiBadge>
          );
          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('style', () => {
      const style = { border: '4px solid tomato' };

      it('is rendered', () => {
        const { container } = render(
          <OuiBadge style={style}>Content</OuiBadge>
        );
        expect(container).toMatchSnapshot();
      });

      COLORS.forEach((color) => {
        it(`is rendered with ${color}`, () => {
          const { container } = render(
            <OuiBadge style={style} color={color}>
              Content
            </OuiBadge>
          );
          expect(container).toMatchSnapshot();
        });
      });

      it('is rendered with hollow', () => {
        const { container } = render(
          <OuiBadge style={style} color="hollow">
            Content
          </OuiBadge>
        );
        expect(container).toMatchSnapshot();
      });
    });
  });
});
