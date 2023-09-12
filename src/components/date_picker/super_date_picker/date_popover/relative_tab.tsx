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

import React, { Component, ChangeEventHandler } from 'react';
import dateMath from '@opensearch/datemath';
import { toSentenceCase } from '../../../../services/string/to_case';
import { htmlIdGenerator } from '../../../../services';
import { OuiFlexGroup, OuiFlexItem } from '../../../flex';
import {
  OuiForm,
  OuiFormRow,
  OuiSelect,
  OuiFieldNumber,
  OuiFieldText,
  OuiSwitch,
  OuiFormLabel,
  OuiSwitchEvent,
} from '../../../form';
import { OuiSpacer } from '../../../spacer';

import { timeUnits } from '../time_units';
import { relativeOptions } from '../relative_options';
import {
  parseRelativeParts,
  toRelativeStringFromParts,
} from '../relative_utils';
import { OuiScreenReaderOnly } from '../../../accessibility';
import { OuiI18n } from '../../../i18n';
import { RelativeParts, TimeUnitId } from '../../types';
import { LocaleSpecifier } from 'moment'; // eslint-disable-line import/named
import { OuiDatePopoverContentProps } from './date_popover_content';

export interface OuiRelativeTabProps {
  dateFormat: string;
  locale?: LocaleSpecifier;
  value: string;
  onChange: OuiDatePopoverContentProps['onChange'];
  roundUp?: boolean;
  position: 'start' | 'end';
}

interface OuiRelativeTabState
  extends Pick<RelativeParts, 'unit' | 'round' | 'roundUnit'> {
  count: number | undefined;
  sentenceCasedPosition: string;
}

export class OuiRelativeTab extends Component<
  OuiRelativeTabProps,
  OuiRelativeTabState
> {
  state: OuiRelativeTabState = {
    ...parseRelativeParts(this.props.value),
    sentenceCasedPosition: toSentenceCase(this.props.position),
  };

  generateId = htmlIdGenerator();

  onCountChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const sanitizedValue = parseInt(event.target.value, 10);
    this.setState(
      {
        count: isNaN(sanitizedValue) ? undefined : sanitizedValue,
      },
      this.handleChange
    );
  };

  onUnitChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    this.setState(
      {
        unit: event.target.value,
      },
      this.handleChange
    );
  };

  onRoundChange = (event: OuiSwitchEvent) => {
    this.setState(
      {
        round: event.target.checked,
      },
      this.handleChange
    );
  };

  handleChange = () => {
    const { count, round, roundUnit, unit } = this.state;
    const { onChange } = this.props;
    if (count === undefined || count < 0) {
      return;
    }
    const date = toRelativeStringFromParts({
      count,
      round,
      roundUnit,
      unit,
    });
    onChange(date);
  };

  render() {
    const { count, unit } = this.state;
    const relativeDateInputNumberDescriptionId = this.generateId();
    const isInvalid = count === undefined || count < 0;
    const parsedValue = dateMath.parse(this.props.value, {
      roundUp: this.props.roundUp,
    });
    const formatedValue =
      isInvalid || !parsedValue || !parsedValue.isValid()
        ? ''
        : parsedValue
            .locale(this.props.locale || 'en')
            .format(this.props.dateFormat);
    return (
      <OuiForm className="ouiDatePopoverContent__padded">
        <OuiFlexGroup gutterSize="s" responsive={false}>
          <OuiFlexItem>
            <OuiI18n
              tokens={[
                'ouiRelativeTab.numberInputError',
                'ouiRelativeTab.numberInputLabel',
              ]}
              defaults={['Must be >= 0', 'Time span amount']}>
              {([numberInputError, numberInputLabel]: string[]) => (
                <OuiFormRow
                  isInvalid={isInvalid}
                  error={isInvalid ? numberInputError : null}>
                  <OuiFieldNumber
                    compressed
                    aria-label={numberInputLabel}
                    aria-describedby={relativeDateInputNumberDescriptionId}
                    data-test-subj={'superDatePickerRelativeDateInputNumber'}
                    value={count}
                    onChange={this.onCountChange}
                    isInvalid={isInvalid}
                  />
                </OuiFormRow>
              )}
            </OuiI18n>
          </OuiFlexItem>
          <OuiFlexItem>
            <OuiI18n
              token="ouiRelativeTab.unitInputLabel"
              default="Relative time span">
              {(unitInputLabel: string) => (
                <OuiSelect
                  compressed
                  aria-label={unitInputLabel}
                  data-test-subj={
                    'superDatePickerRelativeDateInputUnitSelector'
                  }
                  value={unit}
                  options={relativeOptions}
                  onChange={this.onUnitChange}
                />
              )}
            </OuiI18n>
          </OuiFlexItem>
        </OuiFlexGroup>
        <OuiSpacer size="m" />
        <OuiI18n
          token="ouiRelativeTab.roundingLabel"
          default="Round to the {unit}"
          values={{ unit: timeUnits[unit.substring(0, 1) as TimeUnitId] }}>
          {(roundingLabel: string) => (
            <OuiSwitch
              data-test-subj={'superDatePickerRelativeDateRoundSwitch'}
              label={roundingLabel}
              checked={this.state.round}
              onChange={this.onRoundChange}
            />
          )}
        </OuiI18n>

        <OuiSpacer size="m" />
        <OuiFieldText
          compressed
          value={formatedValue}
          readOnly
          prepend={
            <OuiFormLabel>
              <OuiI18n
                token="ouiRelativeTab.relativeDate"
                default="{position} date"
                values={{ position: this.state.sentenceCasedPosition }}
              />
            </OuiFormLabel>
          }
        />
        <OuiScreenReaderOnly>
          <p id={relativeDateInputNumberDescriptionId}>
            <OuiI18n
              token="ouiRelativeTab.fullDescription"
              default="The unit is changeable. Currently set to {unit}."
              values={{ unit }}
            />
          </p>
        </OuiScreenReaderOnly>
      </OuiForm>
    );
  }
}
