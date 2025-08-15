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
import { requiredProps } from '../../test';

import { OuiBreadcrumbs } from './breadcrumbs';

const breadcrumbs = [
  {
    text: 'Animals',
    href: '#',
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      console.log('You clicked Animals');
    },
    'data-test-subj': 'breadcrumbsAnimals',
    className: 'customClass',
  },
  {
    text: 'Metazoans',
  },
  {
    text: 'Chordates',
  },
  {
    text:
      'Nebulosa subspecies is also a real mouthful, especially for creatures without mouths',
    truncate: true,
  },
  {
    text: 'Tetrapods',
  },
  {
    text: 'Reptiles',
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      console.log('You clicked Reptiles');
    },
  },
  {
    text: 'Boa constrictor',
    href: '#',
    truncate: true,
  },
  {
    text: 'Edit',
  },
];

describe('OuiBreadcrumbs', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiBreadcrumbs {...requiredProps} breadcrumbs={breadcrumbs} />
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    describe('responsive', () => {
      test('is rendered', () => {
        const { container } = render(
          <OuiBreadcrumbs breadcrumbs={breadcrumbs} responsive />
        );
        expect(container).toMatchSnapshot();
      });

      test('is rendered as false', () => {
        const { container } = render(
          <OuiBreadcrumbs breadcrumbs={breadcrumbs} responsive={false} />
        );
        expect(container).toMatchSnapshot();
      });

      test('is rendered with custom breakpoints', () => {
        const { container } = render(
          <OuiBreadcrumbs
            breadcrumbs={breadcrumbs}
            responsive={{ xs: 1, s: 1, m: 1, l: 1, xl: 1 }}
          />
        );
        expect(container).toMatchSnapshot();
      });
    });

    describe('truncate as false', () => {
      test('is rendered', () => {
        const { container } = render(
          <OuiBreadcrumbs breadcrumbs={breadcrumbs} truncate={false} />
        );
        expect(container).toMatchSnapshot();
      });
    });

    describe('max', () => {
      test('renders 1 item', () => {
        const { container } = render(
          <OuiBreadcrumbs breadcrumbs={breadcrumbs} max={1} />
        );
        expect(container).toMatchSnapshot();
      });

      test('renders all items with null', () => {
        const { container } = render(
          <OuiBreadcrumbs breadcrumbs={breadcrumbs} max={null} />
        );
        expect(container).toMatchSnapshot();
      });

      test("doesn't break when max exceeds the number of breadcrumbs", () => {
        const { container } = render(
          <OuiBreadcrumbs breadcrumbs={breadcrumbs} max={20} />
        );
        expect(container).toMatchSnapshot();
      });
    });
  });
});
