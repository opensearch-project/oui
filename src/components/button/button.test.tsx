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
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { requiredProps } from '../../test/required_props';

import { OuiButton, COLORS, SIZES } from './button';
import { ICON_GAPS, ICON_SIDES } from './button_content';

describe('OuiButton', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiButton {...requiredProps}>Content</OuiButton>
    );
    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    describe('fill', () => {
      it('is rendered', () => {
        const { container } = render(<OuiButton fill />);
        expect(container).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      it('is rendered', () => {
        const { container } = render(<OuiButton isDisabled />);
        expect(container).toMatchSnapshot();
      });

      it('renders a button even when href is defined', () => {
        const { container } = render(<OuiButton href="#" isDisabled />);
        expect(container).toMatchSnapshot();
      });

      it('renders if passed as disabled', () => {
        const { container } = render(<OuiButton disabled />);
        expect(container).toMatchSnapshot();
      });
    });

    describe('isLoading', () => {
      it('is rendered', () => {
        const { container } = render(<OuiButton isLoading />);
        expect(container).toMatchSnapshot();
      });
    });

    describe('isSelected', () => {
      it('is rendered as true', () => {
        const { container } = render(<OuiButton isSelected />);
        expect(container).toMatchSnapshot();
      });

      it('is rendered as false', () => {
        const { container } = render(<OuiButton isSelected={false} />);
        expect(container).toMatchSnapshot();
      });
    });

    describe('fullWidth', () => {
      it('is rendered', () => {
        const { container } = render(<OuiButton fullWidth />);
        expect(container).toMatchSnapshot();
      });
    });

    describe('minWidth', () => {
      it('is rendered', () => {
        const { container } = render(<OuiButton minWidth={0} />);
        expect(container).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const { container } = render(<OuiButton iconType="user" />);
        expect(container).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(<OuiButton color={color} />);
          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const { container } = render(<OuiButton size={size} />);
          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('iconSide', () => {
      ICON_SIDES.forEach((iconSide) => {
        test(`${iconSide} is rendered`, () => {
          const { container } = render(
            <OuiButton iconType="user" iconSide={iconSide}>
              Content
            </OuiButton>
          );
          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('iconGap', () => {
      ICON_GAPS.forEach((iconGap) => {
        test(`${iconGap} is rendered`, () => {
          const { container } = render(
            <OuiButton iconType="user" iconGap={iconGap}>
              Content
            </OuiButton>
          );
          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('href', () => {
      it('secures the rel attribute when the target is _blank', () => {
        const { container } = render(<OuiButton href="#" target="_blank" />);
        expect(container).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('supports onClick and href', async () => {
        const handler = jest.fn();
        render(<OuiButton href="#" onClick={handler} />);

        const user = userEvent.setup();
        await user.click(screen.getByRole('link'));

        expect(handler).toHaveBeenCalledTimes(1);
      });

      it('supports onClick as a button', async () => {
        const handler = jest.fn();
        render(<OuiButton onClick={handler} />);

        const user = userEvent.setup();
        await user.click(screen.getByRole('button'));

        expect(handler).toHaveBeenCalledTimes(1);
      });
    });

    test('contentProps is rendered', () => {
      const { container } = render(
        <OuiButton contentProps={requiredProps}>Content</OuiButton>
      );
      expect(container).toMatchSnapshot();
    });

    test('textProps is rendered', () => {
      const { container } = render(
        <OuiButton textProps={requiredProps}>Content</OuiButton>
      );
      expect(container).toMatchSnapshot();
    });
  });
});
