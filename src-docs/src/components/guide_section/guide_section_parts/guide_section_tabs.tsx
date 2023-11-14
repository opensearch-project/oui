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

import React, { FunctionComponent, useState, ReactNode } from 'react';
import classNames from 'classnames';
import {
  OuiTabs,
  OuiTab,
  OuiTabProps,
} from '../../../../../src/components/tabs';
import { OuiErrorBoundary } from '../../../../../src/components/error_boundary';
import { OuiHorizontalRule } from '../../../../../src/components/horizontal_rule';
import { GuideSectionSnippets } from './guide_section_snippets';
import { GuideSectionPropsTable } from './guide_section_props_table';
import { OuiFlexGroup, OuiFlexItem } from '../../../../../src/components/flex';
import { ExclusiveUnion } from '../../../../../src/components/common';

export type GuideSectionExampleTabSnippetType = GuideSectionSnippets;
export type GuideSectionExampleTabPropsTableType = {
  props: any;
};

export type GuideSectionExampleTabType = OuiTabProps &
  ExclusiveUnion<
    GuideSectionExampleTabSnippetType,
    GuideSectionExampleTabPropsTableType
  > & {
    displayName: string;
    name: string;
  };

export type GuideSectionExampleTabsProps = {
  tabs: GuideSectionExampleTabType[];
  /** Renders any content to the right of the tabs (playground toggle) */
  rightSideControl?: ReactNode;
};

export const GuideSectionExampleTabs: FunctionComponent<GuideSectionExampleTabsProps> = ({
  tabs,
  rightSideControl,
}) => {
  const [selectedTabId, setSelectedTabId] = useState('');

  const onSelectedTabChanged = (id: string) => {
    if (id === selectedTabId) {
      setSelectedTabId('');
    } else {
      setSelectedTabId(id);
    }
  };

  const tabClasses = classNames('guideSectionTabs', {
    'guideSectionTabs--open': selectedTabId,
  });

  const renderTabs = () => {
    return (
      <OuiTabs size="s" display="condensed">
        {tabs.map((tab, index) => {
          const { displayName, name, props, snippets, ...rest } = tab;

          return (
            <OuiTab
              {...rest}
              className="guideSectionTabs__tab"
              name={name}
              onClick={() => onSelectedTabChanged(name)}
              isSelected={name === selectedTabId}
              key={index}>
              {tab.displayName}
            </OuiTab>
          );
        })}
      </OuiTabs>
    );
  };

  const renderContent = () => {
    if (!selectedTabId) return null;

    const selectedTab = tabs.find((tab) => tab.name === selectedTabId);

    // SNIPPET
    if (selectedTab && selectedTab.snippets) {
      return (
        <OuiErrorBoundary>
          <OuiHorizontalRule margin="none" />
          <GuideSectionSnippets snippets={selectedTab.snippets} />
        </OuiErrorBoundary>
      );
      // PROPS TABLE
    } else if (selectedTab && selectedTab.props) {
      const components = Object.keys(selectedTab.props);

      return components.map((component) => (
        <OuiErrorBoundary key={component}>
          <GuideSectionPropsTable
            key={component}
            componentName={component}
            component={selectedTab.props[component]}
          />
        </OuiErrorBoundary>
      ));
    }
  };

  return (
    <>
      <OuiFlexGroup
        className={tabClasses}
        responsive={false}
        wrap
        gutterSize="none"
        alignItems="center">
        <OuiFlexItem>{renderTabs()}</OuiFlexItem>
        <OuiFlexItem grow={false}>{rightSideControl}</OuiFlexItem>
      </OuiFlexGroup>
      {selectedTabId && renderContent()}
    </>
  );
};
