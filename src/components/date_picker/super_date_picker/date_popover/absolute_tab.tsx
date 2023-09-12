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

import moment, { Moment, LocaleSpecifier } from 'moment'; // eslint-disable-line import/named

import dateMath from '@opensearch/datemath';

import { OuiDatePicker, OuiDatePickerProps } from '../../date_picker';
import { OuiFormRow, OuiFieldText, OuiFormLabel } from '../../../form';
import { toSentenceCase } from '../../../../services/string/to_case';
import { OuiDatePopoverContentProps } from './date_popover_content';

export interface OuiAbsoluteTabProps {
  dateFormat: string;
  timeFormat: string;
  locale?: LocaleSpecifier;
  value: string;
  onChange: OuiDatePopoverContentProps['onChange'];
  roundUp: boolean;
  position: 'start' | 'end';
  utcOffset?: number;
}

interface OuiAbsoluteTabState {
  isTextInvalid: boolean;
  sentenceCasedPosition: string;
  textInputValue: string;
  valueAsMoment: Moment | null;
}

export class OuiAbsoluteTab extends Component<
  OuiAbsoluteTabProps,
  OuiAbsoluteTabState
> {
  state: OuiAbsoluteTabState;

  constructor(props: OuiAbsoluteTabProps) {
    super(props);

    const sentenceCasedPosition = toSentenceCase(props.position);

    const parsedValue = dateMath.parse(props.value, { roundUp: props.roundUp });
    const valueAsMoment =
      parsedValue && parsedValue.isValid() ? parsedValue : moment();

    const textInputValue = valueAsMoment
      .locale(this.props.locale || 'en')
      .format(this.props.dateFormat);

    this.state = {
      isTextInvalid: false,
      sentenceCasedPosition,
      textInputValue,
      valueAsMoment,
    };
  }

  handleChange: OuiDatePickerProps['onChange'] = (date, event) => {
    const { onChange } = this.props;
    if (date === null) {
      return;
    }
    onChange(date.toISOString(), event);

    const valueAsMoment = moment(date);
    this.setState({
      valueAsMoment,
      textInputValue: valueAsMoment.format(this.props.dateFormat),
      isTextInvalid: false,
    });
  };

  handleTextChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { onChange } = this.props;
    const valueAsMoment = moment(
      event.target.value,
      this.props.dateFormat,
      true
    );
    const dateIsValid = valueAsMoment.isValid();
    if (dateIsValid) {
      onChange(valueAsMoment.toISOString(), event);
    }
    this.setState({
      textInputValue: event.target.value,
      isTextInvalid: !dateIsValid,
      valueAsMoment: dateIsValid ? valueAsMoment : null,
    });
  };

  render() {
    const { dateFormat, timeFormat, locale, utcOffset } = this.props;
    const {
      valueAsMoment,
      isTextInvalid,
      textInputValue,
      sentenceCasedPosition,
    } = this.state;

    return (
      <div>
        <OuiDatePicker
          inline
          showTimeSelect
          shadow={false}
          selected={valueAsMoment}
          onChange={this.handleChange}
          dateFormat={dateFormat}
          timeFormat={timeFormat}
          locale={locale}
          utcOffset={utcOffset}
        />
        <OuiFormRow
          className="ouiSuperDatePicker__absoluteDateFormRow"
          isInvalid={isTextInvalid}
          error={isTextInvalid ? `Expected format ${dateFormat}` : undefined}>
          <OuiFieldText
            compressed
            isInvalid={isTextInvalid}
            value={textInputValue}
            onChange={this.handleTextChange}
            data-test-subj={'superDatePickerAbsoluteDateInput'}
            prepend={<OuiFormLabel>{sentenceCasedPosition} date</OuiFormLabel>}
          />
        </OuiFormRow>
      </div>
    );
  }
}
