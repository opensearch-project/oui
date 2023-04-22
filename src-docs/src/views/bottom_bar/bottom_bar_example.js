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

import { GuideSectionTypes } from '../../components';

import { OuiBottomBar, OuiCode } from '../../../../src/components';

import { bottomBarConfig } from './playground';

import BottomBar from './bottom_bar';
const bottomBarSource = require('./bottom_bar?raw');

import BottomBarDisplacement from './bottom_bar_displacement';
const bottomBarDisplacementSource = require('./bottom_bar_displacement?raw');

import BottomBarPosition from './bottom_bar_position';
import { OuiCallOut } from '../../../../src/components/call_out';
const bottomBarPositionSource = require('./bottom_bar_position?raw');

export const BottomBarExample = {
  title: 'Bottom bar',
  intro: (
    <OuiCallOut>
      <p>
        <strong>OuiPageTemplate</strong> offers a quick way to{' '}
        <Link to="/layout/page#showing-a-bottom-bar">
          apply a bottom bar to your page layouts
        </Link>
        .
      </p>
    </OuiCallOut>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: bottomBarSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>OuiBottomBar</strong> is a simple wrapper component that
            does nothing but affix a dark bar (usually filled with buttons) to
            the bottom of the page. Use it when you have really long pages or
            complicated, multi-page forms. In the case of forms, only invoke it
            if a form is in a savable state.
          </p>
          <p>
            Like many of our other wrapper components,{' '}
            <strong>OuiBottomBar</strong> accepts a{' '}
            <OuiCode>paddingSize</OuiCode> prop, which can be set to{' '}
            <OuiCode>s | m (default) | l | none</OuiCode>.
          </p>
        </>
      ),
      props: { OuiBottomBar },
      demo: <BottomBar />,
      playground: bottomBarConfig,
      snippet: `<OuiBottomBar paddingSize="s">
  <!-- Content goes here -->
</OuiBottomBar>`,
    },
    {
      title: 'Positions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: bottomBarPositionSource,
        },
      ],
      text: (
        <>
          <p>
            Bottom bars default to a fixed position, in a portal at the bottom
            of the browser window. Alternatively, you can change the{' '}
            <OuiCode>position</OuiCode> to <OuiCode>sticky</OuiCode> where it
            will render in place but stick to the window only as the window edge
            nears. The <OuiCode>static</OuiCode> position reverts back to
            default DOM behavior.
          </p>
          <p>
            You can also apply a different set of positioning locations just by
            adjusting them in with the{' '}
            <OuiCode>top | right | bottom | left</OuiCode> props.
          </p>
        </>
      ),
      props: { OuiBottomBar },
      demo: <BottomBarPosition />,
      snippet: `<OuiBottomBar position="sticky" bottom={10}>
  <!-- Content goes here -->
</OuiBottomBar>`,
    },
    {
      title: 'Displacement',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: bottomBarDisplacementSource,
        },
      ],
      text: (
        <>
          <p>
            There is an <OuiCode>affordForDisplacement</OuiCode> prop
            (defaulting to <OuiCode>true</OuiCode>), which determines whether
            the component makes room for itself by adding bottom padding
            equivalent to its own height on the document{' '}
            <OuiCode language="html">{'<body>'}</OuiCode> element. Setting this
            to <OuiCode>false</OuiCode> can be useful to minimize scrollbar
            visibility but will cause the bottom bar to overlap body content.
          </p>
        </>
      ),
      props: { OuiBottomBar },
      demo: <BottomBarDisplacement />,
      snippet: `<OuiBottomBar affordForDisplacement={false}>
  <!-- Content goes here -->
</OuiBottomBar>`,
    },
  ],
};
