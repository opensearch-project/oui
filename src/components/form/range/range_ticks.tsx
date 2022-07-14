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
  MouseEventHandler,
  FunctionComponent,
  ReactNode,
  CSSProperties,
  MutableRefObject,
} from 'react';
import classNames from 'classnames';

import { calculateThumbPosition, OUI_THUMB_SIZE } from './utils';

import { useInnerText } from '../../inner_text';

export interface OuiRangeTick {
  value: number;
  label: ReactNode;
}

export type OuiRangeTicksProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'value'
> & {
  ticks?: OuiRangeTick[];
  tickSequence: number[];
  value?: number | string | Array<string | number>;
  min: number;
  max: number;
  compressed?: boolean;
  interval?: number;
  disabled?: boolean;
  onChange?: MouseEventHandler<HTMLButtonElement>;
};

const OuiTickValue: FunctionComponent<
  OuiRangeTicksProps & {
    ticksRef: MutableRefObject<HTMLDivElement | null>;
    tickValue: any;
    percentageWidth: number;
  }
> = ({
  disabled,
  ticks: customTicks,
  min,
  max,
  value,
  onChange,
  percentageWidth,
  tickValue,
  ticksRef,
}) => {
  const tickStyle: CSSProperties = {};
  const tickObject = customTicks
    ? customTicks.find((o) => o.value === tickValue)
    : { value: tickValue, label: tickValue };
  const isMinTick = tickObject?.value === min;
  const isMaxTick = tickObject?.value === max;

  const label = tickObject ? tickObject.label : tickValue;

  // Math worked out by trial and error
  // Shifts the label into the reserved margin of OuiRangeTrack
  const labelShiftVal =
    (isMinTick || isMaxTick) && label.length > 3
      ? Math.min(label.length * 0.25, 1.25)
      : 0;

  if (isMaxTick && !!labelShiftVal) {
    tickStyle.right = '0%';
  } else {
    const trackWidth = ticksRef.current?.clientWidth ?? 0;

    const position = calculateThumbPosition(tickValue, min, max, trackWidth);

    const thumbOffset = labelShiftVal ? 0 : OUI_THUMB_SIZE / 2;
    tickStyle.left = `calc(${position}% + ${thumbOffset}px)`;
  }
  tickStyle.maxWidth = customTicks ? undefined : `${percentageWidth}%`;

  const pseudoShift: CSSProperties = {};
  if (labelShiftVal) {
    const labelShift = isMaxTick ? 'marginRight' : 'marginLeft';
    tickStyle[labelShift] = `-${labelShiftVal}em`;
    pseudoShift[labelShift] = `calc(${labelShiftVal}em + 4px)`; // 4px derived from .ouiRangeTicks left/right offset
  }

  const pseudoTick = tickObject && !!labelShiftVal && (isMinTick || isMaxTick);

  const tickClasses = classNames('ouiRangeTick', {
    'ouiRangeTick--selected': value === tickValue,
    'ouiRangeTick--isCustom': customTicks,
    'ouiRangeTick--isMin': labelShiftVal && isMinTick,
    'ouiRangeTick--isMax': labelShiftVal && isMaxTick,
    'ouiRangeTick--hasTickMark': pseudoTick,
  });

  const [ref, innerText] = useInnerText();

  return (
    <button
      type="button"
      className={tickClasses}
      value={tickValue}
      disabled={disabled}
      onClick={onChange}
      style={tickStyle}
      tabIndex={-1}
      ref={ref}
      title={typeof label === 'string' ? label : innerText}>
      {pseudoTick && (
        <span
          className="ouiRangeTick__pseudo"
          aria-hidden
          style={pseudoShift}
        />
      )}
      {label}
    </button>
  );
};

export const OuiRangeTicks: FunctionComponent<OuiRangeTicksProps> = (props) => {
  const { ticks, tickSequence, max, min, interval = 1, compressed } = props;
  const ticksRef = React.useRef<HTMLDivElement | null>(null);
  // Calculate the width of each tick mark
  const percentageWidth = (interval / (max - min + interval)) * 100;

  const classes = classNames('ouiRangeTicks', {
    'ouiRangeTicks--compressed': compressed,
    'ouiRangeTicks--isCustom': ticks,
  });

  return (
    <div className={classes} ref={ticksRef}>
      {tickSequence.map((tickValue) => (
        <OuiTickValue
          key={tickValue}
          {...props}
          percentageWidth={percentageWidth}
          tickValue={tickValue}
          ticksRef={ticksRef}
        />
      ))}
    </div>
  );
};
