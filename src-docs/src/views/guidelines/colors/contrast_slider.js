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
  OuiFlexGroup,
  OuiFlexItem,
  OuiFormRow,
  OuiRange,
  OuiToolTip,
  OuiIcon,
  OuiSwitch,
  OuiSpacer,
  OuiPanel,
} from '../../../../../src/components';
import { ratingAAA, ratingAA18, ratingAA, ratingAll } from './_utilities';

export const ContrastSlider = ({
  contrastValue,
  showTextVariants,
  onChange,
  ...rest
}) => {
  const [value, setValue] = useState(contrastValue);
  const [checked, setChecked] = useState(showTextVariants);
  const ticks = [
    {
      value: 0,
      label: (
        <OuiToolTip
          position="bottom"
          content={
            <ul>
              <li>
                <OuiIcon type="minusInCircle" /> Contrast is between 2 and 3.
                Use only for disabled or inconsequential content.
              </li>
              <li>
                <OuiIcon type="cross" /> Contrast is less than 2. Do not use.
              </li>
            </ul>
          }>
          {ratingAll}
        </OuiToolTip>
      ),
    },
    {
      value: 3,
      label: (
        <OuiToolTip
          position="bottom"
          content={
            <p>
              <OuiIcon type="partial" /> Partially passes with a contrast of 3+,
              but only for graphics or if the text is at least 18px, or 14px and
              bold
            </p>
          }>
          {ratingAA18}
        </OuiToolTip>
      ),
    },
    {
      value: 4.5,
      label: (
        <OuiToolTip
          position="bottom"
          content={
            <p>
              <OuiIcon type="checkInCircleFilled" /> Passes with a contrast of
              4.5+
            </p>
          }>
          {ratingAA}
        </OuiToolTip>
      ),
    },
    {
      value: 7,
      label: (
        <OuiToolTip
          position="bottom"
          content={
            <p>
              <OuiIcon type="checkInCircleFilled" /> Passes with a contrast of
              7+
            </p>
          }>
          {ratingAAA}
        </OuiToolTip>
      ),
    },
  ];

  return (
    <OuiFlexGroup
      className="guideSection__emptyBox guideColorsPage__stickySlider"
      justifyContent="center"
      {...rest}>
      <OuiFlexItem>
        <OuiPanel paddingSize="l" color="subdued">
          <OuiFormRow
            id="ratingsRange"
            label="Minimum color contrast combinations to show"
            fullWidth>
            <OuiRange
              min={0}
              max={7}
              step={0.5}
              value={value}
              onChange={(e) => {
                setValue(e.currentTarget.value);
                onChange(e.currentTarget.value, checked);
              }}
              showTicks
              showValue
              ticks={ticks}
              valueAppend="+"
              fullWidth
            />
          </OuiFormRow>
        </OuiPanel>
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiPanel paddingSize="l" color="subdued">
          <OuiFormRow
            labelType="legend"
            label="Use text variant variables of core colors for better text contrast"
            hasChildLabel={false}>
            <div>
              <OuiSpacer size="s" />
              <OuiSwitch
                label="Show text variant"
                checked={showTextVariants}
                onChange={(e) => {
                  setChecked(e.target.checked);
                  onChange(value, e.target.checked);
                }}
              />
            </div>
          </OuiFormRow>
        </OuiPanel>
      </OuiFlexItem>
    </OuiFlexGroup>
  );
};
