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
  OuiFlyout,
  OuiFlyoutHeader,
  OuiFlyoutBody,
  OuiButton,
  OuiTitle,
  OuiFormRow,
  OuiButtonGroup,
} from '../../../../src/components';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [size, setSize] = useState('l');
  const [sizeName, setSizeName] = useState('large');

  const sizes = [
    {
      id: 's',
      label: 'Small',
    },
    {
      id: 'm',
      label: 'Medium',
    },
    {
      id: 'l',
      label: 'Large',
    },
    {
      id: '400px',
      label: 'Fixed (400)',
    },
  ];

  const closeFlyout = () => setIsFlyoutVisible(false);

  const showFlyout = () => setIsFlyoutVisible(true);

  let flyout;
  if (isFlyoutVisible) {
    flyout = (
      <OuiFlyout
        ownFocus
        onClose={closeFlyout}
        size={size}
        aria-labelledby="flyoutLargeTitle">
        <OuiFlyoutHeader hasBorder>
          <OuiTitle size="m">
            <h2 id="flyoutLargeTitle">A {sizeName.toLowerCase()} flyout</h2>
          </OuiTitle>
        </OuiFlyoutHeader>
        <OuiFlyoutBody>
          <OuiFormRow label="Change the paddingSize">
            <OuiButtonGroup
              legend="Flyout size"
              color="primary"
              size="s"
              options={sizes}
              idSelected={size}
              onChange={(id) => {
                const newName = sizes
                  .find((size) => size.id === id)
                  .label.toLowerCase();
                setSize(id);
                setSizeName(newName);
              }}
            />
          </OuiFormRow>
        </OuiFlyoutBody>
      </OuiFlyout>
    );
  }
  return (
    <div>
      <OuiButton onClick={showFlyout}>Show flyout to test widths</OuiButton>
      {flyout}
    </div>
  );
};
