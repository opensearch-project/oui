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

/* eslint-disable @typescript-eslint/no-var-requires */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { renderToHtml } from '../../services';
import { GuideSectionTypes } from '../../components';

import { ExternalBadge } from './shared';

import { Theming } from './theming';
const themingSource = require('!!raw-loader!./theming');
const themingHtml = renderToHtml(Theming);

import { Categorical } from './theming_categorical';

import {
  OuiSpacer,
  OuiText,
  OuiCodeBlock,
  OuiLink,
  OuiCallOut,
} from '../../../../src/components';

export const ElasticChartsThemingExample = {
  title: 'Creating charts',
  intro: (
    <Fragment>
      <ExternalBadge />
      <OuiSpacer size="l" />
      <OuiText>
        <p>
          OUI provides utilities and documentation for working with{' '}
          <OuiLink
            href="https://elastic.github.io/elastic-charts"
            target="_blank">
            Elastic Charts
          </OuiLink>
          , an open source charting library also created and maintained by
          Elastic.
        </p>
      </OuiText>
    </Fragment>
  ),
  sections: [
    {
      title: 'Theming via OUI',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: themingHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            OUI provides both light and dark theme files to use in tandem with
            Elastic Charts. Simply import these objects from the themes folder
            and pass the correct one to the Settings.theme property.
          </p>
          <OuiCodeBlock language="javascript" isCopyable fontSize="s">
            {`import { OUI_CHARTS_THEME_DARK, OUI_CHARTS_THEME_LIGHT } from '@opensearch-project/oui/dist/oui_charts_theme';

const ouiTheme = isDarkTheme ? OUI_CHARTS_THEME_DARK.theme : OUI_CHARTS_THEME_LIGHT.theme;

<Settings theme={ouiTheme} />`}
          </OuiCodeBlock>
          <OuiCallOut title="Kibana engineers" iconType="logoKibana">
            <p>
              OUI provides a plugin utility for ease of pulling in the correct
              theme object depending on the current Kibana theme. Learn more
              from this{' '}
              <OuiLink
                href="https://github.com/elastic/kibana/tree/master/src/plugins/charts"
                target="_blank">
                readme
              </OuiLink>
              .
            </p>
          </OuiCallOut>
          <OuiSpacer />
          <p>
            OUI also provides some basic{' '}
            <Link to="/utilities/color-palettes">
              color palettes and functions
            </Link>{' '}
            if you would like to change the default color blind safe scheme to
            another palette. You can import these from the services folder.
            Create a new partial theme object with your chosen colors and
            prepend it to the list of themes supplied to Settings.
          </p>

          <OuiCodeBlock language="javascript" isCopyable fontSize="s">
            {`import { ouiPalettePositive } from '../../../../src/services';

const customColors = {
  colors: {
    vizColors: ouiPalettePositive(5),
  },
};

<Settings theme={[customColors, ouiTheme]} />`}
          </OuiCodeBlock>
          <p>You&apos;ll find an example of these in the demo below.</p>
        </Fragment>
      ),
      demo: <Theming />,
    },
    {
      title: 'Coloring charts',
      text: (
        <Fragment>
          <p>
            <strong>
              Use color to distinguish categories, represent quantity/density,
              and highlight data. When using color in this way, be aware that
              too many colors in a single chart can create noise and hinder
              quick comprehension.
            </strong>
          </p>
          <p>
            When creating a multi-series chart where each series shows{' '}
            <strong>contrasting</strong> data, use the color blind safe palette
            of contrasting colors. This will also avoid implying levels of
            magnitude.
          </p>
          <p>
            Think about the data you are delivering and if there is a way to{' '}
            <strong>highlight</strong> key indicators. If you can combine the
            series into logical groups, use contrasting shapes and styles, but
            keep the same color for within groups.
          </p>
          <h3>Quantity vs trends</h3>
          <p>
            When coloring for sequential series data (not categorical), rely on
            conventions. If the data signifies <strong>quantities</strong>, use
            a single color that spans from light colors for low amounts to dark
            colors for high amounts. If the data signifies{' '}
            <strong>trends</strong>, use a two-color divergent scheme, with the
            darkest colors at the extremes. Remember that red means bad/negative
            and green is good/positive.
          </p>
          <p>
            Whan signifying quantities, group values into intervals instead of a
            continuous gradient scale.
          </p>
        </Fragment>
      ),
      demo: <Categorical />,
    },
  ],
};
