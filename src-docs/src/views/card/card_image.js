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
  OuiButton,
  OuiCard,
  OuiFlexGroup,
  OuiFlexItem,
  OuiIcon,
} from '../../../../src/components';

const cardFooterContent = (
  <OuiFlexGroup justifyContent="flexEnd">
    <OuiFlexItem grow={false}>
      <OuiButton>View Details</OuiButton>
    </OuiFlexItem>
  </OuiFlexGroup>
);

export default () => (
  <OuiFlexGroup gutterSize="l">
    <OuiFlexItem>
      <OuiCard
        textAlign="left"
        image={
          <div>
            <img
              src="https://source.unsplash.com/400x200/?Nature"
              alt="Nature"
            />
          </div>
        }
        title="Title"
        description="Example of a card's description. Stick to one or two sentences."
        footer={cardFooterContent}
      />
    </OuiFlexItem>
    <OuiFlexItem>
      <OuiCard
        textAlign="left"
        image="https://source.unsplash.com/400x200/?Water"
        title="Title"
        description="Example of a card's description. Stick to one or two sentences."
        footer={cardFooterContent}
      />
    </OuiFlexItem>
    <OuiFlexItem>
      <OuiCard
        textAlign="left"
        href="https://oui.opensearch.org/latest/"
        image="https://source.unsplash.com/400x200/?City"
        icon={<OuiIcon size="xxl" type="logoBeats" />}
        title={'Title'}
        description="This card has an href and should be a link."
      />
    </OuiFlexItem>
  </OuiFlexGroup>
);
