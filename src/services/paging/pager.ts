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

import { isNumber } from '../predicate';

export class Pager {
  currentPageIndex: number;
  firstItemIndex: number;
  itemsPerPage: number;
  lastItemIndex: number;
  totalItems: number;
  totalPages: number;

  constructor(
    totalItems: number,
    itemsPerPage: number,
    initialPageIndex: number = 0
  ) {
    if (!isNumber(totalItems) || isNaN(totalItems)) {
      throw new Error('Please provide a number of totalItems');
    }

    if (!isNumber(itemsPerPage) || isNaN(itemsPerPage)) {
      throw new Error('Please provide a number of itemsPerPage');
    }

    if (!isNumber(initialPageIndex) || isNaN(initialPageIndex)) {
      throw new Error('Please provide a number of initialPageIndex');
    }

    this.currentPageIndex = initialPageIndex;
    this.firstItemIndex = -1;
    this.itemsPerPage = itemsPerPage;
    this.lastItemIndex = -1;
    this.totalItems = totalItems;
    this.totalPages = 0;

    this.update();
  }

  setTotalItems = (totalItems: number) => {
    this.totalItems = totalItems;
    this.update();
  };

  setItemsPerPage = (itemsPerPage: number) => {
    this.itemsPerPage = itemsPerPage;
    this.update();
  };

  isPageable = () => this.firstItemIndex !== -1;

  getTotalPages = () => this.totalPages;

  getCurrentPageIndex = () => this.currentPageIndex;

  getFirstItemIndex = () => this.firstItemIndex;

  getLastItemIndex = () => this.lastItemIndex;

  hasNextPage = () => this.currentPageIndex < this.totalPages - 1;

  hasPreviousPage = () => this.currentPageIndex > 0;

  goToNextPage = () => {
    this.goToPageIndex(this.currentPageIndex + 1);
  };

  goToPreviousPage = () => {
    this.goToPageIndex(this.currentPageIndex - 1);
  };

  goToPageIndex = (pageIndex: number) => {
    this.currentPageIndex = pageIndex;
    this.update();
  };

  update = () => {
    if (this.totalItems <= 0) {
      this.totalPages = 0;
      this.currentPageIndex = 0;
      this.firstItemIndex = -1;
      this.lastItemIndex = -1;
      return;
    }

    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    // Ensure the current page falls within our range of total pages.
    this.currentPageIndex = Math.min(
      Math.max(0, this.currentPageIndex),
      this.totalPages - 1
    );

    // Find the range of visible items on the current page.
    this.firstItemIndex = this.currentPageIndex * this.itemsPerPage;
    this.lastItemIndex =
      Math.min(this.firstItemIndex + this.itemsPerPage, this.totalItems) - 1;
  };
}
