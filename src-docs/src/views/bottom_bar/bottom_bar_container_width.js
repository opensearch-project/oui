/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

import {
  OuiBottomBar,
  OuiButton,
  OuiFlexGroup,
  OuiFlexItem,
} from '../../../../src/components';

export default () => {
  const [isBottomBarVisible, setBottomBarVisibility] = useState(null);

  return (
    <div>
      <OuiButton
        buttonSize="m"
        color="primary"
        onClick={() => setBottomBarVisibility((prevVal) => !prevVal)}>
        {isBottomBarVisible ? 'Hide' : 'Show'} bottom bar
      </OuiButton>

      {isBottomBarVisible && (
        <OuiBottomBar left="unset" containerElementId="page-main-section">
          <OuiFlexGroup justifyContent="flexEnd">
            <OuiFlexItem grow={false}>
              <OuiButton
                onClick={() => setBottomBarVisibility(false)}
                color="ghost"
                size="s"
                iconType="cross">
                Close
              </OuiButton>
            </OuiFlexItem>
          </OuiFlexGroup>
        </OuiBottomBar>
      )}
    </div>
  );
};
