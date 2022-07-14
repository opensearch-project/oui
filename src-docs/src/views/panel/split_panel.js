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
  OuiSpacer,
  OuiFlexGroup,
  OuiFlexItem,
  OuiSplitPanel,
  OuiText,
  OuiCode,
} from '../../../../src/components';

export default () => (
  <>
    <OuiFlexGroup gutterSize="l">
      <OuiFlexItem>
        <OuiSplitPanel.Outer grow>
          <OuiSplitPanel.Inner>
            <OuiText>
              <p>Top panel</p>
            </OuiText>
          </OuiSplitPanel.Inner>
          <OuiSplitPanel.Inner grow={false} color="subdued">
            <OuiText>
              <p>
                Bottom panel has <OuiCode>{'grow={false}'}</OuiCode>
              </p>
            </OuiText>
          </OuiSplitPanel.Inner>
        </OuiSplitPanel.Outer>
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiSplitPanel.Outer grow={false}>
          <OuiSplitPanel.Inner>
            <OuiText>
              <p>
                Outer panel has <OuiCode>{'grow={false}'}</OuiCode>
              </p>
            </OuiText>
          </OuiSplitPanel.Inner>
          <OuiSplitPanel.Inner grow={false} color="subdued">
            <OuiText>
              <p>Bottom panel</p>
            </OuiText>
          </OuiSplitPanel.Inner>
        </OuiSplitPanel.Outer>
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiSplitPanel.Outer>
          <OuiSplitPanel.Inner>
            <OuiText>
              <p>Top panel</p>
            </OuiText>
          </OuiSplitPanel.Inner>
          <OuiSplitPanel.Inner color="subdued">
            <OuiText>
              <p>Middle panel</p>
            </OuiText>
          </OuiSplitPanel.Inner>
          <OuiSplitPanel.Inner color="danger">
            <OuiText>
              <p>Danger panel</p>
            </OuiText>
          </OuiSplitPanel.Inner>
        </OuiSplitPanel.Outer>
      </OuiFlexItem>
    </OuiFlexGroup>
    <OuiSpacer />
    <OuiSplitPanel.Outer direction="row">
      <OuiSplitPanel.Inner>
        <OuiText>
          <p>Left panel</p>
          <p>Has more content</p>
        </OuiText>
      </OuiSplitPanel.Inner>
      <OuiSplitPanel.Inner color="subdued">
        <OuiText>
          <p>Right panel</p>
        </OuiText>
      </OuiSplitPanel.Inner>
    </OuiSplitPanel.Outer>
  </>
);
