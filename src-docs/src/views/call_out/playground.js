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
import { OuiCallOut, OuiText } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
} from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(OuiCallOut.__docgenInfo)
    ? OuiCallOut.__docgenInfo[0]
    : OuiCallOut.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.iconType = iconValidator(propsToUse.iconType);

  propsToUse.title = {
    ...propsToUse.title,
    value: 'Check it out',
    type: PropTypes.String,
  };

  propsToUse.children = {
    ...propsToUse.children,
    value: `<p>
   Any content inside of <strong>OuiCallOut</strong> will appear here.
  </p>`,
    type: PropTypes.ReactNode,
    description: 'Content to display inside the callout below the title',
    hidden: false,
  };

  return {
    config: {
      componentName: 'OuiCallOut',
      props: propsToUse,
      scope: {
        OuiCallOut,
        OuiText,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiCallOut', 'OuiText'],
        },
      },
    },
  };
};
