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

import React, { useState, Fragment } from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';

import {
  OuiBasicTable,
  OuiLink,
  OuiHealth,
  OuiFlexGroup,
  OuiFlexItem,
  OuiSwitch,
  OuiSpacer,
} from '../../../../../src/components';

/*
Example user object:

{
  id: '1',
  firstName: 'john',
  lastName: 'doe',
  github: 'johndoe',
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
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState('firstName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [, setSelectedItems] = useState([]);
  const [customHeader, setCustomHeader] = useState(true);
  const [isResponsive, setIsResponsive] = useState(true);

  const onTableChange = ({ page = {}, sort = {} }) => {
    const { index: pageIndex, size: pageSize } = page;

    const { field: sortField, direction: sortDirection } = sort;

    setPageIndex(pageIndex);
    setPageSize(pageSize);
    setSortField(sortField);
    setSortDirection(sortDirection);
  };

  const onSelectionChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  const toggleHeader = () => {
    setCustomHeader(!customHeader);
  };

  const toggleResponsive = () => {
    setIsResponsive(!isResponsive);
  };

  const deleteUser = (user) => {
    store.deleteUsers(user.id);
    setSelectedItems([]);
  };

  const cloneUser = (user) => {
    store.cloneUser(user.id);
    setSelectedItems([]);
  };

  const { pageOfItems, totalItemCount } = store.findUsers(
    pageIndex,
    pageSize,
    sortField,
    sortDirection
  );

  const actions = [
    {
      name: 'Clone',
      description: 'Clone this person',
      icon: 'copy',
      type: 'icon',
      onClick: cloneUser,
    },
    {
      name: 'Delete',
      description: 'Delete this person',
      icon: 'trash',
      type: 'icon',
      color: 'danger',
      onClick: deleteUser,
    },
  ];

  const columns = [
    {
      field: 'firstName',
      name: 'First Name',
      truncateText: true,
      sortable: true,
      mobileOptions: {
        render: customHeader
          ? (item) => (
              <span>
                {item.firstName} {item.lastName}
              </span>
            )
          : undefined,
        header: customHeader ? false : true,
        width: customHeader ? '100%' : undefined,
        enlarge: customHeader ? true : false,
        truncateText: customHeader ? false : true,
      },
    },
    {
      field: 'lastName',
      name: 'Last Name',
      truncateText: true,
      mobileOptions: {
        show: !isResponsive || !customHeader,
      },
    },
    {
      field: 'github',
      name: 'Github',
      render: (username) => (
        <OuiLink href={`https://github.com/${username}`} target="_blank">
          {username}
        </OuiLink>
      ),
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
      sortable: true,
    },
    {
      name: 'Actions',
      actions,
    },
  ];

  const pagination = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalItemCount: totalItemCount,
    pageSizeOptions: [3, 5, 8],
  };

  const sorting = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };

  const selection = {
    selectable: (user) => user.online,
    selectableMessage: (selectable) =>
      !selectable ? 'User is currently offline' : undefined,
    onSelectionChange: onSelectionChange,
  };

  return (
    <Fragment>
      <OuiFlexGroup alignItems="center" responsive={false}>
        <OuiFlexItem grow={false}>
          <OuiSwitch
            label="Responsive"
            checked={isResponsive}
            onChange={toggleResponsive}
          />
        </OuiFlexItem>
        <OuiFlexItem grow={false}>
          <OuiSwitch
            label="Custom header"
            disabled={!isResponsive}
            checked={isResponsive && customHeader}
            onChange={toggleHeader}
          />
        </OuiFlexItem>
      </OuiFlexGroup>

      <OuiSpacer size="l" />

      <OuiBasicTable
        items={pageOfItems}
        itemId="id"
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        selection={selection}
        isSelectable={true}
        hasActions={true}
        responsive={isResponsive}
        onChange={onTableChange}
      />
    </Fragment>
  );
};
