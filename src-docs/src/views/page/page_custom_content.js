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
  OuiPageHeader,
  OuiButton,
  OuiPageContentBody,
  OuiPageBody,
  OuiFlexGrid,
  OuiFlexItem,
  OuiPanel,
} from '../../../../src/components';

export default ({ button = <></> }) => (
  <OuiPage paddingSize="l">
    <OuiPageBody>
      <OuiPageHeader
        pageTitle="Page title"
        rightSideItems={[button, <OuiButton>Do something</OuiButton>]}
        bottomBorder
      />
      <OuiPageContentBody>
        <OuiFlexGrid columns={2}>
          <OuiFlexItem>
            <OuiPanel style={{ height: 200 }} />
          </OuiFlexItem>
          <OuiFlexItem>
            <OuiPanel style={{ height: 200 }} />
          </OuiFlexItem>
          <OuiFlexItem>
            <OuiPanel style={{ height: 200 }} />
          </OuiFlexItem>
          <OuiFlexItem>
            <OuiPanel style={{ height: 200 }} />
          </OuiFlexItem>
        </OuiFlexGrid>
      </OuiPageContentBody>
    </OuiPageBody>
  </OuiPage>
);
