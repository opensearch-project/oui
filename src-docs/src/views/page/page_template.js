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

import React, { useState } from 'react';

import { OuiPageTemplate } from '../../../../src/components';

export default ({ button = <></>, content, sideNav }) => {
  const [showBottomBar, setshowBottomBar] = useState(false);

  return (
    <OuiPageTemplate
      pageSideBar={sideNav}
      bottomBar={showBottomBar ? 'Bottom bar' : undefined}
      pageHeader={{
        pageTitle: 'Page title',
        rightSideItems: [button],
        tabs: [
          { label: 'Tab 1', isSelected: true },
          {
            label: 'Tab 2',
            onClick: () => setshowBottomBar((showing) => !showing),
          },
        ],
      }}>
      {content}
    </OuiPageTemplate>
  );
};
