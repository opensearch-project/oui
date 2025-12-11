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

import React, { ReactNode } from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { requiredProps } from '../../test/required_props';

import {
  OuiPopover,
  getPopoverPositionFromAnchorPosition,
  getPopoverAlignFromAnchorPosition,
  PopoverAnchorPosition,
} from './popover';

import { keys } from '../../services';

jest.mock('../portal', () => ({
  OuiPortal: ({ children }: { children: ReactNode }) => children,
}));

let id = 0;
const getId = () => `${id++}`;

describe('OuiPopover', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiPopover
        id={getId()}
        button={<button />}
        closePopover={() => {}}
        {...requiredProps}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('children is rendered', () => {
    const { container } = render(
      <OuiPopover id={getId()} button={<button />} closePopover={() => {}}>
        Children
      </OuiPopover>
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    describe('display block', () => {
      test('is rendered', () => {
        const { container } = render(
          <OuiPopover
            id={getId()}
            display="block"
            button={<button />}
            closePopover={() => {}}
          />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('anchorClassName', () => {
      test('is rendered', () => {
        const { container } = render(
          <OuiPopover
            id={getId()}
            anchorClassName="test"
            button={<button />}
            closePopover={() => {}}
          />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('closePopover', () => {
      it('is called when ESC key is hit and the popover is open', () => {
        const closePopoverHandler = jest.fn();

        const { container } = render(
          <OuiPopover
            ownFocus={false}
            id={getId()}
            button={<button />}
            closePopover={closePopoverHandler}
            isOpen
          />
        );

        // Fire the keydown event on the popover element itself
        fireEvent.keyDown(container.querySelector('.ouiPopover')!, {
          key: keys.ESCAPE,
        });
        expect(closePopoverHandler).toBeCalledTimes(1);
      });

      it('is not called when ESC key is hit and the popover is closed', () => {
        const closePopoverHandler = jest.fn();

        render(
          <OuiPopover
            id={getId()}
            button={<button />}
            closePopover={closePopoverHandler}
            isOpen={false}
          />
        );

        fireEvent.keyDown(document.body, { key: keys.ESCAPE });
        expect(closePopoverHandler).not.toBeCalled();
      });
    });

    describe('anchorPosition', () => {
      test('defaults to centerDown', () => {
        const { container } = render(
          <OuiPopover
            id={getId()}
            button={<button />}
            closePopover={() => {}}
          />
        );

        expect(container).toMatchSnapshot();
      });

      test('leftCenter is rendered', () => {
        const { container } = render(
          <OuiPopover
            id={getId()}
            button={<button />}
            closePopover={() => {}}
            anchorPosition="leftCenter"
          />
        );

        expect(container).toMatchSnapshot();
      });

      test('downRight is rendered', () => {
        const { container } = render(
          <OuiPopover
            id={getId()}
            button={<button />}
            closePopover={() => {}}
            anchorPosition="downRight"
          />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('isOpen', () => {
      test('defaults to false', () => {
        const { container } = render(
          <OuiPopover
            id={getId()}
            button={<button />}
            closePopover={() => {}}
          />
        );

        expect(container).toMatchSnapshot();
      });

      test('renders true', () => {
        const { container } = render(
          <div>
            <OuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              isOpen
            />
          </div>
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('ownFocus', () => {
      test('defaults to true', () => {
        const { container } = render(
          <div>
            <OuiPopover
              id={getId()}
              isOpen
              button={<button />}
              closePopover={() => {}}
            />
          </div>
        );

        expect(container).toMatchSnapshot();
      });

      test('renders false', () => {
        const { container } = render(
          <div>
            <OuiPopover
              ownFocus={false}
              id={getId()}
              isOpen
              button={<button />}
              closePopover={() => {}}
            />
          </div>
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('panelClassName', () => {
      test('is rendered', () => {
        const { container } = render(
          <div>
            <OuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              panelClassName="test"
              isOpen
            />
          </div>
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('panelPaddingSize', () => {
      test('is rendered', () => {
        const { container } = render(
          <div>
            <OuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              panelPaddingSize="s"
              isOpen
            />
          </div>
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('panelProps', () => {
      test('is rendered', () => {
        const { container } = render(
          <div>
            <OuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              panelProps={requiredProps}
              isOpen
            />
          </div>
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('focusTrapProps', () => {
      test('is rendered', () => {
        const { container } = render(
          <div>
            <OuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              focusTrapProps={{
                clickOutsideDisables: false,
                noIsolation: false,
                scrollLock: false,
              }}
              isOpen
            />
          </div>
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('offset', () => {
      test('with arrow', () => {
        const { container } = render(
          <div>
            <OuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              offset={10}
              isOpen
            />
          </div>
        );

        expect(container).toMatchSnapshot();
      });

      test('without arrow', () => {
        const { container } = render(
          <div>
            <OuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              offset={10}
              hasArrow={false}
              isOpen
            />
          </div>
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('arrowChildren', () => {
      test('is rendered', () => {
        const { container } = render(
          <div>
            <OuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              arrowChildren={<span />}
              isOpen
            />
          </div>
        );

        expect(container).toMatchSnapshot();
      });
    });

    test('buffer', () => {
      const { container } = render(
        <div>
          <OuiPopover
            id={getId()}
            button={<button />}
            closePopover={() => {}}
            buffer={0}
            isOpen
          />
        </div>
      );

      expect(container).toMatchSnapshot();
    });

    test('buffer for all sides', () => {
      const { container } = render(
        <div>
          <OuiPopover
            id={getId()}
            button={<button />}
            closePopover={() => {}}
            buffer={[20, 40, 60, 80]}
            isOpen
          />
        </div>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('backup click detection', () => {
    it('sets up mousedown listener when popover opens with ownFocus', () => {
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
      const closePopoverHandler = jest.fn();

      const { rerender } = render(
        <OuiPopover
          id={getId()}
          button={<button />}
          closePopover={closePopoverHandler}
          isOpen={false}
          ownFocus={true}
        />
      );

      // Open the popover
      rerender(
        <OuiPopover
          id={getId()}
          button={<button />}
          closePopover={closePopoverHandler}
          isOpen={true}
          ownFocus={true}
        />
      );

      // Verify mousedown listener was added in bubble phase
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'mousedown',
        expect.any(Function),
        false
      );

      addEventListenerSpy.mockRestore();
    });

    it('closes popover when clicking outside via backup detection', () => {
      const closePopoverHandler = jest.fn();

      const { container } = render(
        <div>
          <button id="outside-button">Outside Button</button>
          <OuiPopover
            id={getId()}
            button={<button id="popover-button">Popover Button</button>}
            closePopover={closePopoverHandler}
            isOpen={true}
            ownFocus={true}
          />
        </div>
      );

      const outsideButton = container.querySelector(
        '#outside-button'
      ) as HTMLElement;

      // Simulate mousedown on outside element
      fireEvent.mouseDown(outsideButton);

      expect(closePopoverHandler).toHaveBeenCalledTimes(1);
    });

    it('does not close popover when clicking on button', () => {
      const closePopoverHandler = jest.fn();

      const { container } = render(
        <div>
          <OuiPopover
            id={getId()}
            button={<button id="popover-button">Popover Button</button>}
            closePopover={closePopoverHandler}
            isOpen={true}
            ownFocus={true}
          />
        </div>
      );

      const button = container.querySelector('#popover-button') as HTMLElement;

      // Simulate mousedown on button
      fireEvent.mouseDown(button);

      expect(closePopoverHandler).not.toHaveBeenCalled();
    });

    it('does not set up backup detection when ownFocus is false', () => {
      const closePopoverHandler = jest.fn();

      const { container } = render(
        <div>
          <button id="outside-button">Outside Button</button>
          <OuiPopover
            id={getId()}
            button={<button id="popover-button">Popover Button</button>}
            closePopover={closePopoverHandler}
            isOpen={true}
            ownFocus={false}
          />
        </div>
      );

      const outsideButton = container.querySelector(
        '#outside-button'
      ) as HTMLElement;

      // Click outside - with ownFocus=false, OuiOutsideClickDetector handles it, not backup detection
      // The popover should still close, but through OuiOutsideClickDetector, not our backup mechanism
      fireEvent.mouseDown(outsideButton);
      fireEvent.mouseUp(outsideButton); // OuiOutsideClickDetector uses mouseup

      expect(closePopoverHandler).toHaveBeenCalledTimes(1);
    });

    it('removes mousedown listener when popover closes', () => {
      const removeEventListenerSpy = jest.spyOn(
        document,
        'removeEventListener'
      );
      const closePopoverHandler = jest.fn();

      const { rerender } = render(
        <OuiPopover
          id={getId()}
          button={<button />}
          closePopover={closePopoverHandler}
          isOpen={true}
          ownFocus={true}
        />
      );

      // Close the popover
      rerender(
        <OuiPopover
          id={getId()}
          button={<button />}
          closePopover={closePopoverHandler}
          isOpen={false}
          ownFocus={true}
        />
      );

      // Verify mousedown listener was removed
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'mousedown',
        expect.any(Function),
        false
      );

      removeEventListenerSpy.mockRestore();
    });

    it('does not close popover when clicking on child element inside popover', () => {
      const closePopoverHandler = jest.fn();

      const { container } = render(
        <div>
          <button id="outside-button">Outside Button</button>
          <OuiPopover
            id={getId()}
            button={<button id="popover-button">Popover Button</button>}
            closePopover={closePopoverHandler}
            isOpen={true}
            ownFocus={true}>
            <div id="popover-content">
              <button id="inside-button">Inside Button</button>
            </div>
          </OuiPopover>
        </div>
      );

      const insideButton = container.querySelector(
        '#inside-button'
      ) as HTMLElement;

      // Simulate mousedown on element inside popover
      fireEvent.mouseDown(insideButton);

      // Popover should NOT close because the click came from inside
      expect(closePopoverHandler).not.toHaveBeenCalled();
    });
  });

  describe('focus restoration', () => {
    it('restores focus to focusable element after outside click', async () => {
      const closePopoverHandler = jest.fn();
      const focusSpy = jest.fn();

      const { container } = render(
        <div>
          <input
            id="outside-input"
            onFocus={focusSpy}
            data-testid="outside-input"
          />
          <OuiPopover
            id={getId()}
            button={<button>Popover Button</button>}
            closePopover={closePopoverHandler}
            isOpen={true}
            ownFocus={true}
          />
        </div>
      );

      const outsideInput = container.querySelector(
        '#outside-input'
      ) as HTMLInputElement;

      // Simulate mousedown on outside input
      fireEvent.mouseDown(outsideInput);

      // Wait for requestAnimationFrame
      await act(async () => {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      });

      expect(focusSpy).toHaveBeenCalled();
    });

    it('restores focus to button elements after outside click', async () => {
      const closePopoverHandler = jest.fn();
      const focusSpy = jest.fn();

      const { container } = render(
        <div>
          <button id="outside-button" onFocus={focusSpy}>
            Outside Button
          </button>
          <OuiPopover
            id={getId()}
            button={<button>Popover Button</button>}
            closePopover={closePopoverHandler}
            isOpen={true}
            ownFocus={true}
          />
        </div>
      );

      const outsideButton = container.querySelector(
        '#outside-button'
      ) as HTMLButtonElement;

      // Simulate mousedown on outside button
      fireEvent.mouseDown(outsideButton);

      // Wait for requestAnimationFrame
      await act(async () => {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      });

      expect(focusSpy).toHaveBeenCalled();
    });

    it('finds focusable parent when clicking non-focusable element', async () => {
      const closePopoverHandler = jest.fn();
      const focusSpy = jest.fn();

      const { container } = render(
        <div>
          <button id="parent-button" onFocus={focusSpy}>
            <span id="child-span">Child Span</span>
          </button>
          <OuiPopover
            id={getId()}
            button={<button>Popover Button</button>}
            closePopover={closePopoverHandler}
            isOpen={true}
            ownFocus={true}
          />
        </div>
      );

      const childSpan = container.querySelector(
        '#child-span'
      ) as HTMLSpanElement;

      // Simulate mousedown on child span
      fireEvent.mouseDown(childSpan);

      // Wait for requestAnimationFrame
      await act(async () => {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      });

      expect(focusSpy).toHaveBeenCalled();
    });

    it('handles elements with tabIndex', async () => {
      const closePopoverHandler = jest.fn();
      const focusSpy = jest.fn();

      const { container } = render(
        <div>
          <div id="focusable-div" tabIndex={0} onFocus={focusSpy}>
            Focusable content
          </div>
          <OuiPopover
            id={getId()}
            button={<button>Popover Button</button>}
            closePopover={closePopoverHandler}
            isOpen={true}
            ownFocus={true}
          />
        </div>
      );

      const focusableDiv = container.querySelector(
        '#focusable-div'
      ) as HTMLDivElement;

      // Simulate mousedown on focusable element
      fireEvent.mouseDown(focusableDiv);

      // Wait for requestAnimationFrame
      await act(async () => {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      });

      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe('listener cleanup', () => {
    let _raf: typeof window['requestAnimationFrame'];
    let _caf: typeof window['cancelAnimationFrame'];
    beforeAll(() => {
      jest.useFakeTimers();
      _raf = window.requestAnimationFrame;
      _caf = window.cancelAnimationFrame;

      const activeAnimationFrames = new Map<number, number>();
      let nextAnimationFrameId = 0;
      window.requestAnimationFrame = (fn) => {
        const animationFrameId = nextAnimationFrameId++;
        activeAnimationFrames.set(animationFrameId, setTimeout(fn));
        return animationFrameId;
      };
      window.cancelAnimationFrame = (id: number) => {
        const timeoutId = activeAnimationFrames.get(id);
        if (timeoutId) {
          clearTimeout(timeoutId);
          activeAnimationFrames.delete(id);
        }
      };
    });

    afterAll(() => {
      jest.useRealTimers();
      window.requestAnimationFrame = _raf;
      window.cancelAnimationFrame = _caf;
    });

    it('cleans up timeouts and rAFs on unmount', () => {
      const { unmount, rerender } = render(
        <OuiPopover
          id={getId()}
          button={<button />}
          closePopover={() => {}}
          panelPaddingSize="s"
          isOpen={false}
        />
      );

      rerender(
        <OuiPopover
          id={getId()}
          button={<button />}
          closePopover={() => {}}
          panelPaddingSize="s"
          isOpen={true}
        />
      );

      unmount();

      // OUI's jest configuration throws an error if there are any console.error calls, like
      // React's setState on an unmounted component warning
      // to be future proof, verify that's still the case
      expect(() => {
        console.error('This is a test');
      }).toThrow();

      // execute any pending timeouts or animation frame callbacks
      // and validate the timeout/rAF clearing done by OuiPopover
      act(() => {
        jest.advanceTimersByTime(10);
      });
    });

    it('removes mousedown listener on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(
        document,
        'removeEventListener'
      );

      const { unmount } = render(
        <OuiPopover
          id={getId()}
          button={<button />}
          closePopover={() => {}}
          isOpen={true}
          ownFocus={true}
        />
      );

      unmount();

      // Verify mousedown listener was removed during cleanup
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'mousedown',
        expect.any(Function),
        false
      );

      removeEventListenerSpy.mockRestore();
    });
  });
});

describe('getPopoverPositionFromAnchorPosition', () => {
  it('maps the first anchor position in a camel-cased string to a popover position', () => {
    expect(getPopoverPositionFromAnchorPosition('upLeft')).toBe('top');
    expect(getPopoverPositionFromAnchorPosition('rightDown')).toBe('right');
    expect(getPopoverPositionFromAnchorPosition('downRight')).toBe('bottom');
    expect(getPopoverPositionFromAnchorPosition('leftUp')).toBe('left');
  });

  it('returns undefined when an invalid position is extracted', () => {
    expect(
      getPopoverPositionFromAnchorPosition(
        'nowhereNohow' as PopoverAnchorPosition
      )
    ).toBeUndefined();
  });
});

describe('getPopoverAlignFromAnchorPosition', () => {
  it('maps the second anchor position in a camel-cased string to a popover position', () => {
    expect(getPopoverAlignFromAnchorPosition('upLeft')).toBe('left');
    expect(getPopoverAlignFromAnchorPosition('rightDown')).toBe('bottom');
    expect(getPopoverAlignFromAnchorPosition('downRight')).toBe('right');
    expect(getPopoverAlignFromAnchorPosition('leftUp')).toBe('top');
  });

  it('returns undefined when an invalid position is extracted', () => {
    expect(
      getPopoverAlignFromAnchorPosition('nowhereNohow' as PopoverAnchorPosition)
    ).toBeUndefined();
  });
});
