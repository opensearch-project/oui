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
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { requiredProps } from '../../test/required_props';

import { STATUS } from './step_number';
import { OuiStepHorizontal } from './step_horizontal';

describe('OuiStepHorizontal', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiStepHorizontal {...requiredProps} onClick={() => {}} />
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    test('step', () => {
      const { container } = render(
        <OuiStepHorizontal step={5} onClick={() => {}} />
      );

      expect(container).toMatchSnapshot();
    });

    test('title', () => {
      const { container } = render(
        <OuiStepHorizontal title={'First step'} onClick={() => {}} />
      );

      expect(container).toMatchSnapshot();
    });

    test('isSelected', () => {
      const { container } = render(
        <OuiStepHorizontal isSelected onClick={() => {}} />
      );

      expect(container).toMatchSnapshot();
    });

    test('isComplete', () => {
      const { container } = render(
        <OuiStepHorizontal isComplete onClick={() => {}} />
      );

      expect(container).toMatchSnapshot();
    });

    describe('status', () => {
      STATUS.forEach((status) => {
        test(`${status} is rendered`, () => {
          const { container } = render(
            <OuiStepHorizontal status={status} onClick={() => {}} />
          );

          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('onClick', () => {
      test('is called when clicked', () => {
        const onClickHandler = jest.fn();

        render(<OuiStepHorizontal step={1} onClick={onClickHandler} />);

        act(() => {
          fireEvent.click(screen.getByRole('button'));
        });

        expect(onClickHandler).toHaveBeenCalledTimes(1);
      });

      test("isn't called when clicked if it's disabled", () => {
        const onClickHandler = jest.fn();

        render(
          <OuiStepHorizontal disabled step={1} onClick={onClickHandler} />
        );

        act(() => {
          fireEvent.click(screen.getByRole('button'));
        });

        expect(onClickHandler).not.toHaveBeenCalled();
      });
    });
  });
});
