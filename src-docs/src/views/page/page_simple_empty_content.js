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
  OuiPageBody,
} from '../../../../src/components';

export default ({ button = <></>, content }) => (
  <OuiPage paddingSize="none">
    <OuiPageBody>
      <OuiPageHeader
        restrictWidth
        iconType="logoOUI"
        pageTitle="Page title"
        rightSideItems={[button]}
        paddingSize="l"
      />
      <OuiPageContent
        borderRadius="none"
        hasShadow={false}
        style={{ display: 'flex' }}>
        <OuiPageContent
          verticalPosition="center"
          horizontalPosition="center"
          paddingSize="none"
          color="subdued"
          hasShadow={false}>
          <OuiEmptyPrompt title={<span>No spice</span>} body={content} />
        </OuiPageContent>
      </OuiPageContent>
    </OuiPageBody>
  </OuiPage>
);
