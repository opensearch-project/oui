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

import { requiredProps } from '../../../test';

import { OuiFormControlLayout, ICON_SIDES } from './form_control_layout';

jest.mock('../../', () => ({
  OuiIcon: 'oui_icon',
  OuiLoadingSpinner: 'oui_loading_spinner',
}));

describe('OuiFormControlLayout', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiFormControlLayout {...requiredProps}>
        <input />
      </OuiFormControlLayout>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('icon', () => {
      describe('is rendered', () => {
        test('as a string', () => {
          const { container } = render(<OuiFormControlLayout icon="alert" />);

          expect(container.firstChild).toMatchSnapshot();
        });

        test('as an object', () => {
          const icon = {
            type: 'alert',
            className: 'customClass',
            'data-test-subj': 'myIcon',
          };

          const { container } = render(<OuiFormControlLayout icon={icon} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });

      describe('side', () => {
        ICON_SIDES.forEach((side) => {
          test(`${side} is rendered`, () => {
            const icon = {
              type: 'alert',
              side,
            };

            const { container } = render(<OuiFormControlLayout icon={icon} />);

            expect(container.firstChild).toMatchSnapshot();
          });
        });
      });

      describe('onClick', () => {
        test('is called when clicked', () => {
          const icon = {
            type: 'alert',
            onClick: jest.fn(),
            'data-test-subj': 'myIcon',
          };

          const { getByTestId } = render(<OuiFormControlLayout icon={icon} />);

          const iconButton = getByTestId('myIcon');
          fireEvent.click(iconButton);
          expect(icon.onClick).toHaveBeenCalled();
        });
      });
    });

    describe('clear', () => {
      describe('onClick', () => {
        test('is rendered', () => {
          const clear = {
            onClick: () => {},
            className: 'customClass',
            'data-test-subj': 'clearButton',
          };

          const { container } = render(<OuiFormControlLayout clear={clear} />);

          expect(container.firstChild).toMatchSnapshot();
        });

        test('is called when clicked', () => {
          const clear = {
            onClick: jest.fn(),
            'data-test-subj': 'clearButton',
          };

          const { getByTestId } = render(
            <OuiFormControlLayout clear={clear} />
          );

          const clearButton = getByTestId('clearButton');
          fireEvent.click(clearButton);
          expect(clear.onClick).toHaveBeenCalled();
        });
      });
    });

    test('isLoading is rendered', () => {
      const { container } = render(<OuiFormControlLayout isLoading />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const { container } = render(<OuiFormControlLayout fullWidth />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('readOnly is rendered', () => {
      const { container } = render(<OuiFormControlLayout readOnly />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('one prepend node is rendered', () => {
      const { container } = render(
        <OuiFormControlLayout prepend={<span>1</span>} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('one prepend node is rendered with className', () => {
      const { container } = render(
        <OuiFormControlLayout prepend={<span className="myClass">1</span>} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('one prepend string is rendered', () => {
      const { container } = render(<OuiFormControlLayout prepend="1" />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('one append node is rendered', () => {
      const { container } = render(
        <OuiFormControlLayout append={<span>1</span>} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('one append string is rendered', () => {
      const { container } = render(<OuiFormControlLayout append="1" />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('multiple prepends are rendered', () => {
      const { container } = render(
        <OuiFormControlLayout prepend={[<span>1</span>, <span>2</span>]} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('multiple appends are rendered', () => {
      const { container } = render(
        <OuiFormControlLayout append={[<span>1</span>, <span>2</span>]} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
