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
import { OuiHealth } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(OuiHealth.__docgenInfo)
    ? OuiHealth.__docgenInfo[0]
    : OuiHealth.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.String,
    value: 'Status',
  };

  propsToUse.color = {
    ...propsToUse.color,
    options: {
      default: 'default',
      primary: 'primary',
      secondary: 'secondary',
      success: 'success',
      accent: 'accent',
      warning: 'warning',
      danger: 'danger',
      text: 'text',
      subdued: 'subdued',
      ghost: 'ghost',
    },
    type: PropTypes.Enum,
  };

  const setGhostBackground = {
    color: 'ghost',
  };

  return {
    config: {
      componentName: 'OuiHealth',
      props: propsToUse,
      scope: {
        OuiHealth,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiHealth'],
        },
      },
    },
    setGhostBackground,
  };
};
