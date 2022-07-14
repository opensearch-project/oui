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
import { OuiEmptyPrompt, OuiButton } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
} from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(OuiEmptyPrompt.__docgenInfo)
    ? OuiEmptyPrompt.__docgenInfo[0]
    : OuiEmptyPrompt.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.title = {
    ...propsToUse.title,
    value: '<h2>You have no spice</h2>',
    type: PropTypes.ReactNode,
  };

  propsToUse.iconColor = {
    ...propsToUse.iconColor,
    type: PropTypes.Enum,
    defaultValue: 'subdued',
    options: {
      default: 'default',
      subdued: 'subdued',
      success: 'success',
      accent: 'accent',
      danger: 'danger',
      warning: 'warning',
      ghost: 'ghost',
    },
  };

  propsToUse.actions.type = PropTypes.String;
  propsToUse.body.type = PropTypes.String;
  propsToUse.body.value = `Navigators use massive amounts of spice to gain a limited form of
    prescience. This allows them to safely navigate interstellar space,
    enabling trade and travel throughout the galaxy.`;

  propsToUse.iconType = iconValidator(propsToUse.iconType, 'editorStrike');

  return {
    config: {
      componentName: 'OuiEmptyPrompt',
      props: propsToUse,
      scope: {
        OuiEmptyPrompt,
        OuiButton,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiEmptyPrompt', 'OuiButton'],
        },
      },
    },
  };
};
