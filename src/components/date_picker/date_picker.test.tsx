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

import React from 'react';
import { render } from '@testing-library/react';
import { requiredProps } from '../../test';
import moment from 'moment';

import { OuiDatePicker } from './date_picker';
import { OuiContext } from '../context';

describe('OuiDatePicker', () => {
  test('is rendered', () => {
    const { container } = render(<OuiDatePicker {...requiredProps} />);

    expect(container).toMatchSnapshot();
  });

  describe('popoverPlacement', () => {
    test('top-end is rendered', () => {
      const { container } = render(
        <OuiDatePicker {...requiredProps} popoverPlacement="top-end" />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('localization', () => {
    const selectedDate = moment('2019-07-01T00:00:00-0700').locale('fr');

    test('accepts the locale prop', () => {
      const { container } = render(
        <OuiDatePicker
          {...requiredProps}
          inline
          selected={selectedDate}
          locale="ko"
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('inherits locale from context', () => {
      const { container } = render(
        <OuiContext i18n={{ locale: 'fr' }}>
          <OuiDatePicker {...requiredProps} inline selected={selectedDate} />
        </OuiContext>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
