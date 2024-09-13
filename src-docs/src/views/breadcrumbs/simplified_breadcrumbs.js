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

import { OuiSimplifiedBreadcrumbs } from '../../../../src/components';

import { DisplayBreadCrumbsToggles } from './display_breadcrumbs_toggles';

export default () => {
  const breadcrumbs = [
    {
      text: 'Universe',
      href: '#',
    },
    {
      text: 'Observable Universe',
      href: '#',
    },
    {
      text: 'Pisces–Cetus Supercluster Complex',
      href: '#',
    },
    {
      text: 'Laniakea Supercluster',
      href: '#',
    },
    {
      text: 'Virgo Cluster',
      href: '#',
    },
    {
      text: 'Local Group',
      href: '#',
    },
    {
      text: 'Local Bubble',
      href: '#',
    },
    {
      text: 'Local Interstellar Cloud',
      href: '#',
    },
    {
      text: 'Milky Way Galaxy',
      href: '#',
    },
    {
      text: 'Orion Arm',
      href: '#',
    },
    {
      text: 'Solar System',
      href: '#',
    },
    {
      text: 'Geospace',
      href: '#',
    },
    {
      text: 'Earth',
      href: '#',
    },
  ];

  return (
    <DisplayBreadCrumbsToggles
      canHideLastBreadCrumb
      canHideTrailingSeparator
      canDisableTrailingLink>
      <OuiSimplifiedBreadcrumbs breadcrumbs={breadcrumbs} max={null} />
    </DisplayBreadCrumbsToggles>
  );
};
