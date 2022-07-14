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
  OuiIcon,
  OuiTabs,
  OuiTab,
  OuiSpacer,
  OuiTitle,
} from '../../../../src/components';

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
  {
    id: 'elastic_link',
    name: 'Elastic Website',
    disabled: false,
    href: 'https://www.elastic.co/',
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
        {...(tab.href && { href: tab.href, target: '_blank' })}
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
        disabled={tab.disabled}
        key={index}>
        {tab.name}
      </OuiTab>
    ));
  };

  return (
    <Fragment>
      <OuiTitle size="xxs">
        <span>Small</span>
      </OuiTitle>
      <OuiTabs size="s">{renderTabs()}</OuiTabs>

      <OuiSpacer />
      <OuiTitle size="xxs">
        <span>Medium (default)</span>
      </OuiTitle>

      <OuiTabs>{renderTabs()}</OuiTabs>

      <OuiSpacer />
      <OuiTitle size="xxs">
        <span>Large</span>
      </OuiTitle>

      <OuiTabs size="l">{renderTabs()}</OuiTabs>
    </Fragment>
  );
};
