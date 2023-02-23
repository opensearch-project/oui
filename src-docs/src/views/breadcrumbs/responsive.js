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

import {
  OuiBreadcrumbs,
  OuiTitle,
  OuiSpacer,
} from '../../../../src/components';

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
    <>
      <OuiTitle size="xs">
        <span>Turning responsive completely off</span>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiBreadcrumbs
        responsive={false}
        breadcrumbs={breadcrumbs}
        max={null}
        aria-label="An example of non-responsive OuiBreadcrumbs"
      />
      <OuiSpacer />
      <OuiTitle size="xs">
        <span>Customizing number of items to display</span>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiBreadcrumbs
        responsive={{
          xs: 1,
          s: 3,
          m: 5,
          xl: 6,
        }}
        breadcrumbs={breadcrumbs}
        max={null}
        aria-label="An example of custom responsive OuiBreadcrumbs"
      />
    </>
  );
};
