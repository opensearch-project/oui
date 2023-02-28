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

import { OuiSideNav } from '../../../../src/components';

export default () => {
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const [selectedItemName, setSelectedItem] = useState(null);

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const selectItem = (name) => {
    setSelectedItem(name);
  };

  const createItem = (name, data = {}) => {
    // NOTE: Duplicate `name` values will cause `id` collisions.
    return {
      id: name,
      name,
      isSelected: selectedItemName === name,
      onClick: () => selectItem(name),
      ...data,
    };
  };

  const sideNav = [
    {
      name: 'OpenSearch Dashboards',
      id: 'OpenSearch Dashboards',
      items: [
        createItem('Has normal children', {
          items: [
            createItem('Without forceOpen', {
              items: [createItem('Child 1'), createItem('Child 2')],
            }),
          ],
        }),
        createItem('Normally not open', {
          items: [
            createItem('Has forceOpen:true', {
              forceOpen: true,
              items: [createItem('Child 3'), createItem('Child 4')],
            }),
          ],
        }),
        createItem('With forceOpen:true', {
          forceOpen: true,
          items: [
            createItem('Normal child', {
              items: [createItem('Child 5'), createItem('Child 6')],
            }),
          ],
        }),
        createItem('Children only, no link', {
          onClick: undefined,
          items: [
            createItem('Another child', {
              items: [createItem('Child 7'), createItem('Child 8')],
            }),
          ],
        }),
      ],
    },
  ];

  return (
    <OuiSideNav
      aria-label="Force-open example"
      mobileTitle="Navigate within $APP_NAME"
      toggleOpenOnMobile={toggleOpenOnMobile}
      isOpenOnMobile={isSideNavOpenOnMobile}
      items={sideNav}
      style={{ width: 192 }}
    />
  );
};
