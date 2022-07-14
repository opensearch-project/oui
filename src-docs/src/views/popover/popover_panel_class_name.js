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

import { OuiPopover, OuiButton, OuiText } from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  return (
    <OuiPopover
      button={
        <OuiButton
          iconType="arrowDown"
          iconSide="right"
          onClick={onButtonClick}>
          Text scaling
        </OuiButton>
      }
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelClassName="guideDemo__textLines">
      <OuiText style={{ width: 100 }}>
        <p>This has a custom class that applies some grid lines.</p>
      </OuiText>
    </OuiPopover>
  );
};
