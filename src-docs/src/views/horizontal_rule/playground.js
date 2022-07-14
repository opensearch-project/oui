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

import { OuiHorizontalRule } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const horizontalRuleConfig = () => {
  const docgenInfo = Array.isArray(OuiHorizontalRule.__docgenInfo)
    ? OuiHorizontalRule.__docgenInfo[0]
    : OuiHorizontalRule.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  return {
    config: {
      componentName: 'OuiHorizontalRule',
      props: propsToUse,
      scope: {
        OuiHorizontalRule,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiHorizontalRule'],
        },
      },
    },
  };
};
