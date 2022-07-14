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

import { OuiPanel, SIZES, COLORS, BORDER_RADII } from './panel';

describe('OuiPanel', () => {
  test('is rendered', () => {
    const component = render(<OuiPanel {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('hasShadow', () => {
      test('can be false', () => {
        const component = render(<OuiPanel hasShadow={false} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('grow', () => {
      test('can be false', () => {
        const component = render(<OuiPanel grow={false} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('hasBorder', () => {
      test('can be false', () => {
        const component = render(<OuiPanel hasBorder={false} />);

        expect(component).toMatchSnapshot();
      });
      test('can be true', () => {
        const component = render(<OuiPanel hasBorder={true} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('paddingSize', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const component = render(<OuiPanel paddingSize={size} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const component = render(<OuiPanel color={color} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('borderRadius', () => {
      BORDER_RADII.forEach((borderRadius) => {
        test(`${borderRadius} is rendered`, () => {
          const component = render(<OuiPanel borderRadius={borderRadius} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
