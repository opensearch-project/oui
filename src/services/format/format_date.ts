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

import { isNil, isFunction, isString } from '../predicate';
import moment from 'moment';

type CalendarOptions = moment.CalendarSpec & {
  refTime?: moment.MomentInput;
};

const calendar = (value: moment.MomentInput, options: CalendarOptions = {}) => {
  const refTime = options.refTime;
  return moment(value).calendar(refTime, options);
};

export const dateFormatAliases = {
  date: 'D MMM YYYY',
  longDate: 'DD MMMM YYYY',
  shortDate: 'D MMM YY',
  dateTime: 'D MMM YYYY HH:mm',
  longDateTime: 'DD MMMM YYYY HH:mm:ss',
  shortDateTime: 'D MMM YY HH:mm',
  dobShort: 'Do MMM YY',
  dobLong: 'Do MMMM YYYY',
  iso8601: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  calendar,
  calendarDateTime: (
    value: moment.MomentInput,
    options: moment.CalendarSpec
  ) => {
    return calendar(value, {
      sameDay: '[Today at] H:mmA',
      nextDay: '[Tomorrow at] H:mmA',
      nextWeek: 'dddd [at] H:mmA',
      lastDay: '[Yesterday at] H:mmA',
      lastWeek: '[Last] dddd [at] H:mmA',
      sameElse: 'Do MMM YYYY [at] H:mmA',
      ...options,
    });
  },
  calendarDate: (value: moment.MomentInput, options: moment.CalendarSpec) => {
    return calendar(value, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'Do MMM YYYY',
      ...options,
    });
  },
};

type DateFormat = keyof typeof dateFormatAliases;

interface FormatDateConfig {
  format: DateFormat;
  nil: string;
  options: any;
}

function isStringADateFormat(x: string): x is DateFormat {
  return dateFormatAliases.hasOwnProperty(x);
}

function instanceOfFormatDateConfig(x: any): x is Partial<FormatDateConfig> {
  return (
    typeof x === 'object' &&
    (x.hasOwnProperty('format') ||
      x.hasOwnProperty('nil') ||
      x.hasOwnProperty('options'))
  );
}

export const formatDate: (
  value?: moment.MomentInput,
  dateFormatKeyOrConfig?: DateFormat | string | Partial<FormatDateConfig>
) => string = (value, dateFormatKeyOrConfig = 'dateTime') => {
  if (isString(dateFormatKeyOrConfig)) {
    if (isNil(value)) {
      return '';
    }

    const dateFormatStrOrFunc = isStringADateFormat(dateFormatKeyOrConfig)
      ? dateFormatAliases[dateFormatKeyOrConfig]
      : dateFormatKeyOrConfig;

    if (isFunction(dateFormatStrOrFunc)) {
      return dateFormatStrOrFunc(value, {});
    }

    if (isString(dateFormatStrOrFunc)) {
      return moment(value).format(dateFormatStrOrFunc);
    }
  }

  if (instanceOfFormatDateConfig(dateFormatKeyOrConfig)) {
    const { format = 'dateTime', nil = '', options } = dateFormatKeyOrConfig;

    const dateFormat = dateFormatAliases[format] || format;

    if (isNil(value)) {
      return nil;
    }

    if (isFunction(dateFormat)) {
      return dateFormat(value, options);
    }

    if (isString(dateFormat)) {
      return moment(value).format(dateFormat);
    }
  }

  throw new Error(
    `Failed to format value using dateFormatKeyOrConfig: ${dateFormatKeyOrConfig}`
  );
};
