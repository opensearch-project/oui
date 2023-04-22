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

import { OuiCallOut, OuiText, OuiCode } from '../../../../src/components';
import callOutConfig from './playground';

import Info from './info';
const infoSource = require('./info?raw');
const infoHtml = renderToHtml(Info);
const infoSnippet = [
  `<OuiCallOut size="m" title="Just a title. No content." iconType="gear" />
`,
  `<OuiCallOut
  size="s"
  title="A beautiful title"
  iconType="search">
  <p><!-- Content --></p>
</OuiCallOut>
`,
];

import Success from './success';
const successSource = require('./success?raw');
const successHtml = renderToHtml(Success);
const successSnippet = [
  `<OuiCallOut title="Good news, everyone!" color="success" iconType="user">
  <p><!-- Content --></p>
</OuiCallOut>
`,
];

import Warning from './warning';
const warningSource = require('./warning?raw');
const warningHtml = renderToHtml(Warning);
const warningSnippet = [
  `<OuiCallOut title="Proceed with caution!" color="warning" iconType="help">
  <p><!-- Content --></p>
</OuiCallOut>
`,
];

import Danger from './danger';
const dangerSource = require('./danger?raw');
const dangerHtml = renderToHtml(Danger);
const dangerSnippet = [
  `<OuiCallOut title="Sorry, there was an error" color="danger" iconType="alert">
  <p><!-- Content --></p>
</OuiCallOut>
`,
];

export const CallOutExample = {
  title: 'Callout',
  intro: (
    <Fragment>
      <OuiText>
        <p>
          <strong>OuiCallOut</strong> contains a message directly related to
          content on the page. This includes general information, success,
          warning, and error messages.
        </p>
        <p>
          <strong>Keep these guidelines in mind:</strong>
        </p>
        <ul>
          <li>Minimize the number of callouts per page.</li>
          <li>
            Stack callouts in the order in which they require users&apos;
            attention: error, warning, info, and then success.
          </li>
          <li>
            Offer only one action per callout and ensure it&apos;s an action
            users can perform quickly.
          </li>
          <li>
            If the callout has a permanent spot in the UI, but needs to be less
            obstructive, set the <OuiCode>size</OuiCode> property to{' '}
            <OuiCode>s</OuiCode> (small).
          </li>
          <li>
            Use an <OuiCode>icon</OuiCode> prop if it adds context.
          </li>
        </ul>
      </OuiText>
    </Fragment>
  ),
  sections: [
    {
      title: 'Info',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: infoSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: infoHtml,
        },
      ],
      text: (
        <div>
          <p>
            Use <strong>OuiCallOut</strong> to communicate general information
            to the user.
          </p>
        </div>
      ),
      props: { OuiCallOut },
      snippet: infoSnippet,
      demo: <Info />,
    },
    {
      title: 'Success',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: successSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: successHtml,
        },
      ],
      text: (
        <p>
          Use this callout to notify the user of an action that succesfully
          completed. Use success callouts sparingly&mdash;callouts are typically
          used for things that are broken rather than things that succeed.
        </p>
      ),
      snippet: successSnippet,
      demo: <Success />,
    },
    {
      title: 'Warning',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: warningSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: warningHtml,
        },
      ],
      text: (
        <p>
          Use this callout to warn the user against decisions they might regret.
        </p>
      ),
      snippet: warningSnippet,
      demo: <Warning />,
    },
    {
      title: 'Danger',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dangerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dangerHtml,
        },
      ],
      text: (
        <p>Use this callout to let the user know that something went wrong.</p>
      ),
      snippet: dangerSnippet,
      demo: <Danger />,
    },
  ],
  playground: callOutConfig,
};
