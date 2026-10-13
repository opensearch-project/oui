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
import { OuiButton } from '../../../../src/components';

import {
  OuiWindowEvent,
  isComposingKeyboardEvent,
} from '../../../../src/services';

export const ModalExample = (props) => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const close = () => {
    if (open) {
      setOpen(false);
    }
  };

  const closeOnEscape = (event) => {
    // An Escape pressed while an IME composition is active only cancels the composition
    if (event.key === 'Escape' && !isComposingKeyboardEvent(event)) {
      close();
    }
  };

  const { modal: Modal, buttonText = 'Open Modal' } = props;
  const button = <OuiButton onClick={openModal}>{buttonText}</OuiButton>;

  return (
    <div>
      <OuiWindowEvent event="keydown" handler={closeOnEscape} />
      {open ? <Modal onClose={close} /> : button}
    </div>
  );
};
