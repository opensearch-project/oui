/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { KeyboardEvent as ReactKeyboardEvent } from 'react';

/**
 * Whether a keydown belongs to an IME composition (Korean, Japanese, Chinese, ...). Keys pressed
 * then belong to the IME: Enter and Escape only commit or cancel the composed text. React's
 * synthetic event does not expose `isComposing`, so for React events read the native event. Native
 * listeners (window, document, react-focus-on callbacks) can pass their event directly.
 *
 * `keyCode === 229` covers Safari, which fires `compositionend` before the keydown that commits a
 * Chinese or Japanese composition or cancels one, so that keydown arrives with
 * `isComposing === false`. This is the check MDN recommends. Chrome with the Korean IME follows a
 * composing Enter with a second, non-composing keydown (`keyCode` 13) once the syllable is
 * committed, and Safari sends the Korean Enter once with `keyCode` 13; both pass, and handlers act
 * on them.
 */
export const isComposingKeyboardEvent = (
  event: ReactKeyboardEvent | KeyboardEvent | Event
): boolean => {
  const native = ('nativeEvent' in event ? event.nativeEvent : event) as
    | KeyboardEvent
    | undefined;
  return Boolean(native?.isComposing) || native?.keyCode === 229;
};
