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

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  OuiCallOut,
  OuiCode,
  OuiToolTip,
  OuiIconTip,
  OuiSpacer,
  OuiTitle,
} from '../../../../src/components';
import toolTipConfig from './playground';

import ToolTip from './tool_tip';
const toolTipSource = require('./tool_tip?raw');
const toolTipHtml = renderToHtml(ToolTip);
const tooltipSnippet = [
  `<OuiToolTip position="top" content="Tooltip text">
  <!-- An inline element to trigger the tooltip -->
</OuiToolTip>
`,
  `<OuiToolTip title="Tooltip title" content="Tooltip text">
  <!-- An inline element to trigger the tooltip -->
</OuiToolTip>
`,
  `<OuiToolTip content="A tooltip with a long delay" delay="long">
  <!-- An inline element to trigger the tooltip -->
</OuiToolTip>
`,
];

import IconTip from './icon_tip';
const infoTipSource = require('./icon_tip?raw');
const infoTipHtml = renderToHtml(IconTip);
const infoTipSnippet = `<OuiIconTip
  content="Tooltip text for the icon"
  position="top"
  type="iInCircle"
/>
`;

export const ToolTipExample = {
  title: 'Tooltip',
  intro: (
    <OuiCallOut title="OuiToolTip only applies to inline elements">
      <p>
        OuiToolTip wraps its children in a span element, so if you pass in a
        block-level child (e.g. a div) the resulting DOM will be in violation of
        the HTML5 spec.
      </p>
    </OuiCallOut>
  ),
  sections: [
    {
      text: (
        <>
          <p>
            Wrap <strong>OuiToolTip</strong> around any item that you need a
            tooltip for. The <OuiCode>position</OuiCode> prop will take a
            suggested position, but will change it if the tooltip gets too close
            to the edge of the screen.
          </p>

          <OuiTitle size="m">
            <h2>Applying tooltips to custom components</h2>
          </OuiTitle>

          <p>
            Internally, <strong>OuiToolTip</strong> applies{' '}
            <OuiCode>onFocus</OuiCode>, <OuiCode>onBlur</OuiCode>,{' '}
            <OuiCode>onMouseOver</OuiCode>, and <OuiCode>onMouseOut</OuiCode>{' '}
            props to whatever you pass as <OuiCode>children</OuiCode>. If you
            pass in a custom component, then you&rsquo;ll need to make sure
            these props are applied to the root element rendered by your
            component. The best way to do that is to follow{' '}
            <a href="https://github.com/opensearch-project/oui/blob/main/wiki/component-design.md#pass-through-props">
              OUI&rsquo;s guidelines on pass-through props
            </a>
            .
          </p>

          <OuiCallOut
            iconType="accessibility"
            color="warning"
            title={
              <>
                Anchoring a tooltip to a non-interactive element makes it
                difficult for keyboard-only and screen reader users to read.
              </>
            }
          />

          <OuiSpacer size="l" />

          <OuiCallOut
            iconType="accessibility"
            color="warning"
            title={
              <>
                Putting anything other than plain text in a tooltip is lost on
                screen readers. Consider switching to{' '}
                <Link to="/layout/popover">
                  <strong>OuiPopover</strong>
                </Link>{' '}
                if you need more content inside a tooltip.
              </>
            }
          />
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: toolTipSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: toolTipHtml,
        },
      ],

      props: { OuiToolTip },
      snippet: tooltipSnippet,
      demo: <ToolTip />,
    },
    {
      title: 'IconTip',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: infoTipSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: infoTipHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            You can use <strong>OuiIconTip</strong> to explain options, other
            controls, or entire parts of the user interface. When possible,
            surface explanations inline within the UI, and only hide them behind
            a <strong>OuiIconTip</strong> as a last resort.
          </p>
          <p>
            It accepts all the same props as <strong>OuiToolTip</strong>. For
            convenience, you can also specify optional icon{' '}
            <OuiCode>size</OuiCode>, <OuiCode>type</OuiCode>, and
            <OuiCode>color</OuiCode> props.
          </p>
        </Fragment>
      ),
      props: { OuiToolTip, OuiIconTip },
      snippet: infoTipSnippet,
      demo: <IconTip />,
    },
  ],
  playground: toolTipConfig,
};
