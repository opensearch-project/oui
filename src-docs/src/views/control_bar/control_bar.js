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

import React, { useState } from 'react';

import {
  OuiButton,
  OuiControlBar,
  OuiLink,
  OuiPanel,
  OuiText,
} from '../../../../src/components';

export default () => {
  const [contentIsVisible, setVisibility] = useState(false);
  const [isDisplaying, setDisplay] = useState(false);

  const toggleContent = () => {
    setVisibility(!contentIsVisible);
  };

  const toggleDisplay = () => {
    setDisplay(!isDisplaying);
    setVisibility(false);
  };

  const codeControls = [
    {
      controlType: 'icon',
      id: 'root_icon',
      iconType: 'submodule',
      'aria-label': 'Project Root',
    },
    {
      controlType: 'breadcrumbs',
      id: 'current_file_path',
      breadcrumbs: [
        {
          text: 'src',
        },
        {
          text: 'components',
        },
      ],
    },
    {
      controlType: 'spacer',
    },
    {
      controlType: 'icon',
      id: 'status_icon',
      iconType: 'alert',
      color: 'warning',
      'aria-label': 'Repo Status',
    },
    {
      controlType: 'divider',
    },
    {
      controlType: 'icon',
      id: 'branch_icon',
      iconType: 'branch',
      'aria-label': 'Branch Icon',
    },
    {
      controlType: 'text',
      id: 'branch_name',
      text: 'some_long_branch',
    },
    {
      controlType: 'divider',
    },
    {
      controlType: 'icon',
      id: 'github_icon',
      iconType: 'logoGithub',
      onClick: () => {},
      title: 'Open in Github',
      'aria-label': 'Open in Github',
    },
    {
      controlType: 'divider',
    },
    {
      controlType: 'button',
      id: 'open_history_view',
      label: contentIsVisible ? 'Hide history' : 'Show history',
      color: 'primary',
      onClick: toggleContent,
    },
  ];

  let display;

  if (isDisplaying) {
    display = (
      <OuiControlBar controls={codeControls} showContent={contentIsVisible}>
        <div style={{ padding: '2rem', maxWidth: '60rem', margin: '0 auto' }}>
          <OuiPanel>
            <OuiText>
              <p>
                OpenSearch is a scalable, flexible, and extensible open-source
                software suite for search, analytics, and observability
                applications licensed under Apache 2.0. Powered by{' '}
                <OuiLink href="https://lucene.apache.org/">
                  Apache Lucene
                </OuiLink>{' '}
                and driven by the{' '}
                <OuiLink href="https://opensearch.org/about.html">
                  OpenSearch Project community
                </OuiLink>
                , OpenSearch offers a vendor-agnostic toolset you can use to
                build secure, high-performance, cost-efficient applications. Use
                OpenSearch as an end-to-end solution or connect it with your
                preferred open-source tools or{' '}
                <OuiLink href="https://opensearch.org/partners">
                  partner projects
                </OuiLink>
                .
              </p>
              <h3>Build powerful search solutions</h3>
              <p>
                Deploy e-commerce, application, and document search with
                community-built tools. Support for{' '}
                <OuiLink href="https://opensearch.org/docs/latest/opensearch/query-dsl/full-text/">
                  full text queries
                </OuiLink>
                , natural language processing, custom dictionaries, and a{' '}
                <OuiLink href="https://opensearch.org/docs/latest/opensearch/ux/">
                  range of search features
                </OuiLink>{' '}
                provides a flexible foundation for structured and unstructured
                search applications. With built-in faceting, relevance ranking
                and scoring, and a selection of machine learning (ML) features,
                you can build search solutions that are finely tuned to your
                data.
              </p>
              <h3>Analyze and discover at scale</h3>
              <p>
                Capture, store, and analyze your business, operational, and
                security data from a variety of sources. Use your preferred data
                collector and enrich your analytics pipeline with integrated ML
                tools like{' '}
                <OuiLink href="https://opensearch.org/docs/latest/monitoring-plugins/ad/index/">
                  anomaly detection
                </OuiLink>
                . Built-in search functionality supports fast, accurate query
                results and time-sensitive insights. Visualize and report
                discoveries with{' '}
                <OuiLink href="https://opensearch.org/docs/latest/dashboards/index/">
                  OpenSearch Dashboards
                </OuiLink>{' '}
                and use{' '}
                <OuiLink href="https://opensearch.org/docs/latest/search-plugins/sql/sql/jdbc/">
                  JDBC
                </OuiLink>{' '}
                to connect to popular business intelligence systems.
              </p>
              <h3>Achieve end-to-end observability</h3>
              <p>
                Visualize your monitored environments from end to end and
                identify and resolve issues as they arise with flexible{' '}
                <OuiLink href="https://opensearch.org/docs/latest/observability-plugin/index/">
                  observability tools
                </OuiLink>
                . Build visualizations from your metrics, traces, and logs, with
                the option to use{' '}
                <OuiLink href="https://opensearch.org/docs/latest/data-prepper/index/">
                  Data Prepper
                </OuiLink>{' '}
                to transform and enrich your source data. Support for
                open-source systems like OpenTelemetry and Prometheus means you
                can create powerful, customized observability solutions using
                state-of-the-art components.
              </p>
              <h3>Getting started</h3>
              <p>
                OpenSearch includes a data store and search engine, a
                visualization and user interface, and a{' '}
                <OuiLink href="https://opensearch.org/docs/latest/install-and-configure/install-opensearch/plugins/#available-plugins">
                  library of plugins
                </OuiLink>{' '}
                you can use to tailor your tools to your requirements. Get
                started in the way that best suits your team and your
                environment. To configure your first OpenSearch cluster, you can{' '}
                <OuiLink href="https://opensearch.org/downloads.html">
                  download the OpenSearch components
                </OuiLink>{' '}
                in a variety of distributions or start with the official{' '}
                <OuiLink href="https://hub.docker.com/r/opensearchproject/opensearch">
                  Docker Image
                </OuiLink>
                .
              </p>
              <h3>OpenSearch Project partners</h3>
              <p>
                Visit the OpenSearch Project{' '}
                <OuiLink href="https://opensearch.org/partners">
                  partner page
                </OuiLink>{' '}
                for a network of organizations who offer hosted solutions,
                provide help with technical challenges, and build tools to
                extend the capabilities of OpenSearch. Interested in becoming a
                project partner?{' '}
                <OuiLink href="https://opensearch.org/new-partner.html">
                  Learn how
                </OuiLink>
                .
              </p>
            </OuiText>
          </OuiPanel>
        </div>
      </OuiControlBar>
    );
  }

  return (
    <div>
      <OuiButton onClick={toggleDisplay}>Toggle example</OuiButton>
      {display}
    </div>
  );
};
