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
  OuiCode,
  OuiResizeObserver,
  OuiPanel,
  OuiSpacer,
  OuiText,
} from '../../../../src/components';

export const ResizeObserverExample = () => {
  const [paddingSize, setPaddingSize] = useState('s');
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const togglePaddingSize = () => {
    setPaddingSize((paddingSize) => (paddingSize === 's' ? 'l' : 's'));
  };

  const addItem = () => {
    setItems((items) => [...items, `Item ${items.length + 1}`]);
  };

  const onResize = ({ height, width }) => {
    setHeight(height);
    setWidth(width);
  };

  return (
    <div>
      <OuiText>
        <p>
          <OuiCode>{`height: ${height}; width: ${width}`}</OuiCode>
        </p>
      </OuiText>

      <OuiSpacer />

      <OuiButton fill={true} onClick={togglePaddingSize}>
        Toggle container padding
      </OuiButton>

      <OuiSpacer />

      <OuiResizeObserver onResize={onResize}>
        {(resizeRef) => (
          <div className="oui-displayInlineBlock" ref={resizeRef}>
            <OuiPanel
              className="oui-displayInlineBlock"
              paddingSize={paddingSize}>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <OuiSpacer size="s" />
              <OuiButtonEmpty onClick={addItem}>add item</OuiButtonEmpty>
            </OuiPanel>
          </div>
        )}
      </OuiResizeObserver>
    </div>
  );
};
