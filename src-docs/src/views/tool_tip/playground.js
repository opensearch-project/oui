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
import { OuiToolTip } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  dummyFunction,
  simulateFunction,
} from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(OuiToolTip.__docgenInfo)
    ? OuiToolTip.__docgenInfo[0]
    : OuiToolTip.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.ReactNode,
    value: '<h4>Hover here</h4>',
    hidden: false,
  };

  propsToUse.title = {
    ...propsToUse.title,
    type: PropTypes.String,
    value: 'Title',
  };

  propsToUse.content = {
    ...propsToUse.content,
    type: PropTypes.String,
    value: 'Content',
  };

  propsToUse.onMouseOut = simulateFunction(propsToUse.onMouseOut);

  return {
    config: {
      componentName: 'OuiToolTip',
      props: propsToUse,
      scope: {
        OuiToolTip,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiToolTip'],
        },
      },
      customProps: {
        onMouseOut: dummyFunction,
      },
    },
  };
};
