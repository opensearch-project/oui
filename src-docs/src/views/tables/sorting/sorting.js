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
  OuiHealth,
  OuiIcon,
  OuiLink,
  OuiToolTip,
  OuiFlexGroup,
  OuiFlexItem,
  OuiSwitch,
  OuiSpacer,
  OuiCode,
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
  const [enableAll, setEnableAll] = useState(false);
  const [readonly, setReadonly] = useState(false);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState('firstName');
  const [sortDirection, setSortDirection] = useState('asc');

  const onTableChange = ({ page = {}, sort = {} }) => {
    const { index: pageIndex, size: pageSize } = page;

    const { field: sortField, direction: sortDirection } = sort;

    setPageIndex(pageIndex);
    setPageSize(pageSize);
    setSortField(sortField);
    setSortDirection(sortDirection);
  };

  const { pageOfItems, totalItemCount } = store.findUsers(
    pageIndex,
    pageSize,
    sortField,
    sortDirection
  );

  const columns = [
    {
      field: 'firstName',
      name: 'First Name',
      sortable: true,
      truncateText: true,
      mobileOptions: {
        render: (item) => (
          <span>
            {item.firstName} {item.lastName}
          </span>
        ),
        header: false,
        truncateText: false,
        enlarge: true,
        fullWidth: true,
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
      field: 'github',
      name: (
        <OuiToolTip content="Their mascot is the Octokitty">
          <span>
            Github{' '}
            <OuiIcon
              size="s"
              color="subdued"
              type="questionInCircle"
              className="oui-alignTop"
            />
          </span>
        </OuiToolTip>
      ),
      render: (username) => (
        <OuiLink href={`https://github.com/${username}`} target="_blank">
          {username}
        </OuiLink>
      ),
    },
    {
      field: 'dateOfBirth',
      name: (
        <OuiToolTip content="Colloquially known as a 'birthday'">
          <span>
            Date of Birth{' '}
            <OuiIcon
              size="s"
              color="subdued"
              type="questionInCircle"
              className="oui-alignTop"
            />
          </span>
        </OuiToolTip>
      ),
      schema: 'date',
      render: (date) => formatDate(date, 'dobLong'),
    },
    {
      field: 'nationality',
      name: (
        <OuiToolTip content="The nation in which this person resides">
          <span>
            Nationality{' '}
            <OuiIcon
              size="s"
              color="subdued"
              type="questionInCircle"
              className="oui-alignTop"
            />
          </span>
        </OuiToolTip>
      ),
      render: (countryCode) => {
        const country = store.getCountry(countryCode);
        return `${country.flag} ${country.name}`;
      },
    },
    {
      field: 'online',
      name: (
        <OuiToolTip content="Free to talk or busy with business">
          <span>
            Online{' '}
            <OuiIcon
              size="s"
              color="subdued"
              type="questionInCircle"
              className="oui-alignTop"
            />
          </span>
        </OuiToolTip>
      ),
      schema: 'boolean',
      render: (online) => {
        const color = online ? 'success' : 'danger';
        const label = online ? 'Online' : 'Offline';
        return <OuiHealth color={color}>{label}</OuiHealth>;
      },
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
    enableAllColumns: enableAll,
    readOnly: readonly,
  };

  return (
    <div>
      <OuiFlexGroup>
        <OuiFlexItem grow={false}>
          <OuiSwitch
            label={<OuiCode>enableAllColumns</OuiCode>}
            checked={enableAll}
            onChange={() => setEnableAll((enabled) => !enabled)}
          />
        </OuiFlexItem>
        <OuiFlexItem grow={false}>
          <OuiSwitch
            label={<OuiCode>readOnly</OuiCode>}
            checked={readonly}
            onChange={() => setReadonly((readonly) => !readonly)}
          />
        </OuiFlexItem>
      </OuiFlexGroup>
      <OuiSpacer />
      <OuiBasicTable
        items={pageOfItems}
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        onChange={onTableChange}
      />
    </div>
  );
};
