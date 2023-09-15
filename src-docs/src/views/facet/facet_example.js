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

import {
  OuiFacetButton,
  OuiFacetGroup,
  OuiCode,
} from '../../../../src/components';

import { facetButtonConfig, facetLayoutConfig } from './playground';

import Facet from './facet';
const facetSource = require('./facet?raw');
const facetHtml = renderToHtml(Facet);
const facetSnippet = `<OuiFacetButton
  quantity={6}
  icon={<OuiIcon type="dot" color="success" />}
  isSelected>
  <!-- Facet with OuiIcon content -->
</OuiFacetButton>
`;

import FacetLayout from './facet_layout';
const facetLayoutSource = require('./facet_layout?raw');
const facetLayoutHtml = renderToHtml(FacetLayout);

export const FacetExample = {
  title: 'Facet',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: facetSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: facetHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>OuiFacetButtons</strong> are to be used when allowing lists
            with multiple search params to be filtered down by these particular
            params. They allow for an <OuiCode>icon</OuiCode> node and/or{' '}
            <OuiCode>quantity</OuiCode> to be passed. You can also indicate the
            current selection with <OuiCode>isSelected</OuiCode>. Other props
            include <OuiCode>isDisabled</OuiCode> and{' '}
            <OuiCode>isLoading</OuiCode> (which will swap the quantity indicator
            with a loading icon).
          </p>
        </>
      ),
      props: { OuiFacetButton },
      snippet: facetSnippet,
      demo: <Facet />,
      playground: facetButtonConfig,
    },
    {
      title: 'Facet layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: facetLayoutSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: facetLayoutHtml,
        },
      ],
      text: (
        <>
          <p>
            Utilize the <strong>OuiFacetGroup</strong> wrapper to correctly
            layout multiple facets. You can supply a <OuiCode>layout</OuiCode>{' '}
            of either <OuiCode>horizontal</OuiCode> or{' '}
            <OuiCode>vertical</OuiCode> with the default being{' '}
            <OuiCode>vertical</OuiCode>. Be sure to contain vertical layouts in
            a skinny component or give it a max-width. You can also adjust the
            spacing between items with the <OuiCode>gutterSize</OuiCode> prop.
          </p>
          <p>
            Typically, each facet grouping should display similarly. For
            example, they should all have icons or be similar icon nodes (like
            avatars). It is up to you whether each group should be single or
            multi-selection.
          </p>
        </>
      ),
      props: { OuiFacetGroup },
      demo: <FacetLayout />,
      snippet: [
        `// Restrict the width of default (vertical) if not restricted by parent
<OuiFacetGroup style={{ maxWidth: 200 }}>{facets}</OuiFacetGroup>`,
        `// Horizontal
<OuiFacetGroup layout="horizontal" gutterSize="l">{facets}</OuiFacetGroup>`,
      ],
      playground: facetLayoutConfig,
    },
  ],
};
