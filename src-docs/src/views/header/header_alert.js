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

import React, { useState } from 'react';

import {
  OuiAvatar,
  OuiFlexGroup,
  OuiFlexItem,
  OuiHeader,
  OuiHeaderLogo,
  OuiHeaderSectionItemButton,
  OuiIcon,
  OuiSpacer,
  OuiSwitch,
} from '../../../../src/components';

export default () => {
  const [position, setPosition] = useState('static');
  const [theme, setTheme] = useState('default');

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

  const renderLogo = (
    <OuiHeaderLogo
      iconType="logoOpenSearch"
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label="Navigate to home page"
    />
  );

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

  return (
    <>
      <OuiFlexGroup alignItems="center" gutterSize="m">
        <OuiFlexItem grow={false}>
          <OuiSwitch
            label={'Make header fixed position'}
            checked={position === 'fixed'}
            onChange={(e) => setPosition(e.target.checked ? 'fixed' : 'static')}
          />
        </OuiFlexItem>

        <OuiFlexItem grow={false}>
          <OuiSwitch
            label={'Change theme to dark'}
            checked={theme === 'dark'}
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'default')}
          />
        </OuiFlexItem>
      </OuiFlexGroup>

      <OuiSpacer />

      <OuiHeader sections={sections} position={position} theme={theme} />
    </>
  );
};
