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

import React, { HTMLAttributes, FunctionComponent, ReactNode } from 'react';
import { CommonProps } from '../common';
import {
  ButtonColor,
  ButtonSize,
  OuiButton,
  OuiButtonIcon,
  OuiButtonIconColor,
} from '../button';
import { OuiFlexGroup, OuiFlexItem } from '../flex';

export type OuiSplitButtonProps = Omit<CommonProps, 'aria-label'> &
  Omit<
    HTMLAttributes<HTMLDivElement>,
    'color' | 'title' | 'onClick' | 'onChange'
  > & {
    fill?: boolean;
    /**
     * Any of our named colors.
     */
    color?: ButtonColor;
    /**
     * Use size `s` in confined spaces
     */
    size?: ButtonSize;
    /**
     * `disabled` is also allowed
     */
    isDisabled?: boolean;
    /**
     * Applies the boolean state as the `aria-pressed` property to create a toggle button.
     * *Only use when the readable text does not change between states.*
     */

    /**
     * Custom children
     */
    children?: ReactNode;
  };

export const OuiSplitButton: FunctionComponent<OuiSplitButtonProps> = ({
  children,
  color,
  fill,
  size,
}) => {
  const iconDisplay = fill ? 'fill' : 'base';

  return (
    <OuiFlexGroup gutterSize="none" className="ouiSplitButton">
      <OuiFlexItem>
        <OuiButton
          className="ouiSplitButton--primary"
          fill={fill}
          color={color}
          size={size}>
          {children}
        </OuiButton>
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiButtonIcon
          className="ouiSplitButton--dropdown"
          display={iconDisplay}
          color={color as OuiButtonIconColor}
          size={size || 'm'}
          iconType="arrowDown"
        />
      </OuiFlexItem>
    </OuiFlexGroup>
  );
};
