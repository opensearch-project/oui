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

import { OuiSpacer } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const spacerConfig = () => {
  const docgenInfo = Array.isArray(OuiSpacer.__docgenInfo)
    ? OuiSpacer.__docgenInfo[0]
    : OuiSpacer.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  return {
    config: {
      componentName: 'OuiSpacer',
      props: propsToUse,
      scope: {
        OuiSpacer,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiSpacer'],
        },
      },
    },
    playgroundClassName: 'guideDemo__highlightSpacer',
  };
};
