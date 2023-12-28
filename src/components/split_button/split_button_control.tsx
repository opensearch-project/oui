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
// import classNames from 'classnames';

import { CommonProps } from '../common';

// import { htmlIdGenerator } from '../../services/accessibility';
// import { OuiFormControlLayoutProps } from '../form/form_control_layout';
// import { OuiFlexGroup, OuiFlexItem } from '../flex';
import {
  ButtonColor,
  ButtonSize,
  OuiButton,
  OuiButtonIcon,
  OuiButtonIconColor,
} from '../button';

export type OuiSplitButtonOption = string | ReactNode;

export interface OuiSplitButtonControlProps
  extends CommonProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  isLoading?: boolean;

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
   * Click handler of Primary button
   */
  onClick?: () => void;

  /**
   * Click handler for drop-down button
   */
  onDropdownClick?: () => void;

  /**
   * Content of Primary (left-side) button
   */
  children?: ReactNode;
}

export const OuiSplitButtonControl = ({
  fill,
  size,
  color,
  children,
  fullWidth = false,
  onClick,
  onDropdownClick,
}: OuiSplitButtonControlProps): ReturnType<
  FunctionComponent<OuiSplitButtonControlProps>
> => {
  // const classes = classNames(
  //   'ouiSplitButtonControl',
  //   {
  //     'ouiSplitButtonControl--fullWidth': fullWidth,
  //     'ouiSplitButtonControl--compressed': compressed,
  //     'ouiSplitButtonControl-isLoading': isLoading,
  //     'ouiSplitButtonControl-isInvalid': isInvalid,
  //   },
  //   className
  // );

  // const icon: OuiFormControlLayoutProps['icon'] = {
  //   type: 'arrowDown',
  //   side: 'right',
  // };

  const iconDisplay = fill ? 'fill' : 'base';

  // const screenReaderId = htmlIdGenerator()();

  return (
    <div className="ouiSplitButtonControl">
      <OuiButton
        className="ouiSplitButtonControl--primary"
        fill={fill}
        color={color}
        size={size}
        fullWidth={fullWidth}
        onClick={onClick}>
        {children}
      </OuiButton>
      <OuiButtonIcon
        className="ouiSplitButtonControl--dropdown"
        display={iconDisplay}
        color={color as OuiButtonIconColor}
        size={size || 'm'}
        iconType="arrowDown"
        onClick={onDropdownClick}
        aria-label="Open Selections"
        data-test-subj="splitButton--dropdown"
      />
    </div>
  );
};
