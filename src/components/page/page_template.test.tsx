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

import { OuiPageTemplate, TEMPLATES } from './page_template';

describe('OuiPageTemplate', () => {
  test('is rendered', () => {
    const component = render(<OuiPageTemplate {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('restrict width', () => {
    test('can be turned off', () => {
      const component = render(<OuiPageTemplate restrictWidth={false} />);

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom number', () => {
      const component = render(<OuiPageTemplate restrictWidth={1024} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('template', () => {
    TEMPLATES.forEach((template) => {
      describe(`${template}`, () => {
        it('is rendered', () => {
          const component = render(<OuiPageTemplate template={template} />);

          expect(component).toMatchSnapshot();
        });

        it('paddingSize is rendered', () => {
          const component = render(
            <OuiPageTemplate template={template} paddingSize="none" />
          );

          expect(component).toMatchSnapshot();
        });

        it('minHeight is rendered', () => {
          const component = render(
            <OuiPageTemplate template={template} minHeight="40vh" />
          );

          expect(component).toMatchSnapshot();
        });

        it('style is rendered', () => {
          const component = render(
            <OuiPageTemplate
              template={template}
              style={{ maxHeight: '100vh' }}
            />
          );

          expect(component).toMatchSnapshot();
        });

        describe('with pageSideBar', () => {
          test('is rendered', () => {
            const component = render(
              <OuiPageTemplate template={template} pageSideBar="Side Bar" />
            );

            expect(component).toMatchSnapshot();
          });

          test('is rendered with pageSideBarProps', () => {
            const component = render(
              <OuiPageTemplate
                template={template}
                pageSideBar="Side Bar"
                pageSideBarProps={requiredProps}
              />
            );

            expect(component).toMatchSnapshot();
          });
        });

        test('is rendered with pageHeader', () => {
          const component = render(
            <OuiPageTemplate
              template={template}
              pageHeader={{
                title: 'Page title',
                ...requiredProps,
              }}
            />
          );

          expect(component).toMatchSnapshot();
        });

        test('is rendered with pageBodyProps', () => {
          const component = render(
            <OuiPageTemplate
              template={template}
              pageBodyProps={requiredProps}
            />
          );

          expect(component).toMatchSnapshot();
        });

        test('is rendered with pageContentProps', () => {
          const component = render(
            <OuiPageTemplate
              template={template}
              pageContentProps={requiredProps}
            />
          );

          expect(component).toMatchSnapshot();
        });

        test('is rendered with pageContentBodyProps', () => {
          const component = render(
            <OuiPageTemplate
              template={template}
              pageContentBodyProps={requiredProps}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });

  describe('with bottomBar', () => {
    test('is rendered', () => {
      const component = render(
        <OuiPageTemplate
          bottomBar="Bottom Bar"
          bottomBarProps={{ paddingSize: 'none' }}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('fullHeight', () => {
    test('is rendered with true', () => {
      const component = render(<OuiPageTemplate fullHeight={true} />);

      expect(component).toMatchSnapshot();
    });

    test('is rendered with noscroll', () => {
      const component = render(<OuiPageTemplate fullHeight={'noscroll'} />);

      expect(component).toMatchSnapshot();
    });
  });
});
