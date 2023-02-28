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
  OuiFlexGroup,
  OuiFlexItem,
  OuiFacetGroup,
  OuiFacetButton,
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
  const [query, setQuery] = useState('');
  const [selectedOptionId, setSelectedOptionId] = useState(undefined);

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

  const handleOnChange = ({ queryText, error }) => {
    setSelectedOptionId(undefined);
    if (!error) {
      setQuery(queryText);
    }
  };

  const facets = [
    {
      id: 'eu',
      label: 'Europe',
      isSelected: selectedOptionId === 'eu',
      onClick: () => {
        setSelectedOptionId('eu');
        setQuery('nationality:(NL or CZ or NO or IT or GB or GR)');
      },
    },
    {
      id: 'na',
      label: 'North America',
      isSelected: selectedOptionId === 'na',
      onClick: () => {
        setSelectedOptionId('na');
        setQuery('nationality:(US or CA or MX or HT)');
      },
    },
    {
      id: 'oc',
      label: 'Oceania',
      isSelected: selectedOptionId === 'oc',
      onClick: () => {
        setSelectedOptionId('oc');
        setQuery('nationality:(AU or FJ)');
      },
    },
    {
      id: 'as',
      label: 'Asia',
      isSelected: selectedOptionId === 'as',
      onClick: () => {
        setSelectedOptionId('as');
        setQuery('nationality:(IL or LB)');
      },
    },
    {
      id: 'af',
      label: 'Africa',
      isSelected: selectedOptionId === 'af',
      onClick: () => {
        setSelectedOptionId('af');
        setQuery('nationality:(ZA or CG)');
      },
    },
    {
      id: 'sa',
      label: 'South America',
      isSelected: selectedOptionId === 'sa',
      onClick: () => {
        setSelectedOptionId('sa');
        setQuery('nationality:(CL)');
      },
    },
  ];

  const search = {
    query,
    onChange: handleOnChange,
    box: {
      schema: true,
    },
    filters: [
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
        multiSelect: 'or',
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
        <OuiFlexItem grow={1}>
          <OuiFacetGroup>
            {facets.map((facet) => {
              return (
                <OuiFacetButton
                  key={facet.id}
                  id={facet.id}
                  isSelected={facet.isSelected}
                  onClick={facet.onClick}>
                  {facet.label}
                </OuiFacetButton>
              );
            })}
          </OuiFacetGroup>
        </OuiFlexItem>
        <OuiFlexItem grow={3}>
          <OuiInMemoryTable
            items={store.users}
            columns={columns}
            search={search}
            pagination={true}
            sorting={true}
          />
        </OuiFlexItem>
      </OuiFlexGroup>
    </Fragment>
  );
};
