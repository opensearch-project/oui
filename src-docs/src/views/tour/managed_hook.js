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

import React, { useEffect, useState } from 'react';

import {
  OuiButton,
  OuiButtonEmpty,
  OuiCodeBlock,
  OuiForm,
  OuiFormRow,
  OuiSpacer,
  OuiTextArea,
  OuiTourStep,
  useOuiTour,
} from '../../../../src/components';

const demoTourSteps = [
  {
    step: 1,
    title: 'Step 1',
    content: (
      <span>
        <p>Copy and paste this sample query.</p>
        <OuiSpacer />
        <OuiCodeBlock language="html" paddingSize="s" isCopyable>
          {'SELECT email FROM “opensearch_dashboards_sample_data_ecommerce”'}
        </OuiCodeBlock>
      </span>
    ),
    anchorPosition: 'rightUp',
  },
  {
    step: 2,
    title: 'Step 2',
    content: <p>Save your changes.</p>,
    anchorPosition: 'rightUp',
  },
];

const tourConfig = {
  currentTourStep: 1,
  isTourActive: true,
  tourPopoverWidth: 360,
  tourSubtitle: 'Demo tour',
};

const STORAGE_KEY = 'tourDemo_Managed';

export default () => {
  const [queryValue, setQueryValue] = useState('');

  let state = localStorage.getItem(STORAGE_KEY);
  if (state) {
    state = JSON.parse(state);
  } else {
    state = tourConfig;
  }

  const [[ouiTourStepOne, ouiTourStepTwo], actions, reducerState] = useOuiTour(
    demoTourSteps,
    state
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reducerState));
  }, [reducerState]);

  const handleClick = () => {
    actions.finishTour();
  };

  const resetTour = () => {
    actions.resetTour();
    setQueryValue('');
  };

  const onChange = (e) => {
    setQueryValue(e.target.value);

    if (reducerState.currentTourStep < 2) {
      actions.incrementStep();
    }
  };

  return (
    <div>
      <OuiButtonEmpty iconType="refresh" flush="left" onClick={resetTour}>
        Reset tour
      </OuiButtonEmpty>
      <OuiSpacer />
      <OuiForm component="form">
        <OuiFormRow label="Enter an SQL query">
          <OuiTourStep {...ouiTourStepOne}>
            <OuiTextArea
              placeholder="Placeholder text"
              aria-label="Enter ES SQL query"
              value={queryValue}
              onChange={onChange}
              style={{ width: 400 }}
            />
          </OuiTourStep>
        </OuiFormRow>

        <OuiSpacer />

        <OuiTourStep {...ouiTourStepTwo}>
          <OuiButton onClick={handleClick}>Save query</OuiButton>
        </OuiTourStep>
      </OuiForm>
    </div>
  );
};
