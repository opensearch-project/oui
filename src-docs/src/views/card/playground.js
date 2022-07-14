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
  OuiCard,
  OuiCheckableCard,
  OuiIcon,
} from '../../../../src/components/';
import { htmlIdGenerator } from '../../../../src/services';
import {
  propUtilityForPlayground,
  dummyFunction,
  simulateFunction,
  createOptionalEnum,
} from '../../services/playground';

export const cardConfig = () => {
  const docgenInfo = Array.isArray(OuiCard.__docgenInfo)
    ? OuiCard.__docgenInfo[0]
    : OuiCard.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.title = {
    ...propsToUse.title,
    type: PropTypes.String,
    value: 'This is a card',
  };

  propsToUse.description = {
    ...propsToUse.description,
    type: PropTypes.String,
    value: "Example of a card's description. Stick to one or two sentences.",
  };

  propsToUse.image = {
    ...propsToUse.image,
    type: PropTypes.String,
  };

  propsToUse.icon = {
    ...propsToUse.icon,
    type: PropTypes.ReactNode,
    value: '<OuiIcon type="logoElastic" size="xl" />',
  };

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.ReactNode,
    hidden: false,
  };

  propsToUse.footer = {
    ...propsToUse.footer,
    type: PropTypes.String,
  };

  propsToUse.betaBadgeTooltipContent = {
    ...propsToUse.betaBadgeTooltipContent,
    type: PropTypes.String,
  };

  propsToUse.onClick = simulateFunction(propsToUse.onClick);
  propsToUse.display = createOptionalEnum(propsToUse.display);

  return {
    config: {
      componentName: 'OuiCard',
      props: propsToUse,
      scope: {
        OuiCard,
        OuiIcon,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiCard', 'OuiIcon'],
        },
      },
      customProps: {
        onClick: dummyFunction,
      },
    },
  };
};

export const checkableCardConfig = () => {
  const docgenInfo = Array.isArray(OuiCheckableCard.__docgenInfo)
    ? OuiCheckableCard.__docgenInfo[0]
    : OuiCheckableCard.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.id = {
    ...propsToUse.id,
    value: htmlIdGenerator('generated')(),
  };

  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
    value: 'Checkable card label',
  };

  propsToUse.onChange = simulateFunction(propsToUse.onChange, true);

  return {
    config: {
      componentName: 'OuiCheckableCard',
      props: propsToUse,
      scope: {
        OuiCheckableCard,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiCheckableCard'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};
