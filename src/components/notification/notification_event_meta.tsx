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

import React, {
  FunctionComponent,
  useState,
  ReactNode,
  ReactElement,
} from 'react';
import classNames from 'classnames';
import { OuiIcon, IconType } from '../icon';
import { OuiBadge, OuiBadgeProps } from '../badge';
import { OuiPopover } from '../popover';
import { OuiButtonIcon } from '../button';
import {
  OuiContextMenuItem,
  OuiContextMenuItemProps,
  OuiContextMenuPanel,
} from '../context_menu';
import { OuiI18n } from '../i18n';
import { htmlIdGenerator } from '../../services';

export type OuiNotificationEventMetaProps = {
  id: string;
  /**
   * Type of event (e.g. "Alert", "Cloud", etc..). Shows inside a badge.
   */
  type: string;
  /**
   * A unique, human-friendly name for the event to be used in aria attributes (e.g. "alert-critical-01", "cloud-no-severity-12", etc..).
   */
  eventName: string;
  /**
   * Type of severity (e.g. "Critical", "Warning", etc..). Shows as a text after the `type` following the format "Alert: Critical".
   */
  severity?: string;
  /**
   * Accepts either our palette colors (primary, success ..etc) or a hex value `#FFFFFF`, `#000`.
   * **`secondary` color is DEPRECATED, use `success` instead**
   */
  badgeColor?: OuiBadgeProps['color'];
  /**
   * The icon used to visually represent this data type. Accepts any `OuiIcon IconType`.
   */
  iconType?: IconType;
  /**
   * Specify an `aria-label` for the icon.
   * If no `aria-label` is passed we assume the icon is purely decorative.
   */
  iconAriaLabel?: string;
  /**
   * Indicates when the event was received.
   */
  time: ReactNode;
  /**
   * Necessary to trigger `onOpenContextMenu` from #OuiNotificationEvent
   */
  onOpenContextMenu?: () => Array<
    ReactElement<OuiContextMenuItemProps, typeof OuiContextMenuItem>
  >;
};

export const OuiNotificationEventMeta: FunctionComponent<OuiNotificationEventMetaProps> = ({
  id,
  iconType,
  type,
  time,
  badgeColor = 'hollow',
  severity,
  eventName,
  iconAriaLabel,
  onOpenContextMenu,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const classes = classNames('ouiNotificationEventMeta', {
    'ouiNotificationEventMeta--hasContextMenu': onOpenContextMenu,
  });

  const [contextMenuItems, setContextMenuItems] = useState<
    ReturnType<NonNullable<typeof onOpenContextMenu>>
  >([]);

  const randomPopoverId = htmlIdGenerator()();

  const ariaAttribute = iconAriaLabel
    ? { 'aria-label': iconAriaLabel }
    : { 'aria-hidden': true };

  const onOpenPopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
    if (onOpenContextMenu) {
      setContextMenuItems(onOpenContextMenu());
    }
  };

  return (
    <div className={classes}>
      <div className="ouiNotificationEventMeta__section">
        {iconType && (
          <OuiIcon
            className="ouiNotificationEventMeta__icon"
            type={iconType}
            {...ariaAttribute}
          />
        )}

        {type && (
          <OuiBadge
            className="ouiNotificationEventMeta__badge"
            color={badgeColor}>
            {severity ? `${type}: ${severity}` : type}
          </OuiBadge>
        )}
      </div>

      <div className="ouiNotificationEventMeta__section">
        <span className="ouiNotificationEventMeta__time">{time}</span>
      </div>

      {onOpenContextMenu && (
        <div className="ouiNotificationEventMeta__contextMenuWrapper">
          <OuiPopover
            id={randomPopoverId}
            ownFocus
            repositionOnScroll
            isOpen={isPopoverOpen}
            panelPaddingSize="none"
            anchorPosition="leftUp"
            button={
              <OuiI18n
                token="ouiNotificationEventMeta.contextMenuButton"
                default="Menu for {eventName}"
                values={{
                  eventName,
                }}>
                {(contextMenuButton: string) => (
                  <OuiButtonIcon
                    aria-label={contextMenuButton}
                    aria-controls={randomPopoverId}
                    aria-expanded={isPopoverOpen}
                    aria-haspopup="true"
                    iconType="boxesVertical"
                    color="subdued"
                    onClick={onOpenPopover}
                    data-test-subj={`${id}-notificationEventMetaButton`}
                  />
                )}
              </OuiI18n>
            }
            closePopover={() => setIsPopoverOpen(false)}>
            {/* The OuiContextMenu is wrapped with a div so it closes after an item is clicked */}
            <div onClick={() => setIsPopoverOpen(false)}>
              <OuiContextMenuPanel items={contextMenuItems} />
            </div>
          </OuiPopover>
        </div>
      )}
    </div>
  );
};
