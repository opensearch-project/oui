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

import { OuiSideNavItem } from './side_nav_item';

describe('OuiSideNavItem', () => {
  test('is rendered', () => {
    const component = render(
      <OuiSideNavItem>
        <button {...requiredProps} />
      </OuiSideNavItem>
    );

    expect(component).toMatchSnapshot();
  });

  test("preserves child's classes", () => {
    const component = render(
      <OuiSideNavItem>
        <button className="test" />
      </OuiSideNavItem>
    );

    expect(component).toMatchSnapshot();
  });

  test('can have truncation turned off', () => {
    const component = render(
      <OuiSideNavItem truncate={false}>Children</OuiSideNavItem>
    );

    expect(component).toMatchSnapshot();
  });

  test('can be emphasized', () => {
    const component = render(
      <OuiSideNavItem emphasize>Children</OuiSideNavItem>
    );

    expect(component).toMatchSnapshot();
  });

  test('can be disabled', () => {
    const component = render(
      <OuiSideNavItem disabled>Children</OuiSideNavItem>
    );

    expect(component).toMatchSnapshot();
  });

  describe('isSelected', () => {
    test('defaults to false', () => {
      const component = render(
        <OuiSideNavItem>
          <button />
        </OuiSideNavItem>
      );

      expect(component).toMatchSnapshot();
    });

    test('is rendered when specified as true', () => {
      const component = render(
        <OuiSideNavItem isSelected>
          <button />
        </OuiSideNavItem>
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('href', () => {
    test('is rendered', () => {
      const component = render(
        <OuiSideNavItem href="#">
          <button />
        </OuiSideNavItem>
      );

      expect(component).toMatchSnapshot();
    });

    test('is rendered with rel', () => {
      const component = render(
        <OuiSideNavItem href="#" rel="noopener">
          <button />
        </OuiSideNavItem>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
