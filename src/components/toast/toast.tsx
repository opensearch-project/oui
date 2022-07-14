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
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';
import { OuiScreenReaderOnly } from '../accessibility';
import { OuiI18n } from '../i18n';

import { IconType, OuiIcon } from '../icon';

import { OuiText } from '../text';

type ToastColor = 'primary' | 'success' | 'warning' | 'danger';

const colorToClassNameMap: { [color in ToastColor]: string } = {
  primary: 'ouiToast--primary',
  success: 'ouiToast--success',
  warning: 'ouiToast--warning',
  danger: 'ouiToast--danger',
};

export const COLORS = keysOf(colorToClassNameMap);

export interface OuiToastProps
  extends CommonProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  color?: ToastColor;
  iconType?: IconType;
  onClose?: () => void;
}

export const OuiToast: FunctionComponent<OuiToastProps> = ({
  title,
  color,
  iconType,
  onClose,
  children,
  className,
  ...rest
}) => {
  const classes = classNames(
    'ouiToast',
    color ? colorToClassNameMap[color] : null,
    className
  );
  const headerClasses = classNames('ouiToastHeader', {
    'ouiToastHeader--withBody': children,
  });

  let headerIcon: ReactElement;

  if (iconType) {
    headerIcon = (
      <OuiIcon
        className="ouiToastHeader__icon"
        type={iconType}
        size="m"
        aria-hidden="true"
      />
    );
  }

  let closeButton;

  if (onClose) {
    closeButton = (
      <OuiI18n token="ouiToast.dismissToast" default="Dismiss toast">
        {(dismissToast: string) => (
          <button
            type="button"
            className="ouiToast__closeButton"
            aria-label={dismissToast}
            onClick={onClose}
            data-test-subj="toastCloseButton">
            <OuiIcon type="cross" size="m" aria-hidden="true" />
          </button>
        )}
      </OuiI18n>
    );
  }

  let optionalBody;

  if (children) {
    optionalBody = (
      <OuiText size="s" className="ouiToastBody">
        {children}
      </OuiText>
    );
  }

  return (
    <div className={classes} {...rest}>
      <OuiScreenReaderOnly>
        <p>
          <OuiI18n
            token="ouiToast.newNotification"
            default="A new notification appears"
          />
        </p>
      </OuiScreenReaderOnly>

      <OuiI18n token="ouiToast.notification" default="Notification">
        {(notification: string) => (
          <div
            className={headerClasses}
            aria-label={notification}
            data-test-subj="ouiToastHeader">
            {headerIcon}

            <span className="ouiToastHeader__title">{title}</span>
          </div>
        )}
      </OuiI18n>

      {closeButton}
      {optionalBody}
    </div>
  );
};
