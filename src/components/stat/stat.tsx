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
  Fragment,
  HTMLAttributes,
  FunctionComponent,
  ReactNode,
  createElement,
} from 'react';
import { CommonProps, keysOf } from '../common';
import classNames from 'classnames';

import { OuiText } from '../text';
import { OuiTitle, OuiTitleSize } from '../title/title';
import { OuiScreenReaderOnly } from '../accessibility';
import { OuiI18n } from '../i18n';

const colorToClassNameMap = {
  default: null,
  subdued: 'ouiStat__title--subdued',
  primary: 'ouiStat__title--primary',
  secondary: 'ouiStat__title--secondary',
  success: 'ouiStat__title--success',
  danger: 'ouiStat__title--danger',
  accent: 'ouiStat__title--accent',
};

export const COLORS = keysOf(colorToClassNameMap);

const textAlignToClassNameMap = {
  left: 'ouiStat--leftAligned',
  center: 'ouiStat--centerAligned',
  right: 'ouiStat--rightAligned',
};

export const isColorClass = (
  input: string
): input is keyof typeof colorToClassNameMap => {
  return colorToClassNameMap.hasOwnProperty(input);
};

export const ALIGNMENTS = keysOf(textAlignToClassNameMap);

export interface OuiStatProps {
  /**
   * Set the description (label) text
   */
  description: ReactNode;
  /**
   * Will hide the title with an animation until false
   */
  isLoading?: boolean;
  /**
   * Flips the order of the description and title
   */
  reverse?: boolean;
  textAlign?: keyof typeof textAlignToClassNameMap;
  /**
   * The (value) text
   */
  title: ReactNode;
  /**
   * The color of the title text
   * **`secondary` color is DEPRECATED, use `success` instead**
   */
  titleColor?: keyof typeof colorToClassNameMap | string;
  /**
   * Size of the title. See OuiTitle for options ('s', 'm', 'l'... etc)
   */
  titleSize?: OuiTitleSize;
  /**
   * HTML Element to be used for title
   */
  titleElement?: string;
  /**
   * HTML Element to be used for description
   */
  descriptionElement?: string;
}

export const OuiStat: FunctionComponent<
  CommonProps & Omit<HTMLAttributes<HTMLDivElement>, 'title'> & OuiStatProps
> = ({
  children,
  className,
  description,
  isLoading = false,
  reverse = false,
  textAlign = 'left',
  title,
  titleColor = 'default',
  titleSize = 'l',
  titleElement = 'p',
  descriptionElement = 'p',
  ...rest
}) => {
  const classes = classNames(
    'ouiStat',
    textAlignToClassNameMap[textAlign],
    className
  );

  const titleClasses = classNames(
    'ouiStat__title',
    isColorClass(titleColor) ? colorToClassNameMap[titleColor] : null,
    {
      'ouiStat__title-isLoading': isLoading,
    }
  );

  const commonProps = {
    'aria-hidden': true,
  };

  const descriptionDisplay = (
    <OuiText size="s" className="ouiStat__description">
      {createElement(descriptionElement, commonProps, description)}
    </OuiText>
  );

  const titlePropsWithColor = {
    'aria-hidden': true,
    style: {
      color: `${titleColor}`,
    },
  };

  const titleChildren = isLoading ? '--' : title;

  const titleDisplay = isColorClass(titleColor) ? (
    <OuiTitle size={titleSize} className={titleClasses}>
      {createElement(titleElement, commonProps, titleChildren)}
    </OuiTitle>
  ) : (
    <OuiTitle size={titleSize} className={titleClasses}>
      {createElement(titleElement, titlePropsWithColor, titleChildren)}
    </OuiTitle>
  );

  const screenReader = (
    <OuiScreenReaderOnly>
      <p>
        {isLoading ? (
          <OuiI18n token="ouiStat.loadingText" default="Statistic is loading" />
        ) : (
          <Fragment>
            {reverse ? `${title} ${description}` : `${description} ${title}`}
          </Fragment>
        )}
      </p>
    </OuiScreenReaderOnly>
  );

  const statDisplay = (
    <Fragment>
      {!reverse && descriptionDisplay}
      {titleDisplay}
      {reverse && descriptionDisplay}
      {typeof title === 'string' &&
        typeof description === 'string' &&
        screenReader}
    </Fragment>
  );

  return (
    <div className={classes} {...rest}>
      {statDisplay}
      {children}
    </div>
  );
};
