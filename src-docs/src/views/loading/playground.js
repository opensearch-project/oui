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

import {
  propUtilityForPlayground,
  iconValidator,
} from '../../services/playground';
import {
  OuiLoadingElastic,
  OuiLoadingChart,
  OuiLoadingLogo,
  OuiLoadingSpinner,
  OuiLoadingContent,
} from '../../../../src/components/';
import { PropTypes } from 'react-view';

export const loadingElasticConfig = () => {
  const docgenInfo = Array.isArray(OuiLoadingElastic.__docgenInfo)
    ? OuiLoadingElastic.__docgenInfo[0]
    : OuiLoadingElastic.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  return {
    config: {
      componentName: 'OuiLoadingElastic',
      props: propsToUse,
      scope: {
        OuiLoadingElastic,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiLoadingElastic'],
        },
      },
    },
  };
};

export const loadingChartConfig = () => {
  const docgenInfo = Array.isArray(OuiLoadingChart.__docgenInfo)
    ? OuiLoadingChart.__docgenInfo[0]
    : OuiLoadingChart.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  return {
    config: {
      componentName: 'OuiLoadingChart',
      props: propsToUse,
      scope: {
        OuiLoadingChart,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiLoadingChart'],
        },
      },
    },
  };
};

export const loadingLogoConfig = () => {
  const docgenInfo = Array.isArray(OuiLoadingLogo.__docgenInfo)
    ? OuiLoadingLogo.__docgenInfo[0]
    : OuiLoadingLogo.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);
  propsToUse.logo = iconValidator(propsToUse.logo);

  return {
    config: {
      componentName: 'OuiLoadingLogo',
      props: propsToUse,
      scope: {
        OuiLoadingLogo,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiLoadingLogo'],
        },
      },
    },
  };
};

export const loadingSpinnerConfig = () => {
  const docgenInfo = Array.isArray(OuiLoadingSpinner.__docgenInfo)
    ? OuiLoadingSpinner.__docgenInfo[0]
    : OuiLoadingSpinner.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  return {
    config: {
      componentName: 'OuiLoadingSpinner',
      props: propsToUse,
      scope: {
        OuiLoadingSpinner,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiLoadingSpinner'],
        },
      },
    },
  };
};

export const loadingContentConfig = () => {
  const docgenInfo = Array.isArray(OuiLoadingContent.__docgenInfo)
    ? OuiLoadingContent.__docgenInfo[0]
    : OuiLoadingContent.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.lines = {
    ...propsToUse.lines,
    type: PropTypes.Number,
  };

  return {
    config: {
      componentName: 'OuiLoadingContent',
      props: propsToUse,
      scope: {
        OuiLoadingContent,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiLoadingContent'],
        },
      },
    },
  };
};
