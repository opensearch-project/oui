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

import { OuiCode, OuiControlBar } from '../../../../src/components';

import {
  BreadcrumbControlProps,
  ButtonControlProps,
  DividerControlProps,
  IconControlTypeProps,
  IconButtonControlTypeProps,
  SpacerControlProps,
  TabControlProps,
  TextControlProps,
} from './props';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import ControlBar from './control_bar';
import Controls from './controls';
import ControlBarWithTabs from './tabs';
import ControlBarMobile from './mobile';

const controlsSource = require('./controls?raw');
const controlsHtml = renderToHtml(Controls);

const controlBarSource = require('./control_bar?raw');
const controlBarHtml = renderToHtml(ControlBar);
const controlBarSnippet = `<OuiControlBar
  showContent={false}
  controls={
    [{
      iconType: 'submodule',
      id: 'root_icon',
      controlType: 'icon',
      'aria-label': 'Project Root',
    },
    {
      controlType: 'breadcrumbs',
      id: 'current_file_path',
      responsive: true,
      breadcrumbs: [
        {
          text: 'src',
        },
        {
          text: 'components',
        },
      ],
    },
    {
      controlType: 'spacer',
    },
    {
      controlType: 'icon',
      id: 'status_icon',
      iconType: 'alert',
      color: 'warning',
      'aria-label': 'Repo Status',
    },
    {
      controlType: 'divider',
    },
    {
      controlType: 'button',
      id: 'open_history_view',
      label: 'Show history',
      color: 'primary',
      onClick: this.toggleContent,
    }]
  }
/>`;

const tabsBarSource = require('./tabs?raw');
const tabsBarHtml = renderToHtml(ControlBarWithTabs);
const tabsBarSnippet = '<OuiControlBar controls={items} size="m"/>';

const mobileBarSource = require('./mobile?raw');
const mobileBarHtml = renderToHtml(ControlBarMobile);
const mobileBarSnippet = `<OuiControlBar
  showOnMobile
  controls={[
    {
      controlType: 'icon',
      id: 'icon',
      iconType: 'folderClosed',
      'aria-label': 'folder',
      className: 'oui-hideFor--m oui-hideFor--l oui-hideFor--xl',
    },
    {
      controlType: 'breadcrumbs',
      id: 'current_file_path',
      className: 'oui-hideFor--s oui-hideFor--xs',
      responsive: true,
      breadcrumbs: [
        {
          text: 'src',
        },
        {
          text: 'components',
        },
      ],
    },
    {
      controlType: 'spacer',
    },
    {
      controlType: 'icon',
      id: 'github_icon',
      iconType: 'logoGithub',
    },
    {
      controlType: 'text',
      id: 'github_text',
      text: 'Open in Github',
    },
  ]}/>`;

export const ControlBarExample = {
  title: 'Control bar',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: controlBarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: controlBarHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>OuiControlBar</strong> is a bottom positioned container and
            content well intended to provide additional view controls and
            actions.
          </p>
          <p>
            The control bar provides an easy way to extend the navigation or
            views of the current page by allowing you to place tabs, buttons,
            text, or <OuiCode>children</OuiCode> within it. It can operate
            similarly to a flyout, but (at full height) it covers most of the
            current page; making it a fitting solution for verbose text or
            additional controls. It can also be used without allowing it to
            expand, which makes it an easy way to display status information or
            fixed-position buttons.
          </p>
        </div>
      ),
      props: { OuiControlBar },
      snippet: controlBarSnippet,
      demo: <ControlBar />,
    },
    {
      title: 'Using tabs',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: tabsBarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: tabsBarHtml,
        },
      ],
      text: (
        <div>
          <p>
            This example demonstrates the use of tabs and reduces the size of
            the content with <OuiCode language="js">size=&quot;m&quot;</OuiCode>
            .
          </p>
          <p>
            Optional children of the <strong>OuiControlBar</strong> are rendered
            in the control bar drawer. You can toggle the visibility of the
            content with the <OuiCode>showContent</OuiCode> prop. When you want
            to display tab content, this is where you&apos;ll do it.
          </p>
        </div>
      ),
      props: { OuiControlBar },
      snippet: tabsBarSnippet,
      demo: <ControlBarWithTabs />,
    },
    {
      title: 'Mobile usage',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: mobileBarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: mobileBarHtml,
        },
      ],
      text: (
        <div>
          <p>
            The <strong>OuiControlBar</strong> is responsive in the sense that
            it utilizes flexbox and overflow scrolls. However, it makes no
            attempts to reorganize the controls you provide. By default the{' '}
            <strong>OuiControlBar</strong> is hidden on mobile devices, but this
            can be overridden with the <OuiCode>showOnMobile</OuiCode> prop.
            You&apos;ll need to take the layout of your{' '}
            <OuiCode>controlTypes</OuiCode> into consideration when choosing to
            display on smaller screens.
          </p>
          <p>
            A simple way of doing this is to pass in OUI responsive utility
            classes into the <OuiCode>className</OuiCode> prop on any of the{' '}
            <OuiCode>controlTypes</OuiCode>. View the snippet tab to see an
            example.
          </p>
        </div>
      ),
      props: { OuiControlBar },
      snippet: mobileBarSnippet,
      demo: <ControlBarMobile />,
    },
    {
      title: 'Control types and position',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: controlsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: controlsHtml,
        },
      ],
      text: (
        <div>
          <p>
            The <strong>OuiControlBar</strong> accepts an array of{' '}
            <OuiCode>controlTypes</OuiCode> that will be arranged in the order
            in which they are provided. All controls <strong>must</strong> be
            provide a unique <OuiCode>id</OuiCode> to be used as the key.
          </p>
          <ul>
            <li>
              <OuiCode>button</OuiCode>: Extends{' '}
              <Link to="/navigation/button">
                <strong>OuiButton</strong>
              </Link>{' '}
              but always forces to size small. Requires <OuiCode>label</OuiCode>{' '}
              as the children.
            </li>
            <li>
              <OuiCode>icon</OuiCode>: Extends{' '}
              <Link to="/display/icons">
                <strong>OuiIcon</strong>
              </Link>{' '}
              unless provided an <OuiCode>onClick</OuiCode> or{' '}
              <OuiCode>href</OuiCode>, then it will render an{' '}
              <Link to="/navigation/button">
                <strong>OuiButtonIcon</strong>
              </Link>
              .
            </li>
            <li>
              <OuiCode>text</OuiCode>: Simple ghost colored text.
            </li>
            <li>
              <OuiCode>tab</OuiCode>: Renders a button visually as a tab. You
              must provide your own callback to swap the control bar contents
              with <OuiCode>onClick</OuiCode>.
            </li>
            <li>
              <OuiCode>breadcrumbs</OuiCode>: Extends{' '}
              <Link to="/navigation/breadcrumbs">
                <strong>OuiBreadcrumbs</strong>
              </Link>
              .
            </li>
            <li>
              <OuiCode>spacer</OuiCode>: Provides a horizontal space between
              controls. <strong>Id is optional.</strong>
            </li>
            <li>
              <OuiCode>divider</OuiCode>: Provides a <OuiCode>1px</OuiCode>{' '}
              border between controls. Useful when additional visual separation
              is needed. <strong>Id is optional.</strong>
            </li>
          </ul>
          <p>
            Typically, a control bar is fixed positioned against the browser
            window and therefore rendered within a portal. To change the parent
            element of the control bar, change the <OuiCode>position</OuiCode>{' '}
            prop to <OuiCode language="js">{'"absolute"'}</OuiCode> or{' '}
            <OuiCode language="js">{'"relative"'}</OuiCode>.
          </p>
          <p>
            To offest the left and right position of the control bar, for
            example, to adjust for side navigation, use the{' '}
            <OuiCode>leftOffset</OuiCode> or <OuiCode>rightOffset</OuiCode>{' '}
            props.
          </p>
        </div>
      ),
      props: {
        OuiControlBar,
        BreadcrumbControlProps,
        ButtonControlProps,
        DividerControlProps,
        IconControlTypeProps,
        IconButtonControlTypeProps,
        SpacerControlProps,
        TabControlProps,
        TextControlProps,
      },
      demo: <Controls />,
    },
  ],
};
