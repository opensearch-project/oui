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
  OuiEmptyPrompt,
  OuiPageHeader,
  OuiPageSideBar,
  OuiPageBody,
} from '../../../../src/components';

export default ({ button = <></>, content, sideNav }) => (
  <OuiPage paddingSize="none">
    <OuiPageSideBar paddingSize="l" sticky>
      {sideNav}
    </OuiPageSideBar>

    <OuiPageBody>
      <OuiPageHeader
        restrictWidth
        pageTitle="Page title"
        rightSideItems={[button]}
      />

      <OuiPageContent
        verticalPosition="center"
        horizontalPosition="center"
        paddingSize="none"
        color="subdued"
        hasShadow={false}>
        <OuiEmptyPrompt title={<span>No spice</span>} body={content} />
      </OuiPageContent>
    </OuiPageBody>
  </OuiPage>
);
