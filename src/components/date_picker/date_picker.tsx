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

import React, { Component, MouseEventHandler, Ref } from 'react';
import classNames from 'classnames';

import { Moment } from 'moment'; // eslint-disable-line import/named

import { OuiFormControlLayout, OuiValidatableControl } from '../form';
import { OuiFormControlLayoutIconsProps } from '../form/form_control_layout/form_control_layout_icons';

import { OuiErrorBoundary } from '../error_boundary';

import { OuiI18nConsumer } from '../context';
import { ApplyClassComponentDefaults, CommonProps } from '../common';

// @ts-ignore the type is provided by react-datepicker.d.ts
import { ReactDatePicker as _ReactDatePicker } from '../../../packages';
import ReactDatePicker, { ReactDatePickerProps } from './react-datepicker'; // eslint-disable-line import/no-unresolved

export const ouiDatePickerDefaultDateFormat = 'MM/DD/YYYY';
export const ouiDatePickerDefaultTimeFormat = 'hh:mm A';

const DatePicker = _ReactDatePicker as typeof ReactDatePicker;

interface OuiExtendedDatePickerProps extends ReactDatePickerProps {
  /**
   * Applies classes to the numbered days provided. Check docs for example.
   */
  dayClassName?: (date: Moment) => string | null;

  /**
   * Makes the input full width
   */
  fullWidth?: boolean;

  /**
   * ref for the ReactDatePicker instance
   */
  inputRef: Ref<Component<ReactDatePickerProps, any, any>>;

  /**
   * Provides styling to the input when invalid
   */
  isInvalid?: boolean;

  /**
   * Provides styling to the input when loading
   */
  isLoading?: boolean;

  /**
   * What to do when the input is cleared by the x icon
   */
  onClear?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Opens to this date (in moment format) on first press, regardless of selection
   */
  openToDate?: Moment;

  /**
   * Shows only when no date is selected
   */
  placeholder?: string;

  /**
   * Can turn the shadow off if using the inline prop
   */
  shadow?: boolean;

  /**
   * Show the icon in input
   */
  showIcon?: boolean;

  /**
   * Pass an icon type to change the default `calendar` or `clock` icon
   */
  iconType?: OuiFormControlLayoutIconsProps['icon'];

  /**
   * Sets the placement of the popover. It accepts: `"bottom"`, `"bottom-end"`, `"bottom-start"`, `"left"`, `"left-end"`, `"left-start"`, `"right"`, `"right-end"`, `"right-start"`, `"top"`, `"top-end"`, `"top-start"`
   */
  popoverPlacement?: ReactDatePickerProps['popperPlacement'];

  /**
   * Reduces the size to a typical (compressed) input
   */
  compressed?: boolean;
}

type _OuiDatePickerProps = CommonProps &
  Omit<
    OuiExtendedDatePickerProps,
    | 'monthsShown'
    | 'showWeekNumbers'
    | 'fixedHeight'
    | 'dropdownMode'
    | 'useShortMonthInDropdown'
    | 'todayButton'
    | 'timeCaption'
    | 'disabledKeyboardNavigation'
    | 'isClearable'
    | 'withPortal'
  >;

export type OuiDatePickerProps = ApplyClassComponentDefaults<
  typeof OuiDatePicker
>;

export class OuiDatePicker extends Component<_OuiDatePickerProps> {
  static defaultProps = {
    adjustDateOnChange: true,
    dateFormat: ouiDatePickerDefaultDateFormat,
    fullWidth: false,
    inputRef: () => {},
    isLoading: false,
    shadow: true,
    shouldCloseOnSelect: true,
    showMonthDropdown: true,
    showYearDropdown: true,
    yearDropdownItemNumber: 7,
    accessibleMode: true,
    showIcon: true,
    showTimeSelect: false,
    timeFormat: ouiDatePickerDefaultTimeFormat,
    popoverPlacement: 'bottom-start',
    compressed: false,
  };

  render() {
    const {
      adjustDateOnChange,
      calendarClassName,
      className,
      customInput,
      dateFormat,
      dayClassName,
      disabled,
      excludeDates,
      filterDate,
      fullWidth,
      iconType,
      injectTimes,
      inline,
      inputRef,
      isInvalid,
      isLoading,
      locale,
      maxDate,
      maxTime,
      minDate,
      minTime,
      onChange,
      onClear,
      openToDate,
      placeholder,
      popperClassName,
      popoverPlacement,
      selected,
      shadow,
      shouldCloseOnSelect,
      showIcon,
      showTimeSelect,
      showTimeSelectOnly,
      timeFormat,
      utcOffset,
      compressed,
      ...rest
    } = this.props;

    const classes = classNames('ouiDatePicker', {
      'ouiDatePicker--shadow': shadow,
      'ouiDatePicker--inline': inline,
    });

    const datePickerClasses = classNames(
      'ouiDatePicker',
      'ouiFieldText',
      {
        'ouiFieldText--fullWidth': fullWidth,
        'ouiFieldText-isLoading': isLoading,
        'ouiFieldText--withIcon': !inline && showIcon,
        'ouiFieldText-isInvalid': isInvalid,
        'ouiFieldText--compressed': compressed,
      },
      className
    );

    let optionalIcon: OuiFormControlLayoutIconsProps['icon'];
    if (inline || customInput || !showIcon) {
      optionalIcon = undefined;
    } else if (iconType) {
      optionalIcon = iconType;
    } else if (showTimeSelectOnly) {
      optionalIcon = 'clock';
    } else {
      optionalIcon = 'calendar';
    }

    // In case the consumer did not alter the default date format but wants
    // to add the time select, we append the default time format
    let fullDateFormat = dateFormat;
    if (showTimeSelect && dateFormat === ouiDatePickerDefaultDateFormat) {
      fullDateFormat = `${dateFormat} ${timeFormat}`;
    }

    // OuiDatePicker only supports a subset of props from react-datepicker. Using any of
    // the unsupported props below will spit out an error.
    const PropNotSupported = () => {
      throw new Error(`You are using a prop from react-datepicker that OuiDatePicker
        does not support. Please check the OUI documentation for more information.`);
    };

    if (
      // @ts-ignore for guard against omitted prop
      // We don't want to show multiple months next to each other
      this.props.monthsShown ||
      // @ts-ignore for guard against omitted prop
      // There is no need to show week numbers
      this.props.showWeekNumbers ||
      // @ts-ignore for guard against omitted prop
      // Our css adapts to height, no need to fix it
      this.props.fixedHeight ||
      // @ts-ignore for guard against omitted prop
      // We force the month / year selection UI. No need to configure it
      this.props.dropdownMode ||
      // @ts-ignore for guard against omitted prop
      // Short month is unnecessary. Our UI has plenty of room for full months
      this.props.useShortMonthInDropdown ||
      // @ts-ignore for guard against omitted prop
      // The today button is not needed. This should always be external to the calendar
      this.props.todayButton ||
      // @ts-ignore for guard against omitted prop
      // We hide the time caption, so there is no need to overwrite its text
      this.props.timeCaption ||
      // @ts-ignore for guard against omitted prop
      // We always want keyboard accessibility on
      this.props.disabledKeyboardNavigation ||
      // @ts-ignore for guard against omitted prop
      // This is easy enough to do. It can conflict with isLoading state
      this.props.isClearable ||
      // @ts-ignore for guard against omitted prop
      // There is no reason to launch the datepicker in its own modal. Can always build these ourselves
      this.props.withPortal
    ) {
      return (
        <OuiErrorBoundary>
          <PropNotSupported />
        </OuiErrorBoundary>
      );
    }

    return (
      <span>
        <span className={classes}>
          <OuiFormControlLayout
            icon={optionalIcon}
            fullWidth={fullWidth}
            clear={selected && onClear ? { onClick: onClear } : undefined}
            isLoading={isLoading}>
            <OuiValidatableControl isInvalid={isInvalid}>
              <OuiI18nConsumer>
                {({ locale: contextLocale }) => {
                  return (
                    <DatePicker
                      adjustDateOnChange={adjustDateOnChange}
                      calendarClassName={calendarClassName}
                      className={datePickerClasses}
                      customInput={customInput}
                      dateFormat={fullDateFormat}
                      dayClassName={dayClassName}
                      disabled={disabled}
                      excludeDates={excludeDates}
                      filterDate={filterDate}
                      injectTimes={injectTimes}
                      inline={inline}
                      locale={locale || contextLocale}
                      maxDate={maxDate}
                      maxTime={maxTime}
                      minDate={minDate}
                      minTime={minTime}
                      onChange={onChange}
                      openToDate={openToDate}
                      placeholderText={placeholder}
                      popperClassName={popperClassName}
                      ref={inputRef}
                      selected={selected}
                      shouldCloseOnSelect={shouldCloseOnSelect}
                      showMonthDropdown
                      showTimeSelect={
                        showTimeSelectOnly ? true : showTimeSelect
                      }
                      showTimeSelectOnly={showTimeSelectOnly}
                      showYearDropdown
                      timeFormat={timeFormat}
                      utcOffset={utcOffset}
                      yearDropdownItemNumber={7}
                      accessibleMode
                      popperPlacement={popoverPlacement}
                      {...rest}
                    />
                  );
                }}
              </OuiI18nConsumer>
            </OuiValidatableControl>
          </OuiFormControlLayout>
        </span>
      </span>
    );
  }
}
