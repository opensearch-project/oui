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

import { OuiCode, OuiI18n, OuiContext } from '../../../../src/components';

import I18nBasic from './i18n_basic';
const i18nBasicSource = require('./i18n_basic?raw');
const i18nBasicHtml = renderToHtml(I18nBasic);
const basicSnippet = [
  `useOuiI18n('filename.token', 'default value')
`,
  `<OuiI18n token="filename.token" default="default value" />
`,
];

import I18nInterpolation from './i18n_interpolation';
const i18nInterpolationSource = require('./i18n_interpolation?raw');
const i18nInterpolationHtml = renderToHtml(I18nInterpolation);
const interpolationSnippet = [
  `useOuiI18n('filename.greeting', 'Hello, {planet}', { planet: 'world' })
`,
  `<OuiI18n
  token="filename.greeting"
  default="Hello, {planet}"
  values={{
    planet: 'world'
  }}
/>
`,
];

import I18nAttribute from './i18n_attribute';
const i18nAttributeSource = require('./i18n_attribute?raw');
const i18nAttributeHtml = renderToHtml(I18nAttribute);
const attributeSnippet = [
  `<p aria-label={useOuiI18n('filename.token', 'default value')}><!-- Text here--></p>
`,
  `<OuiI18n token="filename.token" default="default value">
  {token => <p aria-label={token}><!-- Text here--></p>}
</OuiI18n>
`,
];

import I18nMulti from './i18n_multi';
const I18nMultiSource = require('./i18n_multi?raw');
const I18nMultiHtml = renderToHtml(I18nMulti);
const multiValueSnippet = [
  `const [label, text] = useOuiI18n(
  ['filename.label', 'filename.text'],
  ['Default Label', 'Default Text']
);

return <p aria-label={label}>{text}</p>;
`,
  `<OuiI18n
  tokens={['filename.label', 'filename.secontext']}
  defaults={['Default Label', 'Default Text']}>
  {([label, text]) => <p aria-label={label}>{text}</p>}
</OuiI18n>
`,
];

import I18nNumber from './i18n_number';
const I18nNumberSource = require('./i18n_number?raw');
const I18nNumberHtml = renderToHtml(I18nNumber);
const numberSnippet = [
  `Formatted count of users: <OuiI18nNumber value={5000000} />
`,
];

import Context from './context';
const contextSource = require('./context?raw');
const contextHtml = renderToHtml(Context);

import { I18nShapeProps } from './props';
export const I18nExample = {
  title: 'I18n',
  sections: [
    {
      title: 'Internationalization',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: i18nBasicSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: i18nBasicHtml,
        },
      ],
      text: (
        <p>
          <strong>useOuiI18n</strong> and <strong>OuiI18n</strong> allows
          localizing string and numeric values for internationalization. There
          are two provided ways to use this: a React hook and a render prop
          component. In their simplest form, these take a{' '}
          <OuiCode>token</OuiCode> and a <OuiCode>default</OuiCode> value.{' '}
          <OuiCode>token</OuiCode> provides a reference to use when mapping to a
          localized value and <OuiCode>default</OuiCode> provides the
          untranslated value when no mapping is available.
        </p>
      ),
      snippet: basicSnippet,
      demo: <I18nBasic />,
    },
    {
      title: 'Interpolation',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: i18nInterpolationSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: i18nInterpolationHtml,
        },
      ],
      text: (
        <p>
          <strong>useOuiI18n</strong> and <strong>OuiI18n</strong> support
          variable interpolation. In a translation like{' '}
          <OuiCode>{'Signed in as {name} ({email})'}</OuiCode>, two values can
          be interpolated (<OuiCode>name</OuiCode> and <OuiCode>email</OuiCode>
          ). These values can be specified by passing a{' '}
          <OuiCode>values</OuiCode> prop to <strong>OuiI18n</strong>, or by
          passing an object of values as the third argument to{' '}
          <strong>useOuiI18n</strong>. Interpolation values can be passed as a
          string, number, or a React Component.
        </p>
      ),
      snippet: interpolationSnippet,
      demo: <I18nInterpolation />,
    },
    {
      title: 'Using localized values in attributes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: i18nAttributeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: i18nAttributeHtml,
        },
      ],
      text: (
        <p>
          Some times a localized value is needed for a prop instead of rendering
          directly to the DOM. In these cases <strong>useOuiI18n</strong> can be
          called inline, or <strong>OuiI18n</strong> can be used as a render
          prop child which is called with the localized value.
        </p>
      ),
      snippet: attributeSnippet,
      demo: <I18nAttribute />,
    },
    {
      title: 'Multi-value lookup',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: I18nMultiSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: I18nMultiHtml,
        },
      ],
      text: (
        <p>
          If many localized values are needed in a small area, multiple tokens
          can be retrieved from the hook or via a single render prop. In this
          case the <OuiCode>token</OuiCode>/<OuiCode>default</OuiCode> props are
          replaced by the pluralized <OuiCode>tokens</OuiCode>/
          <OuiCode>defaults</OuiCode>. Value injection is not supported when
          processing more than one token.
        </p>
      ),
      snippet: multiValueSnippet,
      demo: <I18nMulti />,
    },
    {
      title: 'Number localization',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: I18nNumberSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: I18nNumberHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiI18nNumber</strong> can be used to format one or more
          numbers. Similarly to <strong>OuiI18n</strong>, it takes{' '}
          <OuiCode>value</OuiCode> or
          <OuiCode>values</OuiCode> and can render directly to the DOM or call a
          render prop.
        </p>
      ),
      snippet: numberSnippet,
      demo: <I18nNumber />,
    },
    {
      title: 'Context',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: contextSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: contextHtml,
        },
      ],
      text: (
        <p>
          <OuiCode>OuiContext</OuiCode> allows setting global
          internationalization copy for OUI components. Any components used
          within this context will lookup their display values from this
          mapping.
        </p>
      ),
      components: { OuiContext },
      demo: <Context />,
      props: { OuiContext, OuiI18n, i18n: I18nShapeProps },
    },
  ],
};
