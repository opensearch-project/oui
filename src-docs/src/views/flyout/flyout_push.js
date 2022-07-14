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
  OuiFlyoutBody,
  OuiFlyoutHeader,
  OuiButton,
  OuiText,
  OuiTitle,
  OuiFlyoutFooter,
} from '../../../../src/components';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  let flyout;

  if (isFlyoutVisible) {
    flyout = (
      <OuiFlyout
        type="push"
        size="s"
        onClose={() => setIsFlyoutVisible(false)}
        aria-labelledby="pushedFlyoutTitle">
        <OuiFlyoutHeader hasBorder>
          <OuiTitle size="m">
            <h2 id="pushedFlyoutTitle">A pushed flyout</h2>
          </OuiTitle>
        </OuiFlyoutHeader>
        <OuiFlyoutBody>
          <OuiText>
            <p>
              A pushed flyout typically contains more information about a
              particular piece of data or complex form controls for editing.
            </p>
            <p>
              Also, it is good to include a close button in the footer for a
              larger hit target than the small close button provides.
            </p>
          </OuiText>
        </OuiFlyoutBody>
        <OuiFlyoutFooter>
          <OuiButton onClick={() => setIsFlyoutVisible(false)}>Close</OuiButton>
        </OuiFlyoutFooter>
      </OuiFlyout>
    );
  }

  return (
    <div>
      <OuiButton onClick={() => setIsFlyoutVisible((visible) => !visible)}>
        Toggle pushed flyout
      </OuiButton>
      {flyout}
    </div>
  );
};
