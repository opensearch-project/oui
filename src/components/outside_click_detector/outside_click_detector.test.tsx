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

import { OuiOutsideClickDetector, OuiEvent } from './outside_click_detector';

jest.mock('./../../services/accessibility', () => {
  return jest.requireActual('./../../services/accessibility');
});

describe('OuiOutsideClickDetector', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiOutsideClickDetector onOutsideClick={() => {}}>
        <div />
      </OuiOutsideClickDetector>
    );

    expect(container).toMatchSnapshot();
  });

  describe('behavior', () => {
    test('nested detectors', () => {
      const unrelatedDetector = jest.fn();
      const parentDetector = jest.fn();
      const childDetector = jest.fn();

      render(
        <div>
          <div>
            <OuiOutsideClickDetector onOutsideClick={parentDetector}>
              <div>
                <OuiOutsideClickDetector onOutsideClick={childDetector}>
                  <div data-test-subj="target" />
                </OuiOutsideClickDetector>
              </div>
            </OuiOutsideClickDetector>
          </div>

          <OuiOutsideClickDetector onOutsideClick={unrelatedDetector}>
            <div />
          </OuiOutsideClickDetector>
        </div>
      );

      const target = screen.getByTestId('target');

      // Simulate a click sequence: mousedown on target, then mouseup outside
      act(() => {
        // First trigger mousedown on the target element to capture the ID
        fireEvent.mouseDown(target);

        // Then simulate mouseup outside by dispatching directly on document
        // This simulates clicking outside all detectors
        const outsideEvent = new Event('mouseup') as OuiEvent;
        outsideEvent.ouiGeneratedBy = [];
        document.dispatchEvent(outsideEvent);
      });

      expect(unrelatedDetector).toHaveBeenCalledTimes(1);
      expect(parentDetector).toHaveBeenCalledTimes(0);
      expect(childDetector).toHaveBeenCalledTimes(0);
    });
  });
});
