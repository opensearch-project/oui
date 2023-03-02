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
  dashboard: {
    title: 'Dashboards',
    icon: 'dashboardApp',
    betaBadgeLabel: null,
    betaBadgeTooltipContent: undefined,
  },
  monitoring: {
    title: 'Discover',
    icon: 'discoverApp',
    betaBadgeLabel: 'Experimental',
    betaBadgeTooltipContent:
      'This module is not GA. Please help us by reporting any bugs.',
  },
};

const cardNodes = Object.keys(cards).map(function (item, index) {
  const { title, icon, betaBadgeLabel, betaBadgeTooltipContent } = cards[item];
  return (
    <OuiFlexItem key={index}>
      <OuiCard
        icon={<OuiIcon size="xxl" type={icon} />}
        title={title}
        description="Example of a card's description. Stick to one or two sentences."
        betaBadgeLabel={betaBadgeLabel}
        betaBadgeTooltipContent={betaBadgeTooltipContent}
        onClick={() => {}}
      />
    </OuiFlexItem>
  );
});

export default () => <OuiFlexGroup gutterSize="l">{cardNodes}</OuiFlexGroup>;
