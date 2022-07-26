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

/* eslint-disable no-restricted-globals */
import React from 'react';

import { OuiButtonEmpty } from '../../../../src/components/button';
import { useIsWithinBreakpoints } from '../../../../src/services/hooks/useIsWithinBreakpoints';

import { ThemeContext } from '../with_theme';
import { OuiHeaderSectionItemButton } from '../../../../src/components/header';
import { OuiToolTip } from '../../../../src/components/tool_tip';
import { OuiIcon } from '../../../../src/components/icon';

type GuideSketchLinkProps = {
  context?: any;
};

export const GuideSketchLink: React.FunctionComponent<GuideSketchLinkProps> = () => {
  return (
    <ThemeContext.Consumer>
      {(context) => <GuideSketchLinkComponent context={context} />}
    </ThemeContext.Consumer>
  );
};

// @ts-ignore Context has no type
const GuideSketchLinkComponent: React.FunctionComponent<GuideSketchLinkProps> = ({
  context,
}) => {
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);

  // ToDo: Fix link or redo this interface
  const href =
    'https://github.com/elastic/eui/releases/download/v8.0.0/eui_sketch_8.0.0.zip';
  const label = 'OUI Sketch Library (download)';

  const isCascadia = context.theme.includes('cascadia');

  if (isCascadia) return <></>;

  return isMobileSize ? (
    <OuiButtonEmpty size="s" flush="both" iconType="logoSketch" href={href}>
      {label}
    </OuiButtonEmpty>
  ) : (
    <OuiToolTip
      title="(Outdated) Download Sketch zip"
      content="Import these sketch files into a new project as libraries.
        This will provide symbols that match against their OUI component
        counterparts.">
      <OuiHeaderSectionItemButton
        aria-label={label}
        // @ts-ignore TODO: FIX
        href={href}>
        <OuiIcon type="logoSketch" aria-hidden="true" />
      </OuiHeaderSectionItemButton>
    </OuiToolTip>
  );
};
