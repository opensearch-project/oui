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

import React from 'react';
import each from 'jest-each';

import { ReactWrapper, mount, render } from 'enzyme';
import { requiredProps } from '../../test';
import { keys } from '../../services';
import { OuiSplitButton, OuiSplitButtonOption } from './split_button';
import { act } from 'react-dom/test-utils';

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
      new Promise((resolve, reject) => {
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
 * @param component - target Enzyme wrapper
 * @param selector - CSS selector for Enzyme find()
 * @param options - options to pass to waitFor()
 * @returns void
 */
const findByFocused = (
  component: ReactWrapper,
  selector: string,
  options: WaitForOptions
) =>
  waitFor(() => {
    component.update();
    const expectedActive = component.find(selector);
    expect(expectedActive.getDOMNode()).toEqual(document.activeElement);
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
    const component = render(
      <OuiSplitButton {...requiredProps}>Test</OuiSplitButton>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('fullWidth is rendered', () => {
      const component = render(
        <OuiSplitButton {...requiredProps} fullWidth>
          Test
        </OuiSplitButton>
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('options rendering', () => {
    test('options are rendered when select is open', async () => {
      const component = mount(
        <OuiSplitButton options={options} initiallyOpen>
          Test
        </OuiSplitButton>
      );

      component.update();
      expect(component.find('button.ouiSplitButton__item')).toHaveLength(1);
      expect(component.find('a.ouiSplitButton__item')).toHaveLength(1);
      expect(component).toMatchSnapshot();
    });

    test('selectedItem 0 is rendered', async () => {
      const component = mount(
        <OuiSplitButton options={options} selectedIndex={0} initiallyOpen>
          Test
        </OuiSplitButton>
      );

      const selected = component.find('a[aria-selected="true"]');
      expect(selected).toHaveLength(1);
      expect(selected.text()).toEqual('Option #1');
      expect(component).toMatchSnapshot();
    });

    test('selectedItem last is rendered', async () => {
      const component = mount(
        <OuiSplitButton
          options={[...options, { display: 'Option #3' }]}
          selectedIndex={2}
          initiallyOpen>
          Test
        </OuiSplitButton>
      );

      const selected = component.find('button[aria-selected="true"]');
      expect(selected).toHaveLength(1);
      expect(selected.text()).toEqual('Option #3');
      expect(component).toMatchSnapshot();
    });

    test('option with href renders link', async () => {
      const component = mount(
        <OuiSplitButton
          options={[{ display: 'Option #3', href: '#test' }]}
          initiallyOpen>
          Test
        </OuiSplitButton>
      );

      const selected = component.find('a[href="#test"]');
      expect(selected).toHaveLength(1);
      expect(component).toMatchSnapshot();
    });
  });

  describe('onClick events', () => {
    test('selection list is opened on drop-down button click', async () => {
      const component = mount(
        <OuiSplitButton options={options} selectedIndex={1}>
          Test
        </OuiSplitButton>
      );

      expect(
        component.find('OuiContextMenuItem.ouiSplitButton__item')
      ).toHaveLength(0);

      component
        .find('button.ouiSplitButtonControl--dropdown')
        .simulate('click');

      component.update();

      expect(
        component.find('OuiContextMenuItem.ouiSplitButton__item')
      ).toHaveLength(2);

      expect(component).toMatchSnapshot();
    });

    test('onClick is called on Primary button click', async () => {
      const onClick = jest.fn();
      const component = mount(
        <OuiSplitButton onClick={onClick}>Test</OuiSplitButton>
      );

      component.find('button.ouiSplitButtonControl--primary').simulate('click');

      expect(onClick).toHaveBeenCalled();
    });

    test('onClick of option-item is called when an option is selected', async () => {
      const onClickOption = jest.fn();
      options[0].onClick = onClickOption;
      const component = mount(
        <OuiSplitButton options={options} initiallyOpen selectedIndex={1}>
          Test
        </OuiSplitButton>
      );

      const selected = component.find(
        'OuiContextMenuItem[aria-selected="false"]'
      );
      expect(selected).toHaveLength(1);
      selected.at(0).simulate('click');

      expect(onClickOption).toHaveBeenCalled();
    });
  });
  describe('Option-list keyboard control', () => {
    describe('key up-down on buttons opens options list', () => {
      each([
        { key: keys.ARROW_DOWN, button: 'primary' },
        { key: keys.ARROW_UP, button: 'primary' },
        { key: keys.ARROW_DOWN, button: 'dropdown' },
        { key: keys.ARROW_UP, button: 'dropdown' },
      ]).test('$key on $button button opens options', ({ key, button }) => {
        const component = mount(
          <OuiSplitButton options={options} selectedIndex={1}>
            test
          </OuiSplitButton>
        );

        expect(
          component.find('OuiContextMenuItem.ouiSplitButton__item')
        ).toHaveLength(0);

        component
          .find(`button.ouiSplitButtonControl--${button}`)
          .simulate('keydown', { key });

        component.update();

        expect(
          component.find('OuiContextMenuItem.ouiSplitButton__item')
        ).toHaveLength(2);
      });
    });
    describe('key up-down on options list changes focus', () => {
      const options = [
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
          const component = mount(
            <OuiSplitButton
              initiallyOpen
              options={options}
              selectedIndex={startSelection}>
              test
            </OuiSplitButton>
          );

          await findByFocused(
            component,
            `button#splitButtonItem_${startSelection}`,
            { message: `Initial selected focus ${startSelection} not found.` }
          );

          const items = component.find(
            'OuiContextMenuItem.ouiSplitButton__item'
          );
          expect(items).toHaveLength(3);

          items.at(startSelection).simulate('keydown', { key });

          component.update();

          await findByFocused(
            component,
            `button#splitButtonItem_${resultFocusSelection}`,
            {
              message: `Expected selected focus ${resultFocusSelection} not found.`,
            }
          );
        }
      );
    });
    test('key escape on options list closes list', async () => {
      const component = mount(
        <OuiSplitButton initiallyOpen options={options} selectedIndex={1}>
          test
        </OuiSplitButton>
      );

      await findByFocused(component, 'button#splitButtonItem_1', {
        message: 'Initial selected focus 1 not found.',
      });

      const displayedItems = component.find(
        'OuiContextMenuItem.ouiSplitButton__item'
      );
      expect(displayedItems).toHaveLength(2);

      displayedItems.at(1).simulate('keydown', { key: keys.ESCAPE });

      await waitFor(
        () => {
          component.update();
          const closedItems = component.find(
            'OuiContextMenuItem.ouiSplitButton__item'
          );
          expect(closedItems).toHaveLength(0);
        },
        { message: 'Expected options to not exist' }
      );
    });
  });
});
