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

import { OuiButton, OuiPopover } from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <OuiButton onClick={onButtonClick} fullWidth>
      This button is expanded
    </OuiButton>
  );

  return (
    <OuiPopover
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      display="block">
      <div>This is a popover</div>
    </OuiPopover>
  );
};
