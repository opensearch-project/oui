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
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { requiredProps } from '../../test/required_props';

import { OuiAccordion } from './accordion';

let id = 0;
const getId = () => `${id++}`;

describe('OuiAccordion', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiAccordion id={getId()} {...requiredProps} />
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    describe('buttonContentClassName', () => {
      it('is rendered', () => {
        const { container } = render(
          <OuiAccordion
            id={getId()}
            buttonContentClassName="button content class name"
          />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('buttonContent', () => {
      it('is rendered', () => {
        const { container } = render(
          <OuiAccordion
            id={getId()}
            buttonContent={<div>Button content</div>}
          />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('buttonProps', () => {
      it('is rendered', () => {
        const { container } = render(
          <OuiAccordion id={getId()} buttonProps={requiredProps} />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('extraAction', () => {
      it('is rendered', () => {
        const { container } = render(
          <OuiAccordion
            id={getId()}
            extraAction={<button>Extra action</button>}
          />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('initialIsOpen', () => {
      it('is rendered', () => {
        const { container } = render(
          <OuiAccordion id={getId()} initialIsOpen={true}>
            <p>You can see me.</p>
          </OuiAccordion>
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('arrowDisplay', () => {
      it('right is rendered', () => {
        const { container } = render(
          <OuiAccordion id={getId()} arrowDisplay="right">
            <p>You can see me.</p>
          </OuiAccordion>
        );

        expect(container).toMatchSnapshot();
      });

      it('none is rendered', () => {
        const { container } = render(
          <OuiAccordion id={getId()} arrowDisplay="none">
            <p>You can see me.</p>
          </OuiAccordion>
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('forceState', () => {
      it('is rendered', () => {
        const { container } = render(
          <OuiAccordion id={getId()} forceState="closed">
            <p>You can not see me</p>
          </OuiAccordion>
        );

        expect(container).toMatchSnapshot();
      });

      it('accepts and calls an optional callback on click', async () => {
        const onToggleHandler = jest.fn();
        render(
          <OuiAccordion
            id={getId()}
            onToggle={onToggleHandler}
            forceState="closed"
          />
        );

        const user = userEvent.setup();
        await user.click(screen.getByRole('button'));
        expect(onToggleHandler).toBeCalled();
        expect(onToggleHandler).toBeCalledWith(true);
      });
    });

    describe('isLoading', () => {
      it('is rendered', () => {
        const { container } = render(
          <OuiAccordion id={getId()} isLoading>
            <p>You can see me.</p>
          </OuiAccordion>
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('isLoadingMessage', () => {
      it('is rendered', () => {
        const { container } = render(
          <OuiAccordion id={getId()} isLoadingMessage="Please wait" isLoading>
            <p>You can&apos;t see me.</p>
          </OuiAccordion>
        );

        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('behavior', () => {
    // Note: mounting to document because activeElement requires being part of document
    let container: HTMLDivElement | null;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      container?.parentNode?.removeChild(container);
      container = null;
    });

    it('opens when clicked once', async () => {
      const { container } = render(<OuiAccordion id={getId()} />);

      const user = userEvent.setup();
      await act(async () => {
        await user.click(screen.getByRole('button'));
      });

      expect(container).toMatchSnapshot();
    });

    it('closes when clicked twice', async () => {
      const { container } = render(<OuiAccordion id={getId()} />);

      const user = userEvent.setup();
      await act(async () => {
        await user.click(screen.getByRole('button'));
      });
      await act(async () => {
        await user.click(screen.getByRole('button'));
      });

      expect(container).toMatchSnapshot();
    });

    it('accepts and calls an optional callback on open and close', async () => {
      const onToggleHandler = jest.fn();
      render(<OuiAccordion id={getId()} onToggle={onToggleHandler} />);

      const user = userEvent.setup();
      await act(async () => {
        await user.click(screen.getByRole('button'));
      });
      expect(onToggleHandler).toBeCalled();
      expect(onToggleHandler).toBeCalledWith(true);

      await act(async () => {
        await user.click(screen.getByRole('button'));
      });
      expect(onToggleHandler).toBeCalled();
      expect(onToggleHandler).toBeCalledWith(false);
    });

    it('moves focus to the content when expanded', async () => {
      const accordionId = getId();
      render(<OuiAccordion id={accordionId} />, {
        container: container as HTMLElement,
      });

      // Get the button and click it
      const user = userEvent.setup();
      await act(async () => {
        await user.click(screen.getByRole('button'));
      });

      // Check that the content wrapper has focus
      // The accordion content wrapper has the same ID as the accordion itself
      const childWrapper = document.getElementById(accordionId);
      expect(childWrapper).not.toBeFalsy();
      expect(childWrapper).toBe(document.activeElement);
    });
  });
});
