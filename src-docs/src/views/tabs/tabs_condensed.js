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

import { OuiIcon, OuiTabs, OuiTab } from '../../../../src/components';

const tabs = [
  {
    id: 'cobalt',
    name: 'Cobalt',
    disabled: false,
  },
  {
    id: 'dextrose',
    name: 'Dextrose',
    disabled: false,
  },
  {
    id: 'hydrogen',
    name: (
      <span>
        <OuiIcon type="heatmap" />
        &nbsp;Hydrogen
      </span>
    ),
    disabled: true,
  },
  {
    id: 'monosodium_glutammate',
    name: 'Monosodium Glutamate',
    disabled: false,
  },
];

export default () => {
  const [selectedTabId, setSelectedTabId] = useState('cobalt');

  const onSelectedTabChanged = (id) => {
    setSelectedTabId(id);
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <OuiTab
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
        disabled={tab.disabled}
        key={index}>
        {tab.name}
      </OuiTab>
    ));
  };

  return <OuiTabs display="condensed">{renderTabs()}</OuiTabs>;
};
