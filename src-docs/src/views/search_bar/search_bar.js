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
import { times } from '../../../../src/services/utils';
import { Random } from '../../../../src/services/random';
import {
  OuiHealth,
  OuiCallOut,
  OuiSpacer,
  OuiFlexGroup,
  OuiFlexItem,
  OuiCodeBlock,
  OuiTitle,
  OuiSwitch,
  OuiBasicTable,
  OuiSearchBar,
} from '../../../../src/components';

const random = new Random();

const tags = [
  { name: 'marketing', color: 'danger' },
  { name: 'finance', color: 'success' },
  { name: 'eng', color: 'success' },
  { name: 'sales', color: 'warning' },
  { name: 'ga', color: 'success' },
];

const types = ['dashboard', 'visualization', 'watch'];

const users = ['dewey', 'wanda', 'carrie', 'jmack', 'gabic'];

const items = times(10, (id) => {
  return {
    id,
    status: random.oneOf(['open', 'closed']),
    type: random.oneOf(types),
    tag: random.setOf(
      tags.map((tag) => tag.name),
      { min: 0, max: 3 }
    ),
    active: random.boolean(),
    owner: random.oneOf(users),
    followers: random.integer({ min: 0, max: 20 }),
    comments: random.integer({ min: 0, max: 10 }),
    stars: random.integer({ min: 0, max: 5 }),
  };
});

const loadTags = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        tags.map((tag) => ({
          value: tag.name,
          view: <OuiHealth color={tag.color}>{tag.name}</OuiHealth>,
        }))
      );
    }, 2000);
  });
};

const initialQuery = OuiSearchBar.Query.MATCH_ALL;

export const SearchBar = () => {
  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState(null);
  const [incremental, setIncremental] = useState(false);

  const onChange = ({ query, error }) => {
    if (error) {
      setError(error);
    } else {
      setError(null);
      setQuery(query);
    }
  };

  const toggleIncremental = () => {
    setIncremental(!incremental);
  };

  const renderSearch = () => {
    const filters = [
      {
        type: 'field_value_toggle_group',
        field: 'status',
        items: [
          {
            value: 'open',
            name: 'Open',
          },
          {
            value: 'closed',
            name: 'Closed',
          },
        ],
      },
      {
        type: 'is',
        field: 'active',
        name: 'Active',
        negatedName: 'Inactive',
      },
      {
        type: 'field_value_toggle',
        name: 'Mine',
        field: 'owner',
        value: 'dewey',
      },
      {
        type: 'field_value_toggle',
        name: 'Popular',
        field: 'followers',
        value: 5,
        operator: 'gt',
      },
      {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        multiSelect: 'or',
        operator: 'exact',
        cache: 10000, // will cache the loaded tags for 10 sec
        options: () => loadTags(),
      },
    ];

    const schema = {
      strict: true,
      fields: {
        type: {
          type: 'string',
        },
        active: {
          type: 'boolean',
        },
        status: {
          type: 'string',
        },
        followers: {
          type: 'number',
        },
        comments: {
          type: 'number',
        },
        stars: {
          type: 'number',
        },
        created: {
          type: 'date',
        },
        owner: {
          type: 'string',
        },
        tag: {
          type: 'string',
          validate: (value) => {
            if (value !== '' && !tags.some((tag) => tag.name === value)) {
              throw new Error(
                `unknown tag (possible values: ${tags
                  .map((tag) => tag.name)
                  .join(',')})`
              );
            }
          },
        },
      },
    };

    return (
      <OuiSearchBar
        defaultQuery={initialQuery}
        box={{
          placeholder: 'e.g. type:visualization -is:active joe',
          incremental,
          schema,
        }}
        filters={filters}
        onChange={onChange}
      />
    );
  };

  const renderError = () => {
    if (!error) {
      return;
    }
    return (
      <Fragment>
        <OuiCallOut
          iconType="faceSad"
          color="danger"
          title={`Invalid search: ${error.message}`}
        />
        <OuiSpacer size="l" />
      </Fragment>
    );
  };

  const renderTable = () => {
    const columns = [
      {
        name: 'Type',
        field: 'type',
      },
      {
        name: 'Open',
        field: 'status',
        render: (status) => (status === 'open' ? 'Yes' : 'No'),
      },
      {
        name: 'Active',
        field: 'active',
        dataType: 'boolean',
      },
      {
        name: 'Tags',
        field: 'tag',
      },
      {
        name: 'Owner',
        field: 'owner',
      },
      {
        name: 'Stats',
        width: '150px',
        render: (item) => {
          return (
            <div>
              <div>{`${item.stars} Stars`}</div>
              <div>{`${item.followers} Followers`}</div>
              <div>{`${item.comments} Comments`}</div>
            </div>
          );
        },
      },
    ];

    const queriedItems = OuiSearchBar.Query.execute(query, items, {
      defaultFields: ['owner', 'tag', 'type'],
    });

    return <OuiBasicTable items={queriedItems} columns={columns} />;
  };

  let opensearchQueryDsl;
  let opensearchQueryString;

  try {
    opensearchQueryDsl = OuiSearchBar.Query.toOpenSearchQuery(query);
  } catch (e) {
    opensearchQueryDsl = e.toString();
  }
  try {
    opensearchQueryString = OuiSearchBar.Query.toOpenSearchQueryString(query);
  } catch (e) {
    opensearchQueryString = e.toString();
  }

  const content = renderError() || (
    <OuiFlexGroup>
      <OuiFlexItem grow={4}>
        <OuiTitle size="s">
          <h3>OpenSearch Query String</h3>
        </OuiTitle>
        <OuiSpacer size="s" />
        <OuiCodeBlock language="js">
          {opensearchQueryString ? opensearchQueryString : ''}
        </OuiCodeBlock>

        <OuiSpacer size="l" />

        <OuiTitle size="s">
          <h3>OpenSearch Query DSL</h3>
        </OuiTitle>
        <OuiSpacer size="s" />
        <OuiCodeBlock language="js">
          {opensearchQueryDsl
            ? JSON.stringify(opensearchQueryDsl, null, 2)
            : ''}
        </OuiCodeBlock>
      </OuiFlexItem>

      <OuiFlexItem grow={6}>
        <OuiTitle size="s">
          <h3>JS execution</h3>
        </OuiTitle>

        <OuiSpacer size="s" />

        {renderTable()}
      </OuiFlexItem>
    </OuiFlexGroup>
  );

  return (
    <Fragment>
      <OuiFlexGroup alignItems="center">
        <OuiFlexItem>{renderSearch()}</OuiFlexItem>

        <OuiFlexItem grow={false}>
          <OuiSwitch
            label="Incremental"
            checked={incremental}
            onChange={toggleIncremental}
          />
        </OuiFlexItem>
      </OuiFlexGroup>
      <OuiSpacer size="l" />
      {content}
    </Fragment>
  );
};
