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
import { OuiI18n } from '../../../i18n';
import { OuiFlexGrid, OuiFlexItem } from '../../../flex';
import { OuiTitle } from '../../../title';
import { OuiLink } from '../../../link';
import { OuiHorizontalRule } from '../../../horizontal_rule';
import { htmlIdGenerator } from '../../../../services';
import { DurationRange, ApplyTime } from '../../types';

const generateId = htmlIdGenerator();

export interface OuiCommonlyUsedTimeRangesProps {
  applyTime: ApplyTime;
  commonlyUsedRanges: DurationRange[];
}

export const OuiCommonlyUsedTimeRanges: FunctionComponent<OuiCommonlyUsedTimeRangesProps> = ({
  applyTime,
  commonlyUsedRanges,
}) => {
  const legendId = generateId();
  const links = commonlyUsedRanges.map(({ start, end, label }) => {
    const applyCommonlyUsed = () => {
      applyTime({ start, end });
    };
    const dataTestSubj = label
      ? `superDatePickerCommonlyUsed_${label.replace(' ', '_')}`
      : undefined;
    return (
      <OuiFlexItem
        key={label}
        component="li"
        className="ouiQuickSelectPopover__sectionItem">
        <OuiLink onClick={applyCommonlyUsed} data-test-subj={dataTestSubj}>
          {label}
        </OuiLink>
      </OuiFlexItem>
    );
  });

  return (
    <fieldset>
      <OuiTitle size="xxxs">
        <legend id={legendId}>
          <OuiI18n
            token="ouiCommonlyUsedTimeRanges.legend"
            default="Commonly used"
          />
        </legend>
      </OuiTitle>
      <div className="ouiQuickSelectPopover__section">
        <OuiFlexGrid
          aria-labelledby={legendId}
          gutterSize="s"
          columns={2}
          direction="column"
          responsive={false}
          component="ul">
          {links}
        </OuiFlexGrid>
      </div>
      <OuiHorizontalRule margin="s" />
    </fieldset>
  );
};

OuiCommonlyUsedTimeRanges.displayName = 'OuiCommonlyUsedTimeRanges';
