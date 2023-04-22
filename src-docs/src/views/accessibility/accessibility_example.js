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

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  OuiBadge,
  OuiSpacer,
  OuiCallOut,
  OuiCode,
  OuiLink,
  OuiKeyboardAccessible,
  OuiSkipLink,
  OuiScreenReaderOnly,
} from '../../../../src/components';

import KeyboardAccessible from './keyboard_accessible';
import ScreenReaderOnly from './screen_reader';
import SkipLink from './skip_link';

const keyboardAccessibleSource = require('./keyboard_accessible?raw');
const keyboardAccessibleHtml = renderToHtml(KeyboardAccessible);
const keyboardAccessibleSnippet = `<OuiKeyboardAccessible>
  <!-- interactive child element -->
</OuiKeyboardAccessible>`;

const screenReaderOnlyHtml = renderToHtml(ScreenReaderOnly);
const screenReaderOnlySource = require('./screen_reader?raw');
const screenReaderOnlySnippet = [
  `<OuiScreenReaderOnly>
  <!-- visually hidden content -->
</OuiScreenReaderOnly>
`,
  `<OuiScreenReaderOnly showOnFocus>
  <!-- visually hidden content, displayed on focus -->
</OuiScreenReaderOnly>
`,
];

const skipLinkHtml = renderToHtml(SkipLink);
const skipLinkSource = require('./skip_link?raw');
const skipLinkSnippet = [
  `<OuiSkipLink destinationId="myAnchorId">
  Skip to content
</OuiSkipLink>
`,
  `<OuiSkipLink destinationId="myAnchorId" position="fixed">
  Skip to main content
</OuiSkipLink>
`,
];

export const AccessibilityExample = {
  title: 'Accessibility',
  sections: [
    {
      title: 'Keyboard accessible',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: keyboardAccessibleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: keyboardAccessibleHtml,
        },
      ],
      text: (
        <>
          <OuiBadge
            color="danger"
            href="https://github.com/elastic/eui/issues/1469"
            target="_blank"
            iconSide="right"
            iconType="popout">
            Set for deprecation. See details.
          </OuiBadge>

          <OuiSpacer />

          <OuiCallOut
            color="warning"
            iconType="accessibility"
            title="Deprecated because it often causes problems for screen reader users">
            <p>
              Though this component solved some problems for keyboard-only users
              it also frequently introduced problems for screen reader users. As
              such, we don&apos;t recommend it&apos;s continued use.
            </p>
          </OuiCallOut>

          <OuiSpacer />

          <p>
            You can make interactive elements keyboard-accessible with the{' '}
            <strong>OuiKeyboardAccessible</strong> component. This is necessary
            for non-button elements and <OuiCode>a</OuiCode> tags without{' '}
            <OuiCode>href</OuiCode> attributes.
          </p>
        </>
      ),
      props: { OuiKeyboardAccessible },
      snippet: keyboardAccessibleSnippet,
      demo: <KeyboardAccessible />,
    },
    {
      title: 'Screen reader only',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: screenReaderOnlySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: screenReaderOnlyHtml,
        },
      ],
      text: (
        <div>
          <p>
            Use the <strong>OuiScreenReaderOnly</strong> component to visually
            hide elements while still allowing them to be read by screen
            readers. In certain cases, you may want to use the{' '}
            <OuiCode>showOnFocus</OuiCode> prop to display screen reader-only
            content when in focus.
          </p>
          <OuiCallOut
            color="warning"
            iconType="accessibility"
            title="WebAIM recommendation for screen reader-only content">
            <p>
              &quot;In most cases, if content (particularly content that
              provides functionality or interactivity) is important enough to
              provide to screen reader users, it should probably be made
              available to all users.&quot;{' '}
              <OuiLink
                href="http://webaim.org/techniques/css/invisiblecontent/"
                external>
                Learn more about invisible content
              </OuiLink>
            </p>
          </OuiCallOut>
        </div>
      ),
      props: {
        OuiScreenReaderOnly,
      },
      snippet: screenReaderOnlySnippet,
      demo: <ScreenReaderOnly />,
    },
    {
      title: 'Skip link',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: skipLinkSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: skipLinkHtml,
        },
      ],
      text: (
        <p>
          The <strong>OuiSkipLink</strong> component allows users to bypass
          navigation, or ornamental elements, and quickly reach the main content
          of the page.
        </p>
      ),
      props: { OuiSkipLink },
      snippet: skipLinkSnippet,
      demo: <SkipLink />,
    },
  ],
};
