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
import {
  OuiPageTemplate,
  OuiPageHeader,
  OuiButton,
} from '../../../../src/components/';
import {
  propUtilityForPlayground,
  generateCustomProps,
} from '../../services/playground';

export const pageTemplateConfig = () => {
  const docgenInfo = Array.isArray(OuiPageTemplate.__docgenInfo)
    ? OuiPageTemplate.__docgenInfo[0]
    : OuiPageTemplate.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  // TODO: Follow up on how to allow passing an object to a prop
  // propsToUse.pageHeader = simulateFunction({
  //   ...propsToUse.pageHeader,
  //   custom: {
  //     value: '{ pageTitle: "Page title" }',
  //   },
  // });

  propsToUse.children = {
    ...propsToUse.children,
    value: 'Children',
    type: PropTypes.ReactNode,
    hidden: false,
  };

  propsToUse.bottomBar = {
    ...propsToUse.bottomBar,
    type: PropTypes.String,
  };

  propsToUse.pageSideBar = {
    ...propsToUse.pageSideBar,
    value: 'Side bar',
    type: PropTypes.String,
    hidden: false,
  };

  propsToUse.restrictWidth = {
    ...propsToUse.restrictWidth,
    type: PropTypes.String,
  };

  propsToUse.fullHeight = {
    ...propsToUse.fullHeight,
    type: PropTypes.Boolean,
  };

  return {
    config: {
      componentName: 'OuiPageTemplate',
      props: propsToUse,
      scope: {
        OuiPageTemplate,
        OuiPageHeader,
        OuiButton,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiPageTemplate', 'OuiPageHeader', 'OuiButton'],
        },
      },
      customProps: generateCustomProps(['pageHeader']),
    },
    playgroundClassName: 'guideDemo__highlightLayout--playground',
  };
};
