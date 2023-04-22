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

import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  OuiCode,
  OuiPagination,
  OuiPaginationButton,
} from '../../../../src/components';

import { paginationConfig } from './playground';

import ManyPages from './many_pages';
const manyPagesSource = require('./many_pages?raw');
const manyPagesHtml = renderToHtml(ManyPages);
const manyPagesSnippet = `<OuiPagination
  aria-label="my pagination"
  pageCount={higherThan5Number}
  activePage={activePage}
  onPageClick={goToPage}
/>
`;

import FewPages from './few_pages';
const fewPagesSource = require('./few_pages?raw');
const fewPagesHtml = renderToHtml(FewPages);
const fewPagesSnippet = `<OuiPagination
  aria-label="my pagination"
  pageCount={lowerThan5Number}
  activePage={activePage}
  onPageClick={goToPage}
/>
`;

import CenteredPagination from './centered_pagination';
const centeredPaginationSource = require('./centered_pagination?raw');
const centeredPaginationHtml = renderToHtml(CenteredPagination);
const centeredPaginationSnippet = `<OuiFlexGroup justifyContent="spaceAround">
  <OuiFlexItem grow={false}>
    <OuiPagination
      aria-label="my pagination"
      pageCount={pageCount}
      activePage={activePage}
      onPageClick={goToPage}
    />
  </OuiFlexItem>
</OuiFlexGroup>
`;

import CustomizablePagination from './customizable_pagination';
const customizablePaginationSource = require('./customizable_pagination?raw');
const customizablePaginationHtml = renderToHtml(CustomizablePagination);
const customizablePaginationSnippet = `<OuiFlexGroup justifyContent="spaceBetween" alignItems="center">
  <OuiFlexItem grow={false}>
    <OuiPopover
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}>
      <OuiContextMenuPanel items={items} />
    </OuiPopover>
  </OuiFlexItem>

  <OuiFlexItem grow={false}>
    <OuiPagination
      aria-label="my pagination"
      pageCount={pageCount}
      activePage={activePage}
      onPageClick={goToPage}
    />
  </OuiFlexItem>
</OuiFlexGroup>
`;

import Compressed from './compressed';
const compressedSource = require('./compressed?raw');
const compressedHtml = renderToHtml(Compressed);
const compressedSnippet = `<OuiPagination
  aria-label="my pagination"
  pageCount={pageCount}
  activePage={activePage}
  onPageClick={goToPage}
  compressed
/>
`;

export const PaginationExample = {
  title: 'Pagination',
  sections: [
    {
      title: 'Many pages',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: manyPagesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: manyPagesHtml,
        },
      ],
      text: (
        <p>
          We only show at most 5 consecutive pages, with shortcuts to the first
          and/or last page.
        </p>
      ),
      props: { OuiPagination, OuiPaginationButton },
      snippet: manyPagesSnippet,
      demo: <ManyPages />,
    },
    {
      title: 'Few pages',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fewPagesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fewPagesHtml,
        },
      ],
      text: (
        <p>
          The UI simplifies when we have fewer than the maximum number of
          visible pages.
        </p>
      ),
      snippet: fewPagesSnippet,
      demo: <FewPages />,
    },
    {
      title: 'Centered pagination',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: centeredPaginationSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: centeredPaginationHtml,
        },
      ],
      text: (
        <p>
          You can use{' '}
          <Link to="/layout/flex">
            <strong>OuiFlexGroup</strong>
          </Link>{' '}
          to set up this pagination layout.
        </p>
      ),
      snippet: centeredPaginationSnippet,
      demo: <CenteredPagination />,
    },
    {
      title: 'Compressed display',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: compressedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: compressedHtml,
        },
      ],
      text: (
        <p>
          Use the <OuiCode>compressed</OuiCode> prop to minimize the horizontal
          footprint.
        </p>
      ),
      snippet: compressedSnippet,
      demo: <Compressed />,
    },
    {
      title: 'Customizable pagination',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customizablePaginationSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: customizablePaginationHtml,
        },
      ],
      text: (
        <p>
          You can use{' '}
          <Link to="/layout/flex">
            <strong>OuiFlexGroup</strong>
          </Link>{' '}
          to set up this pagination layout, commonly used with{' '}
          <Link to="/tabular-content/tables">tables</Link>.
        </p>
      ),
      snippet: customizablePaginationSnippet,
      demo: <CustomizablePagination />,
    },
  ],
  playground: paginationConfig,
};
