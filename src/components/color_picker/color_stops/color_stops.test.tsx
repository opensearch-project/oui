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
import { render, fireEvent, act } from '@testing-library/react';

import { OuiColorStops } from './color_stops';

import {
  VISUALIZATION_COLORS,
  DEFAULT_VISUALIZATION_COLOR,
  keys,
} from '../../../services';
import { requiredProps } from '../../../test';

jest.mock('../../portal', () => ({
  OuiPortal: ({ children }: { children: any }) => children,
}));

const onChange = jest.fn();

const colorStopsArray = [
  { stop: 0, color: '#FF0000' },
  { stop: 25, color: '#00FF00' },
  { stop: 35, color: '#0000FF' },
];

// Note: providing container to optionally mount to document
let container: HTMLDivElement | null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  container?.parentNode?.removeChild(container);
  container = null;
});

// Note: A couple tests that would be nice, but can't be accomplished at the moment:
// - Tab to bypass thumbs (tabindex="-1" not respected)
// - Drag to reposition thumb (we can't get real page position info)

test('renders OuiColorStops', () => {
  const { container } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );
  expect(container).toMatchSnapshot();
});

test('renders free-range OuiColorStops', () => {
  const { container } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={[]}
      {...requiredProps}
    />
  );
  expect(container).toMatchSnapshot();
});

test('renders min-only OuiColorStops', () => {
  const { container } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={[]}
      min={0}
      {...requiredProps}
    />
  );
  expect(container).toMatchSnapshot();
});

test('renders max-only OuiColorStops', () => {
  const { container } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={[]}
      max={100}
      {...requiredProps}
    />
  );
  expect(container).toMatchSnapshot();
});

test('renders compressed OuiColorStops', () => {
  const { container } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      compressed={true}
      {...requiredProps}
    />
  );
  expect(container).toMatchSnapshot();
});

test('renders readOnly OuiColorStops', () => {
  const { container } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      readOnly={true}
      {...requiredProps}
    />
  );
  expect(container).toMatchSnapshot();
});

test('renders fullWidth OuiColorStops', () => {
  const { container } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      fullWidth={true}
      {...requiredProps}
    />
  );
  expect(container).toMatchSnapshot();
});

test('renders disabled OuiColorStops', () => {
  const { container } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      disabled={true}
      {...requiredProps}
    />
  );
  expect(container).toMatchSnapshot();
});

test('renders fixed stop OuiColorStops', () => {
  const { container } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      stopType="fixed"
      {...requiredProps}
    />
  );
  expect(container).toMatchSnapshot();
});

test('renders stepped stop OuiColorStops', () => {
  const { container } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      stopType="stepped"
      stepNumber={10}
      {...requiredProps}
    />
  );
  const progressElement = container.querySelector(
    '.ouiRangeHighlight__progress'
  ) as HTMLElement;
  expect(progressElement?.style).toMatchSnapshot();
});

test('renders empty OuiColorStops', () => {
  const { container } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={[]}
      min={0}
      max={100}
      {...requiredProps}
    />
  );
  expect(container).toMatchSnapshot();
});

test('popover color selector is shown when the thumb is clicked', () => {
  const { container } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  const thumb = container.querySelector(
    '[data-test-subj="ouiColorStopThumb"]'
  ) as HTMLElement;
  fireEvent.mouseDown(thumb, { pageX: 0, pageY: 0 });
  const colorSelector = container.querySelector(
    '[data-test-subj="ouiColorStopPopover"]'
  );
  expect(colorSelector).toBeTruthy();
});

test('passes value input props to number input', () => {
  const { container } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      valueInputProps={{
        append: '%',
      }}
      {...requiredProps}
    />
  );

  const thumb = container.querySelector(
    '[data-test-subj="ouiColorStopThumb"]'
  ) as HTMLElement;
  fireEvent.mouseDown(thumb, { pageX: 0, pageY: 0 });
  const appendElement = container.querySelector(
    '.ouiFormControlLayout__append'
  );
  expect(appendElement?.textContent).toEqual('%');
});

test('stop input updates stops', () => {
  const { container } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  const thumb = container.querySelector(
    '[data-test-subj="ouiColorStopThumb"]'
  ) as HTMLElement;
  fireEvent.mouseDown(thumb, { pageX: 0, pageY: 0 });
  const numberInput = container.querySelector(
    'input[type="number"]'
  ) as HTMLInputElement;
  expect(numberInput).toBeTruthy();
  fireEvent.change(numberInput, { target: { value: '10' } });
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(
    [
      { color: '#FF0000', stop: 10 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    false
  );
});

test('stop input updates stops with error prevention (reset to bounds)', () => {
  const { container } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  const thumb = container.querySelector(
    '[data-test-subj="ouiColorStopThumb"]'
  ) as HTMLElement;
  fireEvent.mouseDown(thumb, { pageX: 0, pageY: 0 });
  const numberInput = container.querySelector(
    'input[type="number"]'
  ) as HTMLInputElement;
  fireEvent.change(numberInput, { target: { value: '1000' } });
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(
    [
      { color: '#FF0000', stop: 100 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    false
  );
});

test('hex input updates stops', () => {
  const { container } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  const thumb = container.querySelector(
    '[data-test-subj="ouiColorStopThumb"]'
  ) as HTMLElement;
  fireEvent.mouseDown(thumb, { pageX: 0, pageY: 0 });
  const textInput = container.querySelector(
    'input[type="text"]'
  ) as HTMLInputElement;
  expect(textInput).toBeTruthy();
  fireEvent.change(textInput, { target: { value: '#FFFFFF' } });
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(
    [
      { color: '#FFFFFF', stop: 0 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    false
  );
});

test('hex input updates stops with error', () => {
  const { container } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  const thumb = container.querySelector(
    '[data-test-subj="ouiColorStopThumb"]'
  ) as HTMLElement;
  fireEvent.mouseDown(thumb, { pageX: 0, pageY: 0 });
  const textInput = container.querySelector(
    'input[type="text"]'
  ) as HTMLInputElement;
  fireEvent.change(textInput, { target: { value: '#FFFFF' } });
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(
    [
      { color: '#FFFFF', stop: 0 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    true // isInvalid
  );
});

test('picker updates stops', () => {
  const { container } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  const thumb = container.querySelector(
    '[data-test-subj="ouiColorStopThumb"]'
  ) as HTMLElement;
  fireEvent.mouseDown(thumb, { pageX: 0, pageY: 0 });
  const swatches = container.querySelectorAll(
    'button.ouiColorPicker__swatchSelect'
  );
  expect(swatches.length).toBe(VISUALIZATION_COLORS.length);
  fireEvent.click(swatches[0]);
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(
    [
      { color: VISUALIZATION_COLORS[0], stop: 0 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    false
  );
});

test('thumb focus changes', () => {
  const { container: rtlContainer } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />,
    { container: document.body.appendChild(document.createElement('div')) }
  );

  const wrapper = rtlContainer.querySelector(
    '[data-test-subj="ouiColorStops"]'
  ) as HTMLElement;
  const thumbs = rtlContainer.querySelectorAll(
    '[data-test-subj="ouiColorStopThumb"]'
  );

  act(() => {
    wrapper.focus();
  });

  act(() => {
    fireEvent.keyDown(wrapper, { key: keys.ARROW_DOWN });
  });

  expect(thumbs[0]).toEqual(document.activeElement);

  act(() => {
    fireEvent.keyDown(thumbs[0], { key: keys.ARROW_DOWN });
  });

  expect(thumbs[1]).toEqual(document.activeElement);
});

test('thumb direction movement', () => {
  const { container: rtlContainer } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />,
    { container: document.body.appendChild(document.createElement('div')) }
  );

  const wrapper = rtlContainer.querySelector(
    '[data-test-subj="ouiColorStops"]'
  ) as HTMLElement;
  const thumbs = rtlContainer.querySelectorAll(
    '[data-test-subj="ouiColorStopThumb"]'
  );

  act(() => {
    wrapper.focus();
  });

  act(() => {
    fireEvent.keyDown(wrapper, { key: keys.ARROW_DOWN });
  });

  expect(thumbs[0]).toEqual(document.activeElement);

  act(() => {
    fireEvent.keyDown(thumbs[0], { key: keys.ARROW_RIGHT });
  });

  expect(onChange).toBeCalledWith(
    [
      { color: '#FF0000', stop: 1 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    false
  );

  act(() => {
    fireEvent.keyDown(thumbs[0], { key: keys.ARROW_LEFT });
  });

  expect(onChange).toBeCalledWith(
    [
      { color: '#FF0000', stop: 0 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    false
  );
});

test('add new thumb via keyboard', () => {
  const { container } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  const wrapper = container.querySelector(
    '[data-test-subj="ouiColorStops"]'
  ) as HTMLElement;

  act(() => {
    wrapper.focus();
  });

  act(() => {
    fireEvent.keyDown(wrapper, { key: keys.ENTER });
  });

  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(
    [
      { color: '#FF0000', stop: 0 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
      { color: DEFAULT_VISUALIZATION_COLOR, stop: 45 },
    ],
    false
  );
});

test('add new thumb via click', () => {
  const { container } = render(
    <OuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  const wrapper = container.querySelector(
    '[data-test-subj="ouiColorStopsAdd"]'
  ) as HTMLElement;
  fireEvent.click(wrapper, { pageX: 45, pageY: 0 });
  expect(onChange).toBeCalled();
  // This is a very odd expectation.
  // But we can't get actual page positions in this environment (no getBoundingClientRect)
  // So we'll expect the _correct_ color and _incorrect_ stop value (NaN),
  // with the `isInvalid` arg _correctly_ true as a result.
  expect(onChange).toBeCalledWith(
    [
      { color: '#FF0000', stop: 0 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
      { color: DEFAULT_VISUALIZATION_COLOR, stop: NaN },
    ],
    true // isInvalid
  );
});
