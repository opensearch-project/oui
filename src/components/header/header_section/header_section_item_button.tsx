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
  PropsWithChildren,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import classNames from 'classnames';
import {
  OuiNotificationBadgeProps,
  OuiNotificationBadge,
} from '../../badge/notification_badge/badge_notification';
import { OuiIcon } from '../../icon';
import { OuiButtonEmpty, OuiButtonEmptyProps } from '../../button';
import { OuiHideFor, OuiShowFor } from '../../responsive';

export type OuiHeaderSectionItemButtonProps = OuiButtonEmptyProps & {
  /**
   * Inserts the node into a OuiBadgeNotification and places it appropriately against the button.
   * Or pass `true` to render a simple dot
   */
  notification?: OuiNotificationBadgeProps['children'] | boolean;
  /**
   * Changes the color of the notification background
   */
  notificationColor?: OuiNotificationBadgeProps['color'];
};

export type OuiHeaderSectionItemButtonRef =
  | (HTMLButtonElement & { ouiAnimate: () => void })
  | null;

export const OuiHeaderSectionItemButton = forwardRef<
  OuiHeaderSectionItemButtonRef,
  PropsWithChildren<OuiHeaderSectionItemButtonProps>
>(
  (
    {
      children,
      className,
      notification,
      notificationColor = 'accent',
      ...rest
    },
    /**
     * Allows for animating with .ouiAnimate()
     */
    ref
  ) => {
    const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(
      null
    );
    const animationTargetRef = useRef<HTMLSpanElement | null>(null);

    useImperativeHandle<
      OuiHeaderSectionItemButtonRef,
      OuiHeaderSectionItemButtonRef
    >(
      ref,
      () => {
        (buttonRef.current as any).ouiAnimate = () => {
          const keyframes: Keyframe[] = [
            { transform: 'rotate(0)', offset: 0, easing: 'ease-in-out' },
            {
              transform: 'rotate(30deg)',
              offset: 0.01,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(-28deg)',
              offset: 0.03,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(34deg)',
              offset: 0.05,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(-32deg)',
              offset: 0.07,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(30deg)',
              offset: 0.09,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(-28deg)',
              offset: 0.11,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(26deg)',
              offset: 0.13,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(-24deg)',
              offset: 0.15,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(22deg)',
              offset: 0.17,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(-20deg)',
              offset: 0.19,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(18deg)',
              offset: 0.21,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(-16deg)',
              offset: 0.23,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(14deg)',
              offset: 0.25,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(-12deg)',
              offset: 0.27,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(10deg)',
              offset: 0.29,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(-8deg)',
              offset: 0.31,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(6deg)',
              offset: 0.33,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(-4deg)',
              offset: 0.35,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(2deg)',
              offset: 0.37,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(-1deg)',
              offset: 0.39,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(1deg)',
              offset: 0.41,
              easing: 'ease-in-out',
            },
            { transform: 'rotate(0)', offset: 0.43, easing: 'ease-in-out' },
            { transform: 'rotate(0)', offset: 1, easing: 'ease-in-out' },
          ];
          animationTargetRef.current?.animate(keyframes, {
            duration: 5000,
          });
        };
        return buttonRef.current as OuiHeaderSectionItemButtonRef;
      },
      []
    );

    const classes = classNames('ouiHeaderSectionItemButton', className);
    const animationClasses = classNames([
      'ouiHeaderSectionItemButton__content',
    ]);

    const notificationDot = (
      <OuiIcon
        className="ouiHeaderSectionItemButton__notification ouiHeaderSectionItemButton__notification--dot"
        color={notificationColor}
        type="dot"
        size="l"
      />
    );

    let buttonNotification;
    if (notification === true) {
      buttonNotification = notificationDot;
    } else if (notification) {
      buttonNotification = (
        <>
          <OuiHideFor sizes={['xs']}>
            <OuiNotificationBadge
              className="ouiHeaderSectionItemButton__notification ouiHeaderSectionItemButton__notification--badge"
              color={notificationColor}>
              {notification}
            </OuiNotificationBadge>
          </OuiHideFor>
          <OuiShowFor sizes={['xs']}>{notificationDot}</OuiShowFor>
        </>
      );
    }

    return (
      <OuiButtonEmpty
        className={classes}
        color="text"
        buttonRef={buttonRef}
        {...rest}>
        <span ref={animationTargetRef} className={animationClasses}>
          {children}
        </span>
        {buttonNotification}
      </OuiButtonEmpty>
    );
  }
);

OuiHeaderSectionItemButton.displayName = 'OuiHeaderSectionItemButton';
