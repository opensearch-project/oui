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
    createItem('Elasticsearch', {
      onClick: undefined,
      icon: <OuiIcon type="logoElasticsearch" />,
      items: [
        createItem('Data sources'),
        createItem('Users'),
        createItem('Roles'),
        createItem('Watches'),
        createItem(
          'Extremely long title will become truncated when the browser is narrow enough'
        ),
      ],
    }),
    createItem('Kibana', {
      onClick: undefined,
      icon: <OuiIcon type="logoKibana" />,
      items: [
        createItem('Advanced settings', {
          items: [
            createItem('General', { disabled: true }),
            createItem('Timelion', {
              items: [
                createItem('Time stuff', {
                  icon: <OuiIcon type="clock" />,
                }),
                createItem('Lion stuff', {
                  icon: <OuiIcon type="stats" />,
                }),
              ],
            }),
            createItem('Visualizations'),
          ],
        }),
        createItem('Index Patterns'),
        createItem('Saved Objects'),
        createItem('Reporting'),
      ],
    }),
    createItem('Logstash', {
      onClick: undefined,
      icon: <OuiIcon type="logoLogstash" />,
      items: [createItem('Pipeline viewer')],
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
