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

import React from 'react';

import {
  OuiPage,
  OuiPageContent,
  OuiPageContentBody,
  OuiPageHeader,
  OuiPageSideBar,
  OuiPageBody,
  OuiBottomBar,
} from '../../../../src/components';

export default ({ button = <></>, content, sideNav, bottomBar }) => {
  return (
    <OuiPage paddingSize="none">
      <OuiPageSideBar paddingSize="l" sticky>
        {sideNav}
      </OuiPageSideBar>

      {/* Double OuiPageBody to accommodate for the bottom bar */}
      <OuiPageBody panelled paddingSize="none">
        <OuiPageBody paddingSize="l">
          <OuiPageHeader
            bottomBorder
            restrictWidth
            pageTitle="Page title"
            rightSideItems={[button]}
          />
          <OuiPageContent
            hasBorder={false}
            hasShadow={false}
            paddingSize="none"
            color="transparent"
            borderRadius="none">
            <OuiPageContentBody restrictWidth>{content}</OuiPageContentBody>
          </OuiPageContent>
        </OuiPageBody>
        <OuiBottomBar paddingSize="l" position="sticky">
          {/* Wrapping the contents with OuiPageContentBody allows us to match the restrictWidth to keep the contents aligned */}
          <OuiPageContentBody paddingSize={'none'} restrictWidth>
            {bottomBar}
          </OuiPageContentBody>
        </OuiBottomBar>
      </OuiPageBody>
    </OuiPage>
  );
};
