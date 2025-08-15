/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import each from 'jest-each';

import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
  act,
} from '@testing-library/react';
import { requiredProps } from '../../test';
import { keys } from '../../services';
import { OuiSplitButton, OuiSplitButtonOption } from './split_button';

jest.mock('../portal', () => ({
  OuiPortal: ({ children }: any) => children,
}));

interface WaitForOptions {
  interval?: number;
  timeout?: number;
  message?: string;
}

/**
 * Iterate a callback until callback's expect() is pass.
 * @param callback - fn to iterate until expect pass
 * @param param1 - options : interval, timeout, message
 * @returns void
 */
// Deprecate/delete after resolution of https://github.com/opensearch-project/oui/issues/1197
const waitFor = (
  callback: () => void,
  { interval = 50, timeout = 1000, message = 'Timed out.' }: WaitForOptions = {}
) =>
  act(
    () =>
      new Promise<void>((resolve, reject) => {
        const startTime = Date.now();

        const nextInterval = () => {
          setTimeout(() => {
            try {
              callback();
              resolve();
            } catch (err) {
              if (Date.now() - startTime > timeout) {
                reject(new Error(message));
              } else {
                nextInterval();
              }
            }
          }, interval);
        };

        nextInterval();
      })
  );

/**
 * use waitFor() until document.activeElement equals element found by selector
 * @param container - target RTL container
 * @param selector - CSS selector for querySelector
 * @param options - options to pass to waitFor()
 * @returns void
 */
const findByFocused = (
  container: HTMLElement,
  selector: string,
  options: WaitForOptions
) =>
  waitFor(() => {
    const expectedActive = container.querySelector(selector);
    expect(expectedActive).toEqual(document.activeElement);
  }, options);

const options: OuiSplitButtonOption[] = [
  {
    display: 'Option #1',
    href: '#',
  },
  { display: 'Option #2' },
];

describe('OuiSplitButton', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiSplitButton {...requiredProps}>Test</OuiSplitButton>
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    test('fullWidth is rendered', () => {
      const { container } = render(
        <OuiSplitButton {...requiredProps} fullWidth>
          Test
        </OuiSplitButton>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('options rendering', () => {
    test('options are rendered when select is open', async () => {
      const { container } = render(
        <OuiSplitButton options={options} initiallyOpen>
          Test
        </OuiSplitButton>
      );

      expect(
        container.querySelectorAll('button.ouiSplitButton__item')
      ).toHaveLength(1);
      expect(container.querySelectorAll('a.ouiSplitButton__item')).toHaveLength(
        1
      );
      expect(container).toMatchSnapshot();
    });

    test('selectedItem 0 is rendered', async () => {
      const { container } = render(
        <OuiSplitButton options={options} selectedIndex={0} initiallyOpen>
          Test
        </OuiSplitButton>
      );

      const selected = container.querySelectorAll('a[aria-selected="true"]');
      expect(selected).toHaveLength(1);
      expect(selected[0].textContent).toEqual('Option #1');
      expect(container).toMatchSnapshot();
    });

    test('selectedItem last is rendered', async () => {
      const { container } = render(
        <OuiSplitButton
          options={[...options, { display: 'Option #3' }]}
          selectedIndex={2}
          initiallyOpen>
          Test
        </OuiSplitButton>
      );

      const selected = container.querySelectorAll(
        'button[aria-selected="true"]'
      );
      expect(selected).toHaveLength(1);
      expect(selected[0].textContent).toEqual('Option #3');
      expect(container).toMatchSnapshot();
    });

    test('option with href renders link', async () => {
      const { container } = render(
        <OuiSplitButton
          options={[{ display: 'Option #3', href: '#test' }]}
          initiallyOpen>
          Test
        </OuiSplitButton>
      );

      const selected = container.querySelectorAll('a[href="#test"]');
      expect(selected).toHaveLength(1);
      expect(container).toMatchSnapshot();
    });
  });

  describe('simple button display', () => {
    test('display simple button when options are blank', () => {
      const { container } = render(
        <OuiSplitButton options={[]}>Test</OuiSplitButton>
      );

      expect(
        container.querySelectorAll('.ouiSplitButtonControl--dropdown')
      ).toHaveLength(0);
      expect(container).toMatchSnapshot();
    });

    test('ignore initiallyOpen when options are blank', () => {
      const { container } = render(
        <OuiSplitButton initiallyOpen options={[]}>
          Test
        </OuiSplitButton>
      );

      expect(
        container.querySelectorAll('.ouiSplitButton__listbox')
      ).toHaveLength(0);
      expect(container).toMatchSnapshot();
    });
  });

  describe('onClick events', () => {
    test('selection list is opened on drop-down button click', async () => {
      const { container } = render(
        <OuiSplitButton options={options} selectedIndex={1}>
          Test
        </OuiSplitButton>
      );

      expect(container.querySelectorAll('.ouiSplitButton__item')).toHaveLength(
        0
      );

      const dropdownButton = container.querySelector(
        'button.ouiSplitButtonControl--dropdown'
      ) as HTMLElement;
      fireEvent.click(dropdownButton);

      expect(container.querySelectorAll('.ouiSplitButton__item')).toHaveLength(
        2
      );

      expect(container).toMatchSnapshot();
    });

    test('onClick is called on Primary button click', async () => {
      const onClick = jest.fn();
      const { container } = render(
        <OuiSplitButton onClick={onClick}>Test</OuiSplitButton>
      );

      const primaryButton = container.querySelector(
        'button.ouiSplitButtonControl--primary'
      ) as HTMLElement;
      fireEvent.click(primaryButton);

      expect(onClick).toHaveBeenCalled();
    });

    test('onClick of option-item is called when an option is selected', async () => {
      const onClickOption = jest.fn();
      const testOptions = [...options];
      testOptions[0].onClick = onClickOption;
      const { container } = render(
        <OuiSplitButton options={testOptions} initiallyOpen selectedIndex={1}>
          Test
        </OuiSplitButton>
      );

      const selected = container.querySelector(
        '[aria-selected="false"]'
      ) as HTMLElement;
      expect(selected).toBeTruthy();
      fireEvent.click(selected);

      expect(onClickOption).toHaveBeenCalled();
    });
  });
  describe('Option-list keyboard control', () => {
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

    describe('key up-down on buttons opens options list', () => {
      each([
        { key: keys.ARROW_DOWN, button: 'primary' },
        { key: keys.ARROW_UP, button: 'primary' },
        { key: keys.ARROW_DOWN, button: 'dropdown' },
        { key: keys.ARROW_UP, button: 'dropdown' },
      ]).test('$key on $button button opens options', ({ key, button }) => {
        const { container } = render(
          <OuiSplitButton options={options} selectedIndex={1}>
            test
          </OuiSplitButton>
        );

        expect(
          container.querySelectorAll('.ouiSplitButton__item')
        ).toHaveLength(0);

        const targetButton = container.querySelector(
          `button.ouiSplitButtonControl--${button}`
        ) as HTMLElement;
        fireEvent.keyDown(targetButton, { key });

        expect(
          container.querySelectorAll('.ouiSplitButton__item')
        ).toHaveLength(2);
      });
    });
    describe('key up-down on options list changes focus', () => {
      const focusOptions = [
        { display: 'option 1' },
        { display: 'option 2' },
        { display: 'option 3' },
      ];

      each([
        {
          desc: 'focus next',
          startSelection: 1,
          key: keys.ARROW_DOWN,
          resultFocusSelection: 2,
        },
        {
          desc: 'focus prev',
          startSelection: 1,
          key: keys.ARROW_UP,
          resultFocusSelection: 0,
        },
        {
          desc: 'cycle to top',
          startSelection: 2,
          key: keys.ARROW_DOWN,
          resultFocusSelection: 0,
        },
        {
          desc: 'cycle to bottom',
          startSelection: 0,
          key: keys.ARROW_UP,
          resultFocusSelection: 2,
        },
      ]).test(
        '$key on option list item $startSelection $desc',
        async ({ startSelection, key, resultFocusSelection }) => {
          const { container: rtlContainer } = render(
            <OuiSplitButton
              initiallyOpen
              options={focusOptions}
              selectedIndex={startSelection}>
              test
            </OuiSplitButton>,
            {
              container: document.body.appendChild(
                document.createElement('div')
              ),
            }
          );

          await findByFocused(
            rtlContainer,
            `button#splitButtonItem_${startSelection}`,
            {
              message: `Initial selected focus ${startSelection} not found.`,
              timeout: 2000,
            }
          );

          const items = rtlContainer.querySelectorAll('.ouiSplitButton__item');
          expect(items).toHaveLength(3);

          act(() => {
            fireEvent.keyDown(items[startSelection], { key });
          });

          await findByFocused(
            rtlContainer,
            `button#splitButtonItem_${resultFocusSelection}`,
            {
              message: `Expected selected focus ${resultFocusSelection} not found.`,
            }
          );
        }
      );
    });
    test('key escape on options list closes list', async () => {
      const { container: rtlContainer } = render(
        <OuiSplitButton initiallyOpen options={options} selectedIndex={1}>
          test
        </OuiSplitButton>,
        { container: document.body.appendChild(document.createElement('div')) }
      );

      await findByFocused(rtlContainer, 'button#splitButtonItem_1', {
        message: 'Initial selected focus 1 not found.',
      });

      const displayedItems = rtlContainer.querySelectorAll(
        '.ouiSplitButton__item'
      );
      expect(displayedItems).toHaveLength(2);

      // Get the listbox element to wait for its removal
      const listbox = rtlContainer.querySelector('.ouiSplitButton__listbox');
      expect(listbox).toBeTruthy();

      act(() => {
        fireEvent.keyDown(displayedItems[1], { key: keys.ESCAPE });
      });

      // Use RTL's waitForElementToBeRemoved which is more reliable
      await waitForElementToBeRemoved(listbox, { timeout: 3000 });
    });
  });
});
