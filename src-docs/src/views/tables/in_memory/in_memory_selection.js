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

import React, { useState, Fragment, useRef } from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';
import {
  OuiLink,
  OuiHealth,
  OuiButton,
  OuiInMemoryTable,
  OuiEmptyPrompt,
  OuiFlexGroup,
  OuiFlexItem,
  OuiSpacer,
} from '../../../../../src/components';
import { Random } from '../../../../../src/services/random';

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

const random = new Random();

const store = createDataStore();

const noItemsFoundMsg = 'No users match search criteria';

export const Table = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(
    <OuiEmptyPrompt
      title={<h3>No users</h3>}
      titleSize="xs"
      body="Looks like you don&rsquo;t have any users. Let&rsquo;s create some!"
      actions={
        <OuiButton
          size="s"
          key="loadUsers"
          onClick={() => {
            loadUsers();
          }}>
          Load Users
        </OuiButton>
      }
    />
  );

  const [selection, setSelection] = useState([]);
  const [error, setError] = useState();
  const tableRef = useRef();

  const loadUsers = () => {
    setMessage('Loading users...');
    setLoading(true);
    setUsers([]);
    setError(undefined);
    setTimeout(() => {
      setLoading(false);
      setMessage(noItemsFoundMsg);
      setError(undefined);
      setUsers(store.users);
    }, random.number({ min: 0, max: 3000 }));
  };

  const loadUsersWithError = () => {
    setMessage('Loading users...');
    setLoading(true);
    setUsers([]);
    setError(undefined);
    setTimeout(() => {
      setLoading(false);
      setMessage(noItemsFoundMsg);
      setError('ouch!... again... ');
      setUsers([]);
      users: [];
    }, random.number({ min: 0, max: 3000 }));
  };

  const renderToolsLeft = () => {
    if (selection.length === 0) {
      return;
    }

    const onClick = () => {
      store.deleteUsers(...selection.map((user) => user.id));
      setSelection([]);
    };

    return (
      <OuiButton color="danger" iconType="trash" onClick={onClick}>
        Delete {selection.length} Users
      </OuiButton>
    );
  };

  const renderToolsRight = () => {
    return [
      <OuiButton
        key="loadUsers"
        onClick={() => {
          loadUsers();
        }}
        isDisabled={loading}>
        Load Users
      </OuiButton>,
      <OuiButton
        key="loadUsersError"
        onClick={() => {
          loadUsersWithError();
        }}
        isDisabled={loading}>
        Load Users (Error)
      </OuiButton>,
    ];
  };

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
  ];

  const search = {
    toolsLeft: renderToolsLeft(),
    toolsRight: renderToolsRight(),
    box: {
      incremental: true,
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
        multiSelect: false,
        options: store.countries.map((country) => ({
          value: country.code,
          name: country.name,
          view: `${country.flag} ${country.name}`,
        })),
      },
    ],
  };

  const pagination = {
    initialPageSize: 5,
    pageSizeOptions: [3, 5, 8],
  };

  const onlineUsers = store.users.filter((user) => user.online);

  const selectionValue = {
    selectable: (user) => user.online,
    selectableMessage: (selectable) =>
      !selectable ? 'User is currently offline' : undefined,
    onSelectionChange: (selection) => setSelection(selection),
    initialSelected: onlineUsers,
  };

  const onSelection = () => {
    tableRef.current.setSelection(onlineUsers);
  };

  return (
    <Fragment>
      <OuiFlexGroup alignItems="center">
        <OuiFlexItem grow={false}>
          <OuiButton onClick={onSelection}>Select online users</OuiButton>
        </OuiFlexItem>
        <OuiFlexItem />
      </OuiFlexGroup>

      <OuiSpacer size="l" />

      <OuiInMemoryTable
        ref={tableRef}
        items={users}
        itemId="id"
        error={error}
        loading={loading}
        message={message}
        columns={columns}
        search={search}
        pagination={pagination}
        sorting={true}
        selection={selectionValue}
        isSelectable={true}
      />
    </Fragment>
  );
};
