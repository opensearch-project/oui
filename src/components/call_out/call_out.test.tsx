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

import { OuiCallOut, COLORS, HEADINGS } from './call_out';

describe('OuiCallOut', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiCallOut {...requiredProps}>Content</OuiCallOut>
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    describe('title', () => {
      it('is rendered', () => {
        const { container } = render(
          <OuiCallOut title="Title">Content</OuiCallOut>
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const { container } = render(<OuiCallOut iconType="user" />);

        expect(container).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(<OuiCallOut color={color} />);

          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('heading', () => {
      HEADINGS.forEach((heading) => {
        test(`${heading} is rendered`, () => {
          const { container } = render(<OuiCallOut heading={heading} />);

          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('dismissible', () => {
      it('is rendered when set to true', () => {
        const { container } = render(<OuiCallOut dismissible={true} />);

        expect(container).toMatchSnapshot();
      });

      it('is not rendered when in warning color', () => {
        const { container } = render(
          <OuiCallOut dismissible={true} color={'warning'} />
        );

        expect(container).toMatchSnapshot();
      });

      it('is not rendered when in danger color', () => {
        const { container } = render(
          <OuiCallOut dismissible={true} color={'danger'} />
        );

        expect(container).toMatchSnapshot();
      });

      it('close callout after click', async () => {
        const onDismiss = jest.fn();
        const { container } = render(
          <OuiCallOut
            dismissible={true}
            onDismiss={onDismiss}
            title="This is a callout"
            data-test-subj="callOut"
          />
        );
        expect(container).toMatchSnapshot();

        const user = userEvent.setup();
        const closeButton = screen.getByTestId('closeCallOutButton');

        await act(async () => {
          await user.click(closeButton);
        });

        expect(onDismiss).toBeCalled();
      });
    });
  });
});
