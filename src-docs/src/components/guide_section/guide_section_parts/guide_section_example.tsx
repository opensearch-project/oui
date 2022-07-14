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

import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { OuiSplitPanel } from '../../../../../src/components/panel';
import { _OuiSplitPanelInnerProps } from '../../../../../src/components/panel/split_panel/';

export interface GuideSectionExample {
  example: ReactNode;
  tabs?: ReactNode;
  /** Forces display of a certain content (playground props table) */
  tabContent?: ReactNode;
  ghostBackground?: boolean;
  demoPanelProps?: _OuiSplitPanelInnerProps;
}

export const GuideSectionExample: FunctionComponent<GuideSectionExample> = ({
  example,
  tabs,
  ghostBackground = false,
  tabContent,
  demoPanelProps,
}) => {
  const classes = classNames(demoPanelProps?.className, {
    guideDemo__ghostBackground: ghostBackground,
  });

  return (
    <OuiSplitPanel.Outer hasBorder hasShadow={false}>
      <OuiSplitPanel.Inner
        color="plain"
        {...demoPanelProps}
        className={classes}>
        {example}
      </OuiSplitPanel.Inner>
      {(tabs || tabContent) && (
        <OuiSplitPanel.Inner paddingSize="none" color="subdued">
          {tabs}
          {tabContent}
        </OuiSplitPanel.Inner>
      )}
    </OuiSplitPanel.Outer>
  );
};
