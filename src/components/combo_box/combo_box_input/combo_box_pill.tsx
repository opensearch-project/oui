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

import React, { AriaAttributes, Component, MouseEventHandler } from 'react';
import classNames from 'classnames';

import { OuiBadge } from '../../badge';
import { OuiI18n } from '../../i18n';
import { OuiComboBoxOptionOption, OptionHandler } from '../types';
import { CommonProps } from '../../common';

export interface OuiComboBoxPillProps<T> extends CommonProps {
  asPlainText?: boolean;
  children?: string;
  className?: string;
  color?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onClickAriaLabel?: AriaAttributes['aria-label'];
  onClose?: OptionHandler<T>;
  option: OuiComboBoxOptionOption<T>;
}

export class OuiComboBoxPill<T> extends Component<OuiComboBoxPillProps<T>> {
  static defaultProps = {
    color: 'hollow',
  };

  onCloseButtonClick = () => {
    const { onClose, option } = this.props;
    if (onClose) {
      onClose(option);
    }
  };

  render() {
    const {
      asPlainText,
      children,
      className,
      color,
      onClick,
      onClickAriaLabel,
      onClose, // eslint-disable-line no-unused-vars
      option, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;
    const classes = classNames(
      'ouiComboBoxPill',
      {
        'ouiComboBoxPill--plainText': asPlainText,
      },
      className
    );
    const onClickProps =
      onClick && onClickAriaLabel
        ? {
            onClick,
            onClickAriaLabel,
          }
        : {};

    if (onClose) {
      return (
        <OuiI18n
          token="ouiComboBoxPill.removeSelection"
          default="Remove {children} from selection in this group"
          values={{ children }}>
          {(removeSelection: string) => (
            <OuiBadge
              className={classes}
              closeButtonProps={{ tabIndex: -1 }}
              color={color}
              iconOnClick={this.onCloseButtonClick}
              iconOnClickAriaLabel={removeSelection}
              iconSide="right"
              iconType="cross"
              title={children}
              {...onClickProps}
              {...rest}>
              {children}
            </OuiBadge>
          )}
        </OuiI18n>
      );
    }

    if (asPlainText) {
      return (
        <span className={classes} {...rest}>
          {children}
        </span>
      );
    }

    return (
      <OuiBadge
        className={classes}
        color={color}
        title={children}
        {...rest}
        {...onClickProps}>
        {children}
      </OuiBadge>
    );
  }
}
