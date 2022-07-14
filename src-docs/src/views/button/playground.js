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
import { OuiButton } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
} from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(OuiButton.__docgenInfo)
    ? OuiButton.__docgenInfo[0]
    : OuiButton.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.iconType = iconValidator(propsToUse.iconType);

  propsToUse.children = {
    value: 'Button',
    type: PropTypes.String,
    description: 'Visible label',
    hidden: false,
  };

  propsToUse.minWidth = {
    ...propsToUse.minWidth,
    type: PropTypes.Number,
  };

  propsToUse.color = {
    ...propsToUse.color,
    defaultValue: 'primary',
  };

  propsToUse.size = {
    ...propsToUse.size,
    defaultValue: 'm',
  };

  const setGhostBackground = {
    color: 'ghost',
  };

  return {
    config: {
      componentName: 'OuiButton',
      props: propsToUse,
      scope: {
        OuiButton,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiButton'],
        },
      },
    },
    setGhostBackground,
  };
};
