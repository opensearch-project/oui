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
import {
  requiredProps,
  startThrowingReactWarnings,
  stopThrowingReactWarnings,
} from '../../test';

import {
  OuiFlexItem,
  GROW_SIZES,
  SHRINK_SIZES,
  BASIS_VALUES,
} from './flex_item';

beforeAll(startThrowingReactWarnings);
afterAll(stopThrowingReactWarnings);

describe('OuiFlexItem', () => {
  test('is rendered', () => {
    const component = render(<OuiFlexItem {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  // Grow Values Only
  describe('grow', () => {
    GROW_SIZES.concat([true, false]).forEach((value) => {
      test(`${value} is rendered`, () => {
        const component = render(<OuiFlexItem grow={value} />);

        expect(component).toMatchSnapshot();
      });
    });
  });

  // Shrink Values Only
  describe('shrink', () => {
    SHRINK_SIZES.forEach((value) => {
      test(`${value} is rendered`, () => {
        const component = render(<OuiFlexItem shrink={value} />);

        expect(component).toMatchSnapshot();
      });
    });
  });

  // Basis Values Only
  describe('basis', () => {
    BASIS_VALUES.forEach((value) => {
      test(`${value} is rendered`, () => {
        const component = render(<OuiFlexItem basis={value} />);

        expect(component).toMatchSnapshot();
      });
    });
  });

  // Grow and Basis Combination
  describe('grow and basis combination', () => {
    GROW_SIZES.concat([true, false]).forEach((growValue) => {
      BASIS_VALUES.forEach((basisValue) => {
        test(`grow: ${growValue} and basis: ${basisValue} is rendered`, () => {
          const component = render(
            <OuiFlexItem grow={growValue} basis={basisValue} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });

  // Grow and Shrink Combination
  describe('grow and shrink combination', () => {
    GROW_SIZES.concat([true, false]).forEach((growValue) => {
      SHRINK_SIZES.forEach((shrinkValue) => {
        test(`grow: ${growValue} and shrink: ${shrinkValue} is rendered`, () => {
          const component = render(
            <OuiFlexItem grow={growValue} shrink={shrinkValue} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });

  // Shrink and Basis Combination
  describe('shrink and basis combination', () => {
    SHRINK_SIZES.forEach((shrinkValue) => {
      BASIS_VALUES.forEach((basisValue) => {
        test(`shrink: ${shrinkValue} and basis: ${basisValue} is rendered`, () => {
          const component = render(
            <OuiFlexItem shrink={shrinkValue} basis={basisValue} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });

  // Grow, Shrink, and Basis Combination
  describe('grow, shrink, and basis combination', () => {
    GROW_SIZES.concat([true, false]).forEach((growValue) => {
      SHRINK_SIZES.forEach((shrinkValue) => {
        BASIS_VALUES.forEach((basisValue) => {
          test(`grow: ${growValue}, shrink: ${shrinkValue}, and basis: ${basisValue} is rendered`, () => {
            const component = render(
              <OuiFlexItem
                grow={growValue}
                shrink={shrinkValue}
                basis={basisValue}
              />
            );

            expect(component).toMatchSnapshot();
          });
        });
      });
    });
  });
});
