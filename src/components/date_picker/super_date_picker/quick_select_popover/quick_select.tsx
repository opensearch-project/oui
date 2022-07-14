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
  Component,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';
import moment from 'moment';
import dateMath from '@elastic/datemath';
import { htmlIdGenerator } from '../../../../services';
import { OuiButton, OuiButtonIcon } from '../../../button';
import { OuiFlexGroup, OuiFlexItem } from '../../../flex';
import { OuiSpacer } from '../../../spacer';
import { OuiSelect, OuiFieldNumber } from '../../../form';
import { OuiToolTip } from '../../../tool_tip';
import { OuiHorizontalRule } from '../../../horizontal_rule';
import { OuiI18n } from '../../../i18n';
import { timeUnits } from '../time_units';
import { OuiScreenReaderOnly } from '../../../accessibility';
import { ApplyTime, QuickSelect, TimeUnitId } from '../../types';
import { keysOf } from '../../../common';
import { parseTimeParts } from './quick_select_utils';

const LAST = 'last';
const NEXT = 'next';

const timeTenseOptions = [
  { value: LAST, text: 'Last' },
  { value: NEXT, text: 'Next' },
];
const timeUnitsOptions = keysOf(timeUnits).map((key) => {
  return { value: key, text: `${timeUnits[key]}s` };
});

type OuiQuickSelectState = QuickSelect;

export interface OuiQuickSelectProps {
  applyTime: ApplyTime;
  start: string;
  end: string;
  prevQuickSelect?: OuiQuickSelectState;
}

export class OuiQuickSelect extends Component<
  OuiQuickSelectProps,
  OuiQuickSelectState
> {
  constructor(props: OuiQuickSelectProps) {
    super(props);

    const {
      timeTense: timeTenseDefault,
      timeUnits: timeUnitsDefault,
      timeValue: timeValueDefault,
    } = parseTimeParts(props.start, props.end);

    this.state = {
      timeTense:
        props.prevQuickSelect && props.prevQuickSelect.timeTense
          ? props.prevQuickSelect.timeTense
          : timeTenseDefault,
      timeValue:
        props.prevQuickSelect && props.prevQuickSelect.timeValue
          ? props.prevQuickSelect.timeValue
          : timeValueDefault,
      timeUnits:
        props.prevQuickSelect && props.prevQuickSelect.timeUnits
          ? props.prevQuickSelect.timeUnits
          : timeUnitsDefault,
    };
  }

  generateId = htmlIdGenerator();

  onTimeTenseChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    this.setState({
      timeTense: event.target.value,
    });
  };

  onTimeValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const sanitizedValue = parseInt(event.target.value, 10);
    this.setState({
      timeValue: isNaN(sanitizedValue) ? 0 : sanitizedValue,
    });
  };

  onTimeUnitsChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    this.setState({
      timeUnits: event.target.value as TimeUnitId,
    });
  };

  handleKeyDown: KeyboardEventHandler<HTMLElement> = ({ key }) => {
    if (key === 'Enter') {
      this.applyQuickSelect();
    }
  };

  applyQuickSelect = () => {
    const { timeTense, timeValue, timeUnits } = this.state;

    if (timeTense === NEXT) {
      this.props.applyTime({
        start: 'now',
        end: `now+${timeValue}${timeUnits}`,
        quickSelect: { ...this.state },
      });
      return;
    }

    this.props.applyTime({
      start: `now-${timeValue}${timeUnits}`,
      end: 'now',
      quickSelect: { ...this.state },
    });
  };

  getBounds = () => {
    const startMoment = dateMath.parse(this.props.start);
    const endMoment = dateMath.parse(this.props.end, { roundUp: true });
    return {
      min:
        startMoment && startMoment.isValid()
          ? startMoment
          : moment().subtract(15, 'minute'),
      max: endMoment && endMoment.isValid() ? endMoment : moment(),
    };
  };

  stepForward = () => {
    const { min, max } = this.getBounds();
    const diff = max.diff(min);
    this.props.applyTime({
      start: moment(max).add(1, 'ms').toISOString(),
      end: moment(max)
        .add(diff + 1, 'ms')
        .toISOString(),
      keepPopoverOpen: true,
    });
  };

  stepBackward = () => {
    const { min, max } = this.getBounds();
    const diff = max.diff(min);
    this.props.applyTime({
      start: moment(min)
        .subtract(diff + 1, 'ms')
        .toISOString(),
      end: moment(min).subtract(1, 'ms').toISOString(),
      keepPopoverOpen: true,
    });
  };

  render() {
    const { timeTense, timeValue, timeUnits } = this.state;
    const timeSelectionId = this.generateId();
    const legendId = this.generateId();
    const matchedTimeUnit = timeUnitsOptions.find(
      ({ value }) => value === timeUnits
    );
    const timeUnit = matchedTimeUnit ? matchedTimeUnit.text : '';

    return (
      <fieldset>
        <OuiI18n
          token="ouiQuickSelect.legendText"
          default="Quick select a time range">
          {(legendText: string) => (
            // Legend needs to be the first thing in a fieldset, but we want the visible title within the flex.
            // So we hide it, but allow screen readers to see it
            <OuiScreenReaderOnly>
              <legend id={legendId} className="ouiFormLabel">
                {legendText}
              </legend>
            </OuiScreenReaderOnly>
          )}
        </OuiI18n>
        <OuiFlexGroup
          responsive={false}
          alignItems="center"
          justifyContent="spaceBetween"
          gutterSize="s">
          <OuiFlexItem grow={false}>
            <OuiI18n
              token="ouiQuickSelect.quickSelectTitle"
              default="Quick select">
              {(quickSelectTitle: string) => (
                <div aria-hidden className="ouiFormLabel">
                  {quickSelectTitle}
                </div>
              )}
            </OuiI18n>
          </OuiFlexItem>
          <OuiFlexItem grow={false}>
            <OuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
              <OuiFlexItem grow={false}>
                <OuiI18n
                  token="ouiQuickSelect.previousLabel"
                  default="Previous time window">
                  {(previousLabel: string) => (
                    <OuiToolTip content={previousLabel}>
                      <OuiButtonIcon
                        aria-label={previousLabel}
                        iconType="arrowLeft"
                        onClick={this.stepBackward}
                      />
                    </OuiToolTip>
                  )}
                </OuiI18n>
              </OuiFlexItem>
              <OuiFlexItem grow={false}>
                <OuiI18n
                  token="ouiQuickSelect.nextLabel"
                  default="Next time window">
                  {(nextLabel: string) => (
                    <OuiToolTip content={nextLabel}>
                      <OuiButtonIcon
                        aria-label={nextLabel}
                        iconType="arrowRight"
                        onClick={this.stepForward}
                      />
                    </OuiToolTip>
                  )}
                </OuiI18n>
              </OuiFlexItem>
            </OuiFlexGroup>
          </OuiFlexItem>
        </OuiFlexGroup>
        <OuiSpacer size="s" />
        <OuiFlexGroup gutterSize="s" responsive={false}>
          <OuiFlexItem>
            <OuiI18n token="ouiQuickSelect.tenseLabel" default="Time tense">
              {(tenseLabel: string) => (
                <OuiSelect
                  compressed
                  onKeyDown={this.handleKeyDown}
                  aria-label={tenseLabel}
                  aria-describedby={`${timeSelectionId} ${legendId}`}
                  value={timeTense}
                  options={timeTenseOptions}
                  onChange={this.onTimeTenseChange}
                />
              )}
            </OuiI18n>
          </OuiFlexItem>
          <OuiFlexItem>
            <OuiI18n token="ouiQuickSelect.valueLabel" default="Time value">
              {(valueLabel: string) => (
                <OuiFieldNumber
                  compressed
                  onKeyDown={this.handleKeyDown}
                  aria-describedby={`${timeSelectionId} ${legendId}`}
                  aria-label={valueLabel}
                  value={timeValue}
                  onChange={this.onTimeValueChange}
                />
              )}
            </OuiI18n>
          </OuiFlexItem>
          <OuiFlexItem>
            <OuiI18n token="ouiQuickSelect.unitLabel" default="Time unit">
              {(unitLabel: string) => (
                <OuiSelect
                  compressed
                  onKeyDown={this.handleKeyDown}
                  aria-label={unitLabel}
                  aria-describedby={`${timeSelectionId} ${legendId}`}
                  value={timeUnits}
                  options={timeUnitsOptions}
                  onChange={this.onTimeUnitsChange}
                />
              )}
            </OuiI18n>
          </OuiFlexItem>
          <OuiFlexItem grow={false}>
            <OuiButton
              aria-describedby={`${timeSelectionId} ${legendId}`}
              className="ouiQuickSelect__applyButton"
              size="s"
              onClick={this.applyQuickSelect}
              disabled={timeValue <= 0}>
              <OuiI18n token="ouiQuickSelect.applyButton" default="Apply" />
            </OuiButton>
          </OuiFlexItem>
        </OuiFlexGroup>
        <OuiHorizontalRule margin="s" />
        <OuiScreenReaderOnly>
          <p id={timeSelectionId}>
            <OuiI18n
              token="ouiQuickSelect.fullDescription"
              default="Currently set to {timeTense} {timeValue} {timeUnit}."
              values={{
                timeTense,
                timeValue,
                timeUnit,
              }}
            />
          </p>
        </OuiScreenReaderOnly>
      </fieldset>
    );
  }
}
