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
  OuiFlexGroup,
  OuiFlexItem,
  OuiIcon,
  OuiListGroup,
  OuiListGroupItem,
  OuiPopover,
  OuiPopoverFooter,
  OuiPopoverTitle,
  OuiText,
} from '../../../../src/components';

export default (props) => {
  const [isPopoverOpen, setPopover] = useState(false);

  const togglePopover = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const hashtagButton = (
    <OuiButtonEmpty
      onClick={togglePopover}
      size="xs"
      iconType="arrowDown"
      aria-label="Saved Queries popover"
      iconSide="right">
      <OuiIcon type="number" />
    </OuiButtonEmpty>
  );

  return (
    <OuiPopover
      id="popover"
      button={hashtagButton}
      isOpen={isPopoverOpen}
      anchorPosition="downLeft"
      panelPaddingSize="none"
      closePopover={closePopover}>
      <OuiPopoverTitle paddingSize="s">SAVED QUERIES</OuiPopoverTitle>
      <div>
        <OuiText
          size="s"
          color="subdued"
          className="savedQueryManagement__text">
          <p>Save query text and filters that you want to use again.</p>
        </OuiText>
        <div className="savedQueryManagement__listWrapper">
          <OuiListGroup className="savedQueryManagement__list" flush={true}>
            <OuiListGroupItem
              extraAction={{
                color: 'danger',
                iconType: 'trash',
                iconSize: 's',
              }}
              href="https://oui.opensearch.org/latest/"
              label="Popular shoes in America"
            />
            <OuiListGroupItem
              extraAction={{
                color: 'danger',
                iconType: 'trash',
                iconSize: 's',
              }}
              href="https://oui.opensearch.org/latest/"
              label="Popular shirts in Canada"
            />
          </OuiListGroup>
        </div>
        {props.value !== '' ? (
          <OuiPopoverFooter paddingSize="s">
            <OuiFlexGroup direction="rowReverse" alignItems="center">
              <OuiFlexItem grow={false}>
                <OuiButton size="s" fill>
                  Save
                </OuiButton>
              </OuiFlexItem>
            </OuiFlexGroup>
          </OuiPopoverFooter>
        ) : undefined}
      </div>
    </OuiPopover>
  );
};
