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

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  ButtonHTMLAttributes,
  HTMLAttributes,
  FunctionComponent,
  ReactNode,
  useState,
  useCallback,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../../common';
import { htmlIdGenerator } from '../../../services/accessibility';
import { OuiIcon } from '../../icon';

const baseClassName = 'ouiSwitch';

const colorToClassNameMap = {
  primary: `${baseClassName}--primary`,
  accent: `${baseClassName}--accent`,
  secondary: `${baseClassName}--secondary`,
  success: `${baseClassName}--success`,
  warning: `${baseClassName}--warning`,
  danger: `${baseClassName}--danger`,
  ghost: `${baseClassName}--ghost`,
  text: `${baseClassName}--text`,
};

export const COLORS = keysOf(colorToClassNameMap);
export type OuiSwitchColor = keyof typeof colorToClassNameMap;

const displayToClassNameMap = {
  base: `${baseClassName}--base`,
  empty: null,
};

export const DISPLAYS = keysOf(displayToClassNameMap);
export type OuiSwitchDisplay = keyof typeof displayToClassNameMap;

export type OuiSwitchEvent = React.BaseSyntheticEvent<
  React.MouseEvent<HTMLButtonElement>,
  HTMLButtonElement,
  EventTarget & {
    checked: boolean;
  }
>;

export type OuiSwitchProps = CommonProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onChange' | 'type' | 'disabled'
  > & {
    /**
     * Whether to render the text label
     */
    showLabel?: boolean;
    /**
     * Must be a string if `showLabel` prop is false
     */
    label: ReactNode | string;
    checked: boolean;
    onChange: (event: OuiSwitchEvent) => void;
    /**
     * Any of the named color palette options.
     * **`subdued` set to be DEPRECATED, use `text` instead**
     */
    color?: OuiSwitchColor;
    disabled?: boolean;
    compressed?: boolean;
    type?: 'submit' | 'reset' | 'button';
    /**
     * Object of props passed to the label's <span/>
     */
    labelProps?: CommonProps & HTMLAttributes<HTMLSpanElement>;
    /**
     * Sets the display style for matching other OuiButton types.
     * `base` is equivalent to a typical OuiButton
     * `empty` (default) is equivalent to an OuiButtonEmpty
     */
    display?: OuiSwitchDisplay;
  };

export const OuiSwitch: FunctionComponent<OuiSwitchProps> = ({
  label,
  id,
  checked,
  disabled,
  compressed,
  onChange,
  className,
  showLabel = true,
  type = 'button',
  labelProps,
  color = 'primary',
  display = 'empty',
  ...rest
}) => {
  const [switchId] = useState(id || htmlIdGenerator()());
  const [labelId] = useState(labelProps?.id || htmlIdGenerator()());

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLParagraphElement>) => {
      if (disabled) {
        return;
      }

      const event = (e as unknown) as OuiSwitchEvent;
      event.target.checked = !checked;
      onChange(event);
    },
    [checked, disabled, onChange]
  );

  const classes = classNames(
    'ouiSwitch',
    color && colorToClassNameMap[color],
    display && displayToClassNameMap[display],
    {
      'ouiSwitch--compressed': compressed,
      'ouiSwitch-isDisabled': disabled,
    },
    className
  );
  const labelClasses = classNames('ouiSwitch__label', labelProps?.className);
  if (showLabel === false && typeof label !== 'string') {
    console.warn(
      'OuiSwitch `label` must be a string when `showLabel` is false.'
    );
  }

  return (
    <div className={classes}>
      <button
        id={switchId}
        aria-checked={checked || false}
        className="ouiSwitch__button"
        role="switch"
        type={type}
        disabled={disabled}
        onClick={onClick}
        aria-label={showLabel ? undefined : (label as string)}
        aria-labelledby={showLabel ? labelId : undefined}
        {...rest}>
        <span className="ouiSwitch__body">
          <span className="ouiSwitch__thumb" />
          <span className="ouiSwitch__track">
            {!compressed && (
              <React.Fragment>
                <OuiIcon type="cross" size="m" className="ouiSwitch__icon" />

                <OuiIcon
                  type="check"
                  size="m"
                  className="ouiSwitch__icon ouiSwitch__icon--checked"
                />
              </React.Fragment>
            )}
          </span>
        </span>
      </button>

      {showLabel && (
        // <button> + <label> has poor screen reader support.
        // Click handler added to simulate natural, secondary <label> interactivity.
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <span
          {...labelProps}
          className={labelClasses}
          id={labelId}
          onClick={onClick}>
          {label}
        </span>
      )}
    </div>
  );
};

// @internal
export type OuiCompressedSwitchProps = Omit<OuiSwitchProps, 'compressed'>;

// @internal
export const OuiCompressedSwitch: FunctionComponent<OuiCompressedSwitchProps> = (
  props
) => <OuiSwitch {...props} compressed />;
