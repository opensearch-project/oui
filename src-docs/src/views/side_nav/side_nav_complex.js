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

import { OuiIcon, OuiSideNav } from '../../../../src/components';
import { slugify } from '../../../../src/services';

export default () => {
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const [selectedItemName, setSelectedItem] = useState('Time stuff');

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const selectItem = (name) => {
    setSelectedItem(name);
  };

  const createItem = (name, data = {}) => {
    // NOTE: Duplicate `name` values will cause `id` collisions.
    return {
      id: slugify(name),
      name,
      isSelected: selectedItemName === name,
      onClick: () => selectItem(name),
      ...data,
    };
  };

  const sideNav = [
    createItem('OpenSearch', {
      onClick: undefined,
      items: [
        createItem('Discover'),
        createItem('Dashboard'),
        createItem('Visualize'),
        createItem('Stack Management', {
          items: [
            createItem('Index Pattern'),
            createItem('Data Sources'),
            createItem('Discover'),
            createItem('Advanced settings', {
              items: [
                createItem('General', {
                  icon: <OuiIcon type="gear" />,
                }),
                createItem('Accessibility', {
                  icon: <OuiIcon type="accessibility" />,
                }),
                createItem('Discover', {
                  icon: <OuiIcon type="discoverApp" />,
                }),
                createItem('Notifications', {
                  icon: <OuiIcon type="bell" />,
                }),
                createItem('Search', {
                  icon: <OuiIcon type="search" />,
                }),
                createItem('Timeline', {
                  icon: <OuiIcon type="timeline" />,
                }),
                createItem('Visualizations', {
                  icon: <OuiIcon type="visArea" />,
                }),
              ],
            }),
            createItem('Saved Objects'),
          ],
        }),
      ],
    }),
    createItem('Observability', {
      items: [
        createItem('Application analytics'),
        createItem('Trace analytics'),
        createItem('Event analytics'),
        createItem('Metrics analytics'),
        createItem('Operational panels'),
        createItem('Notebooks'),
      ],
    }),
  ];

  return (
    <OuiSideNav
      aria-label="Complex example"
      mobileTitle="Navigate within $APP_NAME"
      toggleOpenOnMobile={toggleOpenOnMobile}
      isOpenOnMobile={isSideNavOpenOnMobile}
      items={sideNav}
      style={{ width: 192 }}
    />
  );
};
