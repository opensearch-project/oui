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

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  OuiCode,
  OuiFlyout,
  OuiFlyoutBody,
  OuiFlyoutHeader,
  OuiFlyoutFooter,
  OuiCallOut,
} from '../../../../src/components';

import Flyout from './flyout';
const flyoutSource = require('./flyout?raw');

import FlyoutComplicated from './flyout_complicated';
const flyoutComplicatedSource = require('./flyout_complicated?raw');

import FlyoutSmall from './flyout_small';
const flyoutSmallSource = require('./flyout_small?raw');

import FlyoutLarge from './flyout_large';
const flyoutLargeSource = require('./flyout_large?raw');

import FlyoutPaddingMedium from './flyout_padding_medium';
const FlyoutPaddingMediumSource = require('./flyout_padding_medium?raw');

import FlyoutMaxWidth from './flyout_max_width';
const flyoutMaxWidthSource = require('./flyout_max_width?raw');

import FlyoutWithBanner from './flyout_banner';
const flyoutWithBannerSource = require('./flyout_banner?raw');

import FlyoutPush from './flyout_push';
const flyoutPushSource = require('./flyout_push?raw');

const flyOutSnippet = `<OuiFlyout onClose={closeFlyout}>
  <OuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <OuiTitle>
      <h2 id={flyoutHeadingId}><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
    </OuiTitle>
  </OuiFlyoutHeader>
  <OuiFlyoutBody>
    <!-- Flyout body content -->
  </OuiFlyoutBody>
</OuiFlyout>
`;

const flyoutComplicatedSnippet = `<OuiFlyout onClose={closeFlyout}>
  <OuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <OuiTitle>
      <h2 id={flyoutHeadingId}><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
    </OuiTitle>
  </OuiFlyoutHeader>
  <OuiFlyoutBody>
    <!-- Long content can be placed here -->
  </OuiFlyoutBody>
  <OuiFlyoutFooter>
    <OuiFlexGroup justifyContent="spaceBetween">
      <OuiFlexItem grow={false}><!-- FlexItem content --></OuiFlexItem>
      <OuiFlexItem grow={false}><!-- FlexItem content --></OuiFlexItem>
    </OuiFlexGroup>
  </OuiFlyoutFooter>
</OuiFlyout>
`;

const flyoutSmallSnippet = `<OuiFlyout ownFocus={false} size="s" onClose={closeFlyout}>
  <OuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <OuiTitle>
      <h2 id={flyoutHeadingId}><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
    </OuiTitle>
  </OuiFlyoutHeader>
  <OuiFlyoutBody>
    <!-- Flyout body content -->
  </OuiFlyoutBody>
</OuiFlyout>
`;

const flyoutMediumPaddingSnippet = `<OuiFlyout paddingSize="m" onClose={closeFlyout}>
  <OuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <OuiTitle>
      <h2 id={flyoutHeadingId}>
        <!-- Defaults to medium size. Change the heading level based on your context. -->
      </h2>
    </OuiTitle>
  </OuiFlyoutHeader>
  <OuiFlyoutBody>
    <!-- Flyout body content -->
  </OuiFlyoutBody>
</OuiFlyout>
`;

const flyoutMaxWidthSnippet = `<OuiFlyout maxWidth={448} onClose={closeFlyout}>
  <OuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <OuiTitle>
      <h2 id={flyoutHeadingId}><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
    </OuiTitle>
  </OuiFlyoutHeader>
  <OuiFlyoutBody>
    <!-- Flyout body content -->
  </OuiFlyoutBody>
</OuiFlyout>
`;

const flyoutLargeSnippet = `<OuiFlyout size="l" onClose={closeFlyout}>
  <OuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <OuiTitle>
      <h2 id={flyoutHeadingId}><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
    </OuiTitle>
  </OuiFlyoutHeader>
  <OuiFlyoutBody>
    <!-- Flyout body content -->
  </OuiFlyoutBody>
</OuiFlyout>
`;

const flyoutWithBannerSnippet = `<OuiFlyout onClose={closeFlyout}>
  <OuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <OuiTitle>
      <h2 id={flyoutHeadingId}><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
    </OuiTitle>
  </OuiFlyoutHeader>
  <OuiFlyoutBody banner={callOut}>
    <!-- Flyout body content -->
  </OuiFlyoutBody>
</OuiFlyout>
`;

const flyoutPushedSnippet = `<OuiFlyout type="push" onClose={closeFlyout}>
  <OuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <OuiTitle>
      <h2 id={flyoutHeadingId}><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
    </OuiTitle>
  </OuiFlyoutHeader>
  <OuiFlyoutBody>
    <!-- Flyout body content -->
  </OuiFlyoutBody>
  <OuiFlyoutFooter>
    <OuiButton onClose={closeFlyout}>Close</OuiButton>
  </OuiFlyoutFooter>
</OuiFlyout>
`;

export const FlyoutExample = {
  title: 'Flyout',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>OuiFlyout</strong> is a fixed position panel that pops in
            from the side of the window. It should be used to reveal more
            detailed contextual information or to provide complex forms without
            losing the user&apos;s current state. It is a good alternative to{' '}
            <Link to="/layout/modal">modals</Link> when the action is not
            transient.
          </p>
          <p>
            Like modals, you control the visibilty of the flyout using your own
            state management, but <strong>OuiFlyout</strong> requires an{' '}
            <OuiCode>onClose</OuiCode> handler for it&apos;s internal dismiss
            buttons.
          </p>

          <OuiCallOut
            iconType="accessibility"
            title={
              <>
                Use <OuiCode>{'aria-labelledby={headingId}'}</OuiCode> to
                announce the flyout to screen readers.
              </>
            }
          />
        </>
      ),
      props: { OuiFlyout },
      snippet: flyOutSnippet,
      demo: <Flyout />,
    },
    {
      title: 'More complicated flyout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutComplicatedSource,
        },
      ],
      text: (
        <>
          <p>
            This component also comes with related child components for ease of
            creating headers, footers and scrolling body content.{' '}
            <strong>OuiFlyoutHeader</strong> and{' '}
            <strong>OuiFlyoutFooter</strong> are pinned to the top and bottom of
            the flyout, respectively, to allow for always visible navigation and
            actions. The <strong>OuiFlyoutBody</strong> component will then
            automatically overflow.
          </p>
        </>
      ),
      props: { OuiFlyoutHeader, OuiFlyoutBody, OuiFlyoutFooter },
      snippet: flyoutComplicatedSnippet,
      demo: <FlyoutComplicated />,
    },
    {
      title: 'Sizing',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutLargeSource,
        },
      ],
      text: (
        <p>
          Flyouts come in three predefined <OuiCode>size</OuiCode>s of{' '}
          <OuiCode>{"'s' | 'm' | 'l'"}</OuiCode>, which define the width{' '}
          <strong>relative to the window size</strong> with a minimum width
          defined in pixels. You can otherwise supply your own fixed width in
          number or string format.
        </p>
      ),
      snippet: flyoutLargeSnippet,
      demo: <FlyoutLarge />,
      props: { OuiFlyout },
    },
    {
      title: 'Adjusting padding',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: FlyoutPaddingMediumSource,
        },
      ],
      text: (
        <p>
          All the inner flyout components inherit their padding from the
          wrapping <strong>OuiFlyout</strong> component. This ensures that all
          the horizontal edges line up no matter the{' '}
          <OuiCode>paddingSize</OuiCode>. When using the{' '}
          <OuiCode>{'"none"'}</OuiCode> size, you will need to accommodate your
          content with some other way of creating distance to the edges of the
          flyout.
        </p>
      ),
      snippet: flyoutMediumPaddingSnippet,
      demo: <FlyoutPaddingMedium />,
      props: { OuiFlyout },
    },
    {
      title: 'Adding a banner',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutWithBannerSource,
        },
      ],
      text: (
        <p>
          To highlight some information at the top of a flyout, you can pass an{' '}
          <Link to="/display/callout">
            <strong>OuiCallOut</strong>
          </Link>{' '}
          to the <OuiCode>banner</OuiCode> prop available in{' '}
          <strong>OuiFlyoutBody</strong> and its layout will adjust
          appropriately.
        </p>
      ),
      snippet: flyoutWithBannerSnippet,
      demo: <FlyoutWithBanner />,
      props: { OuiFlyoutBody },
    },
    {
      title: 'Without ownFocus',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutSmallSource,
        },
      ],
      text: (
        <>
          <p>
            Like modals, you will usually want to obscure the page content
            beneath with <OuiCode>ownFocus</OuiCode> which wraps the flyout with
            an{' '}
            <Link to="/utilities/overlay-mask">
              <strong>OuiOverlayMask</strong>
            </Link>{' '}
            . However, there are use-cases where flyouts present more
            information or controls, but need to maintain the interactions of
            the page content. By setting{' '}
            <OuiCode language="js">{'ownFocus={false}'}</OuiCode>, the
            underlying page content will be visible and clickable.
          </p>
        </>
      ),
      snippet: flyoutSmallSnippet,
      demo: <FlyoutSmall />,
      props: { OuiFlyout },
    },
    {
      title: 'Push versus overlay',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutPushSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            Another way to allow for continued interactions of the page content
            while a flyout is visible, is to change the <OuiCode>type</OuiCode>{' '}
            from <OuiCode>overlay</OuiCode> to <OuiCode>push</OuiCode>.
          </p>
          <p>
            A pushed flyout still positions itself as <OuiCode>fixed</OuiCode>,
            but adds padding to the document&apos;s body element to accommodate
            for the flyout&apos;s width. Because this squishes the page content,
            the flyout changes back to <OuiCode>overlay</OuiCode> at smaller
            window widths. You can adjust this minimum breakpoint with{' '}
            <OuiCode>pushMinBreakpoint</OuiCode>.
          </p>
        </Fragment>
      ),
      snippet: flyoutPushedSnippet,
      demo: <FlyoutPush />,
      props: { OuiFlyout },
    },
    {
      title: 'Understanding max-width',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutMaxWidthSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            By default, flyouts will continue to grow with the width of the
            window. To stop this growth at an ideal width, set{' '}
            <OuiCode>maxWidth</OuiCode> to <OuiCode>true</OuiCode>, or pass your
            own custom size.
          </p>
          <OuiCallOut
            color="warning"
            title="Note that there are some caveats to providing a maxWidth that is smaller than the minWidth."
          />
        </Fragment>
      ),
      snippet: flyoutMaxWidthSnippet,
      demo: <FlyoutMaxWidth />,
      props: { OuiFlyout },
    },
  ],
};
