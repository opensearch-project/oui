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
 * This demo has been simplified to showcase just the buttons within sections.
 * See the main example for all the menu items.
 */

import React from 'react';

import {
  OuiHeader,
  OuiHeaderLogo,
  OuiHeaderSectionItemButton,
  OuiIcon,
  OuiAvatar,
} from '../../../../src/components';

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
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      text: 'Users',
      href: '#',
      onClick: (e) => {
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
      borders: 'right',
      breadcrumbs: breadcrumbs,
      breadcrumbProps: {
        'aria-label': 'Header sections breadcrumbs',
      },
    },
    {
      items: [renderSearch, renderUser, renderApps],
    },
  ];

  return <OuiHeader sections={sections} />;
};
