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
  ReactNode,
  useState,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../../common';
import { htmlIdGenerator } from '../../../services';

import { OuiAccordion, OuiAccordionProps } from '../../accordion';
import { OuiIcon, IconType, IconSize, OuiIconProps } from '../../icon';
import { OuiFlexGroup, OuiFlexItem } from '../../flex';
import { OuiTitle, OuiTitleProps, OuiTitleSize } from '../../title';

type Background = 'none' | 'light' | 'dark';
const backgroundToClassNameMap: { [color in Background]: string } = {
  none: '',
  light: 'ouiCollapsibleNavGroup--light',
  dark: 'ouiCollapsibleNavGroup--dark',
};
export const BACKGROUNDS = Object.keys(
  backgroundToClassNameMap
) as Background[];

export interface OuiCollapsibleNavGroupInterface extends CommonProps {
  /**
   * ReactNode to render as this component's content
   */
  children?: ReactNode;
  /**
   * Sits left of the `title` and only when `title` is present
   */
  iconType?: IconType;
  /**
   * Change the size of the icon in the `title`
   */
  iconSize?: IconSize;
  /**
   * Further extend the props applied to OuiIcon
   */
  iconProps?: Omit<OuiIconProps, 'type' | 'size'>;
  /**
   * Optionally provide an id, otherwise one will be created
   */
  id?: string;
  /**
   * Adds a background color to the entire group,
   * applying the correct text color to the `title` only
   */
  background?: Background;
  /**
   * Determines the title's heading element
   */
  titleElement?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
  /**
   * Title sizing equivalent to OuiTitle, but only `s` and smaller
   */
  titleSize?: Exclude<OuiTitleProps['size'], 'l' | 'm'>;
}

type GroupAsAccordion = OuiCollapsibleNavGroupInterface &
  // The HTML `title` prop conflicts in type with our `title` prop
  Omit<OuiAccordionProps, 'id' | 'title'> & {
    /**
     * If `true`, wraps children in the body of an accordion,
     * requiring the prop `title` to be used as the button.
     * When `false`, simply renders a div without any accordion functionality.
     */
    isCollapsible: true;
    /**
     * The title gets wrapped in the appropriate heading level
     * with the option to add an iconType
     */
    title: ReactNode;
  };

type GroupAsDiv = OuiCollapsibleNavGroupInterface & {
  /**
   * If `true`, wraps children in the body of an accordion,
   * requiring the prop `title` to be used as the button.
   * When `false`, simply renders a div without any accordion functionality.
   */
  isCollapsible?: false;
  /**
   * The title gets wrapped in the appropriate heading level
   * with the option to add an iconType
   */
  title?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export type OuiCollapsibleNavGroupProps = ExclusiveUnion<
  GroupAsAccordion,
  GroupAsDiv
>;

export const OuiCollapsibleNavGroup: FunctionComponent<OuiCollapsibleNavGroupProps> = ({
  className,
  children,
  id,
  title,
  iconType,
  iconSize = 'l',
  background = 'none',
  isCollapsible = false,
  titleElement = 'h3',
  titleSize = 'xxs',
  iconProps,
  ...rest
}) => {
  const [groupID] = useState(id || htmlIdGenerator()());
  const titleID = `${groupID}__title`;

  const classes = classNames(
    'ouiCollapsibleNavGroup',
    backgroundToClassNameMap[background],
    {
      'ouiCollapsibleNavGroup--withHeading': title,
    },
    className
  );

  // Warn if consumer passes an iconType without a title
  if (iconType && !title) {
    console.warn(
      'OuiCollapsibleNavGroup will not render an icon without `title`.'
    );
  }

  const content = children && (
    <div className="ouiCollapsibleNavGroup__children">{children}</div>
  );

  const headingClasses = 'ouiCollapsibleNavGroup__heading';

  const TitleElement = titleElement;
  const titleContent = title ? (
    <OuiFlexGroup gutterSize="m" alignItems="center" responsive={false}>
      {iconType && (
        <OuiFlexItem grow={false}>
          <OuiIcon {...iconProps} type={iconType} size={iconSize} />
        </OuiFlexItem>
      )}

      <OuiFlexItem>
        <OuiTitle size={titleSize as OuiTitleSize}>
          <TitleElement id={titleID} className="ouiCollapsibleNavGroup__title">
            {title}
          </TitleElement>
        </OuiTitle>
      </OuiFlexItem>
    </OuiFlexGroup>
  ) : undefined;

  if (isCollapsible && title) {
    return (
      <OuiAccordion
        id={groupID}
        className={classes}
        buttonClassName={headingClasses}
        buttonContent={titleContent}
        initialIsOpen={true}
        arrowDisplay="right"
        {...rest}>
        {content}
      </OuiAccordion>
    );
  } else {
    return (
      <div id={groupID} className={classes} {...rest}>
        {titleContent && <div className={headingClasses}>{titleContent}</div>}
        {content}
      </div>
    );
  }
};
