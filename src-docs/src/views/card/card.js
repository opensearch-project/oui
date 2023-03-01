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
  OuiCard,
  OuiIcon,
  OuiFlexGroup,
  OuiFlexItem,
} from '../../../../src/components';

const cards = {
  Dashboards: {
    title: 'Dashboards',
    iconType: 'dashboardApp',
  },
  Cloud: {
    title: 'Visualize',
    iconType: 'visualizeApp',
  },
  Logging: {
    title: 'Discover',
    iconType: 'discoverApp',
  },
  Search: {
    title: 'Search',
    iconType: 'search',
  },
};

const cardNodes = Object.keys(cards).map(function (item, index) {
  return (
    <OuiFlexItem key={index}>
      <OuiCard
        icon={<OuiIcon size="xxl" type={cards[item].iconType} />}
        title={cards[item].title}
        isDisabled={item === 'Search' ? true : false}
        description="Example of a card's description. Stick to one or two sentences."
        onClick={() => {}}
      />
    </OuiFlexItem>
  );
});

export default () => <OuiFlexGroup gutterSize="l">{cardNodes}</OuiFlexGroup>;
