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
import { render, mount, ReactWrapper } from 'enzyme';
import { findTestSubject, requiredProps } from '../../test';

import { OuiContextMenuPanel, SIZES } from './context_menu_panel';

import { OuiContextMenuItem } from './context_menu_item';

import { tick } from './context_menu.test';

import { keys } from '../../services';

const items = [
  <OuiContextMenuItem key="A" data-test-subj="itemA">
    Option A
  </OuiContextMenuItem>,
  <OuiContextMenuItem key="B" data-test-subj="itemB">
    Option B
  </OuiContextMenuItem>,
  <OuiContextMenuItem key="C" data-test-subj="itemC">
    Option C
  </OuiContextMenuItem>,
];

describe('OuiContextMenuPanel', () => {
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

  test('is rendered', () => {
    const component = render(
      <OuiContextMenuPanel {...requiredProps}>Hello</OuiContextMenuPanel>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('title', () => {
      test('is rendered', () => {
        const component = render(<OuiContextMenuPanel title="Title" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        it(`${size} is rendered`, () => {
          const component = render(
            <OuiContextMenuPanel title="Title" size={size} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('onClose', () => {
      test('renders a button as a title', () => {
        const component = render(
          <OuiContextMenuPanel title="Title" onClose={() => {}} />
        );

        expect(component).toMatchSnapshot();
      });

      test("isn't called upon instantiation", () => {
        const onCloseHandler = jest.fn();

        mount(<OuiContextMenuPanel title="Title" onClose={onCloseHandler} />);

        expect(onCloseHandler).not.toHaveBeenCalled();
      });

      test('is called when the title is clicked', () => {
        const onCloseHandler = jest.fn();

        const component = mount(
          <OuiContextMenuPanel title="Title" onClose={onCloseHandler} />
        );

        component.find('button').simulate('click');

        expect(onCloseHandler).toHaveBeenCalledTimes(1);
      });
    });

    describe('onHeightChange', () => {
      it('is called with a height value', () => {
        const onHeightChange = jest.fn();

        mount(<OuiContextMenuPanel onHeightChange={onHeightChange} />);

        expect(onHeightChange).toHaveBeenCalledWith(0);
      });
    });

    describe('transitionDirection', () => {
      describe('next', () => {
        describe('with transitionType', () => {
          describe('in', () => {
            test('is rendered', () => {
              const component = render(
                <OuiContextMenuPanel
                  transitionDirection="next"
                  transitionType="in"
                />
              );

              expect(component).toMatchSnapshot();
            });
          });

          describe('out', () => {
            test('is rendered', () => {
              const component = render(
                <OuiContextMenuPanel
                  transitionDirection="next"
                  transitionType="out"
                />
              );

              expect(component).toMatchSnapshot();
            });
          });
        });
      });

      describe('previous', () => {
        describe('with transitionType', () => {
          describe('in', () => {
            test('is rendered', () => {
              const component = render(
                <OuiContextMenuPanel
                  transitionDirection="previous"
                  transitionType="in"
                />
              );

              expect(component).toMatchSnapshot();
            });
          });

          describe('out', () => {
            test('is rendered', () => {
              const component = render(
                <OuiContextMenuPanel
                  transitionDirection="previous"
                  transitionType="out"
                />
              );

              expect(component).toMatchSnapshot();
            });
          });
        });
      });
    });

    describe('initialFocusedItemIndex', () => {
      it('sets focus on the item occupying that index', async () => {
        const component = mount(
          <OuiContextMenuPanel items={items} initialFocusedItemIndex={1} />,
          { attachTo: container }
        );

        await tick(20);

        expect(findTestSubject(component, 'itemB').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it('sets focus on the panel when set to `-1`', async () => {
        const component = mount(
          <OuiContextMenuPanel items={items} initialFocusedItemIndex={-1} />,
          { attachTo: container }
        );

        await tick(20);

        expect(component.getDOMNode()).toBe(document.activeElement);
      });
    });

    describe('onUseKeyboardToNavigate', () => {
      it('is called when up arrow is pressed', () => {
        const onUseKeyboardToNavigateHandler = jest.fn();

        const component = mount(
          <OuiContextMenuPanel
            items={items}
            onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
          />
        );

        component.simulate('keydown', { key: keys.ARROW_UP });
        expect(onUseKeyboardToNavigateHandler).toHaveBeenCalledTimes(1);
      });

      it('is called when down arrow is pressed', () => {
        const onUseKeyboardToNavigateHandler = jest.fn();

        const component = mount(
          <OuiContextMenuPanel
            items={items}
            onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
          />
        );

        component.simulate('keydown', { key: keys.ARROW_UP });
        expect(onUseKeyboardToNavigateHandler).toHaveBeenCalledTimes(1);
      });

      describe('left arrow', () => {
        it('calls handler if showPreviousPanel exists', () => {
          const onUseKeyboardToNavigateHandler = jest.fn();

          const component = mount(
            <OuiContextMenuPanel
              items={items}
              showPreviousPanel={() => {}}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          component.simulate('keydown', { key: keys.ARROW_LEFT });
          expect(onUseKeyboardToNavigateHandler).toHaveBeenCalledTimes(1);
        });

        it("doesn't call handler if showPreviousPanel doesn't exist", () => {
          const onUseKeyboardToNavigateHandler = jest.fn();

          const component = mount(
            <OuiContextMenuPanel
              items={items}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          component.simulate('keydown', { key: keys.ARROW_LEFT });
          expect(onUseKeyboardToNavigateHandler).not.toHaveBeenCalled();
        });
      });

      describe('right arrow', () => {
        it('calls handler if showNextPanel exists', () => {
          const onUseKeyboardToNavigateHandler = jest.fn();

          const component = mount(
            <OuiContextMenuPanel
              items={items}
              showNextPanel={() => {}}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          component.simulate('keydown', { key: keys.ARROW_RIGHT });
          expect(onUseKeyboardToNavigateHandler).toHaveBeenCalledTimes(1);
        });

        it("doesn't call handler if showNextPanel doesn't exist", () => {
          const onUseKeyboardToNavigateHandler = jest.fn();

          const component = mount(
            <OuiContextMenuPanel
              items={items}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          component.simulate('keydown', { key: keys.ARROW_RIGHT });
          expect(onUseKeyboardToNavigateHandler).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('behavior', () => {
    describe('focus', () => {
      it('is set on the first focusable element by default if there are no items and hasFocus is true', async () => {
        const component = mount(
          <OuiContextMenuPanel>
            <button data-test-subj="button" />
          </OuiContextMenuPanel>
        );

        // Use the spy approach instead of checking document.activeElement
        const buttonElement = findTestSubject(
          component,
          'button'
        ).getDOMNode() as HTMLButtonElement;
        const focusSpy = jest.spyOn(buttonElement, 'focus');

        await tick(20);

        // Check if focus was called
        expect(focusSpy).toHaveBeenCalled();
      });

      it('is not set on anything if hasFocus is false', async () => {
        const component = mount(
          <OuiContextMenuPanel hasFocus={false}>
            <button data-test-subj="button" />
          </OuiContextMenuPanel>
        );

        // Use the spy approach instead of checking document.activeElement
        const buttonElement = findTestSubject(
          component,
          'button'
        ).getDOMNode() as HTMLButtonElement;
        const focusSpy = jest.spyOn(buttonElement, 'focus');

        await tick(20);

        // Check if focus was called
        expect(focusSpy).not.toHaveBeenCalled();
      });
    });

    describe('keyboard navigation of items', () => {
      let component: ReactWrapper;
      let showNextPanelHandler: jest.Mock;
      let showPreviousPanelHandler: jest.Mock;

      beforeEach(() => {
        showNextPanelHandler = jest.fn();
        showPreviousPanelHandler = jest.fn();

        component = mount(
          <OuiContextMenuPanel
            items={items}
            showNextPanel={showNextPanelHandler}
            showPreviousPanel={showPreviousPanelHandler}
          />,
          { attachTo: container }
        );
      });

      it('focuses the panel by default', async () => {
        await tick(20);

        expect(component.getDOMNode()).toBe(document.activeElement);
      });

      it('down arrow key focuses the first menu item', async () => {
        component.simulate('keydown', { key: keys.ARROW_DOWN });

        await tick(20);
        expect(findTestSubject(component, 'itemA').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it('subsequently, down arrow key focuses the next menu item', async () => {
        component.simulate('keydown', { key: keys.ARROW_DOWN });
        component.simulate('keydown', { key: keys.ARROW_DOWN });

        await tick(20);
        expect(findTestSubject(component, 'itemB').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it('down arrow key wraps to first menu item', async () => {
        component.simulate('keydown', { key: keys.ARROW_UP });
        component.simulate('keydown', { key: keys.ARROW_DOWN });

        await tick(20);
        expect(findTestSubject(component, 'itemA').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it('up arrow key focuses the last menu item', async () => {
        component.simulate('keydown', { key: keys.ARROW_UP });

        await tick(20);
        expect(findTestSubject(component, 'itemC').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it('subsequently, up arrow key focuses the previous menu item', async () => {
        component.simulate('keydown', { key: keys.ARROW_UP });
        component.simulate('keydown', { key: keys.ARROW_UP });

        await tick(20);
        expect(findTestSubject(component, 'itemB').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it('up arrow key wraps to last menu item', async () => {
        component.simulate('keydown', { key: keys.ARROW_DOWN });
        component.simulate('keydown', { key: keys.ARROW_UP });

        await tick(20);
        expect(findTestSubject(component, 'itemC').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it("right arrow key shows next panel with focused item's index", () => {
        component.simulate('keydown', { key: keys.ARROW_DOWN });
        component.simulate('keydown', { key: keys.ARROW_RIGHT });
        expect(showNextPanelHandler).toHaveBeenCalledWith(0);
      });

      it('left arrow key shows previous panel', () => {
        component.simulate('keydown', { key: keys.ARROW_LEFT });
        expect(showPreviousPanelHandler).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('updating items and content', () => {
    describe('updates to items', () => {
      it("should not re-render if any items's watchedItemProps did not change", () => {
        expect.assertions(2); // make sure the assertion in the `setProps` callback is executed

        // by not passing `watchedItemProps` no changes to items should cause a re-render
        const component = mount(
          <OuiContextMenuPanel
            items={[
              <OuiContextMenuItem key="A" data-counter={0}>
                Option A
              </OuiContextMenuItem>,
              <OuiContextMenuItem key="B" data-counter={1}>
                Option B
              </OuiContextMenuItem>,
            ]}
          />
        );

        expect(component.debug()).toMatchSnapshot();

        component.setProps(
          {
            items: [
              <OuiContextMenuItem key="A" data-counter={2}>
                Option A
              </OuiContextMenuItem>,
              <OuiContextMenuItem key="B" data-counter={3}>
                Option B
              </OuiContextMenuItem>,
            ],
          },
          () => {
            expect(component.debug()).toMatchSnapshot();
          }
        );
      });

      it("should re-render if any items's watchedItemProps did change", () => {
        expect.assertions(2); // make sure the assertion in the `setProps` callback is executed

        // by referencing the `data-counter` property in `watchedItemProps`
        // changes to the items should be picked up and re-rendered
        const component = mount(
          <OuiContextMenuPanel
            watchedItemProps={['data-counter']}
            items={[
              <OuiContextMenuItem key="A" data-counter={0}>
                Option A
              </OuiContextMenuItem>,
              <OuiContextMenuItem key="B" data-counter={1}>
                Option B
              </OuiContextMenuItem>,
            ]}
          />
        );

        expect(component.debug()).toMatchSnapshot();

        component.setProps(
          {
            items: [
              <OuiContextMenuItem key="A" data-counter={2}>
                Option A
              </OuiContextMenuItem>,
              <OuiContextMenuItem key="B" data-counter={3}>
                Option B
              </OuiContextMenuItem>,
            ],
          },
          () => {
            expect(component.debug()).toMatchSnapshot();
          }
        );
      });

      it('should re-render at all times when children exists', () => {
        expect.assertions(2); // make sure the assertion in the `setProps` callback is executed

        const component = mount(
          <OuiContextMenuPanel>Hello World</OuiContextMenuPanel>
        );

        expect(component.debug()).toMatchSnapshot();

        component.setProps({ children: 'More Salutations' }, () => {
          expect(component.debug()).toMatchSnapshot();
        });
      });
    });
  });
});
