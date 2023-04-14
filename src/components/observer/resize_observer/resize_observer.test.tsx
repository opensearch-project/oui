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

import React, { FunctionComponent, useRef } from 'react';
import { mount } from 'enzyme';
import { OuiResizeObserver, useResizeObserver } from './resize_observer';
import { sleep } from '../../../test';
import { act } from 'react-dom/test-utils';

export async function waitforResizeObserver(period = 30) {
  // `period` defaults to 30 because its the delay used by the ResizeObserver polyfill
  await sleep(period);
}

// OuiResizeObserver and useResizeObserver do not have a fallback for
// environments that do not implement the ResizeObserver API.
// jsdom does not implement ResizeObserver and we therefore
// cannot currently test production functionality of those components.
// Re-enable these tests when test support changes.
describe.skip('testResizeObservers', () => {
  // refactor the tests structure to make sure that `OuiResizeObserver` test can get
  // the proper size of the dom element.
  type GetBoundingClientRect = typeof HTMLElement['prototype']['getBoundingClientRect'];
  let _originalgetBoundingClientRect: undefined | GetBoundingClientRect;
  beforeAll(() => {
    _originalgetBoundingClientRect =
      HTMLElement.prototype.getBoundingClientRect;
    HTMLElement.prototype.getBoundingClientRect = function () {
      // use the length of the element's HTML to represent its height
      return { width: 100, height: this.innerHTML.length } as ReturnType<
        GetBoundingClientRect
      >;
    };
  });
  afterAll(() => {
    HTMLElement.prototype.getBoundingClientRect = _originalgetBoundingClientRect!;
  });

  describe('OuiResizeObserver', () => {
    it('watches for a resize', async () => {
      expect.assertions(2);
      const onResize = jest.fn();

      const Wrapper: FunctionComponent<{}> = ({ children }) => {
        return (
          <OuiResizeObserver onResize={onResize}>
            {(resizeRef: (e: HTMLElement | null) => void) => (
              <div ref={resizeRef}>{children}</div>
            )}
          </OuiResizeObserver>
        );
      };

      const component = mount(<Wrapper children={<div>Hello World</div>} />);

      // Resize observer is expected to fire once on mount
      await waitforResizeObserver();
      expect(onResize).toHaveBeenCalledTimes(1);

      component.setProps({
        children: (
          <div>
            <div>Hello World</div>
            <div>Hello Again</div>
          </div>
        ),
      });

      await waitforResizeObserver();

      // Expect 2 calls because it's called once on mount
      expect(onResize).toHaveBeenCalledTimes(2);
    });
  });

  describe('useResizeObserver', () => {
    it('watches for a resize', async () => {
      expect.assertions(2);

      const Wrapper: FunctionComponent<{}> = jest.fn(({ children }) => {
        const ref = useRef<HTMLDivElement>(null);
        useResizeObserver({ elementRef: ref });
        return <div ref={ref}>{children}</div>;
      });

      const component = mount(<Wrapper children={<div>Hello World</div>} />);

      // Expect the initial render, re-render when the ref is created, and a 3rd for the onresize callback
      await act(() => waitforResizeObserver());
      expect(Wrapper).toHaveBeenCalledTimes(3);

      component.setProps({
        children: (
          <div>
            <div>Hello World</div>
            <div>Hello Again</div>
          </div>
        ),
      });

      await waitforResizeObserver();

      // Expect two more calls because children changed (re-render) & resize observer reacted
      expect(Wrapper).toHaveBeenCalledTimes(5);
    });
  });
});
