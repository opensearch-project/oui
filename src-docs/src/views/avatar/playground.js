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
import { OuiAvatar, checkValidColor } from '../../../../src/components/avatar';
import {
  propUtilityForPlayground,
  iconValidator,
} from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(OuiAvatar.__docgenInfo)
    ? OuiAvatar.__docgenInfo[0]
    : OuiAvatar.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);
  propsToUse.name.value = 'Avatar';

  propsToUse.color = {
    ...propsToUse.color,
    value: undefined,
    custom: {
      ...propsToUse.color.custom,
      validator: (val) => {
        try {
          checkValidColor(val);
          return true;
        } catch (error) {
          return false;
        }
      },
    },
  };

  propsToUse.initialsLength = {
    ...propsToUse.initialsLength,
    type: PropTypes.Number,
  };

  propsToUse.iconType = iconValidator(propsToUse.iconType);

  return {
    config: {
      componentName: 'OuiAvatar',
      props: propsToUse,
      scope: {
        OuiAvatar,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiAvatar'],
        },
      },
    },
  };
};
