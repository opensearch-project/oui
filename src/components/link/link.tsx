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
  forwardRef,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
} from 'react';
import classNames from 'classnames';
import { OuiIcon } from '../icon';
import { OuiI18n, useOuiI18n } from '../i18n';
import { CommonProps, ExclusiveUnion, keysOf } from '../common';
import { getSecureRelForTarget } from '../../services';
import { OuiScreenReaderOnly } from '../accessibility';
import { validateHref } from '../../services/security/href_validator';

export type OuiLinkType = 'button' | 'reset' | 'submit';
export type OuiLinkColor =
  | 'primary'
  | 'subdued'
  | 'secondary'
  | 'success'
  | 'accent'
  | 'danger'
  | 'warning'
  | 'text'
  | 'ghost';

const colorsToClassNameMap: { [color in OuiLinkColor]: string } = {
  primary: 'ouiLink--primary',
  subdued: 'ouiLink--subdued',
  secondary: 'ouiLink--secondary',
  success: 'ouiLink--success',
  accent: 'ouiLink--accent',
  danger: 'ouiLink--danger',
  warning: 'ouiLink--warning',
  ghost: 'ouiLink--ghost',
  text: 'ouiLink--text',
};

export const COLORS = keysOf(colorsToClassNameMap);

export interface LinkButtonProps {
  type?: OuiLinkType;
  /**
   * Any of our named colors.
   * **`secondary` color is DEPRECATED, use `success` instead**
   */
  color?: OuiLinkColor;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface OuiLinkButtonProps
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color' | 'onClick'>,
    LinkButtonProps {}

export interface LinkAnchorProps {
  type?: OuiLinkType;
  /**
   * Any of our named colors.
   * **`secondary` color is DEPRECATED, use `success` instead**
   */
  color?: OuiLinkColor;
  /**
   * Set to true to show an icon indicating that it is an external link;
   * Defaults to true if `target="_blank"`
   */
  external?: boolean;
}

export interface OuiLinkAnchorProps
  extends CommonProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type' | 'color' | 'onClick'>,
    LinkAnchorProps {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export type OuiLinkProps = ExclusiveUnion<
  OuiLinkButtonProps,
  OuiLinkAnchorProps
>;

const OuiLink = forwardRef<HTMLAnchorElement | HTMLButtonElement, OuiLinkProps>(
  (
    {
      children,
      color = 'primary',
      className,
      href,
      external,
      target,
      rel,
      type = 'button',
      onClick,
      disabled: _disabled,
      ...rest
    },
    ref
  ) => {
    const isHrefValid = !href || validateHref(href);
    const disabled = _disabled || !isHrefValid;

    const externalLinkIcon = (
      <OuiIcon
        aria-label={useOuiI18n('ouiLink.external.ariaLabel', 'External link')}
        size="s"
        className="ouiLink__externalIcon"
        type="popout"
      />
    );

    const newTargetScreenreaderText = (
      <OuiScreenReaderOnly>
        <span>
          <OuiI18n
            token="ouiLink.newTarget.screenReaderOnlyText"
            default="(opens in a new tab or window)"
          />
        </span>
      </OuiScreenReaderOnly>
    );

    if (href === undefined || !isHrefValid) {
      const buttonProps = {
        className: classNames(
          'ouiLink',
          disabled ? 'ouiLink-disabled' : colorsToClassNameMap[color],
          className
        ),
        type,
        onClick,
        disabled,
        ...rest,
      };

      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          {...(buttonProps as OuiLinkButtonProps)}>
          {children}
        </button>
      );
    }

    const secureRel = getSecureRelForTarget({ href, target, rel });
    const anchorProps = {
      className: classNames('ouiLink', colorsToClassNameMap[color], className),
      href,
      target,
      rel: secureRel,
      onClick,
      ...rest,
    };
    const showExternalLinkIcon =
      (target === '_blank' && external !== false) || external === true;

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...(anchorProps as OuiLinkAnchorProps)}>
        {children}
        {showExternalLinkIcon && externalLinkIcon}
        {target === '_blank' && newTargetScreenreaderText}
      </a>
    );
  }
);

OuiLink.displayName = 'OuiLink';
export { OuiLink };
