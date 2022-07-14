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
  OuiButtonEmpty,
  OuiFlexItem,
  OuiFlexGroup,
  OuiMutationObserver,
  OuiPanel,
  OuiSpacer,
} from '../../../../src/components';

export const MutationObserver = () => {
  const [lastMutation, setLastMutation] = useState('no changes detected');
  const [buttonColor, setButtonColor] = useState('primary');
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const toggleButtonColor = () => {
    setButtonColor(buttonColor === 'primary' ? 'warning' : 'primary');
  };

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };

  const onMutation = ([{ type }]) => {
    setLastMutation(
      type === 'attributes' ? 'button class name changed' : 'DOM tree changed'
    );
  };

  return (
    <div>
      <p>{lastMutation}</p>

      <OuiSpacer />

      <OuiMutationObserver
        observerOptions={{ subtree: true, attributes: true, childList: true }}
        onMutation={onMutation}>
        {(mutationRef) => (
          <div ref={mutationRef}>
            <OuiButton
              color={buttonColor}
              fill={true}
              onClick={toggleButtonColor}>
              Toggle button color
            </OuiButton>

            <OuiSpacer />

            <OuiFlexGroup>
              <OuiFlexItem grow={false}>
                <OuiPanel grow={false}>
                  <ul>
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <OuiSpacer size="s" />
                  <OuiButtonEmpty onClick={addItem}>add item</OuiButtonEmpty>
                </OuiPanel>
              </OuiFlexItem>
            </OuiFlexGroup>
          </div>
        )}
      </OuiMutationObserver>
    </div>
  );
};
