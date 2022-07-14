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
import { requiredProps } from '../../../test/required_props';

import { OuiSelectableListItem } from './selectable_list_item';

describe('OuiSelectableListItem', () => {
  test('is rendered', () => {
    const component = render(<OuiSelectableListItem {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('checked is on', () => {
      const component = render(<OuiSelectableListItem checked="on" />);

      expect(component).toMatchSnapshot();
    });

    test('checked is off', () => {
      const component = render(<OuiSelectableListItem checked="off" />);

      expect(component).toMatchSnapshot();
    });

    test('showIcons can be turned off', () => {
      const component = render(<OuiSelectableListItem showIcons={false} />);

      expect(component).toMatchSnapshot();
    });

    test('isFocused', () => {
      const component = render(<OuiSelectableListItem isFocused />);

      expect(component).toMatchSnapshot();
    });

    test('disabled', () => {
      const component = render(<OuiSelectableListItem disabled />);

      expect(component).toMatchSnapshot();
    });

    test('prepend', () => {
      const component = render(<OuiSelectableListItem prepend={<span />} />);

      expect(component).toMatchSnapshot();
    });

    test('append', () => {
      const component = render(<OuiSelectableListItem append={<span />} />);

      expect(component).toMatchSnapshot();
    });

    describe('onFocusBadge', () => {
      test('can be true', () => {
        const component = render(<OuiSelectableListItem onFocusBadge={true} />);

        expect(component).toMatchSnapshot();
      });

      test('can be custom', () => {
        const component = render(
          <OuiSelectableListItem
            onFocusBadge={{
              children: 'Custom',
              iconType: 'bolt',
            }}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
