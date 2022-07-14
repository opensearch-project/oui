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
import { OuiButton, OuiBottomBar } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const bottomBarConfig = () => {
  const docgenInfo = Array.isArray(OuiBottomBar.__docgenInfo)
    ? OuiBottomBar.__docgenInfo[0]
    : OuiBottomBar.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: '<OuiButton color="ghost">Save</OuiButton>',
  };

  propsToUse.top = {
    ...propsToUse.top,
    type: PropTypes.Number,
  };

  propsToUse.right = {
    ...propsToUse.right,
    type: PropTypes.Number,
    value: '0',
  };

  propsToUse.bottom = {
    ...propsToUse.bottom,
    type: PropTypes.Number,
    value: '0',
  };

  propsToUse.left = {
    ...propsToUse.left,
    type: PropTypes.Number,
    value: '0',
  };

  return {
    config: {
      componentName: 'OuiBottomBar',
      props: propsToUse,
      scope: {
        OuiBottomBar,
        OuiButton,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiBottomBar', 'OuiButton'],
        },
      },
    },
  };
};
