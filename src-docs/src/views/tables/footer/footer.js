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
  OuiButton,
  OuiFlexGroup,
  OuiFlexItem,
} from '../../../../../src/components';

import uniqBy from 'lodash/uniqBy';

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
  const [selectedItems, setSelectedItems] = useState([]);

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

  const onClickDelete = () => {
    store.deleteUsers(...selectedItems.map((user) => user.id));

    setSelectedItems([]);
  };

  const renderDeleteButton = () => {
    if (selectedItems.length === 0) {
      return;
    }

    return (
      <OuiButton color="danger" iconType="trash" onClick={onClickDelete}>
        Delete {selectedItems.length} Users
      </OuiButton>
    );
  };

  const renderStatus = (online) => {
    const color = online ? 'success' : 'danger';
    const label = online ? 'Online' : 'Offline';
    return <OuiHealth color={color}>{label}</OuiHealth>;
  };

  const { pageOfItems, totalItemCount } = store.findUsers(
    pageIndex,
    pageSize,
    sortField,
    sortDirection
  );

  const deleteButton = renderDeleteButton();

  const columns = [
    {
      field: 'firstName',
      name: 'First Name',
      footer: <em>Page totals:</em>,
      sortable: true,
      truncateText: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      field: 'lastName',
      name: 'Last Name',
      truncateText: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      field: 'firstName',
      name: 'Full Name',
      mobileOptions: {
        only: true,
        fullWidth: true,
      },
      render: (name, item) => (
        <OuiFlexGroup responsive={false} alignItems="center">
          <OuiFlexItem>
            {item.firstName} {item.lastName}
          </OuiFlexItem>
          <OuiFlexItem grow={false}>{renderStatus(item.online)}</OuiFlexItem>
        </OuiFlexGroup>
      ),
    },
    {
      field: 'github',
      name: 'Github',
      footer: ({ items }) => (
        <span>{uniqBy(items, 'github').length} users</span>
      ),
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
      footer: ({ items }) => (
        <span>{uniqBy(items, 'nationality').length} countries</span>
      ),
      render: (countryCode) => {
        const country = store.getCountry(countryCode);
        return `${country.flag} ${country.name}`;
      },
    },
    {
      field: 'online',
      name: 'Online',
      footer: ({ items }) => (
        <span>{items.filter((i) => !!i.online).length} online</span>
      ),
      dataType: 'boolean',
      render: (online) => renderStatus(online),
      sortable: true,
      hideForMobile: true,
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
      {deleteButton}
      <OuiBasicTable
        items={pageOfItems}
        itemId="id"
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        isSelectable={true}
        selection={selection}
        onChange={onTableChange}
      />
    </Fragment>
  );
};
