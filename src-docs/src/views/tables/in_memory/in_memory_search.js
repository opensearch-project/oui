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

import React, { Fragment, useState } from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';
import {
  OuiInMemoryTable,
  OuiHealth,
  OuiSpacer,
  OuiSwitch,
  OuiFlexGroup,
  OuiFlexItem,
  OuiCallOut,
  OuiCode,
} from '../../../../../src/components';

/*
Example user object:

{
  id: '1',
  firstName: 'john',
  lastName: 'doe',
  dateOfBirth: Date.now(),
  nationality: 'NL',
  online: true
}

Example country object:

{
  code: 'NL',
  name: 'Netherlands',
  flag: '🇳🇱'
}
*/

const store = createDataStore();

export const Table = () => {
  const [incremental, setIncremental] = useState(false);
  const [filters, setFilters] = useState(false);
  const [contentBetween, setContentBetween] = useState(false);

  const columns = [
    {
      field: 'firstName',
      name: 'First Name',
      sortable: true,
      truncateText: true,
    },
    {
      field: 'lastName',
      name: 'Last Name',
      truncateText: true,
    },
    {
      field: 'dateOfBirth',
      name: 'Date of Birth',
      dataType: 'date',
      render: (date) => formatDate(date, 'dobLong'),
      sortable: true,
    },
    {
      field: 'nationality',
      name: 'Nationality',
      render: (countryCode) => {
        const country = store.getCountry(countryCode);
        return `${country.flag} ${country.name}`;
      },
    },
    {
      field: 'online',
      name: 'Online',
      dataType: 'boolean',
      render: (online) => {
        const color = online ? 'success' : 'danger';
        const label = online ? 'Online' : 'Offline';
        return <OuiHealth color={color}>{label}</OuiHealth>;
      },
    },
  ];

  const search = {
    box: {
      incremental: incremental,
      schema: true,
    },
    filters: !filters
      ? undefined
      : [
          {
            type: 'is',
            field: 'online',
            name: 'Online',
            negatedName: 'Offline',
          },
          {
            type: 'field_value_selection',
            field: 'nationality',
            name: 'Nationality',
            multiSelect: false,
            options: store.countries.map((country) => ({
              value: country.code,
              name: country.name,
              view: `${country.flag} ${country.name}`,
            })),
          },
        ],
  };

  return (
    <Fragment>
      <OuiFlexGroup>
        <OuiFlexItem grow={false}>
          <OuiSwitch
            label="Incremental"
            checked={incremental}
            onChange={() => setIncremental(!incremental)}
          />
        </OuiFlexItem>
        <OuiFlexItem grow={false}>
          <OuiSwitch
            label="With Filters"
            checked={filters}
            onChange={() => setFilters(!filters)}
          />
        </OuiFlexItem>
        <OuiFlexItem grow={false}>
          <OuiSwitch
            label="Content between"
            checked={contentBetween}
            onChange={() => setContentBetween(!contentBetween)}
          />
        </OuiFlexItem>
      </OuiFlexGroup>
      <OuiSpacer size="l" />
      <OuiInMemoryTable
        items={store.users}
        columns={columns}
        search={search}
        pagination={true}
        sorting={true}
        childrenBetween={
          contentBetween && (
            <OuiCallOut
              size="s"
              title={
                <>
                  You can inject custom content between the search bar and the
                  table using <OuiCode>childrenBetween</OuiCode>.
                </>
              }
            />
          )
        }
      />
    </Fragment>
  );
};
