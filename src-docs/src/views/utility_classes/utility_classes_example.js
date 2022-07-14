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

import { OuiSpacer, OuiText } from '../../../../src/components';
import { OuiHorizontalRule } from '../../../../src/components/horizontal_rule';
import { OuiCallOut } from '../../../../src/components/call_out';
import { OuiCode } from '../../../../src/components/code';
import { OuiLink } from '../../../../src/components/link';
import UtilityClassesDisplay from './utility_classes';
import UtilityClassesText from './utility_classes_text';
import UtilityClassesOverflows from './utility_classes_overflow';
import UtilityClassesVertAlign from './utility_classes_vert_align';
import UtilityClassesResponsive from './utility_classes_responsive';

export const UtilityClassesExample = {
  title: 'CSS utility classes',
  intro: (
    <OuiText grow={false}>
      <p>
        The following CSS-only classes are provided as helper utilities. They
        are useful for making micro-adjustments to existing React components.
      </p>
    </OuiText>
  ),
  sections: [
    {
      title: 'Display',
      wrapText: false,
      text: (
        <>
          <OuiSpacer />
          <UtilityClassesDisplay />
          <OuiSpacer />
          <OuiHorizontalRule />
        </>
      ),
    },
    {
      title: 'Text',
      wrapText: false,
      text: (
        <>
          <OuiSpacer />
          <UtilityClassesText />
          <OuiSpacer />
          <OuiHorizontalRule />
        </>
      ),
    },
    {
      title: 'Overflows',
      wrapText: false,
      text: (
        <>
          <OuiCallOut
            color="warning"
            iconType="accessibility"
            title="Scrollable regions must be focusable">
            <p>
              To ensure keyboard-only users have access to the scrollable
              regions, the optimal solution is to apply{' '}
              <OuiCode>{'tabIndex="0"'}</OuiCode> to the region.{' '}
              <OuiLink href="https://dequeuniversity.com/rules/axe/4.1/scrollable-region-focusable">
                Learn more about the{' '}
                <OuiCode>scrollable-region-focusable</OuiCode> rule at Deque.
              </OuiLink>
            </p>
          </OuiCallOut>
          <OuiSpacer />
          <UtilityClassesOverflows />
          <OuiSpacer />
          <OuiHorizontalRule />
        </>
      ),
    },
    {
      title: 'Vertical alignment',
      wrapText: false,
      text: (
        <>
          <OuiSpacer />
          <UtilityClassesVertAlign />
          <OuiSpacer />
          <OuiHorizontalRule />
        </>
      ),
    },
    {
      title: 'Responsive',
      wrapText: false,
      text: (
        <>
          <OuiSpacer />
          <UtilityClassesResponsive />
        </>
      ),
    },
  ],
};
