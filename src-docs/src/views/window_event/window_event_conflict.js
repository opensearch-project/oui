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
  OuiModal,
  OuiModalBody,
  OuiModalHeader,
  OuiModalHeaderTitle,
  OuiFieldText,
  OuiSpacer,
} from '../../../../src/components';
import { keys } from '../../../../src/services';

import { ModalExample } from './modal_example_container';

const ConflictModal = (props) => {
  const [inputValue, setInputValue] = useState('');

  const updateInputValue = (e) => {
    setInputValue(e.target.value);
  };
  const clearInputValueOnEscape = (event) => {
    if (event.key === keys.ESCAPE) {
      setInputValue('');
      event.stopPropagation();
    }
  };

  return (
    <OuiModal onClose={props.onClose} style={{ width: '800px' }}>
      <OuiModalHeader>
        <OuiModalHeaderTitle>
          <h1>Example modal</h1>
        </OuiModalHeaderTitle>
      </OuiModalHeader>
      <OuiModalBody>
        <OuiFieldText
          value={inputValue}
          onChange={updateInputValue}
          onKeyDown={clearInputValueOnEscape}
        />
        <OuiSpacer size="s" />
        <p>While typing in this field, ESC will clear the field.</p>
        <OuiSpacer size="l" />
        <p>
          Otherwise, the event bubbles up to the window and ESC closes the
          modal.
        </p>
      </OuiModalBody>
    </OuiModal>
  );
};

export const WindowEventConflict = () => (
  <ModalExample
    modal={ConflictModal}
    buttonText="Open Modal with Conflicting Listener"
  />
);
