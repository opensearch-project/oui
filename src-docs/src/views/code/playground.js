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
import { OuiCodeBlock, OuiCode } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

const codeDemo = `\n{\`${
  require('./code_examples/example.html?raw').default
}\`}\n`;

export const codeBlockConfig = () => {
  const docgenInfo = Array.isArray(OuiCodeBlock.__docgenInfo)
    ? OuiCodeBlock.__docgenInfo[0]
    : OuiCodeBlock.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.language.value = 'html';

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: codeDemo,
    hidden: false,
  };

  return {
    config: {
      componentName: 'OuiCodeBlock',
      props: propsToUse,
      scope: {
        OuiCodeBlock,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiCodeBlock'],
        },
      },
    },
  };
};

export const codeConfig = () => {
  const docgenInfo = Array.isArray(OuiCode.__docgenInfo)
    ? OuiCode.__docgenInfo[0]
    : OuiCode.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.language.value = 'html';

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: codeDemo,
    hidden: false,
  };

  return {
    config: {
      componentName: 'OuiCode',
      props: propsToUse,
      scope: {
        OuiCode,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiCode'],
        },
      },
    },
  };
};
