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
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { OuiFilterButton } from './filter_button';

describe('OuiFilterButton', () => {
  test('is rendered', () => {
    const component = render(<OuiFilterButton {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('renders zero properly', () => {
    const component = render(
      <OuiFilterButton {...requiredProps} numFilters={0} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('iconType and iconSide', () => {
      it('is rendered', () => {
        const component = render(
          <OuiFilterButton iconType="user" iconSide="right" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('numFilters', () => {
      it('is rendered', () => {
        const component = render(<OuiFilterButton numFilters={5} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('numActiveFilters and hasActiveFilters', () => {
      it('is rendered', () => {
        const component = render(
          <OuiFilterButton numActiveFilters={5} hasActiveFilters />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isSelected', () => {
      it('is rendered', () => {
        const component = render(<OuiFilterButton isSelected />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      it('is rendered', () => {
        const component = render(<OuiFilterButton isDisabled />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('type', () => {
      it('is rendered', () => {
        const component = render(<OuiFilterButton type="button" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('grow', () => {
      it('can be turned off', () => {
        const component = render(<OuiFilterButton grow={false} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('withNext', () => {
      it('is rendered', () => {
        const component = render(<OuiFilterButton withNext />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
