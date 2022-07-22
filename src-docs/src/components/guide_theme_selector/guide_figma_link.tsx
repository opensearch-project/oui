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
import logoFigma from '../../images/logo-figma.svg';

type GuideFigmaLinkProps = {
  context?: any;
};

export const GuideFigmaLink: React.FunctionComponent<GuideFigmaLinkProps> = () => {
  return (
    <ThemeContext.Consumer>
      {(context) => <GuideFigmaLinkComponent context={context} />}
    </ThemeContext.Consumer>
  );
};

// @ts-ignore Context has no type
const GuideFigmaLinkComponent: React.FunctionComponent<GuideFigmaLinkProps> = ({
  context,
}) => {
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);

  const isCascadia = context.theme.includes('cascadia');

  // ToDo: Fix the Figma links
  let href = 'https://www.figma.com/community/file/809845546262698150';
  const label = 'OUI Figma Design Library';

  if (isCascadia) {
    href = 'https://www.figma.com/community/file/964536385682658129';
  }

  return isMobileSize ? (
    <OuiButtonEmpty size="s" flush="both" iconType={logoFigma} href={href}>
      {label}
    </OuiButtonEmpty>
  ) : (
    <OuiToolTip
      title={label}
      content="The Figma OpenSearch UI framework (OUI) is a design library in use at OpenSearch Project to build internal products that need to share our aesthetics.">
      <OuiHeaderSectionItemButton
        notificationColor="subdued"
        aria-label={label}
        // @ts-ignore TODO: FIX
        href={href}>
        <OuiIcon type={logoFigma} aria-hidden="true" />
      </OuiHeaderSectionItemButton>
    </OuiToolTip>
  );
};
