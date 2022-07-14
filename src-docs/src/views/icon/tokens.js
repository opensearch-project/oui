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
  OuiFlexGrid,
  OuiFlexItem,
  OuiPanel,
  OuiToken,
  OuiCopy,
  OuiCodeBlock,
  OuiSpacer,
} from '../../../../src/components';

const tokens = [
  'tokenString',
  'tokenNumber',
  'tokenBoolean',
  'tokenDate',
  'tokenGeo',
  'tokenIP',
  'tokenShape',
  'tokenNested',
  'tokenAlias',
  'tokenRange',
  'tokenAnnotation',
  'tokenArray',
  'tokenClass',
  'tokenConstant',
  'tokenElement',
  'tokenEnum',
  'tokenEnumMember',
  'tokenEvent',
  'tokenException',
  'tokenField',
  'tokenFunction',
  'tokenInterface',
  'tokenKey',
  'tokenMethod',
  'tokenModule',
  'tokenNamespace',
  'tokenNull',
  'tokenObject',
  'tokenOperator',
  'tokenPackage',
  'tokenParameter',
  'tokenProperty',
  'tokenStruct',
  'tokenVariable',
  'tokenFile',
  'tokenSymbol',
  'tokenRepo',
  'tokenBinary',
  'tokenJoin',
  'tokenPercolator',
  'tokenFlattened',
  'tokenRankFeature',
  'tokenRankFeatures',
  'tokenKeyword',
  'tokenCompletionSuggester',
  'tokenDenseVector',
  'tokenText',
  'tokenTokenCount',
  'tokenSearchType',
  'tokenHistogram',
];

export default () => (
  <>
    <OuiCodeBlock language="html" isCopyable paddingSize="m">
      {'<OuiToken iconType="tokenAnnotation" />'}
    </OuiCodeBlock>
    <OuiSpacer />
    <OuiFlexGrid direction="column" columns={3}>
      {tokens.map((token) => (
        <OuiFlexItem key={token}>
          <OuiCopy
            display="block"
            textToCopy={token}
            afterMessage={`${token} copied`}>
            {(copy) => (
              <OuiPanel
                hasShadow={false}
                hasBorder={false}
                onClick={copy}
                paddingSize="s">
                <OuiToken className="oui-alignMiddle" iconType={token} /> &emsp;{' '}
                <small>{token}</small>
              </OuiPanel>
            )}
          </OuiCopy>
        </OuiFlexItem>
      ))}
    </OuiFlexGrid>
  </>
);
