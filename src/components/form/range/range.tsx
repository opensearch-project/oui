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

import React, { Component, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';
import { isWithinRange } from '../../../services/number';
import { OuiInputPopover } from '../../popover';
import { htmlIdGenerator } from '../../../services/accessibility';

import { OuiRangeHighlight } from './range_highlight';
import { OuiRangeInput, OuiRangeInputProps } from './range_input';
import { OuiRangeLabel } from './range_label';
import { OuiRangeLevel } from './range_levels';
import { OuiRangeSlider } from './range_slider';
import { OuiRangeTick } from './range_ticks';
import { OuiRangeTooltip } from './range_tooltip';
import { OuiRangeTrack } from './range_track';
import { OuiRangeWrapper } from './range_wrapper';

export interface OuiRangeProps
  extends CommonProps,
    Omit<OuiRangeInputProps, 'onChange' | 'digitTolerance'> {
  compressed?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
  id?: string;
  /**
   * Create colored indicators for certain intervals
   */
  levels?: OuiRangeLevel[];
  step?: number;
  /**
   * Pass `true` to displays an extra input control for direct manipulation.
   * Pass `'inputWithPopover'` to only show the input but show the range in a dropdown.
   */
  showInput?: boolean | 'inputWithPopover';
  /**
   * Shows static min/max labels on the sides of the range slider
   */
  showLabels?: boolean;
  /**
   * Shows a thick line from min to value
   */
  showRange?: boolean;
  /**
   * Shows clickable tick marks and labels at the given interval (`step`/`tickInterval`)
   */
  showTicks?: boolean;
  /**
   * Shows a tooltip styled value
   */
  showValue?: boolean;
  /**
   * Specified ticks at specified values
   */
  ticks?: OuiRangeTick[];
  /**
   * Modifies the number of tick marks and at what interval
   */
  tickInterval?: number;
  /**
   * Appends to the tooltip
   */
  valueAppend?: ReactNode;
  /**
   * Prepends to the tooltip
   */
  valuePrepend?: ReactNode;

  onChange?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>,
    isValid: boolean
  ) => void;
}

export class OuiRange extends Component<OuiRangeProps> {
  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    fullWidth: false,
    compressed: false,
    isLoading: false,
    showLabels: false,
    showInput: false,
    showRange: false,
    showTicks: false,
    showValue: false,
    levels: [],
  };

  preventPopoverClose: boolean = false;

  state = {
    id: this.props.id || htmlIdGenerator()(),
    isPopoverOpen: false,
  };

  handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    const isValid = isWithinRange(
      this.props.min,
      this.props.max,
      e.currentTarget.value
    );
    if (this.props.onChange) {
      this.props.onChange(e, isValid);
    }
  };

  get isValid() {
    return isWithinRange(
      this.props.min,
      this.props.max,
      this.props.value || ''
    );
  }

  onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
    this.setState({
      isPopoverOpen: true,
    });
  };

  onInputBlur = (e: React.FocusEvent<HTMLInputElement>) =>
    setTimeout(() => {
      // Safari does not recognize any focus-related eventing for input[type=range]
      // making it impossible to capture its state using active/focus/relatedTarget
      // Instead, a prevention flag is set on mousedown, with a waiting period here.
      // Mousedown is viable because in the popover case, it is inaccessible via keyboard (intentionally)
      if (this.preventPopoverClose) {
        this.preventPopoverClose = false;
        return;
      }
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
      this.closePopover();
    }, 200);

  closePopover = () => {
    this.preventPopoverClose = false;
    this.setState({
      isPopoverOpen: false,
    });
  };

  render() {
    const {
      className,
      compressed,
      disabled,
      fullWidth,
      isLoading,
      readOnly,
      id: propsId,
      max,
      min,
      name,
      step,
      showLabels,
      showInput,
      showTicks,
      tickInterval,
      ticks,
      levels,
      showRange,
      showValue,
      valueAppend,
      valuePrepend,
      onBlur,
      onChange,
      onFocus,
      value,
      style,
      tabIndex,
      isInvalid,
      ...rest
    } = this.props;

    const { id } = this.state;

    const digitTolerance = Math.max(String(min).length, String(max).length);
    const showInputOnly = showInput === 'inputWithPopover';
    const canShowDropdown = showInputOnly && !readOnly && !disabled;

    const theInput: ReactNode = !!showInput ? (
      <OuiRangeInput
        id={id}
        min={min}
        max={max}
        digitTolerance={digitTolerance}
        step={step}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        compressed={compressed}
        onChange={this.handleOnChange}
        name={name}
        onFocus={canShowDropdown ? this.onInputFocus : onFocus}
        onBlur={canShowDropdown ? this.onInputBlur : onBlur}
        fullWidth={showInputOnly && fullWidth}
        isLoading={showInputOnly && isLoading}
        isInvalid={isInvalid}
        autoSize={!showInputOnly}
        {...rest}
      />
    ) : null;

    const classes = classNames(
      'ouiRange',
      {
        'ouiRange--hasInput': showInput,
      },
      className
    );

    const theRange = (
      <OuiRangeWrapper
        className={classes}
        fullWidth={fullWidth}
        compressed={compressed}>
        {showLabels && (
          <OuiRangeLabel side="min" disabled={disabled}>
            {min}
          </OuiRangeLabel>
        )}
        <OuiRangeTrack
          disabled={disabled}
          compressed={compressed}
          max={max}
          min={min}
          step={step}
          showTicks={showTicks}
          tickInterval={tickInterval}
          ticks={ticks}
          levels={levels}
          onChange={this.handleOnChange}
          value={value}
          aria-hidden={showInput === true}>
          <OuiRangeSlider
            id={showInput ? undefined : id} // Attach id only to the input if there is one
            name={name}
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            compressed={compressed}
            onChange={this.handleOnChange}
            style={style}
            showTicks={showTicks}
            showRange={showRange}
            tabIndex={showInput ? -1 : tabIndex}
            onMouseDown={
              showInputOnly
                ? () => (this.preventPopoverClose = true)
                : undefined
            }
            onFocus={showInput === true ? undefined : onFocus}
            onBlur={showInputOnly ? this.onInputBlur : onBlur}
            aria-hidden={showInput === true ? true : false}
            {...rest}
          />

          {showRange && this.isValid && (
            <OuiRangeHighlight
              compressed={compressed}
              showTicks={showTicks}
              min={Number(min)}
              max={Number(max)}
              lowerValue={Number(min)}
              upperValue={Number(value)}
            />
          )}

          {showValue && !!String(value).length && (
            <OuiRangeTooltip
              compressed={compressed}
              value={value}
              max={max}
              min={min}
              name={name}
              showTicks={showTicks}
              valuePrepend={valuePrepend}
              valueAppend={valueAppend}
            />
          )}
        </OuiRangeTrack>
        {showLabels && (
          <OuiRangeLabel side="max" disabled={disabled}>
            {max}
          </OuiRangeLabel>
        )}
        {showInput && !showInputOnly && (
          <>
            <div
              className={
                showTicks || ticks
                  ? 'ouiRange__slimHorizontalSpacer'
                  : 'ouiRange__horizontalSpacer'
              }
            />
            {theInput}
          </>
        )}
      </OuiRangeWrapper>
    );

    const thePopover = showInputOnly ? (
      <OuiInputPopover
        className="ouiRange__popover"
        input={theInput!} // `showInputOnly` confirms existence
        fullWidth={fullWidth}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover}
        disableFocusTrap={true}>
        {theRange}
      </OuiInputPopover>
    ) : undefined;

    return thePopover ? thePopover : theRange;
  }
}
