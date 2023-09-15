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
  OuiMarkdownEditor,
  OuiText,
  OuiCode,
} from '../../../../src/components';

import { Link } from 'react-router-dom';

import MarkdownEditor from './markdown_editor';
const markdownEditorSource = require('./markdown_editor?raw');
const markdownEditorHtml = renderToHtml(MarkdownEditor);
const markdownEditorSnippet = `<OuiMarkdownEditor
  value={value}
  onChange={setValue}
/>`;

import MarkdownEditorErrors from './markdown_editor_errors';
const markdownEditorErrorsSource = require('./markdown_editor_errors?raw');
const markdownEditorErrorsHtml = renderToHtml(MarkdownEditorErrors);
const markdownEditorErrorsSnippet = `<OuiMarkdownEditor
  value={value}
  onChange={setValue}
  onParse={onParse}
  errors={messages}
/>`;

import MarkdownEditorHeight from './markdown_editor_height';
const markdownEditorHeightSource = require('./markdown_editor_height?raw');
const markdownEditorHeightHtml = renderToHtml(MarkdownEditorHeight);
const markdownEditorHeightSnippet = [
  `// Custom height with auto-expanding preview
<OuiMarkdownEditor
  value={value}
  onChange={setValue}
  height={200}
/>`,
  `// Height set to full
<OuiMarkdownEditor
  value={value}
  onChange={setValue}
  height="full"
/>`,
  `// Custom height with no auto-expanding preview
<OuiMarkdownEditor
  value={value}
  onChange={setValue}
  height={200}
  autoExpandPreview={false}
/>`,
  `// Custom height and custom max height
<OuiMarkdownEditor
  value={value}
  onChange={setValue}
  height={200}
  maxHeight={300}
/>`,
];

export const MarkdownEditorExample = {
  title: 'Markdown editor',
  beta: true,
  intro: (
    <Fragment>
      <OuiText>
        <p>
          <strong>OuiMarkdownEditor</strong> provides a markdown authoring
          experience for the user. The component consists of a toolbar, text
          area, and a drag-and-drop zone to accept files (if configured to do
          so). There are two modes: a textarea that keeps track of cursor
          position, and a rendered preview mode that is powered by{' '}
          <strong>
            <Link to="/editors-syntax/markdown-format/">OuiMarkdownFormat</Link>
          </strong>
          . State is maintained between the two and it is possible to pass
          changes from the preview area to the textarea and vice versa.
        </p>
      </OuiText>
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markdownEditorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markdownEditorHtml,
        },
      ],
      title: 'Base editor',
      text: (
        <p>
          The base editor can render basic markdown along with some built-in
          plugins.
        </p>
      ),
      props: {
        OuiMarkdownEditor,
      },
      snippet: markdownEditorSnippet,
      demo: <MarkdownEditor />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markdownEditorErrorsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markdownEditorErrorsHtml,
        },
      ],
      title: 'Error handling and feedback',
      text: (
        <p>
          The <OuiCode>errors</OuiCode> prop allows you to pass an array of
          errors if syntax is malformed. The below example starts with an
          incomplete tooltip tag, showing this error message by default. These
          errors are meant to be ephemeral and part of the editing experience.
          They should not be a substitute for{' '}
          <Link to="/forms/form-validation">form validation</Link>.
        </p>
      ),
      props: {
        OuiMarkdownEditor,
      },
      snippet: markdownEditorErrorsSnippet,
      demo: <MarkdownEditorErrors />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markdownEditorHeightSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markdownEditorHeightHtml,
        },
      ],
      title: 'Controlling the height',
      text: (
        <>
          <p>
            The <OuiCode>height</OuiCode> prop allows you to control the height
            of the <strong>OuiMarkdownEditor</strong>. You can set the{' '}
            <OuiCode>height</OuiCode> in pixels or pass{' '}
            <OuiCode>&quot;full&quot;</OuiCode> to allow the{' '}
            <strong>OuiMarkdownEditor</strong> to fill the height of its
            container. By default, the <OuiCode>autoExpandPreview</OuiCode> prop
            is set to <OuiCode>true</OuiCode>. This means that the preview{' '}
            <OuiCode>height</OuiCode> is automatically adjusted to fit all the
            content and avoid a scrollbar.
          </p>
          <p>
            You can also control the <OuiCode>maxHeight</OuiCode> of the{' '}
            editor/preview area. This prop only works when the{' '}
            <OuiCode>height</OuiCode> is not set to{' '}
            <OuiCode>&quot;full&quot;</OuiCode>.
          </p>
        </>
      ),
      props: {
        OuiMarkdownEditor,
      },
      snippet: markdownEditorHeightSnippet,
      demo: <MarkdownEditorHeight />,
    },
  ],
};
