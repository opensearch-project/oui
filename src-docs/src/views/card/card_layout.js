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
  OuiIcon,
  OuiFlexGroup,
  OuiFlexItem,
} from '../../../../src/components';

export default () => (
  <OuiFlexGroup gutterSize="l">
    <OuiFlexItem>
      <OuiCard
        layout="horizontal"
        icon={<OuiIcon size="xl" type={'logoBeats'} />}
        title={'Elastic Beats'}
        description="This card adds uses an 'xl' size icon which works well in a horizontal layout."
        onClick={() => {}}
      />
    </OuiFlexItem>
    <OuiFlexItem>
      <OuiCard
        layout="horizontal"
        icon={<OuiIcon size="l" type={'logoCloud'} />}
        titleSize="xs"
        title={'Elastic Cloud'}
        description="This card uses an 'l' size icon but also shrinks the 'titleSize' to 'xs'."
        onClick={() => {}}
      />
    </OuiFlexItem>
    <OuiFlexItem>
      <OuiCard
        layout="horizontal"
        title={'No icon example'}
        description="Example of a card's description. Stick to one or two sentences."
        onClick={() => {}}
        href="#"
      />
    </OuiFlexItem>
  </OuiFlexGroup>
);
