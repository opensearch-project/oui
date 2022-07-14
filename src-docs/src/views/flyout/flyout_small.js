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

import React, { useState } from 'react';

import {
  OuiFlyout,
  OuiFlyoutHeader,
  OuiFlyoutBody,
  OuiButton,
  OuiText,
  OuiTitle,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  const closeFlyout = () => setIsFlyoutVisible(false);

  const toggleFlyout = () => setIsFlyoutVisible((isVisible) => !isVisible);

  const flyoutTitleId = htmlIdGenerator('flyout')();

  let flyout;
  if (isFlyoutVisible) {
    flyout = (
      <OuiFlyout
        ownFocus={false}
        onClose={closeFlyout}
        aria-labelledby={flyoutTitleId}>
        <OuiFlyoutHeader hasBorder>
          <OuiTitle size="s">
            <h2 id={flyoutTitleId}>A flyout without ownFocus</h2>
          </OuiTitle>
        </OuiFlyoutHeader>
        <OuiFlyoutBody>
          <OuiText>
            <p>
              The page contents is still interactable though screenreader users
              will find themselves still within the bounds of the flyout.
            </p>
          </OuiText>
        </OuiFlyoutBody>
      </OuiFlyout>
    );
  }
  return (
    <div>
      <OuiButton onClick={toggleFlyout}>Toggle flyout</OuiButton>

      {flyout}
    </div>
  );
};
