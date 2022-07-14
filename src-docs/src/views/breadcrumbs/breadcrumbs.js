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

import {
  OuiBreadcrumbs,
  OuiButton,
  OuiPageContent,
  OuiPageContentHeader,
  OuiPageContentHeaderSection,
  OuiTitle,
  OuiSpacer,
} from '../../../../src/components';

export default () => {
  const breadcrumbs = [
    {
      text: 'Animals',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
      },
      'data-test-subj': 'breadcrumbsAnimals',
    },
    {
      text: 'Reptiles',
    },
    {
      text: 'Boa constrictor',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      text: 'Edit',
    },
  ];

  return (
    <OuiPageContent role={null}>
      <OuiBreadcrumbs
        breadcrumbs={breadcrumbs}
        truncate={false}
        aria-label="An example of OuiBreadcrumbs"
      />
      <OuiSpacer size="xs" />
      <OuiPageContentHeader>
        <OuiPageContentHeaderSection>
          <OuiTitle size="l">
            <h1>Boa constrictor</h1>
          </OuiTitle>
        </OuiPageContentHeaderSection>

        <OuiPageContentHeaderSection>
          <OuiButton>Cancel</OuiButton>
        </OuiPageContentHeaderSection>
      </OuiPageContentHeader>
    </OuiPageContent>
  );
};
