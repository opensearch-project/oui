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
  OuiContextMenuItem,
  OuiContextMenuPanel,
  OuiFlexGroup,
  OuiFlexItem,
  OuiPagination,
  OuiPopover,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [rowSize, setRowSize] = useState(50);

  const PAGE_COUNT = 10;

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const goToPage = (pageNumber) => setActivePage(pageNumber);

  const getIconType = (size) => {
    return size === rowSize ? 'check' : 'empty';
  };

  const button = (
    <OuiButtonEmpty
      size="s"
      color="text"
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
    <OuiFlexGroup justifyContent="spaceBetween" alignItems="center">
      <OuiFlexItem grow={false}>
        <OuiPopover
          button={button}
          isOpen={isPopoverOpen}
          closePopover={closePopover}
          panelPaddingSize="none">
          <OuiContextMenuPanel items={items} />
        </OuiPopover>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiPagination
          aria-label="Custom pagination example"
          pageCount={PAGE_COUNT}
          activePage={activePage}
          onPageClick={goToPage}
        />
      </OuiFlexItem>
    </OuiFlexGroup>
  );
};
