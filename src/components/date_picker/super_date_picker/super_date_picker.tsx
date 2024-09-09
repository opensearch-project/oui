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

import React, { Component } from 'react';
import classNames from 'classnames';
import {
  prettyDuration,
  showPrettyDuration,
  commonDurationRanges,
} from './pretty_duration';
import { prettyInterval } from './pretty_interval';

import dateMath from '@opensearch/datemath';

import {
  OuiSuperUpdateButton,
  OuiSuperUpdateButtonProps,
} from './super_update_button';
import { OuiQuickSelectPopover } from './quick_select_popover/quick_select_popover';
import { OuiDatePopoverButton } from './date_popover/date_popover_button';

import { OuiDatePickerRange } from '../date_picker_range';
import { OuiFormControlLayout } from '../../form';
import { OuiFlexGroup, OuiFlexItem } from '../../flex';
import { AsyncInterval } from './async_interval';
import { OuiI18n } from '../../i18n';
import { OuiI18nConsumer } from '../../context';
import { CommonProps } from '../../common';
import {
  ShortDate,
  Milliseconds,
  DurationRange,
  ApplyTime,
  ApplyRefreshInterval,
  QuickSelectPanel,
} from '../types';
import { OuiDatePopoverContentProps } from './date_popover/date_popover_content';
import { LocaleSpecifier } from 'moment'; // eslint-disable-line import/named

export { prettyDuration, commonDurationRanges };

export interface OnTimeChangeProps extends DurationRange {
  isInvalid: boolean;
  isQuickSelection: boolean;
}

export interface OnRefreshProps extends DurationRange {
  refreshInterval: number;
}

export type OuiSuperDatePickerProps = CommonProps & {
  commonlyUsedRanges: DurationRange[];
  customQuickSelectPanels?: QuickSelectPanel[];

  /**
   * Specifies the formatted used when displaying dates and/or datetimes
   */
  dateFormat: string;
  end: ShortDate;

  /**
   * Set isAutoRefreshOnly to true to limit the component to only display auto refresh content.
   */
  isAutoRefreshOnly: boolean;
  isDisabled: boolean;
  isLoading?: boolean;
  isPaused: boolean;

  /**
   * Used to localize e.g. month names, passed to `moment`
   */
  locale?: LocaleSpecifier;

  /**
   * Callback for when the refresh interval is fired.
   * OuiSuperDatePicker will only manage a refresh interval timer when onRefresh callback is supplied
   * If a promise is returned, the next refresh interval will not start until the promise has resolved.
   * If the promise rejects the refresh interval will stop and the error thrown
   */
  onRefresh?: (props: OnRefreshProps) => void;

  /**
   * Callback for when the refresh interval changes.
   * Supply onRefreshChange to show refresh interval inputs in quick select popover
   */
  onRefreshChange?: ApplyRefreshInterval;

  /**
   * Callback for when the time changes.
   */
  onTimeChange: (props: OnTimeChangeProps) => void;
  recentlyUsedRanges: DurationRange[];

  /**
   * Refresh interval in milliseconds
   */
  refreshInterval: Milliseconds;

  /**
   * Set showUpdateButton to false to immediately invoke onTimeChange for all start and end changes.
   */
  showUpdateButton: boolean;
  start: ShortDate;

  /**
   * Specifies the formatted used when displaying times
   */
  timeFormat: string;
  utcOffset?: number;

  /**
   * Props passed to the update button
   */
  updateButtonProps?: Partial<
    Omit<
      OuiSuperUpdateButtonProps,
      'needsUpdate' | 'showTooltip' | 'isLoading' | 'isDisabled' | 'onClick'
    >
  >;

  /**
   * when `true` creates a shorter input
   */
  compressed?: boolean;
};

interface OuiSuperDatePickerState {
  end: ShortDate;
  hasChanged: boolean;
  isEndDatePopoverOpen: boolean;
  isInvalid: boolean;
  isStartDatePopoverOpen: boolean;
  prevProps: {
    end: ShortDate;
    start: ShortDate;
  };
  showPrettyDuration: boolean;
  start: ShortDate;
}

function isRangeInvalid(start: ShortDate, end: ShortDate) {
  if (start === 'now' && end === 'now') {
    return true;
  }

  const startMoment = dateMath.parse(start);
  const endMoment = dateMath.parse(end, { roundUp: true });
  if (
    !startMoment ||
    !endMoment ||
    !startMoment.isValid() ||
    !endMoment.isValid()
  ) {
    return true;
  }
  if (startMoment.isAfter(endMoment)) {
    return true;
  }

  return false;
}

export class OuiSuperDatePicker extends Component<
  OuiSuperDatePickerProps,
  OuiSuperDatePickerState
> {
  static defaultProps = {
    commonlyUsedRanges: commonDurationRanges,
    dateFormat: 'MMM D, YYYY @ HH:mm:ss.SSS',
    end: 'now',
    isAutoRefreshOnly: false,
    isDisabled: false,
    isPaused: true,
    recentlyUsedRanges: [],
    refreshInterval: 0,
    showUpdateButton: true,
    start: 'now-15m',
    timeFormat: 'HH:mm',
    compressed: false,
  };

  asyncInterval?: AsyncInterval;

  state: OuiSuperDatePickerState = {
    prevProps: {
      start: this.props.start,
      end: this.props.end,
    },
    start: this.props.start,
    end: this.props.end,
    isInvalid: isRangeInvalid(this.props.start, this.props.end),
    hasChanged: false,
    showPrettyDuration: showPrettyDuration(
      this.props.start,
      this.props.end,
      this.props.commonlyUsedRanges
    ),
    isStartDatePopoverOpen: false,
    isEndDatePopoverOpen: false,
  };

  static getDerivedStateFromProps(
    nextProps: OuiSuperDatePickerProps,
    prevState: OuiSuperDatePickerState
  ) {
    if (
      nextProps.start !== prevState.prevProps.start ||
      nextProps.end !== prevState.prevProps.end
    ) {
      return {
        prevProps: {
          start: nextProps.start,
          end: nextProps.end,
        },
        start: nextProps.start,
        end: nextProps.end,
        isInvalid: isRangeInvalid(nextProps.start, nextProps.end),
        hasChanged: false,
        showPrettyDuration: showPrettyDuration(
          nextProps.start,
          nextProps.end,
          nextProps.commonlyUsedRanges
        ),
      };
    }

    return null;
  }

  setTime = ({ end, start }: DurationRange) => {
    const isInvalid = isRangeInvalid(start, end);

    this.setState({
      start,
      end,
      isInvalid,
      hasChanged: !(
        this.state.prevProps.start === start && this.state.prevProps.end === end
      ),
    });

    if (!this.props.showUpdateButton) {
      this.props.onTimeChange({
        start,
        end,
        isQuickSelection: false,
        isInvalid,
      });
    }
  };

  componentDidMount = () => {
    if (!this.props.isPaused) {
      this.startInterval(this.props.refreshInterval);
    }
  };

  componentDidUpdate = () => {
    this.stopInterval();
    if (!this.props.isPaused) {
      this.startInterval(this.props.refreshInterval);
    }
  };

  componentWillUnmount = () => {
    this.stopInterval();
  };

  setStart: OuiDatePopoverContentProps['onChange'] = (start: ShortDate) => {
    this.setTime({ start, end: this.state.end });
  };

  setEnd: OuiDatePopoverContentProps['onChange'] = (end: ShortDate) => {
    this.setTime({ start: this.state.start, end });
  };

  applyTime = () => {
    this.props.onTimeChange({
      start: this.state.start,
      end: this.state.end,
      isQuickSelection: false,
      isInvalid: false,
    });
  };

  applyQuickTime: ApplyTime = ({ start, end }) => {
    this.setState({
      showPrettyDuration: showPrettyDuration(start, end, commonDurationRanges),
    });
    this.props.onTimeChange({
      start,
      end,
      isQuickSelection: true,
      isInvalid: false,
    });
  };

  hidePrettyDuration = () => {
    this.setState({ showPrettyDuration: false, isStartDatePopoverOpen: true });
  };

  onStartDatePopoverToggle = () => {
    this.setState((prevState) => {
      return { isStartDatePopoverOpen: !prevState.isStartDatePopoverOpen };
    });
  };

  onStartDatePopoverClose = () => {
    this.setState({ isStartDatePopoverOpen: false });
  };

  onEndDatePopoverToggle = () => {
    this.setState((prevState) => {
      return { isEndDatePopoverOpen: !prevState.isEndDatePopoverOpen };
    });
  };

  onEndDatePopoverClose = () => {
    this.setState({ isEndDatePopoverOpen: false });
  };

  onRefreshChange: ApplyRefreshInterval = ({ refreshInterval, isPaused }) => {
    this.stopInterval();
    if (!isPaused) {
      this.startInterval(refreshInterval);
    }
    if (this.props.onRefreshChange) {
      this.props.onRefreshChange({ refreshInterval, isPaused });
    }
  };

  stopInterval = () => {
    if (this.asyncInterval) {
      this.asyncInterval.stop();
    }
  };

  startInterval = (refreshInterval: number) => {
    const { onRefresh } = this.props;
    if (onRefresh) {
      const handler = () => {
        const { start, end } = this.props;
        onRefresh({ start, end, refreshInterval });
      };
      this.asyncInterval = new AsyncInterval(handler, refreshInterval);
    }
  };

  renderDatePickerRange = () => {
    const {
      end,
      hasChanged,
      isEndDatePopoverOpen,
      isInvalid,
      isStartDatePopoverOpen,
      showPrettyDuration,
      start,
    } = this.state;
    const {
      commonlyUsedRanges,
      dateFormat,
      isAutoRefreshOnly,
      isDisabled,
      isPaused,
      locale,
      refreshInterval,
      timeFormat,
      utcOffset,
      compressed,
    } = this.props;

    if (isAutoRefreshOnly) {
      return (
        <OuiDatePickerRange
          className="ouiDatePickerRange--inGroup"
          iconType={false}
          isCustom
          startDateControl={<div />}
          endDateControl={<div />}
          readOnly>
          <span className="ouiSuperDatePicker__prettyFormat">
            {prettyInterval(Boolean(isPaused), refreshInterval)}
          </span>
        </OuiDatePickerRange>
      );
    }

    if (
      showPrettyDuration &&
      !isStartDatePopoverOpen &&
      !isEndDatePopoverOpen
    ) {
      return (
        <OuiDatePickerRange
          className="ouiDatePickerRange--inGroup"
          iconType={false}
          isCustom
          startDateControl={<div />}
          endDateControl={<div />}>
          <button
            className={classNames('ouiSuperDatePicker__prettyFormat', {
              'ouiSuperDatePicker__prettyFormat--disabled': isDisabled,
              'ouiSuperDatePicker__prettyFormat--compressed': compressed,
            })}
            data-test-subj="superDatePickerShowDatesButton"
            disabled={isDisabled}
            onClick={this.hidePrettyDuration}>
            {prettyDuration(start, end, commonlyUsedRanges, dateFormat)}
            <span className="ouiSuperDatePicker__prettyFormatLink">
              <OuiI18n
                token="ouiSuperDatePicker.showDatesButtonLabel"
                default="Show dates"
              />
            </span>
          </button>
        </OuiDatePickerRange>
      );
    }

    return (
      <OuiI18nConsumer>
        {({ locale: contextLocale }) => (
          <OuiDatePickerRange
            className="ouiDatePickerRange--inGroup"
            iconType={false}
            isCustom
            startDateControl={
              <OuiDatePopoverButton
                className={classNames(
                  'ouiSuperDatePicker__startPopoverButton',
                  {
                    'ouiSuperDatePicker__startPopoverButton--compressed': compressed,
                  }
                )}
                position="start"
                needsUpdating={hasChanged}
                isInvalid={isInvalid}
                isDisabled={isDisabled}
                onChange={this.setStart}
                value={start}
                dateFormat={dateFormat}
                utcOffset={utcOffset}
                timeFormat={timeFormat}
                locale={locale || contextLocale}
                isOpen={this.state.isStartDatePopoverOpen}
                onPopoverToggle={this.onStartDatePopoverToggle}
                onPopoverClose={this.onStartDatePopoverClose}
                compressed={compressed}
              />
            }
            endDateControl={
              <OuiDatePopoverButton
                position="end"
                needsUpdating={hasChanged}
                isInvalid={isInvalid}
                isDisabled={isDisabled}
                onChange={this.setEnd}
                value={end}
                dateFormat={dateFormat}
                utcOffset={utcOffset}
                timeFormat={timeFormat}
                locale={locale || contextLocale}
                roundUp
                isOpen={this.state.isEndDatePopoverOpen}
                onPopoverToggle={this.onEndDatePopoverToggle}
                onPopoverClose={this.onEndDatePopoverClose}
                compressed={compressed}
              />
            }
          />
        )}
      </OuiI18nConsumer>
    );
  };

  handleClickUpdateButton = () => {
    if (!this.state.hasChanged && this.props.onRefresh) {
      const { start, end, refreshInterval } = this.props;
      this.props.onRefresh({ start, end, refreshInterval });
    } else {
      this.applyTime();
    }
  };

  renderUpdateButton = () => {
    if (!this.props.showUpdateButton || this.props.isAutoRefreshOnly) {
      return;
    }

    return (
      <OuiFlexItem grow={false}>
        <OuiSuperUpdateButton
          needsUpdate={this.state.hasChanged}
          showTooltip={
            !this.state.isStartDatePopoverOpen &&
            !this.state.isEndDatePopoverOpen
          }
          compressed={this.props.compressed}
          isLoading={this.props.isLoading}
          isDisabled={this.props.isDisabled || this.state.isInvalid}
          onClick={this.handleClickUpdateButton}
          data-test-subj="superDatePickerApplyTimeButton"
          {...this.props.updateButtonProps}
        />
      </OuiFlexItem>
    );
  };

  render() {
    const {
      commonlyUsedRanges,
      customQuickSelectPanels,
      dateFormat,
      end,
      isAutoRefreshOnly,
      isDisabled,
      isPaused,
      onRefreshChange,
      recentlyUsedRanges,
      refreshInterval,
      showUpdateButton,
      start,
      compressed,
    } = this.props;

    const quickSelect = (
      <OuiQuickSelectPopover
        applyRefreshInterval={
          onRefreshChange ? this.onRefreshChange : undefined
        }
        applyTime={this.applyQuickTime}
        commonlyUsedRanges={commonlyUsedRanges}
        customQuickSelectPanels={customQuickSelectPanels}
        dateFormat={dateFormat}
        end={end}
        isAutoRefreshOnly={isAutoRefreshOnly}
        isDisabled={isDisabled}
        isPaused={isPaused}
        recentlyUsedRanges={recentlyUsedRanges}
        refreshInterval={refreshInterval}
        start={start}
      />
    );

    const flexWrapperClasses = classNames('ouiSuperDatePicker__flexWrapper', {
      'ouiSuperDatePicker__flexWrapper--noUpdateButton': !showUpdateButton,
      'ouiSuperDatePicker__flexWrapper--isAutoRefreshOnly': isAutoRefreshOnly,
    });

    return (
      <OuiFlexGroup
        gutterSize="s"
        responsive={false}
        className={flexWrapperClasses}>
        <OuiFlexItem>
          <OuiFormControlLayout
            className="ouiSuperDatePicker"
            isDisabled={isDisabled}
            prepend={quickSelect}
            compressed={compressed}>
            {this.renderDatePickerRange()}
          </OuiFormControlLayout>
        </OuiFlexItem>
        {this.renderUpdateButton()}
      </OuiFlexGroup>
    );
  }
}

// @internal
export type OuiCompressedSuperDatePickerProps = Omit<
  OuiSuperDatePickerProps,
  'compressed'
>;

// @internal
export class OuiCompressedSuperDatePicker extends OuiSuperDatePicker {
  static defaultProps = {
    ...OuiSuperDatePicker.defaultProps,
    compressed: true,
  };
}
