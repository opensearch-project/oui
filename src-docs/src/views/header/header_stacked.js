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

import React, { useState, useEffect } from 'react';

import {
  OuiHeader,
  OuiHeaderLogo,
  OuiHeaderSectionItemButton,
  OuiSwitch,
  OuiSpacer,
  OuiAvatar,
  OuiIcon,
} from '../../../../src/components';

export default () => {
  const [isFixed, setIsFixed] = useState(false);

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
    },
  ];

  useEffect(() => {
    if (isFixed) document.body.classList.add('ouiBody--headerIsFixed--double');

    return () => {
      document.body.classList.remove('ouiBody--headerIsFixed--double');
    };
  }, [isFixed]);

  const headers = (
    <>
      <OuiHeader
        theme="dark"
        position={isFixed ? 'fixed' : 'static'}
        sections={[
          {
            items: [
              <OuiHeaderLogo iconType="logoOpenSearch">OpenSearch</OuiHeaderLogo>,
            ],
            borders: 'none',
          },
          {
            items: [
              <OuiHeaderSectionItemButton aria-label="Account menu">
                <OuiAvatar name="A. User" size="s" />
              </OuiHeaderSectionItemButton>,
            ],
            borders: 'none',
          },
        ]}
      />
      <OuiHeader
        position={isFixed ? 'fixed' : 'static'}
        sections={[
          {
            items: [
              <OuiHeaderSectionItemButton aria-label="Account menu">
                <OuiAvatar type="space" name="Default Space" size="s" />
              </OuiHeaderSectionItemButton>,
            ],
            breadcrumbs: breadcrumbs,
            borders: 'right',
          },
          {
            items: [
              <OuiHeaderSectionItemButton
                aria-label="News feed: Updates available"
                notification={true}>
                <OuiIcon type="cheer" size="m" />
              </OuiHeaderSectionItemButton>,
            ],
            borders: 'none',
          },
        ]}
      />
    </>
  );

  return (
    <>
      <OuiSwitch
        label={'Make header fixed position'}
        checked={isFixed}
        onChange={(e) => setIsFixed(e.target.checked)}
      />
      <OuiSpacer />
      {headers}
    </>
  );
};
