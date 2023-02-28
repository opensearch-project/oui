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
import { OuiText, OuiTextColor } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const textConfig = () => {
  const docgenInfo = Array.isArray(OuiText.__docgenInfo)
    ? OuiText.__docgenInfo[0]
    : OuiText.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: `<h1>This is Heading One</h1>
    <p>
      Ea mollit ullamco cillum ipsum adipisicing ea aute id. Cillum <a href="#">unfashionable</a> amet 
      proident irure Lorem irure consequat veniam. Excepteur exercitation ex officia 
      minim excepteur consequat sint id Lorem est officia cupidatat excepteur commodo.
    </p>`,
    hidden: false,
  };

  const setGhostBackground = {
    color: 'ghost',
  };

  return {
    config: {
      componentName: 'OuiText',
      props: propsToUse,
      scope: {
        OuiText,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiText'],
        },
      },
    },
    setGhostBackground,
  };
};

export const textColorConfig = () => {
  const docgenInfo = Array.isArray(OuiTextColor.__docgenInfo)
    ? OuiTextColor.__docgenInfo[0]
    : OuiTextColor.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: '<h1>This is Heading One</h1>',
    hidden: false,
  };

  const setGhostBackground = {
    color: 'ghost',
  };

  return {
    config: {
      componentName: 'OuiTextColor',
      props: propsToUse,
      scope: {
        OuiTextColor,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiTextColor'],
        },
      },
    },
    setGhostBackground,
  };
};
