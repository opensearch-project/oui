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
  OuiPanel,
  OuiFlexGroup,
  OuiFlexItem,
  OuiText,
} from '../../../../src/components';

export default () => (
  <OuiFlexGroup gutterSize="l">
    <OuiFlexItem>
      <OuiPanel>
        <OuiText>
          <p>
            I am some panel content...
            <br /> ... <br /> ... <br />
            whose content is tall
          </p>
        </OuiText>
      </OuiPanel>
    </OuiFlexItem>
    <OuiFlexItem>
      <OuiPanel grow={true}>
        <OuiText>
          <p>I am some panel content... whose content will grow</p>
        </OuiText>
      </OuiPanel>
    </OuiFlexItem>
    <OuiFlexItem>
      <OuiPanel grow={false}>
        <OuiText>
          <p>I am some panel content... whose content did not grow</p>
        </OuiText>
      </OuiPanel>
    </OuiFlexItem>
  </OuiFlexGroup>
);
