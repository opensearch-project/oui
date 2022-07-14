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
  OuiCodeBlock,
} from '../../../../src/components';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  let flyout;

  const htmlCode = `<OuiFlyout ...>
  <OuiFlyoutHeader hasBorder>
    <OuiTitle size="m">
      <h2></h2>
    </OuiTitle>
  </OuiFlyoutHeader>
  <OuiFlyoutBody>
    ...
  </OuiFlyoutBody>
</OuiFlyout>
`;

  if (isFlyoutVisible) {
    flyout = (
      <OuiFlyout
        ownFocus
        onClose={() => setIsFlyoutVisible(false)}
        aria-labelledby="flyoutTitle">
        <OuiFlyoutHeader hasBorder>
          <OuiTitle size="m">
            <h2 id="flyoutTitle">A typical flyout</h2>
          </OuiTitle>
        </OuiFlyoutHeader>
        <OuiFlyoutBody>
          <OuiText>
            <p>
              For consistency across the many flyouts, please utilize the
              following code for implementing the flyout with a header.
            </p>
          </OuiText>
          <OuiCodeBlock language="html">{htmlCode}</OuiCodeBlock>
        </OuiFlyoutBody>
      </OuiFlyout>
    );
  }

  return (
    <div>
      <OuiButton onClick={() => setIsFlyoutVisible(true)}>
        Show flyout
      </OuiButton>
      {flyout}
    </div>
  );
};
