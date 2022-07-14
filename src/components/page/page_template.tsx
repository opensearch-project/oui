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

import React, { CSSProperties, FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { OuiPage, OuiPageProps, SIZES } from './page';
import { OuiPageSideBar, OuiPageSideBarProps } from './page_side_bar';
import { OuiPageBody, OuiPageBodyProps } from './page_body';
import { OuiPageHeader, OuiPageHeaderProps } from './page_header';
import {
  OuiPageContent,
  OuiPageContentBody,
  OuiPageContentProps,
  OuiPageContentBodyProps,
} from './page_content';
import { OuiBottomBarProps, OuiBottomBar } from '../bottom_bar';
import { useIsWithinBreakpoints } from '../../services';
import { OuiFlexGroup, OuiFlexItem } from '../flex';

export const TEMPLATES = [
  'default',
  'centeredBody',
  'centeredContent',
  'empty',
] as const;

export type OuiPageTemplateProps = Omit<OuiPageProps, 'paddingSize'> & {
  /**
   * Choose between 3 types of templates.
   * `default`: Typical layout with nothing centered
   * `centeredBody`: The panelled content is centered
   * `centeredContent`: The content inside the panel is centered
   * `empty`: Removes the panneling of the page content
   */
  template?: typeof TEMPLATES[number];
  /**
   * Padding size will not get applied to the over-arching #OuiPage,
   * but will propogate through all the components to keep them in sync
   */
  paddingSize?: typeof SIZES[number];
  /**
   * Optionally include #OuiPageSideBar content.
   * The inclusion of this will affect the whole layout
   */
  pageSideBar?: ReactNode;
  /**
   * Gets passed along to the #OuiPageSideBar component
   */
  pageSideBarProps?: OuiPageSideBarProps;
  /**
   * Optionally include an #OuiPageHeader by passing an object of its props
   */
  pageHeader?: OuiPageHeaderProps;
  /**
   * Gets passed along to the #OuiPageBody component
   */
  pageBodyProps?: OuiPageBodyProps;
  /**
   * Gets passed along to the #OuiPageContent component
   */
  pageContentProps?: OuiPageContentProps;
  /**
   * Gets passed along to the #OuiPageContentBody component
   */
  pageContentBodyProps?: OuiPageContentBodyProps;
  /**
   * Adds contents inside of an OuiBottomBar.
   * Only works when `template = 'default'`
   */
  bottomBar?: OuiBottomBarProps['children'];
  /**
   * Gets passed along to the #OuiBottomBar component if `bottomBar` has contents
   */
  bottomBarProps?: OuiBottomBarProps;
  /**
   * Stretches or restricts the height to 100% of the parent;
   * `true`: scrolls the OuiPageContentBody;
   * `noscroll`: removes all scroll ability;
   * Only works when `template = 'default | empty'` and breakpoint is `m` and above
   */
  fullHeight?: boolean | 'noscroll';
  /**
   * Minimum height in which to enforce scrolling
   */
  minHeight?: CSSProperties['minHeight'];
};

export const OuiPageTemplate: FunctionComponent<OuiPageTemplateProps> = ({
  template = 'default',
  restrictWidth = true,
  grow = true,
  paddingSize = 'l',
  fullHeight,
  children,
  className,
  pageSideBar,
  pageSideBarProps,
  pageHeader,
  pageBodyProps,
  pageContentProps,
  pageContentBodyProps,
  bottomBar,
  bottomBarProps,
  minHeight = 460,
  ...rest
}) => {
  /**
   * Full height ~madness~ logic
   */
  const canFullHeight =
    useIsWithinBreakpoints(['m', 'l', 'xl']) &&
    (template === 'default' || template === 'empty');
  const fullHeightClass = { 'oui-fullHeight': fullHeight && canFullHeight };
  const yScrollClass = { 'oui-yScroll': fullHeight && canFullHeight };

  if (canFullHeight && fullHeight) {
    // By using flex group it will also fix the negative margin issues for nested flex groups
    children = (
      <OuiFlexGroup
        className="oui-fullHeight"
        gutterSize="none"
        direction="column"
        responsive={false}>
        <OuiFlexItem
          className={classNames({
            'oui-yScroll': fullHeight === true,
            'oui-fullHeight': fullHeight === 'noscroll',
          })}
          grow={true}>
          {children}
        </OuiFlexItem>
      </OuiFlexGroup>
    );

    pageBodyProps = {
      ...pageBodyProps,
      className: classNames(fullHeightClass, pageBodyProps?.className),
    };
    pageContentProps = {
      ...pageContentProps,
      className: classNames(yScrollClass, pageContentProps?.className),
    };
    pageContentBodyProps = {
      ...pageContentBodyProps,
      className: classNames(fullHeightClass, pageContentBodyProps?.className),
    };
  }

  const classes = classNames('ouiPageTemplate', fullHeightClass, className);
  const pageStyle = { minHeight, ...rest.style };

  /**
   * This seems very repetitious but it's the most readable, scalable, and maintainable
   */

  switch (template) {
    /**
     * CENTERED BODY
     * The panelled content is centered
     */
    case 'centeredBody':
      return pageSideBar ? (
        <OuiPage
          className={classes}
          paddingSize="none"
          grow={grow}
          {...rest}
          style={pageStyle}>
          <OuiPageSideBar
            sticky
            paddingSize={paddingSize}
            {...pageSideBarProps}>
            {pageSideBar}
          </OuiPageSideBar>

          <OuiPageBody paddingSize={paddingSize} {...pageBodyProps}>
            {pageHeader && (
              <OuiPageHeader restrictWidth={restrictWidth} {...pageHeader} />
            )}
            <OuiPageContent
              verticalPosition="center"
              horizontalPosition="center"
              paddingSize={paddingSize}
              {...pageContentProps}>
              <OuiPageContentBody
                restrictWidth={restrictWidth}
                {...pageContentBodyProps}>
                {children}
              </OuiPageContentBody>
            </OuiPageContent>
          </OuiPageBody>
        </OuiPage>
      ) : (
        <OuiPage
          className={classes}
          paddingSize={paddingSize}
          grow={grow}
          {...rest}
          style={pageStyle}>
          <OuiPageBody restrictWidth={restrictWidth} {...pageBodyProps}>
            {pageHeader && (
              <OuiPageHeader
                paddingSize="none"
                restrictWidth={false}
                bottomBorder
                {...pageHeader}
              />
            )}
            {/* Extra page body to get the correct alignment and padding of the centered OuiPageContent */}
            <OuiPageBody>
              <OuiPageContent
                verticalPosition="center"
                horizontalPosition="center"
                paddingSize={paddingSize}
                {...pageContentProps}>
                <OuiPageContentBody
                  paddingSize="none"
                  restrictWidth={restrictWidth}
                  {...pageContentBodyProps}>
                  {children}
                </OuiPageContentBody>
              </OuiPageContent>
            </OuiPageBody>
          </OuiPageBody>
        </OuiPage>
      );

    /**
     * CENTERED CONTENT
     * The content inside the panel is centered
     */
    case 'centeredContent':
      return pageSideBar ? (
        <OuiPage
          className={classes}
          paddingSize="none"
          grow={grow}
          {...rest}
          style={pageStyle}>
          <OuiPageSideBar
            sticky
            paddingSize={paddingSize}
            {...pageSideBarProps}>
            {pageSideBar}
          </OuiPageSideBar>

          <OuiPageBody panelled paddingSize={paddingSize} {...pageBodyProps}>
            {pageHeader && (
              <OuiPageHeader restrictWidth={restrictWidth} {...pageHeader} />
            )}
            <OuiPageContent
              verticalPosition="center"
              horizontalPosition="center"
              hasShadow={false}
              color="subdued"
              paddingSize={paddingSize}
              {...pageContentProps}>
              <OuiPageContentBody
                restrictWidth={restrictWidth}
                {...pageContentBodyProps}>
                {children}
              </OuiPageContentBody>
            </OuiPageContent>
          </OuiPageBody>
        </OuiPage>
      ) : (
        <OuiPage
          className={classes}
          paddingSize="none"
          grow={grow}
          {...rest}
          style={pageStyle}>
          <OuiPageBody {...pageBodyProps}>
            {pageHeader && (
              <OuiPageHeader
                paddingSize={paddingSize}
                restrictWidth={restrictWidth}
                {...pageHeader}
              />
            )}
            {/* Extra page content to get the correct alignment and padding of the centered OuiPageContent */}
            <OuiPageContent
              role={null}
              borderRadius="none"
              hasShadow={false}
              paddingSize={paddingSize}
              style={{ display: 'flex' }}>
              <OuiPageContent
                verticalPosition="center"
                horizontalPosition="center"
                hasShadow={false}
                color="subdued"
                paddingSize={paddingSize}
                {...pageContentProps}>
                <OuiPageContentBody
                  restrictWidth={restrictWidth}
                  {...pageContentBodyProps}>
                  {children}
                </OuiPageContentBody>
              </OuiPageContent>
            </OuiPageContent>
          </OuiPageBody>
        </OuiPage>
      );

    /**
     * EMPTY
     * No panelling at all
     */
    case 'empty':
      return pageSideBar ? (
        <OuiPage
          className={classes}
          paddingSize="none"
          grow={grow}
          {...rest}
          style={pageStyle}>
          <OuiPageSideBar
            sticky
            paddingSize={paddingSize}
            {...pageSideBarProps}>
            {pageSideBar}
          </OuiPageSideBar>

          <OuiPageBody paddingSize={paddingSize} {...pageBodyProps}>
            {pageHeader && (
              <OuiPageHeader restrictWidth={restrictWidth} {...pageHeader} />
            )}
            <OuiPageContent
              hasBorder={false}
              hasShadow={false}
              paddingSize={'none'}
              color={'transparent'}
              borderRadius={'none'}
              {...pageContentProps}>
              <OuiPageContentBody
                restrictWidth={restrictWidth}
                {...pageContentBodyProps}>
                {children}
              </OuiPageContentBody>
            </OuiPageContent>
          </OuiPageBody>
        </OuiPage>
      ) : (
        <OuiPage
          className={classes}
          paddingSize={paddingSize}
          grow={grow}
          {...rest}
          style={pageStyle}>
          <OuiPageBody restrictWidth={restrictWidth} {...pageBodyProps}>
            {pageHeader && (
              <OuiPageHeader
                paddingSize="none"
                restrictWidth={false}
                bottomBorder
                {...pageHeader}
              />
            )}
            <OuiPageContent
              hasBorder={false}
              hasShadow={false}
              paddingSize={'none'}
              color={'transparent'}
              borderRadius={'none'}
              {...pageContentProps}>
              <OuiPageContentBody paddingSize="none" {...pageContentBodyProps}>
                {children}
              </OuiPageContentBody>
            </OuiPageContent>
          </OuiPageBody>
        </OuiPage>
      );

    /**
     * DEFAULT
     * Typical layout with nothing "centered"
     */
    default:
      // Only the default template can display a bottom bar
      const bottomBarNode = bottomBar ? (
        <OuiBottomBar
          paddingSize={paddingSize}
          position={canFullHeight && fullHeight ? 'static' : 'sticky'}
          // Using uknown here because of the possible conflict with overriding props and position `sticky`
          {...(bottomBarProps as unknown)}>
          {/* Wrapping the contents with OuiPageContentBody allows us to match the restrictWidth to keep the contents aligned */}
          <OuiPageContentBody
            paddingSize={'none'}
            restrictWidth={restrictWidth}>
            {bottomBar}
          </OuiPageContentBody>
        </OuiBottomBar>
      ) : undefined;

      return pageSideBar ? (
        <OuiPage
          className={classes}
          paddingSize="none"
          grow={grow}
          {...rest}
          style={pageStyle}>
          <OuiPageSideBar
            sticky
            paddingSize={paddingSize}
            {...pageSideBarProps}>
            {pageSideBar}
          </OuiPageSideBar>

          {/* The extra PageBody is to accommodate the bottom bar stretching to both sides */}
          <OuiPageBody panelled paddingSize="none" {...pageBodyProps}>
            <OuiPageBody
              component="div"
              paddingSize={paddingSize}
              className={pageBodyProps?.className}>
              {pageHeader && (
                <OuiPageHeader
                  bottomBorder
                  restrictWidth={restrictWidth}
                  {...pageHeader}
                />
              )}
              <OuiPageContent
                hasShadow={false}
                hasBorder={false}
                color={'transparent'}
                borderRadius={'none'}
                paddingSize="none"
                {...pageContentProps}>
                <OuiPageContentBody
                  restrictWidth={restrictWidth}
                  {...pageContentBodyProps}>
                  {children}
                </OuiPageContentBody>
              </OuiPageContent>
            </OuiPageBody>
            {bottomBarNode}
          </OuiPageBody>
        </OuiPage>
      ) : (
        <OuiPage
          className={classes}
          paddingSize="none"
          grow={grow}
          {...rest}
          style={pageStyle}>
          <OuiPageBody {...pageBodyProps}>
            {pageHeader && (
              <OuiPageHeader
                restrictWidth={restrictWidth}
                paddingSize={paddingSize}
                {...pageHeader}
              />
            )}
            <OuiPageContent
              hasBorder={pageHeader === undefined ? false : undefined}
              hasShadow={false}
              paddingSize={'none'}
              color={'plain'}
              borderRadius={'none'}
              {...pageContentProps}>
              <OuiPageContentBody
                restrictWidth={restrictWidth}
                paddingSize={paddingSize}
                {...pageContentBodyProps}>
                {children}
              </OuiPageContentBody>
            </OuiPageContent>
            {bottomBarNode}
          </OuiPageBody>
        </OuiPage>
      );
  }
};
