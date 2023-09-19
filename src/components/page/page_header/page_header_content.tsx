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
import { CommonProps } from '../../common';
import { OuiTab, OuiTabs, OuiTabsProps } from '../../tabs';
import { Props as OuiTabProps } from '../../tabs/tab';
import { OuiFlexGroup, OuiFlexItem, OuiFlexGroupProps } from '../../flex';
import { OuiSpacer } from '../../spacer';
import { OuiTitle } from '../../title';
import { OuiText } from '../../text';
import { useIsWithinBreakpoints } from '../../../services/hooks';

export const ALIGN_ITEMS = ['top', 'bottom', 'center', 'stretch'] as const;

// Gets all the tab props including the button or link props
type Tab = OuiTabProps & {
  /**
   * Visible text of the tab
   */
  label: ReactNode;
};

export type OuiPageHeaderContentTitle = {
  /**
   * Wrapped in an `H1` so choose appropriately.
   * A simple string is best
   */
  pageTitle?: ReactNode;
};

export type OuiPageHeaderContentTabs = {
  /**
   * In-app navigation presented as large borderless tabs.
   * Accepts an array of `OuiTab` objects;
   * HELP: This is evaluating to `any[]` in the props table
   */
  tabs?: Tab[];
  /**
   * Any extras to apply to the outer tabs container.
   * Extends `OuiTabs`
   */
  tabsProps?: Omit<OuiTabsProps, 'size' | 'expand' | 'display'>;
};

/**
 * The left side can either be a title with optional description;
 * Or a list of tabs,
 * Or a custom node
 */
type OuiPageHeaderContentLeft = OuiPageHeaderContentTitle &
  OuiPageHeaderContentTabs & {
    /**
     * Position is dependent on existing with a `pageTitle` or `tabs`
     * Automatically get wrapped in a single paragraph tag inside an OuiText block
     */
    description?: string | ReactNode;
  };

export type OuiPageHeaderContentProps = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  OuiPageHeaderContentLeft & {
    /**
     * Set to false if you don't want the children to stack at small screen sizes.
     * Set to `reverse` to display the right side content first for the sack of hierarchy (like global time)
     */
    responsive?: boolean | 'reverse';
    /**
     * Vertical alignment of the left and right side content;
     * Default is `middle` for custom content, but `top` for when `pageTitle` or `tabs` are included
     */
    alignItems?: typeof ALIGN_ITEMS[number];
    /**
     * Pass custom an array of content to this side usually up to 3 buttons.
     * The first button should be primary, usually with `fill` and will be visually displayed as the last item,
     * but first in the tab order
     */
    rightSideItems?: ReactNode[];
    /**
     * Additional OuiFlexGroup props to pass to the container of the `rightSideItems`
     */
    rightSideGroupProps?: Partial<OuiFlexGroupProps>;
    /**
     * Custom children will be rendered before the `tabs` unless no `pageTitle` is present, then it will be the last item
     */
    children?: ReactNode;
  };

export const OuiPageHeaderContent: FunctionComponent<OuiPageHeaderContentProps> = ({
  className,
  pageTitle,
  tabs,
  tabsProps,
  description,
  alignItems = 'top',
  responsive = true,
  rightSideItems,
  rightSideGroupProps,
  children,
  ...rest
}) => {
  const isResponsiveBreakpoint = useIsWithinBreakpoints(
    ['xs', 's'],
    !!responsive
  );

  const classes = classNames('ouiPageHeaderContent');

  let descriptionNode;
  if (description) {
    descriptionNode = (
      <>
        {(pageTitle || tabs) && <OuiSpacer />}
        <OuiText grow={false}>
          <p>{description}</p>
        </OuiText>
      </>
    );
  }

  let pageTitleNode;
  if (pageTitle) {
    pageTitleNode = (
      <OuiTitle size="l">
        <h1>{pageTitle}</h1>
      </OuiTitle>
    );
  }

  let tabsNode;
  if (tabs) {
    const renderTabs = () => {
      return tabs.map((tab, index) => {
        const { label, ...tabRest } = tab;
        return (
          <OuiTab key={index} {...tabRest}>
            {label}
          </OuiTab>
        );
      });
    };

    tabsNode = (
      <>
        {pageTitleNode && <OuiSpacer />}
        <OuiTabs {...tabsProps} display="condensed" size="l">
          {renderTabs()}
        </OuiTabs>
      </>
    );
  }

  const childrenNode = children && (
    <>
      <OuiSpacer />
      {children}
    </>
  );

  let bottomContentNode;
  if (childrenNode || (tabsNode && pageTitleNode)) {
    bottomContentNode = (
      <div className="ouiPageHeaderContent__bottom">
        {childrenNode}
        {pageTitleNode && tabsNode}
      </div>
    );
  }

  /**
   * The left side order depends on if a `pageTitle` was supplied.
   * If not, but there are `tabs`, then the tabs become the page title
   */
  let leftSideOrder;
  if (tabsNode && !pageTitleNode) {
    leftSideOrder = (
      <>
        {tabsNode}
        {descriptionNode}
      </>
    );
  } else {
    leftSideOrder = (
      <>
        {pageTitleNode}
        {descriptionNode}
      </>
    );
  }

  let rightSideFlexItem;
  if (rightSideItems && rightSideItems.length) {
    const wrapWithFlex = () => {
      return rightSideItems.map((item, index) => {
        return (
          <OuiFlexItem grow={false} key={index}>
            {item}
          </OuiFlexItem>
        );
      });
    };

    rightSideFlexItem = (
      <OuiFlexItem grow={false}>
        <OuiFlexGroup
          wrap
          responsive={false}
          {...rightSideGroupProps}
          className={classNames(
            'ouiPageHeaderContent__rightSideItems',
            rightSideGroupProps?.className
          )}>
          {wrapWithFlex()}
        </OuiFlexGroup>
      </OuiFlexItem>
    );
  }

  return alignItems === 'top' || isResponsiveBreakpoint ? (
    <div className={classes} {...rest}>
      <OuiFlexGroup
        responsive={!!responsive}
        className="ouiPageHeaderContent__top"
        alignItems="flexStart"
        gutterSize="l">
        {isResponsiveBreakpoint && responsive === 'reverse' ? (
          <>
            {rightSideFlexItem}
            <OuiFlexItem>{leftSideOrder}</OuiFlexItem>
          </>
        ) : (
          <>
            <OuiFlexItem>{leftSideOrder}</OuiFlexItem>
            {rightSideFlexItem}
          </>
        )}
      </OuiFlexGroup>
      {bottomContentNode}
    </div>
  ) : (
    <div className={classes} {...rest}>
      <OuiFlexGroup
        responsive={!!responsive}
        className="ouiPageHeaderContent__top"
        alignItems={alignItems === 'bottom' ? 'flexEnd' : alignItems}
        gutterSize="l">
        <OuiFlexItem>
          {leftSideOrder}
          {bottomContentNode}
        </OuiFlexItem>
        {rightSideFlexItem}
      </OuiFlexGroup>
    </div>
  );
};
