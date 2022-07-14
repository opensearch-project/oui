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
import { prettyDuration } from '../pretty_duration';

import { OuiI18n } from '../../../i18n';
import { htmlIdGenerator } from '../../../../services';
import { OuiTitle } from '../../../title';
import { OuiLink } from '../../../link';
import { OuiHorizontalRule } from '../../../horizontal_rule';
import { DurationRange, ApplyTime } from '../../types';

const generateId = htmlIdGenerator();

export interface OuiRecentlyUsedProps {
  applyTime: ApplyTime;
  commonlyUsedRanges: DurationRange[];
  dateFormat: string;
  recentlyUsedRanges?: DurationRange[];
}

export const OuiRecentlyUsed: FunctionComponent<OuiRecentlyUsedProps> = ({
  applyTime,
  commonlyUsedRanges,
  dateFormat,
  recentlyUsedRanges = [],
}) => {
  const legendId = generateId();

  if (recentlyUsedRanges.length === 0) {
    return null;
  }

  const links = recentlyUsedRanges.map(({ start, end }) => {
    const applyRecentlyUsed = () => {
      applyTime({ start, end });
    };
    return (
      <li
        className="ouiQuickSelectPopover__sectionItem"
        key={`${start}-${end}`}>
        <OuiLink onClick={applyRecentlyUsed}>
          {prettyDuration(start, end, commonlyUsedRanges, dateFormat)}
        </OuiLink>
      </li>
    );
  });

  return (
    <fieldset>
      <OuiTitle size="xxxs">
        <legend id={legendId}>
          <OuiI18n
            token="ouiRecentlyUsed.legend"
            default="Recently used date ranges"
          />
        </legend>
      </OuiTitle>
      <div className="ouiQuickSelectPopover__section">
        <ul>{links}</ul>
      </div>
      <OuiHorizontalRule margin="s" />
    </fieldset>
  );
};

OuiRecentlyUsed.displayName = 'OuiRecentlyUsed';
