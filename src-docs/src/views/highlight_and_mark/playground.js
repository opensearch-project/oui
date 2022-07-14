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
import { OuiHighlight, OuiMark } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const highlightConfig = () => {
  const docgenInfo = Array.isArray(OuiHighlight.__docgenInfo)
    ? OuiHighlight.__docgenInfo[0]
    : OuiHighlight.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.String,
    hidden: false,
    value: 'The quick brown fox jumped over the lazy dog',
  };

  propsToUse.search.value = 'quick';

  return {
    config: {
      componentName: 'OuiHighlight',
      props: propsToUse,
      scope: {
        OuiHighlight,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiHighlight'],
        },
      },
    },
  };
};

export const markConfig = () => {
  const docgenInfo = Array.isArray(OuiMark.__docgenInfo)
    ? OuiMark.__docgenInfo[0]
    : OuiMark.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children.value = 'Mark';

  return {
    config: {
      componentName: 'OuiMark',
      props: propsToUse,
      scope: {
        OuiMark,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiMark'],
        },
      },
    },
  };
};
