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
  AriaAttributes,
  Fragment,
  FunctionComponent,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion, keysOf } from '../../common';

import { getSecureRelForTarget } from '../../../services';

import { OuiToolTip, ToolTipPositions } from '../../tool_tip';

import { OuiIcon, IconType } from '../../icon';

const colorToClassMap = {
  accent: 'ouiExperimentalBadge--accent',
  subdued: 'ouiExperimentalBadge--subdued',
  hollow: 'ouiExperimentalBadge--hollow',
};

export const COLORS: ExperimentalBadgeColor[] = keysOf(colorToClassMap);
export type ExperimentalBadgeColor = keyof typeof colorToClassMap;

export type ExperimentalBadgeSize = 's' | 'm';

export const sizeToClassMap: {
  [size in ExperimentalBadgeSize]: string | null;
} = {
  s: 'ouiExperimentalBadge--small',
  m: null,
};

export const SIZES = keysOf(sizeToClassMap);

type WithButtonProps = {
  /**
   * Will apply an onclick to the badge itself
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Aria label applied to the onClick button
   */
  onClickAriaLabel?: AriaAttributes['aria-label'];
} & Omit<HTMLAttributes<HTMLButtonElement>, 'onClick' | 'color'>;

type WithAnchorProps = {
  href: string;
  target?: string;
  rel?: string;
} & Omit<HTMLAttributes<HTMLAnchorElement>, 'href' | 'color' | 'onClick'>;

type WithSpanProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'onClick' | 'color' | 'title'
>;

// `label` prop can be a `ReactNode` only if `title` or `tooltipContent` is provided
type LabelAsNode = ExclusiveUnion<
  {
    title: string;
    tooltipContent?: ReactNode;
  },
  {
    tooltipContent: ReactNode;
    title?: string;
  }
> & {
  label: ReactNode;
};

interface LabelAsString {
  /**
   * One word label like "Experimental" or "Lab"
   */
  label: string;
}

type BadgeProps = {
  /**
   * Supply an icon type if the badge should just be an icon
   */
  iconType?: IconType;

  /**
   * One word label like "Experimental" or "Lab"
   */
  label: ReactNode;

  /**
   * Content for the tooltip
   */
  tooltipContent?: ReactNode;

  /**
   * Custom position of the tooltip
   */
  tooltipPosition?: ToolTipPositions;

  /**
   * Optional title will be supplied as tooltip title or title attribute
   * otherwise the label will be used
   */
  title?: string;
  /**
   * Accepts accent, subdued and hollow.
   */
  color?: ExperimentalBadgeColor;
  size?: ExperimentalBadgeSize;
} & ExclusiveUnion<LabelAsNode, LabelAsString>;

export type OuiExperimentalBadgeProps = CommonProps &
  ExclusiveUnion<
    ExclusiveUnion<WithButtonProps, WithAnchorProps>,
    WithSpanProps
  > &
  BadgeProps;

export const OuiExperimentalBadge: FunctionComponent<OuiExperimentalBadgeProps> = ({
  className,
  label,
  color = 'hollow',
  tooltipContent,
  tooltipPosition = 'top',
  title,
  iconType,
  onClick,
  onClickAriaLabel,
  href,
  rel,
  target,
  size = 'm',
  ...rest
}) => {
  let singleLetter = false;
  if (typeof label === 'string' && label.length === 1) {
    singleLetter = true;
  }

  const classes = classNames(
    'ouiExperimentalBadge',
    {
      'ouiExperimentalBadge--iconOnly': iconType,
      'ouiExperimentalBadge--singleLetter': singleLetter,
      'ouiExperimentalBadge-isClickable': onClick || href,
    },
    colorToClassMap[color],
    sizeToClassMap[size],
    className
  );

  let icon: JSX.Element | undefined;
  if (iconType) {
    icon = (
      <OuiIcon
        className="ouiExperimentalBadge__icon"
        type={iconType}
        size={size === 'm' ? 'm' : 's'}
        aria-hidden="true"
        color="inherit" // forces the icon to inherit its parent color
      />
    );
  }

  const Element = href ? 'a' : 'button';
  const relObj: {
    href?: string;
    target?: string;
    rel?: string;
    onClick?:
      | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
      | ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void);
  } = {};

  if (href) {
    relObj.href = href;
    relObj.target = target;
    relObj.rel = getSecureRelForTarget({ href, target, rel });
  }
  if (onClick) {
    relObj.onClick = onClick;
  }

  let content;
  if (onClick || href) {
    content = (
      <Element
        aria-label={onClickAriaLabel}
        className={classes}
        title={typeof label === 'string' ? label : title}
        {...(relObj as HTMLAttributes<HTMLElement>)}
        {...(rest as HTMLAttributes<HTMLElement>)}>
        {icon || label}
      </Element>
    );
    if (tooltipContent) {
      return (
        <OuiToolTip
          position={tooltipPosition}
          content={tooltipContent}
          title={title || label}>
          <Fragment>{content}</Fragment>
        </OuiToolTip>
      );
    } else {
      return <Fragment>{content}</Fragment>;
    }
  } else {
    if (tooltipContent) {
      return (
        <OuiToolTip
          position={tooltipPosition}
          content={tooltipContent}
          title={title || label}>
          <span tabIndex={0} className={classes} {...rest}>
            {icon || label}
          </span>
        </OuiToolTip>
      );
    } else {
      const spanTitle = title || label;
      if (spanTitle && typeof spanTitle !== 'string') {
        console.warn(
          `Only string titles are permitted on badges that do not use tooltips. Found: ${typeof spanTitle}`
        );
      }
      return (
        <span className={classes} title={spanTitle as string} {...rest}>
          {icon || label}
        </span>
      );
    }
  }
};

/** DEPRECATED: use ExperimentalBadgeColor */
export type BetaBadgeColor = ExperimentalBadgeColor;

/** DEPRECATED: use ExperimentalBadgeSize */
export type BetaBadgeSize = ExperimentalBadgeSize;

/** DEPRECATED: use OuiExperimentalBadgeProps */
export type OuiBetaBadgeProps = OuiExperimentalBadgeProps;

/** DEPRECATED: use OuiExperimentalBadge */
export const OuiBetaBadge = OuiExperimentalBadge;
