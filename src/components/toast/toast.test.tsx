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
import { requiredProps } from '../../test';

import { COLORS, OuiToast } from './toast';

describe('OuiToast', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiToast {...requiredProps} title="test title">
        <p>Hi</p>
      </OuiToast>
    );

    expect(container).toMatchSnapshot();
  });

  describe('Props', () => {
    describe('title', () => {
      test('is rendered', () => {
        const { container } = render(<OuiToast title="toast title" />);
        expect(container).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(
            <OuiToast color={color} title="test title" />
          );
          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('iconType', () => {
      test('is rendered', () => {
        const { container } = render(
          <OuiToast iconType="user" title="test title" />
        );
        expect(container).toMatchSnapshot();
      });
    });

    describe('onClose', () => {
      test('is called when the close button is clicked', () => {
        const onCloseHandler = jest.fn();

        render(<OuiToast onClose={onCloseHandler} title="test title" />);

        act(() => {
          fireEvent.click(screen.getByTestId('toastCloseButton'));
        });

        expect(onCloseHandler).toHaveBeenCalledTimes(1);
      });
    });
  });
});
