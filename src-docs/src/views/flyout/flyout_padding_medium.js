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
  OuiCallOut,
  OuiFlexGroup,
  OuiFlexItem,
  OuiFlyout,
  OuiFlyoutHeader,
  OuiFlyoutBody,
  OuiFlyoutFooter,
  OuiButtonGroup,
  OuiButton,
  OuiFormRow,
  OuiTitle,
} from '../../../../src/components';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [paddingSize, setPaddingSize] = useState('l');
  const [paddingSizeName, setPaddingSizeName] = useState('large');

  const sizes = [
    {
      id: 'none',
      label: 'None',
    },
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
  ];

  const closeFlyout = () => setIsFlyoutVisible(false);

  const showFlyout = () => setIsFlyoutVisible(true);

  const callOut = (
    <OuiCallOut
      title={`The banner left and right padding is ${paddingSizeName} to match that of flyout`}
    />
  );

  let flyout;
  if (isFlyoutVisible) {
    flyout = (
      <OuiFlyout
        ownFocus
        onClose={closeFlyout}
        paddingSize={paddingSize}
        id="flyoutMediumPadding"
        aria-labelledby="flyoutMediumPaddingTitle">
        <OuiFlyoutHeader hasBorder>
          <OuiTitle size="m">
            <h2 id="flyoutMediumPaddingTitle">
              A flyout with a {paddingSizeName} padding
            </h2>
          </OuiTitle>
        </OuiFlyoutHeader>
        <OuiFlyoutBody banner={callOut}>
          <OuiFormRow label="Change the paddingSize">
            <OuiButtonGroup
              legend="Flyout paddingSize"
              color="primary"
              size="s"
              options={sizes}
              idSelected={paddingSize}
              onChange={(id) => {
                const newName = sizes
                  .find((size) => size.id === id)
                  .label.toLowerCase();
                setPaddingSize(id);
                setPaddingSizeName(newName);
              }}
            />
          </OuiFormRow>
        </OuiFlyoutBody>
        <OuiFlyoutFooter>
          <OuiFlexGroup justifyContent="spaceBetween">
            <OuiFlexItem grow={false}>
              <OuiButtonEmpty
                iconType="cross"
                onClick={closeFlyout}
                flush="left">
                Close
              </OuiButtonEmpty>
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiButton onClick={closeFlyout} fill>
                Save
              </OuiButton>
            </OuiFlexItem>
          </OuiFlexGroup>
        </OuiFlyoutFooter>
      </OuiFlyout>
    );
  }
  return (
    <>
      <OuiButton
        onClick={showFlyout}
        aria-controls="flyoutMediumPadding"
        aria-expanded={isFlyoutVisible}
        aria-haspopup="true"
        aria-label="Show padding size flyout">
        Show flyout to test padding sizes
      </OuiButton>
      {flyout}
    </>
  );
};
