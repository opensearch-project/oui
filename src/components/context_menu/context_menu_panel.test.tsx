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
import { requiredProps } from '../../test';

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
  test('is rendered', () => {
    const { container } = render(
      <OuiContextMenuPanel {...requiredProps}>Hello</OuiContextMenuPanel>
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    describe('title', () => {
      test('is rendered', () => {
        const { container } = render(<OuiContextMenuPanel title="Title" />);

        expect(container).toMatchSnapshot();
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        it(`${size} is rendered`, () => {
          const { container } = render(
            <OuiContextMenuPanel title="Title" size={size} />
          );

          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('onClose', () => {
      test('renders a button as a title', () => {
        const { container } = render(
          <OuiContextMenuPanel title="Title" onClose={() => {}} />
        );

        expect(container).toMatchSnapshot();
      });

      test("isn't called upon instantiation", () => {
        const onCloseHandler = jest.fn();

        render(<OuiContextMenuPanel title="Title" onClose={onCloseHandler} />);

        expect(onCloseHandler).not.toHaveBeenCalled();
      });

      test('is called when the title is clicked', async () => {
        const onCloseHandler = jest.fn();

        render(<OuiContextMenuPanel title="Title" onClose={onCloseHandler} />);

        const user = userEvent.setup();
        await act(async () => {
          await user.click(screen.getByRole('button'));
        });

        expect(onCloseHandler).toHaveBeenCalledTimes(1);
      });
    });

    describe('onHeightChange', () => {
      it('is called with a height value', () => {
        const onHeightChange = jest.fn();

        render(<OuiContextMenuPanel onHeightChange={onHeightChange} />);

        expect(onHeightChange).toHaveBeenCalledWith(0);
      });
    });

    describe('transitionDirection', () => {
      describe('next', () => {
        describe('with transitionType', () => {
          describe('in', () => {
            test('is rendered', () => {
              const { container } = render(
                <OuiContextMenuPanel
                  transitionDirection="next"
                  transitionType="in"
                />
              );

              expect(container).toMatchSnapshot();
            });
          });

          describe('out', () => {
            test('is rendered', () => {
              const { container } = render(
                <OuiContextMenuPanel
                  transitionDirection="next"
                  transitionType="out"
                />
              );

              expect(container).toMatchSnapshot();
            });
          });
        });
      });

      describe('previous', () => {
        describe('with transitionType', () => {
          describe('in', () => {
            test('is rendered', () => {
              const { container } = render(
                <OuiContextMenuPanel
                  transitionDirection="previous"
                  transitionType="in"
                />
              );

              expect(container).toMatchSnapshot();
            });
          });

          describe('out', () => {
            test('is rendered', () => {
              const { container } = render(
                <OuiContextMenuPanel
                  transitionDirection="previous"
                  transitionType="out"
                />
              );

              expect(container).toMatchSnapshot();
            });
          });
        });
      });
    });

    describe('initialFocusedItemIndex', () => {
      it('sets focus on the item occupying that index', async () => {
        render(
          <OuiContextMenuPanel items={items} initialFocusedItemIndex={1} />
        );

        await tick(20);

        expect(screen.getByTestId('itemB')).toBe(document.activeElement);
      });

      it('sets focus on the panel when set to `-1`', async () => {
        const { container } = render(
          <OuiContextMenuPanel items={items} initialFocusedItemIndex={-1} />
        );

        await tick(20);

        // In RTL, the panel is the container's first child
        const panel = container.querySelector('.ouiContextMenuPanel');
        expect(panel).toBe(document.activeElement);
      });
    });

    describe('onUseKeyboardToNavigate', () => {
      it('is called when up arrow is pressed', async () => {
        const onUseKeyboardToNavigateHandler = jest.fn();

        const { container } = render(
          <OuiContextMenuPanel
            items={items}
            onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
          />
        );

        const panel = container.querySelector('.ouiContextMenuPanel');
        await act(async () => {
          panel?.dispatchEvent(
            new KeyboardEvent('keydown', { key: keys.ARROW_UP, bubbles: true })
          );
        });

        expect(onUseKeyboardToNavigateHandler).toHaveBeenCalledTimes(1);
      });

      it('is called when down arrow is pressed', async () => {
        const onUseKeyboardToNavigateHandler = jest.fn();

        const { container } = render(
          <OuiContextMenuPanel
            items={items}
            onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
          />
        );

        const panel = container.querySelector('.ouiContextMenuPanel');
        await act(async () => {
          panel?.dispatchEvent(
            new KeyboardEvent('keydown', {
              key: keys.ARROW_DOWN,
              bubbles: true,
            })
          );
        });

        expect(onUseKeyboardToNavigateHandler).toHaveBeenCalledTimes(1);
      });

      describe('left arrow', () => {
        it('calls handler if showPreviousPanel exists', async () => {
          const onUseKeyboardToNavigateHandler = jest.fn();

          const { container } = render(
            <OuiContextMenuPanel
              items={items}
              showPreviousPanel={() => {}}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          const panel = container.querySelector('.ouiContextMenuPanel');
          await act(async () => {
            panel?.dispatchEvent(
              new KeyboardEvent('keydown', {
                key: keys.ARROW_LEFT,
                bubbles: true,
              })
            );
          });

          expect(onUseKeyboardToNavigateHandler).toHaveBeenCalledTimes(1);
        });

        it("doesn't call handler if showPreviousPanel doesn't exist", async () => {
          const onUseKeyboardToNavigateHandler = jest.fn();

          const { container } = render(
            <OuiContextMenuPanel
              items={items}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          const panel = container.querySelector('.ouiContextMenuPanel');
          await act(async () => {
            panel?.dispatchEvent(
              new KeyboardEvent('keydown', {
                key: keys.ARROW_LEFT,
                bubbles: true,
              })
            );
          });

          expect(onUseKeyboardToNavigateHandler).not.toHaveBeenCalled();
        });
      });

      describe('right arrow', () => {
        it('calls handler if showNextPanel exists', async () => {
          const onUseKeyboardToNavigateHandler = jest.fn();

          const { container } = render(
            <OuiContextMenuPanel
              items={items}
              showNextPanel={() => {}}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          const panel = container.querySelector('.ouiContextMenuPanel');
          await act(async () => {
            panel?.dispatchEvent(
              new KeyboardEvent('keydown', {
                key: keys.ARROW_RIGHT,
                bubbles: true,
              })
            );
          });

          expect(onUseKeyboardToNavigateHandler).toHaveBeenCalledTimes(1);
        });

        it("doesn't call handler if showNextPanel doesn't exist", async () => {
          const onUseKeyboardToNavigateHandler = jest.fn();

          const { container } = render(
            <OuiContextMenuPanel
              items={items}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          const panel = container.querySelector('.ouiContextMenuPanel');
          await act(async () => {
            panel?.dispatchEvent(
              new KeyboardEvent('keydown', {
                key: keys.ARROW_RIGHT,
                bubbles: true,
              })
            );
          });

          expect(onUseKeyboardToNavigateHandler).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('behavior', () => {
    describe('focus', () => {
      function mockGetClientRects(button: HTMLElement) {
        (button as any).getClientRects = jest.fn(() => [
          {
            bottom: 200,
            height: 100,
            left: 10,
            right: 210,
            top: 100,
            width: 200,
            x: 10,
            y: 100,
          },
        ]);
      }

      it('is set on the first focusable element by default if there are no items and hasFocus is true', async () => {
        render(
          <OuiContextMenuPanel>
            <button data-test-subj="button" />
          </OuiContextMenuPanel>
        );
        const buttonElement = screen.getByTestId('button');
        mockGetClientRects(buttonElement);

        await tick(20);

        // Check if the button is the active element
        expect(buttonElement).toBe(document.activeElement);
      });

      it('is not set on anything if hasFocus is false', async () => {
        render(
          <OuiContextMenuPanel hasFocus={false}>
            <button data-test-subj="button" />
          </OuiContextMenuPanel>
        );

        const buttonElement = screen.getByTestId('button');
        mockGetClientRects(buttonElement);

        await tick(20);

        // Check if focus was called
        expect(buttonElement).not.toBe(document.activeElement);
      });
    });

    describe('keyboard navigation of items', () => {
      let container: HTMLElement;
      let panel: HTMLElement | null;
      let showNextPanelHandler: jest.Mock;
      let showPreviousPanelHandler: jest.Mock;

      beforeEach(() => {
        showNextPanelHandler = jest.fn();
        showPreviousPanelHandler = jest.fn();

        const renderResult = render(
          <OuiContextMenuPanel
            items={items}
            showNextPanel={showNextPanelHandler}
            showPreviousPanel={showPreviousPanelHandler}
          />
        );

        container = renderResult.container;
        panel = container.querySelector('.ouiContextMenuPanel');
      });

      it('focuses the panel by default', async () => {
        await tick(20);

        expect(panel).toBe(document.activeElement);
      });

      it('down arrow key focuses the first menu item', async () => {
        await act(async () => {
          panel?.dispatchEvent(
            new KeyboardEvent('keydown', {
              key: keys.ARROW_DOWN,
              bubbles: true,
            })
          );
        });

        await tick(20);
        expect(screen.getByTestId('itemA')).toBe(document.activeElement);
      });

      it('subsequently, down arrow key focuses the next menu item', async () => {
        await act(async () => {
          panel?.dispatchEvent(
            new KeyboardEvent('keydown', {
              key: keys.ARROW_DOWN,
              bubbles: true,
            })
          );
          await tick(10);
        });
        await act(async () => {
          panel?.dispatchEvent(
            new KeyboardEvent('keydown', {
              key: keys.ARROW_DOWN,
              bubbles: true,
            })
          );
        });

        await tick(20);
        expect(screen.getByTestId('itemB')).toBe(document.activeElement);
      });

      it('down arrow key wraps to first menu item', async () => {
        await act(async () => {
          panel?.dispatchEvent(
            new KeyboardEvent('keydown', { key: keys.ARROW_UP, bubbles: true })
          );
          await tick(10);
          panel?.dispatchEvent(
            new KeyboardEvent('keydown', {
              key: keys.ARROW_DOWN,
              bubbles: true,
            })
          );
        });

        await tick(20);
        expect(screen.getByTestId('itemA')).toBe(document.activeElement);
      });

      it('up arrow key focuses the last menu item', async () => {
        await act(async () => {
          panel?.dispatchEvent(
            new KeyboardEvent('keydown', { key: keys.ARROW_UP, bubbles: true })
          );
        });

        await tick(20);
        expect(screen.getByTestId('itemC')).toBe(document.activeElement);
      });

      it('subsequently, up arrow key focuses the previous menu item', async () => {
        await act(async () => {
          panel?.dispatchEvent(
            new KeyboardEvent('keydown', { key: keys.ARROW_UP, bubbles: true })
          );
          await tick(10);
        });
        await act(async () => {
          panel?.dispatchEvent(
            new KeyboardEvent('keydown', { key: keys.ARROW_UP, bubbles: true })
          );
        });

        await tick(20);
        expect(screen.getByTestId('itemB')).toBe(document.activeElement);
      });

      it('up arrow key wraps to last menu item', async () => {
        await act(async () => {
          panel?.dispatchEvent(
            new KeyboardEvent('keydown', {
              key: keys.ARROW_DOWN,
              bubbles: true,
            })
          );
          await tick(10);
          panel?.dispatchEvent(
            new KeyboardEvent('keydown', { key: keys.ARROW_UP, bubbles: true })
          );
        });

        await tick(20);
        expect(screen.getByTestId('itemC')).toBe(document.activeElement);
      });

      it("right arrow key shows next panel with focused item's index", async () => {
        await act(async () => {
          panel?.dispatchEvent(
            new KeyboardEvent('keydown', {
              key: keys.ARROW_DOWN,
              bubbles: true,
            })
          );
          await tick(10);
        });
        await act(async () => {
          panel?.dispatchEvent(
            new KeyboardEvent('keydown', {
              key: keys.ARROW_RIGHT,
              bubbles: true,
            })
          );
        });

        expect(showNextPanelHandler).toHaveBeenCalledWith(0);
      });

      it('left arrow key shows previous panel', async () => {
        await act(async () => {
          panel?.dispatchEvent(
            new KeyboardEvent('keydown', {
              key: keys.ARROW_LEFT,
              bubbles: true,
            })
          );
        });

        expect(showPreviousPanelHandler).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('updating items and content', () => {
    describe('updates to items', () => {
      it("should not re-render if any items's watchedItemProps did not change", () => {
        expect.assertions(2);

        // by not passing `watchedItemProps` no changes to items should cause a re-render
        const initialItems = [
          <OuiContextMenuItem key="A" data-counter={0}>
            Option A
          </OuiContextMenuItem>,
          <OuiContextMenuItem key="B" data-counter={1}>
            Option B
          </OuiContextMenuItem>,
        ];

        const { container, rerender } = render(
          <OuiContextMenuPanel items={initialItems} />
        );

        // Take a snapshot of the initial render
        expect(container).toMatchSnapshot();

        // Re-render with updated items but without watchedItemProps
        const updatedItems = [
          <OuiContextMenuItem key="A" data-counter={2}>
            Option A
          </OuiContextMenuItem>,
          <OuiContextMenuItem key="B" data-counter={3}>
            Option B
          </OuiContextMenuItem>,
        ];

        rerender(<OuiContextMenuPanel items={updatedItems} />);

        // The HTML should be the same since the component shouldn't re-render
        // without watchedItemProps changes
        expect(container).toMatchSnapshot();
      });

      it("should re-render if any items's watchedItemProps did change", () => {
        expect.assertions(2);

        // by referencing the `data-counter` property in `watchedItemProps`
        // changes to the items should be picked up and re-rendered
        const initialItems = [
          <OuiContextMenuItem key="A" data-counter={0}>
            Option A
          </OuiContextMenuItem>,
          <OuiContextMenuItem key="B" data-counter={1}>
            Option B
          </OuiContextMenuItem>,
        ];

        const { container, rerender } = render(
          <OuiContextMenuPanel
            watchedItemProps={['data-counter']}
            items={initialItems}
          />
        );

        // Take a snapshot of the initial render
        expect(container).toMatchSnapshot();

        // Re-render with updated items with watchedItemProps
        const updatedItems = [
          <OuiContextMenuItem key="A" data-counter={2}>
            Option A
          </OuiContextMenuItem>,
          <OuiContextMenuItem key="B" data-counter={3}>
            Option B
          </OuiContextMenuItem>,
        ];

        rerender(
          <OuiContextMenuPanel
            watchedItemProps={['data-counter']}
            items={updatedItems}
          />
        );

        // The HTML should be different since the component should re-render
        // when watchedItemProps change
        expect(container).toMatchSnapshot();
      });

      it('should re-render at all times when children exists', () => {
        expect.assertions(2);

        const { container, rerender } = render(
          <OuiContextMenuPanel>Hello World</OuiContextMenuPanel>
        );

        // Take a snapshot of the initial render
        expect(container).toMatchSnapshot();

        // Re-render with different children
        rerender(<OuiContextMenuPanel>More Salutations</OuiContextMenuPanel>);

        // The HTML should be different since the component should re-render
        // when children change
        expect(container).toMatchSnapshot();
      });
    });
  });
});
