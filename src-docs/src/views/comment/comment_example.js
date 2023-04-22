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
  OuiComment,
  OuiCommentList,
} from '../../../../src/components';
import commentConfig from './playground';

import Comment from './comment';
const commentSource = require('./comment?raw');
const commentHtml = renderToHtml(Comment);

import CommentTypes from './comment_types';
const commentTypesSource = require('./comment_types?raw');
const commentTypesHtml = renderToHtml(CommentTypes);

import CommentTimelineIcons from './comment_timelineIcons';
const commentTimelineIconsSource = require('./comment_timelineIcons?raw');
const commentTimelineIconsHtml = renderToHtml(CommentTimelineIcons);

import CommentActions from './comment_actions';
const commentActionsSource = require('./comment_actions?raw');
const commentActionsHtml = renderToHtml(CommentActions);

import CommentList from './comment_list';
const commentListSource = require('./comment_list?raw');
const commentListHtml = renderToHtml(CommentList);

const commentSnippet = `<OuiComment username="janed">
  {body}
</OuiComment>`;

const commentTypesSnippet = [
  `<OuiComment username="janed">
  {body}
</OuiComment>
`,
  `<OuiComment type="update" username="janed" />
`,
  `<OuiComment type="update" username="janed">
  {body}
</OuiComment>
`,
];

const commentTimelineIconsSnippet = [
  `<OuiComment username="janed">
  {body}
</OuiComment>
`,
  `<OuiComment timelineIcon="tag" username="janed" />
`,
  `<OuiComment timelineIcon={avatar} username="janed">
  {body}
</OuiComment>
`,
];

const commentActionsSnippet = `<OuiComment username="janed" actions={customActions}>
  {body}
</OuiComment>`;

const commentListSnippet = `<OuiCommentList
  comments={[
    {
      username: username,
      event: event,
      timestamp: timestamp,
      children: body,
    },
]}
/>`;

export const CommentListExample = {
  title: 'Comment list',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentListSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: commentListHtml,
        },
      ],
      text: (
        <div>
          Use <strong>OuiCommentList</strong> to display a list of{' '}
          <strong>OuiComments</strong>. Pass an array of{' '}
          <strong>OuiComment</strong> objects and{' '}
          <strong>OuiCommentList</strong> will generate a comment thread.
        </div>
      ),
      props: { OuiCommentList, OuiComment },
      snippet: commentListSnippet,
      demo: <CommentList />,
    },
    {
      title: 'Comment',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: commentHtml,
        },
      ],
      text: (
        <div>
          <p>
            Use <strong>OuiComment</strong> to display comments. Each{' '}
            <strong>OuiComment</strong> has two parts: a{' '}
            <OuiCode>timelineIcon</OuiCode> on the left and content on the
            right. The <OuiCode>timelineIcon</OuiCode> provides a visual
            indication of the <OuiCode>type</OuiCode> of comment it is. For
            example, it can be an icon that represents what action was performed
            or it can be a user avatar. The content has a header with all the
            relevant metadata and a body.
          </p>
        </div>
      ),
      props: { OuiComment },
      snippet: commentSnippet,
      demo: <Comment />,
    },
    {
      title: 'Comment types',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentTypesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: commentTypesHtml,
        },
      ],
      text: (
        <div>
          <p>
            The default <OuiCode>type</OuiCode> of comment is
            <OuiCode>regular</OuiCode> and displays a comment that a user has
            written.
          </p>
          <p>
            Change the type to <OuiCode>update</OuiCode> to display comments
            that generally do not have a body and are logging actions that
            either the user or the system has performed.
          </p>
        </div>
      ),
      props: { OuiComment },
      snippet: commentTypesSnippet,
      demo: <CommentTypes />,
    },
    {
      title: 'Custom timeline icon',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentTimelineIconsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: commentTimelineIconsHtml,
        },
      ],
      text: (
        <div>
          <p>
            There are three ways to use <OuiCode>timelineIcon</OuiCode>:
          </p>
          <ol>
            <li>
              Use the defaults; a user icon inside a large container for
              <OuiCode>regular</OuiCode> comments; or a dot icon inside a small
              container for <OuiCode>update</OuiCode> comments.
            </li>
            <li>
              Pass a string with any of the icon types that{' '}
              <strong>OuiIcon</strong> supports and it will receive the default
              styling.
            </li>
            <li>
              Pass any other element (e.g.{' '}
              <Link to="/display/avatar">
                <strong>OuiAvatar</strong>
              </Link>
              ). It is recommended not to use an element larger than 40x40.
            </li>
          </ol>
        </div>
      ),
      props: { OuiComment },
      snippet: commentTimelineIconsSnippet,
      demo: <CommentTimelineIcons />,
    },
    {
      title: 'Actions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentActionsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: commentActionsHtml,
        },
      ],
      text: (
        <div>
          <p>
            There are scenarios where you might want to allow the user to
            perform <OuiCode>actions</OuiCode> related to each comment. Some
            common <OuiCode>actions</OuiCode> include: editing, deleting,
            sharing and copying. To add custom <OuiCode>actions</OuiCode> to a
            comment, use the <OuiCode>actions</OuiCode>
            prop. These will be placed to the right of the metadata in the
            comment&apos;s header. You can use any element to display{' '}
            <OuiCode>actions</OuiCode>. For example, for something simple you
            can use{' '}
            <Link to="/navigation/button">
              <strong>OuiButtonIcon</strong>
            </Link>{' '}
            and for something more complex you can combine that with{' '}
            <Link to="/layout/popover">
              <strong>OuiPopover</strong>
            </Link>{' '}
            and{' '}
            <Link to="/navigation/context-menu">
              <strong>OuiContextMenu</strong>
            </Link>
            .
          </p>
        </div>
      ),
      props: { OuiComment },
      snippet: commentActionsSnippet,
      demo: <CommentActions />,
    },
  ],
  playground: commentConfig,
};
