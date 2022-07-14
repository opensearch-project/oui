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
  OuiButtonIcon,
  OuiPopover,
  OuiContextMenu,
  OuiPopoverTitle,
} from '../../../../src/components';

function flattenPanelTree(tree, array = []) {
  array.push(tree);

  if (tree.items) {
    tree.items.forEach((item) => {
      if (item.panel) {
        flattenPanelTree(item.panel, array);
        item.panel = item.panel.id;
      }
    });
  }

  return array;
}

export default () => {
  const [isPopoverOpen, setPopover] = useState(false);

  const togglePopover = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const panelTree = {
    id: 0,
    items: [
      {
        name: 'Enable all',
        icon: 'eye',
        onClick: () => {
          closePopover();
        },
      },
      {
        name: 'Disable all',
        icon: 'eyeClosed',
        onClick: () => {
          closePopover();
        },
      },
      {
        name: 'Pin all',
        icon: 'pin',
        onClick: () => {
          closePopover();
        },
      },
      {
        name: 'Unpin all',
        icon: 'pin',
        onClick: () => {
          closePopover();
        },
      },
      {
        name: 'Invert inclusion',
        icon: 'invert',
        onClick: () => {
          closePopover();
        },
      },
      {
        name: 'Invert visibility',
        icon: 'eye',
        onClick: () => {
          closePopover();
        },
      },
      {
        name: 'Remove all',
        icon: 'trash',
        onClick: () => {
          closePopover();
        },
      },
    ],
  };

  return (
    <OuiPopover
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      button={
        <OuiButtonIcon
          onClick={togglePopover}
          color="text"
          iconType="filter"
          aria-label="Change all filters"
          title="Change all filters"
        />
      }
      anchorPosition="downCenter"
      panelPaddingSize="none">
      <OuiPopoverTitle paddingSize="s">Change all filters</OuiPopoverTitle>
      <OuiContextMenu initialPanelId={0} panels={flattenPanelTree(panelTree)} />
    </OuiPopover>
  );
};
