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
  OuiPageBody,
  OuiPageContentBody,
  OuiFlexGroup,
  OuiFlexItem,
  OuiPanel,
  OuiSpacer,
} from '../../../../src/components';

export default ({ button = <></>, content }) => (
  <OuiPage paddingSize="none" className="oui-fullHeight">
    <OuiPageBody className="oui-fullHeight">
      <OuiPageContent
        color="transparent"
        borderRadius="none"
        hasShadow={false}
        paddingSize="none"
        className="oui-fullHeight">
        <OuiPageContentBody
          restrictWidth
          paddingSize="l"
          className="oui-fullHeight">
          <OuiFlexGroup
            className="oui-fullHeight"
            gutterSize="none"
            direction="column"
            responsive={false}>
            <OuiFlexItem grow={false}>
              <OuiPanel color="danger" />
            </OuiFlexItem>
            <OuiSpacer size="l" />
            <OuiFlexItem className="oui-fullHeight">
              <OuiFlexGroup className="oui-fullHeight" gutterSize="l">
                <OuiFlexItem grow={2}>
                  <OuiPanel
                    tabIndex={0}
                    className="oui-yScroll"
                    hasShadow={false}>
                    {content}
                  </OuiPanel>
                </OuiFlexItem>
                <OuiFlexItem>
                  <OuiPanel hasShadow={false} />
                  <OuiSpacer />
                  {button}
                </OuiFlexItem>
              </OuiFlexGroup>
            </OuiFlexItem>
          </OuiFlexGroup>
        </OuiPageContentBody>
      </OuiPageContent>
    </OuiPageBody>
  </OuiPage>
);
