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
  OuiPopover,
  OuiPopoverTitle,
  OuiPopoverFooter,
  OuiButton,
  OuiFlexGroup,
  OuiFlexItem,
  OuiText,
  OuiTextColor,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen1, setIsPopoverOpen1] = useState(false);
  const [isPopoverOpen2, setIsPopoverOpen2] = useState(false);
  const [isPopoverOpen3, setIsPopoverOpen3] = useState(false);

  const onButtonClick1 = () =>
    setIsPopoverOpen1((isPopoverOpen1) => !isPopoverOpen1);
  const closePopover1 = () => setIsPopoverOpen1(false);

  const onButtonClick2 = () =>
    setIsPopoverOpen2((isPopoverOpen2) => !isPopoverOpen2);
  const closePopover2 = () => setIsPopoverOpen2(false);

  const onButtonClick3 = () =>
    setIsPopoverOpen3((isPopoverOpen3) => !isPopoverOpen3);
  const closePopover3 = () => setIsPopoverOpen3(false);

  return (
    <OuiFlexGroup>
      <OuiFlexItem grow={false}>
        <OuiPopover
          button={
            <OuiButton
              iconType="arrowDown"
              iconSide="right"
              onClick={onButtonClick1}>
              With title
            </OuiButton>
          }
          isOpen={isPopoverOpen1}
          closePopover={closePopover1}
          anchorPosition="downCenter">
          <OuiPopoverTitle>Hello, I&rsquo;m a popover title</OuiPopoverTitle>
          <div style={{ width: '300px' }}>
            <OuiText size="s">
              <p>
                Selfies migas stumptown hot chicken quinoa wolf green juice,
                mumblecore tattooed trust fund hammock truffaut taxidermy kogi.
              </p>
            </OuiText>
          </div>
        </OuiPopover>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiPopover
          button={
            <OuiButton
              iconType="arrowDown"
              iconSide="right"
              onClick={onButtonClick2}>
              With footer
            </OuiButton>
          }
          isOpen={isPopoverOpen2}
          closePopover={closePopover2}
          anchorPosition="upCenter">
          <div style={{ width: '300px' }}>
            <OuiText size="s">
              <p>
                Selfies migas stumptown hot chicken quinoa wolf green juice,
                mumblecore tattooed trust fund hammock truffaut taxidermy kogi.
              </p>
            </OuiText>
          </div>
          <OuiPopoverFooter>
            <OuiTextColor color="subdued">
              Hello, I&rsquo;m a small popover footer caption
            </OuiTextColor>
          </OuiPopoverFooter>
        </OuiPopover>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiPopover
          button={
            <OuiButton
              iconType="arrowDown"
              iconSide="right"
              onClick={onButtonClick3}>
              With title and footer button
            </OuiButton>
          }
          isOpen={isPopoverOpen3}
          closePopover={closePopover3}
          anchorPosition="upCenter">
          <OuiPopoverTitle>Hello, I&rsquo;m a popover title</OuiPopoverTitle>
          <div style={{ width: '300px' }}>
            <OuiText size="s">
              <p>
                Selfies migas stumptown hot chicken quinoa wolf green juice,
                mumblecore tattooed trust fund hammock truffaut taxidermy kogi.
              </p>
            </OuiText>
          </div>
          <OuiPopoverFooter>
            <OuiButton fullWidth size="s">
              Manage this thing
            </OuiButton>
          </OuiPopoverFooter>
        </OuiPopover>
      </OuiFlexItem>
    </OuiFlexGroup>
  );
};
