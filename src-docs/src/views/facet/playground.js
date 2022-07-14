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

import { PropTypes } from 'react-view';
import { OuiFacetButton, OuiFacetGroup } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';
import * as t from '@babel/types';

export const facetButtonConfig = () => {
  const docgenInfo = Array.isArray(OuiFacetButton.__docgenInfo)
    ? OuiFacetButton.__docgenInfo[0]
    : OuiFacetButton.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.onClick = {
    ...propsToUse.onClick,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onClick.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };

  propsToUse.children = {
    type: PropTypes.String,
    value: 'Facet content',
    hidden: false,
  };

  propsToUse.quantity = {
    ...propsToUse.quantity,
    value: 10,
  };

  return {
    config: {
      componentName: 'OuiFacetButton',
      props: propsToUse,
      scope: {
        OuiFacetButton,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiFacetButton'],
        },
      },
      customProps: {
        onClick: {
          generate: (val) => {
            if (!val) return null;
            const obj = t.arrowFunctionExpression(
              [],
              t.blockStatement([]),
              false
            );
            return obj;
          },
        },
      },
    },
  };
};

export const facetLayoutConfig = () => {
  const docgenInfo = Array.isArray(OuiFacetGroup.__docgenInfo)
    ? OuiFacetGroup.__docgenInfo[0]
    : OuiFacetGroup.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: `<OuiFacetButton quantity={6}>
    Facet one
  </OuiFacetButton>
  <OuiFacetButton quantity={10}>
     Facet two
  </OuiFacetButton>
  <OuiFacetButton quantity={25}>
    Facet three
  </OuiFacetButton>`,
    hidden: false,
  };

  return {
    config: {
      componentName: 'OuiFacetGroup',
      props: propsToUse,
      scope: {
        OuiFacetButton,
        OuiFacetGroup,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiFacetButton', 'OuiFacetGroup'],
        },
      },
    },
  };
};
