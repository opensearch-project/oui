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

import { OuiTreeView, OuiToken } from '../../../../src/components';

export default () => {
  const items = [
    {
      label: 'transporter',
      id: 'transporter',
      icon: <OuiToken size="xs" iconType="tokenObject" />,
      children: [
        {
          label: 'service',
          id: 'service',
          icon: <OuiToken size="xs" iconType="tokenString" />,
        },
        {
          label: 'auth',
          id: 'auth',
          icon: <OuiToken size="xs" iconType="tokenObject" />,
          children: [
            {
              label: 'user',
              id: 'user',
              icon: <OuiToken size="xs" iconType="tokenVariable" />,
            },
            {
              label: 'pass',
              id: 'pass',
              icon: <OuiToken size="xs" iconType="tokenVariable" />,
            },
          ],
        },
      ],
    },
    {
      label: 'getContact',
      id: 'getContact',
      icon: <OuiToken size="xs" iconType="tokenFunction" />,
      children: [
        {
          label: 'render',
          id: 'render',
          icon: <OuiToken size="xs" iconType="tokenFunction" />,
          children: [
            {
              label: 'title',
              id: 'title',
              icon: <OuiToken size="xs" iconType="tokenString" />,
            },
          ],
        },
      ],
    },
    {
      label: 'postContact',
      id: 'postContact',
      icon: <OuiToken size="xs" iconType="tokenFunction" />,
      children: [
        {
          label: 'errors',
          id: 'errors',
          icon: <OuiToken size="xs" iconType="tokenConstant" />,
        },
        {
          label: 'A custom class is on this one',
          id: 'cutomClass',
          icon: <OuiToken size="xs" iconType="tokenObject" />,
          className: 'ouiTreeView__nodeInnerExample',
        },
      ],
    },
  ];

  return (
    <div style={{ width: '20rem' }}>
      <OuiTreeView
        items={items}
        display="compressed"
        expandByDefault
        showExpansionArrows
        aria-label="Document Outline"
      />
    </div>
  );
};
