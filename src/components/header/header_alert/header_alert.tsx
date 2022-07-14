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

import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';

import { OuiFlexGroup, OuiFlexItem } from '../../flex';
import { htmlIdGenerator } from '../../../services';

export type OuiHeaderAlertProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    /**
     * Adds a link to the alert.
     */
    action?: ReactNode;
    date: ReactNode;
    text?: ReactNode;
    title: ReactNode;
    /**
     * Accepts an `OuiBadge` that displays on the alert
     */
    badge?: ReactNode;
  };

export const OuiHeaderAlert: FunctionComponent<OuiHeaderAlertProps> = ({
  action,
  className,
  date,
  text,
  title,
  badge,
  ...rest
}) => {
  const classes = classNames('ouiHeaderAlert', className);

  const ariaId = htmlIdGenerator()();

  return (
    <article aria-labelledby={`${ariaId}-title`} className={classes} {...rest}>
      <OuiFlexGroup justifyContent="spaceBetween">
        <OuiFlexItem>
          <div className="ouiHeaderAlert__date">{date}</div>
        </OuiFlexItem>
        {badge && <OuiFlexItem grow={false}>{badge}</OuiFlexItem>}
      </OuiFlexGroup>

      <h3 id={`${ariaId}-title`} className="ouiHeaderAlert__title">
        {title}
      </h3>
      <div className="ouiHeaderAlert__text">{text}</div>
      {action && <div className="ouiHeaderAlert__action ouiLink">{action}</div>}
    </article>
  );
};
