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

import { OuiPortal, OuiButton } from '../../../../src/components';
import { OuiSpacer } from '../../../../src/components/spacer/spacer';

let buttonRef = null;

export const PortalInsert = () => {
  const [isPortalVisible, setIsPortalVisible] = useState(false);

  const setButtonRef = (node) => (buttonRef = node);

  const togglePortal = () => {
    setIsPortalVisible(!isPortalVisible);
  };

  let portal;

  if (isPortalVisible) {
    portal = (
      <OuiPortal insert={{ sibling: buttonRef, position: 'after' }}>
        <OuiSpacer />
        <p>This element is appended immediately after the button.</p>
      </OuiPortal>
    );
  }
  return (
    <div>
      <OuiButton onClick={togglePortal} buttonRef={setButtonRef}>
        Toggle portal
      </OuiButton>
      {portal}
    </div>
  );
};
