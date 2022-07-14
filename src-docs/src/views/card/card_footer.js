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
  OuiIcon,
  OuiFlexGroup,
  OuiFlexItem,
  OuiLink,
  OuiSpacer,
  OuiText,
} from '../../../../src/components';

export default () => (
  <OuiFlexGroup gutterSize="l">
    <OuiFlexItem>
      <OuiCard
        icon={<OuiIcon size="xxl" type="devToolsApp" />}
        title="Developers Tools"
        description="Example of a short card description."
        footer={
          <div>
            <OuiButton aria-label="Go to Developers Tools">Go for it</OuiButton>
            <OuiSpacer size="xs" />
            <OuiText size="s">
              <p>
                Or try <OuiLink href="http://google.com">this</OuiLink>
              </p>
            </OuiText>
          </div>
        }
      />
    </OuiFlexItem>
    <OuiFlexItem>
      <OuiCard
        icon={<OuiIcon size="xxl" type="dashboardApp" />}
        title="Dashboards"
        description="Example of a longer card description. See how the footers stay lined up."
        footer={
          <div>
            <OuiButton aria-label="Go to Dashboards">Go for it</OuiButton>
            <OuiSpacer size="xs" />
            <OuiText size="s">
              <p>
                Or try <OuiLink href="http://google.com">this</OuiLink>
              </p>
            </OuiText>
          </div>
        }
      />
    </OuiFlexItem>
    <OuiFlexItem>
      <OuiCard
        icon={<OuiIcon size="xxl" type="savedObjectsApp" />}
        title="Save Objects"
        description="Example of a short card description."
        footer={
          <div>
            <OuiButton aria-label="Go to Save Objects">Go for it</OuiButton>
            <OuiSpacer size="xs" />
            <OuiText size="s">
              <p>
                Or try <OuiLink href="http://google.com">this</OuiLink>
              </p>
            </OuiText>
          </div>
        }
      />
    </OuiFlexItem>
  </OuiFlexGroup>
);
