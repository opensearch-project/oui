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

import React, { Fragment, useState } from 'react';

import {
  OuiBadge,
  OuiFlexItem,
  OuiFlexGroup,
  OuiSpacer,
  OuiSwitch,
  OuiText,
  OuiTitle,
} from '../../../../src/components';

const badges = [
  'default',
  'hollow',
  'primary',
  'success',
  'accent',
  'warning',
  'danger',
];

const customBadges = [
  '#DDD',
  '#AAA',
  '#666',
  '#333',
  '#BADA55',
  '#FCF7BC',
  '#FEA27F',
  '#FFA500',
  '#0000FF',
];

export default () => {
  const [isDisabled, setDisabled] = useState(false);

  return (
    <Fragment>
      <OuiTitle size="xs">
        <h2>Accepted color names</h2>
      </OuiTitle>
      <OuiSpacer size="m" />
      <OuiFlexGroup wrap responsive={false} gutterSize="xs">
        {badges.map((badge) => (
          <OuiFlexItem grow={false} key={badge}>
            <OuiBadge color={badge}>{badge}</OuiBadge>
          </OuiFlexItem>
        ))}
      </OuiFlexGroup>
      <OuiSpacer />
      <OuiTitle size="xs">
        <h3>Custom color examples</h3>
      </OuiTitle>
      <OuiSpacer size="m" />
      <OuiFlexGroup
        wrap
        responsive={false}
        gutterSize="xs"
        style={{ maxWidth: '300px' }}>
        {customBadges.map((badge) => (
          <OuiFlexItem grow={false} key={badge}>
            <OuiBadge color={badge}>{badge}</OuiBadge>
          </OuiFlexItem>
        ))}
      </OuiFlexGroup>
      <OuiSpacer />
      <OuiTitle size="xs">
        <h3>Disabled state</h3>
      </OuiTitle>
      <OuiSpacer size="m" />
      <OuiText size="s">
        Regardless of the assigned color, all badges use the same disabled state
        styles.
      </OuiText>
      <OuiSpacer size="m" />
      <OuiSwitch
        label="Show disabled state"
        checked={isDisabled}
        onChange={(e) => setDisabled(e.target.checked)}
      />
      <OuiSpacer size="m" />
      <OuiFlexGroup wrap responsive={false} gutterSize="xs">
        <OuiFlexItem grow={false}>
          <OuiBadge color="success" isDisabled={isDisabled}>
            {isDisabled ? 'Disabled badge' : 'Disable me!'}
          </OuiBadge>
        </OuiFlexItem>
      </OuiFlexGroup>
    </Fragment>
  );
};
