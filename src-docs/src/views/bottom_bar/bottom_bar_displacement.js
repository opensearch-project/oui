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
  OuiButtonGroup,
  OuiButton,
  OuiFlexGroup,
  OuiFlexItem,
} from '../../../../src/components';

export default () => {
  const [toggleIdSelected, setToggleIdSelected] = useState(null);

  const toggleButtons = [
    {
      id: 'bottomBarStandard',
      label: 'Show bottom bar',
    },
    {
      id: 'bottomBarWithoutAffordForDisplacement',
      label: 'Show bottom bar (without affordForDisplacement behavior)',
    },
  ];

  const onChange = (optionId) => {
    setToggleIdSelected(optionId);
  };

  return (
    <div>
      <OuiButtonGroup
        legend="Bottom Bar demo toggle buttons group"
        type="single"
        buttonSize="m"
        color="primary"
        options={toggleButtons}
        idSelected={toggleIdSelected}
        onChange={(id) => onChange(id)}
      />

      {toggleIdSelected && (
        <OuiBottomBar
          affordForDisplacement={toggleIdSelected === 'bottomBarStandard'}>
          <OuiFlexGroup justifyContent="flexEnd">
            <OuiFlexItem grow={false}>
              <OuiButton
                onClick={() => setToggleIdSelected(null)}
                color="ghost"
                size="s"
                iconType="cross">
                close
              </OuiButton>
            </OuiFlexItem>
          </OuiFlexGroup>
        </OuiBottomBar>
      )}
    </div>
  );
};
