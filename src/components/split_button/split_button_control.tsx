/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {
  FunctionComponent,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

import { CommonProps, ExclusiveUnion } from '../common';

import {
  ButtonColor,
  ButtonSize,
  OuiButton,
  OuiButtonIcon,
  OuiButtonIconColor,
  OuiButtonProps,
} from '../button';
import {
  OuiButtonPropsForAnchor,
  OuiButtonPropsForButton,
  colorToClassNameMap,
} from '../button/button';
import classNames from 'classnames';

// this intersection still does not satisfy OuiButtonIconColor
// https://github.com/opensearch-project/oui/issues/1196
export type OuiSplitButtonColor = OuiButtonIconColor & ButtonColor;

type OuiSplitButtonActionProps = ExclusiveUnion<
  OuiButtonPropsForAnchor,
  OuiButtonPropsForButton
>;

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
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;

  /**
   * Optional additional props to send to Primary Button
   */
  buttonProps?: OuiButtonProps;

  /**
   * Optional additional props to send to Dropdown Button
   */
  dropdownProps?: OuiButtonProps;

  /**
   * Content of Primary (left-side) button
   */
  children: ReactNode;
}

export const OuiSplitButtonControl: FunctionComponent<
  OuiSplitButtonControlProps & OuiSplitButtonActionProps
> = ({
  fill,
  size,
  color = 'primary',
  disabled = false,
  children,
  fullWidth,
  onClick,
  href,
  target,
  rel,
  onDropdownClick,
  onKeyDown: onSelectKeydown,
  buttonProps,
  dropdownProps,
}) => {
  const iconDisplay = fill ? 'fill' : 'base';

  const className = classNames(
    'ouiSplitButtonControl',
    color && `ouiSplitButtonColor${colorToClassNameMap[color]}`,
    disabled && 'ouiSplitButtonColor-isDisabled',
    fill && 'ouiSplitButtonColor--filled'
  );

  const primaryButtonClasses = classNames(
    'ouiSplitButtonControl',
    'ouiSplitButtonControl--primary',
    color && `ouiSplitButtonHairline${colorToClassNameMap[color]}`,
    disabled && 'ouiSplitButtonHairline--isDisabled',
    fill && 'ouiSplitButtonHairline--filled'
  );

  const actionProps = {
    href,
    target,
    rel,
    onClick,
  };
  return (
    <div className={className}>
      <OuiButton
        className={primaryButtonClasses}
        fill={fill}
        color={color}
        size={size}
        fullWidth={fullWidth}
        isDisabled={disabled || false}
        onKeyDown={onSelectKeydown}
        data-test-subj="splitButton--primary"
        {...actionProps}
        {...buttonProps}>
        {children}
      </OuiButton>
      <OuiButtonIcon
        display={iconDisplay}
        className="ouiSplitButtonControl--dropdown"
        //@ts-ignore - typedef conflict between ButtonColor, OuiButtonIconColor
        // https://github.com/opensearch-project/oui/issues/1196
        color={color}
        size={size || 'm'}
        disabled={disabled}
        isDisabled={disabled}
        iconType="arrowDown"
        onClick={onDropdownClick}
        onKeyDown={onSelectKeydown}
        aria-label="Open Selections"
        data-test-subj="splitButton--dropdown"
        {...dropdownProps}
      />
    </div>
  );
};
