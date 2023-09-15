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
  OuiToast,
  OuiGlobalToastList,
  OuiGlobalToastListItem,
  OuiText,
} from '../../../../src/components';
import Guidelines from './guidelines';
import toastConfig from './playground';

import ToastList from './toast_list';
const toastListSource = require('./toast_list?raw');
const toastListHtml = renderToHtml(ToastList);
const toastListSnippet = [
  `<OuiGlobalToastList
  toasts={[
    {
      id: 1,
      title: "Example Toast",
      text: <p><!-- Content --></p>,
    }
  ]}
  dismissToast={dismissToast}
  toastLifeTimeMs={6000}/>`,
];

import Default from './default';
const defaultSource = require('./default?raw');
const defaultHtml = renderToHtml(Default);
const defaultToastSnippet = [
  `<OuiToast
  title="Default toast"
  onClose={closeToast}>
  <!-- Raw HTML content -->
  </OuiToast>`,
];

import Info from './info';
const infoSource = require('./info?raw');
const infoHtml = renderToHtml(Info);
const infoToastSnippet = [
  `<OuiToast
  title="Info toast"
  type="info"
  onClose={closeToast}>
  <!-- Raw HTML content -->
  </OuiToast>`,
];

import Success from './success';
const successSource = require('./success?raw');
const successHtml = renderToHtml(Success);
const successToastSnippet = [
  `<OuiToast
  title="Success toast"
  color="success"
  iconType="check"
  onClose={closeToast}>
  <!-- Raw HTML content -->
  </OuiToast>`,
];

import Warning from './warning';
const warningSource = require('./warning?raw');
const warningHtml = renderToHtml(Warning);
const warningToastSnippet = [
  `<OuiToast
  title="Warning toast"
  color="warning"
  iconType="help"
  onClose={closeToast}>
  <!-- Raw HTML content -->
  </OuiToast>`,
];

import Danger from './danger';
const dangerSource = require('./danger?raw');
const dangerHtml = renderToHtml(Danger);
const dangerToastSnippet = [
  `<OuiToast
  title="Danger toast"
  color="danger"
  iconType="alert"
  onClose={closeToast}>
  <!-- Raw HTML content -->
  </OuiToast>`,
];

export const ToastExample = {
  title: 'Toast',
  intro: (
    <OuiText>
      <p>
        Be sure to read the full{' '}
        <Link to="/guidelines/toast">toast usage guidelines</Link>.
      </p>
    </OuiText>
  ),
  sections: [
    {
      title: 'Toast list',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: toastListSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: toastListHtml,
        },
      ],
      props: {
        OuiToast,
        OuiGlobalToastList,
        OuiGlobalToastListItem,
      },
      demo: (
        <>
          <ToastList />
        </>
      ),
      snippet: toastListSnippet,
    },
    {
      title: 'Default',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: defaultSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: defaultHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>OuiToast</strong> allows for small notes that appear in the
            bottom right of the screen. They should be used for ephemeral, live
            actions (think <strong>save complete</strong> or{' '}
            <strong>something just finished right now</strong>).
          </p>
          <p>
            They should not be used for historical actions (
            <strong>your report built 30 minutes ago</strong>). This means that
            a user should never be greeted with toasts when starting a session.
            Toasts should be brief and avoid long paragraphs of text or titling.
          </p>
        </div>
      ),
      demo: (
        <div style={{ maxWidth: 320 }}>
          <Default />
        </div>
      ),
      snippet: defaultToastSnippet,
    },
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
        <p>
          Setting <OuiCode language="js">type=&quot;info&quot;</OuiCode>.
        </p>
      ),
      demo: (
        <div style={{ maxWidth: 320 }}>
          <Info />
        </div>
      ),
      snippet: infoToastSnippet,
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
          Setting <OuiCode language="js">color=&quot;success&quot;</OuiCode>.
        </p>
      ),
      demo: (
        <div style={{ maxWidth: 320 }}>
          <Success />
        </div>
      ),
      snippet: successToastSnippet,
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
          Setting <OuiCode language="js">color=&quot;warning&quot;</OuiCode>.
        </p>
      ),
      demo: (
        <div style={{ maxWidth: 320 }}>
          <Warning />
        </div>
      ),
      snippet: warningToastSnippet,
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
        <p>
          Setting <OuiCode language="js">color=&quot;danger&quot;</OuiCode>.
        </p>
      ),
      demo: (
        <div style={{ maxWidth: 320 }}>
          <Danger />
        </div>
      ),
      snippet: dangerToastSnippet,
    },
  ],
  guidelines: <Guidelines />,
  playground: toastConfig,
};
