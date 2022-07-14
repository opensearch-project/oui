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
import { OuiLink } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';
import * as t from '@babel/types';

export default () => {
  const docgenInfo = Array.isArray(OuiLink.__docgenInfo)
    ? OuiLink.__docgenInfo[0]
    : OuiLink.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.href = {
    type: PropTypes.String,
    value: 'http://www.elastic.co',
  };
  propsToUse.target = {
    type: PropTypes.String,
    value: '_blank',
  };

  propsToUse.children = {
    value: 'Link to our website',
    type: PropTypes.String,
    hidden: false,
  };

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

  const setGhostBackground = {
    color: 'ghost',
  };

  return {
    setGhostBackground,
    config: {
      componentName: 'OuiLink',
      props: propsToUse,
      scope: {
        OuiLink,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiLink'],
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
