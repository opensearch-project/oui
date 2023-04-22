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

import { OuiCode, OuiText } from '../../../../src/components';

import InnerText from './inner_text';
const innerTextSource = require('./inner_text?raw');
const innerTextHtml = renderToHtml(InnerText);
const useInnerTextSnippet = `const [ref, innerText] = useInnerText();
<span ref={ref} title={innerText}>
  Content
</span>`;
const ouiInnerTextSnippet = `<OuiInnerText>
  {(ref, innerText) => (
    <span ref={ref} title={innerText}>
      Content
    </span>
  )}
</OuiInnerText>`;

export const InnerTextExample = {
  title: 'Inner text',
  intro: (
    <React.Fragment>
      <OuiText>
        <p>
          For instances where accessing the text content of a component that may
          be wrapped or interspersed with other components, two utilities are
          available:
        </p>
        <ul>
          <li>
            <OuiCode>useInnerText</OuiCode> - A custom React hook, usable in
            function components
          </li>
          <li>
            <OuiCode>{'<OuiInnerText />'}</OuiCode> - A higher order{' '}
            <OuiCode>useInnerText</OuiCode> component for use in class
            components
          </li>
        </ul>
        <p>
          Both utilities make available a <OuiCode>ref</OuiCode> reference to
          add to the target DOM element, and the resulting{' '}
          <OuiCode>innerText</OuiCode> value to use as needed.
        </p>
      </OuiText>
    </React.Fragment>
  ),
  sections: [
    {
      title: 'Rendered',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: innerTextSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: innerTextHtml,
        },
      ],
      demo: <InnerText />,
      snippet: [useInnerTextSnippet, ouiInnerTextSnippet],
    },
  ],
};
