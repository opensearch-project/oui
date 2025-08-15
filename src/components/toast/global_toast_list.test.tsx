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

import {
  OuiGlobalToastList,
  Toast,
  TOAST_FADE_OUT_MS,
} from './global_toast_list';

jest.useFakeTimers();

describe('OuiGlobalToastList', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiGlobalToastList
        {...requiredProps}
        dismissToast={() => {}}
        toastLifeTimeMs={5}
      />
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    describe('toasts', () => {
      test('is rendered', () => {
        const toasts: Toast[] = [
          {
            title: 'A',
            text: 'a',
            color: 'success',
            iconType: 'check',
            'data-test-subj': 'a',
            id: 'a',
          },
          {
            title: 'B',
            text: 'b',
            color: 'danger',
            iconType: 'alert',
            'data-test-subj': 'b',
            id: 'b',
          },
        ];

        const { container } = render(
          <OuiGlobalToastList
            toasts={toasts}
            dismissToast={() => {}}
            toastLifeTimeMs={5}
          />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('side', () => {
      test('can be changed to left', () => {
        const toasts: Toast[] = [
          {
            title: 'A',
            text: 'a',
            color: 'success',
            iconType: 'check',
            'data-test-subj': 'a',
            id: 'a',
          },
          {
            title: 'B',
            text: 'b',
            color: 'danger',
            iconType: 'alert',
            'data-test-subj': 'b',
            id: 'b',
          },
        ];

        const { container } = render(
          <OuiGlobalToastList
            toasts={toasts}
            dismissToast={() => {}}
            toastLifeTimeMs={5}
            side="left"
          />
        );
        expect(container).toMatchSnapshot();
      });
    });

    describe('dismissToast', () => {
      test('is called when a toast is clicked', () => {
        const dismissToastSpy = jest.fn();
        render(
          <OuiGlobalToastList
            toasts={[
              {
                'data-test-subj': 'b',
                id: 'b',
              },
            ]}
            dismissToast={dismissToastSpy}
            toastLifeTimeMs={100}
          />
        );

        act(() => {
          fireEvent.click(screen.getByTestId('toastCloseButton'));
        });

        act(() => {
          jest.advanceTimersByTime(TOAST_FADE_OUT_MS - 1);
        });
        expect(dismissToastSpy).not.toHaveBeenCalled();

        act(() => {
          jest.advanceTimersByTime(1);
        });
        expect(dismissToastSpy).toHaveBeenCalled();
      });

      test('is called when the toast lifetime elapses', () => {
        const TOAST_LIFE_TIME_MS = 5;
        const dismissToastSpy = jest.fn();
        render(
          <OuiGlobalToastList
            toasts={[
              {
                'data-test-subj': 'b',
                id: 'b',
              },
            ]}
            dismissToast={dismissToastSpy}
            toastLifeTimeMs={TOAST_LIFE_TIME_MS}
          />
        );

        act(() => {
          jest.advanceTimersByTime(TOAST_LIFE_TIME_MS + TOAST_FADE_OUT_MS - 1);
        });
        expect(dismissToastSpy).not.toHaveBeenCalled();

        act(() => {
          jest.advanceTimersByTime(1);
        });
        expect(dismissToastSpy).toHaveBeenCalled();
      });

      test('toastLifeTimeMs is overrideable by individidual toasts', () => {
        const TOAST_LIFE_TIME_MS = 10;
        const TOAST_LIFE_TIME_MS_OVERRIDE = 100;
        const dismissToastSpy = jest.fn();
        render(
          <OuiGlobalToastList
            toasts={[
              {
                'data-test-subj': 'b',
                id: 'b',
                toastLifeTimeMs: TOAST_LIFE_TIME_MS_OVERRIDE,
              },
            ]}
            dismissToast={dismissToastSpy}
            toastLifeTimeMs={TOAST_LIFE_TIME_MS}
          />
        );

        const notYetTime = TOAST_LIFE_TIME_MS + TOAST_FADE_OUT_MS;
        const nowItsTime = TOAST_LIFE_TIME_MS_OVERRIDE + TOAST_FADE_OUT_MS;

        act(() => {
          jest.advanceTimersByTime(notYetTime);
        });
        expect(dismissToastSpy).not.toHaveBeenCalled();

        act(() => {
          jest.advanceTimersByTime(nowItsTime - notYetTime);
        });
        expect(dismissToastSpy).toHaveBeenCalled();
      });
    });
  });
});
