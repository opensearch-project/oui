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
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  cloneElement,
  Component,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';
import { OuiIcon } from '../icon';
import { OuiToolTip, ToolTipPositions } from '../tool_tip';

import { getSecureRelForTarget } from '../../services';
import { validateHref } from '../../services/security/href_validator';

export type OuiContextMenuItemIcon = ReactElement<any> | string | HTMLElement;

export type OuiContextMenuItemLayoutAlignment = 'center' | 'top' | 'bottom';

const sizeToClassNameMap = {
  s: 'ouiContextMenuItem--small',
  m: null,
};

export const SIZES = keysOf(sizeToClassNameMap);

export interface OuiContextMenuItemProps extends CommonProps {
  icon?: OuiContextMenuItemIcon;
  hasPanel?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  buttonRef?: Ref<HTMLButtonElement>;
  /**
   * Required if using a tooltip. Add an optional tooltip on hover
   */
  toolTipContent?: ReactNode;
  /**
   * Optional title for the tooltip
   */
  toolTipTitle?: ReactNode;
  /**
   * Dictates the position of the tooltip.
   */
  toolTipPosition?: ToolTipPositions;
  href?: string;
  target?: string;
  rel?: string;
  /**
   * How to align icon with content of button
   */
  layoutAlign?: OuiContextMenuItemLayoutAlignment;
  /**
   * Reduce the size to `s` when in need of a more compressed menu
   */
  size?: keyof typeof sizeToClassNameMap;
}

type Props = CommonProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'type' | 'onClick' | 'disabled'
  > &
  OuiContextMenuItemProps;

const layoutAlignToClassNames: {
  [align in OuiContextMenuItemLayoutAlignment]: string | null;
} = {
  center: null,
  top: 'ouiContextMenu__itemLayout--top',
  bottom: 'ouiContextMenu__itemLayout--bottom',
};

export const LAYOUT_ALIGN = keysOf(layoutAlignToClassNames);

export class OuiContextMenuItem extends Component<Props> {
  render() {
    const {
      children,
      className,
      hasPanel,
      icon,
      buttonRef,
      disabled: _disabled,
      layoutAlign = 'center',
      toolTipTitle,
      toolTipContent,
      toolTipPosition = 'right',
      href,
      target,
      rel,
      size,
      ...rest
    } = this.props;
    let iconInstance;

    const isHrefValid = !href || validateHref(href);
    const disabled = _disabled || !isHrefValid;

    if (icon) {
      switch (typeof icon) {
        case 'string':
          iconInstance = (
            <OuiIcon
              type={icon}
              size="m"
              className="ouiContextMenu__icon"
              color="inherit" // forces the icon to inherit its parent color
            />
          );
          break;

        default:
          // Assume it's already an instance of an icon.
          iconInstance = cloneElement(icon as ReactElement, {
            className: 'ouiContextMenu__icon',
          });
      }
    }

    let arrow;

    if (hasPanel) {
      arrow = (
        <OuiIcon type="arrowRight" size="m" className="ouiContextMenu__arrow" />
      );
    }

    const classes = classNames(
      'ouiContextMenuItem',
      size && sizeToClassNameMap[size],
      className,
      {
        'ouiContextMenuItem-isDisabled': disabled,
      }
    );

    const layoutClasses = classNames(
      'ouiContextMenu__itemLayout',
      layoutAlignToClassNames[layoutAlign]
    );

    const buttonInner = (
      <span className={layoutClasses}>
        {iconInstance}
        <span className="ouiContextMenuItem__text">{children}</span>
        {arrow}
      </span>
    );

    let button;
    // <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
    // this is a button and piggyback off its disabled styles.
    if (href && !disabled) {
      const secureRel = getSecureRelForTarget({ href, target, rel });

      button = (
        <a
          className={classes}
          href={href}
          target={target}
          rel={secureRel}
          ref={buttonRef as Ref<HTMLAnchorElement>}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {buttonInner}
        </a>
      );
    } else {
      button = (
        <button
          disabled={disabled}
          className={classes}
          type="button"
          ref={buttonRef}
          {...rest}>
          {buttonInner}
        </button>
      );
    }

    if (toolTipContent) {
      return (
        <OuiToolTip
          title={toolTipTitle ? toolTipTitle : null}
          content={toolTipContent}
          anchorClassName="oui-displayBlock"
          position={toolTipPosition}>
          {button}
        </OuiToolTip>
      );
    } else {
      return button;
    }
  }
}
