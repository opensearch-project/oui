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

import React, { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

export type OuiBeaconProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  CommonProps & {
    /**
     * Height and width of the center circle. Value is passed directly to the `style` attribute
     */
    size?: number | string;
  };

export const OuiBeacon: FunctionComponent<OuiBeaconProps> = ({
  className,
  size = 12,
  style,
  ...rest
}) => {
  const classes = classNames('ouiBeacon', className);

  const styles = {
    ...style,
    height: size,
    width: size,
  };

  return <div className={classes} style={styles} {...rest} />;
};
