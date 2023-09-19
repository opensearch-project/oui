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
  OuiPageHeader,
  OuiCode,
  OuiText,
  OuiButton,
} from '../../../../src/components';

export default () => (
  <OuiPageHeader
    pageTitle="Page title"
    tabs={[
      {
        label: 'Tab 1',
        isSelected: true,
      },
      {
        label: 'Tab 2',
      },
    ]}
    description="This description should be describing the current page as depicted by the page title. It has the grow prop set to false on the OuiText block so that it is the proper line length. And it will also never extend beneath the right side content (buttons)."
    rightSideItems={[
      <OuiButton fill>Add something</OuiButton>,
      <OuiButton>Do something</OuiButton>,
    ]}>
    <OuiText>
      <p>
        This custom content (children), on the other hand, exists below the
        content above including below the right side content and therefore will
        stretch beneath them. Unless you set the <OuiCode>alignItems</OuiCode>{' '}
        prop to something other than <OuiCode>top</OuiCode>.
      </p>
    </OuiText>
  </OuiPageHeader>
);
