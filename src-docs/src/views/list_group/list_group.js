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

import React, { useState, Fragment } from 'react';

import {
  OuiListGroup,
  OuiListGroupItem,
  OuiSpacer,
  OuiSwitch,
  OuiCode,
  OuiFlexGroup,
  OuiFlexItem,
} from '../../../../src/components';

export default () => {
  const [flushWidth, setFlushWidth] = useState(false);
  const [showBorder, setShowBorder] = useState(false);

  return (
    <Fragment>
      <OuiFlexGroup alignItems="center">
        <OuiFlexItem grow={false}>
          <OuiSwitch
            label={
              <span>
                Show as <OuiCode>flush</OuiCode>
              </span>
            }
            checked={flushWidth}
            onChange={() => setFlushWidth(!flushWidth)}
          />
        </OuiFlexItem>
        <OuiFlexItem grow={false}>
          <OuiSwitch
            label={
              <span>
                Show as <OuiCode>bordered</OuiCode>
              </span>
            }
            checked={showBorder}
            onChange={() => {
              setShowBorder(!showBorder);
            }}
          />
        </OuiFlexItem>
      </OuiFlexGroup>

      <OuiSpacer size="l" />

      <OuiListGroup flush={flushWidth} bordered={showBorder}>
        <OuiListGroupItem onClick={() => {}} label="First item" />

        <OuiListGroupItem onClick={() => {}} label="Second item" />

        <OuiListGroupItem onClick={() => {}} label="Third item" isActive />

        <OuiListGroupItem onClick={() => {}} label="Fourth item" isDisabled />
      </OuiListGroup>
    </Fragment>
  );
};
