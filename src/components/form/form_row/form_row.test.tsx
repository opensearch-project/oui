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

import { OuiFormRow, DISPLAYS } from './form_row';

describe('OuiFormRow', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiFormRow {...requiredProps}>
        <input />
      </OuiFormRow>
    );

    expect(container).toMatchSnapshot();
  });

  test('ties together parts for accessibility', () => {
    const props = {
      label: 'Label',
      helpText: 'Help text',
      isInvalid: true,
      error: ['Error one', 'Error two'],
    };

    const { container } = render(
      <OuiFormRow {...requiredProps} {...props}>
        <input />
      </OuiFormRow>
    );

    const input = container.querySelector('input') as HTMLInputElement;
    const label = container.querySelector('label') as HTMLLabelElement;
    const helpText = container.querySelector('[id*="-help-"]') as HTMLElement;
    const errorTexts = container.querySelectorAll('[id*="-error-"]');

    // Input is labeled by the label.
    expect(input.id).toEqual('generated-id');
    expect(label.getAttribute('for')).toEqual('generated-id');

    // Input is described by help and error text.
    expect(helpText.id).toEqual('generated-id-help-0');
    expect(errorTexts[0].id).toEqual('generated-id-error-0');
    expect(errorTexts[1].id).toEqual('generated-id-error-1');
    expect(input.getAttribute('aria-describedby')).toEqual(
      'generated-id-help-0 generated-id-error-0 generated-id-error-1'
    );
  });

  describe('props', () => {
    test('label is rendered', () => {
      const { container } = render(
        <OuiFormRow label="label">
          <input />
        </OuiFormRow>
      );

      expect(container).toMatchSnapshot();
    });

    test('label append is rendered', () => {
      const { container } = render(
        <OuiFormRow label="label" labelAppend="append">
          <input />
        </OuiFormRow>
      );

      expect(container).toMatchSnapshot();
    });

    test('label renders as a legend and subsquently a fieldset wrapper', () => {
      const { container } = render(
        <OuiFormRow label="label" labelType="legend">
          <input />
        </OuiFormRow>
      );

      expect(container).toMatchSnapshot();
    });

    test('describedByIds is rendered', () => {
      const { container } = render(
        <OuiFormRow describedByIds={['generated-id-additional']}>
          <input />
        </OuiFormRow>
      );

      expect(container).toMatchSnapshot();
    });

    test('id is rendered', () => {
      const { container } = render(
        <OuiFormRow id="id">
          <input />
        </OuiFormRow>
      );

      expect(container).toMatchSnapshot();
    });

    test('isInvalid is rendered', () => {
      const { container } = render(
        <OuiFormRow isInvalid label="label">
          <input />
        </OuiFormRow>
      );

      expect(container).toMatchSnapshot();
    });

    test('error as string is rendered', () => {
      const { container } = render(
        <OuiFormRow error="Error" isInvalid={true}>
          <input />
        </OuiFormRow>
      );

      expect(container).toMatchSnapshot();
    });

    test('error as array is rendered', () => {
      const { container } = render(
        <OuiFormRow error={['Error', 'Error2']} isInvalid={true}>
          <input />
        </OuiFormRow>
      );

      expect(container).toMatchSnapshot();
    });

    test('error is not rendered if isInvalid is false', () => {
      const { container } = render(
        <OuiFormRow error={['Error']} isInvalid={false}>
          <input />
        </OuiFormRow>
      );

      expect(container).toMatchSnapshot();
    });

    test('helpText is rendered', () => {
      const { container } = render(
        <OuiFormRow helpText={<span>This is help text.</span>}>
          <input />
        </OuiFormRow>
      );

      expect(container).toMatchSnapshot();
    });

    test('hasEmptyLabelSpace is rendered', () => {
      const { container } = render(
        <OuiFormRow hasEmptyLabelSpace>
          <input />
        </OuiFormRow>
      );

      expect(container).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const { container } = render(
        <OuiFormRow fullWidth>
          <input />
        </OuiFormRow>
      );

      expect(container).toMatchSnapshot();
    });

    describe('display type', () => {
      DISPLAYS.forEach((display) => {
        test(`${display} is rendered`, () => {
          const { container } = render(
            <OuiFormRow display={display}>
              <input />
            </OuiFormRow>
          );

          expect(container).toMatchSnapshot();
        });
      });
    });
  });

  describe('behavior', () => {
    describe('onFocus', () => {
      test('is called in child', () => {
        const focusMock = jest.fn();

        const { container } = render(
          <OuiFormRow label={<span>Label</span>}>
            <input onFocus={focusMock} />
          </OuiFormRow>
        );

        const input = container.querySelector('input') as HTMLInputElement;
        fireEvent.focus(input);

        expect(focusMock).toBeCalledTimes(1);

        // Ensure the focus event is properly fired on the parent
        // which will pass down to the OuiFormLabel
        expect(container).toMatchSnapshot();
      });

      test('works in parent even if not in child', () => {
        const { container } = render(
          <OuiFormRow label={<span>Label</span>}>
            <input />
          </OuiFormRow>
        );

        const input = container.querySelector('input') as HTMLInputElement;
        fireEvent.focus(input);

        // Ensure the focus event is properly fired on the parent
        // which will pass down to the OuiFormLabel
        expect(container).toMatchSnapshot();
      });
    });

    describe('onBlur', () => {
      test('is called in child', () => {
        const blurMock = jest.fn();

        const { container } = render(
          <OuiFormRow label={<span>Label</span>}>
            <input onBlur={blurMock} />
          </OuiFormRow>
        );

        const input = container.querySelector('input') as HTMLInputElement;
        fireEvent.blur(input);

        expect(blurMock).toBeCalledTimes(1);

        // Ensure the blur event is properly fired on the parent
        // which will pass down to the OuiFormLabel
        expect(container).toMatchSnapshot();
      });

      test('works in parent even if not in child', () => {
        const { container } = render(
          <OuiFormRow label={<span>Label</span>}>
            <input />
          </OuiFormRow>
        );

        const input = container.querySelector('input') as HTMLInputElement;
        fireEvent.blur(input);

        // Ensure the blur event is properly fired on the parent
        // which will pass down to the OuiFormLabel
        expect(container).toMatchSnapshot();
      });
    });
  });
});
