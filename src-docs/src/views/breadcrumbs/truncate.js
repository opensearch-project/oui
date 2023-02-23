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
  OuiSpacer,
  OuiTitle,
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
      text:
        'Metazoans is a real mouthful, especially for creatures without mouths',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
      },
      truncate: true,
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
      text:
        'Nebulosa subspecies is also a real mouthful, especially for creatures without mouths',
    },
  ];

  return (
    <div>
      <OuiTitle size="xs">
        <span>Truncation on the entire set</span>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiBreadcrumbs
        truncate={true}
        breadcrumbs={breadcrumbs}
        aria-label="An example of OuiBreadcrumbs with truncate prop"
      />
      <OuiSpacer />
      <OuiTitle size="xs">
        <span>Truncation on a single item</span>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiBreadcrumbs
        truncate={false}
        breadcrumbs={breadcrumbs}
        aria-label="An example of OuiBreadcrumbs without truncate prop"
      />
    </div>
  );
};
