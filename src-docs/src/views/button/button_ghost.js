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
  OuiButton,
  OuiButtonEmpty,
  OuiButtonIcon,
  OuiFlexGroup,
  OuiFlexItem,
} from '../../../../src/components';

export default () => {
  const [toggle0On, setToggle0On] = useState(false);

  const onToggle0Change = () => {
    setToggle0On((isOn) => !isOn);
  };

  return (
    <OuiFlexGroup wrap gutterSize="s" alignItems="center">
      <OuiFlexItem grow={false}>
        <OuiButton color="ghost" onClick={() => {}}>
          Ghost
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton
          fill
          color="ghost"
          size="s"
          iconType="check"
          onClick={() => {}}>
          Filled
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButtonEmpty size="s" color="ghost" onClick={() => {}}>
          small
        </OuiButtonEmpty>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButtonIcon
          size="s"
          color="ghost"
          iconType="user"
          onClick={() => {}}
          aria-label="Your account"
        />
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton color="ghost" isLoading fill size="s">
          Loading&hellip;
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton color="ghost" isLoading>
          Loading&hellip;
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton
          color="ghost"
          isSelected={toggle0On}
          fill={toggle0On}
          onClick={onToggle0Change}>
          Toggle
        </OuiButton>
      </OuiFlexItem>
    </OuiFlexGroup>
  );
};
