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
import { OuiAccordion, OuiPanel } from '../../../../src/components/';
import { htmlIdGenerator } from '../../../../src/services';
import {
  propUtilityForPlayground,
  createOptionalEnum,
  dummyFunction,
  simulateFunction,
} from '../../services/playground';

export const accordionConfig = () => {
  const docgenInfo = Array.isArray(OuiAccordion.__docgenInfo)
    ? OuiAccordion.__docgenInfo[0]
    : OuiAccordion.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.buttonContent = {
    ...propsToUse.buttonContent,
    value: 'Click me to toggle',
    type: PropTypes.String,
  };

  propsToUse.id = {
    ...propsToUse.id,
    value: htmlIdGenerator('generated')(),
  };

  propsToUse.children = {
    value: `<OuiPanel color="subdued">
  Any content inside of <strong>OuiAccordion</strong> will appear here.
</OuiPanel>`,
    type: PropTypes.ReactNode,
    hidden: false,
  };

  propsToUse.onToggle = simulateFunction(propsToUse.onToggle);

  propsToUse.forceState = createOptionalEnum(propsToUse.forceState);

  propsToUse.extraAction = {
    ...propsToUse.extraAction,
    type: PropTypes.String,
  };

  propsToUse.isLoadingMessage = {
    ...propsToUse.isLoadingMessage,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'OuiAccordion',
      props: propsToUse,
      scope: {
        OuiAccordion,
        OuiPanel,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiAccordion', 'OuiPanel'],
        },
      },
      customProps: {
        onToggle: dummyFunction,
      },
    },
  };
};
