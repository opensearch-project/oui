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

/* eslint-disable jsx-a11y/tabindex-no-positive */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { OuiKeyboardAccessible } from './keyboard_accessible';

import { keys } from '../../services';

const noop = () => {
  // eslint-disable-line no-empty
};

describe('OuiKeyboardAccessible', () => {
  describe('throws an error', () => {
    const oldConsoleError = console.error;
    let consoleStub: jest.Mock<typeof console.error>;

    beforeEach(() => {
      // We don't use jest.spyOn() here, because OUI's tests apply a global
      // console.error() override that throws an exception. For these
      // tests, we just want to know if console.error() was called.

      console.error = consoleStub = jest.fn();
    });

    afterEach(() => {
      console.error = oldConsoleError;
    });

    test("when there's no child", () => {
      // @ts-ignore unused var
      const component = <OuiKeyboardAccessible />; // eslint-disable-line @typescript-eslint/no-unused-vars

      expect(consoleStub).toBeCalled();
      // React 18 formats PropTypes errors differently than React 16
      const errorMessage = consoleStub.mock.calls[0].join(' ');
      expect(errorMessage).toMatch(
        'needs to wrap an element with which the user interacts.'
      );
    });

    test('when the child is a button', () => {
      // @ts-ignore unused var
      const component = ( // eslint-disable-line @typescript-eslint/no-unused-vars
        <OuiKeyboardAccessible>
          <button onClick={noop} />
        </OuiKeyboardAccessible>
      );

      expect(consoleStub).toBeCalled();
      // React 18 formats PropTypes errors differently than React 16
      const errorMessage = consoleStub.mock.calls[0].join(' ');
      expect(errorMessage).toMatch("doesn't need to be used on a button.");
    });

    test('when the child is a link with an href', () => {
      // @ts-ignore unused var
      const component = ( // eslint-disable-line @typescript-eslint/no-unused-vars
        <OuiKeyboardAccessible>
          <a href="#" onClick={noop}>
            Click me
          </a>
        </OuiKeyboardAccessible>
      );

      expect(consoleStub).toBeCalled();
      // React 18 formats PropTypes errors differently than React 16
      const errorMessage = consoleStub.mock.calls[0].join(' ');
      expect(errorMessage).toMatch(
        "doesn't need to be used on a link if it has a href attribute."
      );
    });

    test("when the child doesn't have an onClick prop", () => {
      // @ts-ignore unused var
      const component = ( // eslint-disable-line @typescript-eslint/no-unused-vars
        <OuiKeyboardAccessible>
          <div />
        </OuiKeyboardAccessible>
      );

      expect(consoleStub).toBeCalled();
      // React 18 formats PropTypes errors differently than React 16
      const errorMessage = consoleStub.mock.calls[0].join(' ');
      expect(errorMessage).toMatch(
        'needs to wrap an element which has an onClick prop assigned.'
      );
    });

    test("when the child's onClick prop isn't a function", () => {
      // @ts-ignore unused var
      const component = ( // eslint-disable-line @typescript-eslint/no-unused-vars
        <OuiKeyboardAccessible>
          <div
            // @ts-ignore not a valid prop type
            onClick="notAFunction"
          />
        </OuiKeyboardAccessible>
      );

      expect(consoleStub).toBeCalled();
      // React 18 formats PropTypes errors differently than React 16
      const errorMessage = consoleStub.mock.calls[0].join(' ');
      expect(errorMessage).toMatch(
        "child's onClick prop needs to be a function."
      );
    });
  });

  describe("doesn't throw an error", () => {
    let oldConsoleError: typeof console.error;
    let consoleStub: jest.Mock<typeof console.error>;

    beforeEach(() => {
      oldConsoleError = console.error;
      console.error = consoleStub = jest.fn();
    });

    afterEach(() => {
      console.error = oldConsoleError;
    });

    test('when the element is a link without an href', () => {
      // @ts-ignore unused var
      const component = ( // eslint-disable-line @typescript-eslint/no-unused-vars
        <OuiKeyboardAccessible>
          <a onClick={noop}>Click me</a>
        </OuiKeyboardAccessible>
      );

      expect(consoleStub).not.toBeCalled();
    });
  });

  describe('adds accessibility attributes', () => {
    test('tabindex and role', () => {
      const { container } = render(
        <OuiKeyboardAccessible>
          <div onClick={noop} />
        </OuiKeyboardAccessible>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe("doesn't override pre-existing accessibility attributes", () => {
    test('tabindex', () => {
      const { container } = render(
        <OuiKeyboardAccessible>
          <div onClick={noop} tabIndex={1} />
        </OuiKeyboardAccessible>
      );

      expect(container).toMatchSnapshot();
    });

    test('role', () => {
      const { container } = render(
        <OuiKeyboardAccessible>
          <div onClick={noop} role="button" tabIndex={0} />
        </OuiKeyboardAccessible>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('calls onClick', () => {
    test('on ENTER keyup', () => {
      const onClickHandler = jest.fn();

      const { container } = render(
        <OuiKeyboardAccessible>
          <div data-div onClick={onClickHandler} />
        </OuiKeyboardAccessible>
      );

      const divElement = container.querySelector('[data-div]') as HTMLElement;
      fireEvent.keyUp(divElement, {
        key: keys.ENTER,
      });

      expect(onClickHandler).toBeCalled();
    });

    test('on SPACE keyup', () => {
      const onClickHandler = jest.fn();

      const { container } = render(
        <OuiKeyboardAccessible>
          <div data-div onClick={onClickHandler} />
        </OuiKeyboardAccessible>
      );

      const divElement = container.querySelector('[data-div]') as HTMLElement;
      fireEvent.keyUp(divElement, {
        key: keys.SPACE,
      });

      expect(onClickHandler).toBeCalled();
    });
  });

  describe("child's props", () => {
    test('onKeyUp handler is called', () => {
      const onKeyUpHandler = jest.fn();

      const { container } = render(
        <OuiKeyboardAccessible>
          <div data-div onKeyUp={onKeyUpHandler} />
        </OuiKeyboardAccessible>
      );

      const divElement = container.querySelector('[data-div]') as HTMLElement;
      fireEvent.keyUp(divElement, {
        keyCode: 0,
      });

      expect(onKeyUpHandler).toBeCalled();
    });

    test('onKeyDown handler is called', () => {
      const onKeyDownHandler = jest.fn();

      const { container } = render(
        <OuiKeyboardAccessible>
          <div data-div onKeyDown={onKeyDownHandler} />
        </OuiKeyboardAccessible>
      );

      const divElement = container.querySelector('[data-div]') as HTMLElement;
      fireEvent.keyDown(divElement, {
        keyCode: 0,
      });

      expect(onKeyDownHandler).toBeCalled();
    });
  });
});
