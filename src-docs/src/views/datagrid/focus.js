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

/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useCallback, useMemo } from 'react';
import { faker } from '@faker-js/faker';

import {
  OuiDataGrid,
  OuiButtonEmpty,
  OuiButtonIcon,
  OuiLink,
  OuiSwitch,
  OuiSpacer,
  OuiBadge,
  OuiToken,
  OuiFlexGroup,
  OuiFlexItem,
} from '../../../../src/components/';

const data = [];

for (let i = 0; i < 10; i++) {
  data.push([
    <span>{faker.helpers.fake('{{person.firstName}}')}</span>,
    <span>{faker.helpers.fake('{{person.firstName}}')}</span>,

    <span>
      <OuiLink href="#/tabular-content/data-grid-focus">
        {faker.helpers.fake('{{internet.email}}')}
      </OuiLink>
    </span>,
    <span>
      <OuiLink href="#/tabular-content/data-grid-focus">
        {faker.helpers.fake('{{internet.email}}')}
      </OuiLink>
    </span>,

    <span>
      <OuiButtonEmpty size="xs" onClick={() => {}}>
        Yes
      </OuiButtonEmpty>
      <OuiButtonEmpty size="xs" color="danger" onClick={() => {}}>
        No
      </OuiButtonEmpty>
    </span>,
    <span>
      <OuiButtonEmpty size="xs" onClick={() => {}}>
        Yes
      </OuiButtonEmpty>
      <OuiButtonEmpty size="xs" color="danger" onClick={() => {}}>
        No
      </OuiButtonEmpty>
    </span>,
  ]);
}

const renderHeaderIcon = (areHeadersInteractive) =>
  areHeadersInteractive ? (
    <OuiFlexItem grow={false}>
      <OuiButtonIcon
        aria-label="column settings"
        iconType="gear"
        onClick={() => {}}
      />
    </OuiFlexItem>
  ) : null;

export default () => {
  const [areHeadersInteractive, setAreHeadersInteractive] = useState(false);
  const switchInteractiveHeaders = useCallback(
    (e) => setAreHeadersInteractive(e.target.checked),
    [setAreHeadersInteractive]
  );

  const columns = useMemo(
    () => [
      {
        id: 'no-interactives not expandable',
        display: (
          <OuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
            {renderHeaderIcon(areHeadersInteractive)}
            <OuiFlexItem grow={false}>
              <OuiToken
                iconType="expandMini"
                color="ouiColorVis2"
                shape="square"
                fill="dark"
              />
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiBadge>0 interactive</OuiBadge>
            </OuiFlexItem>
          </OuiFlexGroup>
        ),
        isExpandable: false,
        actions: false,
      },
      {
        id: 'no-interactives is expandable',
        display: (
          <OuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
            <OuiFlexItem grow={false}>
              <OuiToken
                iconType="expandMini"
                color="ouiColorVis0"
                shape="square"
                fill="dark"
              />
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiBadge>0 interactive</OuiBadge>
            </OuiFlexItem>
          </OuiFlexGroup>
        ),
        actions: false,
      },
      {
        id: 'one-interactive not expandable',
        display: (
          <OuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
            <OuiFlexItem grow={false}>
              <OuiToken
                iconType="expandMini"
                color="ouiColorVis2"
                shape="square"
                fill="dark"
              />
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiBadge>1 interactive</OuiBadge>
            </OuiFlexItem>
          </OuiFlexGroup>
        ),
        isExpandable: false,
        actions: false,
      },
      {
        id: 'one-interactives is expandable',
        display: (
          <OuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
            {renderHeaderIcon(areHeadersInteractive)}
            <OuiFlexItem grow={false}>
              <OuiToken
                iconType="expandMini"
                color="ouiColorVis0"
                shape="square"
                fill="dark"
              />
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiBadge>1 interactive</OuiBadge>
            </OuiFlexItem>
          </OuiFlexGroup>
        ),
        actions: false,
      },
      {
        id: 'two-interactives not expandable',

        display: (
          <OuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
            <OuiFlexItem grow={false}>
              <OuiToken
                iconType="expandMini"
                color="ouiColorVis2"
                shape="square"
                fill="dark"
              />
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiBadge>2 interactive</OuiBadge>
            </OuiFlexItem>
          </OuiFlexGroup>
        ),
        isExpandable: false,
        actions: false,
      },
      {
        id: 'two-interactives is expandable',

        display: (
          <OuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
            <OuiFlexItem grow={false}>
              <OuiToken
                iconType="expandMini"
                color="ouiColorVis0"
                shape="square"
                fill="dark"
              />
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiBadge>2 interactive</OuiBadge>
            </OuiFlexItem>
          </OuiFlexGroup>
        ),
        actions: false,
      },
    ],
    [areHeadersInteractive]
  );
  const columnIdToIndex = columns.reduce((acc, { id }, index) => {
    acc[id] = index;
    return acc;
  }, {});

  const renderCellValue = useCallback(
    ({ rowIndex, columnId }) => {
      const columnIndex = columnIdToIndex[columnId];
      return data[rowIndex][columnIndex];
    },
    [columnIdToIndex]
  );

  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  const [pagination, setPagination] = useState({
    pageSize: 4,
    pageIndex: 0,
    pageSizeOptions: [4],
  });
  const onChangeItemsPerPage = useCallback(
    (pageSize) => setPagination((pagination) => ({ ...pagination, pageSize })),
    [setPagination]
  );
  const onChangePage = useCallback(
    (pageIndex) =>
      setPagination((pagination) => ({ ...pagination, pageIndex })),
    [setPagination]
  );

  return (
    <>
      <OuiSwitch
        label="Use interactive headers - toggling will reset the datagrid and any internal states"
        checked={areHeadersInteractive}
        onChange={switchInteractiveHeaders}
      />

      <OuiSpacer />

      <OuiDataGrid
        key={areHeadersInteractive ? 'interactive-headers' : 'static-headers'}
        aria-label="Top OUI contributors"
        columns={columns}
        columnVisibility={{ visibleColumns, setVisibleColumns }}
        rowCount={data.length}
        renderCellValue={renderCellValue}
        pagination={{
          ...pagination,
          onChangeItemsPerPage,
          onChangePage,
        }}
      />
    </>
  );
};
