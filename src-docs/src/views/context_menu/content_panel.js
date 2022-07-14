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
  OuiContextMenuPanel,
  OuiPopover,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setPopover] = useState(false);

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const button = (
    <OuiButton
      size="s"
      iconType="arrowDown"
      iconSide="right"
      onClick={onButtonClick}>
      Click to show some content
    </OuiButton>
  );

  return (
    <OuiPopover
      id="contentPanel"
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="s"
      anchorPosition="downLeft">
      <OuiContextMenuPanel>
        This context menu doesn&#39;t render items, it passes a child instead.
      </OuiContextMenuPanel>
    </OuiPopover>
  );
};
