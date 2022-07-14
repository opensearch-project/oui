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

import {
  section as inMemorySection,
  selectionSection as inMemorySelectionSection,
  searchSection as inMemorySearchSection,
  searchExternalSection as inMemorySearchExternalSection,
  searchCallbackSection as inMemorySearchCallbackSection,
  customSortingSection as inMemoryCustomSortingSection,
  controlledPaginationSection as inMemoryControlledPaginationSection,
} from './in_memory';

export const TableInMemoryExample = {
  title: 'In-memory tables',
  sections: [
    inMemorySection,
    inMemorySelectionSection,
    inMemorySearchSection,
    inMemorySearchCallbackSection,
    inMemorySearchExternalSection,
    inMemoryCustomSortingSection,
    inMemoryControlledPaginationSection,
  ],
};
