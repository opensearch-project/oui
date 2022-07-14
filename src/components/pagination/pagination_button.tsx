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

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { ExclusiveUnion, PropsForAnchor, PropsForButton } from '../common';
import { OuiButtonEmpty, OuiButtonEmptyProps } from '../button';
import { OuiI18n } from '../i18n';

export type OuiPaginationButtonProps = OuiButtonEmptyProps & {
  isActive?: boolean;
  /**
   * For ellipsis or other non-clickable buttons.
   */
  isPlaceholder?: boolean;
  hideOnMobile?: boolean;
  pageIndex: number;
  totalPages?: number;
};

type OuiPaginationButtonPropsForAnchor = PropsForAnchor<
  OuiPaginationButtonProps
>;

type OuiPaginationButtonPropsForButton = PropsForButton<
  OuiPaginationButtonProps
>;

type Props = ExclusiveUnion<
  OuiPaginationButtonPropsForAnchor,
  OuiPaginationButtonPropsForButton
>;

export const OuiPaginationButton: FunctionComponent<Props> = ({
  className,
  isActive,
  isPlaceholder,
  hideOnMobile,
  pageIndex,
  totalPages,
  ...rest
}) => {
  const classes = classNames('ouiPaginationButton', className, {
    'ouiPaginationButton-isActive': isActive,
    'ouiPaginationButton-isPlaceholder': isPlaceholder,
    'ouiPaginationButton--hideOnMobile': hideOnMobile,
  });

  const props = {
    className: classes,
    size: 's',
    color: 'text',
    'data-test-subj': `pagination-button-${pageIndex}`,
    isDisabled: isPlaceholder || isActive,
    ...(isActive && { 'aria-current': true }),
    ...(rest['aria-controls'] && { href: `#${rest['aria-controls']}` }),
    ...rest,
  };

  const pageNumber = pageIndex + 1;

  return (
    <OuiI18n
      token="ouiPaginationButton.longPageString"
      default="Page {page} of {totalPages}"
      values={{ page: pageNumber, totalPages: totalPages }}>
      {(longPageString: string) => (
        <OuiI18n
          token="ouiPaginationButton.shortPageString"
          default="Page {page}"
          values={{ page: pageNumber }}>
          {(shortPageString: string) => (
            <OuiButtonEmpty
              aria-label={totalPages ? longPageString : shortPageString}
              {...(props as OuiButtonEmptyProps)}>
              {pageNumber}
            </OuiButtonEmpty>
          )}
        </OuiI18n>
      )}
    </OuiI18n>
  );
};
