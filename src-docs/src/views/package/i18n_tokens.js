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
import tokens from '../../../../i18ntokens.json';
import tokenChangelog from '../../../../i18ntokens_changelog.json';

import {
  OuiAccordion,
  OuiCodeBlock,
  OuiInMemoryTable,
  OuiLink,
  OuiSpacer,
  OuiText,
  OuiTitle,
} from '../../../../src';
import { GuidePage } from '../../components/guide_page';

const columns = [
  {
    name: 'Token',
    render({ filepath, loc, token }) {
      return (
        <div>
          <p>
            <strong>{token}</strong>
          </p>
          <OuiLink
            target="_blank"
            color="subdued"
            href={`https://github.com/opensearch-project/oui/blob/main/${filepath}#L${loc.start.line}`}>
            {filepath}:{loc.start.line}:{loc.start.column}
          </OuiLink>
        </div>
      );
    },
  },
  {
    name: 'Default',
    render({ defString, highlighting }) {
      return (
        <OuiCodeBlock
          language={highlighting === 'code' ? 'javascript' : undefined}
          paddingSize="none"
          transparentBackground
          fontSize="s">
          {defString}
        </OuiCodeBlock>
      );
    },
  },
];

const search = {
  box: {
    incremental: true,
    schema: true,
  },
};

export const I18nTokens = {
  name: 'I18n tokens',
  component: () => (
    <GuidePage title="I18n tokens">
      <OuiInMemoryTable
        items={tokens}
        columns={columns}
        search={search}
        pagination={{ initialPageSize: 50 }}
      />

      <OuiSpacer size="m" />

      <OuiTitle size="m">
        <span>Token changelog</span>
      </OuiTitle>

      {tokenChangelog.map(({ version, changes }) => (
        <OuiAccordion
          key={version}
          id={version}
          buttonContent={<span>{version}</span>}>
          <OuiInMemoryTable
            items={changes}
            columns={[
              {
                field: 'changeType',
                name: 'Change',
                width: '100px',
                render: (changeType) => (
                  <OuiText color="subdued" size="xs">
                    {changeType}
                  </OuiText>
                ),
              },
              { field: 'token', name: 'Token' },
              { field: 'value', name: 'New Value' },
            ]}
          />
          <OuiSpacer size="s" />
        </OuiAccordion>
      ))}
    </GuidePage>
  ),
};
