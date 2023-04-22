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
import { GuideSectionTypes } from '../../components';

import {
  OuiCode,
  OuiIcon,
  OuiToken,
  OuiLink,
  OuiText,
  OuiCallOut,
  OuiSpacer,
} from '../../../../src/components';

import iconConfig from './playground';

import Icons from './icons';

import Tokens from './tokens';

import CustomTokens from './custom_tokens';

import Apps from './apps';

import Editor from './editor';

import Ml from './ml';

import Logos from './logos';

import IconSizes from './icon_sizes';

import IconColors from './icon_colors';
import AppIconColors from './icon_colors_apps';

import IconTypes from './icon_types';
const iconTypesSource = require('./icon_types?raw');

export const IconExample = {
  title: 'Icons',
  sections: [
    {
      text: (
        <p>
          <strong>OuiIcon</strong> is a handy component for using our custom
          glyphs and logos. The <OuiCode>type</OuiCode> prop accepts either an
          enumerated name from one of the sets below, a location to a custom SVG
          asset, or a React Element.
        </p>
      ),
      demo: <OuiIcon type="grid" />,
      props: { OuiIcon },
      playground: iconConfig,
    },
    {
      text: (
        <OuiCallOut
          iconType="accessibility"
          title={
            <>
              For better accessibility it&apos;s always recommended to give a
              descriptive <OuiCode>title</OuiCode> based on the icon use.
            </>
          }
          color="warning">
          <p>
            If no title is provided the icon is going to be purely decorative
            and it will get by default an{' '}
            <OuiCode language="js">aria-hidden=true</OuiCode>.
          </p>
        </OuiCallOut>
      ),
    },
    {
      title: 'Glyphs',
      text: (
        <>
          <p>
            Glyphs are small, monochromatic icons that typically should always
            use the default size of{' '}
            <OuiCode language="js">size=&quot;m&quot;</OuiCode>.
          </p>
        </>
      ),
      demo: <Icons />,
    },
    {
      title: 'Editor controls',
      text: (
        <p>
          Editor icons relate to the visual styling of elements and are commonly
          used within <strong>OuiButtonGroup</strong> components.
        </p>
      ),
      demo: <Editor />,
    },
    {
      title: 'OpenSearch logos',
      text: (
        <p>
          Product logos follow similar rules as app logos. Note the use of{' '}
          <OuiCode>.ouiIcon__fillNegative</OuiCode> on portions of the SVGs to
          handle flipping colors for dark mode.
        </p>
      ),
      demo: <Logos />,
    },
    {
      title: 'Apps',
      text: (
        <p>
          App logos are usually displayed at <OuiCode>32x32</OuiCode> or above
          and can contain multiple colors.
        </p>
      ),
      demo: <Apps />,
    },
    {
      text: (
        <>
          <h3>Machine learning icons</h3>
          <p>
            Machine learning has some specific icons for job creation. Again,
            these are made for <OuiCode>32x32</OuiCode>.
          </p>
        </>
      ),
      demo: <Ml />,
    },
    {
      title: 'Tokens',
      text: (
        <>
          <p>
            Tokens are most commonly used to visually signify field or code
            types. An <strong>OuiToken</strong> accepts any valid{' '}
            <strong>OuiIcon</strong> as its <OuiCode>iconType</OuiCode>{' '}
            property. However, icons designed specifically for use in the{' '}
            <strong>OuiToken</strong> are prefixed with &quot;token&quot; in
            their name and have pre-defined styles.
          </p>
        </>
      ),
      props: { OuiToken },
      demo: <Tokens />,
    },
    {
      wrapText: false,
      text: (
        <>
          <OuiText>
            <h3>Custom tokens</h3>
            <p>
              By default, an <OuiCode>iconType</OuiCode> with the token prefix
              (i.e. those listed above) will have predefined styles. However,
              any valid <OuiCode>iconType</OuiCode> can be passed and, in either
              case, the <OuiCode>shape</OuiCode>, <OuiCode>size</OuiCode>,{' '}
              <OuiCode>color</OuiCode>, and <OuiCode>fill</OuiCode> can be
              customized.
            </p>
          </OuiText>
          <OuiSpacer />
          <CustomTokens />
        </>
      ),
    },
    {
      title: 'Sizes',
      text: (
        <p>
          Use the <OuiCode>size</OuiCode> prop to automatically size your icons.
          Medium is the default, and will output a <OuiCode>16x16</OuiCode>{' '}
          icon.
        </p>
      ),
      demo: <IconSizes />,
    },
    {
      title: 'Colors',
      text: (
        <p>
          The default behavior of icons is to inherit from the text color. You
          can use the <OuiCode>color</OuiCode> prop to assign a custom color
          which accepts a named color from our palette or a valid&nbsp;
          <OuiLink
            target="_blank"
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value">
            CSS color data type
          </OuiLink>
          &nbsp;which will be passed down through the inline-style{' '}
          <OuiCode>fill</OuiCode>&nbsp; property.{' '}
          <strong>We recommend relying on the OUI named color palette</strong>{' '}
          unless the custom color is initiated by the user (like as a graph
          color).
        </p>
      ),
      demo: <IconColors />,
    },
    {
      wrapText: false,
      text: (
        <>
          <OuiText>
            <p>
              Two-tone icons, like our app style icons, will behave similarly to
              normal glyphs when provided a specific color by applying the color
              to <strong>all</strong> the shapes within. You can force the icon
              to match the parent's text color by passing{' '}
              <OuiCode>color="inherit"</OuiCode> to the icon.
            </p>
          </OuiText>
        </>
      ),
      demo: <AppIconColors />,
    },
    {
      title: 'Custom SVGs',
      text: (
        <>
          <p>
            The <OuiCode>type</OuiCode> prop can accept a valid enum, string or
            React SVG Element. When using a custom SVG, please make sure it sits
            on a square canvas and preferably utilizes one of OUI&apos;s sizes (
            <OuiCode>16x16</OuiCode> or <OuiCode>32x32</OuiCode>).
          </p>
          <p>
            When using custom SVGs for simple glyphs,{' '}
            <strong>remove all fill attributes</strong> on the SVG and utilize
            the CSS helpers if you have complex logos that need to work with
            theming.
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: iconTypesSource,
        },
      ],
      props: { OuiIcon },
      demo: <IconTypes />,
    },
  ],
};
