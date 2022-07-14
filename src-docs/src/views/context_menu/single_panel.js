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
  OuiButtonEmpty,
  OuiContextMenuPanel,
  OuiContextMenuItem,
  OuiPopover,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setPopover] = useState(false);
  const [rowSize, setRowSize] = useState(50);

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const getIconType = (size) => {
    return size === rowSize ? 'check' : 'empty';
  };

  const button = (
    <OuiButtonEmpty
      size="s"
      iconType="arrowDown"
      iconSide="right"
      onClick={onButtonClick}>
      Rows per page: {rowSize}
    </OuiButtonEmpty>
  );

  const items = [
    <OuiContextMenuItem
      key="10 rows"
      icon={getIconType(10)}
      onClick={() => {
        closePopover();
        setRowSize(10);
      }}>
      10 rows
    </OuiContextMenuItem>,
    <OuiContextMenuItem
      key="20 rows"
      icon={getIconType(20)}
      onClick={() => {
        closePopover();
        setRowSize(20);
      }}>
      20 rows
    </OuiContextMenuItem>,
    <OuiContextMenuItem
      key="50 rows"
      icon={getIconType(50)}
      onClick={() => {
        closePopover();
        setRowSize(50);
      }}>
      50 rows
    </OuiContextMenuItem>,
    <OuiContextMenuItem
      key="100 rows"
      icon={getIconType(100)}
      onClick={() => {
        closePopover();
        setRowSize(100);
      }}>
      100 rows
    </OuiContextMenuItem>,
  ];

  return (
    <OuiPopover
      id="singlePanel"
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="downLeft">
      <OuiContextMenuPanel size="s" items={items} />
    </OuiPopover>
  );
};
