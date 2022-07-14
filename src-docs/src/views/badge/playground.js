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
  OuiBadge,
  OuiNotificationBadge,
  OuiBetaBadge,
} from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
  dummyFunction,
} from '../../services/playground';

export const badgeConfig = () => {
  const docgenInfo = Array.isArray(OuiBadge.__docgenInfo)
    ? OuiBadge.__docgenInfo[0]
    : OuiBadge.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.onClick = {
    ...propsToUse.onClick,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onClick.custom,
      use: 'switch',
      label: 'Simulate',
      modifyOtherProps: (val, state, set) => {
        if (val) {
          if (!state.onClickAriaLabel.value) {
            set('onClickAriaLabel', 'onClickAriaLabel');
          }
        } else {
          set(state.onClickAriaLabel.value, 'onClickAriaLabel');
        }
      },
    },
  };

  propsToUse.children = {
    type: PropTypes.String,
    value: 'Badge content',
    hidden: true,
    custom: {
      sanitize: (val) => {
        return val.replace(/<(?:"[^"]"['"]|'[^']'['"]|[^'">])+>/g, '');
      },
    },
  };

  propsToUse.onClickAriaLabel = {
    ...propsToUse.onClickAriaLabel,
    type: PropTypes.String,
    custom: {
      ...propsToUse.onClickAriaLabel.custom,
      checkDep: (val, state) => {
        if (state.onClick.value && !val) {
          return 'When passing onClick to OuiBadge, you must also provide onClickAriaLabel';
        }
        return undefined;
      },
    },
  };

  propsToUse.iconOnClickAriaLabel = {
    ...propsToUse.iconOnClickAriaLabel,
    type: PropTypes.String,
  };

  propsToUse.iconType = iconValidator(propsToUse.iconType);

  propsToUse.color = {
    ...propsToUse.color,
    value: undefined,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'OuiBadge',
      props: propsToUse,
      scope: {
        OuiBadge,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiBadge'],
        },
      },
      customProps: {
        onClick: dummyFunction,
      },
    },
  };
};

export const betaBadgeConfig = () => {
  const docgenInfo = Array.isArray(OuiBetaBadge.__docgenInfo)
    ? OuiBetaBadge.__docgenInfo[0]
    : OuiBetaBadge.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
    value: 'content',
  };

  propsToUse.tooltipContent = {
    ...propsToUse.tooltipContent,
    type: PropTypes.String,
  };

  propsToUse.iconType = iconValidator(propsToUse.iconType);

  return {
    config: {
      componentName: 'OuiBetaBadge',
      props: propsToUse,
      scope: {
        OuiBetaBadge,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiBetaBadge'],
        },
      },
    },
  };
};

export const notificationBadgeConfig = () => {
  const docgenInfo = Array.isArray(OuiNotificationBadge.__docgenInfo)
    ? OuiNotificationBadge.__docgenInfo[0]
    : OuiNotificationBadge.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    type: PropTypes.String,
    value: '10',
    hidden: true,
  };

  return {
    config: {
      componentName: 'OuiNotificationBadge',
      props: propsToUse,
      scope: {
        OuiNotificationBadge,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiNotificationBadge'],
        },
      },
    },
  };
};
