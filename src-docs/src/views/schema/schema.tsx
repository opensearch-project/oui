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

import { OuiSchemaItem } from '../../../../src/components/schema';

export default () => (
  <div>
    <OuiSchemaItem label="Simple" />
    <OuiSchemaItem iconType="tokenString" label="Simple with icon" />
    <OuiSchemaItem
      iconType="tokenShape"
      label="Icon and actions"
      actions={[
        {
          iconType: 'trash',
          'aria-label': 'Delete',
          onClick: () => {},
          color: 'danger',
        },
        {
          iconType: 'pencil',
          'aria-label': 'Edit',
          onClick: () => {},
          tooltip: {
            content: 'Edit',
            position: 'top',
            delay: 'long',
          },
        },
      ]}
    />
    <OuiSchemaItem
      iconType="tokenShape"
      label="Compressed with icon and actions"
      actions={[
        {
          iconType: 'trash',
          'aria-label': 'Delete',
          onClick: () => {},
          color: 'danger',
        },
        {
          iconType: 'pencil',
          'aria-label': 'Edit',
          onClick: () => {},
          tooltip: {
            content: 'Edit',
            position: 'top',
            delay: 'long',
          },
        },
      ]}
      compressed
    />
    <br />
    <OuiSchemaItem
      iconType="tokenShape"
      label="With a panel"
      actions={[
        {
          iconType: 'trash',
          'aria-label': 'Delete',
          onClick: () => {},
          color: 'danger',
        },
        {
          iconType: 'pencil',
          'aria-label': 'Edit',
          onClick: () => {},
          tooltip: {
            content: 'Edit',
            position: 'top',
            delay: 'long',
          },
        },
      ]}
      withPanel
    />
    <br />
    <OuiSchemaItem
      iconType="tokenShape"
      label="With a panel and compressed"
      actions={[
        {
          iconType: 'trash',
          'aria-label': 'Delete',
          onClick: () => {},
          color: 'danger',
        },
        {
          iconType: 'pencil',
          'aria-label': 'Edit',
          onClick: () => {},
          tooltip: {
            content: 'Edit',
            position: 'top',
            delay: 'long',
          },
        },
      ]}
      withPanel
      compressed
    />
    <br />
    <div style={{ width: '300px' }}>
      <OuiSchemaItem
        iconType="tokenShape"
        label="A very long label that will wrap with a panel for good measure"
        actions={[
          {
            iconType: 'trash',
            'aria-label': 'Delete',
            onClick: () => {},
            color: 'danger',
          },
          {
            iconType: 'pencil',
            'aria-label': 'Edit',
            onClick: () => {},
            tooltip: {
              content: 'Edit',
              position: 'top',
              delay: 'long',
            },
          },
        ]}
        withPanel
      />
    </div>
  </div>
);
