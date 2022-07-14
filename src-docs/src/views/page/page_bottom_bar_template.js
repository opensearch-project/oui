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

import { OuiPageTemplate } from '../../../../src/components';

export default ({ button = <></>, content, sideNav, bottomBar }) => {
  return (
    <OuiPageTemplate
      pageSideBar={sideNav}
      pageHeader={{
        iconType: 'logoElastic',
        pageTitle: 'Page title',
        rightSideItems: [button],
      }}
      bottomBar={bottomBar}>
      {content}
    </OuiPageTemplate>
  );
};
