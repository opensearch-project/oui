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

  test('is false for a plain Enter', () => {
    expect(
      isComposingKeyboardEvent(keyDown({ key: 'Enter', keyCode: 13 }))
    ).toBe(false);
  });

  test('is false for a keyCode 229 Enter that arrives after the composition ended', () => {
    expect(
      isComposingKeyboardEvent(keyDown({ key: 'Enter', keyCode: 229 }))
    ).toBe(false);
  });

  test('is false when the event has no native event', () => {
    expect(isComposingKeyboardEvent(({} as unknown) as KeyboardEvent)).toBe(
      false
    );
  });
});
