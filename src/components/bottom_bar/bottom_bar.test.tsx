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
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { keysOf } from '../common';
import { requiredProps } from '../../test';

import {
  OuiBottomBar,
  paddingSizeToClassNameMap,
  POSITIONS,
} from './bottom_bar';

// @ts-ignore TODO: Temporary hack which we can remove once react-test-renderer supports portals.
// More info at https://github.com/facebook/react/issues/11565.
ReactDOM.createPortal = (children) => {
  // hack to make enzyme treat the portal as a fragment
  if (children == null) return [['nested']];
  return children;
};

describe('OuiBottomBar', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiBottomBar {...requiredProps}>Content</OuiBottomBar>
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    describe('paddingSize', () => {
      keysOf(paddingSizeToClassNameMap).forEach((paddingSize) => {
        test(`${paddingSize} is rendered`, () => {
          const { container } = render(
            <OuiBottomBar paddingSize={paddingSize} />
          );

          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('position', () => {
      POSITIONS.forEach((position) => {
        test(`${position} is rendered`, () => {
          const { container } = render(<OuiBottomBar position={position} />);

          expect(container).toMatchSnapshot();
        });
      });
    });

    test('landmarkHeading', () => {
      const { container } = render(
        <OuiBottomBar landmarkHeading="This should have been label" />
      );

      expect(container).toMatchSnapshot();
    });

    test('affordForDisplacement can be false', () => {
      const { container } = render(
        <OuiBottomBar affordForDisplacement={false} />
      );

      expect(container).toMatchSnapshot();
    });

    test('usePortal can be false', () => {
      const { container } = render(<OuiBottomBar usePortal={false} />);

      expect(container).toMatchSnapshot();
    });

    test('bodyClassName is rendered', () => {
      const { container } = render(
        <OuiBottomBar bodyClassName={'customClass'} />
      );

      expect(container).toMatchSnapshot();
      expect(document.body.classList.contains('customClass')).toBe(true);
    });

    test('style is customized', () => {
      const { container } = render(<OuiBottomBar style={{ left: 12 }} />);

      expect(container).toMatchSnapshot();
    });

    test('position props are altered', () => {
      const { container } = render(
        <OuiBottomBar top={30} right={30} bottom={30} left={30} />
      );

      expect(container).toMatchSnapshot();
    });
  });
});
