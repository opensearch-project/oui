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

import { OuiPageTemplate, OuiEmptyPrompt } from '../../../../src/components';

export default ({ button = <></>, content, sideNav }) => (
  <OuiPageTemplate
    template="centeredContent"
    pageContentProps={{ paddingSize: 'none' }}
    pageSideBar={sideNav}
    pageHeader={{
      iconType: 'logoOUI',
      pageTitle: 'Page title',
      rightSideItems: [button],
    }}>
    <OuiEmptyPrompt title={<span>No spice</span>} body={content} />
  </OuiPageTemplate>
);
