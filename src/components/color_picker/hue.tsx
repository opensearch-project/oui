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
  ChangeEvent,
  InputHTMLAttributes,
  FunctionComponent,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { OuiScreenReaderOnly } from '../accessibility';
import { OuiI18n } from '../i18n';

const HUE_RANGE = 359;

export type OuiHueProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> &
  CommonProps & {
    hex?: string;
    hue?: string | number;
    onChange: (hue: number) => void;
  };

export const OuiHue: FunctionComponent<OuiHueProps> = ({
  className,
  hex,
  hue = 1,
  id,
  onChange,
  ...rest
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };
  const classes = classNames('ouiHue', className);
  return (
    <React.Fragment>
      <OuiScreenReaderOnly>
        <label htmlFor={`${id}-hue`}>
          <OuiI18n
            token="ouiHue.label"
            default="Select the HSV color mode 'hue' value"
          />
        </label>
      </OuiScreenReaderOnly>
      <OuiScreenReaderOnly>
        <p aria-live="polite">{hex}</p>
      </OuiScreenReaderOnly>
      <div className={classes}>
        <input
          id={`${id}-hue`}
          min={0}
          max={HUE_RANGE}
          step={1}
          type="range"
          className="ouiHue__range"
          value={hue}
          onChange={handleChange}
          {...rest}
        />
      </div>
    </React.Fragment>
  );
};
