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

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

export type OuiRangeLevelColor = 'primary' | 'success' | 'warning' | 'danger';

export const LEVEL_COLORS: OuiRangeLevelColor[] = [
  'primary',
  'success',
  'warning',
  'danger',
];

export interface OuiRangeLevel {
  min: number;
  max: number;
  color: OuiRangeLevelColor;
}

export interface OuiRangeLevelsProps {
  levels?: OuiRangeLevel[];
  max: number;
  min: number;
  showTicks?: boolean;
  compressed?: boolean;
}

export const OuiRangeLevels: FunctionComponent<OuiRangeLevelsProps> = ({
  levels = [],
  max,
  min,
  showTicks,
  compressed,
}) => {
  const validateLevelIsInRange = (level: OuiRangeLevel) => {
    if (level.min < min) {
      throw new Error(
        `The level min of ${level.min} is lower than the min value of ${min}.`
      );
    }
    if (level.max > max) {
      throw new Error(
        `The level max of ${level.max} is higher than the max value of ${max}.`
      );
    }
  };

  const classes = classNames('ouiRangeLevels', {
    'ouiRangeLevels--hasTicks': showTicks,
    'ouiRangeLevels--compressed': compressed,
  });

  return (
    <div className={classes}>
      {levels.map((level, index) => {
        validateLevelIsInRange(level);
        const range = level.max - level.min;
        const width = (range / (max - min)) * 100;

        return (
          <span
            key={index}
            style={{ width: `${width}%` }}
            className={`ouiRangeLevel ouiRangeLevel--${level.color}`}
          />
        );
      })}
    </div>
  );
};
