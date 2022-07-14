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
  OuiButton,
  OuiCode,
  OuiPanel,
  OuiPopover,
  OuiSpacer,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [panelRef, setPanelRef] = useState(null);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen1) => !isPopoverOpen1);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <OuiButton
      iconType="arrowDown"
      iconSide="right"
      onClick={onButtonClick}
      style={{ position: 'relative', left: 50 }}>
      Show constrained popover
    </OuiButton>
  );

  return (
    <OuiPanel panelRef={setPanelRef}>
      <OuiPopover
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        container={panelRef}>
        <div>
          Popover is positioned <OuiCode>downCenter</OuiCode> but constrained to
          fit within the panel.
        </div>
      </OuiPopover>

      {/* create adequate room for the popover */}
      <OuiSpacer size="xxl" />
      <OuiSpacer size="xxl" />
    </OuiPanel>
  );
};
