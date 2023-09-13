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

import { OuiSchemaItem } from '../../../../src/components';

import Schema from './schema';
const schemaSource = require('!!raw-loader!./schema');
const schemaHtml = renderToHtml(Schema);

import SchemaGroup from './schema_group';
const schemaGroupSource = require('!!raw-loader!./schema');
const schemaGroupHtml = renderToHtml(Schema);

export const SchemaExample = {
  title: 'Schema',
  isExperimental: true,
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: schemaSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: schemaHtml.render(),
        },
      ],
      text: (
        <p>
          This is the basic <strong>OuiSchemaItem</strong> component.
        </p>
      ),
      props: { OuiSchemaItem },
      demo: <Schema />,
    },
    {
      title: 'SchemaItem as a list',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: schemaGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: schemaGroupHtml,
        },
      ],
      text: (
        <p>
          Grouping <strong>OuiSchemaItem</strong> with{' '}
          <strong>OuiFlexGroup</strong> to make a list.
        </p>
      ),
      props: { OuiSchemaItem },
      demo: <SchemaGroup />,
    },
  ],
};
