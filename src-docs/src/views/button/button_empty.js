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
  OuiButtonEmpty,
  OuiFlexGroup,
  OuiFlexItem,
} from '../../../../src/components/';

const buttons = ['primary', 'success', 'warning', 'danger', 'text', 'disabled'];

export default () => (
  <div>
    {buttons.map((value) => (
      <React.Fragment key={value}>
        <OuiFlexGroup gutterSize="s" key={value} alignItems="center">
          <OuiFlexItem grow={false}>
            <OuiButtonEmpty
              style={{
                textTransform: 'capitalize',
              }}
              isDisabled={value === 'disabled' ? true : false}
              color={value !== 'disabled' ? value : 'primary'}
              onClick={() => {}}>
              {value}
            </OuiButtonEmpty>
          </OuiFlexItem>

          <OuiFlexItem grow={false}>
            <OuiButtonEmpty
              isDisabled={value === 'disabled' ? true : false}
              color={value !== 'disabled' ? value : 'primary'}
              size="s"
              onClick={() => {}}>
              small
            </OuiButtonEmpty>
          </OuiFlexItem>

          <OuiFlexItem grow={false}>
            <OuiButtonEmpty
              isDisabled={value === 'disabled' ? true : false}
              color={value !== 'disabled' ? value : 'primary'}
              size="xs"
              onClick={() => {}}>
              extra small
            </OuiButtonEmpty>
          </OuiFlexItem>
        </OuiFlexGroup>
      </React.Fragment>
    ))}

    <OuiFlexGroup gutterSize="s" alignItems="center">
      <OuiFlexItem grow={false}>
        <OuiButtonEmpty onClick={() => {}} iconType="arrowDown">
          Primary with icon left
        </OuiButtonEmpty>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButtonEmpty
          onClick={() => {}}
          iconType="arrowDown"
          iconSide="right"
          size="xs">
          Extra small with icon right
        </OuiButtonEmpty>
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiFlexGroup gutterSize="s" alignItems="center">
      <OuiFlexItem grow={false}>
        <OuiButtonEmpty color="text" onClick={() => {}} iconType="dashboardApp">
          Text with app icon left
        </OuiButtonEmpty>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButtonEmpty
          color="text"
          onClick={() => {}}
          iconType="dashboardApp"
          iconSide="right"
          size="xs">
          Extra small with app icon right
        </OuiButtonEmpty>
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiFlexGroup gutterSize="s" alignItems="center">
      <OuiFlexItem grow={false}>
        <OuiButtonEmpty onClick={() => {}} isLoading>
          Loading
        </OuiButtonEmpty>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButtonEmpty onClick={() => {}} isLoading iconSide="right">
          Loading
        </OuiButtonEmpty>
      </OuiFlexItem>
    </OuiFlexGroup>
  </div>
);
