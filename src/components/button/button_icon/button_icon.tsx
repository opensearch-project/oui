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
  FunctionComponent,
  Ref,
} from 'react';
import classNames from 'classnames';

import { getSecureRelForTarget } from '../../../services';
import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
  keysOf,
} from '../../common';

import { IconType, IconSize, OuiIcon } from '../../icon';

import { validateHref } from '../../../services/security/href_validator';

export type OuiButtonIconColor =
  | 'accent'
  | 'danger'
  | 'ghost'
  | 'primary'
  /**
   * Set for deprecation 3/2/21
   * This color button is close enough to text to be duplicative
   */
  | 'subdued'
  | 'success'
  | 'text'
  | 'warning';

const displayToClassNameMap = {
  base: null,
  empty: 'ouiButtonIcon--empty',
  fill: 'ouiButtonIcon--fill',
};

export const DISPLAYS = keysOf(displayToClassNameMap);
type OuiButtonIconDisplay = keyof typeof displayToClassNameMap;

export interface OuiButtonIconProps extends CommonProps {
  iconType: IconType;
  /**
   * Any of the named color palette options.
   * **`subdued` set to be DEPRECATED, use `text` instead**
   */
  color?: OuiButtonIconColor;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  isDisabled?: boolean;
  /**
   * Overall size of button.
   * Matches the sizes of other OuiButtons
   */
  size?: OuiButtonIconSizes;
  /**
   * Size of the icon only.
   * This will not affect the overall size of the button
   */
  iconSize?: IconSize;
  /**
   * Applies the boolean state as the `aria-pressed` property to create a toggle button.
   * *Only use when the readable text does not change between states.*
   */
  isSelected?: boolean;
  /**
   * Sets the display style for matching other OuiButton types.
   * `base` is equivelant to a typical OuiButton
   * `fill` is equivelant to a filled OuiButton
   * `empty` (default) is equivelant to an OuiButtonEmpty
   */
  display?: OuiButtonIconDisplay;
}

type OuiButtonIconPropsForAnchor = {
  type?: string;
} & PropsForAnchor<
  OuiButtonIconProps,
  {
    buttonRef?: Ref<HTMLAnchorElement>;
  }
>;

export type OuiButtonIconPropsForButton = {
  type?: 'submit' | 'reset' | 'button';
} & PropsForButton<
  OuiButtonIconProps,
  {
    buttonRef?: Ref<HTMLButtonElement>;
  }
>;

type Props = ExclusiveUnion<
  OuiButtonIconPropsForAnchor,
  OuiButtonIconPropsForButton
>;

const colorToClassNameMap: { [color in OuiButtonIconColor]: string } = {
  accent: 'ouiButtonIcon--accent',
  danger: 'ouiButtonIcon--danger',
  ghost: 'ouiButtonIcon--ghost',
  primary: 'ouiButtonIcon--primary',
  subdued: 'ouiButtonIcon--subdued',
  success: 'ouiButtonIcon--success',
  text: 'ouiButtonIcon--text',
  warning: 'ouiButtonIcon--warning',
};

export const COLORS = keysOf(colorToClassNameMap);

const sizeToClassNameMap = {
  xs: 'ouiButtonIcon--xSmall',
  s: 'ouiButtonIcon--small',
  m: 'ouiButtonIcon--medium',
};

export type OuiButtonIconSizes = keyof typeof sizeToClassNameMap;

export const SIZES = keysOf(sizeToClassNameMap);

export const OuiButtonIcon: FunctionComponent<Props> = ({
  className,
  iconType,
  iconSize = 'm',
  color = 'primary',
  isDisabled: _isDisabled,
  href,
  type = 'button',
  display = 'empty',
  target,
  rel,
  size = 'xs',
  buttonRef,
  isSelected,
  ...rest
}) => {
  const isHrefValid = !href || validateHref(href);
  const isDisabled = _isDisabled || !isHrefValid;

  const ariaHidden = rest['aria-hidden'];
  const isAriaHidden = ariaHidden === 'true' || ariaHidden === true;

  if (!rest['aria-label'] && !rest['aria-labelledby'] && !isAriaHidden) {
    console.warn(
      `OuiButtonIcon requires aria-label or aria-labelledby to be specified because icon-only
      buttons are screen-reader-inaccessible without them.`
    );
  }
  const classes = classNames(
    'ouiButtonIcon',
    {
      'ouiButtonIcon-isDisabled': isDisabled,
    },
    colorToClassNameMap[color],
    display && displayToClassNameMap[display],
    size && sizeToClassNameMap[size],
    className
  );

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (iconType) {
    buttonIcon = (
      <OuiIcon
        className="ouiButtonIcon__icon"
        type={iconType}
        size={iconSize}
        aria-hidden="true"
        color="inherit" // forces the icon to inherit its parent color
      />
    );
  }

  // <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
  // this is a button and piggyback off its disabled styles.
  if (href && !isDisabled) {
    const secureRel = getSecureRelForTarget({ href, target, rel });

    return (
      <a
        tabIndex={isAriaHidden ? -1 : undefined}
        className={classes}
        href={href}
        target={target}
        rel={secureRel}
        ref={buttonRef as Ref<HTMLAnchorElement>}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {buttonIcon}
      </a>
    );
  }

  let buttonType: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  return (
    <button
      tabIndex={isAriaHidden ? -1 : undefined}
      disabled={isDisabled}
      className={classes}
      aria-pressed={isSelected}
      type={type as typeof buttonType}
      ref={buttonRef as Ref<HTMLButtonElement>}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {buttonIcon}
    </button>
  );
};
