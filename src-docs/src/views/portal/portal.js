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

import { OuiPortal, OuiButton, OuiBottomBar } from '../../../../src/components';

export const Portal = () => {
  const [isPortalVisible, setIsPortalVisible] = useState(false);

  const togglePortal = () => {
    setIsPortalVisible(!isPortalVisible);
  };

  let portal;

  if (isPortalVisible) {
    portal = (
      <OuiPortal>
        <OuiBottomBar>
          <p>This element is appended to the body in the DOM if you inspect</p>
        </OuiBottomBar>
      </OuiPortal>
    );
  }
  return (
    <div>
      <OuiButton onClick={togglePortal}>Toggle portal</OuiButton>

      {portal}
    </div>
  );
};
