/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { KeyboardEvent } from 'react';

/**
 * Whether a keydown arrives while an IME composition (Korean, Japanese, Chinese, ...) is still
 * active. Keys pressed then belong to the IME: an Enter only commits the composed text. React's
 * synthetic event does not expose `isComposing`, so read the native event.
 *
 * Do not also check `keyCode === 229`. Browsers that end the composition before the keydown
 * (Safari) deliver that Enter with the final text and `isComposing === false`; older WebKit set
 * `keyCode` to 229 on it, and ignoring it would swallow the only Enter.
 */
export const isComposingKeyboardEvent = (event: KeyboardEvent): boolean =>
  Boolean(event.nativeEvent?.isComposing);
