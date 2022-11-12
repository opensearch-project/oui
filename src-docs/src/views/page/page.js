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
  OuiPageBody,
  OuiPageContent,
  OuiPageContentBody,
  OuiPageHeader,
  OuiPageSideBar,
  OuiTitle,
  OuiButton,
  OuiSpacer,
} from '../../../../src/components';

export default () => (
  <OuiPage>
    <OuiPageSideBar>SideBar nav</OuiPageSideBar>
    <OuiPageBody>
      <OuiPageHeader
        iconType="logoOUI"
        pageTitle="Page title"
        rightSideItems={[
          <OuiButton fill>Add something</OuiButton>,
          <OuiButton>Do something</OuiButton>,
        ]}
      />
      <OuiPageContent>
        <OuiTitle>
          <h2>Content title</h2>
        </OuiTitle>
        <OuiSpacer />
        <OuiPageContentBody>Content body</OuiPageContentBody>
      </OuiPageContent>
    </OuiPageBody>
  </OuiPage>
);
