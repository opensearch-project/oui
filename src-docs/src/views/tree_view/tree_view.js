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

import { OuiIcon, OuiTreeView, OuiToken } from '../../../../src/components';

export default () => {
  const items = [
    {
      label: 'Item One',
      id: 'item_one',
      icon: <OuiIcon type="folderClosed" />,
      iconWhenExpanded: <OuiIcon type="folderOpen" />,
      isExpanded: true,
      children: [
        {
          label: 'Item A',
          id: 'item_a',
          icon: <OuiIcon type="document" />,
        },
        {
          label: 'Item B',
          id: 'item_b',
          icon: <OuiIcon type="arrowRight" />,
          iconWhenExpanded: <OuiIcon type="arrowDown" />,
          children: [
            {
              label: 'A Cloud',
              id: 'item_cloud',
              icon: <OuiToken iconType="tokenConstant" />,
            },
            {
              label: "I'm a Bug",
              id: 'item_bug',
              icon: <OuiToken iconType="tokenEnum" />,
              callback: () => {},
            },
          ],
        },
        {
          label: 'Item C',
          id: 'item_c',
          icon: <OuiIcon type="arrowRight" />,
          iconWhenExpanded: <OuiIcon type="arrowDown" />,
          children: [
            {
              label: 'Another Cloud',
              id: 'item_cloud2',
              icon: <OuiToken iconType="tokenConstant" />,
            },
            {
              label:
                'This one is a really long string that we will check truncates correctly',
              id: 'item_bug2',
              icon: <OuiToken iconType="tokenEnum" />,
              callback: () => {},
            },
          ],
        },
      ],
    },
    {
      label: 'Item Two',
      id: 'item_two',
    },
  ];

  return (
    <div style={{ width: '20rem' }}>
      <OuiTreeView items={items} aria-label="Sample Folder Tree" />
    </div>
  );
};
