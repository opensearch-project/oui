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
import { mount, render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { OuiCallOut, COLORS, HEADINGS } from './call_out';
import { findTestSubject } from '../../test';

describe('OuiCallOut', () => {
  test('is rendered', () => {
    const component = render(
      <OuiCallOut {...requiredProps}>Content</OuiCallOut>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('title', () => {
      it('is rendered', () => {
        const component = render(
          <OuiCallOut title="Title">Content</OuiCallOut>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const component = render(<OuiCallOut iconType="user" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const component = render(<OuiCallOut color={color} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('heading', () => {
      HEADINGS.forEach((heading) => {
        test(`${heading} is rendered`, () => {
          const component = render(<OuiCallOut heading={heading} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('dismissible', () => {
      it('is rendered when set to true', () => {
        const component = render(<OuiCallOut dismissible={true} />);

        expect(component).toMatchSnapshot();
      });

      it('is not rendered when in warning color', () => {
        const component = render(
          <OuiCallOut dismissible={true} color={'warning'} />
        );

        expect(component).toMatchSnapshot();
      });

      it('is not rendered when in danger color', () => {
        const component = render(
          <OuiCallOut dismissible={true} color={'danger'} />
        );

        expect(component).toMatchSnapshot();
      });

      it('close callout after click', () => {
        const component = mount(
          <OuiCallOut dismissible={true} title="This is a callout" />
        );
        expect(component).toMatchSnapshot();
        findTestSubject(component, 'closeCallOutButton').simulate('click');
        expect(component).toMatchSnapshot();
      });
    });
  });
});
