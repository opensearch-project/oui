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

import { OuiPagination } from '../../../../src/components';

export default function () {
  const [activePage, setActivePage] = useState(0);
  const PAGE_COUNT = 4;

  const goToPage = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <OuiPagination
      pageCount={PAGE_COUNT}
      activePage={activePage}
      onPageClick={(activePage) => goToPage(activePage)}
      compressed
    />
  );
}
