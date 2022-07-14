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
  OuiIcon,
  OuiPanel,
  OuiCodeBlock,
  OuiSpacer,
  OuiCopy,
} from '../../../../src/components';

const iconSizes = ['s', 'm', 'l', 'xl', 'xxl', 'original'];
const iconSizesText = [
  'small',
  'medium',
  'large',
  'x-large',
  'xx-large',
  'original',
];

export default () => (
  <>
    <OuiCodeBlock language="html" isCopyable paddingSize="m">
      {'<OuiIcon type="logoElasticsearch" size="xl" />'}
    </OuiCodeBlock>
    <OuiSpacer />
    <OuiFlexGrid direction="column" columns={3}>
      {iconSizes.map((iconSize, index) => (
        <OuiFlexItem key={iconSize}>
          <OuiCopy
            display="block"
            textToCopy={iconSize}
            afterMessage={`${iconSize} copied`}>
            {(copy) => (
              <OuiPanel
                hasShadow={false}
                hasBorder={false}
                onClick={copy}
                paddingSize="s">
                <OuiIcon type="logoElasticStack" size={iconSize} /> &emsp;{' '}
                {iconSizesText[index]}
              </OuiPanel>
            )}
          </OuiCopy>
        </OuiFlexItem>
      ))}
    </OuiFlexGrid>
  </>
);
