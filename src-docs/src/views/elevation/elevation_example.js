/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { OuiCode, OuiText } from '../../../../src/components';

import ElevationShadows from './elevation_shadows';
const elevationShadowsSource = require('!!raw-loader!./elevation_shadows');
const elevationShadowsHtml = renderToHtml(ElevationShadows);

import ElevationDarkTheme from './elevation_dark_theme';
const elevationDarkThemeSource = require('!!raw-loader!./elevation_dark_theme');
const elevationDarkThemeHtml = renderToHtml(ElevationDarkTheme);

import ElevationUseElevation from './elevation_use_elevation';
const elevationUseElevationSource = require('!!raw-loader!./elevation_use_elevation');
const elevationUseElevationHtml = renderToHtml(ElevationUseElevation);

import ElevationLocal from './elevation_local';
const elevationLocalSource = require('!!raw-loader!./elevation_local');
const elevationLocalHtml = renderToHtml(ElevationLocal);

export const ElevationExample = {
  title: 'Elevation',
  intro: (
    <OuiText grow={false}>
      <p>
        The v9 elevation system provides a structured, token-based approach to
        shadows and stacking. It includes six shadow levels for consistent
        depth, theme-aware opacity for light and dark modes, CSS custom
        properties for elevated surfaces, and a <OuiCode>useElevation</OuiCode>{' '}
        hook for dynamic overlay z-index management.
      </p>
    </OuiText>
  ),
  sections: [
    {
      title: 'Shadow levels',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: elevationShadowsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: elevationShadowsHtml,
        },
      ],
      text: (
        <p>
          Six shadow levels provide consistent elevation across components. Each
          level includes a base layer of{' '}
          <OuiCode>0 0 1px rgba(0, 0, 0, 0.1)</OuiCode> plus a level-specific
          shadow with increasing offset and blur. Use the{' '}
          <OuiCode>ouiElevation($level)</OuiCode> SASS mixin to apply a shadow
          level (1–6).
        </p>
      ),
      demo: <ElevationShadows />,
    },
    {
      title: 'Elevated surfaces (dark theme)',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: elevationDarkThemeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: elevationDarkThemeHtml,
        },
      ],
      text: (
        <p>
          In dark theme, elevated surfaces need additional contrast against the
          page background. The CSS custom properties{' '}
          <OuiCode>--oui-background-elevated</OuiCode> and{' '}
          <OuiCode>--oui-border-elevated</OuiCode> provide a lighter background
          and visible border for elevated components. In light theme, both
          values are <OuiCode>transparent</OuiCode> and produce no visual
          effect. Use the <OuiCode>ouiElevatedSurface</OuiCode> SASS mixin to
          apply these tokens.
        </p>
      ),
      demo: <ElevationDarkTheme />,
    },
    {
      title: 'useElevation hook',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: elevationUseElevationSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: elevationUseElevationHtml,
        },
      ],
      text: (
        <p>
          The <OuiCode>useElevation</OuiCode> hook automatically assigns
          incrementing z-index values to overlay components based on their mount
          order. Wrap your application (or a subtree) in an{' '}
          <OuiCode>OuiElevationProvider</OuiCode> and call{' '}
          <OuiCode>useElevation()</OuiCode> in each overlay. Z-index values
          start at 90 and increment by 10. Pass{' '}
          <OuiCode>{'{ isEnabled: false }'}</OuiCode> to opt out of z-index
          assignment.
        </p>
      ),
      demo: <ElevationUseElevation />,
    },
    {
      title: 'Local elevation',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: elevationLocalSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: elevationLocalHtml,
        },
      ],
      text: (
        <p>
          For within-component stacking, use the{' '}
          <OuiCode>ouiLocalElevation</OuiCode> mixin to apply{' '}
          <OuiCode>isolation: isolate</OuiCode>, creating a contained stacking
          context. Local z-index variables <OuiCode>$ouiLocalZIndex1</OuiCode>{' '}
          (1), <OuiCode>$ouiLocalZIndex2</OuiCode> (2), and{' '}
          <OuiCode>$ouiLocalZIndex3</OuiCode> (3) keep values below 90 to avoid
          conflicts with the dynamic overlay system.
        </p>
      ),
      demo: <ElevationLocal />,
    },
  ],
};
