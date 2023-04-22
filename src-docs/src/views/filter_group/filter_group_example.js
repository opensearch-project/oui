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

import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  OuiCode,
  OuiFilterGroup,
  OuiFilterButton,
  OuiFilterSelectItem,
} from '../../../../src/components';

import FilterGroup from './filter_group';
const filterGroupSource = require('./filter_group?raw');
const filterGroupHtml = renderToHtml(FilterGroup);

import FilterGroupSimple from './filter_group_simple';
const filterGroupSimpleSource = require('./filter_group_simple?raw');
const filterGroupSimpleHtml = renderToHtml(FilterGroup);

import FilterGroupMulti from './filter_group_multi';
const filterGroupMultiSource = require('./filter_group_multi?raw');
const filterGroupMultiHtml = renderToHtml(FilterGroup);

export const FilterGroupExample = {
  title: 'Filter group',
  sections: [
    {
      title: 'Filter buttons',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: filterGroupSimpleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: filterGroupSimpleHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Use <strong>OuiFilterGroup</strong> to wrap{' '}
            <strong>OuiFilterButtons</strong> into a container that looks nice
            against form fields (like search). These buttons are used in two
            different patterns. The most simplest use is that of an on/off
            pattern to show whether a filter is on. Add the prop{' '}
            <OuiCode>withNext</OuiCode> to remove the border between it and the
            next OuiFilterButton to visually group similar or opposite style
            filters.
          </p>
          <p>
            Add the prop <OuiCode>withNext</OuiCode> to remove the border
            between it and the next OuiFilterButton to visually group similar or
            opposite style filters.
          </p>
          <p>
            Set <OuiCode>hasActiveFilters</OuiCode> to true when the filter is
            active.
          </p>
        </Fragment>
      ),
      props: { OuiFilterGroup, OuiFilterButton },
      demo: <FilterGroupSimple />,
      snippet: `<OuiFilterGroup>
  <OuiFilterButton
    hasActiveFilters={isFilterOn}
    onClick={toggleFilter}
  >
    Single filter
  </OuiFilterButton>
</OuiFilterGroup>`,
    },
    {
      title: 'Multi-select',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: filterGroupMultiSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: filterGroupMultiHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            To provide a long list of grouped filter, use a popover for
            filtering an array of passed items. This mostly uses standard
            popover mechanics, but the component{' '}
            <strong>OuiFilterSelectItem</strong> is used for the items
            themselves.
          </p>
          <h3>Indicating number of filters</h3>
          <p>
            By passing a number to <OuiCode>numFilters</OuiCode> you can express
            the number of filters available. When the user has applied these
            filter add the prop <OuiCode>hasActiveFilters</OuiCode> as before
            and this will change the coloring of the indicator. You can also
            supply a number to <OuiCode>numActiveFilters</OuiCode>
            which will change the number displayed.
          </p>
        </Fragment>
      ),
      props: { OuiFilterButton, OuiFilterSelectItem },
      demo: <FilterGroupMulti />,
      snippet: `<OuiFilterGroup>
  <OuiPopover
    button={
      <OuiFilterButton
        iconType="arrowDown"
        onClick={onButtonClick}
        isSelected={isPopoverOpen}
        numFilters={items.length}
        hasActiveFilters={true}
        numActiveFilters={2}
      >
        Filters
      </OuiFilterButton>
    }
    isOpen={isPopoverOpen}
    closePopover={closePopover}
  >
    ...
  </OuiPopover>
</OuiFilterGroup>`,
    },
    {
      title: 'Layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: filterGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: filterGroupHtml,
        },
      ],
      text: (
        <p>
          By default, the bar is auto-widthed based on its contents. To expand
          the bar to fill its parent&apos;s width add{' '}
          <OuiCode>fullWidth</OuiCode>. This will also set each button to grow.
          If you do not want the button to grow, set{' '}
          <OuiCode language="js">grow=false</OuiCode>.
        </p>
      ),
      components: { OuiFilterGroup },
      props: { OuiFilterGroup, OuiFilterButton, OuiFilterSelectItem },
      demo: <FilterGroup />,
      snippet: `<OuiFilterGroup fullWidth>
  <OuiFilterButton>
    Single filter
  </OuiFilterButton>
  <OuiFilterButton grow={false} withNext>
    On
  </OuiFilterButton>
  <OuiFilterButton grow={false}>
    Off
  </OuiFilterButton>
</OuiFilterGroup>`,
    },
  ],
};
