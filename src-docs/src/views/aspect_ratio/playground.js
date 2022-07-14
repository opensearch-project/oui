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
import { OuiAspectRatio } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(OuiAspectRatio.__docgenInfo)
    ? OuiAspectRatio.__docgenInfo[0]
    : OuiAspectRatio.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.height.value = 9;
  propsToUse.width.value = 16;

  propsToUse.children = {
    value: `<iframe
    title="Elastic is a search company"
    width="560"
    height="315"
    src="https://www.youtube.com/embed/yJarWSLRM24"
    frameBorder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />`,
    type: PropTypes.ReactNode,
    description: 'Visible label.',
    hidden: false,
  };

  return {
    config: {
      componentName: 'OuiAspectRatio',
      props: propsToUse,
      scope: {
        OuiAspectRatio,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiAspectRatio'],
        },
      },
    },
  };
};
