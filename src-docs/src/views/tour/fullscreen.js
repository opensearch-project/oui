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

import React, { Fragment, useState } from 'react';

import {
  OuiButton,
  OuiButtonEmpty,
  OuiColorPicker,
  OuiColorPickerSwatch,
  OuiPageTemplate,
  OuiSpacer,
  OuiStat,
  OuiTextArea,
  OuiTourStep,
  useOuiTour,
} from '../../../../src/components';
import { ExampleContext } from '../../services';

const demoTourSteps = [
  {
    step: 1,
    title: 'Step 1',
  },
  {
    step: 2,
    title: 'Step 2',
    anchorPosition: 'upCenter',
    content: <p>What is your favorite color?</p>,
  },
  {
    step: 3,
    title: 'Step 3',
    content: <p>Click here for more cool things.</p>,
    anchorPosition: 'downRight',
    minWidth: 'auto',
  },
  {
    step: 4,
    title: 'Step 4',
    anchorPosition: 'downLeft',
    decoration: 'none',
  },
];

const tourConfig = {
  currentTourStep: 1,
  isTourActive: true,
  tourPopoverWidth: true,
  tourSubtitle: 'Demo tour',
};

export default () => {
  const [color, setColor] = useState('#000');
  const [selectedTabId, setSelectedTabId] = useState('query');
  const [
    [ouiTourStepOne, ouiTourStepTwo, ouiTourStepThree, ouiTourStepFour],
    actions,
    reducerState,
  ] = useOuiTour(demoTourSteps, tourConfig);

  const onSelectColor = (color) => {
    setColor(color);
    if (reducerState.currentTourStep === 2) {
      actions.goToStep(3);
    }
  };

  const onTabClick = (id) => {
    if (id === 'stat' && reducerState.currentTourStep === 3) {
      actions.goToStep(4);
    }
    setSelectedTabId(id);
  };

  const onReset = () => {
    actions.resetTour();
    setSelectedTabId('query');
  };

  const tabs = [
    {
      id: 'query',
      name: 'Query',
      disabled: false,
      content: (
        <div>
          <OuiSpacer />
          <OuiTourStep
            {...ouiTourStepOne}
            content={
              <div>
                <p>This is a neat thing. You enter queries here.</p>
                <OuiSpacer />
                <OuiButton color="primary" onClick={actions.incrementStep}>
                  Ok, got it.
                </OuiButton>
              </div>
            }>
            <OuiTextArea
              placeholder="Placeholder text"
              aria-label="Enter ES SQL query"
              defaultValue="{queryValue}"
              style={{ width: 400 }}
            />
          </OuiTourStep>

          <OuiSpacer />

          <OuiTourStep
            {...ouiTourStepTwo}
            footerAction={
              <OuiButtonEmpty
                color="text"
                flush="right"
                size="xs"
                onClick={actions.incrementStep}>
                {"I don't have a favorite color"}
              </OuiButtonEmpty>
            }>
            <OuiColorPicker
              onChange={onSelectColor}
              color={color}
              mode="swatch"
              button={
                <OuiColorPickerSwatch
                  color={color}
                  aria-label="Select a color"
                />
              }
            />
          </OuiTourStep>
        </div>
      ),
    },
    {
      id: 'stat',
      name: (
        <OuiTourStep {...ouiTourStepThree}>
          <span>Stats</span>
        </OuiTourStep>
      ),
      disabled: false,
      content: (
        <div>
          <OuiSpacer />
          <OuiTourStep
            {...ouiTourStepFour}
            content={
              <div>
                <p>That about does it.</p>
                <OuiSpacer />
                <OuiButton color="primary" onClick={onReset}>
                  Take me to the start.
                </OuiButton>
              </div>
            }>
            <div>
              <OuiStat title="22,123" description="Queries" />
            </div>
          </OuiTourStep>
        </div>
      ),
    },
  ];

  return (
    <OuiPageTemplate
      pageHeader={{
        pageTitle: 'My app',
        rightSideItems: [
          <ExampleContext.Consumer>
            {({ parentPath }) => (
              <OuiButton fill href={`#${parentPath}`} iconType="exit">
                Exit full screen demo
              </OuiButton>
            )}
          </ExampleContext.Consumer>,
        ],
        tabs: tabs.map((tab, index) => {
          return {
            key: index,
            label: tab.name,
            id: tab.id,
            onClick: () => onTabClick(tab.id),
            isSelected: tab.id === selectedTabId,
          };
        }),
      }}>
      {tabs.map((tab, index) => (
        <Fragment key={index}>
          {tab.id === selectedTabId && (
            <div role="tabpanel" aria-labelledby={tab.id}>
              {tab.content}
            </div>
          )}
        </Fragment>
      ))}
    </OuiPageTemplate>
  );
};
