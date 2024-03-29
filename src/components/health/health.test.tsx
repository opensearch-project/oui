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
import { TEXT_SIZES, OuiHealth } from './health';
import { COLORS } from '../icon/icon';

describe('OuiHealth', () => {
  test('is rendered', () => {
    const component = render(<OuiHealth {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('textSize', () => {
      TEXT_SIZES.forEach((textSize) => {
        test(`${textSize} is rendered`, () => {
          const component = render(
            <OuiHealth textSize={textSize} color="success" />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('color', () => {
      [...COLORS, '#000000'].forEach((color) => {
        it(`${color} is rendered`, () => {
          const component = render(<OuiHealth color={color} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
