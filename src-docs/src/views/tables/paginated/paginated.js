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
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';

import {
  OuiBasicTable,
  OuiCode,
  OuiLink,
  OuiHealth,
  OuiFlexGroup,
  OuiFlexItem,
  OuiSpacer,
  OuiSwitch,
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
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);

  const onTableChange = ({ page = {} }) => {
    const { index: pageIndex, size: pageSize } = page;

    setPageIndex(pageIndex);
    setPageSize(pageSize);
  };

  const renderStatus = (online) => {
    const color = online ? 'success' : 'danger';
    const label = online ? 'Online' : 'Offline';
    return <OuiHealth color={color}>{label}</OuiHealth>;
  };

  const togglePerPageOptions = () => setShowPerPageOptions(!showPerPageOptions);

  const { pageOfItems, totalItemCount } = store.findUsers(pageIndex, pageSize);

  const columns = [
    {
      field: 'firstName',
      name: 'First Name',
      truncateText: true,
      hideForMobile: true,
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
        header: false,
        only: true,
        enlarge: true,
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
      render: (online) => renderStatus(online),
    },
  ];

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [3, 5, 8],
    hidePerPageOptions: !showPerPageOptions,
  };

  return (
    <div>
      <OuiSwitch
        checked={!showPerPageOptions}
        label={
          <span>
            Hide per page options with{' '}
            <OuiCode>pagination.hidePerPageOptions = true</OuiCode>
          </span>
        }
        onChange={togglePerPageOptions}
      />
      <OuiSpacer size="xl" />
      <OuiBasicTable
        items={pageOfItems}
        columns={columns}
        pagination={pagination}
        onChange={onTableChange}
      />
    </div>
  );
};
