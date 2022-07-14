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
import { requiredProps } from '../../test/required_props';

import { OuiStep } from './step';
import { STATUS } from './step_number';

describe('OuiStep', () => {
  test('is rendered', () => {
    const component = render(
      <OuiStep {...requiredProps} title={'First step'}>
        <p>Do this</p>
      </OuiStep>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('headingElement', () => {
      const component = render(
        <OuiStep headingElement={'h3'} title={'First step'}>
          <p>Do this</p>
        </OuiStep>
      );

      expect(component).toMatchSnapshot();
    });

    test('step', () => {
      const component = render(
        <OuiStep step={5} title={'First step'}>
          <p>Do this</p>
        </OuiStep>
      );

      expect(component).toMatchSnapshot();
    });

    test('titleSize', () => {
      const component = render(
        <OuiStep titleSize="xs" title={'First step'}>
          <p>Do this</p>
        </OuiStep>
      );

      expect(component).toMatchSnapshot();
    });

    describe('status', () => {
      STATUS.forEach((status) => {
        test(`${status} is rendered`, () => {
          const component = render(
            <OuiStep status={status} title={'First step'}>
              <p>Do this</p>
            </OuiStep>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
