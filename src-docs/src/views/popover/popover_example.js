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
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  OuiCode,
  OuiInputPopover,
  OuiPopover,
  OuiPopoverTitle,
  OuiPopoverFooter,
  OuiCallOut,
} from '../../../../src/components';

import Popover from './popover';
const popoverSource = require('./popover?raw');
const popoverHtml = renderToHtml(Popover);

import TrapFocus from './trap_focus';
const trapFocusSource = require('./trap_focus?raw');
const trapFocusHtml = renderToHtml(TrapFocus);

import PopoverAnchorPosition from './popover_anchor_position';
const popoverAnchorPositionSource = require('./popover_anchor_position?raw');
const popoverAnchorPositionHtml = renderToHtml(PopoverAnchorPosition);

import PopoverPanelClassName from './popover_panel_class_name';
const popoverPanelClassNameSource = require('./popover_panel_class_name?raw');
const popoverPanelClassNameHtml = renderToHtml(PopoverPanelClassName);

import PopoverWithTitle from './popover_with_title';
const popoverWithTitleSource = require('./popover_with_title?raw');
const popoverWithTitleHtml = renderToHtml(PopoverWithTitle);

import PopoverWithTitlePadding from './popover_with_title_padding';
const popoverWithTitlePaddingSource = require('./popover_with_title_padding?raw');
const popoverWithTitlePaddingHtml = renderToHtml(PopoverWithTitlePadding);

import PopoverHTMLElementAnchor from './popover_htmlelement_anchor';
const popoverHTMLElementAnchorSource = require('./popover_htmlelement_anchor?raw');
const popoverHTMLElementAnchorHtml = renderToHtml(PopoverHTMLElementAnchor);

import PopoverContainer from './popover_container';
const popoverContainerSource = require('./popover_container?raw');
const popoverContainerHtml = renderToHtml(PopoverContainer);

import PopoverFixed from './popover_fixed';
const popoverFixedSource = require('./popover_fixed?raw');
const popoverFixedHtml = renderToHtml(PopoverFixed);

import PopoverBlock from './popover_block';
const popoverBlockSource = require('./popover_block?raw');
const popoverBlockHtml = renderToHtml(PopoverBlock);

import InputPopover from './input_popover';
const inputPopoverSource = require('./input_popover?raw');
const inputPopoverHtml = renderToHtml(PopoverBlock);

const popOverSnippet = `<OuiPopover
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}>
  <!-- Popover content -->
</OuiPopover>`;

const trapFocusSnippet = `<OuiPopover
  ownFocus={false}
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}>
  <!-- Popover content -->
</OuiPopover>`;

const popoverAnchorSnippet = `<OuiPopover
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  anchorPosition="downLeft">
  <!-- Popover content -->
</OuiPopover>`;

const popoverWithTitleSnippet = `<OuiPopover
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}>
  <OuiPopoverTitle><!-- Popover title --></OuiPopoverTitle>
  <!-- Popover content -->
  <OuiPopoverFooter><!-- Popover footer --></OuiPopoverFooter>
</OuiPopover>`;

const popoverPanelClassNameSnippet = `<OuiPopover
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  panelClassName="yourClassNameHere"
  panelPaddingSize="none">
  <!-- Content for popover with custom class name and custom padding -->
</OuiPopover>`;

const popoverWithTitlePaddingSnippet = `<OuiPopover
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  panelPaddingSize="none">
  <OuiPopoverTitle paddingSize="s"><!-- Popover title --></OuiPopoverTitle>
  <!-- Content for popover without padding -->
  <OuiPopoverFooter paddingSize="s"><!-- Popover footer --></OuiPopoverFooter>
</OuiPopover>`;

const popoverContainerSnippet = `<OuiPopover
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  container={panel}>
  <!-- Content for popover inside a container -->
</OuiPopover>`;

const popoverFixedSnippet = `<OuiPopover
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  repositionOnScroll={true}>
  <!-- Content for popover on a fixed element -->
</OuiPopover>`;

const popoverBlockSnippet = `<OuiPopover
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  display="block">
  <!-- Content for popover with display block anchor -->
</OuiPopover>`;

const inputPopoverSnippet = `<OuiInputPopover
  input={input}
  isOpen={isPopoverOpen}
  closePopover={closePopover}>
  <!-- Popover content attached to input -->
</OuiInputPopover>`;

export const PopoverExample = {
  title: 'Popover',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverHtml,
        },
      ],
      text: (
        <>
          <p>
            Use the <strong>OuiPopover</strong> component to hide controls or
            options behind a clickable element. A popover is temporary so keep
            tasks simple and narrowly focused.
          </p>
          <p>
            While the visibility of the popover is maintained by the consuming
            application, popovers will automatically close when clicking outside
            of the popover bounds. Therefore all work done in a popover should
            automatically be saved.
          </p>
          <p>
            Avoid popover inception (popover triggering another popover), and
            instead use a{' '}
            <Link to="/navigation/context-menu">
              <strong>OuiContextMenu</strong>
            </Link>{' '}
            to swap the popover panel content.
          </p>
        </>
      ),
      props: { OuiPopover },
      snippet: popOverSnippet,
      demo: <Popover />,
    },
    {
      title: 'Anchor position',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverAnchorPositionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverAnchorPositionHtml,
        },
      ],
      text: (
        <>
          <p>
            The alignment and arrow on your popover can be set with the{' '}
            <OuiCode>anchorPosition</OuiCode> prop. These positions will update
            based upon screen real estate.
          </p>
          <p>
            <strong>Some tips:</strong>
          </p>
          <ul>
            <li>
              The first word in the <OuiCode>anchorPosition</OuiCode> denotes
              where the popover will appear relative to the button.
            </li>
            <li>
              The second word in the <OuiCode>anchorPosition</OuiCode> denotes
              where the gravity / pin position will appear relative to the
              popover.
            </li>
          </ul>
        </>
      ),
      props: { OuiPopover },
      snippet: popoverAnchorSnippet,
      demo: <PopoverAnchorPosition />,
    },
    {
      title: 'Popover titles and footers',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverWithTitleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverWithTitleHtml,
        },
      ],
      text: (
        <>
          <p>
            Popovers often need titling. Use the
            <strong>OuiPopoverTitle</strong> component nested somewhere inside
            the popover contents.
          </p>
          <p>
            You can also add a similarly styled{' '}
            <strong>OuiPopoverFooter</strong> for smaller captions or call to
            action buttons.
          </p>
        </>
      ),
      props: { OuiPopoverTitle, OuiPopoverFooter },
      demo: <PopoverWithTitle />,
      snippet: popoverWithTitleSnippet,
    },
    {
      title: 'Popover padding sizes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverWithTitlePaddingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverWithTitlePaddingHtml,
        },
      ],
      text: (
        <p>
          Use the <OuiCode>panelPaddingSize</OuiCode> prop to adjust the padding
          of the panel content. When using popover titles and footers, this
          setting will propogate to them. Or you can supply a custom{' '}
          <OuiCode>paddingSize</OuiCode> to either the{' '}
          <strong>OuiPopoverTitle</strong> of <strong>OuiPopoverFooter</strong>.
        </p>
      ),
      props: { OuiPopover, OuiPopoverTitle, OuiPopoverFooter },
      snippet: popoverWithTitlePaddingSnippet,
      demo: <PopoverWithTitlePadding />,
    },
    {
      title: 'Panel class name',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverPanelClassNameSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverPanelClassNameHtml,
        },
      ],
      text: (
        <p>
          Use the <OuiCode>panelClassName</OuiCode> prop to pass a custom class
          to the panel containing the popover contents.
        </p>
      ),
      props: { OuiPopover },
      demo: <PopoverPanelClassName />,
      snippet: popoverPanelClassNameSnippet,
    },
    {
      title: 'Popover with block level display',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverBlockSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverBlockHtml,
        },
      ],
      text: (
        <p>
          Popover anchors default to{' '}
          <OuiCode language="sass">display: inline-block;</OuiCode> so they do
          not force a display on inline triggers. If you do need to change this,
          just add <OuiCode language="js">display=&quot;block&quot;</OuiCode>
        </p>
      ),
      props: { OuiPopover },
      snippet: popoverBlockSnippet,
      demo: <PopoverBlock />,
    },
    {
      title: 'Popover on a fixed element',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverFixedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverFixedHtml,
        },
      ],
      text: (
        <p>
          Popover content even works on{' '}
          <OuiCode language="sass">position: fixed;</OuiCode> elements. Add the{' '}
          <OuiCode>repositionOnScroll</OuiCode> boolean prop to ensure the
          popover realigns to the fixed button on scroll.
        </p>
      ),
      props: { OuiPopover },
      snippet: popoverFixedSnippet,
      demo: <PopoverFixed />,
    },
    {
      title: 'Constraining a popover inside a container',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverContainerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverContainerHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiPopover</strong> can accept a React or DOM element as a{' '}
          <OuiCode>container</OuiCode> prop and restrict the popover from
          overflowing that container.
        </p>
      ),
      props: { OuiPopover },
      snippet: popoverContainerSnippet,
      demo: <PopoverContainer />,
    },
    {
      title: 'Popover attached to input element',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inputPopoverSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inputPopoverHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>OuiInputPopover</strong> is a specialized popover component
            intended to be used with form elements. Stylistically, the popover
            panel is
            {'"attached"'} to the input. Functionally, consumers have control
            over what events open and close the popover, and it can allow for
            natural tab order.
          </p>
          <p>
            Although some assumptions are made about keyboard behavior,
            consumers should provide specific key event handlers depending on
            the use case. For instance, a <OuiCode>type=text</OuiCode> input
            could use the down key to trigger popover opening, but this
            interaction would not be appropriate for{' '}
            <OuiCode>type=number</OuiCode> inputs as they natively bind to the
            down key.
          </p>
        </>
      ),
      props: { OuiInputPopover },
      snippet: inputPopoverSnippet,
      demo: <InputPopover />,
    },
    {
      title: 'Removing the focus trap',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: trapFocusSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: trapFocusHtml,
        },
      ],
      text: (
        <>
          <p>
            If the popover should not trap focus within itself, then you can
            remove it with <OuiCode language="ts">{'ownFocus={false}'}</OuiCode>
            .
          </p>
          <OuiCallOut
            iconType="accessibility"
            color="warning"
            title={
              <>
                Removing <OuiCode>ownFocus</OuiCode> makes it difficult for
                keyboard-only and screen reader users to navigate to and from
                your popover.
              </>
            }
          />
        </>
      ),
      props: { OuiPopover },
      snippet: trapFocusSnippet,
      demo: <TrapFocus />,
    },
    {
      title: 'Popover using an HTMLElement as the anchor',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverHTMLElementAnchorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverHTMLElementAnchorHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiWrappingPopover</strong> is an extra popover component that
          allows any existing DOM element to be passed as the{' '}
          <OuiCode>button</OuiCode> prop.
        </p>
      ),
      demo: <PopoverHTMLElementAnchor />,
    },
  ],
};
