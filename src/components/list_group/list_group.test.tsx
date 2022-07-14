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

import { OuiListGroup, GUTTER_SIZES } from './list_group';
import { OuiListGroupItemProps } from './list_group_item';

const someListItems: OuiListGroupItemProps[] = [
  {
    label: 'Label with iconType',
    iconType: 'stop',
  },
  {
    label: 'Custom extra action',
    extraAction: {
      iconType: 'bell',
      alwaysShow: true,
      'aria-label': 'bell',
    },
  },
  {
    label: 'Button with onClick',
    onClick: (e) => {
      console.log('Visualize clicked', e);
    },
  },
  {
    label: 'Active link',
    isActive: true,
    href: '#',
  },
  {
    label: 'Link with href',
    href: '#',
  },
];

describe('OuiListGroup', () => {
  test('is rendered', () => {
    const component = render(<OuiListGroup {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('listItems', () => {
    test('is rendered', () => {
      const component = render(<OuiListGroup listItems={someListItems} />);

      expect(component).toMatchSnapshot();
    });

    test('is rendered with color', () => {
      const component = render(
        <OuiListGroup color="primary" listItems={someListItems} />
      );

      expect(component).toMatchSnapshot();
    });

    test('is rendered with size', () => {
      const component = render(<OuiListGroup color="primary" size="xs" />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('props', () => {
    test('bordered is rendered', () => {
      const component = render(<OuiListGroup bordered />);

      expect(component).toMatchSnapshot();
    });

    test('flush is rendered', () => {
      const component = render(<OuiListGroup flush />);

      expect(component).toMatchSnapshot();
    });

    test('showToolTips is rendered', () => {
      const component = render(<OuiListGroup showToolTips />);

      expect(component).toMatchSnapshot();
    });

    test('wrapText is rendered', () => {
      const component = render(<OuiListGroup wrapText />);

      expect(component).toMatchSnapshot();
    });

    describe('gutter size', () => {
      GUTTER_SIZES.forEach((gutter) => {
        test(`${gutter} is rendered`, () => {
          const component = render(<OuiListGroup gutterSize={gutter} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('maxWidth', () => {
      test('as true is rendered', () => {
        const component = render(<OuiListGroup maxWidth={true} />);

        expect(component).toMatchSnapshot();
      });

      test('as a number is rendered', () => {
        const component = render(<OuiListGroup maxWidth={300} />);

        expect(component).toMatchSnapshot();
      });

      test('as a string is rendered', () => {
        const component = render(<OuiListGroup maxWidth="20em" />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
