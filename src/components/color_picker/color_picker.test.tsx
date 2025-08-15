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

import { OuiColorPicker } from './color_picker';
import { VISUALIZATION_COLORS, keys } from '../../services';
import { requiredProps } from '../../test';

jest.mock('../portal', () => ({
  OuiPortal: ({ children }: { children: any }) => children,
}));

const onChange = jest.fn();

beforeEach(() => {
  onChange.mockClear();
});

test('renders OuiColorPicker', () => {
  const { container } = render(
    <OuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );
  expect(container).toMatchSnapshot();
});

test('renders compressed OuiColorPicker', () => {
  const { container } = render(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      compressed={true}
      {...requiredProps}
    />
  );
  expect(container).toMatchSnapshot();
});

test('renders readOnly OuiColorPicker', () => {
  const { container } = render(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      readOnly={true}
      {...requiredProps}
    />
  );
  expect(container).toMatchSnapshot();
});

test('renders fullWidth OuiColorPicker', () => {
  const { container } = render(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      fullWidth={true}
      {...requiredProps}
    />
  );
  expect(container).toMatchSnapshot();
});

test('renders disabled OuiColorPicker', () => {
  const { container } = render(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      disabled={true}
      {...requiredProps}
    />
  );
  expect(container).toMatchSnapshot();
});

test('renders inline OuiColorPicker', () => {
  const { container } = render(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      display="inline"
      {...requiredProps}
    />
  );
  expect(container).toMatchSnapshot();
});

test('renders a OuiColorPicker with a prepend and append', () => {
  const { container } = render(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      prepend="prepend"
      append="append"
      {...requiredProps}
    />
  );

  expect(container).toMatchSnapshot();
});

test('renders a OuiColorPicker with an alpha range selector', () => {
  const { container } = render(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      showAlpha={true}
      {...requiredProps}
    />
  );

  expect(container).toMatchSnapshot();
});

test('renders OuiColorPicker with an empty swatch when color is null', () => {
  const { container } = render(
    <OuiColorPicker onChange={onChange} color={null} {...requiredProps} />
  );
  expect(container).toMatchSnapshot();
});

test('renders OuiColorPicker with an empty swatch when color is ""', () => {
  const { container } = render(
    <OuiColorPicker onChange={onChange} color={''} {...requiredProps} />
  );
  expect(container).toMatchSnapshot();
});

test('renders OuiColorPicker with a color swatch when color is defined', () => {
  const { container } = render(
    <OuiColorPicker onChange={onChange} color={'#ffffff'} {...requiredProps} />
  );
  expect(container).toMatchSnapshot();
});

test('renders OuiColorPicker with a custom placeholder', () => {
  const { container } = render(
    <OuiColorPicker onChange={onChange} placeholder="Auto" {...requiredProps} />
  );
  expect(container).toMatchSnapshot();
});

test('renders OuiColorPicker with a clearable input', () => {
  const { container } = render(
    <OuiColorPicker
      onChange={onChange}
      color={'#ffeedd'}
      isClearable={true}
      {...requiredProps}
    />
  );
  expect(container).toMatchSnapshot();
});

test('popover color selector is not shown by default', () => {
  const { container } = render(
    <OuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );

  const colorSelector = container.querySelector(
    '[data-test-subj="ouiColorPickerPopover"]'
  );
  expect(colorSelector).toBeNull();
});

test('popover color selector is shown when the input is clicked', () => {
  const onFocusHandler = jest.fn();
  const { container } = render(
    <OuiColorPicker
      onChange={onChange}
      onFocus={onFocusHandler}
      color="#ffeedd"
      {...requiredProps}
    />
  );

  const anchor = container.querySelector(
    '[data-test-subj^="ouiColorPickerAnchor"]'
  ) as HTMLElement;
  fireEvent.click(anchor);

  expect(onFocusHandler).toHaveBeenCalled();
  // The popover content is rendered in document.body due to portal
  const colorSelector = document.body.querySelector(
    '[data-test-subj="ouiColorPickerPopover"]'
  );
  expect(colorSelector).not.toBeNull();
});

test('popover color selector is hidden when the ESC key pressed', () => {
  const onBlurHandler = jest.fn();
  const { container } = render(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      onBlur={onBlurHandler}
      {...requiredProps}
    />
  );

  const anchor = container.querySelector(
    '[data-test-subj^="ouiColorPickerAnchor"]'
  ) as HTMLElement;
  fireEvent.click(anchor);

  const popover = document.body.querySelector(
    '[data-test-subj="ouiColorPickerPopover"]'
  ) as HTMLElement;
  fireEvent.keyDown(popover, { key: keys.ESCAPE });

  // Portal removal not working with Jest. The blur handler is called just before the portal would be removed.
  expect(onBlurHandler).toHaveBeenCalled();
});

test('popover color selector is hidden and input regains focus when the ENTER key pressed', () => {
  const onBlurHandler = jest.fn();
  const { container } = render(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      onBlur={onBlurHandler}
      {...requiredProps}
    />
  );

  // Get the input element and spy on its focus method
  const inputElement = container.querySelector(
    '[data-test-subj^="ouiColorPickerAnchor"]'
  ) as HTMLInputElement;
  const focusSpy = jest.spyOn(inputElement, 'focus');

  fireEvent.click(inputElement);

  const saturation = document.body.querySelector(
    '[data-test-subj="ouiSaturation"]'
  ) as HTMLElement;
  fireEvent.keyDown(saturation, { key: keys.ENTER });

  // Check if focus was called instead of checking document.activeElement
  expect(focusSpy).toHaveBeenCalled();

  // Portal removal not working with Jest. The blur handler is called just before the portal would be removed.
  expect(onBlurHandler).toHaveBeenCalled();
});

test('Setting a new color calls onChange', () => {
  const { container } = render(
    <OuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );

  const anchor = container.querySelector(
    '[data-test-subj^="ouiColorPickerAnchor"]'
  ) as HTMLElement;
  fireEvent.click(anchor);

  // The input is in the popover which is rendered in document.body
  const inputs = document.body.querySelectorAll('input[type="text"]');
  expect(inputs.length).toBeGreaterThan(0);

  fireEvent.change(inputs[0] as HTMLElement, { target: { value: '#000000' } });

  expect(onChange).toHaveBeenCalled();
  expect(onChange).toHaveBeenCalledWith('#000000', {
    hex: '#000000',
    isValid: true,
    rgba: [0, 0, 0, 1],
  });
});

test('Clicking a swatch calls onChange', () => {
  const { container } = render(
    <OuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );

  const anchor = container.querySelector(
    '[data-test-subj^="ouiColorPickerAnchor"]'
  ) as HTMLElement;
  fireEvent.click(anchor);

  const swatches = document.body.querySelectorAll(
    'button.ouiColorPicker__swatchSelect'
  );
  expect(swatches.length).toBe(VISUALIZATION_COLORS.length);

  fireEvent.click(swatches[0] as HTMLElement);

  expect(onChange).toHaveBeenCalled();
  expect(onChange).toHaveBeenCalledWith(VISUALIZATION_COLORS[0], {
    hex: '#54b399',
    isValid: true,
    rgba: [84, 179, 153, 1],
  });
});

test('Setting a new alpha value calls onChange', () => {
  const { container } = render(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      showAlpha={true}
      {...requiredProps}
    />
  );

  const anchor = container.querySelector(
    '[data-test-subj^="ouiColorPickerAnchor"]'
  ) as HTMLElement;
  fireEvent.click(anchor);

  // Slider - alpha range input
  const range = document.body.querySelector(
    'input[data-test-subj="ouiColorPickerAlpha"][type=range]'
  ) as HTMLInputElement;
  fireEvent.change(range, { target: { value: '50' } });

  expect(onChange).toHaveBeenCalled();
  expect(onChange).toHaveBeenCalledWith('#ffeedd80', {
    hex: '#ffeedd80',
    isValid: true,
    rgba: [255, 238, 221, 0.5],
  });

  // Number input
  const numberInput = document.body.querySelector(
    'input[data-test-subj="ouiColorPickerAlpha"][type=number]'
  ) as HTMLInputElement;
  fireEvent.change(numberInput, { target: { value: '25' } });

  expect(onChange).toHaveBeenCalled();
  expect(onChange).toHaveBeenCalledWith('#ffeedd40', {
    hex: '#ffeedd40',
    isValid: true,
    rgba: [255, 238, 221, 0.25],
  });
});

test('Clicking the "clear" button calls onChange', () => {
  const { container } = render(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      isClearable={true}
      {...requiredProps}
    />
  );

  const clearButton = container.querySelector(
    '.ouiFormControlLayoutClearButton'
  ) as HTMLElement;
  fireEvent.click(clearButton);

  expect(onChange).toHaveBeenCalled();
  expect(onChange).toHaveBeenCalledWith('', {
    hex: '',
    isValid: false,
    rgba: [NaN, NaN, NaN, 1],
  });
});

test('default mode does renders child components', () => {
  const { container } = render(
    <OuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );

  const anchor = container.querySelector(
    '[data-test-subj^="ouiColorPickerAnchor"]'
  ) as HTMLElement;
  fireEvent.click(anchor);

  const saturation = document.body.querySelector(
    '[data-test-subj="ouiSaturation"]'
  );
  expect(saturation).not.toBeNull();

  const hue = document.body.querySelector('.ouiHue');
  expect(hue).not.toBeNull();

  const swatches = document.body.querySelectorAll(
    'button.ouiColorPicker__swatchSelect'
  );
  expect(swatches.length).toBe(VISUALIZATION_COLORS.length);
});

test('swatch mode does not render OuiSaturation or OuiHue', () => {
  const { container } = render(
    <OuiColorPicker
      onChange={onChange}
      mode="swatch"
      color="#ffeedd"
      {...requiredProps}
    />
  );

  const anchor = container.querySelector(
    '[data-test-subj^="ouiColorPickerAnchor"]'
  ) as HTMLElement;
  fireEvent.click(anchor);

  const saturation = document.body.querySelector(
    '[data-test-subj="ouiSaturation"]'
  );
  expect(saturation).toBeNull();

  const hue = document.body.querySelector('.ouiHue');
  expect(hue).toBeNull();

  const swatches = document.body.querySelectorAll(
    'button.ouiColorPicker__swatchSelect'
  );
  expect(swatches.length).toBe(VISUALIZATION_COLORS.length);
});

test('picker mode does not render swatches', () => {
  const { container } = render(
    <OuiColorPicker
      onChange={onChange}
      mode="picker"
      color="#ffeedd"
      {...requiredProps}
    />
  );

  const anchor = container.querySelector(
    '[data-test-subj^="ouiColorPickerAnchor"]'
  ) as HTMLElement;
  fireEvent.click(anchor);

  const saturation = document.body.querySelector(
    '[data-test-subj="ouiSaturation"]'
  );
  expect(saturation).not.toBeNull();

  const hue = document.body.querySelector('.ouiHue');
  expect(hue).not.toBeNull();

  const swatches = document.body.querySelectorAll(
    'button.ouiColorPicker__swatchSelect'
  );
  expect(swatches.length).toBe(0);
});

test('secondaryInputDisplay `top` has a popover panel input', () => {
  const { container } = render(
    <OuiColorPicker
      onChange={onChange}
      secondaryInputDisplay="top"
      color="#ffeedd"
      {...requiredProps}
    />
  );

  const anchor = container.querySelector(
    '[data-test-subj^="ouiColorPickerAnchor"]'
  ) as HTMLElement;
  fireEvent.click(anchor);

  const inputTop = document.body.querySelector(
    '[data-test-subj="ouiColorPickerInput_top"]'
  );
  const inputBottom = document.body.querySelector(
    '[data-test-subj="ouiColorPickerInput_bottom"]'
  );
  expect(inputTop).not.toBeNull();
  expect(inputBottom).toBeNull();
});

test('secondaryInputDisplay `bottom` has a popover panel input', () => {
  const { container } = render(
    <OuiColorPicker
      onChange={onChange}
      secondaryInputDisplay="bottom"
      color="#ffeedd"
      {...requiredProps}
    />
  );

  const anchor = container.querySelector(
    '[data-test-subj^="ouiColorPickerAnchor"]'
  ) as HTMLElement;
  fireEvent.click(anchor);

  const inputTop = document.body.querySelector(
    '[data-test-subj="ouiColorPickerInput_top"]'
  );
  const inputBottom = document.body.querySelector(
    '[data-test-subj="ouiColorPickerInput_bottom"]'
  );
  expect(inputTop).toBeNull();
  expect(inputBottom).not.toBeNull();
});
