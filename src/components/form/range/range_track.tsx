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

import React, { Component, MouseEventHandler, HTMLAttributes } from 'react';
import classNames from 'classnames';

import range from 'lodash/range';

import { isEvenlyDivisibleBy } from '../../../services';
import { OuiRangeLevels, OuiRangeLevel, LEVEL_COLORS } from './range_levels';
import { OuiRangeTicks, OuiRangeTick } from './range_ticks';

export { LEVEL_COLORS };

export interface OuiRangeTrackProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  min: number;
  max: number;
  step?: number;
  value?: number | string | Array<string | number>;
  compressed?: boolean;
  disabled?: boolean;
  showTicks?: boolean;
  tickInterval?: number;
  ticks?: OuiRangeTick[];
  onChange?: MouseEventHandler<HTMLButtonElement>;
  levels?: OuiRangeLevel[];
}

export class OuiRangeTrack extends Component<OuiRangeTrackProps> {
  validateValueIsInStep = (value: number) => {
    if (value < this.props.min) {
      throw new Error(
        `The value of ${value} is lower than the min value of ${this.props.min}.`
      );
    }
    if (value > this.props.max) {
      throw new Error(
        `The value of ${value} is higher than the max value of ${this.props.max}.`
      );
    }
    // Error out if the value doesn't line up with the sequence of steps
    if (
      !isEvenlyDivisibleBy(
        value - this.props.min,
        this.props.step !== undefined ? this.props.step : 1
      )
    ) {
      throw new Error(
        `The value of ${value} is not included in the possible sequence provided by the step of ${this.props.step}.`
      );
    }
    // Return the value if nothing fails
    return value;
  };

  calculateSequence = (
    min: OuiRangeTrackProps['min'],
    max: OuiRangeTrackProps['max'],
    interval?: OuiRangeTrackProps['tickInterval']
  ) => {
    // Loop from min to max, creating adding values at each interval
    const sequence = range(min, max, interval);
    // range is non-inclusive of max, so make it inclusive
    if (max % interval! === 0 && !sequence.includes(max)) {
      sequence.push(max);
    }
    return sequence;
  };

  calculateTicks = (
    min: OuiRangeTrackProps['min'],
    max: OuiRangeTrackProps['max'],
    step?: OuiRangeTrackProps['step'],
    tickInterval?: OuiRangeTrackProps['tickInterval'],
    customTicks?: OuiRangeTick[]
  ) => {
    let ticks;

    if (customTicks) {
      // If custom values were passed, use those for the sequence
      // But make sure they align with the possible sequence
      ticks = customTicks.map((tick) => {
        return this.validateValueIsInStep(tick.value);
      });
    } else {
      // If a custom interval was passed, use those for the sequence
      // But make sure they align with the possible sequence
      const interval = tickInterval || step;
      const tickSequence = this.calculateSequence(min, max, interval);

      ticks = tickSequence.map((tick) => {
        return this.validateValueIsInStep(tick);
      });
    }

    // Error out if there are too many ticks to render
    if (ticks.length > 20) {
      throw new Error(
        `The number of ticks to render is too high (${ticks.length}), reduce the interval.`
      );
    }

    return ticks;
  };

  render() {
    const {
      children,
      disabled,
      max,
      min,
      step,
      showTicks,
      tickInterval,
      ticks,
      levels,
      onChange,
      value,
      compressed,
      ...rest
    } = this.props;

    // TODO: Move these to only re-calculate if no-value props have changed
    this.validateValueIsInStep(max);

    const tickSequence =
      showTicks === true &&
      this.calculateTicks(min, max, step, tickInterval, ticks);

    const trackClasses = classNames('ouiRangeTrack', {
      'ouiRangeTrack--disabled': disabled,
      'ouiRangeTrack--hasLevels': levels && !!levels.length,
      'ouiRangeTrack--hasTicks': tickSequence || ticks,
      'ouiRangeTrack--compressed': compressed,
    });

    return (
      <div className={trackClasses} {...rest}>
        {levels && !!levels.length && (
          <OuiRangeLevels
            compressed={compressed}
            levels={levels}
            max={max}
            min={min}
            showTicks={showTicks}
          />
        )}
        {tickSequence && (
          <OuiRangeTicks
            disabled={disabled}
            compressed={compressed}
            onChange={onChange}
            ticks={ticks}
            tickSequence={tickSequence}
            value={value}
            min={min}
            max={max}
            interval={tickInterval || step}
          />
        )}
        {children}
      </div>
    );
  }
}
