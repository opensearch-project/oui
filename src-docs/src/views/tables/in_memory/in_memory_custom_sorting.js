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
import { OuiInMemoryTable } from '../../../../../src/components';

const data = [
  { animal: 'snail', weight: 25 },
  { animal: 'peregrine falcon', weight: 900 },
  { animal: 'small dog', weight: 4500 },
  { animal: 'brown bear', weight: 180000 },
  { animal: 'elephant', weight: 5440000 },
  { animal: 'giraffe', weight: 1180000 },
];

export const Table = () => {
  const columns = [
    {
      field: 'animal',
      name: 'Animal',
      sortable: true,
    },
    {
      name: 'Weight',
      render: ({ weight }) => `${weight / 1000}kg`,
      sortable: ({ weight }) => weight,
    },
    {
      field: 'weight',
      name: 'Weight (grams)',
      sortable: true,
    },
  ];

  const sorting = {
    sort: {
      field: 'Weight',
      direction: 'asc',
    },
  };

  return (
    <OuiInMemoryTable
      items={data}
      columns={columns}
      pagination={false}
      sorting={sorting}
    />
  );
};
