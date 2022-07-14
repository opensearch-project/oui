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

/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { PropTypes } from 'react-view';
import {
  OuiPageTemplate,
  OuiPageHeader,
  OuiButton,
  OuiTabs,
  OuiImage,
} from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
  simulateFunction,
  generateCustomProps,
  createOptionalEnum,
} from '../../services/playground';

const tabs = `[
  {
    label: 'Tab 1',
    isSelected: true,
  },
  {
    label: 'Tab 2',
  },
]`;

const rightSideItems = `[
  <OuiButton fill>Button 1</OuiButton>,
  <OuiButton>Button 2</OuiButton>,
]`;

// TODO: Try later to build a toggle that allows switching between different types of content to pass
// const rightSideItems =
//   '[<OuiImage url="https://source.unsplash.com/400x200/?Water" height="200" />]';

export const pageHeaderConfig = () => {
  const docgenInfo = Array.isArray(OuiPageHeader.__docgenInfo)
    ? OuiPageHeader.__docgenInfo[0]
    : OuiPageHeader.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.iconType = iconValidator(propsToUse.iconType);

  propsToUse.pageTitle = {
    ...propsToUse.pageTitle,
    type: PropTypes.String,
    value: 'Page title',
  };

  propsToUse.description = {
    ...propsToUse.description,
    value: 'Example of a description.',
    type: PropTypes.String,
  };

  propsToUse.rightSideItems = simulateFunction({
    ...propsToUse.rightSideItems,
    custom: {
      value: rightSideItems,
    },
  });

  propsToUse.tabs = simulateFunction({
    ...propsToUse.tabs,
    custom: {
      value: tabs,
    },
  });

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.ReactNode,
    hidden: false,
  };

  propsToUse.alignItems = createOptionalEnum(propsToUse.alignItems);

  return {
    config: {
      componentName: 'OuiPageHeader',
      props: propsToUse,
      scope: {
        OuiPageHeader,
        OuiButton,
        OuiTabs,
        OuiImage,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiPageHeader', 'OuiButton', 'OuiTabs', 'OuiImage'],
        },
      },
      customProps: generateCustomProps(['rightSideItems', 'tabs']),
    },
  };
};
