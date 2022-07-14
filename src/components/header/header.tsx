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

import React, { FunctionComponent, HTMLAttributes, useEffect } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import {
  OuiHeaderSectionItem,
  OuiHeaderSectionItemProps,
  OuiHeaderSection,
} from './header_section';
import { OuiHeaderBreadcrumbs } from './header_breadcrumbs';
import { OuiBreadcrumb, OuiBreadcrumbsProps } from '../breadcrumbs';

type OuiHeaderSectionItemType = OuiHeaderSectionItemProps['children'];
type OuiHeaderSectionBorderType = OuiHeaderSectionItemProps['border'];

export interface OuiHeaderSections {
  /**
   * An arry of items that will be wrapped in a #OuiHeaderSectionItem
   */
  items?: OuiHeaderSectionItemType[];
  /**
   * Apply the passed border side to each #OuiHeaderSectionItem
   */
  borders?: OuiHeaderSectionBorderType;
  /**
   * Breadcrumbs in the header cannot be wrapped in a #OuiHeaderSection in order for truncation to work.
   * Simply pass the array of OuiBreadcrumb objects
   */
  breadcrumbs?: OuiBreadcrumb[];
  /**
   * Other props to pass to #OuiHeaderBreadcrumbs
   */
  breadcrumbProps?: Omit<OuiBreadcrumbsProps, 'breadcrumbs'>;
}

function createHeaderSection(
  sections: OuiHeaderSectionItemType[],
  border?: OuiHeaderSectionBorderType
) {
  return sections.map((section, index) => {
    return (
      <OuiHeaderSectionItem key={index} border={border}>
        {section}
      </OuiHeaderSectionItem>
    );
  });
}

export type OuiHeaderProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * An array of objects to wrap in a #OuiHeaderSection.
     * Each section is spaced using `space-between`.
     * See #OuiHeaderSectionsProp for object details.
     * This prop disregards the prop `children` if both are passed.
     */
    sections?: OuiHeaderSections[];
    /**
     * Helper that positions the header against the window body and
     * adds the correct amount of top padding to the window when in `fixed` mode
     */
    position?: 'static' | 'fixed';
    /**
     * The `default` will inherit its coloring from the light or dark theme.
     * Or, force the header into pseudo `dark` theme for all themes.
     */
    theme?: 'default' | 'dark';
  };

// Start a counter to manage the total number of fixed headers that need the body class
let ouiHeaderFixedCounter = 0;

export const OuiHeader: FunctionComponent<OuiHeaderProps> = ({
  children,
  className,
  sections,
  position = 'static',
  theme = 'default',
  ...rest
}) => {
  const classes = classNames(
    'ouiHeader',
    `ouiHeader--${theme}`,
    `ouiHeader--${position}`,
    className
  );

  useEffect(() => {
    if (position === 'fixed') {
      // Increment fixed header counter for each fixed header
      ouiHeaderFixedCounter++;
      document.body.classList.add('ouiBody--headerIsFixed');

      return () => {
        // Both decrement the fixed counter AND then check if there are none
        if (--ouiHeaderFixedCounter === 0) {
          // If there are none, THEN remove class
          document.body.classList.remove('ouiBody--headerIsFixed');
        }
      };
    }
  }, [position]);

  let contents;
  if (sections) {
    if (children) {
      // In case both children and sections are passed, warn in the console that the children will be disregarded
      console.warn(
        'OuiHeader cannot accept both `children` and `sections`. It will disregard the `children`.'
      );
    }

    contents = sections.map((section, index) => {
      const content = [];
      if (section.items) {
        // Items get wrapped in OuiHeaderSection and each item in a OuiHeaderSectionItem
        content.push(
          <OuiHeaderSection key={`items-${index}`}>
            {createHeaderSection(section.items, section.borders)}
          </OuiHeaderSection>
        );
      }
      if (section.breadcrumbs) {
        content.push(
          // Breadcrumbs are separate and cannot be contained in a OuiHeaderSection
          // in order for truncation to work
          <OuiHeaderBreadcrumbs
            key={`breadcrumbs-${index}`}
            breadcrumbs={section.breadcrumbs}
            {...section.breadcrumbProps}
          />
        );
      }
      return content;
    });
  } else {
    contents = children;
  }

  return (
    <div className={classes} {...rest}>
      {contents}
    </div>
  );
};
