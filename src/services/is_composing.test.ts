/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { KeyboardEvent } from 'react';
import { isComposingKeyboardEvent } from './is_composing';

const keyDown = (init: KeyboardEventInit & { keyCode?: number }) =>
  (({
    nativeEvent: new window.KeyboardEvent('keydown', init),
    keyCode: init.keyCode ?? 0,
  } as unknown) as KeyboardEvent);

describe('isComposingKeyboardEvent', () => {
  test('is true while the native event is composing', () => {
    expect(
      isComposingKeyboardEvent(
        keyDown({ key: 'Enter', keyCode: 229, isComposing: true })
      )
    ).toBe(true);
  });

  test('is true for a composing keydown that carries the real keyCode', () => {
    expect(
      isComposingKeyboardEvent(
        keyDown({ key: 'Enter', keyCode: 13, isComposing: true })
      )
    ).toBe(true);
  });

  test('is false for a plain Enter, including the one that follows a Korean commit', () => {
    expect(
      isComposingKeyboardEvent(keyDown({ key: 'Enter', keyCode: 13 }))
    ).toBe(false);
  });

  test("is true for Safari's commit Enter and cancel Escape after compositionend", () => {
    expect(
      isComposingKeyboardEvent(keyDown({ key: 'Enter', keyCode: 229 }))
    ).toBe(true);
    expect(
      isComposingKeyboardEvent(keyDown({ key: 'Escape', keyCode: 229 }))
    ).toBe(true);
  });

  test('reads a native keydown passed directly', () => {
    expect(
      isComposingKeyboardEvent(
        new window.KeyboardEvent('keydown', {
          key: 'Escape',
          isComposing: true,
        })
      )
    ).toBe(true);
    expect(
      isComposingKeyboardEvent(
        new window.KeyboardEvent('keydown', { key: 'Escape' })
      )
    ).toBe(false);
  });

  test('is false when the event has no native event', () => {
    expect(isComposingKeyboardEvent(({} as unknown) as KeyboardEvent)).toBe(
      false
    );
  });
});
