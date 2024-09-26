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
  ReactElement,
  ReactNode,
  isValidElement,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { CommonProps, ExclusiveUnion, keysOf } from '../common';
import { getSecureRelForTarget } from '../../services';
import { OuiText } from '../text';
import { OuiTitle } from '../title';
import { OuiBetaBadge, OuiBetaBadgeProps } from '../badge/beta_badge';
import { OuiIconProps } from '../icon';
import {
  OuiCardSelect,
  OuiCardSelectProps,
  ouiCardSelectableColor,
} from './card_select';
import { htmlIdGenerator } from '../../services/accessibility';
import { validateHref } from '../../services/security/href_validator';
import { OuiPanel, OuiPanelProps } from '../panel';

type CardAlignment = 'left' | 'center' | 'right';

const textAlignToClassNameMap: { [alignment in CardAlignment]: string } = {
  left: 'ouiCard--leftAligned',
  center: 'ouiCard--centerAligned',
  right: 'ouiCard--rightAligned',
};

export const ALIGNMENTS = keysOf(textAlignToClassNameMap);

type CardLayout = 'vertical' | 'horizontal';

const layoutToClassNameMap: { [layout in CardLayout]: string } = {
  vertical: '',
  horizontal: 'ouiCard--horizontal',
};

export const LAYOUT_ALIGNMENTS = keysOf(layoutToClassNameMap);

/**
 * Certain props are only allowed when the layout is vertical
 */
type OuiCardPropsLayout = ExclusiveUnion<
  {
    layout?: 'vertical';
    /**
     * Changes alignment of the title and description
     */
    textAlign?: CardAlignment;
    /**
     * Accepts any combination of elements
     */
    footer?: ReactNode;
    /**
     * Accepts a url in string form or ReactElement for a custom image component
     */
    image?: string | ReactElement;
  },
  {
    /**
     * Change to "horizontal" if you need the icon to be left of the content.
     * Horizontal layouts cannot be used in conjunction with `image`, `footer`, or `textAlign`.
     */
    layout: 'horizontal';
  }
>;

export type OuiCardProps = Omit<CommonProps, 'aria-label'> &
  Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'title' | 'onClick'> &
  OuiCardPropsLayout & {
    /**
     * Cards are required to have at least a title and a description and/or children
     */
    title: NonNullable<ReactNode>;

    /**
     * Determines the title's heading element
     */
    titleElement?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';

    /**
     * Determines the title's size, matching that of OuiTitle.
     * Though, card titles can't be too large or small relative to the description text.
     */
    titleSize?: 's' | 'xs';

    /**
     * Placed within a small OuiText `<p>` tag
     */
    description?: NonNullable<ReactNode>;

    /**
     * Accepts an `<OuiIcon>` node or `null`
     */
    icon?: ReactElement<OuiIconProps> | null;

    /**
     * Custom children
     */
    children?: ReactNode;

    /**
     * Use only if you want to forego a button in the footer and make the whole card clickable
     */
    onClick?:
      | React.MouseEventHandler<HTMLButtonElement>
      | React.MouseEventHandler<HTMLAnchorElement>;
    isDisabled?: boolean;
    href?: string;
    target?: string;
    rel?: string;

    /**
     * Add a badge to the card to label it as "Beta" or other non-GA state
     * **DEPRECATED: Use `betaBadgeProps.label` instead.**
     */
    betaBadgeLabel?: string;

    /**
     * Add a description to the beta badge (will appear in a tooltip)
     * **DEPRECATED: Use `betaBadgeProps.tooltipContent` instead.**
     */
    betaBadgeTooltipContent?: ReactNode;

    /**
     * Optional title will be supplied as tooltip title or title attribute otherwise the label will be used.
     * **DEPRECATED: Use `betaBadgeProps.title` instead.**
     */
    betaBadgeTitle?: string;
    betaBadgeProps?: Partial<OuiBetaBadgeProps>;
    /**
     * Matches to the color property of OuiPanel. If defined, removes any border & shadow.
     * Leave as `undefined` to display as a default panel.
     * Selectable cards will always display as a default panel.
     */
    display?: OuiPanelProps['color'];
    /**
     * Padding applied around the content of the card
     */
    paddingSize?: OuiPanelProps['paddingSize'];
    /**
     * Adds a button to the bottom of the card to allow for in-place selection
     */
    selectable?: OuiCardSelectProps;
    /**
     * Use a border style of card instead of shadow
     */
    hasBorder?: OuiPanelProps['hasBorder'];
    /**
     * Customize card border radius
     */
    borderRadius?: OuiPanelProps['borderRadius'];
  } & (
    | {
        // description becomes optional when children is present
        description?: NonNullable<ReactNode>;
        children: ReactNode;
      }
    | {
        // description is required if children is omitted
        description: NonNullable<ReactNode>;
      }
  );

export const OuiCard: FunctionComponent<OuiCardProps> = ({
  className,
  description,
  isDisabled: _isDisabled,
  title,
  titleElement = 'span',
  titleSize = 's',
  icon,
  image,
  children,
  footer,
  onClick,
  href,
  rel,
  target,
  textAlign = 'center',
  betaBadgeLabel,
  betaBadgeTooltipContent,
  betaBadgeTitle,
  betaBadgeProps,
  layout = 'vertical',
  selectable,
  display,
  paddingSize,
  borderRadius,
  ...rest
}) => {
  const isHrefValid = !href || validateHref(href);
  const isDisabled = _isDisabled || !isHrefValid;
  const isClickable =
    !isDisabled && (onClick || href || (selectable && !selectable.isDisabled));

  /**
   * For a11y, we simulate the same click that's provided on the title when clicking the whole card
   * without having to make the whole card a button or anchor tag.
   * *Card Accessibility: The redundant click event https://inclusive-components.design/cards/*
   */
  let link: HTMLAnchorElement | HTMLButtonElement | null = null;
  const outerOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (link && link !== e.target) {
      link.click();
    }
  };

  if (layout === 'horizontal') {
    if (image || footer || textAlign !== 'center') {
      throw new Error(
        'OuiCard: `layout="horizontal"` cannot be used in conjunction with `image`, `footer`, or `textAlign`.'
      );
    }
  }

  const selectableColorClass = selectable
    ? `ouiCard--isSelectable--${ouiCardSelectableColor(
        selectable.color,
        selectable.isSelected
      )}`
    : undefined;

  const classes = classNames(
    'ouiCard',
    textAlignToClassNameMap[textAlign],
    layoutToClassNameMap[layout],
    {
      'ouiCard--isClickable': isClickable,
      'ouiCard--hasBetaBadge': betaBadgeLabel,
      'ouiCard--hasIcon': icon,
      'ouiCard--isSelectable': selectable,
      'ouiCard-isSelected': selectable && selectable.isSelected,
      'ouiCard-isDisabled': isDisabled,
    },
    selectableColorClass,
    className
  );

  const ariaId = htmlIdGenerator()();
  const ariaDesc = description ? `${ariaId}Description` : '';

  /**
   * Top area containing image, icon or both
   */

  let imageNode;
  if (image && layout === 'vertical') {
    if (isValidElement(image) || typeof image === 'string') {
      imageNode = (
        <div className="ouiCard__image">
          {isValidElement(image) ? image : <img src={image} alt="" />}
        </div>
      );
    } else {
      imageNode = null;
    }
  }

  let iconNode;
  if (icon) {
    iconNode = React.cloneElement(icon, {
      className: classNames(icon.props.className, 'ouiCard__icon'),
    });
  }

  let optionalCardTop;
  if (imageNode || iconNode) {
    optionalCardTop = (
      <div className="ouiCard__top">
        {imageNode}
        {iconNode}
      </div>
    );
  }

  /**
   * Optional OuiBetaBadge
   */

  let optionalBetaBadge;
  let optionalBetaBadgeID = '';
  if (betaBadgeLabel) {
    optionalBetaBadgeID = `${ariaId}BetaBadge`;
    optionalBetaBadge = (
      <span className="ouiCard__betaBadgeWrapper">
        <OuiBetaBadge
          id={optionalBetaBadgeID}
          {...(betaBadgeProps as OuiBetaBadgeProps)}
          label={betaBadgeLabel}
          title={betaBadgeTitle}
          tooltipContent={betaBadgeTooltipContent}
          className={classNames(
            'ouiCard__betaBadge',
            betaBadgeProps?.className
          )}
        />
      </span>
    );

    // Increase padding size when there is a beta badge unless it's already determined
    paddingSize = paddingSize || 'l';
  }

  /**
   * Optional selectable button
   */

  if (selectable && isDisabled && selectable.isDisabled === undefined) {
    selectable.isDisabled = isDisabled;
  }

  let optionalSelectButton;
  if (selectable) {
    optionalSelectButton = (
      <OuiCardSelect
        aria-describedby={`${ariaId}Title ${ariaDesc}`}
        {...selectable}
        buttonRef={(node) => {
          link = node;
        }}
      />
    );
  }

  /**
   * Wraps the title with the link (<a>) or button.
   * This makes the title element a11y friendly and gets described by its content if its interactable.
   */

  let theTitle;
  if (!isDisabled && href) {
    theTitle = (
      <a
        className="ouiCard__titleAnchor"
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        href={href}
        target={target}
        aria-describedby={ariaDesc}
        rel={getSecureRelForTarget({ href, target, rel })}
        ref={(node) => {
          link = node;
        }}>
        {title}
      </a>
    );
  } else if (isDisabled || onClick) {
    theTitle = (
      <button
        className="ouiCard__titleButton"
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        disabled={isDisabled}
        aria-describedby={`${optionalBetaBadgeID} ${ariaDesc}`}
        ref={(node) => {
          link = node;
        }}>
        {title}
      </button>
    );
  } else {
    theTitle = title;
  }

  /**
   * Convert titleElement to a capital TitleElement
   */

  const TitleElement = titleElement;

  return (
    <OuiPanel
      element="div"
      className={classes}
      onClick={isClickable ? outerOnClick : undefined}
      color={isDisabled ? 'subdued' : display}
      hasShadow={isDisabled || display ? false : true}
      hasBorder={display ? false : undefined}
      paddingSize={paddingSize}
      borderRadius={borderRadius}
      {...rest}>
      {optionalCardTop}

      <div className="ouiCard__content">
        <OuiTitle
          id={`${ariaId}Title`}
          className="ouiCard__title"
          size={titleSize}>
          <TitleElement>{theTitle}</TitleElement>
        </OuiTitle>

        {description && (
          <OuiText id={ariaDesc} size="s" className="ouiCard__description">
            <p>{description}</p>
          </OuiText>
        )}

        {children && <div className="ouiCard__children">{children}</div>}
      </div>

      {/* Beta badge should always be after the title/description but before any footer buttons */}
      {optionalBetaBadge}

      {layout === 'vertical' && footer && (
        <div className="ouiCard__footer">{footer}</div>
      )}
      {optionalSelectButton}
    </OuiPanel>
  );
};
