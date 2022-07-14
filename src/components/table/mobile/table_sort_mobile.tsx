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

import React, { Component, ReactNode, Key } from 'react';
import classNames from 'classnames';

import { OuiButtonEmpty } from '../../button/button_empty';
import { OuiPopover, PopoverAnchorPosition } from '../../popover';
import { OuiContextMenuPanel } from '../../context_menu';
import { OuiI18n } from '../../i18n';
import { OuiTableSortMobileItem } from './table_sort_mobile_item';

interface ItemProps {
  name: ReactNode;
  key?: Key;
  onSort?: () => void;
  isSorted?: boolean;
  isSortAscending?: boolean;
}

export interface OuiTableSortMobileProps {
  className?: string;
  anchorPosition?: PopoverAnchorPosition;
  items?: ItemProps[];
}

interface State {
  isPopoverOpen: boolean;
}

export class OuiTableSortMobile extends Component<
  OuiTableSortMobileProps,
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
    const { className, anchorPosition, items, ...rest } = this.props;

    const classes = classNames('ouiTableSortMobile', className);

    const mobileSortButton = (
      <OuiButtonEmpty
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick.bind(this)}
        flush="right"
        size="xs">
        <OuiI18n token="ouiTableSortMobile.sorting" default="Sorting" />
      </OuiButtonEmpty>
    );

    const mobileSortPopover = (
      <OuiPopover
        button={mobileSortButton}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover}
        anchorPosition={anchorPosition || 'downRight'}
        panelPaddingSize="none"
        {...rest}>
        <OuiContextMenuPanel
          style={{ minWidth: 200 }}
          items={
            items && items.length
              ? items.map((item) => {
                  return (
                    <OuiTableSortMobileItem
                      key={item.key}
                      onSort={item.onSort}
                      isSorted={item.isSorted}
                      isSortAscending={item.isSortAscending}>
                      {item.name}
                    </OuiTableSortMobileItem>
                  );
                })
              : undefined
          }
          watchedItemProps={['isSorted', 'isSortAscending']}
        />
      </OuiPopover>
    );

    return <div className={classes}>{mobileSortPopover}</div>;
  }
}
