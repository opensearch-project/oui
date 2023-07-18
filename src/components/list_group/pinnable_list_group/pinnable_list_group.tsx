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

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

import { OuiI18n } from '../../i18n';
import { OuiListGroup, OuiListGroupProps } from '../list_group';
import { OuiListGroupItemProps } from '../list_group_item';

const pinExtraAction: OuiListGroupItemProps['extraAction'] = {
  color: 'primary',
  iconType: 'pinFilled',
  iconSize: 's',
  className: 'ouiPinnableListGroup__itemExtraAction',
};

const pinnedExtraAction: OuiListGroupItemProps['extraAction'] = {
  color: 'primary',
  iconType: 'pinFilled',
  iconSize: 's',
  className:
    'ouiPinnableListGroup__itemExtraAction ouiPinnableListGroup__itemExtraAction-pinned',
  alwaysShow: true,
};

export type OuiPinnableListGroupItemProps = OuiListGroupItemProps & {
  /**
   * Saves the pinned status and changes the visibility of the pin icon
   */
  pinned?: boolean;
  /**
   * Passing `onPinClick` to the full OuiPinnableListGroup, will make every item pinnable.
   * Set this property to `false` to turn off individual item pinnability
   */
  pinnable?: boolean;
};

export interface OuiPinnableListGroupProps
  extends CommonProps,
    OuiListGroupProps {
  /**
   * Extends `OuiListGroupItemProps`, at the very least, expecting a `label`.
   * See #OuiPinnableListGroupItem
   */
  listItems: OuiPinnableListGroupItemProps[];
  /**
   * Shows the pin icon and calls this function on click.
   * Returns `item: OuiPinnableListGroupItemProps`
   */
  onPinClick: (item: OuiPinnableListGroupItemProps) => void;
  /**
   * The pin icon needs a title/aria-label for accessibility.
   * It is a function that passes the item back and must return a string `(item) => string`.
   * Default is `"Pin item"`
   */
  pinTitle?: (item: OuiPinnableListGroupItemProps) => string;
  /**
   * The unpin icon needs a title/aria-label for accessibility.
   * It is a function that passes the item back and must return a string `(item) => string`.
   * Default is `"Unpin item"`
   */
  unpinTitle?: (item: OuiPinnableListGroupItemProps) => string;
}

export const OuiPinnableListGroup: FunctionComponent<OuiPinnableListGroupProps> = ({
  className,
  listItems,
  pinTitle,
  unpinTitle,
  onPinClick,
  ...rest
}) => {
  const classes = classNames('ouiPinnableListGroup', className);

  // Alter listItems object with extra props
  const getNewListItems = (
    pinExtraActionLabel: string,
    pinnedExtraActionLabel: string
  ) =>
    listItems.map((item) => {
      const { pinned, pinnable = true, ...itemProps } = item;
      // Make some declarations of props for the nav implementation
      itemProps.className = classNames(
        'ouiPinnableListGroup__item',
        item.className
      );

      // Add the pinning action unless the item has it's own extra action
      if (pinnable && !itemProps.extraAction) {
        // Different displays for pinned vs unpinned
        if (pinned) {
          itemProps.extraAction = {
            ...pinnedExtraAction,
            title: unpinTitle ? unpinTitle(item) : pinnedExtraActionLabel,
            'aria-label': unpinTitle
              ? unpinTitle(item)
              : pinnedExtraActionLabel,
          };
        } else {
          itemProps.extraAction = {
            ...pinExtraAction,
            title: pinTitle ? pinTitle(item) : pinExtraActionLabel,
            'aria-label': pinTitle ? pinTitle(item) : pinExtraActionLabel,
          };
        }
        // Return the item on click
        itemProps.extraAction.onClick = () => onPinClick(item);
      }

      return itemProps;
    });

  return (
    <OuiI18n
      tokens={[
        'ouiPinnableListGroup.pinExtraActionLabel',
        'ouiPinnableListGroup.pinnedExtraActionLabel',
      ]}
      defaults={['Pin item', 'Unpin item']}>
      {([pinExtraActionLabel, pinnedExtraActionLabel]: string[]) => {
        const newListItems = getNewListItems(
          pinExtraActionLabel,
          pinnedExtraActionLabel
        );
        return (
          <OuiListGroup
            className={classes}
            listItems={newListItems}
            {...rest}
          />
        );
      }}
    </OuiI18n>
  );
};
