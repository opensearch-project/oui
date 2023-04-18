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

/**
 * Docs note: Consuming apps should import the theme via the export json file
 * import theme from '@opensearch-project/oui/dist/oui_theme_light.json';
 */

import React from 'react';
import {
  OuiHeader,
  OuiHeaderLogo,
  OuiHeaderSectionItemButton,
} from '../../../../src/components/header';
import { OuiIcon } from '../../../../src/components/icon';
import { OuiAvatar } from '../../../../src/components/avatar';

export default () => {
  const renderLogo = (
    <OuiHeaderLogo
      iconType="logoOpenSearch"
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label="Navigate to home page"
    />
  );

  const breadcrumbs = [
    {
      text: 'Management',
      href: '#',
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
      },
    },
    {
      text: 'Users',
      href: '#',
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
      },
    },
    {
      text: 'Create',
    },
  ];

  const renderSearch = (
    <OuiHeaderSectionItemButton disabled aria-label="Sitewide search">
      <OuiIcon type="search" size="m" />
    </OuiHeaderSectionItemButton>
  );
  const renderUser = (
    <OuiHeaderSectionItemButton disabled aria-label="Account menu">
      <OuiAvatar isDisabled name="A. User" size="s" />
    </OuiHeaderSectionItemButton>
  );

  const renderApps = (
    <OuiHeaderSectionItemButton
      disabled
      aria-label="Apps menu with 3 new apps"
      notification="3">
      <OuiIcon type="apps" size="m" />
    </OuiHeaderSectionItemButton>
  );

  const sections = [
    {
      items: [renderLogo],
      borders: 'right' as const,
      breadcrumbs: breadcrumbs,
      breadcrumbProps: {
        'aria-label': 'Header sections breadcrumbs',
      },
    },
    {
      items: [renderSearch, renderUser, renderApps],
    },
  ];

  return <OuiHeader sections={sections} theme="dark" />;
};
