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

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';
import { OuiSimplifiedBreadcrumbs } from './simplified_breadcrumbs';

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

describe('OuiSimplifiedBreadcrumbs', () => {
  test('is rendered', () => {
    const component = render(
      <OuiSimplifiedBreadcrumbs {...requiredProps} breadcrumbs={breadcrumbs} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('responsive', () => {
      test('is rendered', () => {
        const component = render(
          <OuiSimplifiedBreadcrumbs breadcrumbs={breadcrumbs} responsive />
        );
        expect(component).toMatchSnapshot();
      });

      test('is rendered as false', () => {
        const component = render(
          <OuiSimplifiedBreadcrumbs
            breadcrumbs={breadcrumbs}
            responsive={false}
          />
        );
        expect(component).toMatchSnapshot();
      });

      test('is rendered with custom breakpoints', () => {
        const component = render(
          <OuiSimplifiedBreadcrumbs
            breadcrumbs={breadcrumbs}
            responsive={{ xs: 1, s: 1, m: 1, l: 1, xl: 1 }}
          />
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('truncate as false', () => {
      test('is rendered', () => {
        const component = render(
          <OuiSimplifiedBreadcrumbs
            breadcrumbs={breadcrumbs}
            truncate={false}
          />
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('max', () => {
      test('renders 1 item', () => {
        const component = render(
          <OuiSimplifiedBreadcrumbs breadcrumbs={breadcrumbs} max={1} />
        );
        expect(component).toMatchSnapshot();
      });

      test('renders all items with null', () => {
        const component = render(
          <OuiSimplifiedBreadcrumbs breadcrumbs={breadcrumbs} max={null} />
        );
        expect(component).toMatchSnapshot();
      });

      test("doesn't break when max exceeds the number of breadcrumbs", () => {
        const component = render(
          <OuiSimplifiedBreadcrumbs breadcrumbs={breadcrumbs} max={20} />
        );
        expect(component).toMatchSnapshot();
      });
    });
  });
});
