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

import classNames from 'classnames';
import React, { Component, LiHTMLAttributes } from 'react';
import { CommonProps } from '../../common';
import { OuiI18n } from '../../i18n';
import { OuiIcon, IconColor, IconType } from '../../icon';
import { OuiSelectableOptionCheckedType } from '../selectable_option';
import { OuiScreenReaderOnly } from '../../accessibility';
import { OuiBadge, OuiBadgeProps } from '../../badge';

function resolveIconAndColor(
  checked: OuiSelectableOptionCheckedType
): { icon: IconType; color?: IconColor } {
  if (!checked) {
    return { icon: 'empty' };
  }
  return checked === 'on'
    ? { icon: 'check', color: 'text' }
    : { icon: 'cross', color: 'text' };
}

export type OuiSelectableListItemProps = LiHTMLAttributes<HTMLLIElement> &
  CommonProps & {
    children?: React.ReactNode;
    /**
     * Applies an icon and visual styling to activated items
     */
    checked?: OuiSelectableOptionCheckedType;
    /**
     * Shows icons based on `checked` type
     */
    showIcons?: boolean;
    /**
     * Highlights the item for pseudo focus
     */
    isFocused?: boolean;
    disabled?: boolean;
    prepend?: React.ReactNode;
    append?: React.ReactNode;
    allowExclusions?: boolean;
    /**
     * When enabled by setting to either `true` or passing custom a custom badge,
     * shows a hollow badge as an append (far right) when the item is focused.
     * The default content when `true` is `↩ to select/deselect/include/exclude`
     */
    onFocusBadge?: boolean | OuiBadgeProps;
  };

// eslint-disable-next-line react/prefer-stateless-function
export class OuiSelectableListItem extends Component<
  OuiSelectableListItemProps
> {
  static defaultProps = {
    showIcons: true,
    onFocusBadge: true,
  };

  constructor(props: OuiSelectableListItemProps) {
    super(props);
  }

  render() {
    const {
      children,
      className,
      disabled,
      checked,
      isFocused,
      showIcons,
      prepend,
      append,
      allowExclusions,
      onFocusBadge,
      ...rest
    } = this.props;

    const classes = classNames(
      'ouiSelectableListItem',
      {
        'ouiSelectableListItem-isFocused': isFocused,
      },
      className
    );

    let optionIcon: React.ReactNode;
    if (showIcons) {
      const { icon, color } = resolveIconAndColor(checked);
      optionIcon = (
        <OuiIcon
          className="ouiSelectableListItem__icon"
          color={color}
          type={icon}
        />
      );
    }

    let state: React.ReactNode;
    let instruction: React.ReactNode;
    if (allowExclusions && checked === 'on') {
      state = (
        <OuiScreenReaderOnly>
          <span>
            <OuiI18n
              token="ouiSelectableListItem.includedOption"
              default="Included option."
            />
          </span>
        </OuiScreenReaderOnly>
      );
      instruction = (
        <OuiScreenReaderOnly>
          <span>
            <OuiI18n
              token="ouiSelectableListItem.includedOptionInstructions"
              default="To exclude this option, press enter."
            />
          </span>
        </OuiScreenReaderOnly>
      );
    } else if (allowExclusions && checked === 'off') {
      state = (
        <OuiScreenReaderOnly>
          <span>
            <OuiI18n
              token="ouiSelectableListItem.excludedOption"
              default="Excluded option."
            />
          </span>
        </OuiScreenReaderOnly>
      );
      instruction = (
        <OuiScreenReaderOnly>
          <span>
            <OuiI18n
              token="ouiSelectableListItem.excludedOptionInstructions"
              default="To deselect this option, press enter."
            />
          </span>
        </OuiScreenReaderOnly>
      );
    }

    let prependNode: React.ReactNode;
    if (prepend) {
      prependNode = (
        <span className="ouiSelectableListItem__prepend">{prepend}</span>
      );
    }

    let appendNode: React.ReactNode;
    if (append || !!onFocusBadge) {
      let onFocusBadgeNode: React.ReactNode;
      const defaultOnFocusBadgeProps: OuiBadgeProps = {
        'aria-hidden': true,
        iconType: 'returnKey',
        iconSide: 'left',
        color: 'hollow',
      };

      if (onFocusBadge === true) {
        onFocusBadgeNode = (
          <OuiBadge
            className="ouiSelectableListItem__onFocusBadge"
            {...defaultOnFocusBadgeProps}
          />
        );
      } else if (!!onFocusBadge && onFocusBadge !== false) {
        const { children, className, ...restBadgeProps } = onFocusBadge;
        onFocusBadgeNode = (
          <OuiBadge
            className={classNames(
              'ouiSelectableListItem__onFocusBadge',
              className
            )}
            {...defaultOnFocusBadgeProps}
            {...(restBadgeProps as OuiBadgeProps)}>
            {children}
          </OuiBadge>
        );
      }

      // Only display the append wrapper if append exists or isFocused
      if (append || (isFocused && !disabled)) {
        appendNode = (
          <span className="ouiSelectableListItem__append">
            {append} {isFocused && !disabled ? onFocusBadgeNode : null}
          </span>
        );
      }
    }

    return (
      <li
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="option"
        aria-selected={!disabled && typeof checked === 'string'}
        className={classes}
        aria-disabled={disabled}
        {...rest}>
        <span className="ouiSelectableListItem__content">
          {optionIcon}
          {prependNode}
          <span className="ouiSelectableListItem__text">
            {state}
            {children}
            {instruction}
          </span>
          {appendNode}
        </span>
      </li>
    );
  }
}
