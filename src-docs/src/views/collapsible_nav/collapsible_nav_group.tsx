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

import { OuiCollapsibleNavGroup } from '../../../../src/components/collapsible_nav';
import { OuiText } from '../../../../src/components/text';
import { OuiCode } from '../../../../src/components/code';

export default () => (
  <>
    <OuiCollapsibleNavGroup>
      <OuiText size="s" color="subdued">
        <p>This is a basic group without any modifications</p>
      </OuiText>
    </OuiCollapsibleNavGroup>
    <OuiCollapsibleNavGroup
      data-test-subj="TEST"
      title="Nav group"
      iconType="logoOUI">
      <OuiText size="s" color="subdued">
        <p>
          This is a nice group with a heading supplied via{' '}
          <OuiCode>title</OuiCode> and <OuiCode>iconType</OuiCode>.
        </p>
      </OuiText>
    </OuiCollapsibleNavGroup>
    <OuiCollapsibleNavGroup
      data-test-subj="TEST"
      background="light"
      title="Nav group"
      isCollapsible={true}
      iconType="logoOUI"
      initialIsOpen={true}>
      <OuiText size="s" color="subdued">
        <p>
          This group is <OuiCode>collapsible</OuiCode> and set with{' '}
          <OuiCode>initialIsOpen</OuiCode>. It has a heading that is the
          collapsing button via <OuiCode>title</OuiCode> and{' '}
          <OuiCode>iconType</OuiCode>.
        </p>
      </OuiText>
    </OuiCollapsibleNavGroup>
    <OuiCollapsibleNavGroup
      title="Nav group"
      iconType="logoGCPMono"
      iconSize="xxl"
      titleSize="s"
      isCollapsible={true}
      initialIsOpen={false}
      background="dark">
      <OuiText size="s">
        <p>
          This is a <OuiCode>dark</OuiCode> <OuiCode>collapsible</OuiCode> group
          that is initally set to closed,{' '}
          <OuiCode>iconSize=&quot;xxl&quot;</OuiCode> and{' '}
          <OuiCode>titleSize=&quot;s&quot;</OuiCode>.
        </p>
      </OuiText>
    </OuiCollapsibleNavGroup>
  </>
);
