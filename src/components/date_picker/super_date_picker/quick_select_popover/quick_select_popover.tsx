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

import React, { Component, Fragment } from 'react';

import { OuiButtonEmpty } from '../../../button';
import { OuiIcon } from '../../../icon';
import { OuiPopover } from '../../../popover';
import { OuiTitle } from '../../../title';
import { OuiSpacer } from '../../../spacer';
import { OuiHorizontalRule } from '../../../horizontal_rule';
import { OuiText } from '../../../text';

import { OuiQuickSelect } from './quick_select';
import { OuiCommonlyUsedTimeRanges } from './commonly_used_time_ranges';
import { OuiRecentlyUsed } from './recently_used';
import { OuiRefreshInterval } from './refresh_interval';
import {
  DurationRange,
  ApplyRefreshInterval,
  ApplyTime,
  QuickSelect,
  QuickSelectPanel,
} from '../../types';

export interface OuiQuickSelectPopoverProps {
  applyRefreshInterval?: ApplyRefreshInterval;
  applyTime: ApplyTime;
  commonlyUsedRanges: DurationRange[];
  customQuickSelectPanels?: QuickSelectPanel[];
  dateFormat: string;
  end: string;
  isAutoRefreshOnly: boolean;
  isDisabled: boolean;
  isPaused: boolean;
  recentlyUsedRanges: DurationRange[];
  refreshInterval: number;
  start: string;
}

interface OuiQuickSelectPopoverState {
  isOpen: boolean;
  prevQuickSelect?: QuickSelect;
}

export class OuiQuickSelectPopover extends Component<
  OuiQuickSelectPopoverProps,
  OuiQuickSelectPopoverState
> {
  state: OuiQuickSelectPopoverState = {
    isOpen: false,
  };

  closePopover = () => {
    this.setState({ isOpen: false });
  };

  togglePopover = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  applyTime: ApplyTime = ({
    start,
    end,
    quickSelect,
    keepPopoverOpen = false,
  }) => {
    this.props.applyTime({
      start,
      end,
    });
    if (quickSelect) {
      this.setState({ prevQuickSelect: quickSelect });
    }
    if (!keepPopoverOpen) {
      this.closePopover();
    }
  };

  renderDateTimeSections = () => {
    const {
      commonlyUsedRanges,
      dateFormat,
      end,
      isAutoRefreshOnly,
      recentlyUsedRanges,
      start,
    } = this.props;
    const { prevQuickSelect } = this.state;

    if (isAutoRefreshOnly) {
      return null;
    }

    return (
      <Fragment>
        <OuiQuickSelect
          applyTime={this.applyTime}
          start={start}
          end={end}
          prevQuickSelect={prevQuickSelect}
        />
        <OuiCommonlyUsedTimeRanges
          applyTime={this.applyTime}
          commonlyUsedRanges={commonlyUsedRanges}
        />
        <OuiRecentlyUsed
          applyTime={this.applyTime}
          commonlyUsedRanges={commonlyUsedRanges}
          dateFormat={dateFormat}
          recentlyUsedRanges={recentlyUsedRanges}
        />
        {this.renderCustomQuickSelectPanels()}
      </Fragment>
    );
  };

  renderCustomQuickSelectPanels = () => {
    const { customQuickSelectPanels } = this.props;
    if (!customQuickSelectPanels) {
      return null;
    }

    return customQuickSelectPanels.map(({ title, content }) => {
      return (
        <Fragment key={title}>
          <OuiTitle size="xxxs">
            <span>{title}</span>
          </OuiTitle>
          <OuiSpacer size="s" />
          <OuiText size="s" className="ouiQuickSelectPopover__section">
            {React.cloneElement(content, { applyTime: this.applyTime })}
          </OuiText>
          <OuiHorizontalRule margin="s" />
        </Fragment>
      );
    });
  };

  render() {
    const {
      applyRefreshInterval,
      isAutoRefreshOnly,
      isDisabled,
      isPaused,
      refreshInterval,
    } = this.props;
    const { isOpen } = this.state;

    const quickSelectButton = (
      <OuiButtonEmpty
        className="ouiFormControlLayout__prepend"
        textProps={{ className: 'ouiQuickSelectPopover__buttonText' }}
        onClick={this.togglePopover}
        aria-label="Date quick select"
        size="xs"
        iconType="arrowDown"
        iconSide="right"
        isDisabled={isDisabled}
        data-test-subj="superDatePickerToggleQuickMenuButton">
        <OuiIcon type={!isAutoRefreshOnly && isPaused ? 'calendar' : 'clock'} />
      </OuiButtonEmpty>
    );

    return (
      <OuiPopover
        button={quickSelectButton}
        isOpen={isOpen}
        closePopover={this.closePopover}
        anchorPosition="downLeft"
        anchorClassName="ouiQuickSelectPopover__anchor">
        <div
          className="ouiQuickSelectPopover__content"
          data-test-subj="superDatePickerQuickMenu">
          {this.renderDateTimeSections()}
          <OuiRefreshInterval
            applyRefreshInterval={applyRefreshInterval}
            isPaused={isPaused}
            refreshInterval={refreshInterval}
          />
        </div>
      </OuiPopover>
    );
  }
}
