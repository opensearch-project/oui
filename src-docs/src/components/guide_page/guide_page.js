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

import PropTypes from 'prop-types';
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import {
  OuiBetaBadge,
  OuiPageHeader,
  OuiPageContent,
  OuiPageContentBody,
} from '../../../../src/components';

const GuidePageComponent = ({
  children,
  title,
  intro,
  isBeta,
  isExperimental,
  playground,
  guidelines,
  location,
  match,
  history,
}) => {
  const betaBadge = isBeta ? (
    <OuiBetaBadge
      label="Beta"
      tooltipContent="This component is still under development and may contain breaking changes in the nearby future."
    />
  ) : undefined;
  const experimentalBadge = isExperimental ? (
    <OuiBetaBadge
      label="Experimental"
      tooltipContent="This module is not GA. Please help us by reporting any bugs."
    />
  ) : undefined;

  const tabs = [
    {
      id: 'examples',
      name: 'Examples',
      handleClick: () => {
        history.push(`${match.path}`);
      },
    },
  ];

  if (guidelines)
    tabs.push({
      id: 'guidelines',
      name: 'Guidelines',
      handleClick: () => {
        history.push(`${match.path}/guidelines`);
      },
    });
  if (playground)
    tabs.push({
      id: 'playground',
      name: 'Playground',
      handleClick: () => {
        history.push(`${match.path}/playground`);
      },
    });

  const isGuideLineView = location.pathname.includes('guidelines');
  const isPlaygroundView = location.pathname.includes('playground');

  const renderTabs = () => {
    if (tabs.length < 2) {
      return undefined;
    }

    return tabs.map(({ id, handleClick, name }, index) => {
      let isSelected = false;
      if (id === 'playground') isSelected = isPlaygroundView;
      else if (id === 'guidelines') isSelected = isGuideLineView;
      else isSelected = !isGuideLineView && !isPlaygroundView;

      return {
        onClick: () => {
          if (handleClick) handleClick();
        },
        isSelected,
        key: index,
        label: name,
      };
    });
  };

  return (
    <>
      <OuiPageHeader
        restrictWidth
        pageTitle={
          <>
            {title} {betaBadge || experimentalBadge}
          </>
        }
        tabs={renderTabs()}>
        {intro}
      </OuiPageHeader>

      <OuiPageContent
        role="main"
        hasShadow={false}
        paddingSize="none"
        color="transparent"
        hasBorder={false}
        borderRadius="none">
        <OuiPageContentBody restrictWidth>
          <Switch>
            {playground && (
              <Route path={`${match.path}/playground`}>{playground}</Route>
            )}
            {guidelines && (
              <Route path={`${match.path}/guidelines`}>{guidelines}</Route>
            )}
            <Route path="">{children}</Route>
          </Switch>
        </OuiPageContentBody>
      </OuiPageContent>
    </>
  );
};

GuidePageComponent.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  intro: PropTypes.node,
  componentLinkTo: PropTypes.string,
  isBeta: PropTypes.bool,
  isExperimental: PropTypes.bool,
  playground: PropTypes.node,
  guidelines: PropTypes.node,
  location: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
};

export const GuidePage = withRouter(GuidePageComponent);
