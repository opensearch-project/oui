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
import { OuiPanel, OuiText } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';
import * as t from '@babel/types';

export const panelConfig = () => {
  const docgenInfo = Array.isArray(OuiPanel.__docgenInfo)
    ? OuiPanel.__docgenInfo[0]
    : OuiPanel.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    value: `<OuiText>
    <p>
      Any content inside of <strong>OuiPanel</strong> will appear here.
    </p>
  </OuiText>`,
    type: PropTypes.ReactNode,
    hidden: false,
  };

  propsToUse.betaBadgeTooltipContent = {
    ...propsToUse.betaBadgeTooltipContent,
    type: PropTypes.String,
    hidden: false,
  };

  propsToUse.onClick = {
    ...propsToUse.onClick,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      use: 'switch',
      label: 'Simulate',
    },
  };

  return {
    config: {
      componentName: 'OuiPanel',
      props: propsToUse,
      scope: {
        OuiPanel,
        OuiText,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiPanel', 'OuiText'],
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
