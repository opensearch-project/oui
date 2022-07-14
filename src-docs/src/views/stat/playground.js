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
import { OuiStat } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(OuiStat.__docgenInfo)
    ? OuiStat.__docgenInfo[0]
    : OuiStat.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.description = {
    ...propsToUse.description,
    value: 'Total people',
    type: PropTypes.String,
  };

  propsToUse.titleColor = {
    ...propsToUse.titleColor,
    options: {
      primary: 'primary',
      secondary: 'secondary',
      success: 'success',
      danger: 'danger',
      accent: 'accent',
      text: 'text',
    },
    defaultValue: 'text',
    type: PropTypes.Enum,
  };

  propsToUse.title = {
    ...propsToUse.title,
    value: '7,600 mm',
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'OuiStat',
      props: propsToUse,
      scope: {
        OuiStat,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiStat'],
        },
      },
    },
  };
};
