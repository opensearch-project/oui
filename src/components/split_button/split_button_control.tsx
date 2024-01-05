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

import React, {
  FunctionComponent,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

import { CommonProps } from '../common';

import {
  ButtonColor,
  ButtonSize,
  OuiButton,
  OuiButtonIcon,
  OuiButtonIconColor,
  OuiButtonProps,
} from '../button';

// this intersection still does not satisfy OuiButtonIconColor
// https://github.com/opensearch-project/oui/issues/1196
export type OuiSplitButtonColor = OuiButtonIconColor & ButtonColor;

export interface OuiSplitButtonControlProps
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  fullWidth?: boolean;
  isLoading?: boolean;

  fill?: boolean;

  /**
   * Color of buttons and options
   */
  color?: OuiSplitButtonColor;

  /**
   * Use size `s` in confined spaces
   */
  size?: ButtonSize;

  /**
   * Click handler of Primary button
   */
  onClick?: () => void;

  /**
   * Click handler for drop-down button -- used by SplitButton to control
   * OuiPopover
   */
  onDropdownClick?: () => void;

  /**
   * Handle key-events for dropdown control
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;

  /**
   * Optional additional props to send to Primary Button
   */
  propsForPrimaryButton?: OuiButtonProps;

  /**
   * Optional additional props to send to Dropdown Button
   */
  propsForDropdownButton?: OuiButtonProps;

  /**
   * Content of Primary (left-side) button
   */
  children: ReactNode;
}

export const OuiSplitButtonControl = ({
  fill,
  size,
  color = 'primary',
  children,
  fullWidth,
  onClick,
  onDropdownClick,
  onKeyDown: onSelectKeydown,
  propsForDropdownButton,
  propsForPrimaryButton,
}: OuiSplitButtonControlProps): ReturnType<
  FunctionComponent<OuiSplitButtonControlProps>
> => {
  const iconDisplay = fill ? 'fill' : 'base';

  return (
    <div className="ouiSplitButtonControl">
      <OuiButton
        className="ouiSplitButtonControl--primary"
        fill={fill}
        color={color}
        size={size}
        fullWidth={fullWidth}
        onClick={onClick}
        onKeyDown={onSelectKeydown}
        {...propsForPrimaryButton}>
        {children}
      </OuiButton>
      <OuiButtonIcon
        display={iconDisplay}
        //@ts-ignore - typedef conflict between ButtonColor, OuiButtonIconColor
        // https://github.com/opensearch-project/oui/issues/1196
        color={color}
        size={size || 'm'}
        iconType="arrowDown"
        onClick={onDropdownClick}
        onKeyDown={onSelectKeydown}
        aria-label="Open Selections"
        data-test-subj="splitButton--dropdown"
        {...propsForDropdownButton}
      />
    </div>
  );
};
