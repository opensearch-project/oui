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
import { render } from '@testing-library/react';
import { requiredProps } from '../../test/required_props';

import { OuiAvatar, SIZES } from './avatar';

describe('OuiAvatar', () => {
  test('is rendered', () => {
    const { container } = render(<OuiAvatar name="name" {...requiredProps} />);

    expect(container).toMatchSnapshot();
  });

  test('allows a name composed entirely of whitespace', () => {
    const { container } = render(<OuiAvatar name="  " {...requiredProps} />);

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    describe('imageUrl', () => {
      it('is rendered', () => {
        const { container } = render(
          <OuiAvatar name="name" imageUrl="image url" />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const { container } = render(<OuiAvatar name="name" iconType="bolt" />);

        expect(container).toMatchSnapshot();
      });

      it('and iconSize is rendered', () => {
        const { container } = render(
          <OuiAvatar name="name" iconType="bolt" iconSize="xl" />
        );

        expect(container).toMatchSnapshot();
      });

      it('and iconColor is rendered', () => {
        const { container } = render(
          <OuiAvatar name="name" iconType="bolt" iconColor="primary" />
        );

        expect(container).toMatchSnapshot();
      });

      it('and iconColor as null is rendered', () => {
        const { container } = render(
          <OuiAvatar name="name" iconType="bolt" iconColor={null} />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        it(`${size} is rendered`, () => {
          const { container } = render(<OuiAvatar name="name" size={size} />);

          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('initials', () => {
      it('is rendered', () => {
        const { container } = render(<OuiAvatar name="name" initials="lo" />);

        expect(container).toMatchSnapshot();
      });
    });

    describe('initialsLength', () => {
      it('is rendered', () => {
        const { container } = render(
          <OuiAvatar name="name" initialsLength={2} />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('type', () => {
      it('is rendered', () => {
        const { container } = render(<OuiAvatar name="name" type="space" />);

        expect(container).toMatchSnapshot();
      });
    });

    describe('color', () => {
      it('as string is rendered', () => {
        const { container } = render(<OuiAvatar name="name" color="#000" />);

        expect(container).toMatchSnapshot();
      });

      it('as null is rendered', () => {
        const { container } = render(<OuiAvatar name="name" color={null} />);

        expect(container).toMatchSnapshot();
      });

      it('as plain is rendered', () => {
        const { container } = render(<OuiAvatar name="name" color="plain" />);

        expect(container).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      it('is rendered', () => {
        const { container } = render(
          <OuiAvatar name="name" isDisabled={true} />
        );

        expect(container).toMatchSnapshot();
      });
    });
  });

  test('should throw error if color is not a hex', () => {
    const renderComponent = () =>
      render(<OuiAvatar name="name" color="rgba(0,0,0,0)" />);

    expect(renderComponent).toThrowErrorMatchingSnapshot();
  });
});
