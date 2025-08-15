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
import { requiredProps } from '../../../test/required_props';

import { OuiButtonIcon, COLORS, DISPLAYS, SIZES } from './button_icon';

describe('OuiButtonIcon', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiButtonIcon iconType="user" {...requiredProps} />
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isDisabled', () => {
      it('is rendered', () => {
        const { container } = render(
          <OuiButtonIcon iconType="user" aria-label="button" isDisabled />
        );

        expect(container).toMatchSnapshot();
      });

      it('renders a button even when href is defined', () => {
        const { container } = render(
          <OuiButtonIcon
            iconType="user"
            aria-label="button"
            href="#"
            isDisabled
          />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const { container } = render(
          <OuiButtonIcon aria-label="button" iconType="user" />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(
            <OuiButtonIcon iconType="user" aria-label="button" color={color} />
          );

          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('display', () => {
      DISPLAYS.forEach((display) => {
        test(`${display} is rendered`, () => {
          const { container } = render(
            <OuiButtonIcon
              iconType="user"
              aria-label="button"
              display={display}
            />
          );

          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const { container } = render(
            <OuiButtonIcon iconType="user" aria-label="button" size={size} />
          );

          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('isSelected', () => {
      it('is rendered as true', () => {
        const { container } = render(
          <OuiButtonIcon iconType="user" aria-label="button" isSelected />
        );

        expect(container).toMatchSnapshot();
      });

      it('is rendered as false', () => {
        const { container } = render(
          <OuiButtonIcon
            iconType="user"
            aria-label="button"
            isSelected={false}
          />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('href', () => {
      it('secures the rel attribute when the target is _blank', () => {
        const { container } = render(
          <OuiButtonIcon
            iconType="user"
            aria-label="button"
            href="#"
            target="_blank"
          />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('supports onClick and href', async () => {
        const handler = jest.fn();
        render(
          <OuiButtonIcon
            iconType="user"
            aria-label="hoi"
            href="#"
            onClick={handler}
          />
        );

        const user = userEvent.setup();
        await act(async () => {
          await user.click(screen.getByRole('link'));
        });

        expect(handler).toHaveBeenCalledTimes(1);
      });

      it('supports onClick as a button', async () => {
        const handler = jest.fn();
        render(
          <OuiButtonIcon iconType="user" aria-label="hoi" onClick={handler} />
        );

        const user = userEvent.setup();
        await act(async () => {
          await user.click(screen.getByRole('button'));
        });

        expect(handler).toHaveBeenCalledTimes(1);
      });
    });
  });
});
