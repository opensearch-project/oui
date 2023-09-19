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

import {
  ALIGN_ITEMS,
  OuiPageHeaderContent,
  OuiPageHeaderContentProps,
} from './page_header_content';

const tabs: OuiPageHeaderContentProps['tabs'] = [
  {
    label: 'Tab 1',
    isSelected: true,
  },
  {
    label: 'Tab 2',
  },
];

const rightSideItems: OuiPageHeaderContentProps['rightSideItems'] = [
  <button>Button 1</button>,
  <button>Button 2</button>,
];

describe('OuiPageHeaderContent', () => {
  test('is rendered', () => {
    const component = render(<OuiPageHeaderContent {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('pageTitle', () => {
      test('is rendered', () => {
        const component = render(
          <OuiPageHeaderContent pageTitle="Page title" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('tabs', () => {
      test('is rendered', () => {
        const component = render(<OuiPageHeaderContent tabs={tabs} />);

        expect(component).toMatchSnapshot();
      });

      test('is rendered with tabsProps', () => {
        const component = render(
          <OuiPageHeaderContent tabs={tabs} tabsProps={requiredProps} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('children', () => {
      test('is rendered', () => {
        const component = render(
          <OuiPageHeaderContent>
            <p>Anything</p>
          </OuiPageHeaderContent>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('description', () => {
      test('is rendered', () => {
        const component = render(
          <OuiPageHeaderContent description="Description" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('rightSideItems', () => {
      test('is rendered', () => {
        const component = render(
          <OuiPageHeaderContent rightSideItems={rightSideItems} />
        );

        expect(component).toMatchSnapshot();
      });

      test('is rendered with rightSideGroupProps', () => {
        const component = render(
          <OuiPageHeaderContent
            rightSideItems={rightSideItems}
            rightSideGroupProps={{ responsive: true, ...requiredProps }}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('children', () => {
      test('is rendered', () => {
        const component = render(
          <OuiPageHeaderContent>Child</OuiPageHeaderContent>
        );

        expect(component).toMatchSnapshot();
      });

      test('is rendered even if content props are passed', () => {
        const component = render(
          <OuiPageHeaderContent
            pageTitle="Page title"
            tabs={tabs}
            rightSideItems={rightSideItems}>
            Child
          </OuiPageHeaderContent>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('alignItems', () => {
      ALIGN_ITEMS.forEach((alignment) => {
        it(`${alignment} is rendered`, () => {
          const component = render(
            <OuiPageHeaderContent
              pageTitle="Page title"
              rightSideItems={rightSideItems}
              alignItems={alignment}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('responsive', () => {
      test('is rendered as false', () => {
        const component = render(<OuiPageHeaderContent responsive={false} />);

        expect(component).toMatchSnapshot();
      });

      test('is rendered as reverse', () => {
        const component = render(
          <OuiPageHeaderContent responsive={'reverse'} />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
