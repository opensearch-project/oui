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

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { Component } from 'react';

import { OuiButtonEmpty } from '../../button';
import { OuiContextMenuItem, OuiContextMenuPanel } from '../../context_menu';
import { OuiFlexGroup, OuiFlexItem } from '../../flex';
import { OuiPagination } from '../../pagination';
import { OuiPopover } from '../../popover';
import { OuiI18n } from '../../i18n';

export type PageChangeHandler = (pageIndex: number) => void;
export type ItemsPerPageChangeHandler = (pageSize: number) => void;

export interface OuiTablePaginationProps {
  activePage?: number;
  hidePerPageOptions?: boolean;
  itemsPerPage?: number;
  itemsPerPageOptions?: number[];
  onChangeItemsPerPage?: ItemsPerPageChangeHandler;
  onChangePage?: PageChangeHandler;
  pageCount?: number;
  /**
   * id of the table being controlled
   */
  'aria-controls'?: string;
}

interface State {
  isPopoverOpen: boolean;
}

export class OuiTablePagination extends Component<
  OuiTablePaginationProps,
  State
> {
  state = {
    isPopoverOpen: false,
  };

  onButtonClick = () => {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  render() {
    const {
      activePage,
      itemsPerPage = 50,
      itemsPerPageOptions = [10, 20, 50, 100],
      hidePerPageOptions = false,
      onChangeItemsPerPage = () => {},
      onChangePage,
      pageCount,
      ...rest
    } = this.props;

    const button = (
      <OuiButtonEmpty
        size="xs"
        color="text"
        iconType="arrowDown"
        iconSide="right"
        data-test-subj="tablePaginationPopoverButton"
        onClick={this.onButtonClick}>
        <OuiI18n
          token="ouiTablePagination.rowsPerPage"
          default="Rows per page"
        />
        : {itemsPerPage}
      </OuiButtonEmpty>
    );

    const items = itemsPerPageOptions.map((itemsPerPageOption) => (
      <OuiContextMenuItem
        key={itemsPerPageOption}
        icon={itemsPerPageOption === itemsPerPage ? 'check' : 'empty'}
        onClick={() => {
          this.closePopover();
          onChangeItemsPerPage(itemsPerPageOption);
        }}
        data-test-subj={`tablePagination-${itemsPerPageOption}-rows`}>
        <OuiI18n
          token="ouiTablePagination.rowsPerPageOption"
          values={{ rowsPerPage: itemsPerPageOption }}
          default="{rowsPerPage} rows"
        />
      </OuiContextMenuItem>
    ));

    const itemsPerPagePopover = (
      <OuiPopover
        button={button}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover}
        panelPaddingSize="none"
        anchorPosition="upRight">
        <OuiContextMenuPanel items={items} />
      </OuiPopover>
    );

    return (
      <OuiFlexGroup
        justifyContent="spaceBetween"
        alignItems="center"
        responsive={false}>
        <OuiFlexItem grow={false}>
          {hidePerPageOptions ? null : itemsPerPagePopover}
        </OuiFlexItem>

        <OuiFlexItem grow={false}>
          <OuiPagination
            pageCount={pageCount}
            activePage={activePage}
            onPageClick={onChangePage}
            {...rest}
          />
        </OuiFlexItem>
      </OuiFlexGroup>
    );
  }
}
