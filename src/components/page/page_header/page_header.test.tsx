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
import { requiredProps } from '../../../test';

import { OuiPageHeader, OuiPageHeaderProps } from './page_header';
import { ALIGN_ITEMS } from './page_header_content';

export const tabs: OuiPageHeaderProps['tabs'] = [
  {
    label: 'Tab 1',
    isSelected: true,
  },
  {
    label: 'Tab 2',
  },
];

export const rightSideItems: OuiPageHeaderProps['rightSideItems'] = [
  <button>Button 1</button>,
  <button>Button 2</button>,
];

describe('OuiPageHeader', () => {
  test('is rendered', () => {
    const component = render(
      <OuiPageHeader {...requiredProps}>Anything</OuiPageHeader>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('page content props are passed down', () => {
      test('is rendered', () => {
        const component = render(
          <OuiPageHeader
            pageTitle="Page title"
            tabs={tabs}
            tabsProps={requiredProps}
            description="Description"
            rightSideItems={rightSideItems}
            rightSideGroupProps={{ responsive: true, ...requiredProps }}>
            <p>Anything</p>
          </OuiPageHeader>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('alignItems', () => {
      ALIGN_ITEMS.forEach((alignment) => {
        it(`${alignment} is rendered`, () => {
          const component = render(
            <OuiPageHeader
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
        const component = render(<OuiPageHeader responsive={false} />);

        expect(component).toMatchSnapshot();
      });

      test('is rendered as reverse', () => {
        const component = render(<OuiPageHeader responsive={'reverse'} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('restrictWidth', () => {
      test('is rendered as true', () => {
        const component = render(<OuiPageHeader restrictWidth={true} />);

        expect(component).toMatchSnapshot();
      });

      test('is rendered as custom', () => {
        const component = render(<OuiPageHeader restrictWidth={100} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
