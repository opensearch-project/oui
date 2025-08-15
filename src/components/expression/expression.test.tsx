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
import { requiredProps } from '../../test/required_props';

import { OuiExpression, COLORS } from './expression';

describe('OuiExpression', () => {
  test('renders', () => {
    const { container } = render(
      <OuiExpression
        description="the answer is"
        value="42"
        isActive={false}
        onClick={() => {}}
        {...requiredProps}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('render with only description', () => {
    const { container } = render(
      <OuiExpression
        description="the answer is"
        isActive={false}
        onClick={() => {}}
        {...requiredProps}
      />
    );
    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(
            <OuiExpression
              description="the answer is"
              value="42"
              color={color}
              {...requiredProps}
            />
          );

          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('uppercase', () => {
      test('true renders uppercase', () => {
        const { container } = render(
          <OuiExpression
            description="the answer is"
            value="42"
            uppercase={true}
          />
        );

        expect(container).toMatchSnapshot();
      });

      test('false renders inherited case', () => {
        const { container } = render(
          <OuiExpression
            description="the answer is"
            value="42"
            uppercase={false}
          />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('display', () => {
      test('can be columns', () => {
        const { container } = render(
          <OuiExpression
            description="the answer is"
            value="42"
            display="columns"
          />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('isInvalid', () => {
      test('renders error state', () => {
        const { container } = render(
          <OuiExpression description="the answer is" value="42" isInvalid />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('descriptionWidth', () => {
      test('changes the description&apos;s width when using columns', () => {
        const { container } = render(
          <OuiExpression
            description="the answer is"
            descriptionWidth={50}
            value="42"
            isInvalid
            display="columns"
          />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('textWrap', () => {
      test('can truncate text', () => {
        const { container } = render(
          <OuiExpression
            description="the answer is"
            value="42"
            textWrap="truncate"
          />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('isActive', () => {
      test('true renders active', () => {
        const { container } = render(
          <OuiExpression
            description="the answer is"
            value="42"
            isActive={true}
          />
        );

        expect(container).toMatchSnapshot();
      });

      test('false renders inactive', () => {
        const { container } = render(
          <OuiExpression
            description="the answer is"
            value="42"
            isActive={false}
          />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('is called when the button is clicked', async () => {
        const handler = jest.fn();
        render(
          <OuiExpression
            description="the answer is"
            value="42"
            isActive={false}
            onClick={handler}
            {...requiredProps}
          />
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
