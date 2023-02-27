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
import { OuiComment, OuiText } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(OuiComment.__docgenInfo)
    ? OuiComment.__docgenInfo[0]
    : OuiComment.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.ReactNode,
    value: `<OuiText size="s">
    <p>
      Tempor minim eiusmod consequat eu in ea eu occaecat nulla adipisicing. Aliqua dolore magna occaecat laborum laborum id enim ipsum pariatur. Voluptate dolor do aliquip dolor quis velit laboris. In ipsum ea nostrud quis eu.
    </p>
  </OuiText>`,
    hidden: false,
  };

  propsToUse.username = {
    ...propsToUse.username,
    type: PropTypes.String,
    value: 'Juana',
  };

  propsToUse.timestamp = {
    ...propsToUse.timestamp,
    type: PropTypes.String,
    value: 'Jan 1, 2020',
  };
  propsToUse.event = {
    ...propsToUse.event,
    type: PropTypes.String,
    value: 'added a comment',
  };

  return {
    config: {
      componentName: 'OuiComment',
      props: propsToUse,
      scope: {
        OuiComment,
        OuiText,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiComment', 'OuiText'],
        },
      },
    },
  };
};
