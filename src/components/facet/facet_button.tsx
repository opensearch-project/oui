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
  MouseEventHandler,
  ReactNode,
  RefCallback,
  ReactElement,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { OuiNotificationBadge } from '../badge';

import { OuiLoadingSpinner } from '../loading';
import { OuiInnerText } from '../inner_text';

export interface OuiFacetButtonProps
  extends CommonProps,
    Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  buttonRef?: RefCallback<HTMLButtonElement>;
  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
  /**
   * Any node, but preferably a `OuiIcon` or `OuiAvatar`
   */
  icon?: ReactNode;
  isDisabled?: boolean;
  /**
   * Adds/swaps for loading spinner & disables
   */
  isLoading?: boolean;
  /**
   * Changes visual of button to indicate it's currently selected
   */
  isSelected?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Adds a notification indicator for displaying the quantity provided
   */
  quantity?: number;
}

export const OuiFacetButton: FunctionComponent<OuiFacetButtonProps> = ({
  children,
  className,
  icon,
  isDisabled = false,
  isLoading = false,
  isSelected = false,
  quantity,
  buttonRef,
  ...rest
}) => {
  // If in the loading state, force disabled to true
  isDisabled = isLoading ? true : isDisabled;

  const classes = classNames(
    'ouiFacetButton',
    {
      'ouiFacetButton--isSelected': isSelected,
      'ouiFacetButton--unSelected': !isSelected,
    },
    className
  );

  // Add quantity number if provided or loading indicator
  let buttonQuantity: ReactElement;

  if (isLoading) {
    buttonQuantity = (
      <OuiLoadingSpinner className="ouiFacetButton__spinner" size="m" />
    );
  } else if (typeof quantity === 'number') {
    buttonQuantity = (
      <OuiNotificationBadge
        className="ouiFacetButton__quantity"
        size="m"
        color={!isSelected || isDisabled ? 'subdued' : 'accent'}>
        {quantity}
      </OuiNotificationBadge>
    );
  }

  // Add an icon to the button if one exists.
  let buttonIcon: ReactElement;

  if (React.isValidElement<{ className?: string }>(icon)) {
    buttonIcon = React.cloneElement(icon, {
      className: classNames(icon.props.className, 'ouiFacetButton__icon'),
    });
  }

  return (
    <OuiInnerText>
      {(ref, innerText) => (
        <button
          className={classes}
          disabled={isDisabled}
          type="button"
          ref={buttonRef}
          title={rest['aria-label'] || innerText}
          {...rest}>
          <span className="ouiFacetButton__content">
            {buttonIcon}
            <span
              className="ouiFacetButton__text"
              data-text={innerText}
              ref={ref}>
              {children}
            </span>
            {buttonQuantity}
          </span>
        </button>
      )}
    </OuiInnerText>
  );
};
