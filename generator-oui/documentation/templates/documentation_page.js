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

import {
  GuideSectionTypes,
} from '../../components';

import {
  <%= componentName %>,
} from '../../../../src/components';

import <%= componentExampleName %> from './<%= fileName %>';
const <%= componentExamplePrefix %>Source = require('./<%= fileName %>?raw');
const <%= componentExamplePrefix %>Html = renderToHtml(<%= componentExampleName %>);

export const <%= componentExampleName %>Example = {
  title: '<%= componentExampleName %>',
  sections: [{
    title: '<%= componentExampleName %>',
    source: [{
      type: GuideSectionTypes.JS,
      code: <%= componentExamplePrefix %>Source,
    }, {
      type: GuideSectionTypes.HTML,
      code: <%= componentExamplePrefix %>Html,
    }],
    text: (
      <p>
        Description needed: how to use the <strong>Oui<%= componentExampleName %></strong> component.
      </p>
    ),
    props: { <%= componentName %> },
    demo: <<%= componentExampleName %> />,
  }],
};
