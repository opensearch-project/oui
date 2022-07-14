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
  OuiCard,
  OuiSpacer,
  OuiText,
  OuiI18n,
  OuiTitle,
  useOuiI18n,
} from '../../../../src/components';

export default () => {
  const [title, description] = useOuiI18n(
    ['ouiI18nMulti.title', 'ouiI18nMulti.description'],
    ['Card Title', 'Card Description']
  );
  return (
    <>
      <OuiTitle size="xs">
        <h3>useOuiI18n with multiple tokens</h3>
      </OuiTitle>
      <div>
        <OuiText>
          <p>
            Both title and description for the card are looked up in one call to{' '}
            <strong>useOuiI18n</strong>
          </p>
        </OuiText>
        <OuiSpacer />
        <OuiCard
          className="oui-displayInlineBlock"
          title={title}
          description={description}
        />
      </div>

      <OuiSpacer size="l" />

      <OuiTitle size="xs">
        <h3>OuiI18n render prop with multiple tokens</h3>
      </OuiTitle>
      <div>
        <OuiText>
          <p>
            Both title and description for the card are looked up in one call to{' '}
            <strong>OuiI18n</strong>
          </p>
        </OuiText>
        <OuiSpacer />
        <OuiI18n
          tokens={['ouiI18nMulti.title', 'ouiI18nMulti.description']}
          defaults={['Card Title', 'Card Description']}>
          {([title, description]) => (
            <OuiCard
              className="oui-displayInlineBlock"
              title={title}
              description={description}
            />
          )}
        </OuiI18n>
      </div>
    </>
  );
};
