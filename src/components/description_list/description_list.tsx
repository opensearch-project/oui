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

import React, { HTMLAttributes, ReactNode, FunctionComponent } from 'react';
import classNames from 'classnames';

import { OuiDescriptionListTitle } from './description_list_title';

import { OuiDescriptionListDescription } from './description_list_description';
import { CommonProps, keysOf } from '../common';

export type OuiDescriptionListType = keyof typeof typesToClassNameMap;
export type OuiDescriptionListAlignment = keyof typeof alignmentsToClassNameMap;
export type OuiDescriptionListTextStyle = keyof typeof textStylesToClassNameMap;

export interface OuiDescriptionListProps {
  listItems?: Array<{
    title: NonNullable<ReactNode>;
    description: NonNullable<ReactNode>;
  }>;
  /**
   * Text alignment
   */
  align?: OuiDescriptionListAlignment;
  /**
   * Smaller text and condensed spacing
   */
  compressed?: boolean;
  /**
   * How should the content be styled, by default
   * this will emphasize the title
   */
  textStyle?: OuiDescriptionListTextStyle;
  /**
   * How each item should be laid out
   */
  type?: OuiDescriptionListType;
  /**
   * Props object to be passed to `OuiDescriptionListTitle`
   */
  titleProps?: HTMLAttributes<HTMLElement>;
  /**
   * Props object to be passed to `OuiDescriptionListDescription`
   */
  descriptionProps?: HTMLAttributes<HTMLElement>;
}

const typesToClassNameMap = {
  row: 'ouiDescriptionList--row',
  inline: 'ouiDescriptionList--inline',
  column: 'ouiDescriptionList--column',
  responsiveColumn: 'ouiDescriptionList--responsiveColumn',
};

export const TYPES = keysOf(typesToClassNameMap);

const alignmentsToClassNameMap = {
  center: 'ouiDescriptionList--center',
  left: '',
};

export const ALIGNMENTS = keysOf(alignmentsToClassNameMap);

const textStylesToClassNameMap = {
  normal: '',
  reverse: 'ouiDescriptionList--reverse',
};

export const TEXT_STYLES = keysOf(textStylesToClassNameMap);

export const OuiDescriptionList: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDListElement> & OuiDescriptionListProps
> = ({
  align = 'left',
  children,
  className,
  compressed = false,
  descriptionProps,
  listItems,
  textStyle = 'normal',
  titleProps,
  type = 'row',
  ...rest
}) => {
  const classes = classNames(
    'ouiDescriptionList',
    type ? typesToClassNameMap[type] : undefined,
    align ? alignmentsToClassNameMap[align] : undefined,
    textStyle ? textStylesToClassNameMap[textStyle] : undefined,
    {
      'ouiDescriptionList--compressed': compressed,
    },
    className
  );

  let childrenOrListItems = null;
  if (listItems) {
    childrenOrListItems = listItems.map((item, index) => {
      return [
        <OuiDescriptionListTitle key={`title-${index}`} {...titleProps}>
          {item.title}
        </OuiDescriptionListTitle>,

        <OuiDescriptionListDescription
          key={`description-${index}`}
          {...descriptionProps}>
          {item.description}
        </OuiDescriptionListDescription>,
      ];
    });
  } else {
    childrenOrListItems = children;
  }

  return (
    <dl className={classes} {...rest}>
      {childrenOrListItems}
    </dl>
  );
};
