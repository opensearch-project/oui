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

import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { OuiIconProps, OuiIcon } from '../../../components/icon';
import { OuiAvatarProps, OuiAvatar } from '../../../components/avatar/avatar';
import { OuiSelectableOption } from '../selectable_option';
import { OuiHighlight } from '../../../components/highlight';

export interface OuiSelectableTemplateSitewideMetaData extends CommonProps {
  /**
   * Required to display the metadata
   */
  text: string;
  /**
   * Styles the metadata according to Elastic's schema.
   * Can be one of 'application', 'deployment', 'article', 'case', 'platform',
   * or a custom string to associate with your own schema.
   * Appends the string to the class name as `ouiSelectableTemplateSitewide__optionMeta--[type]`
   */
  type?:
    | 'application'
    | 'deployment'
    | 'article'
    | 'case'
    | 'platform'
    | string;
  /**
   * Will wrap the meta tag in OuiHighlight to mark the portions that match the search text
   */
  highlightSearchString?: boolean;
}

/**
 * The generic extension allows consumers to keep their data objects
 * intact without needing to do key lookups when using `renderOption`
 */
export type OuiSelectableTemplateSitewideOption<T = { [key: string]: any }> = {
  /**
   * Displayed on the left (`prepend`).
   * Object of `OuiIconProps` for display of the solution/application's logo
   */
  icon?: OuiIconProps;
  /**
   * Displayed on the right (`append`).
   * Object of `OuiAvatarProps` for display of the space (default) or user
   */
  avatar?: OuiAvatarProps;
  /**
   * An array of inline #MetaData displayed beneath the label and separated by bullets.
   */
  meta?: OuiSelectableTemplateSitewideMetaData[];
} & OuiSelectableOption<T>;

export const ouiSelectableTemplateSitewideFormatOptions = (
  options: OuiSelectableTemplateSitewideOption[]
) => {
  return options.map((item: OuiSelectableTemplateSitewideOption) => {
    let title = item.label;
    if (item.meta && item.meta.length) {
      title += ` •${renderOptionMeta(item.meta, '', true)}`;
    }

    return {
      key: item.label,
      title,
      ...item,
      className: classNames(
        'ouiSelectableTemplateSitewide__listItem',
        item.className
      ),
      prepend: item.icon ? (
        <OuiIcon color="subdued" size="l" {...item.icon} />
      ) : (
        item.prepend
      ),
      append: item.avatar ? (
        <OuiAvatar type="space" size="s" {...item.avatar} />
      ) : (
        item.append
      ),
    };
  });
};

export const ouiSelectableTemplateSitewideRenderOptions = (
  option: OuiSelectableTemplateSitewideOption,
  searchValue: string
) => {
  return (
    <>
      <OuiHighlight
        className="ouiSelectableTemplateSitewide__listItemTitle"
        search={searchValue}>
        {option.label}
      </OuiHighlight>
      {renderOptionMeta(option.meta, searchValue)}
    </>
  );
};

function renderOptionMeta(
  meta?: OuiSelectableTemplateSitewideMetaData[],
  searchValue: string = '',
  stringsOnly: boolean = false
): ReactNode {
  if (!meta || meta.length < 1) return;
  const metas: ReactNode = meta.map(
    (meta: OuiSelectableTemplateSitewideMetaData) => {
      const { text, highlightSearchString, className, ...rest } = meta;
      if (stringsOnly) {
        return ` ${text}`;
      }

      // Start with the base and custom classes
      let metaClasses = classNames(
        'ouiSelectableTemplateSitewide__optionMeta',
        className
      );

      // If they provided a type, create the class and append
      if (meta.type) {
        metaClasses = classNames(
          [`ouiSelectableTemplateSitewide__optionMeta--${meta.type}`],
          metaClasses
        );
      }

      return (
        <OuiHighlight
          search={highlightSearchString ? searchValue : ''}
          className={metaClasses}
          key={text}
          {...rest}>
          {text}
        </OuiHighlight>
      );
    }
  );

  return stringsOnly ? (
    metas
  ) : (
    <span className="ouiSelectableTemplateSitewide__optionMetasList">
      {metas}
    </span>
  );
}
