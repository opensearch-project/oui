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

import React, { useRef, useState } from 'react';
import {
  OuiResizableContainer,
  OuiPanel,
  OuiTitle,
  OuiSpacer,
  OuiButtonGroup,
  OuiButtonIcon,
  OuiFlexGroup,
  OuiFlexItem,
  OuiText,
} from '../../../../src/components';

const toggleButtons = [
  {
    id: '1',
    label: 'Toggle Panel 1',
  },
  {
    id: '2',
    label: 'Toggle Panel 2',
  },
];

export default () => {
  const collapseFn = useRef(() => {});

  const [toggleIdToSelectedMap, setToggleIdToSelectedMap] = useState({});

  const onCollapse = (optionId) => {
    const newToggleIdToSelectedMap = {
      ...toggleIdToSelectedMap,
      [optionId]: !toggleIdToSelectedMap[optionId],
    };
    setToggleIdToSelectedMap(newToggleIdToSelectedMap);
  };

  const onChange = (optionId) => {
    onCollapse(optionId);
    collapseFn.current(`panel${optionId}`, optionId === '3' ? 'right' : 'left');
  };

  return (
    <>
      <div className="oui-textCenter">
        <OuiButtonGroup
          legend="Collapsible panels"
          options={toggleButtons}
          idToSelectedMap={toggleIdToSelectedMap}
          onChange={onChange}
          color="primary"
          type="multi"
        />
      </div>
      <OuiSpacer />
      <OuiResizableContainer
        onToggleCollapsed={onCollapse}
        style={{ height: '250px' }}>
        {(OuiResizablePanel, OuiResizableButton, { togglePanel }) => {
          collapseFn.current = (id, direction = 'left') =>
            togglePanel(id, { direction });
          return (
            <>
              <OuiResizablePanel id="panel1" initialSize={30} minSize="10%">
                <OuiPanel paddingSize="l" style={{ height: '100%' }}>
                  <OuiTitle>
                    <p>Panel 1</p>
                  </OuiTitle>
                </OuiPanel>
              </OuiResizablePanel>

              <OuiResizableButton />

              <OuiResizablePanel id="panel2" initialSize={35} minSize="50px">
                <OuiPanel paddingSize="l" style={{ height: '100%' }}>
                  <OuiTitle>
                    <p>Panel 2</p>
                  </OuiTitle>
                </OuiPanel>
              </OuiResizablePanel>

              <OuiResizableButton />

              <OuiResizablePanel
                mode={['custom', { position: 'top' }]}
                id="panel3"
                initialSize={35}
                minSize="10%">
                <OuiPanel paddingSize="l" style={{ height: '100%' }}>
                  <OuiFlexGroup
                    justifyContent="spaceBetween"
                    alignItems="center">
                    <OuiFlexItem>
                      <OuiTitle>
                        <p>Panel 3</p>
                      </OuiTitle>
                    </OuiFlexItem>
                    <OuiFlexItem grow={false}>
                      <OuiButtonIcon
                        color="text"
                        aria-label={'Toggle panel 3'}
                        iconType="menuRight"
                        onClick={() => onChange(3)}
                      />
                    </OuiFlexItem>
                  </OuiFlexGroup>
                  <OuiSpacer />
                  <OuiText size="s">
                    <p>
                      This panel provides its own button for triggering
                      collapsibility but relies on the default collapsed button
                      to uncollapse.
                    </p>
                  </OuiText>
                </OuiPanel>
              </OuiResizablePanel>
            </>
          );
        }}
      </OuiResizableContainer>
    </>
  );
};
