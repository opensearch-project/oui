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
  OuiIcon,
  OuiPopover,
  OuiSpacer,
  OuiText,
} from '../../../../src/components';

import OuiTabsExample from '../tabs/tabbed_content';

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
  const [isDynamicPopoverOpen, setDynamicPopover] = useState(false);

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const onDynamicButtonClick = () => {
    setDynamicPopover(!isDynamicPopoverOpen);
  };

  const closeDynamicPopover = () => {
    setDynamicPopover(false);
  };

  const createPanelTree = (Content) => {
    return flattenPanelTree({
      id: 0,
      title: 'View options',
      items: [
        {
          name: 'Show full screen',
          icon: <OuiIcon type="search" size="m" />,
          onClick: () => {
            closePopover();
          },
        },
        {
          isSeparator: true,
          key: 'sep',
        },
        {
          name: 'See more',
          icon: 'plusInCircle',
          panel: {
            id: 1,
            width: 400,
            title: 'See more',
            content: <Content />,
          },
        },
      ],
    });
  };

  const panels = createPanelTree(() => (
    <OuiText style={{ padding: 24 }} textAlign="center">
      <p>
        <OuiIcon type="faceHappy" size="xxl" />
      </p>

      <h3>Context panels can contain anything</h3>
      <p>
        You can stuff just about anything into these panels. Be mindful of size
        though. This panel is set to 400px and the height will grow as space
        allows.
      </p>
    </OuiText>
  ));

  const dynamicPanels = createPanelTree(OuiTabsExample);

  const button = (
    <OuiButton iconType="arrowDown" iconSide="right" onClick={onButtonClick}>
      Click me to load mixed content menu
    </OuiButton>
  );

  const dynamicButton = (
    <OuiButton
      iconType="arrowDown"
      iconSide="right"
      onClick={onDynamicButtonClick}>
      Click me to load dynamic mixed content menu
    </OuiButton>
  );

  return (
    <React.Fragment>
      <OuiPopover
        id="contextMenuNormal"
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="none"
        anchorPosition="upLeft">
        <OuiContextMenu initialPanelId={0} panels={panels} />
      </OuiPopover>

      <OuiSpacer size="l" />

      <OuiPopover
        id="contextMenuDynamic"
        button={dynamicButton}
        isOpen={isDynamicPopoverOpen}
        closePopover={closeDynamicPopover}
        panelPaddingSize="none"
        anchorPosition="upLeft">
        <OuiContextMenu initialPanelId={0} panels={dynamicPanels} />
      </OuiPopover>
    </React.Fragment>
  );
};
