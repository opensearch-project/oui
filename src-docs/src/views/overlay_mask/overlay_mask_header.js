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
  OuiOverlayMask,
  OuiButton,
  OuiFlyout,
  OuiTitle,
  OuiFlyoutHeader,
} from '../../../../src/components';

export default () => {
  const [flyOut, changeFlyOut] = useState(false);

  const toggleFlyOut = () => {
    changeFlyOut(!flyOut);
  };

  let flyout;
  if (flyOut) {
    flyout = (
      <React.Fragment>
        <OuiOverlayMask onClick={toggleFlyOut} headerZindexLocation="below" />
        <OuiFlyout size="s" onClose={toggleFlyOut}>
          <OuiFlyoutHeader>
            <OuiTitle>
              <h1>Click outside this flyout to close overlay. </h1>
            </OuiTitle>
          </OuiFlyoutHeader>
        </OuiFlyout>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <OuiButton onClick={() => toggleFlyOut()}>
        Overlay as a sibling of a flyout
      </OuiButton>
      {flyout}
    </React.Fragment>
  );
};
