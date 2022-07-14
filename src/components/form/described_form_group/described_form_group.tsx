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

import React, { FunctionComponent, ReactNode, HTMLAttributes } from 'react';

import classNames from 'classnames';

import { CommonProps, keysOf, PropsOf } from '../../common';

import { OuiTitle, OuiTitleSize, OuiTitleProps } from '../../title';
import { OuiText } from '../../text';
import { OuiFlexGroup, OuiFlexItem, OuiFlexGroupGutterSize } from '../../flex';

const paddingSizeToClassNameMap = {
  xxxs: 'ouiDescribedFormGroup__fieldPadding--xxxsmall',
  xxs: 'ouiDescribedFormGroup__fieldPadding--xxsmall',
  xs: 'ouiDescribedFormGroup__fieldPadding--xsmall',
  s: 'ouiDescribedFormGroup__fieldPadding--small',
  m: 'ouiDescribedFormGroup__fieldPadding--medium',
  l: 'ouiDescribedFormGroup__fieldPadding--large',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);

export type OuiDescribedFormGroupPaddingSize = keyof typeof paddingSizeToClassNameMap;

export type OuiDescribedFormGroupProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    /**
     * One or more `OuiFormRow`s
     */
    children?: ReactNode;
    /**
     * Passed to `OuiFlexGroup`
     */
    gutterSize?: OuiFlexGroupGutterSize;
    fullWidth?: boolean;
    /**
     * For better accessibility, it's recommended the use of HTML headings
     */
    title: OuiTitleProps['children'];
    titleSize?: OuiTitleSize;
    /**
     * Added as a child of `OuiText`
     */
    description?: ReactNode;
    /**
     * For customizing the description container. Extended from `OuiFlexItem`
     */
    descriptionFlexItemProps?: PropsOf<typeof OuiFlexItem>;
    /**
     * For customizing the field container. Extended from `OuiFlexItem`
     */
    fieldFlexItemProps?: PropsOf<typeof OuiFlexItem>;
  };

export const OuiDescribedFormGroup: FunctionComponent<OuiDescribedFormGroupProps> = ({
  children,
  className,
  gutterSize = 'l',
  fullWidth = false,
  titleSize = 'xs',
  title,
  description,
  descriptionFlexItemProps,
  fieldFlexItemProps,
  ...rest
}) => {
  const classes = classNames(
    'ouiDescribedFormGroup',
    {
      'ouiDescribedFormGroup--fullWidth': fullWidth,
    },
    className
  );

  const fieldClasses = classNames(
    'ouiDescribedFormGroup__fields',
    paddingSizeToClassNameMap[titleSize],
    fieldFlexItemProps && fieldFlexItemProps.className
  );

  let renderedDescription: ReactNode;

  if (description) {
    renderedDescription = (
      <OuiText
        size="s"
        color="subdued"
        className="ouiDescribedFormGroup__description">
        {description}
      </OuiText>
    );
  }

  return (
    <div role="group" className={classes} {...rest}>
      <OuiFlexGroup gutterSize={gutterSize}>
        <OuiFlexItem {...descriptionFlexItemProps}>
          <OuiTitle size={titleSize} className="ouiDescribedFormGroup__title">
            {title}
          </OuiTitle>

          {renderedDescription}
        </OuiFlexItem>

        <OuiFlexItem {...fieldFlexItemProps} className={fieldClasses}>
          {children}
        </OuiFlexItem>
      </OuiFlexGroup>
    </div>
  );
};
