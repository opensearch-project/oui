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

import {
  OuiBottomBar,
  OuiFlexGroup,
  OuiFlexItem,
  OuiButton,
  OuiButtonEmpty,
} from '../../../../src/components';

export default () => {
  const [showBar, setShowBar] = useState(false);

  const button = (
    <OuiButton color="primary" onClick={() => setShowBar((show) => !show)}>
      Toggle appearance of the bottom bar
    </OuiButton>
  );

  let bottomBar;
  if (showBar) {
    bottomBar = (
      <OuiBottomBar>
        <OuiFlexGroup justifyContent="spaceBetween">
          <OuiFlexItem grow={false}>
            <OuiFlexGroup gutterSize="s">
              <OuiFlexItem grow={false}>
                <OuiButton color="ghost" size="s" iconType="help">
                  Help
                </OuiButton>
              </OuiFlexItem>
              <OuiFlexItem grow={false}>
                <OuiButton color="ghost" size="s" iconType="user">
                  Add user
                </OuiButton>
              </OuiFlexItem>
            </OuiFlexGroup>
          </OuiFlexItem>
          <OuiFlexItem grow={false}>
            <OuiFlexGroup gutterSize="s">
              <OuiFlexItem grow={false}>
                <OuiButtonEmpty color="ghost" size="s" iconType="cross">
                  Discard
                </OuiButtonEmpty>
              </OuiFlexItem>
              <OuiFlexItem grow={false}>
                <OuiButton color="primary" fill size="s" iconType="check">
                  Save
                </OuiButton>
              </OuiFlexItem>
            </OuiFlexGroup>
          </OuiFlexItem>
        </OuiFlexGroup>
      </OuiBottomBar>
    );
  }

  return (
    <div>
      {button}
      {bottomBar}
    </div>
  );
};
