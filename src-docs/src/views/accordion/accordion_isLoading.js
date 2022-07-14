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

import React, { useState } from 'react';

import {
  OuiAccordion,
  OuiButton,
  OuiButtonGroup,
  OuiSpacer,
  OuiPanel,
} from '../../../../src/components';
import { OuiFormRow } from '../../../../src/components/form';

import { htmlIdGenerator } from '../../../../src/services';

const idPrefix = htmlIdGenerator()();

const toggleButtons = [
  {
    id: `${idPrefix}0`,
    label: 'False',
  },
  {
    id: `${idPrefix}1`,
    label: 'True',
  },
  {
    id: `${idPrefix}2`,
    label: 'Custom',
  },
];

export default () => {
  const [label, setLabel] = useState('False');
  const [toggleIdSelected, setToggleIdSelected] = useState(`${idPrefix}0`);

  const onChange = (optionId) => {
    setToggleIdSelected(optionId);
    setLabel(toggleButtons.find((x) => x.id === optionId).label);
  };

  let isLoadingMessage;

  switch (label) {
    case 'True':
      isLoadingMessage = true;
      break;
    case 'False':
      isLoadingMessage = false;
      break;
    case 'Custom':
      isLoadingMessage = 'This is a custom loading message';
      break;
  }

  return (
    <>
      <OuiFormRow label="isLoadingMessage:" display="columnCompressed">
        <OuiButtonGroup
          buttonSize="s"
          legend="Accordion loading message group"
          options={toggleButtons}
          idSelected={toggleIdSelected}
          onChange={onChange}
        />
      </OuiFormRow>
      <OuiSpacer size="m" />
      <OuiAccordion
        id={htmlIdGenerator()()}
        initialIsOpen={true}
        paddingSize={isLoadingMessage ? 'm' : 'none'}
        buttonContent="Accordion is loading, click to toggle"
        extraAction={<OuiButton size="s">Extra action!</OuiButton>}
        isLoading
        isLoadingMessage={isLoadingMessage}>
        <OuiPanel color="subdued">Opened content.</OuiPanel>
      </OuiAccordion>
    </>
  );
};
