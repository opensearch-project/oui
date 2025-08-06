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

import React, { useState, useEffect } from 'react';
import { mount, render } from 'enzyme';
import html from 'html';
import { renderTestElement, act } from '../../test/react_test_utils';
import { requiredProps } from '../../test/required_props';

import { OuiCodeBlock } from './code_block';
import { FONT_SIZES, PADDING_SIZES } from './_code_block';

const code = `var some = 'code';
console.log(some);`;

describe('OuiCodeBlock', () => {
  test('renders a code block', () => {
    const component = render(
      <OuiCodeBlock {...requiredProps}>{code}</OuiCodeBlock>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('transparentBackground', () => {
      it('is rendered', () => {
        const component = render(
          <OuiCodeBlock transparentBackground>{code}</OuiCodeBlock>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isCopyable', () => {
      it('is rendered', () => {
        const component = mount(<OuiCodeBlock isCopyable>{code}</OuiCodeBlock>);

        expect(component).toMatchSnapshot();
      });
    });

    describe('overflowHeight', () => {
      it('is rendered', () => {
        const component = render(
          <OuiCodeBlock overflowHeight={200}>{code}</OuiCodeBlock>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('language', () => {
      it('is rendered', () => {
        const component = render(
          <OuiCodeBlock language="html">{code}</OuiCodeBlock>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('fontSize', () => {
      FONT_SIZES.forEach((fontSize) => {
        test(`${fontSize} is rendered`, () => {
          const component = render(
            <OuiCodeBlock fontSize={fontSize}>{code}</OuiCodeBlock>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('paddingSize', () => {
      PADDING_SIZES.forEach((paddingSize) => {
        test(`${paddingSize} is rendered`, () => {
          const component = render(
            <OuiCodeBlock paddingSize={paddingSize}>{code}</OuiCodeBlock>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });

  describe('dynamic content', () => {
    it('updates DOM when input changes', (done) => {
      expect.assertions(2);

      const { container } = renderTestElement(<App />, {
        attachToDocument: false,
      });

      function takeSnapshot() {
        expect(
          html.prettyPrint(container.innerHTML, {
            indent_size: 2,
            unformatted: [], // Expand all tags, including spans
          })
        ).toMatchSnapshot();
      }

      function App() {
        const [value, setValue] = useState('State 1');

        useEffect(() => {
          // Wait a tick for OuiCodeBlock internal state to update on render
          setTimeout(() => {
            takeSnapshot();
            act(() => {
              setValue('State 2');
            });
          });
        }, []);

        useEffect(() => {
          if (value === 'State 2') {
            takeSnapshot();
            done();
          }
        }, [value]);

        return (
          <div>
            <OuiCodeBlock language="javascript">
              const value = &apos;{value}&apos;
            </OuiCodeBlock>
          </div>
        );
      }
    });

    it('displays content in fullscreen mode', () => {
      const component = mount(
        <OuiCodeBlock language="javascript" overflowHeight={300}>
          const value = &quot;hello&quot;
        </OuiCodeBlock>
      );

      component.find('OuiButtonIcon[iconType="fullScreen"]').simulate('click');
      component.update();

      expect(component.find('.ouiCodeBlock-isFullScreen').text()).toBe(
        'const value = "hello"'
      );
    });
  });
});
