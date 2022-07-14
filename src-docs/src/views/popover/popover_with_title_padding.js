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
  OuiCode,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen1, setIsPopoverOpen1] = useState(false);
  const [isPopoverOpen2, setIsPopoverOpen2] = useState(false);
  const [isPopoverOpen3, setIsPopoverOpen3] = useState(false);
  const [isPopoverOpen4, setIsPopoverOpen4] = useState(false);
  const [isPopoverOpen5, setIsPopoverOpen5] = useState(false);
  const [isPopoverOpen6, setIsPopoverOpen6] = useState(false);

  const onButtonClick1 = () =>
    setIsPopoverOpen1((isPopoverOpen1) => !isPopoverOpen1);
  const closePopover1 = () => setIsPopoverOpen1(false);

  const onButtonClick2 = () =>
    setIsPopoverOpen2((isPopoverOpen2) => !isPopoverOpen2);
  const closePopover2 = () => setIsPopoverOpen2(false);

  const onButtonClick3 = () =>
    setIsPopoverOpen3((isPopoverOpen3) => !isPopoverOpen3);
  const closePopover3 = () => setIsPopoverOpen3(false);

  const onButtonClick4 = () =>
    setIsPopoverOpen4((isPopoverOpen4) => !isPopoverOpen4);
  const closePopover4 = () => setIsPopoverOpen4(false);

  const onButtonClick5 = () =>
    setIsPopoverOpen5((isPopoverOpen5) => !isPopoverOpen5);
  const closePopover5 = () => setIsPopoverOpen5(false);

  const onButtonClick6 = () =>
    setIsPopoverOpen6((isPopoverOpen6) => !isPopoverOpen6);
  const closePopover6 = () => setIsPopoverOpen6(false);

  return (
    <>
      <OuiFlexGroup wrap={true}>
        <OuiFlexItem grow={false}>
          <OuiPopover
            panelPaddingSize="s"
            button={
              <OuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={onButtonClick2}>
                Small panel padding
              </OuiButton>
            }
            isOpen={isPopoverOpen2}
            closePopover={closePopover2}>
            <OuiPopoverTitle>Hello, I&rsquo;m a popover title</OuiPopoverTitle>
            <OuiText size="s" style={{ width: 300 }}>
              <p>
                Only changing the <OuiCode>panelPaddingSize</OuiCode> will get
                inherited by the title.
              </p>
            </OuiText>
            <OuiPopoverFooter>
              <OuiButton fullWidth size="s">
                Footer button
              </OuiButton>
            </OuiPopoverFooter>
          </OuiPopover>
        </OuiFlexItem>

        <OuiFlexItem grow={false}>
          <OuiPopover
            panelPaddingSize="none"
            button={
              <OuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={onButtonClick1}>
                No panel padding (none)
              </OuiButton>
            }
            isOpen={isPopoverOpen1}
            closePopover={closePopover1}>
            <OuiPopoverTitle>Hello, I&rsquo;m a popover title</OuiPopoverTitle>
            <OuiText size="s" style={{ width: 300 }}>
              <p>
                Removing the <OuiCode>panelPaddingSize</OuiCode> completely is
                good for lists that should extend to the edges.
              </p>
            </OuiText>
            <OuiPopoverFooter>
              <OuiButton fullWidth size="s">
                Footer button
              </OuiButton>
            </OuiPopoverFooter>
          </OuiPopover>
        </OuiFlexItem>
      </OuiFlexGroup>

      <OuiFlexGroup wrap={true}>
        <OuiFlexItem grow={false}>
          <OuiPopover
            button={
              <OuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={onButtonClick4}>
                No title padding (none)
              </OuiButton>
            }
            isOpen={isPopoverOpen4}
            closePopover={closePopover4}>
            <OuiPopoverTitle paddingSize="none">
              Hello, I&rsquo;m a popover title
            </OuiPopoverTitle>
            <OuiText size="s" style={{ width: 300 }}>
              <p>
                Removing the padding from titles only with{' '}
                <OuiCode>paddingSize</OuiCode> on{' '}
                <strong>OuiPopoverTitle</strong>.
              </p>
            </OuiText>
            <OuiPopoverFooter>
              <OuiButton fullWidth size="s">
                Footer button
              </OuiButton>
            </OuiPopoverFooter>
          </OuiPopover>
        </OuiFlexItem>

        <OuiFlexItem grow={false}>
          <OuiPopover
            panelPaddingSize="none"
            button={
              <OuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={onButtonClick3}>
                No panel padding with small title padding
              </OuiButton>
            }
            isOpen={isPopoverOpen3}
            closePopover={closePopover3}>
            <OuiPopoverTitle paddingSize="s">
              Hello, I&rsquo;m a popover title
            </OuiPopoverTitle>
            <OuiText size="s" style={{ width: 300 }}>
              <p>
                You can adjust both the <OuiCode>panelPaddingSize</OuiCode> and
                the <OuiCode>paddingSize</OuiCode> at the same time.
              </p>
            </OuiText>
            <OuiPopoverFooter>
              <OuiButton fullWidth size="s">
                Footer button
              </OuiButton>
            </OuiPopoverFooter>
          </OuiPopover>
        </OuiFlexItem>
      </OuiFlexGroup>

      <OuiFlexGroup wrap={true}>
        <OuiFlexItem grow={false}>
          <OuiPopover
            button={
              <OuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={onButtonClick5}>
                No footer padding (none)
              </OuiButton>
            }
            isOpen={isPopoverOpen5}
            closePopover={closePopover5}>
            <OuiPopoverTitle>Hello, I&rsquo;m a popover title</OuiPopoverTitle>
            <OuiText size="s" style={{ width: 300 }}>
              <p>
                Removing the padding from footers only with{' '}
                <OuiCode>paddingSize</OuiCode> on{' '}
                <strong>OuiPopoverFooter</strong>.
              </p>
            </OuiText>
            <OuiPopoverFooter paddingSize="none">
              <OuiButton fullWidth size="s">
                Footer button
              </OuiButton>
            </OuiPopoverFooter>
          </OuiPopover>
        </OuiFlexItem>

        <OuiFlexItem grow={false}>
          <OuiPopover
            panelPaddingSize="none"
            button={
              <OuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={onButtonClick6}>
                Set each padding individually
              </OuiButton>
            }
            isOpen={isPopoverOpen6}
            closePopover={closePopover6}>
            <OuiPopoverTitle paddingSize="s">
              Hello, I&rsquo;m a popover title
            </OuiPopoverTitle>
            <OuiText size="s" style={{ width: 300 }}>
              <p>
                For the most reliable padding display, set the{' '}
                <OuiCode>panelPaddingSize</OuiCode> and the{' '}
                <OuiCode>paddingSize</OuiCode> props for each component
                individually.
              </p>
            </OuiText>
            <OuiPopoverFooter paddingSize="s">
              <OuiButton fullWidth size="s">
                Footer button
              </OuiButton>
            </OuiPopoverFooter>
          </OuiPopover>
        </OuiFlexItem>
      </OuiFlexGroup>
    </>
  );
};
