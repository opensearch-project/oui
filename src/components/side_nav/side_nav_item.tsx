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
  cloneElement,
  ReactNode,
  ReactElement,
  MouseEventHandler,
  useState,
  useEffect,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { OuiIcon } from '../icon';

import { getSecureRelForTarget } from '../../services';
import { validateHref } from '../../services/security/href_validator';
import { OuiInnerText } from '../inner_text';

/**
 * The props that are exposed to, or altered for, the consumer
 * for use in the object of items in `OuiSideNav`
 * can be found in the `side_nave_types.ts` file.
 */

export type _OuiSideNavItemButtonProps = CommonProps & {
  /**
   * Is an optional string to be passed as the navigation item's `href` prop,
   * and by default it will force rendering of the item as an `<a>`
   */
  href?: string;
  target?: string;
  rel?: string;
  /**
   * Callback function to be passed as the navigation item's `onClick` prop,
   * and by default it will force rendering of the item as a `<button>` instead of a link
   */
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLElement>;
  children: ReactNode;
  disabled?: boolean;
};

export interface _OuiSideNavItemProps {
  /**
   * React node which will be rendered as a small icon to the
   * left of the navigation item text
   */
  icon?: ReactElement;
  /**
   * If set to true it will render the item in a visible
   * "selected" state, and will force all ancestor navigation items
   * to render in an "open" state
   */
  isSelected?: boolean;
  /**
   * Enhances the whole item's section (including nested items) with
   * a slight background and bold top item
   */
  emphasize?: boolean;
  /**
   * Restrict the item's text length to a single line
   */
  truncate?: boolean;
  /**
   * Passed to the actual `.ouiSideNavItemButton` element
   */
  buttonClassName?: string;
  // Exposed as different prop type to consumer
  items?: ReactNode;
  // Not exposed to consumer
  isOpen?: boolean;
  isParent?: boolean;
  depth?: number;
  childrenOnly?: boolean;
}

type ExcludeOuiSideNavItemProps<T> = Pick<
  T,
  Exclude<keyof T, keyof _OuiSideNavItemProps | 'renderItem'>
>;
type OmitOuiSideNavItemProps<T> = {
  [K in keyof ExcludeOuiSideNavItemProps<T>]: T[K];
};

export type RenderItem<T> = (
  // argument is the set of extra component props + _OuiSideNavItemButtonProps
  props: OmitOuiSideNavItemProps<T> & _OuiSideNavItemButtonProps
) => JSX.Element;

export type OuiSideNavItemProps<T> = T extends { renderItem: Function }
  ? T & { renderItem: RenderItem<T> }
  : T;

const DefaultRenderItem = ({
  href,
  target,
  rel,
  onClick,
  className,
  children,
  disabled,
  ...rest
}: _OuiSideNavItemButtonProps) => {
  if (href && !disabled) {
    const secureRel = getSecureRelForTarget({ href, rel, target });
    return (
      <a
        className={className}
        href={href}
        target={target}
        rel={secureRel}
        onClick={onClick}
        {...rest}>
        {children}
      </a>
    );
  }

  if (onClick || disabled) {
    return (
      <button
        type="button"
        className={className}
        onClick={onClick}
        disabled={disabled}
        {...rest}>
        {children}
      </button>
    );
  }

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};

export function OuiSideNavItem<
  T extends _OuiSideNavItemButtonProps &
    _OuiSideNavItemProps & { renderItem?: (props: any) => JSX.Element }
>({
  isOpen,
  isSelected,
  isParent,
  icon,
  onClick,
  href: _href,
  rel,
  target,
  items,
  children,
  renderItem: RenderItem = DefaultRenderItem,
  depth = 0,
  className,
  truncate = true,
  emphasize,
  buttonClassName,
  childrenOnly,
  ...rest
}: OuiSideNavItemProps<T>) {
  const isHrefValid = !_href || validateHref(_href);
  const href = isHrefValid ? _href : '';
  const isClickable = onClick || href;

  // Forcing accordion style item if not linked, but has children
  const [itemIsOpen, setItemIsOpen] = useState(isOpen);
  useEffect(() => {
    setItemIsOpen(isOpen);
  }, [isOpen]);

  const toggleItemOpen = () => {
    setItemIsOpen((isOpen) => !isOpen);
  };

  let childItems;
  if (items && itemIsOpen) {
    childItems = <div className="ouiSideNavItem__items">{items}</div>;
  }

  let buttonIcon;
  if (icon) {
    buttonIcon = cloneElement(icon, {
      className: classNames('ouiSideNavItemButton__icon', icon.props.className),
    });
  }

  const classes = classNames(
    'ouiSideNavItem',
    {
      'ouiSideNavItem--root': depth === 0,
      'ouiSideNavItem--rootIcon': depth === 0 && icon,
      'ouiSideNavItem--trunk': depth === 1,
      'ouiSideNavItem--branch': depth > 1,
      'ouiSideNavItem--hasChildItems': !!childItems,
      'ouiSideNavItem--emphasized': emphasize,
    },
    className
  );

  const buttonClasses = classNames(
    'ouiSideNavItemButton',
    {
      'ouiSideNavItemButton--isClickable': isClickable,
      'ouiSideNavItemButton-isOpen': depth > 0 && itemIsOpen && !isSelected,
      'ouiSideNavItemButton-isSelected': isSelected,
    },
    buttonClassName
  );

  let caret;

  if (depth > 0 && childrenOnly) {
    caret = <OuiIcon type={itemIsOpen ? 'arrowDown' : 'arrowRight'} size="s" />;
  }

  const buttonContent = (
    <span className="ouiSideNavItemButton__content">
      {buttonIcon}

      <OuiInnerText>
        {(ref, innerText) => (
          <span
            ref={ref}
            title={truncate ? innerText : undefined}
            className={classNames('ouiSideNavItemButton__label', {
              'ouiSideNavItemButton__label--truncated': truncate,
            })}>
            {children}
          </span>
        )}
      </OuiInnerText>

      {caret}
    </span>
  );

  const renderItemProps: _OuiSideNavItemButtonProps = {
    href,
    rel,
    target,
    onClick: childrenOnly ? toggleItemOpen : onClick,
    className: buttonClasses,
    children: buttonContent,
  };
  return (
    <div className={classes}>
      <RenderItem {...renderItemProps} {...rest} />
      {childItems}
    </div>
  );
}
