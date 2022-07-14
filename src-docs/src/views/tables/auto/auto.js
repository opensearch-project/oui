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

import { createDataStore } from '../data_store';

import { htmlIdGenerator } from '../../../../../src/services';

import {
  OuiBasicTable,
  OuiButtonGroup,
  OuiCallOut,
  OuiLink,
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

const columns = [
  {
    field: 'firstName',
    name: 'First Name',
    sortable: true,
    truncateText: true,
    'data-test-subj': 'firstNameCell',
    mobileOptions: {
      render: (item) => (
        <span>
          {item.firstName}{' '}
          <OuiLink href="#" target="_blank">
            {item.lastName}
          </OuiLink>
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
    render: (name) => (
      <OuiLink href="#" target="_blank">
        {name}
      </OuiLink>
    ),
    mobileOptions: {
      show: false,
    },
  },
  {
    field: 'github',
    name: 'Github',
  },
];

const customColumns = [
  {
    field: 'firstName',
    name: 'First Name',
    sortable: true,
    truncateText: true,
    'data-test-subj': 'firstNameCell',
    width: '20%',
    mobileOptions: {
      render: (item) => (
        <span>
          {item.firstName}{' '}
          <OuiLink href="#" target="_blank">
            {item.lastName}
          </OuiLink>
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
    render: (name) => (
      <OuiLink href="#" target="_blank">
        {name}
      </OuiLink>
    ),
    mobileOptions: {
      show: false,
    },
  },
  {
    field: 'github',
    name: 'Github',
  },
];

const items = store.users.filter((user, index) => index < 10);

const getRowProps = (item) => {
  const { id } = item;
  return {
    'data-test-subj': `row-${id}`,
    className: 'customRowClass',
    onClick: () => {},
  };
};

const getCellProps = (item, column) => {
  const { id } = item;
  const { field } = column;
  return {
    className: 'customCellClass',
    'data-test-subj': `cell-${id}-${field}`,
    textOnly: true,
  };
};

const idPrefix = htmlIdGenerator()();

const toggleButtons = [
  {
    id: `${idPrefix}0`,
    label: 'Fixed',
    value: 'fixed',
  },
  {
    id: `${idPrefix}1`,
    label: 'Auto',
    value: 'auto',
  },
  {
    id: `${idPrefix}2`,
    label: 'Custom',
    value: 'custom',
  },
];

export const Table = () => {
  const [layout, setLayout] = useState('fixed');
  const [toggleIdSelected, setToggleIdSelected] = useState(`${idPrefix}0`);

  const onChange = (optionId) => {
    setToggleIdSelected(optionId);
    setLayout(toggleButtons.find((x) => x.id === optionId).value);
  };

  let callOutText;

  switch (layout) {
    case 'fixed':
      callOutText = 'First Name has truncateText set to true';
      break;
    case 'auto':
      callOutText =
        'First Name has truncateText set to true which is not applied since tableLayout is set to auto';
      break;
    case 'custom':
      callOutText =
        'First Name has truncateText set to true and width set to 20%';
      break;
  }

  return (
    <div>
      <OuiButtonGroup
        legend="Table layout group"
        options={toggleButtons}
        idSelected={toggleIdSelected}
        onChange={onChange}
      />
      <OuiSpacer size="m" />
      <OuiCallOut
        size="s"
        color={layout === 'auto' ? 'warning' : 'primary'}
        title={callOutText}
      />
      <OuiSpacer size="m" />
      <OuiBasicTable
        items={items}
        columns={layout === 'custom' ? customColumns : columns}
        tableLayout={layout === 'auto' ? 'auto' : 'fixed'}
        rowProps={getRowProps}
        cellProps={getCellProps}
      />
    </div>
  );
};
