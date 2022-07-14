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
  OuiSpacer,
  OuiText,
  OuiScreenReaderOnly,
} from '../../../../src/components';
import { OuiPanel } from '../../../../src/components/panel';
import { htmlIdGenerator } from '../../../../src/services';

const Rows = () => {
  const [counter, setCounter] = useState(1);
  const rows = [];
  for (let i = 1; i <= counter; i++) {
    rows.push(<li key={i}>Row {i}</li>);
  }
  const growingAccordianDescriptionId = htmlIdGenerator()();
  const listId = htmlIdGenerator()();
  return (
    <OuiText size="s">
      <OuiScreenReaderOnly>
        <p id={growingAccordianDescriptionId}>
          Currently height is set to {counter} items
        </p>
      </OuiScreenReaderOnly>
      <OuiSpacer size="s" />
      <p>
        <OuiButton
          size="s"
          iconType="plusInCircleFilled"
          onClick={() => setCounter(counter + 1)}
          aria-controls={listId}
          aria-describedby={growingAccordianDescriptionId}>
          Increase height to {counter + 1} items
        </OuiButton>{' '}
        <OuiButton
          size="s"
          iconType="minusInCircleFilled"
          aria-controls={listId}
          aria-describedby={growingAccordianDescriptionId}
          onClick={() => setCounter(Math.max(0, counter - 1))}
          isDisabled={counter === 1}>
          Decrease height to {counter - 1} item{counter > 2 && 's'}
        </OuiButton>
      </p>
      <ul id={listId}>{rows}</ul>
    </OuiText>
  );
};

export default () => (
  <OuiAccordion
    id={htmlIdGenerator()()}
    buttonContent="Click me to toggle close / open"
    initialIsOpen={true}
    paddingSize="s">
    <OuiPanel color="subdued">
      <Rows />
    </OuiPanel>
  </OuiAccordion>
);
