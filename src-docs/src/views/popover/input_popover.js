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
  OuiInputPopover,
  OuiFieldText,
  OuiSpacer,
} from '../../../../src/components';

export default () => {
  const [inputWidth, setInputWidth] = useState(200);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isPopoverOpenTwo, setIsPopoverOpenTwo] = useState(false);
  const toggleIsPopoverOpen = (shouldBeOpen = !isPopoverOpen) => {
    setIsPopoverOpen(shouldBeOpen);
  };
  const toggleIsPopoverOpenTwo = (shouldBeOpen = !isPopoverOpenTwo) => {
    setIsPopoverOpenTwo(shouldBeOpen);
  };

  const input = (
    <OuiFieldText
      onFocus={() => toggleIsPopoverOpen()}
      aria-label="Popover attached to input element"
    />
  );

  const inputTwo = (
    <OuiFieldText
      onFocus={() => {
        setInputWidth(400);
        toggleIsPopoverOpenTwo();
      }}
      style={{ width: inputWidth }}
      aria-label="Popover attached to an adjustable sized input element"
    />
  );

  return (
    <React.Fragment>
      <OuiInputPopover
        input={input}
        isOpen={isPopoverOpen}
        closePopover={() => {
          toggleIsPopoverOpen(false);
        }}>
        Popover content
      </OuiInputPopover>

      <OuiSpacer />

      <OuiInputPopover
        input={inputTwo}
        isOpen={isPopoverOpenTwo}
        closePopover={() => {
          toggleIsPopoverOpenTwo(false);
          setInputWidth(200);
        }}>
        Popover will adjust in size as the input does
      </OuiInputPopover>
    </React.Fragment>
  );
};
