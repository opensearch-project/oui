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
import { render, mount } from 'enzyme';

import { OuiColorPicker } from './color_picker';
import { VISUALIZATION_COLORS, keys } from '../../services';
import { requiredProps, findTestSubject, sleep } from '../../test';

jest.mock('../portal', () => ({
  OuiPortal: ({ children }: { children: any }) => children,
}));

const onChange = jest.fn();

test('renders OuiColorPicker', () => {
  const colorPicker = render(
    <OuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders compressed OuiColorPicker', () => {
  const colorPicker = render(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      compressed={true}
      {...requiredProps}
    />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders readOnly OuiColorPicker', () => {
  const colorPicker = render(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      readOnly={true}
      {...requiredProps}
    />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders fullWidth OuiColorPicker', () => {
  const colorPicker = render(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      fullWidth={true}
      {...requiredProps}
    />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders disabled OuiColorPicker', () => {
  const colorPicker = render(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      disabled={true}
      {...requiredProps}
    />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders inline OuiColorPicker', () => {
  const colorPicker = render(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      display="inline"
      {...requiredProps}
    />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders a OuiColorPicker with a prepend and append', () => {
  const component = render(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      prepend="prepend"
      append="append"
      {...requiredProps}
    />
  );

  expect(component).toMatchSnapshot();
});

test('renders a OuiColorPicker with an alpha range selector', () => {
  const component = render(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      showAlpha={true}
      {...requiredProps}
    />
  );

  expect(component).toMatchSnapshot();
});

test('renders OuiColorPicker with an empty swatch when color is null', () => {
  const colorPicker = render(
    <OuiColorPicker onChange={onChange} color={null} {...requiredProps} />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders OuiColorPicker with an empty swatch when color is ""', () => {
  const colorPicker = render(
    <OuiColorPicker onChange={onChange} color={''} {...requiredProps} />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders OuiColorPicker with a color swatch when color is defined', () => {
  const colorPicker = render(
    <OuiColorPicker onChange={onChange} color={'#ffffff'} {...requiredProps} />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders OuiColorPicker with a custom placeholder', () => {
  const colorPicker = render(
    <OuiColorPicker onChange={onChange} placeholder="Auto" {...requiredProps} />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders OuiColorPicker with a clearable input', () => {
  const colorPicker = render(
    <OuiColorPicker
      onChange={onChange}
      color={'#ffeedd'}
      isClearable={true}
      {...requiredProps}
    />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('popover color selector is not shown by default', () => {
  const colorPicker = mount(
    <OuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );

  const colorSelector = findTestSubject(colorPicker, 'ouiColorPickerPopover');
  expect(colorSelector.length).toBe(0);
});

test('popover color selector is shown when the input is clicked', () => {
  const onFocusHandler = jest.fn();
  const colorPicker = mount(
    <OuiColorPicker
      onChange={onChange}
      onFocus={onFocusHandler}
      color="#ffeedd"
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'ouiColorPickerAnchor').simulate('click');
  expect(onFocusHandler).toBeCalled();
  const colorSelector = findTestSubject(colorPicker, 'ouiColorPickerPopover');
  expect(colorSelector.length).toBe(1);
});

test('popover color selector is hidden when the ESC key pressed', async () => {
  const onBlurHandler = jest.fn();
  const colorPicker = mount(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      onBlur={onBlurHandler}
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'ouiColorPickerAnchor').simulate('click');
  await sleep();
  findTestSubject(colorPicker, 'ouiColorPickerPopover').simulate('keydown', {
    key: keys.ESCAPE,
  });
  // Portal removal not working with Jest. The blur handler is called just before the portal would be removed.
  expect(onBlurHandler).toBeCalled();
});

test('popover color selector is hidden and input regains focus when the ENTER key pressed', () => {
  const onBlurHandler = jest.fn();
  const colorPicker = mount(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      onBlur={onBlurHandler}
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'ouiColorPickerAnchor').simulate('click');
  findTestSubject(colorPicker, 'ouiSaturation').simulate('keydown', {
    key: keys.ENTER,
  });
  expect(
    findTestSubject(colorPicker, 'ouiColorPickerAnchor').getDOMNode()
  ).toEqual(document.activeElement);
  // Portal removal not working with Jest. The blur handler is called just before the portal would be removed.
  expect(onBlurHandler).toBeCalled();
});

test('Setting a new color calls onChange', () => {
  const colorPicker = mount(
    <OuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );

  findTestSubject(colorPicker, 'ouiColorPickerAnchor').simulate('click');
  const event = { target: { value: '#000000' } };
  const inputs = colorPicker.find('input[type="text"]');
  expect(inputs.length).toBe(1);
  inputs.simulate('change', event);
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith('#000000', {
    hex: '#000000',
    isValid: true,
    rgba: [0, 0, 0, 1],
  });
});

test('Clicking a swatch calls onChange', () => {
  const colorPicker = mount(
    <OuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );

  findTestSubject(colorPicker, 'ouiColorPickerAnchor').simulate('click');
  const swatches = colorPicker.find('button.ouiColorPicker__swatchSelect');
  expect(swatches.length).toBe(VISUALIZATION_COLORS.length);
  swatches.first().simulate('click');
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(VISUALIZATION_COLORS[0], {
    hex: '#54b399',
    isValid: true,
    rgba: [84, 179, 153, 1],
  });
});

test('Setting a new alpha value calls onChange', () => {
  const colorPicker = mount(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      showAlpha={true}
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'ouiColorPickerAnchor').simulate('click');
  // Slider
  const alpha = findTestSubject(colorPicker, 'ouiColorPickerAlpha');
  const event1 = { target: { value: '50' } };
  const range = alpha.first(); // input[type=range]
  range.simulate('change', event1);
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith('#ffeedd80', {
    hex: '#ffeedd80',
    isValid: true,
    rgba: [255, 238, 221, 0.5],
  });
  // Number input
  const event2 = { target: { value: '25' } };
  const input = alpha.at(1); // input[type=number]
  input.simulate('change', event2);
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith('#ffeedd40', {
    hex: '#ffeedd40',
    isValid: true,
    rgba: [255, 238, 221, 0.25],
  });
});

test('Clicking the "clear" button calls onChange', () => {
  const colorPicker = mount(
    <OuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      isClearable={true}
      {...requiredProps}
    />
  );

  colorPicker.find('.ouiFormControlLayoutClearButton').simulate('click');
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith('', {
    hex: '',
    isValid: false,
    rgba: [NaN, NaN, NaN, 1],
  });
});

test('default mode does renders child components', () => {
  const colorPicker = mount(
    <OuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );

  findTestSubject(colorPicker, 'ouiColorPickerAnchor').simulate('click');
  const saturation = findTestSubject(colorPicker, 'ouiSaturation');
  expect(saturation.length).toBe(1);
  const hue = colorPicker.find('OuiHue');
  expect(hue.length).toBe(1);
  const swatches = colorPicker.find('button.ouiColorPicker__swatchSelect');
  expect(swatches.length).toBe(VISUALIZATION_COLORS.length);
});

test('swatch mode does not render OuiSaturation or OuiHue', () => {
  const colorPicker = mount(
    <OuiColorPicker
      onChange={onChange}
      mode="swatch"
      color="#ffeedd"
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'ouiColorPickerAnchor').simulate('click');
  const saturation = colorPicker.find('OuiSaturation');
  expect(saturation.length).toBe(0);
  const hue = colorPicker.find('OuiHue');
  expect(hue.length).toBe(0);
  const swatches = colorPicker.find('button.ouiColorPicker__swatchSelect');
  expect(swatches.length).toBe(VISUALIZATION_COLORS.length);
});

test('picker mode does not render swatches', () => {
  const colorPicker = mount(
    <OuiColorPicker
      onChange={onChange}
      mode="picker"
      color="#ffeedd"
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'ouiColorPickerAnchor').simulate('click');
  const saturation = findTestSubject(colorPicker, 'ouiSaturation');
  expect(saturation.length).toBe(1);
  const hue = colorPicker.find('OuiHue');
  expect(hue.length).toBe(1);
  const swatches = colorPicker.find('button.ouiColorPicker__swatchSelect');
  expect(swatches.length).toBe(0);
});

test('secondaryInputDisplay `top` has a popover panel input', () => {
  const colorPicker = mount(
    <OuiColorPicker
      onChange={onChange}
      secondaryInputDisplay="top"
      color="#ffeedd"
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'ouiColorPickerAnchor').simulate('click');
  const inputTop = findTestSubject(colorPicker, 'ouiColorPickerInput_top');
  const inputBottom = findTestSubject(
    colorPicker,
    'ouiColorPickerInput_bottom'
  );
  expect(inputTop.length).toBe(1);
  expect(inputBottom.length).toBe(0);
});

test('secondaryInputDisplay `bottom` has a popover panel input', () => {
  const colorPicker = mount(
    <OuiColorPicker
      onChange={onChange}
      secondaryInputDisplay="bottom"
      color="#ffeedd"
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'ouiColorPickerAnchor').simulate('click');
  const inputTop = findTestSubject(colorPicker, 'ouiColorPickerInput_top');
  const inputBottom = findTestSubject(
    colorPicker,
    'ouiColorPickerInput_bottom'
  );
  expect(inputTop.length).toBe(0);
  expect(inputBottom.length).toBe(1);
});
