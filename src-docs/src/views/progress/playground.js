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
import { OuiProgress } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(OuiProgress.__docgenInfo)
    ? OuiProgress.__docgenInfo[0]
    : OuiProgress.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.value = {
    ...propsToUse.value,
    value: undefined,
    type: PropTypes.Number,
  };

  propsToUse.valueText = {
    ...propsToUse.valueText,
    type: PropTypes.Boolean,
    value: false,
  };

  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'OuiProgress',
      props: propsToUse,
      scope: {
        OuiProgress,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiProgress'],
        },
      },
    },
  };
};
