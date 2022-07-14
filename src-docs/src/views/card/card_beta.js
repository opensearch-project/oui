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

const icons = ['dashboard', 'monitoring'];
const badges = [null, 'Beta'];

const cardNodes = icons.map(function (item, index) {
  return (
    <OuiFlexItem key={index}>
      <OuiCard
        icon={<OuiIcon size="xxl" type={`${item}App`} />}
        title={`Kibana ${item}`}
        description="Example of a card's description. Stick to one or two sentences."
        betaBadgeLabel={badges[index]}
        betaBadgeTooltipContent={
          badges[index]
            ? 'This module is not GA. Please help us by reporting any bugs.'
            : undefined
        }
        onClick={() => {}}
      />
    </OuiFlexItem>
  );
});

export default () => (
  <OuiFlexGroup gutterSize="l">
    {cardNodes}
    <OuiFlexItem>
      <OuiCard
        icon={<OuiIcon size="xxl" type="lensApp" />}
        title="Lens"
        isDisabled
        description="Disabled cards can have active links using OuiBetaBadge."
        betaBadgeProps={{
          href: 'http://www.elastic.co/subscriptions',
          target: '_blank',
        }}
        betaBadgeLabel="Basic"
        betaBadgeTooltipContent="This feature requires a Basic License"
        onClick={() => {}}
      />
    </OuiFlexItem>
  </OuiFlexGroup>
);
