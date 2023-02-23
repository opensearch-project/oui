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

import { OuiBreadcrumbs } from '../../../../src/components';

export default () => {
  const breadcrumbs = [
    {
      text: 'Animals',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      text: 'Metazoans',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      text: 'Chordates',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      text: 'Vertebrates',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      text: 'Tetrapods',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      text: 'Reptiles',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      text: 'Boa constrictor',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      text: 'Nebulosa subspecies',
    },
  ];

  return (
    <OuiBreadcrumbs
      max={4}
      breadcrumbs={breadcrumbs}
      aria-label="An example of OuiBreadcrumbs with specifying max prop"
    />
  );
};
