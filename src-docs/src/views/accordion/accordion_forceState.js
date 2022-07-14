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
  OuiPanel,
  OuiButtonGroup,
  OuiSpacer,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

const idPrefix = htmlIdGenerator()();

export default () => {
  const [trigger, setTrigger] = useState('closed');
  const [toggleIdSelected, setID] = useState(`${idPrefix}--closed`);
  const toggleButtons = [
    {
      id: `${idPrefix}--open`,
      label: 'Open',
    },
    {
      id: `${idPrefix}--closed`,
      label: 'Closed',
    },
  ];

  const onChange = (id) => {
    setTrigger(id === toggleButtons[0].id ? 'open' : 'closed');
    setID(id);
  };

  const onToggle = (isOpen) => {
    const newState = isOpen ? 'open' : 'closed';
    setTrigger(newState);
    setID(`${idPrefix}--${newState}`);
  };

  return (
    <div>
      <OuiButtonGroup
        legend="This is a basic group"
        options={toggleButtons}
        idSelected={toggleIdSelected}
        onChange={onChange}
      />
      <OuiSpacer />
      <OuiAccordion
        id={htmlIdGenerator()()}
        forceState={trigger}
        onToggle={onToggle}
        buttonContent="I am a controlled accordion"
        padding="l">
        <OuiPanel color="subdued">
          Any content inside of <strong>OuiAccordion</strong> will appear here.
        </OuiPanel>
      </OuiAccordion>
    </div>
  );
};
