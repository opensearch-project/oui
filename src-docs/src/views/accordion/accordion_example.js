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

import { OuiAccordion, OuiCode, OuiCallOut } from '../../../../src/components';

import { accordionConfig } from './playground';

import Accordion from './accordion';
const accordionSource = require('./accordion?raw');

import AccordionArrow from './accordion_arrow';
const accordionArrowSource = require('./accordion_arrow?raw');
import AccordionArrowRight from './accordion_arrow_right';
const accordionArrowRightSource = require('./accordion_arrow_right?raw');

import AccordionMultiple from './accordion_multiple';
const accordionMultipleSource = require('./accordion_multiple?raw');
const accordionMultipleSnippet = `<OuiAccordion
  id={accordionId}
  buttonContent="Clickable title for first item"
  paddingSize="l">
    <!-- Content to show when expanded -->
</OuiAccordion>
<OuiSpacer />
<OuiAccordion
  id={accordionId}
  buttonContent="Clickable title for second item"
  paddingSize="l">
    <!-- Content to show when expanded -->
</OuiAccordion>
`;

import AccordionForm from './accordion_form';
const accordionFormSource = require('./accordion_form?raw');

import AccordionExtra from './accordion_extra';
const accordionExtraSource = require('./accordion_extra?raw');
const accordionExtraSnippet = `<OuiAccordion
  id={accordionId}
  buttonContent="Clickable title"
  extraAction={<OuiButton size="s">Extra action!</OuiButton>}
  paddingSize="l">
    <!-- Content to show when expanded -->
</OuiAccordion>
`;

import AccordionOpen from './accordion_open';
const accordionOpenSource = require('./accordion_open?raw');
const accordionOpenSnippet = `<OuiAccordion
  id={accordionId}
  buttonContent="Clickable title"
  initialIsOpen={true}>
    <!-- Content to show when expanded -->
</OuiAccordion>
`;

import AccordionGrow from './accordion_grow';
const accordionGrowSource = require('./accordion_grow?raw');

import AccordionForceState from './accordion_forceState';
const accordionForceStateSource = require('./accordion_forceState?raw');
const accordionForceStateSnippet = `<OuiAccordion
  id={accordionId}
  forceState="open"
  onToggle={onToggle}
  buttonContent="Controlled via outside prop">
    <!-- Content to show when expanded -->
</OuiAccordion>`;

import AccordionIsLoading from './accordion_isLoading';
const accordionIsLoadingSource = require('./accordion_isLoading?raw');
const accordionIsLoadingSnippet = [
  `<OuiAccordion
  id={accordionId}
  isLoading>
    <!-- Content to show when expanded -->
</OuiAccordion>
`,
  `<OuiAccordion
  id={accordionId}
  isLoading
  isLoadingMessage={customMessage}>
  <!-- Content that will be replaced by isLoadingMessage -->
</OuiAccordion>`,
];

export const AccordionExample = {
  title: 'Accordion',
  intro: (
    <Fragment>
      <OuiCallOut title="Take care when including flex group content within accordions">
        <p>
          <strong>OuiFlexGroup</strong>&apos;s negative margins can sometimes
          create scrollbars within <strong>OuiAccordion</strong> because of the
          overflow tricks used to hide content. If you run into this issue make
          sure your <OuiCode>paddingSize</OuiCode> prop is large enough to
          account for the <OuiCode>gutterSize</OuiCode> of any nested flex
          groups.
        </p>
      </OuiCallOut>
    </Fragment>
  ),
  sections: [
    {
      title: 'Simple and unstyled',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>OuiAccordion</strong> has been purposely designed with
            minimal styles, allowing you to visually enhance it as needed (see
            the accordion form example). The only styling enforced by OUI is the
            caret icon, which indicates to users that the item can be opened.
          </p>
          <p>
            A <OuiCode>buttonContent</OuiCode> prop defines the content of the
            clickable area. On click it will expose the children and animate
            based on the height of those children.
          </p>
          <p>
            For styling needs, classes can be individually applied with{' '}
            <OuiCode>className</OuiCode> (for the entire accordion), and{' '}
            <OuiCode>buttonClassName</OuiCode> (for the clickable area).
          </p>
        </>
      ),
      demo: <Accordion />,
      playground: accordionConfig,
      props: { OuiAccordion },
      snippet: `<OuiAccordion
  id={accordionId}
  buttonContent="Clickable title"
  >
    <!-- Content to show when expanded -->
</OuiAccordion>
`,
    },
    {
      title: 'Arrow display',
      text: (
        <>
          <p>
            The arrow helps indicate the current state of the accordion (open or
            not) and points to the main triggering button text. If you must hide
            or change the side in which the arrow appears, use{' '}
            <OuiCode>arrowDisplay: &apos;right&apos;</OuiCode> or{' '}
            <OuiCode>&apos;none&apos;</OuiCode>
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionArrowRightSource,
        },
      ],
      demo: <AccordionArrowRight />,
      snippet: `<OuiAccordion
  id={accordionId}
  buttonContent="Clickable title"
  arrowDisplay="right"
  >
    <!-- Content to show when expanded -->
</OuiAccordion>
`,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionArrowSource,
        },
      ],
      demo: <AccordionArrow />,
      snippet: `<OuiAccordion
  id={accordionId}
  buttonContent="Clickable title"
  arrowDisplay="none"
  >
    <!-- Content to show when expanded -->
</OuiAccordion>
`,
    },
    {
      title: 'Multiple accordions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionMultipleSource,
        },
      ],
      text: (
        <>
          <p>
            Use any number of <strong>OuiAccordion</strong> elements to visually
            display them as a group.
          </p>
          <p>
            Due to the previously mentioned bare styles, it is recommended to
            place an{' '}
            <Link to="/layout/spacer">
              <strong>OuiSpacer</strong>
            </Link>{' '}
            between accordion items. Padding within each accordion item can be
            applied via the <OuiCode>paddingSize</OuiCode> prop.
          </p>
        </>
      ),
      snippet: accordionMultipleSnippet,
      demo: <AccordionMultiple />,
    },
    {
      title: 'Extra actions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionExtraSource,
        },
      ],
      text: (
        <p>
          Use the <OuiCode>extraAction</OuiCode> prop to pass an extra action
          displayed on the right of any accordion. Usually this is a delete or
          button, but can be anything. Note that this action is separate from
          the click state that expands the accordion. This is needed to make it
          accessible.
        </p>
      ),
      snippet: accordionExtraSnippet,
      demo: <AccordionExtra />,
    },
    {
      title: 'Opened on initial render',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionOpenSource,
        },
      ],
      text: (
        <p>
          Use the <OuiCode>initialIsOpen</OuiCode> prop to open the accordion
          when first rendered.
        </p>
      ),
      snippet: accordionOpenSnippet,
      demo: <AccordionOpen />,
    },
    {
      title: 'Controlling toggled state',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionForceStateSource,
        },
      ],
      text: (
        <>
          <p>
            Typically, the open and closed state of{' '}
            <strong>OuiAccordion</strong> is maintained by the component&apos;s
            internal state. Though, you can manually control it with:
          </p>
          <ul>
            <li>
              <OuiCode>forceState</OuiCode>: Accepts either{' '}
              <OuiCode>{"'open'"}</OuiCode> or <OuiCode>{"'closed'"}</OuiCode>.
            </li>
            <li>
              <OuiCode>onToggle</OuiCode>: A callback function returning{' '}
              <OuiCode>true</OuiCode> if the accordion is open
            </li>
          </ul>
        </>
      ),
      snippet: accordionForceStateSnippet,
      demo: <AccordionForceState />,
    },
    {
      title: 'Loading state',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionIsLoadingSource,
        },
      ],
      text: (
        <>
          <p>
            Use the <OuiCode>isLoading</OuiCode> prop when not all of the
            accordion&apos;s content is ready yet. When using{' '}
            <OuiCode>isLoading</OuiCode>, the content of{' '}
            <OuiCode>extraAction</OuiCode> is replaced with a loading spinner.
          </p>
          <p>
            Manage the content of the accordion using{' '}
            <OuiCode>isLoadingMessage</OuiCode>. By default, it is set to{' '}
            <OuiCode>false</OuiCode> and the content will remain unaltered. Set
            it to <OuiCode>true</OuiCode> to show a default loading message or
            pass a node to show a custom loading message.
          </p>
        </>
      ),
      snippet: accordionIsLoadingSnippet,
      demo: <AccordionIsLoading />,
    },
    {
      title: 'When content changes dynamically',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionGrowSource,
        },
      ],
      text: (
        <p>
          If an accordion&rsquo;s content changes height while the accordion is
          open, it will resize dynamically.
        </p>
      ),
      demo: <AccordionGrow />,
    },
    {
      title: 'Styled for forms',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionFormSource,
        },
      ],
      text: (
        <>
          <p>
            Since accordions are unstyled by default, OUI also provides a few
            classes you can add to parts of the OuiAccordion to give it more
            style, like when using with forms.
          </p>
          <ul>
            <li>
              <OuiCode>.ouiAccordionForm</OuiCode>: Applied to the{' '}
              <OuiCode>className</OuiCode>, adds top and bottom borders
            </li>
            <li>
              <OuiCode>.ouiAccordionForm__button</OuiCode>: Applied to the{' '}
              <OuiCode>buttonClassName</OuiCode>, adds extra padding to the
              button for better spacing
            </li>
            <li>
              <OuiCode>.ouiAccordionForm__extraAction</OuiCode>: Applied to the
              button passed to <OuiCode>extraAction</OuiCode>, will visually
              hide it until hover or focus
            </li>
          </ul>
        </>
      ),
      demo: <AccordionForm />,
      snippet: `<OuiAccordion
  id={accordionId}
  className="ouiAccordionForm"
  buttonClassName="ouiAccordionForm__button"
  buttonContent={buttonContent}
  extraAction={<OuiButtonIcon
    iconType="cross"
    color="danger"
    className="ouiAccordionForm__extraAction"
    aria-label="Delete"
  />}
  paddingSize="l">
  <!-- Content to show when expanded -->
</OuiAccordion>`,
    },
  ],
};
