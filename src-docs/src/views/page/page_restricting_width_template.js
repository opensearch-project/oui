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

export default ({ button = <></>, content, sideNav }) => {
  return (
    <OuiPageTemplate
      pageSideBar={sideNav}
      restrictWidth="75%"
      pageHeader={{
        iconType: 'logoOUI',
        pageTitle: 'Page title',
        rightSideItems: [button],
        description: 'Restricting the width to 75%.',
      }}>
      {content}
    </OuiPageTemplate>
  );
};
