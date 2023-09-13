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
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import { OuiCode, OuiEmptyPrompt } from '../../../../src/components';

import emptyPromptConfig from './playground';

import EmptyPrompt from './empty_prompt';
const emptyPromptSource = require('./empty_prompt?raw');
const emptyPromptSnippet = `<OuiEmptyPrompt
  iconType="editorStrike"
  title={<h2>No data available</h2>}
  body={bodyContent}
  actions={actions}
/>`;

import Custom from './custom';
const customSource = require('./custom?raw');
const customSnippet = `<OuiEmptyPrompt
  iconType="editorStrike"
  title={<h2>No data available</h2>}
  titleSize="xs"
  body={bodyContent}
  actions={actions}
/>`;

import Simple from './simple';
const simpleSource = require('./simple?raw');
const simpleSnippet = `<OuiEmptyPrompt
  title={<h2>No data available</h2>}
  actions={multipleActions}
/>`;

import Loading from './empty_prompt_loading';
const loadingSource = require('./empty_prompt_loading?raw');
const loadingSnippet = `<OuiEmptyPrompt
  icon={<OuiLoadingLogo logo="logoOpenSearch" size="xl" />}
  title={<h2>Loading</h2>}
/>`;

import Error from './empty_prompt_error';
const errorSource = require('./empty_prompt_error?raw');
const errorSnippet = `<OuiEmptyPrompt
  iconType="alert"
  iconColor="danger"
  title={<h2>There was an error</h2>}
/>`;

import States from './empty_prompt_states';
const statesSource = require('./empty_prompt_states?raw');

export const EmptyPromptExample = {
  title: 'Empty prompt',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: emptyPromptSource,
        },
      ],
      text: (
        <p>
          Use the <strong>OuiEmptyPrompt</strong> as a placeholder for any type
          of empty content. They are especially helpful for replacing entire
          pages that contain no content.
        </p>
      ),
      props: { OuiEmptyPrompt },
      demo: <EmptyPrompt />,
      snippet: emptyPromptSnippet,
      playground: emptyPromptConfig,
    },
    {
      title: 'Custom sizes and colors',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customSource,
        },
      ],
      text: (
        <p>
          You can control the title size and icon color with the{' '}
          <OuiCode>titleSize</OuiCode> and <OuiCode>iconColor</OuiCode> props
          respectively.
        </p>
      ),
      props: { OuiEmptyPrompt },
      demo: <Custom />,
      snippet: customSnippet,
    },
    {
      title: 'Less content, more actions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: simpleSource,
        },
      ],
      text: (
        <Fragment>
          <p>You can remove parts of the prompt to simplify it.</p>
          <p>
            You can also provide an array of multiple actions. Be sure to list
            primary actions first and secondary actions as empty buttons.
          </p>
        </Fragment>
      ),
      props: { OuiEmptyPrompt },
      demo: <Simple />,
      snippet: simpleSnippet,
    },
    {
      title: 'Loading and error prompts',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: loadingSource,
        },
      ],
      text: (
        <>
          <p>
            Empty prompts can also be used to emulate loading and error states,
            by utilizing the same patterns.
          </p>
          <p>
            For <strong>loading</strong> states, you can simply replace the{' '}
            <OuiCode>iconType</OuiCode> with a custom <OuiCode>icon</OuiCode> by
            passing in one of our{' '}
            <Link to="/display/loading">loading components</Link>.
          </p>
        </>
      ),
      props: { OuiEmptyPrompt },
      demo: <Loading />,
      snippet: loadingSnippet,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: errorSource,
        },
      ],
      text: (
        <>
          <p>
            For <strong>error</strong> states, you can simply set the{' '}
            <OuiCode>iconColor</OuiCode> to <OuiCode>danger</OuiCode> and/or
            wrap the whole prompt in a <OuiCode>danger</OuiCode> colored{' '}
            <Link to="/display/panel">
              <strong>OuiPanel</strong>
            </Link>
            .
          </p>
        </>
      ),
      props: { OuiEmptyPrompt },
      demo: <Error />,
      snippet: errorSnippet,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: statesSource,
        },
      ],
      text: (
        <>
          <p>
            You can then tie all three states together to create a seamless
            loading to empty or loading to error experience. The following
            example shows how to encorprate these states with{' '}
            <Link to="/layout/page#simple-layout-with-centered-content">
              <strong>OuiPageTemplate</strong>
            </Link>{' '}
            using <OuiCode>{'template="centeredContent"'}</OuiCode> and passing{' '}
            <OuiCode>{'color="danger"'}</OuiCode> to the{' '}
            <OuiCode>pageContentProps</OuiCode> for the error state.
          </p>
        </>
      ),
      props: { OuiEmptyPrompt },
      demo: (
        <div className="guideDemo__highlightLayout">
          <States />
        </div>
      ),
    },
  ],
};
