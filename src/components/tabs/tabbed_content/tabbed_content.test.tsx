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
import { render, fireEvent } from '@testing-library/react';
import { requiredProps } from '../../../test';

import { OuiTabbedContent, AUTOFOCUS } from './tabbed_content';

const elasticsearchTab = {
  id: 'es',
  name: 'Elasticsearch',
  content: <p>Elasticsearch content</p>,
};

const kibanaTab = {
  id: 'kibana',
  name: <strong>Kibana</strong>,
  'data-test-subj': 'kibanaTab',
  content: <p>Kibana content</p>,
};

const tabs = [elasticsearchTab, kibanaTab];

describe('OuiTabbedContent', () => {
  test('is rendered with required props and tabs', () => {
    const { container } = render(
      <OuiTabbedContent {...requiredProps} tabs={tabs} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('onTabClick', () => {
      test('is called when a tab is clicked', () => {
        const onTabClickHandler = jest.fn();
        const { getByTestId } = render(
          <OuiTabbedContent onTabClick={onTabClickHandler} tabs={tabs} />
        );

        fireEvent.click(getByTestId('kibanaTab'));
        expect(onTabClickHandler).toHaveBeenCalledTimes(1);
        expect(onTabClickHandler).toHaveBeenCalledWith(kibanaTab);
      });
    });

    describe('selectedTab', () => {
      test('renders a selected tab', () => {
        const { container } = render(
          <OuiTabbedContent selectedTab={kibanaTab} tabs={tabs} />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('initialSelectedTab', () => {
      test('renders a selected tab', () => {
        const { container } = render(
          <OuiTabbedContent initialSelectedTab={kibanaTab} tabs={tabs} />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('size', () => {
      test('can be small', () => {
        const { container } = render(<OuiTabbedContent size="s" tabs={tabs} />);
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('display', () => {
      test('can be condensed', () => {
        const { container } = render(
          <OuiTabbedContent display="condensed" tabs={tabs} />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('autoFocus', () => {
      AUTOFOCUS.forEach((focusType) => {
        test(`${focusType} is rendered`, () => {
          const { container } = render(
            <OuiTabbedContent autoFocus={focusType} tabs={tabs} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('cacheContent', () => {
      test('content of tabs that has been selected before should stay in dom', () => {
        const { container } = render(
          <OuiTabbedContent preserveTabContent={true} tabs={tabs} />
        );
        expect(container.querySelectorAll('div[role="tabpanel"]').length).toBe(
          1
        );

        const kibanaTabButton = container.querySelector(
          'button[id="kibana"]'
        ) as HTMLButtonElement;
        fireEvent.click(kibanaTabButton);
        expect(container.querySelectorAll('div[role="tabpanel"]').length).toBe(
          2
        );
      });
    });
  });

  describe('behavior', () => {
    test("when selected tab state isn't controlled by the owner, select the first tab by default", () => {
      const { container } = render(<OuiTabbedContent tabs={tabs} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('when uncontrolled, the selected tab should update if it receives new content', () => {
      const tabs = [
        elasticsearchTab,
        {
          ...kibanaTab,
        },
      ];
      const { container, rerender } = render(<OuiTabbedContent tabs={tabs} />);

      const kibanaTabButton = container.querySelector(
        'button[id="kibana"]'
      ) as HTMLButtonElement;
      fireEvent.click(kibanaTabButton);

      rerender(
        <OuiTabbedContent
          tabs={[
            elasticsearchTab,
            {
              ...kibanaTab,
              content: <p>updated Kibana content</p>,
            },
          ]}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
