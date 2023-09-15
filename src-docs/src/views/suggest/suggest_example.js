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

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  OuiCallOut,
  OuiCode,
  OuiSpacer,
  OuiSuggest,
  OuiSuggestItem,
} from '../../../../src/components';

import Suggest from './suggest';
const suggestSource = require('./suggest?raw');
const suggestHtml = renderToHtml(Suggest);

import SavedQueries from './saved_queries';
const savedQueriesSource = require('./saved_queries?raw');
const savedQueriesHtml = renderToHtml(SavedQueries);

import SuggestItem from './suggest_item';
const suggestItemSource = require('./suggest_item?raw');
const suggestItemHtml = renderToHtml(SuggestItem);
const suggestItemSnippet = [
  `<OuiSuggestItem
  type={sampleItem.type}
  label={sampleItem.label}
  description={sampleItem.description}
/>
`,
  `<OuiSuggestItem
  type={sampleItem.type}
  label={sampleItem.label}
  description={sampleItem.description}
  labelDisplay="expand"
/>`,
  `<OuiSuggestItem
  type={sampleItem.type}
  label={sampleItem.label}
  description={sampleItem.description}
  labelWidth="30"
/>`,
  `<OuiSuggestItem
  type={sampleItem.type}
  label={sampleItem.label}
  description={sampleItem.description}
  descriptionDisplay="wrap"
/>`,
];

const suggestSnippet = [
  `<OuiSuggest
  status={status}
  tooltipContent={tooltipContent}
  onInputChange={getInputValue}
  onItemClick={onItemClick}
  suggestions={[
    {
      type: { iconType: 'kqlField', color: 'tint4' },
      label: 'Field sample',
      description: 'This is the description',
    },
    {
      type: { iconType: 'kqlValue', color: 'tint0' },
      label: 'Value sample',
      description: 'This is the description',
    },
  ]}
/>`,
];

export const SuggestExample = {
  title: 'Suggest',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: suggestSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: suggestHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>OuiSuggest</strong> is a text field component used to
            display suggestions. The status of the component is shown on its
            right side. The available <OuiCode>status</OuiCode> are:{' '}
            <OuiCode>unsaved</OuiCode>, <OuiCode>saved</OuiCode>,
            <OuiCode>unchanged</OuiCode> and <OuiCode>isLoading</OuiCode>.
          </p>
        </div>
      ),
      props: { OuiSuggest },
      snippet: suggestSnippet,
      demo: <Suggest />,
    },
    {
      title: 'Suggest item',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: suggestItemSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: suggestItemHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>OuiSuggestItem</strong> is a list item component to display
            suggestions when typing queries in <strong>OuiSuggest</strong>. Use{' '}
            <OuiCode>labelDisplay</OuiCode> to set whether the{' '}
            <OuiCode>label</OuiCode> has a fixed width or not. By default, fixed
            labels will have a width of 50%, you can adjust this by setting{' '}
            <OuiCode>labelWidth</OuiCode>. Use{' '}
            <OuiCode>descriptionDisplay</OuiCode> to set whether the{' '}
            <OuiCode>description</OuiCode> truncates or wraps.
          </p>
        </div>
      ),
      props: { OuiSuggestItem },
      snippet: suggestItemSnippet,
      demo: <SuggestItem />,
    },
    {
      title: 'Saved queries and filters',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: savedQueriesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: savedQueriesHtml,
        },
      ],
      text: (
        <div>
          <OuiCallOut color="warning" title="Demo of visual pattern only">
            <p>
              This documents a <strong>visual</strong> pattern for OpenSearch
              Dashboard&apos;s global query and filter bars. The filter bar has
              been broken down into multiple components. There are still bugs
              and not all the logic is well-formed.
            </p>
          </OuiCallOut>
          <OuiSpacer />
        </div>
      ),
      props: { OuiSuggest },
      demo: <SavedQueries />,
    },
  ],
};
