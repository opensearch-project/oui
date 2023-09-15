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
  OuiDescriptionList,
  OuiDescriptionListTitle,
  OuiDescriptionListDescription,
} from '../../../../src/components';

import DescriptionList from './description_list';
const descriptionListSource = require('./description_list?raw');
const descriptionListHtml = renderToHtml(DescriptionList);
const descriptionListSnippet = [
  `<OuiDescriptionList
  listItems={[
    {
      title: 'List item 1',
      description: 'Minim consectetur irure ullamco magna et veniam deserunt veniam do eiusmod.',
    },
  ]}
/>`,
  `<OuiDescriptionList>
  <OuiDescriptionListTitle>Item 2</OuiDescriptionListTitle>
  <OuiDescriptionListDescription>
    Irure do elit elit sint ex excepteur nisi.
  </OuiDescriptionListDescription>
</OuiDescriptionList>`,
];

import DescriptionListColumn from './description_list_column';
const descriptionListColumnSource = require('./description_list_column?raw');
const descriptionListColumnHtml = renderToHtml(DescriptionListColumn);
const descriptionListColumnSnippet = [
  `<OuiDescriptionList
  type="column"
  listItems={list}
/>`,
  `<OuiDescriptionList
  type="responsiveColumn"
  listItems={list}
/>`,
];

import DescriptionListStyling from './description_list_styling';
const descriptionListStylingSource = require('./description_list_styling?raw');
const descriptionListStylingHtml = renderToHtml(DescriptionListStyling);
const descriptionListStylingSnippet = [
  `<OuiDescriptionList
  listItems={list}
  align="center"
  compressed
/>`,
];

import DescriptionListInline from './description_list_inline';
const descriptionListInlineSource = require('./description_list_inline?raw');
const descriptionListInlineHtml = renderToHtml(DescriptionListInline);
const descriptionListInlineSnippet = [
  `<OuiDescriptionList
  type="inline"
  listItems={list}
/>`,
];

import DescriptionListReverse from './description_list_reverse';
const descriptionListReverseSource = require('./description_list_reverse?raw');
const descriptionListReverseHtml = renderToHtml(DescriptionListReverse);
const descriptionListReverseSnippet = [
  `<OuiDescriptionList
  textStyle="reverse"
  listItems={list}
/>`,
];

import DescriptionListClasses from './description_list_classes';
const descriptionListClassesSource = require('./description_list_classes?raw');
const descriptionListClassesHtml = renderToHtml(DescriptionListClasses);
const descriptionListClassesSnippet = [
  `<OuiDescriptionList
  titleProps={{ className: 'oui-textTruncate' }}
  descriptionProps={{ className: 'oui-textTruncate' }}
  listItems={list}
/>`,
];

export const DescriptionListExample = {
  title: 'Description list',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: descriptionListSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: descriptionListHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiDescriptionList</strong> is a component for listing pairs
          of information together. You can use the component on its own, passing
          in an object for the list, or use the{' '}
          <strong>OuiDescriptionListTitle</strong> and{' '}
          <strong>OuiDescriptionListDescription</strong> components separately
          to build a list manually.
        </p>
      ),
      props: {
        OuiDescriptionList,
        OuiDescriptionListTitle,
        OuiDescriptionListDescription,
      },
      snippet: descriptionListSnippet,
      demo: <DescriptionList />,
    },
    {
      title: 'Reverse style',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: descriptionListReverseSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: descriptionListReverseHtml,
        },
      ],
      text: (
        <div>
          <p>
            Setting the <OuiCode>textStyle</OuiCode> prop to{' '}
            <OuiCode>reverse</OuiCode> will reverse the text styles of the{' '}
            <OuiCode>title</OuiCode> and <OuiCode>description</OuiCode> elements
            so that the description is more prominent. This works best for
            key/value type content.
          </p>
          <p>
            Adding this property to the <OuiCode>inline</OuiCode> type will not
            change anything.
          </p>
        </div>
      ),
      snippet: descriptionListReverseSnippet,
      demo: <DescriptionListReverse />,
    },
    {
      title: 'As columns',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: descriptionListColumnSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: descriptionListColumnHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Using the prop <OuiCode>type</OuiCode> set to{' '}
            <OuiCode>column</OuiCode> description lists can be presented in an
            inline, column format.
          </p>
          <p>
            To return to the typical row format on smaller screens set{' '}
            <OuiCode>type</OuiCode> to <OuiCode>responsiveColumn</OuiCode>.
          </p>
        </Fragment>
      ),
      snippet: descriptionListColumnSnippet,
      demo: <DescriptionListColumn />,
    },
    {
      title: 'Inline',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: descriptionListInlineSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: descriptionListInlineHtml,
        },
      ],
      text: (
        <p>
          Using a prop <OuiCode>type</OuiCode> set to <OuiCode>inline</OuiCode>{' '}
          description lists can be presented in an inline, blob format. This is
          useful for JSON code blocks. Inline description lists are sized
          smaller than normal lists due to their compact nature.
        </p>
      ),
      snippet: descriptionListInlineSnippet,
      demo: <DescriptionListInline />,
    },
    {
      title: 'Centered and compressed',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: descriptionListStylingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: descriptionListStylingHtml,
        },
      ],
      text: (
        <p>
          Using the <OuiCode>align</OuiCode> and <OuiCode>compressed</OuiCode>{' '}
          props you can further tailor the look of a description list. This
          works with column and inline types.
        </p>
      ),
      snippet: descriptionListStylingSnippet,
      demo: <DescriptionListStyling />,
    },
    {
      title: 'Passing className',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: descriptionListClassesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: descriptionListClassesHtml,
        },
      ],
      text: (
        <p>
          When using the <OuiCode>listItems</OuiCode> prop to pass an object of
          items and you need to also add a <OuiCode>className</OuiCode> (or
          other available prop) to the individual pieces, you can use the{' '}
          <OuiCode>titleProps</OuiCode> and <OuiCode>descriptionProps</OuiCode>{' '}
          to do so.
        </p>
      ),
      snippet: descriptionListClassesSnippet,
      demo: <DescriptionListClasses />,
    },
  ],
};
