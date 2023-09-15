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

import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  OuiCode,
  OuiText,
  OuiLoadingDashboards,
  OuiLoadingSpinner,
  OuiLoadingChart,
  OuiLoadingContent,
} from '../../../../src/components';
import {
  loadingDashboardsConfig,
  loadingChartConfig,
  loadingSpinnerConfig,
  loadingContentConfig,
} from './playground';

import LoadingDashboards from './loading_dashboards';
const loadingDashboardsSource = require('./loading_dashboards?raw');

import LoadingChart from './loading_chart';
const loadingChartSource = require('./loading_chart?raw');

import LoadingSpinner from './loading_spinner';
const loadingSpinnerSource = require('./loading_spinner?raw');

import LoadingContent from './loading_content';
const loadingContentSource = require('./loading_content?raw');

export const LoadingExample = {
  title: 'Loading',
  intro: (
    <OuiText>
      <p>
        Use loading indicators sparingly and opt for showing actual{' '}
        <Link to="/display/progress#progress-with-values">progress</Link> over
        infinite spinners. It is ok to use multiple loaders on a page if each
        section is progressively loaded. However, if the entire page is loaded
        at once, use a single, larger loading indicator.
      </p>
    </OuiText>
  ),
  sections: [
    {
      title: 'Dashboards',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: loadingDashboardsSource,
        },
      ],
      text: (
        <p>
          The <strong>OuiLoadingDashboards</strong> loader is great for full
          page or Dashboards product loading screens.
        </p>
      ),
      props: { OuiLoadingDashboards },
      demo: <LoadingDashboards />,
      snippet: '<OuiLoadingDashboards size="m" />',
      playground: loadingDashboardsConfig,
    },
    {
      title: 'Chart',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: loadingChartSource,
        },
      ],
      text: (
        <p>
          To indicate that a visualization is loading, use{' '}
          <strong>OuiLoadingChart</strong>. The multi-color version should be
          used sparingly, and only when a single large visualization is being
          loaded.
        </p>
      ),
      props: { OuiLoadingChart },
      demo: <LoadingChart />,
      snippet: '<OuiLoadingChart size="m" />',
      playground: loadingChartConfig,
    },
    {
      title: 'Spinner',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: loadingSpinnerSource,
        },
      ],
      text: (
        <p>
          <strong>OuiLoadingSpinner</strong> is a simple spinner for most
          loading contexts.
        </p>
      ),
      props: { OuiLoadingSpinner },
      demo: <LoadingSpinner />,
      snippet: '<OuiLoadingSpinner size="m" />',
      playground: loadingSpinnerConfig,
    },
    {
      title: 'Text content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: loadingContentSource,
        },
      ],
      text: (
        <p>
          <strong>OuiLoadingContent</strong> is a simple loading animation for
          displaying placeholder text content. You can pass in a number of{' '}
          <OuiCode>lines</OuiCode> between 1 and 10.
        </p>
      ),
      props: { OuiLoadingContent },
      demo: <LoadingContent />,
      snippet: '<OuiLoadingContent lines={3} />',
      playground: loadingContentConfig,
    },
  ],
};
