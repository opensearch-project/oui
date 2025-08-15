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
import { render, fireEvent } from '@testing-library/react';
import { requiredProps } from '../../test/required_props';

import { OuiContextMenuItem, SIZES } from './context_menu_item';

describe('OuiContextMenuItem', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiContextMenuItem {...requiredProps}>Hello</OuiContextMenuItem>
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    describe('icon', () => {
      test('is rendered', () => {
        const { container } = render(
          <OuiContextMenuItem icon={<span className="ouiIcon fa-user" />} />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('disabled', () => {
      test('is rendered', () => {
        const { container } = render(<OuiContextMenuItem disabled />);

        expect(container).toMatchSnapshot();
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        it(`${size} is rendered`, () => {
          const { container } = render(<OuiContextMenuItem size={size} />);

          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('onClick', () => {
      test('renders a button', () => {
        const { container } = render(
          <OuiContextMenuItem {...requiredProps} onClick={() => {}} />
        );

        expect(container).toMatchSnapshot();
      });

      test("isn't called upon instantiation", () => {
        const onClickHandler = jest.fn();

        render(<OuiContextMenuItem onClick={onClickHandler} />);

        expect(onClickHandler).not.toHaveBeenCalled();
      });

      test('is called when the item is clicked', () => {
        const onClickHandler = jest.fn();

        const { container } = render(
          <OuiContextMenuItem onClick={onClickHandler} />
        );

        const button = container.querySelector('button');
        fireEvent.click(button!);

        expect(onClickHandler).toHaveBeenCalledTimes(1);
      });

      test('is not called when the item is clicked but set to disabled', () => {
        const onClickHandler = jest.fn();

        const { container } = render(
          <OuiContextMenuItem disabled onClick={onClickHandler} />
        );

        const button = container.querySelector('button');
        fireEvent.click(button!);

        expect(onClickHandler).not.toHaveBeenCalled();
      });
    });

    describe('href', () => {
      test('renders a link', () => {
        const { container } = render(
          <OuiContextMenuItem {...requiredProps} href="url" />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('rel', () => {
      test('is rendered', () => {
        const { container } = render(
          <OuiContextMenuItem {...requiredProps} href="url" rel="help" />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('target', () => {
      test('is rendered', () => {
        const { container } = render(
          <OuiContextMenuItem {...requiredProps} href="url" target="_blank" />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('hasPanel', () => {
      test('is rendered', () => {
        const { container } = render(<OuiContextMenuItem hasPanel />);

        expect(container).toMatchSnapshot();
      });
    });
  });
});
