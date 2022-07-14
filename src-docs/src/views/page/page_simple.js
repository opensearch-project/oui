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
  OuiPageHeader,
  OuiPageBody,
  OuiPageContentBody,
} from '../../../../src/components';

export default ({ button = <></>, content }) => (
  <OuiPage paddingSize="none">
    <OuiPageBody>
      <OuiPageHeader
        restrictWidth
        paddingSize="l"
        pageTitle="Page title"
        rightSideItems={[button]}
        tabs={[{ label: 'Tab 1', isSelected: true }, { label: 'Tab 2' }]}
      />
      <OuiPageContent borderRadius="none" hasShadow={false} paddingSize="none">
        <OuiPageContentBody restrictWidth paddingSize="l">
          {content}
        </OuiPageContentBody>
      </OuiPageContent>
    </OuiPageBody>
  </OuiPage>
);
