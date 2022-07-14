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

import { OuiTabbedContent, OuiTabbedContentProps } from '../../../tabs';
import { OuiText } from '../../../text';
import { OuiButton } from '../../../button';

import { OuiAbsoluteTab } from './absolute_tab';
import { OuiRelativeTab } from './relative_tab';

import {
  getDateMode,
  DATE_MODES,
  toAbsoluteString,
  toRelativeString,
} from '../date_modes';
import { LocaleSpecifier } from 'moment'; // eslint-disable-line import/named

export interface OuiDatePopoverContentProps {
  value: string;
  onChange(date: string | null, event?: React.SyntheticEvent<any>): void;
  roundUp?: boolean;
  dateFormat: string;
  timeFormat: string;
  locale?: LocaleSpecifier;
  position: 'start' | 'end';
  utcOffset?: number;
}

export const OuiDatePopoverContent: FunctionComponent<OuiDatePopoverContentProps> = ({
  value,
  roundUp = false,
  onChange,
  dateFormat,
  timeFormat,
  locale,
  position,
  utcOffset,
}) => {
  const onTabClick: OuiTabbedContentProps['onTabClick'] = (selectedTab) => {
    switch (selectedTab.id) {
      case DATE_MODES.ABSOLUTE:
        onChange(toAbsoluteString(value, roundUp));
        break;
      case DATE_MODES.RELATIVE:
        onChange(toRelativeString(value));
        break;
    }
  };

  const ariaLabel = `${position === 'start' ? 'Start' : 'End'} date:`;

  const renderTabs = [
    {
      id: DATE_MODES.ABSOLUTE,
      name: 'Absolute',
      content: (
        <OuiAbsoluteTab
          dateFormat={dateFormat}
          timeFormat={timeFormat}
          locale={locale}
          value={value}
          onChange={onChange}
          roundUp={roundUp}
          position={position}
          utcOffset={utcOffset}
        />
      ),
      'data-test-subj': 'superDatePickerAbsoluteTab',
      'aria-label': `${ariaLabel} Absolute`,
    },
    {
      id: DATE_MODES.RELATIVE,
      name: 'Relative',
      content: (
        <OuiRelativeTab
          dateFormat={dateFormat}
          locale={locale}
          value={toAbsoluteString(value, roundUp)}
          onChange={onChange}
          roundUp={roundUp}
          position={position}
        />
      ),
      'data-test-subj': 'superDatePickerRelativeTab',
      'aria-label': `${ariaLabel} Relative`,
    },
    {
      id: DATE_MODES.NOW,
      name: 'Now',
      content: (
        <OuiText
          size="s"
          color="subdued"
          className="ouiDatePopoverContent__padded--large">
          <p>
            Setting the time to &quot;now&quot; means that on every refresh this
            time will be set to the time of the refresh.
          </p>
          <OuiButton
            data-test-subj="superDatePickerNowButton"
            onClick={() => {
              onChange('now');
            }}
            fullWidth
            size="s"
            fill>
            Set {position} date and time to now
          </OuiButton>
        </OuiText>
      ),
      'data-test-subj': 'superDatePickerNowTab',
      'aria-label': `${ariaLabel} Now`,
    },
  ];

  const initialSelectedTab = renderTabs.find(
    (tab) => tab.id === getDateMode(value)
  );

  return (
    <OuiTabbedContent
      className="ouiDatePopoverContent"
      tabs={renderTabs}
      autoFocus="selected"
      initialSelectedTab={initialSelectedTab}
      onTabClick={onTabClick}
      size="s"
      expand
    />
  );
};

OuiDatePopoverContent.displayName = 'OuiDatePopoverContent';
