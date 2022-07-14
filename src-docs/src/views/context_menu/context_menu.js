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
  OuiContextMenu,
  OuiFormRow,
  OuiIcon,
  OuiPopover,
  OuiSwitch,
  OuiSpacer,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setPopover] = useState(false);

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const panels = [
    {
      id: 0,
      title: 'This is a context menu',
      items: [
        {
          name: 'Handle an onClick',
          icon: 'search',
          onClick: () => {
            closePopover();
          },
        },
        {
          name: 'Go to a link',
          icon: 'user',
          href: 'http://elastic.co',
          target: '_blank',
        },
        {
          name: 'Nest panels',
          icon: 'wrench',
          panel: 1,
        },
        {
          name: 'Add a tooltip',
          icon: 'document',
          toolTipTitle: 'Optional tooltip',
          toolTipContent: 'Optional content for a tooltip',
          toolTipPosition: 'right',
          onClick: () => {
            closePopover();
          },
        },
        {
          name: 'Use an app icon',
          icon: 'visualizeApp',
        },
        {
          name: 'Pass an icon as a component to customize it',
          icon: <OuiIcon type="trash" size="m" color="danger" />,
        },
        {
          name: 'Disabled option',
          icon: 'user',
          toolTipContent: 'For reasons, this item is disabled',
          toolTipPosition: 'right',
          disabled: true,
          onClick: () => {
            closePopover();
          },
        },
      ],
    },
    {
      id: 1,
      initialFocusedItemIndex: 1,
      title: 'Nest panels',
      items: [
        {
          name: 'PDF reports',
          icon: 'user',
          onClick: () => {
            closePopover();
          },
        },
        {
          name: 'Embed code',
          icon: 'user',
          panel: 2,
        },
        {
          name: 'Permalinks',
          icon: 'user',
          onClick: () => {
            closePopover();
          },
        },
      ],
    },
    {
      id: 2,
      title: 'Embed code',
      content: (
        <div style={{ padding: 16 }}>
          <OuiFormRow label="Generate a public snapshot?" hasChildLabel={false}>
            <OuiSwitch
              name="switch"
              id="asdf"
              label="Snapshot data"
              checked={true}
              onChange={() => {}}
            />
          </OuiFormRow>
          <OuiFormRow
            label="Include the following in the embed"
            hasChildLabel={false}>
            <OuiSwitch
              name="switch"
              id="asdf2"
              label="Current time range"
              checked={true}
              onChange={() => {}}
            />
          </OuiFormRow>
          <OuiSpacer />
          <OuiButton fill>Copy iFrame code</OuiButton>
        </div>
      ),
    },
  ];

  const button = (
    <OuiButton iconType="arrowDown" iconSide="right" onClick={onButtonClick}>
      Click me to load a context menu
    </OuiButton>
  );

  return (
    <OuiPopover
      id="contextMenuExample"
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="downLeft">
      <OuiContextMenu initialPanelId={0} panels={panels} />
    </OuiPopover>
  );
};
