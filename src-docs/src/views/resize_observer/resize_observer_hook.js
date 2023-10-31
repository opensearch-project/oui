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
  OuiButton,
  OuiButtonEmpty,
  OuiCode,
  OuiIcon,
  OuiPanel,
  OuiSpacer,
  OuiText,
  useResizeObserver,
} from '../../../../src/components';

export const ResizeObserverHookExample = () => {
  const hasResizeObserver = typeof ResizeObserver !== 'undefined';
  const [paddingSize, setPaddingSize] = useState('s');
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const togglePaddingSize = () => {
    setPaddingSize((paddingSize) => (paddingSize === 's' ? 'l' : 's'));
  };

  const addItem = () => {
    setItems((items) => [...items, `Item ${items.length + 1}`]);
  };

  const resizeRef = useRef();
  const dimensions = useResizeObserver(resizeRef.current);

  return (
    <div>
      <OuiText>
        {hasResizeObserver ? (
          <p>
            <OuiIcon type="checkInCircleFilled" color="success" /> Browser
            supports ResizeObserver API.
          </p>
        ) : (
          <p>
            <OuiIcon type="crossInACircleFilled" color="danger" /> Browser does
            not support ResizeObserver API. Using MutationObserver.
          </p>
        )}
        <p>
          <OuiCode>{`height: ${dimensions.height}; width: ${dimensions.width}`}</OuiCode>
        </p>
      </OuiText>

      <OuiSpacer />

      <OuiButton fill={true} onClick={togglePaddingSize}>
        Toggle container padding
      </OuiButton>

      <OuiSpacer />

      <div className="oui-displayInlineBlock" ref={resizeRef}>
        <OuiPanel className="oui-displayInlineBlock" paddingSize={paddingSize}>
          <ul>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <OuiSpacer size="s" />
          <OuiButtonEmpty onClick={addItem}>add item</OuiButtonEmpty>
        </OuiPanel>
      </div>
    </div>
  );
};
