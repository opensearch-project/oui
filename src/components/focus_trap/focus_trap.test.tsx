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

import React, { EventHandler } from 'react';
import { render, mount } from 'enzyme';

import { findTestSubject, takeMountedSnapshot } from '../../test';

import { OuiEvent } from '../outside_click_detector/outside_click_detector';
import { OuiFocusTrap } from './focus_trap';
import { OuiPortal } from '../portal';

describe('OuiFocusTrap', () => {
  test('is rendered', () => {
    const component = mount(
      <OuiFocusTrap>
        <div />
      </OuiFocusTrap>
    );

    expect(
      takeMountedSnapshot(component, { hasArrayOutput: true })
    ).toMatchSnapshot();
  });

  test('can be disabled', () => {
    const component = render(
      <OuiFocusTrap disabled>
        <div />
      </OuiFocusTrap>
    );

    expect(component).toMatchSnapshot();
  });

  test('accepts className and style', () => {
    const component = render(
      <OuiFocusTrap className="testing" style={{ height: '100%' }}>
        <div />
      </OuiFocusTrap>
    );

    expect(component).toMatchSnapshot();
  });

  describe('behavior', () => {
    describe('focus', () => {
      test('is set on the first focusable element by default', () => {
        const component = mount(
          <div>
            <input data-test-subj="outside" />
            <OuiFocusTrap>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
              </div>
            </OuiFocusTrap>
          </div>
        );

        expect(findTestSubject(component, 'input').getDOMNode()).toBe(
          document.activeElement
        );
      });

      test('will blur focus when negating `autoFocus`', () => {
        mount(
          <div>
            <input data-test-subj="outside" />
            <OuiFocusTrap autoFocus={false}>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
              </div>
            </OuiFocusTrap>
          </div>
        );

        expect(document.body).toBe(document.activeElement);
      });

      test('is set on the element identified by `data-autofocus`', () => {
        const component = mount(
          <div>
            <input data-test-subj="outside" />
            <OuiFocusTrap>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-autofocus data-test-subj="input2" />
              </div>
            </OuiFocusTrap>
          </div>
        );

        expect(findTestSubject(component, 'input2').getDOMNode()).toBe(
          document.activeElement
        );
      });
    });

    // skipping because react-focus-on / react-focus-lock uses two handlers,
    // one on the container to record what element was clicked and a second
    // on the document, checking if the event target is the same on both
    // because enzyme doesn't bubble the event, it is difficult to simulate
    // the browser behaviour - we can revisit these tests when we have an
    // actual browser environment
    describe.skip('clickOutsideDisables', () => {
      // enzyme doesn't mount the components into the global jsdom `document`
      // but that's where the click detector listener is,
      // pass the top-level mounted component's click event on to document
      const triggerDocumentMouseDown: EventHandler<any> = (
        e: React.MouseEvent
      ) => {
        const event = new Event('mousedown') as OuiEvent;
        event.ouiGeneratedBy = ((e.nativeEvent as unknown) as OuiEvent).ouiGeneratedBy;
        document.dispatchEvent(event);
      };

      const triggerDocumentMouseUp: EventHandler<any> = (
        e: React.MouseEvent
      ) => {
        const event = new Event('mousedown') as OuiEvent;
        event.ouiGeneratedBy = ((e.nativeEvent as unknown) as OuiEvent).ouiGeneratedBy;
        document.dispatchEvent(event);
      };

      test('trap remains enabled when false', () => {
        const component = mount(
          <div
            onMouseDown={triggerDocumentMouseDown}
            onMouseUp={triggerDocumentMouseUp}>
            <OuiFocusTrap>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
              </div>
            </OuiFocusTrap>
            <button data-test-subj="outside" />
          </div>
        );

        // The existence of `data-focus-lock-disabled=false` indicates that the trap is enabled.
        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
        findTestSubject(component, 'outside').simulate('mousedown');
        findTestSubject(component, 'outside').simulate('mouseup');
        // `react-focus-lock` relies on real DOM events to move focus about.
        // Exposed attributes are the most consistent way to attain its state.
        // See https://github.com/theKashey/react-focus-lock/blob/master/_tests/FocusLock.spec.js for the lib in use
        // Trap remains enabled
        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
      });

      test('trap remains enabled after internal clicks', () => {
        const component = mount(
          <div
            onMouseDown={triggerDocumentMouseDown}
            onMouseUp={triggerDocumentMouseUp}>
            <OuiFocusTrap clickOutsideDisables>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
              </div>
            </OuiFocusTrap>
            <button data-test-subj="outside" />
          </div>
        );

        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
        findTestSubject(component, 'input2').simulate('mousedown');
        findTestSubject(component, 'input2').simulate('mouseup');
        // Trap remains enabled
        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
      });

      test('trap remains enabled after internal portal clicks', () => {
        const component = mount(
          <div
            onMouseDown={triggerDocumentMouseDown}
            onMouseUp={triggerDocumentMouseUp}>
            <OuiFocusTrap clickOutsideDisables>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
                <OuiPortal>
                  <input data-test-subj="input3" />
                </OuiPortal>
              </div>
            </OuiFocusTrap>
            <button data-test-subj="outside" />
          </div>
        );

        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
        findTestSubject(component, 'input3').simulate('mousedown');
        findTestSubject(component, 'input3').simulate('mouseup');
        // Trap remains enabled
        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
      });

      test('trap becomes disabled on outside clicks', () => {
        const component = mount(
          <div
            onMouseDown={triggerDocumentMouseDown}
            onMouseUp={triggerDocumentMouseUp}>
            <OuiFocusTrap clickOutsideDisables>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
              </div>
            </OuiFocusTrap>
            <button data-test-subj="outside" />
          </div>
        );

        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
        findTestSubject(component, 'outside').simulate('mousedown');
        findTestSubject(component, 'outside').simulate('mouseup');
        // Trap becomes disabled
        expect(component.find('[data-focus-lock-disabled=false]').length).toBe(
          0
        );
      });
    });
  });
});
